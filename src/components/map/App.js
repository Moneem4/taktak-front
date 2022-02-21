import React, { useState, useEffect, useRef } from 'react'

import AutocompleteMaterial from './Autocomplete'
import LocationFilter from './LocationFilter'
import './App.scss'
import { Grid } from '@material-ui/core'
import PersistentDrawerLeft from './drawer'
import GoogleMapComponent from './googlemap'
import locations from './locations'

import _uniqueId from 'lodash/uniqueId'
import mockdata from './filter_mockdata'
import 'leaflet/dist/leaflet.css'
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css'
const App = (props) => {
  const [mapLat, setMapLat] = useState(52.165691)
  const [mapLng, setMapLng] = useState(10.451526)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [appValue, setAppValue] = useState(null)
  const [appTypeValue, setAppTypeValue] = useState(null)
  const [appOption, setAppOption] = useState([])
  const [regionData, setRegionData] = useState(undefined)
  const [filterList, setFilterList] = useState([])

  const [data, setData] = useState([])
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
  }

  useEffect(() => {
    setData(locations)
    setAppOption(locations)
  }, [])

  const handleDoubleClick = (event, item) => {
    setData([item])
    setMapLat(Number(item.latitude))
    setMapLng(Number(item.longitude))
  }
  const handleSelect = async (event, newValue) => {
    if (newValue) {
      var filter_address = await regionData
        .map((obj) => {
          if (
            obj &&
            obj.fachabteilung &&
            obj.fachabteilung.includes(newValue.tid)
          ) {
            return obj
          }
        })
        .filter((obj) => obj !== null && obj !== undefined)
      if (filter_address.length) {
        setOpenDrawer(true)
      }

      setAppTypeValue(newValue.name)
      setData(filter_address)
    } else {
      setAppTypeValue('')

      setData(regionData)
    }
  }
  const handleZoomOut = () => {
    if (data.length === 1) {
      setMapLat(52.165691)
      setMapLng(10.451526)
      setData(locations)
    }
  }
  const onDrawerClose = () => {
    setData(locations)
    setOpenDrawer(false)

    setAppTypeValue('')
    setAppValue('')
  }
  const setMarkersData = async (data) => {
    setData(data)
    setRegionData(data)
  }
  return (
    <div className="App">
      <GoogleMapComponent
        data={data}
        mapLat={mapLat}
        mapLng={mapLng}
        setData={setMarkersData}
        onDblClick={handleDoubleClick}
        onZoomOut={handleZoomOut}
        setPlace={props.setPlace}
      />
      {/* <Grid container className="search-container">
        <Grid item xs={12} sm={6}>
          <div className="location-filter">
            {regionData !== undefined ? (
              <LocationFilter appValue={appTypeValue} onSelect={handleSelect} />
            ) : (
              <div></div>
            )}
          </div>
        </Grid>
        <PersistentDrawerLeft
          data={data}
          openDrawer={openDrawer}
          onDrawerClose={onDrawerClose}
        />
      </Grid> */}
    </div>
  )
}

export default App
