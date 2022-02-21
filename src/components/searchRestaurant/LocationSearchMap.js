import React from 'react'
import PropTypes from 'prop-types'

function LocationSearchMap(props) {
    return (
        <div className="feed-secondary">
        <div className="location-maps">
          <img src="assets/img/CaptureMaps.png" className="maps" />
          <div className="country-dropdown">
            <div className="country">
              <span> Sousse</span> 
              <i className="fal fa-bars bars" />
            </div>
            <div className="drop-pa" id="country-dropdown">
              <form>
                <div className="dropdown-top">
                  <span>Votre région</span>
                  <i className="fal fa-bars menu-close" />
                </div>
                <div className="countries">
                  <div className="country-with-lettre">
                    <div>
                      <span>Béja</span>
                    </div>
                    <div className="lettre">
                      <span>B</span>
                    </div>
                  </div>
                  <div className="country">
                    <span>Ben Arous</span>
                  </div>
                  <div className="country">
                    <span>Sidi Bouzid</span>
                  </div>
                  <div className="country">
                    <span>Tunis</span>
                  </div>
                  <div className="country">
                    <span>Monastir</span>
                  </div>
                  <div className="country">
                    <span>Jendouba</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="small-circle" />
          <div className="big-circle">
          </div>
          <div className="maps-bottom">
            <div className="gps">
              <i className="fal fa-location" />
            </div>
            <div className="search">
              <i className="fal fa-map-pin" />
              <div className="progress-bar">
                <span className="progress-bar__inner" />
                <div className="cursor" />
              </div>
              <span>3,5 Km</span>
            </div>
          </div>
        </div>
        
      </div>
    )
}

LocationSearchMap.propTypes = {

}

export default LocationSearchMap

