import { useEffect } from 'react'
import { GeoSearchControl } from 'leaflet-geosearch'

import L from 'leaflet'
const SearchControl = (props) => {
  return GeoSearchControl({
    provider: provider,
    style: 'bar',
    showMarker: true,
    showPopup: false,
    autoClose: true,
    retainZoomLevel: false,
    animateZoom: true,
    keepResult: false,
    searchLabel: 'search',
  })
}
export default SearchControl
