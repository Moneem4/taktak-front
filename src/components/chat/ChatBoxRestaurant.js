import React from 'react'
import PropTypes from 'prop-types'

function ChatBoxRestaurant(props) {
    return (
        <div className="convesation-with-restaurant">
                  <div className="discussion-header">
                    <div className="discussion-header-details-user">
                      <div className="img-user">
                        <img src="assets/img/svg/dd40a46ad2da8099a80e16ff6a71df6e.png" />
                      </div>
                    </div>
                    <span>Moh Yamin Resto</span>
                    <i className="fas fa-times" />
                  </div>
                  <div className="discussion-main">
                    <div className="discussion">
                      <div className="message-received">
                        <div className="content">
                          <img
                            className="img-user"
                            src="assets/img/svg/dd40a46ad2da8099a80e16ff6a71df6e.png"
                          />
                          <div className="message">
                            <p className="first-msg">Bonjour, Mongi</p>
                            <p className="second-msg">
                              Vous avez une réservation confirmé pour le jeudi
                              prochain chez notre restaurant.
                            </p>
                            <div className="triangle" />
                            <img src="assets/img/svg/93abed8fb705713fe9a3df74f5d2d7ea.png" />
                            <div className="informations-restaurant">
                              <img src="assets/img/svg/dd40a46ad2da8099a80e16ff6a71df6e.png" />
                              <div className="details">
                                <span className="name-restaurant">
                                  Moh Yamin Resto
                                </span>
                                <div className="location">
                                  <img src="assets/img/svg/location.png" />
                                  <span className="adress">
                                    Tunis, Cuisine traditionelle
                                  </span>
                                </div>
                                <div className="rating">
                                  <i className="fal fa-star" />
                                  <i className="fal fa-star" />
                                  <i className="fal fa-star" />
                                  <span className="fal fa-star" />
                                  <span className="fal fa-star" />
                                </div>
                              </div>
                            </div>
                            <button className="show-details">
                              Voir les détails
                            </button>
                            <span className="profile-restaurant">
                              Profile restaurant
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
    )
}

ChatBoxRestaurant.propTypes = {

}

export default ChatBoxRestaurant

