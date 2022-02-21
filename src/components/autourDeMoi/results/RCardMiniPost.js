import React from 'react'
import PropTypes from 'prop-types'

function RCardMiniPost(props) {
    const {restaurant}=props
    return (
        <div className="card restaurant-mini-post-card">
            <div className="restaurant-mini-post-card-header">
              <img src={restaurant.image}/>
              {/* <div className="arrows">
                <i className="fal fa-chevron-left" />
                <i className="fal fa-chevron-right" />
              </div> */}
            </div>
            <div className="restaurant-mini-post-card-footer">
              <div className="restaurant-mini-post-card-logo">
                <img src={restaurant.profileImage} />
              </div>
              <div className="restaurant-mini-post-card-name">
                <span className="name">{restaurant.name}</span>
                <span className="location"><i className="icon-marker" />{restaurant.location}</span>
              </div>
              <div className="restaurant-mini-post-card-options">
                <button>
                  <i className="icon-restaurant" />suivre
                </button>
              </div>
            </div>
          </div>
         
    )
}

RCardMiniPost.propTypes = {

}

export default RCardMiniPost

