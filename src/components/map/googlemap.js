import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'

import parse from 'html-react-parser'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from 'react-leaflet'
import EsriLeafletGeoSearch from 'react-esri-leaflet/plugins/EsriLeafletGeoSearch'
import './index.scss'
import L from 'leaflet'

import * as ELG from 'esri-leaflet-geocoder'
import { ZoomOut } from '@material-ui/icons'

import markerIcon from './img/marker.svg'
const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}
const hexToRgb = (hex, opacity) => {
  if (!hex.startsWith('#')) return hex
  const hashless = hex.slice(1)
  const num = parseInt(
    hashless.length === 3
      ? hashless
          .split('')
          .map((c) => c.repeat(2))
          .join('')
      : hashless,
    16,
  )
  const red = num >> 16
  const green = (num >> 8) & 255
  const blue = num & 255

  if (opacity) {
    return `rgba(${red}, ${green}, ${blue}, ${opacity})`
  }
  return `rgb(${red}, ${green}, ${blue})`
}
const GoogleMapComponent = (props) => {
  // The things we need to track in state
  const center = [36.806389, 10.181667]
  const { data, onDblClick, onZoomOut, setData } = props
  const [mapRef, setMapRef] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [position, setPosition] = useState(center)
  const [markerMap, setMarkerMap] = useState({
    lat: 36.806389,
    lng: 10.181667,
  })
  const [doubleClicked, setDoubleClicked] = useState(false)
  const [zoom, setZoom] = useState(12)
  const [infoOpen, setInfoOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(true)

  const getAddressName = function (lat, lng) {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
    ).then((response) => {
      console.log(response)
      response.json().then((data) => {
        if (data.address) {
          props.setPlace(
            !data.address.county && !data.address.state
              ? data.address.country
              : !data.address.county
              ? `${data.address.state},${data.address.country}`
              : `${data.address.county},${data.address.state},${data.address.country}`,
          )
        } else {
          props.setPlace(null)
        }
      })
    })
  }

  //const providers = GoogleProvider(GoogleMapsAPI);
  const zoomOut = () => {
    setInfoOpen(false)
    onZoomOut()
  }
  const positionClass = POSITION_CLASSES.topleft
  useEffect(() => {
    if (mapRef && data) {
      if (data.length > 1) {
        fitBounds(mapRef)
      } else {
        fitSingleLocationBounds(mapRef)
      }
    }
  }, [data, mapRef])

  useEffect(() => {
    if (mapRef) {
      const map = mapRef
      map.locate({ setView: true })
      map.on('locationfound', handleUserlocation)
      const searchControl = new ELG.Geosearch().addTo(map)

      searchControl.on('results', async (data) => {
        let actualPosition = data.results[0].latlng
        setPosition([actualPosition.lat, actualPosition.lng])
        await getAddressName(actualPosition.lat, actualPosition.lng)
      })
    }
  }, [mapRef])

  const handleUserlocation = async (event) => {
    const latlng = event.latlng
    setPosition([latlng.lat, latlng.lng])
    await getAddressName(latlng.lat, latlng.lng)
  }
  // Iterate myPlaces to size, center, and zoom map to contain all markers
  const fitBounds = async (map) => {
    if (data.lengtactualpostionh) {
      setIsLoading(true)
      let markers = await data.map((place) => {
        return [Number(place.latitude), Number(place.longitude)]
      })
      var bounds = new L.latLngBounds(markers)
      console.log(map)
      map.fitBounds(bounds, { padding: [10, 10] })
      map.fitBounds(bounds)

      setIsLoading(false)
      return true
    }
  }

  const fitSingleLocationBounds = (map) => {
    if (data.length) {
      const place = data[0]
      const marker = [Number(place.latitude), Number(place.longitude)]

      map.fitBounds([marker], { padding: [20, 20] })

      map.fitBounds([marker])
    }
  }

  const loadHandler = async (map) => {
    // Store a reference to the google map instance in state
    setMapRef(map)
    // Fit map bounds to contain all markers
    await fitBounds(map)
  }

  // We have to create a mapping of our places to actual Marker objects
  const markerLoadHandler = (marker, place) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [place.id]: marker }
    })
  }

  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedPlace(place)

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false)
    }

    if (infoOpen) {
      setInfoOpen(false)
    }
    setInfoOpen(true)

    // If you want to zoom in a little on marker click
    if (zoom < 6) {
      setZoom(6)
    }

    // if you want to center the selected Marker
    // setCenter(place.pos)
  }

  const containerStyle = {
    width: '100%',
    height: '100%',
  }
  const loadingStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: '50000',
    background: 'white',
  }
  const myIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    popupAnchor: [0, -36],
    shadowAnchor: null,
  })

  function DraggableMarker() {
    const [draggable, setDraggable] = useState(true)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        async dragend() {
          const marker = markerRef.current
          if (marker != null) {
            let actualPosition = marker.getLatLng()
            setPosition([actualPosition.lat, actualPosition.lng])
            await getAddressName(actualPosition.lat, actualPosition.lng)
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={myIcon}
      >
        {/* <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
          </span>
        </Popup> */}
      </Marker>
    )
  }

  return (
    <>
      {isLoading ?? <div style={{ ...loadingStyle }}>loading...</div>}
      <MapContainer
        center={center}
        style={containerStyle}
        zoom={zoom}
        zoomControl={false}
        whenCreated={loadHandler}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker />
        <ZoomControl position="topright" />
      </MapContainer>
    </>
  )
}

export default GoogleMapComponent
