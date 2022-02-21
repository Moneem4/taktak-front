import React from "react";
import "./menusidebar.css"
function MenuSideBar(props) {
    
    return (
        <div className="feed-secondary">
              <div className="ad-pub-sodexo">
                <img src="../../assets/img/svg/sodexo.svg" />
                <span>ESPACE PUB</span>
              </div>
              <div className="last-seen">
                <div className="last-seen-top">
                  Derniers venus
                </div>
                <div className="last-seen-body">
                  <div className="profil-visitor">
                    <div className="visitor">
                      <div className="visitor-avatar">
                        <img src="../../assets/img/rafika-bella.png" />
                      </div>
                      <div className="visitor-info">
                        <span className="user-username">Alex</span>
                        <div className="user-about">
                          <i className="fal fa-map-marker-alt" aria-hidden="true" />
                          <span> Mado Café &amp; Resto</span>
                        </div>
                      </div>
                    </div>
                    <div className="follow-button">
                      <i className="icon-add-friend" />
                    </div>
                  </div>
                  <div className="profil-visitor">
                    <div className="visitor">
                      <div className="visitor-avatar">
                        <img src="../../assets/img/rafika-bella.png" />
                      </div>
                      <div className="visitor-info">
                        <span className="user-username">Alex</span>
                        <div className="user-about">
                          <i className="fal fa-map-marker-alt" aria-hidden="true" />
                          <span> Mado Café &amp; Resto</span>
                        </div>
                      </div>
                    </div>
                    <div className="follow-button">
                      <i className="icon-add-friend" />
                    </div>
                  </div>
                </div>
              </div>
             
              <div className="suggested-restaurants">
                <div className="suggested-restaurants-top">
                  Suggestion des restaurants
                </div>
                <div className="suggested-restaurants-bottom">
                  <div className="restaurant">
                    <img src="../../assets/img/2e0dc16abd829f5af42b71ed33f2a82d.png" className="pict-of-res" />
                    <div className="restaurant-right-side">
                      <img src="../../assets/img/3f08a2ba008fd3dd0d8090b4d7ab82d8.png" className="logo" />
                      <div className="restaurant-details">
                        <span className="restaurant-name">Belle Restaurant</span>
                        <div className="restaurant-location">
                          <i className="fal fa-map-marker-alt" />
                          <span className="restaurant-adress">Tunis, Cuisine traditionelle</span>
                        </div>
                        <div className="star-rating">
                          <i className="fal fa-star" />
                          <i className="fal fa-star" />
                          <i className="fal fa-star" />
                          <i className="fal fa-star" />
                          <i className="fal fa-star" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="restaurant">
                    <img src="../../assets/img/2e0dc16abd829f5af42b71ed33f2a82d.png" className="pict-of-res" />
                    <div className="restaurant-right-side">
                      <div className="logo">
                        <img src="../../assets/img/3f08a2ba008fd3dd0d8090b4d7ab82d8.png" alt="" />
                      </div>
                      <div className="restaurant-details">
                        <span className="restaurant-name">Belle Restaurant</span>
                        <div className="restaurant-location">
                          <i className="fal fa-map-marker-alt" />
                          <span className="restaurant-adress">Tunis, Cuisine traditionelle</span>
                        </div>
                        <div className="star-rating">
                          <i className="fal fa-star" />
                          <i className="fal fa-star" />
                          <i className="fal fa-star" />
                          <i className="fal fa-star" />
                          <i className="fal fa-star" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
    );
}

MenuSideBar.propTypes = {};

export default MenuSideBar;