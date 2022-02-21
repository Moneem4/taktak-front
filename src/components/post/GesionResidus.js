import React from 'react'
import PropTypes from 'prop-types'

function GesionResidus(props) {
    return (
        <div>
                        <div className="gestion-de-residus-tak-tak">
                <h3 className="gestion-de-residus-title">Gestion de Résidus</h3>
                <i className="icon-dots-horizontal" />
              </div>
              <div className="card restaurant-post-card">
                <div className="restaurant-post-card-body">
                  <div className="restaurant-who-post-wrapper">
                    <div className="restaurant-who-post">
                      <div className="restaurant-who-post-info">
                        <div className="restaurant-who-post-info-avatar">
                          <img src="../assets/img/svg/5a12b1d39ffb6402808768c7b561a90b.png" />
                        </div>
                        <div className="restaurant-who-post-info-info">
                          <span className="restaurant-username">
                            Popeyes Restaurant
                          </span>
                          <div className="restaurant-about">
                            <i className="icon-marker" />
                            <span>Tunis, Cuisine Chinoise</span>
                          </div>
                        </div>
                      </div>
                      <div className="restaurant-who-post-options">
                        <div className="cup-button">
                          <i className="fal fa-wine-glass-alt" />
                        </div>
                        <div className="follow-button">
                          <i className="icon-add-friend" />
                          <span>Suivre</span>
                        </div>
                        <div className="more-options">
                          <i className="icon-dots-horizontal" />
                        </div>
                      </div>
                    </div>
                    <div className="restaurant-who-made-a-donation">
                      <span>A fait un Don pour l’association</span>
                    </div>
                    <div className="association">
                      <img
                        className="association-img"
                        src="../assets/img/eb255963c2a2ba64893f3cc6c805b593.png"
                        alt=""
                      />
                      <div className="association-information">
                        <span className="association-name">
                          Association Rahma
                        </span>
                        <div className="association-location">
                          <i className="icon-marker" />
                          <span className="adress">Marsa, Tunis</span>
                        </div>
                        <span className="association-description">
                          Maecenas diam risus, accumsan at facilisis sit amet,
                          eleifend et arcu. Nam viverra pharetra condimentum.
                          Vestibulum dui metus, fringilla{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="restaurant-post-card-footer-gestion-de-residus">
                  <div className="left-side">
                    <div>
                      <span>Ils ont déjà fait un don</span>
                    </div>
                    <div className="shared-component-profil-img">
                      <img src="../assets/img/Ellipse 378.png" />
                      <img src="../assets/img/Ellipse 379.png" />
                      <img src="../assets/img/Ellipse 380.png" />
                      <img src="../assets/img/Ellipse 381.png" />
                      <img src="../assets/img/Ellipse 382.png" />
                      <img src="../assets/img/Ellipse 384.png" />
                      <span id="profil-img-number">+13</span>
                    </div>
                  </div>
                  <div className="right-side">
                    <button>Plus de détails</button>
                  </div>
                </div>
              </div>
            
        </div>
    )
}

GesionResidus.propTypes = {

}

export default GesionResidus

