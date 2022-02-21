import React, { useContext, useEffect } from 'react'
import {UserContext} from "../../context/UserContext";


function VenteFlash(props) {
  const {classes, post, user, rFollowedList} = props;

  /*const handleCheck = () => {
    
    return rFollowed.map(item => item._id === post.restoId);
  }*/



    return (
        <div>
             <div className="vente-flash-tak-tak">
                {/* <div className="vente-flash-tak-tak-header"> */}
                <div>
                  <i className="fal fa-rabbit-fast rabbit" />
                  <h3 className="vente-flash-title">Vente Flash</h3>
                </div>
                <i className="icon-dots-horizontal" />
                {/* </div> */}
              </div>

              <div className="card restaurant-post-card">
                <div className="restaurant-post-card-header">
                  <div className="restaurant-post-card-photo">
                    <img
                      src="../assets/img/image2.jpg"
                      alt="restaurant-post "
                    />
                  </div>
                </div>
                <div className="restaurant-post-card-body">
                  <div className="restaurant-who-post-wrapper">
                    <div className="restaurant-who-post">
                      <div className="restaurant-who-post-info">
                        <div className="restaurant-who-post-info-avatar">
                          <img src="../assets/img/icon-restaurant.png" />
                        </div>
                        <div className="restaurant-who-post-info-info">
                          <span className="restaurant-username">
                            Moh Yamin Resto
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
                        <div className="follow-button" >
                          <i className="icon-add-friend" />
                          <span>Suivre</span>
                        </div>
                        <div className="more-options">
                          <i className="icon-dots-horizontal" />
                        </div>
                      </div>
                    </div>
                    <div className="restaurant-post-card-body-description-vente-flash">
                      <span className="title">
                        Proin sit amet ipsum eget ante venenatis posuere.
                      </span>
                      <div className="description">
                        <span>
                          {" "}
                          Maecenas diam risus, accumsan at facilisis sit amet,
                          eleifend et arcu. Nam viverra pharetra condimentum.
                          Vestibulum dui metus, fringilla sed facilisis ut,
                          congue ut tortor.
                        </span>
                        <span>
                          Curabitur luctus ornare pellentesque. Interdum et
                          malesuada fames ac ante ipsum primis in
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="restaurant-post-card-vente-flash-promo">
                    <div className="duration">
                      <span>Durée</span>
                      <span>23 : 19 : 05</span>
                    </div>
                    <button>Profitez maintenant</button>
                  </div>
                </div>
                <div className="restaurant-post-card-footer-vente-flash">
                  <div>
                    <span>Ils ont déjà profité</span>
                  </div>
                  <div className="shared-component-profil-img">
                    <img src="../assets/img/Ellipse 378.png" />
                    <img src="../assets/img/Ellipse 379.png" />
                    <img src="../assets/img/Ellipse 380.png" />
                    <img src="../assets/img/Ellipse 381.png" />
                    <img src="../assets/img/Ellipse 382.png" />
                    <img src="../assets/img/Ellipse 383.png" />
                    <img src="../assets/img/Ellipse 384.png" />
                    <span id="profil-img-number">+13</span>
                  </div>
                </div>
              </div>
              
        </div>
    )
}

VenteFlash.propTypes = {

}

export default VenteFlash

