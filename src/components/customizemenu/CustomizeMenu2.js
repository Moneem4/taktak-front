import React from 'react'
import PropTypes from 'prop-types'

function CustomizeMenu(props) {
  
    return (
        <div className="menu-customization-page">
       
        <div className="menu-customization-page-content">
       
          <div className="menu-customization-header" />
          <div className="menu-customization-page-content-feed container">
            <div className="feed-main">
              <div className="header-inner container">
                <div className="profile-picture">
                  <img src="../assets/img/restaurant-icon-big.png" />
                </div>
                <div className="user-info">
                  <div className="user-info-info">
                    <span className="name">Kindle Reflection Resto</span>
                    <span className="location">
                      <i className="fal fa-map-marker-alt" /> Jawhra, Sousse
                      <div className="rating">
                        <i className="fal fa-star" />
                        <i className="fal fa-star" />
                        <i className="fal fa-star" />
                        <i className="fal fa-star" />
                        <i className="fal fa-star" />
                      </div>
                      <div className="votes">
                        4.2/5
                      </div>
                      <div className="votes-nb">
                        12 votes
                      </div>
                    </span>
                    <div className="tags">#friends #foodista #pasta</div>
                  </div>
                </div>
              </div>
              <ul className="tabs" data-tabs id="example-tabs">
                <li className="tabs-title">
                  <a href="#panel1" aria-selected="true">Description</a>
                </li>
                <li className="tabs-title">
                  <a data-tabs-target="panel2" href="#panel2">Photos</a>
                </li>
                <li className="tabs-title  is-active">
                  <a data-tabs-target="panel3" href="#panel3" id="#href/Menu">Menu</a>
                </li>
                <li className="tabs-title">
                  <a data-tabs-target="panel4" href="#panel4">évaluations</a>
                </li>
              </ul>
              <div className="tabs-content" data-tabs-content="example-tabs">
                <div className="tabs-panel " id="panel1">
                  <div className="restaurant-promo">
                    <img src="../assets/img/promo.png" />
                  </div>
                  <div className="brief profile-section">
                    <h3 className="brief-title profile-title">En Bref</h3>
                    <p>
                      Proin sit amet ipsum eget ante venenatis posuere. Maecenas
                      diam risus, accumsan at facilisis sit amet, eleifend et
                      arcu. Nam viverra pharetra condimentum. Vestibulum dui
                      metus, fringilla sed facilisis ut, congue ut tortor.
                    </p>
                    <span><i className="icon-small-arrow-right" /> Afficher plus</span>
                  </div>
                  <div>
                    <div className="services">
                      <div className="service-item">
                        <i className="fal fa-wine-glass-alt" aria-hidden="true" />
                        <span>Alcool</span>
                      </div>
                      <div className="service-item">
                        <i className="fal fa-wifi" aria-hidden="true" />
                        <span>Wifi</span>
                      </div>
                      <div className="service-item">
                        <i className="fal fa-futbol" aria-hidden="true" />
                        <span>Match</span>
                      </div>
                      <div className="service-item">
                        <i className="fal fa-parking" aria-hidden="true" />
                        <span>Parking</span>
                      </div>
                      <div className="service-item">
                        <i className="fal fa-child" aria-hidden="true" />
                        <span>Air de jeu</span>
                      </div>
                      <div className="service-item">
                        <i className="fal fa-baby" aria-hidden="true" />
                        <span>Siège bébé</span>
                      </div>
                      <div className="service-item">
                        <i className="fal fa-users" aria-hidden="true" />
                        <span>Groupe</span>
                      </div>
                    </div>
                    <div className="my-booking-ele-bottom">
                      <div>
                        <span className="my-booking-label">
                          Horaires d’ouverture</span>
                        <span className="my-booking-value">
                          <span className="open">OUVERT</span>
                          Lundi 12 Mars 2010 / 19:00 – 21:00 <i className="fal fa-calendar-alt" /></span>
                      </div>
                      <div>
                        <span className="my-booking-label">
                          Cuisines</span>
                        <span className="my-booking-value">
                          <span className="my-booking-value">Tunisienne, Italienne, Indienne</span>
                          {/* <span className="number-sur-taktak"> Dont 3 son sur TakTak</span> */}
                        </span>
                      </div>
                      <div>
                        <span className="my-booking-label">
                          Coût moyen <i className="fal fa-info-square" /></span>
                        <span className="my-booking-value">
                          <span className="number">30dt </span>
                          <span className="sous-value "> / personne</span>
                          <span className="my-booking-sous-value"> (environ)</span>
                        </span>
                      </div>
                      <div>
                        <span className="my-booking-label">
                          Modalité de payement</span>
                        <span className="my-booking-value"> Espèce</span>
                      </div>
                    </div>
                  </div>
                  <div className="followers">
                    <h3 className="followers-title profile-title">
                      Liste des followers
                    </h3>
                    <div className="followers-list">
                      <div className="one-follower">
                        <div className="one-follower-inner">
                          <div className="user-who-post-info-avatar">
                            <img src="../assets/img/avatar.png" />
                          </div>
                          <div className="user-who-post-info-info">
                            <span className="user-username">Alex</span>
                            <div className="user-about">
                              <i className="icon-marker" />
                              <span> Marsa, Tunis</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="one-follower">
                        <div className="one-follower-inner">
                          <div className="user-who-post-info-avatar">
                            <img src="../assets/img/avatar.png" />
                          </div>
                          <div className="user-who-post-info-info">
                            <span className="user-username">Alex</span>
                            <div className="user-about">
                              <i className="icon-marker" />
                              <span> Marsa, Tunis</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="one-follower">
                        <div className="one-follower-inner">
                          <div className="user-who-post-info-avatar">
                            <img src="../assets/img/avatar.png" />
                          </div>
                          <div className="user-who-post-info-info">
                            <span className="user-username">Alex</span>
                            <div className="user-about">
                              <i className="icon-marker" />
                              <span> Marsa, Tunis</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="one-follower">
                        <div className="one-follower-inner">
                          <div className="user-who-post-info-avatar">
                            <img src="../assets/img/avatar.png" />
                          </div>
                          <div className="user-who-post-info-info">
                            <span className="user-username">Alex</span>
                            <div className="user-about">
                              <i className="icon-marker" />
                              <span> Marsa, Tunis</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="one-follower">
                        <div className="one-follower-inner">
                          <div className="user-who-post-info-avatar">
                            <img src="../assets/img/avatar.png" />
                          </div>
                          <div className="user-who-post-info-info">
                            <span className="user-username">Alex</span>
                            <div className="user-about">
                              <i className="icon-marker" />
                              <span> Marsa, Tunis</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="one-follower">
                        <div className="one-follower-inner">
                          <div className="user-who-post-info-avatar">
                            <img src="../assets/img/avatar.png" />
                          </div>
                          <div className="user-who-post-info-info">
                            <span className="user-username">Alex</span>
                            <div className="user-about">
                              <i className="icon-marker" />
                              <span> Marsa, Tunis</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="one-follower">
                        <div className="one-follower-inner">
                          <div className="user-who-post-info-avatar">
                            <img src="../assets/img/avatar.png" />
                          </div>
                          <div className="user-who-post-info-info">
                            <span className="user-username">Alex</span>
                            <div className="user-about">
                              <i className="icon-marker" />
                              <span> Marsa, Tunis</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="one-follower">
                        <div className="one-follower-inner">
                          <div className="user-who-post-info-avatar">
                            <img src="../assets/img/avatar.png" />
                          </div>
                          <div className="user-who-post-info-info">
                            <span className="user-username">Alex</span>
                            <div className="user-about">
                              <i className="icon-marker" />
                              <span> Marsa, Tunis</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="soft-restaurants-footer">
                    <div className="line" />
                    <span>Afficher Plus</span>
                    <div className="line" />
                  </div>
                  <div className="restaurants-followed ">
                    <h3 className="restaurants-followed-title profile-title">
                      Derniers posts
                    </h3>
                    <div className="card restaurant-post-card">
                      <div className="restaurant-post-card-header">
                        <div className="restaurant-post-card-photo">
                          <img src="../assets/img/image2.jpg" alt="restaurant-post " />
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
                                <span className="restaurant-username">Moh Yamin Resto</span>
                                <div className="restaurant-about">
                                  <i className="icon-marker" />
                                  <span>Tunis, Cuisine Chinoise</span>
                                </div>
                              </div>
                            </div>
                            <div className="restaurant-who-post-details">
                              <span className="date">12 janvier 2020</span>
                              <span className="reading-time">2 min de lecture</span>
                            </div>
                          </div>
                          <div className="description">
                            Proin sit amet ipsum eget ante venenatis posuere.
                            Maecenas diam risus, accumsan at facilisis sit amet,
                            eleifend et arcu. Nam viverra pharetra condimentum.
                            Vestibulum dui metus, fringilla sed facilisis ut,
                            congue ut tortor.
                          </div>
                        </div>
                      </div>
                      <div className="divider" />
                    </div>
                  </div>
                </div>
                <div className="tabs-panel" id="panel2">
                  <div className="tab-one collapsed">
                    <div className="tab-one-header">
                      <span className="post-picture">Postez photos ou Déposer directement ici !</span>
                      <input type="text" placeholder="Dites quelques choses !" className="input-post" />
                      <i className="icon-camera" />
                    </div>
                    <div className="tab-one-body">
                      <div id="dropzone">
                        <span className="here">
                          Uploader vos photos
                        </span>
                      </div>
                      <div className="tab-one-bottom">
                        <button className="upload-now">
                          Postez
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="my-photos">
                    <div className="my-photos-top">
                      <span className="photos-top-ele active"><i className="icon-media" />Afficher tout</span>
                      <span className="photos-top-ele"><i className="icon-camera" />Vos photos</span>
                      <span className="photos-top-ele"><i className="icon-user-profile" />Photos de vous</span>
                    </div>
                    <div className="my-photos-bottom">
                      <div className="my-photos-bottom-header">
                        <span className="photos">Photos 139</span>
                        <span>Les plus récents<i className="fal fa-sort-down" /></span>
                      </div>
                      <div className="my-photos-photos">
                        <div className="add-photos">
                          <i className="fas fa-plus" />
                        </div>
                        <div className="photo">
                          <img src="../assets/img/image2.jpg" />
                          <div className="hover">
                            <i className="fal fa-trash-alt remove" />
                            <div className="hover-bottom">
                              <div className="left"><i className="fal fa-heart heart" />198</div>
                              <div className="right"><i className="fal fa-comment-dots comment" />4</div>
                            </div>
                          </div>
                        </div>
                        <div className="photo">
                          <img src="../assets/img/image2.jpg" />
                          <div className="hover">
                            <i className="fal fa-trash-alt remove" />
                            <div className="hover-bottom">
                              <div className="left"><i className="fal fa-heart heart" />198</div>
                              <div className="right"><i className="fal fa-comment-dots comment" />4</div>
                            </div>
                          </div>
                        </div>
                        <div className="photo">
                          <img src="../assets/img/image2.jpg" />
                          <div className="hover">
                            <i className="fal fa-trash-alt remove" />
                            <div className="hover-bottom">
                              <div className="left"><i className="fal fa-heart heart" />198</div>
                              <div className="right"><i className="fal fa-comment-dots comment" />4</div>
                            </div>
                          </div>
                        </div>
                        <div className="photo">
                          <img src="../assets/img/image2.jpg" />
                          <div className="hover">
                            <i className="fal fa-trash-alt remove" />
                            <div className="hover-bottom">
                              <div className="left"><i className="fal fa-heart heart" />198</div>
                              <div className="right"><i className="fal fa-comment-dots comment" />4</div>
                            </div>
                          </div>
                        </div>
                        <div className="photo">
                          <img src="../assets/img/image2.jpg" />
                          <div className="hover">
                            <i className="fal fa-trash-alt remove" />
                            <div className="hover-bottom">
                              <div className="left"><i className="fal fa-heart heart" />198</div>
                              <div className="right"><i className="fal fa-comment-dots comment" />4</div>
                            </div>
                          </div>
                        </div>
                        <div className="photo">
                          <img src="../assets/img/image2.jpg" />
                          <div className="hover">
                            <i className="fal fa-trash-alt remove" />
                            <div className="hover-bottom">
                              <div className="left"><i className="fal fa-heart heart" />198</div>
                              <div className="right"><i className="fal fa-comment-dots comment" />4</div>
                            </div>
                          </div>
                        </div>
                        <div className="photo">
                          <img src="../assets/img/image2.jpg" />
                          <div className="hover">
                            <i className="fal fa-trash-alt remove" />
                            <div className="hover-bottom">
                              <div className="left"><i className="fal fa-heart heart" />198</div>
                              <div className="right"><i className="fal fa-comment-dots comment" />4</div>
                            </div>
                          </div>
                        </div>
                        <div className="photo">
                          <img src="../assets/img/image2.jpg" />
                          <div className="hover">
                            <i className="fal fa-trash-alt remove" />
                            <div className="hover-bottom">
                              <div className="left"><i className="fal fa-heart heart" />198</div>
                              <div className="right"><i className="fal fa-comment-dots comment" />4</div>
                            </div>
                          </div>
                        </div>
                        <div className="photo">
                          <img src="../assets/img/image2.jpg" />
                          <div className="hover">
                            <i className="fal fa-trash-alt remove" />
                            <div className="hover-bottom">
                              <div className="left"><i className="fal fa-heart heart" />198</div>
                              <div className="right"><i className="fal fa-comment-dots comment" />4</div>
                            </div>
                          </div>
                        </div>
                        <div className="photo">
                          <img src="../assets/img/image2.jpg" />
                          <div className="hover">
                            <i className="fal fa-trash-alt remove" />
                            <div className="hover-bottom">
                              <div className="left"><i className="fal fa-heart heart" />198</div>
                              <div className="right"><i className="fal fa-comment-dots comment" />4</div>
                            </div>
                          </div>
                        </div>
                        <div className="photo">
                          <img src="../assets/img/image2.jpg" />
                          <div className="hover">
                            <i className="fal fa-trash-alt remove" />
                            <div className="hover-bottom">
                              <div className="left"><i className="fal fa-heart heart" />198</div>
                              <div className="right"><i className="fal fa-comment-dots comment" />4</div>
                            </div>
                          </div>
                        </div>
                        <div className="photo">
                          <img src="../assets/img/image2.jpg" />
                          <div className="hover">
                            <i className="fal fa-trash-alt remove" />
                            <div className="hover-bottom">
                              <div className="left"><i className="fal fa-heart heart" />198</div>
                              <div className="right"><i className="fal fa-comment-dots comment" />4</div>
                            </div>
                          </div>
                        </div>
                        <div className="photo">
                          <img src="../assets/img/image2.jpg" />
                          <div className="hover">
                            <i className="fal fa-trash-alt remove" />
                            <div className="hover-bottom">
                              <div className="left"><i className="fal fa-heart heart" />198</div>
                              <div className="right"><i className="fal fa-comment-dots comment" />4</div>
                            </div>
                          </div>
                        </div>
                        <div className="photo">
                          <img src="../assets/img/image2.jpg" />
                          <div className="hover">
                            <i className="fal fa-trash-alt remove" />
                            <div className="hover-bottom">
                              <div className="left"><i className="fal fa-heart heart" />198</div>
                              <div className="right"><i className="fal fa-comment-dots comment" />4</div>
                            </div>
                          </div>
                        </div>
                        <div className="photo">
                          <img src="../assets/img/image2.jpg" />
                          <div className="hover">
                            <i className="fal fa-trash-alt remove" />
                            <div className="hover-bottom">
                              <div className="left"><i className="fal fa-heart heart" />198</div>
                              <div className="right"><i className="fal fa-comment-dots comment" />4</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tabs-panel is-active" id="panel3">
                  <div className="First-panel3">
                  <div className="tabs-panel is-active" id="panel3">
                  <div className="header-first-panel3">
                    <div className="header-first-panel3">
                      <div className="menu">
                        <div className="add-article">
                          <svg xmlns="http://www.w3.org/2000/svg" width="41.286" height="30.287" viewBox="0 0 41.286 30.287">
                            <defs>
                              <style dangerouslySetInnerHTML={{__html: "\n                            .a {\n                              fill: orange;\n                            }\n                          " }} />
                            </defs>
                            <g transform="translate(7.75 -0.153)">
                              <g transform="translate(-7.75 -63.784)">
                                <circle className="a" cx="2.064" cy="2.064" r="2.064" transform="translate(18.579 64.635)" />
                                <path className="a" d="M270.45,190.55a.688.688,0,0,1-.683-.612c-.668-6.006-6.812-11.831-13.148-12.462a.688.688,0,0,1,.138-1.369c7.048.7,13.631,6.97,14.377,13.683a.688.688,0,0,1-.608.757.711.711,0,0,1-.076,0Z" transform="translate(-233.98 -102.519)" />
                                <path className="a" d="M3.441,94.224H37.846a3.445,3.445,0,0,0,3.441-3.441A.688.688,0,0,0,40.6,90.1h-.124l-.765-3.825A19.426,19.426,0,0,0,21.331,70.657v-1.3a2.752,2.752,0,1,0-1.376,0v1.3A19.427,19.427,0,0,0,1.577,86.27L.812,90.1H.688A.688.688,0,0,0,0,90.783,3.445,3.445,0,0,0,3.441,94.224ZM19.267,66.7a1.376,1.376,0,1,1,1.376,1.376A1.376,1.376,0,0,1,19.267,66.7ZM2.926,86.54a18.067,18.067,0,0,1,35.433,0L39.07,90.1H2.216Zm36.866,4.931a2.068,2.068,0,0,1-1.947,1.376H3.441a2.068,2.068,0,0,1-1.947-1.376Z" transform="translate(0 0)" />
                                <path className="a" d="M256.738,176.067a.69.69,0,0,0-.138,1.373c6.336.634,12.479,6.459,13.147,12.465a.688.688,0,0,0,.684.609.7.7,0,0,0,.076,0,.688.688,0,0,0,.608-.757c-.747-6.715-7.33-12.981-14.378-13.686Z" transform="translate(-233.962 -102.483)" />
                              </g>
                            </g>
                          </svg>
                          <div className="add-article-left">
                            <span className="your-menu">Votre menu</span>
                            <span className="vide"> (vide) </span>
                            <span className="nbrs-of-articles" style={{color: '#ffa500', fontSize: '1.6rem'}}> ( <span style={{color: 'white', fontSize: '1.6rem'}}>04 articles</span> ) </span>
                          </div>
                          <div className="add-article-right">
                            <button>
                              Consulter Menu
                            </button>
                          </div>
                        </div>
                        <div className="square-violet">
                          <i className="far fa-info-square info" />
                          <span className="info-square-violet">Vous pouvez personnaliser vos articles dans l’étape
                            suivante.</span>
                        </div>
                      </div>
                    </div>
                    </div>
                    </div>
                    
                    <div className="menu-picker">
                      <div className="arrow">
                        <i className="icon-small-arrow-right" />
                      </div>
                      <div className="menu-p">
                        <div className="menu-picker-items">
                          <button className="picker-item">
                            Salades
                          </button>
                          <button className="picker-item">
                            Salades
                          </button>
                          <button className="picker-item">
                            Salades
                          </button>
                          <button className="picker-item">
                            Salades
                          </button>
                          <button className="picker-item">
                            Salades
                          </button>
                          <button className="picker-item">
                            Salades
                          </button>
                          <button className="picker-item">
                            Salades
                          </button>
                          <button className="picker-item">
                            Salades
                          </button>
                          <button className="picker-item">
                            Salades
                          </button>
                        </div>
                      </div>
                      <div className="arrow last">
                        <i className="icon-small-arrow-right" />
                      </div>
                      <span><i className="far fa-sliders-h set" /></span>
                    </div>
                    <div className="menu-first-panel">
                      <div className="title">
                        <span>Vous avez ajouté (11) articles dans Pizza.</span>
                      </div>
                      <div className="menu-first">
                        <div className="menu-body">
                          <div className="card">
                            <div className="cardTop">
                            </div>
                            <div className="cardBottom">
                              <div className="cardText">
                                <span className="food-name">Pizza Tornado</span>
                                <div className="sub-title">
                                  <p>Laitue, Blancs de poulet, Tranches pain de mie, Huile d’olive, Sauce César.</p>
                                  <p className="sub-title2">Mayonnaise, Jus de citron, Parmesan, Gousse d’aille, Poivre.</p>
                                </div>
                                <div className="price">
                                  <span>11.4 dt</span>
                                  <div className="rating-food">
                                    <i className="fal fa-star" />
                                    <i className="fal fa-star" />
                                    <i className="fal fa-star" />
                                    <i className="fal fa-star" />
                                    <i className="fal fa-star" />
                                  </div>
                                </div>
                                <div className="cardHoverText">
                                  <div className="menu-info-bottom">
                                    <div className="menu-info-bottom-content">
                                      <div className="time">
                                        <i className="fal fa-clock" />
                                        <span>15min</span>
                                      </div>
                                      <i className="fal fa-paper-plane paper" />
                                    </div>
                                    <div className="add-to-menu">
                                      <button> <i className="far fa-cart-plus" />Ajouter au menu</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="cardTop">
                            </div>
                            <div className="cardBottom">
                              <div className="cardText">
                                <span className="food-name">Pizza Tornado</span>
                                <div className="sub-title">
                                  <p>Laitue, Blancs de poulet, Tranches pain de mie, Huile d’olive, Sauce César.</p>
                                  <p className="sub-title2">Mayonnaise, Jus de citron, Parmesan, Gousse d’aille, Poivre.</p>
                                </div>
                                <div className="price">
                                  <span>11.4 dt</span>
                                  <div className="rating-food">
                                    <i className="fal fa-star" />
                                    <i className="fal fa-star" />
                                    <i className="fal fa-star" />
                                    <i className="fal fa-star" />
                                    <i className="fal fa-star" />
                                  </div>
                                </div>
                                <div className="cardHoverText">
                                  <div className="menu-info-bottom">
                                    <div className="menu-info-bottom-content">
                                      <div className="time">
                                        <i className="fal fa-clock" />
                                        <span>15min</span>
                                      </div>
                                      <i className="fal fa-paper-plane paper" />
                                    </div>
                                    <div className="add-to-menu">
                                      <button> <i className="far fa-cart-plus" />Ajouter au menu</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="cardTop">
                            </div>
                            <div className="cardBottom">
                              <div className="cardText">
                                <span className="food-name">Pizza Tornado</span>
                                <div className="sub-title">
                                  <p>Laitue, Blancs de poulet, Tranches pain de mie, Huile d’olive, Sauce César.</p>
                                  <p className="sub-title2">Mayonnaise, Jus de citron, Parmesan, Gousse d’aille, Poivre.</p>
                                </div>
                                <div className="price">
                                  <span>11.4 dt</span>
                                  <div className="rating-food">
                                    <i className="fal fa-star" />
                                    <i className="fal fa-star" />
                                    <i className="fal fa-star" />
                                    <i className="fal fa-star" />
                                    <i className="fal fa-star" />
                                  </div>
                                </div>
                                <div className="cardHoverText">
                                  <div className="menu-info-bottom">
                                    <div className="menu-info-bottom-content">
                                      <div className="time">
                                        <i className="fal fa-clock" />
                                        <span>15min</span>
                                      </div>
                                      <i className="fal fa-paper-plane paper" />
                                    </div>
                                    <div className="add-to-menu">
                                      <button> <i className="far fa-cart-plus" />Ajouter au menu</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div className="cardTop">
                            </div>
                            <div className="cardBottom">
                              <div className="cardText">
                                <span className="food-name">Pizza Tornado</span>
                                <div className="sub-title">
                                  <p>Laitue, Blancs de poulet, Tranches pain de mie, Huile d’olive, Sauce César.</p>
                                  <p className="sub-title2">Mayonnaise, Jus de citron, Parmesan, Gousse d’aille, Poivre.</p>
                                </div>
                                <div className="price">
                                  <span>11.4 dt</span>
                                  <div className="rating-food">
                                    <i className="fal fa-star" />
                                    <i className="fal fa-star" />
                                    <i className="fal fa-star" />
                                    <i className="fal fa-star" />
                                    <i className="fal fa-star" />
                                  </div>
                                </div>
                                <div className="cardHoverText">
                                  <div className="menu-info-bottom">
                                    <div className="menu-info-bottom-content">
                                      <div className="time">
                                        <i className="fal fa-clock" />
                                        <span>15min</span>
                                      </div>
                                      <i className="fal fa-paper-plane paper" />
                                    </div>
                                    <div className="add-to-menu">
                                      <button> <i className="far fa-cart-plus" />Ajouter au menu</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="seconde-panel3">
                    <div className="menu-to-confirmed">
                      <div className="articles">
                        <div className="arrow-left-iconS3">
                          <i className="fal fa-long-arrow-alt-left" />
                        </div>
                        <div className="nbrs-articles">
                          <img src="../assets/img/svg/Page-1.png" />
                          <div>
                            <span>Votre menu</span>
                            <span> (04 articles) </span>
                          </div>
                        </div>
                        <div className="delete-menu">
                          <i className="far fa-eraser" />
                          <span>Effacer menu</span>
                        </div>
                      </div>
                      <div className="price-to-pay">
                        <span>À payer</span>
                        <span>34.5 DT</span>
                      </div>
                    </div>
                    <div className="details-menu">
                      <div className="details-menu-top">
                        <div className="details-menu-img">
                          <img src="../assets/img/svg/74320c23bb79743963fcb643eb876e25.png" />
                        </div>
                        <div className="details-menu-left-side">
                          <div className="menu-name">
                            <span>Pizza Tornado - Medium</span>
                          </div>
                          <div className="ingredients-menu">
                            <span>Laitue, Blancs de poulet, Tranches pain de mie, Huile d’olive, Sauce César.</span>
                            <p> Mayonnaise, Jus de citron, Parmesan, Gousse d’aille, Poivre.</p>
                          </div>
                          <div className="evaluation-menu">
                            <span className="evaluation-title">Evaluez cet article</span>
                            <div className="rating">
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                            </div>
                          </div>
                          <div className="details-menu-personalize">
                            <div className="time-menu">
                              <i className="fal fa-clock" />
                              <span>15 min</span>
                            </div>
                            <button className="button-personalize">Personnaliser</button>
                          </div>
                        </div>
                      </div>
                      <div className="details-menu-bottom">
                        <div className="quantity-title">
                          <span>Quantité</span>
                        </div>
                        <div className="quantity-numbrer">
                          <i className="far fa-minus-square" />
                          <span>01</span>
                          <i className="far fa-plus-square" />
                        </div>
                        <div className="total-price">
                          <span className="price-title">Prix total</span>
                          <span className="price-number">11.4 dt</span>
                        </div>
                        <i className="fal fa-trash-alt" />
                      </div>
                    </div>
                    <div className="details-menu">
                      <div className="details-menu-top">
                        <div className="details-menu-img">
                          <img src="../assets/img/svg/74320c23bb79743963fcb643eb876e25.png" />
                        </div>
                        <div className="details-menu-left-side">
                          <div className="menu-name">
                            <span>Pizza Tornado - Medium</span>
                          </div>
                          <div className="ingredients-menu">
                            <span>Laitue, Blancs de poulet, Tranches pain de mie, Huile d’olive, Sauce César.</span>
                            <p> Mayonnaise, Jus de citron, Parmesan, Gousse d’aille, Poivre.</p>
                          </div>
                          <div className="evaluation-menu">
                            <span className="evaluation-title">Evaluez cet article</span>
                            <div className="rating">
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                            </div>
                          </div>
                          <div className="details-menu-personalize">
                            <div className="time-menu">
                              <i className="fal fa-clock" />
                              <span>15 min</span>
                            </div>
                            <button className="button-personalize">Personnaliser</button>
                          </div>
                        </div>
                      </div>
                      <div className="details-menu-bottom">
                        <div className="quantity-title">
                          <span>Quantité</span>
                        </div>
                        <div className="quantity-numbrer">
                          <i className="far fa-minus-square" />
                          <span>01</span>
                          <i className="far fa-plus-square" />
                        </div>
                        <div className="total-price">
                          <span className="price-title">Prix total</span>
                          <span className="price-number">11.4 dt</span>
                        </div>
                        <i className="fal fa-trash-alt" />
                      </div>
                    </div>
                    <div className="details-menu">
                      <div className="details-menu-top">
                        <div className="details-menu-img">
                          <img src="../assets/img/svg/74320c23bb79743963fcb643eb876e25.png" />
                        </div>
                        <div className="details-menu-left-side">
                          <div className="menu-name">
                            <span>Pizza Tornado - Medium</span>
                          </div>
                          <div className="ingredients-menu">
                            <span>Laitue, Blancs de poulet, Tranches pain de mie, Huile d’olive, Sauce César.</span>
                            <p> Mayonnaise, Jus de citron, Parmesan, Gousse d’aille, Poivre.</p>
                          </div>
                          <div className="evaluation-menu">
                            <span className="evaluation-title">Evaluez cet article</span>
                            <div className="rating">
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                            </div>
                          </div>
                          <div className="details-menu-personalize">
                            <div className="time-menu">
                              <i className="fal fa-clock" />
                              <span>15 min</span>
                            </div>
                            <button className="button-personalize">Personnaliser</button>
                          </div>
                        </div>
                      </div>
                      {/* <div className="separator"></div> */}
                      {/* <hr className="sepa"> */}
                      <div className="details-menu-bottom">
                        <div className="quantity-title">
                          <span>Quantité</span>
                        </div>
                        <div className="quantity-numbrer">
                          <i className="far fa-minus-square" />
                          <span>01</span>
                          <i className="far fa-plus-square" />
                        </div>
                        <div className="total-price">
                          <span className="price-title">Prix total</span>
                          <span className="price-number">11.4 dt</span>
                        </div>
                        <i className="fal fa-trash-alt" />
                      </div>
                    </div>
                  </div>
                  <div className="third-panel3">
                    <div className="menu-to-confirmed">
                      <div className="arrow-left-iconTh3">
                        <i className="fal fa-long-arrow-alt-left" />
                      </div>
                      <span className="personalization-of-ingredients">Personnalisation des ingrédients</span>
                      <button className="confirm">Confirmer</button>
                    </div>
                    <div className="customize-order">
                      <div className="customize-order-high-top">
                        <div className="customize-order-high-top-left-side">
                          <span className="Food-name">Pizza Tornado</span>
                          <div className="evalutaion">
                            <span className="evalutaion-title">Evaluez cet article</span>
                            <div className="rating">
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                            </div>
                          </div>
                        </div>
                        <div className="pizza-size">
                          <div className="size">S</div>
                          <div className="size">M</div>
                          <div className="size">L</div>
                          <div className="size">XL</div>
                        </div>
                      </div>
                      <div className="customize-order-img">
                        <img src="../assets/img/svg/pizza-third-panel3.png" />
                        <div className="details-menu-bottom">
                          <div className="quantity-title">
                            <span>Quantité</span>
                            <div className="quantity-numbrer">
                              <i className="far fa-minus-square" />
                              <span>01</span>
                              <i className="far fa-plus-square" />
                            </div>
                          </div>
                          <div className="total-price">
                            <span className="price-title">Prix total</span>
                            <span className="price-number">11.4 dt</span>
                          </div>
                        </div>
                      </div>
                      <div className="customize-order-Ingredients">
                        <div className="customize-order-Ingredients-header">
                          <span className="title">Ingrédients</span>
                          <div className="time">
                            <i className="fal fa-clock" />
                            <span>15min</span>
                          </div>
                        </div>
                        <div className="list-of-ingredients">
                          <button className="ingredients">Mauris placerat <i className="fa fa-times" /></button>
                          <button className="ingredients">Ami aceros<i className="fa fa-times" /></button>
                          <div className="ingredients">Scelerisque Fusce<i className="fa fa-times" /></div>
                          <div className="ingredients">Sagittis<i className="fa fa-times" /></div>
                          <div className="ingredients">Tempus dolor<i className="fa fa-times" /></div>
                          <div className="ingredients">Duis tempus metus<i className="fa fa-times" /></div>
                        </div>
                        <div className="new-ingredients-added">
                          <div className="new-ingredients-added-header">
                            <span className="title">( <span style={{color: '#FD6A00', fontWeight: 'bold'}}>06 </span>) nouveaux
                              ingrédients
                              ajoutés</span>
                            <div className="question-icon">
                              <i className="fa fa-question" />
                            </div>
                          </div>
                          <div className="list-of-ingredients">
                            <div id="dashed">Tomates <span>+1.4 dt</span> <i className="fa fa-times" /></div>
                            <div id="dashed">Olives <span>+0.6 dt</span><i className="fa fa-times" /></div>
                            <div id="dashed">Viande hachée <span>+3.8 dt</span><i className="fa fa-times" /></div>
                            <div id="dashed">Vermatisu jserd <span>+2.1 dt</span><i className="fa fa-times" /></div>
                            <div id="dashed">Lorem ispul <span>+3.6 dt</span><i className="fa fa-times" /></div>
                          </div>
                        </div>
                      </div>
                      {/* <hr style="color: #d5d5d5;"> */}
                      <div className="customize-order-add-Ingredients">
                        <div className="first-title">
                          <span>Ajouter des ingrédients</span>
                        </div>
                        <input type="text" placeholder="Saisir tag et taper ENTREE pour confirmer" />
                        <div className="seconde-title">
                          <span>Ou-bien choisir des listes suivantes</span>
                        </div>
                        {/* methode-2 */}
                        <div className="list-of-ingredients-to-choose">
                          <div className="confirmation-bottom-content">
                            <i className="fal fa-wheat" />
                            <span className="title">Céréales</span>
                            <span className="numbers-of-ingr">Il existe 16 ingrédients</span>
                            <i className="fa fa-plus  show-plus" />
                            <i className="fa fa-minus  close-ing" />
                            <span className="numbers-in-the-list">( <span style={{color: '#FF6900'}}> 00</span> ) dans la liste</span>
                            <div className="menu-customization-confirmation-ingredients">
                              <div className="list-of-ingredients">
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img className="avatar" src="../assets/img/svg/olives.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Olives</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/carottes.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">carottes</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/tomates.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Tomates</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/piments.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Piments</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/brocoli.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Brocoli</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/olives.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Olives</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-of-ingredients-to-choose">
                          <div className="confirmation-bottom-content">
                            <i className="fal fa-carrot" />
                            <span className="title">Légumes</span>
                            <span className="numbers-of-ingr">Il existe 16 ingrédients</span>
                            <i className="fa fa-plus  show-plus" />
                            <i className="fa fa-minus  close-ing" />
                            <span className="numbers-in-the-list">( <span style={{color: '#FF6900'}}> 00</span> ) dans la liste</span>
                            <div className="menu-customization-confirmation-ingredients">
                              <div className="list-of-ingredients">
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img className="avatar" src="../assets/img/svg/olives.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Olives</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/carottes.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">carottes</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/tomates.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Tomates</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/piments.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Piments</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/brocoli.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Brocoli</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/olives.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Olives</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-of-ingredients-to-choose">
                          <div className="confirmation-bottom-content">
                            <i className="far fa-apple-alt" />
                            <span className="title">Fruits</span>
                            <span className="numbers-of-ingr">Il existe 16 ingrédients</span>
                            <i className="fa fa-plus  show-plus" />
                            <i className="fa fa-minus  close-ing" />
                            <span className="numbers-in-the-list">( <span style={{color: '#FF6900'}}> 00</span> ) dans la liste</span>
                            <div className="menu-customization-confirmation-ingredients">
                              <div className="list-of-ingredients">
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img className="avatar" src="../assets/img/svg/olives.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Olives</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/carottes.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">carottes</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/tomates.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Tomates</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/piments.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Piments</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/brocoli.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Brocoli</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/olives.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Olives</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-of-ingredients-to-choose">
                          <div className="confirmation-bottom-content">
                            <i className="far fa-fish" />
                            <span className="title">Poissons</span>
                            <span className="numbers-of-ingr">Il existe 16 ingrédients</span>
                            <i className="fa fa-plus  show-plus" />
                            <i className="fa fa-minus  close-ing" />
                            <span className="numbers-in-the-list">( <span style={{color: '#FF6900'}}> 00</span> ) dans la liste</span>
                            <div className="menu-customization-confirmation-ingredients">
                              <div className="list-of-ingredients">
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img className="avatar" src="../assets/img/svg/olives.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Olives</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/carottes.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">carottes</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/tomates.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Tomates</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/piments.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Piments</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/brocoli.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Brocoli</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/olives.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Olives</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-of-ingredients-to-choose">
                          <div className="confirmation-bottom-content">
                            <i className="far fa-mortar-pestle" />
                            <span className="title">Épices</span>
                            <span className="numbers-of-ingr">Il existe 16 ingrédients</span>
                            <i className="fa fa-plus  show-plus" />
                            <i className="fa fa-minus  close-ing" />
                            <span className="numbers-in-the-list">( <span style={{color: '#FF6900'}}> 00</span> ) dans la liste</span>
                            <div className="menu-customization-confirmation-ingredients">
                              <div className="list-of-ingredients">
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img className="avatar" src="../assets/img/svg/olives.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Olives</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/carottes.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">carottes</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/tomates.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Tomates</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/piments.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Piments</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/brocoli.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Brocoli</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/olives.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Olives</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-of-ingredients-to-choose">
                          <div className="confirmation-bottom-content">
                            <i className="fal fa-ball-pile" />
                            <span className="title">Divers</span>
                            <span className="numbers-of-ingr">Il existe 16 ingrédients</span>
                            <i className="fa fa-plus  show-plus" />
                            <i className="fa fa-minus  close-ing" />
                            <span className="numbers-in-the-list">( <span style={{color: '#FF6900'}}> 00</span> ) dans la liste</span>
                            <div className="menu-customization-confirmation-ingredients">
                              <div className="list-of-ingredients">
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img className="avatar" src="../assets/img/svg/olives.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Olives</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/carottes.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">carottes</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/tomates.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Tomates</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/piments.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Piments</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/brocoli.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Brocoli</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-ingredients">
                                  <div className="card-ingredients-header">
                                    <img src="../assets/img/svg/olives.png" />
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">Olives</span>
                                  </div>
                                  <div className="card-ingredients-footer">
                                    <div className="follow-button">
                                      <span>+2.3 dt</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* end of methode2 */}
                      </div>
                    </div>
                    <div className="menu-to-confirmed-bottom">
                      <div className="arrow-left-iconTh3">
                        <i className="fal fa-long-arrow-alt-left" />
                      </div>
                      <button className="confirm">Confirmer</button>
                    </div>
                  </div>
                  <div className="fourth-panel3">
                    <div className="fourth-panel3-header">
                      <div className="commander">
                        <div>
                          Commander
                          <i className="fal fa-shopping-cart" />
                        </div>
                        <a className="button-commander-hover" href="paiement.html">
                          {/* <span> Commander <img src="../assets/img/svg/commander.png"></span> */}
                          <div className="toggle-switch">
                            <span>Sur place</span>
                            <div className="switch">
                              <input className="switch-input" id="exampleSwitch" type="checkbox" name="exampleSwitch" />
                              <label className="switch-paddle" htmlFor="exampleSwitch">
                                <span className="show-for-sr">Download Kittens</span>
                              </label>
                            </div>
                            <span>Take a way</span>
                          </div>
                        </a>
                      </div>
                      <div className="fourth-p3-header-right-side">
                        <button className="save">Sauvegarder
                          <i className="far fa-book-heart" />
                        </button>
                        <button className="reserver">
                          <a href="booking-page.html">
                            Réserver <i className="fal fa-chair" /> </a></button>
                      </div>
                    </div>
                    <div className="customize-order-final-step">
                      <div className="menu-customization-confirmation">
                        <div className="customize-order-confirmation-high-top">
                          <div className="customize-order-high-top-left-side">
                            <div className="vertical-line" />
                            <div>
                              <span className="food-name">Pasta Fruits de mer</span>
                              <div className="evalutaion">
                                <span className="evalutaion-title">Evaluez cet article</span>
                                <div className="rating">
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
                        <div className="customize-order-img">
                          <img src="../assets/img/svg/pasta.png" />
                          <div className="details-menu-bottom">
                            <div className="quantity-title">
                              <span>Quantité</span>
                              <div className="quantity-numbrer">
                                <span>02</span>
                              </div>
                            </div>
                            <div className="time">
                              <i className="fal fa-clock" />
                              <span>23 min</span>
                            </div>
                            <div className="total-price">
                              <span className="price-title">Prix total</span>
                              <span className="price-number">65.8 dt</span>
                            </div>
                          </div>
                        </div>
                        <div className="menu-customization-confirmation-bottom">
                          <div className="confirmation-bottom-content">
                            <span className="title">Ingrédients</span>
                            <i className="fa fa-plus  f4-plus" />
                            <i className="fa fa-minus  f4-minus" />
                            <div className="menu-customization-confirmation-ingredients">
                              <div className="list-of-ingredients">
                                <button className="ingredients">Mauris placerat <i className="fa fa-times" /></button>
                                <button className="ingredients">Ami aceros<i className="fa fa-times" /></button>
                                <div className="ingredients">Scelerisque Fusce<i className="fa fa-times" /></div>
                                <div className="ingredients">Sagittis<i className="fa fa-times" /></div>
                                <div className="ingredients">Tempus dolor<i className="fa fa-times" /></div>
                                <div className="ingredients">Duis tempus metus<i className="fa fa-times" /></div>
                              </div>
                              <div className="menu-customization-confirmation-new-ingredients">
                                <div className="list-header">
                                  <span className="title">( <span style={{color: '#FD6A00', fontWeight: 'bold'}}>06 </span>)
                                    nouveaux
                                    ingrédients
                                    ajoutés</span>
                                </div>
                                <div className="list-of-new-ingredients">
                                  <div> <span>Tomates</span> <i className="fa fa-times" /></div>
                                  <div> <span>Olives</span><i className="fa fa-times" /></div>
                                  <div><span>Viande hachée </span><i className="fa fa-times" /></div>
                                  <div><span>Vermatisu jserd </span><i className="fa fa-times" /></div>
                                  <div> <span>Lorem ispul</span><i className="fa fa-times" /></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="menu-customization-confirmation">
                        <div className="customize-order-confirmation-high-top">
                          <div className="customize-order-high-top-left-side">
                            <div className="vertical-line" />
                            <div>
                              <span className="food-name">Pasta Fruits de mer</span>
                              <div className="evalutaion">
                                <span className="evalutaion-title">Evaluez cet article</span>
                                <div className="rating">
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
                        <div className="customize-order-img">
                          <img src="../assets/img/svg/pasta.png" />
                          <div className="details-menu-bottom">
                            <div className="quantity-title">
                              <span>Quantité</span>
                              <div className="quantity-numbrer">
                                <span>02</span>
                              </div>
                            </div>
                            <div className="time">
                              <i className="fal fa-clock" />
                              <span>23 min</span>
                            </div>
                            <div className="total-price">
                              <span className="price-title">Prix total</span>
                              <span className="price-number">65.8 dt</span>
                            </div>
                          </div>
                        </div>
                        <div className="menu-customization-confirmation-bottom">
                          <div className="confirmation-bottom-content">
                            <span className="title">Ingrédients</span>
                            <i className="fa fa-plus  f4-plus" />
                            <i className="fa fa-minus  f4-minus" />
                            <div className="menu-customization-confirmation-ingredients">
                              <div className="list-of-ingredients">
                                <button className="ingredients">Mauris placerat <i className="fa fa-times" /></button>
                                <button className="ingredients">Ami aceros<i className="fa fa-times" /></button>
                                <div className="ingredients">Scelerisque Fusce<i className="fa fa-times" /></div>
                                <div className="ingredients">Sagittis<i className="fa fa-times" /></div>
                                <div className="ingredients">Tempus dolor<i className="fa fa-times" /></div>
                                <div className="ingredients">Duis tempus metus<i className="fa fa-times" /></div>
                              </div>
                              <div className="menu-customization-confirmation-new-ingredients">
                                <div className="list-header">
                                  <span className="title">( <span style={{color: '#FD6A00', fontWeight: 'bold'}}>06 </span>)
                                    nouveaux
                                    ingrédients
                                    ajoutés</span>
                                </div>
                                <div className="list-of-new-ingredients">
                                  <div> <span>Tomates</span> <i className="fa fa-times" /></div>
                                  <div> <span>Olives</span><i className="fa fa-times" /></div>
                                  <div><span>Viande hachée </span><i className="fa fa-times" /></div>
                                  <div><span>Vermatisu jserd </span><i className="fa fa-times" /></div>
                                  <div> <span>Lorem ispul</span><i className="fa fa-times" /></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="menu-customization-confirmation">
                        <div className="customize-order-confirmation-high-top">
                          <div className="customize-order-high-top-left-side">
                            <div className="vertical-line" />
                            <div>
                              <span className="food-name">Pasta Fruits de mer</span>
                              <div className="evalutaion">
                                <span className="evalutaion-title">Evaluez cet article</span>
                                <div className="rating">
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
                        <div className="customize-order-img">
                          <img src="../assets/img/svg/pasta.png" />
                          <div className="details-menu-bottom">
                            <div className="quantity-title">
                              <span>Quantité</span>
                              <div className="quantity-numbrer">
                                <span>02</span>
                              </div>
                            </div>
                            <div className="time">
                              <i className="fal fa-clock" />
                              <span>23 min</span>
                            </div>
                            <div className="total-price">
                              <span className="price-title">Prix total</span>
                              <span className="price-number">65.8 dt</span>
                            </div>
                          </div>
                        </div>
                        <div className="menu-customization-confirmation-bottom">
                          <div className="confirmation-bottom-content">
                            <span className="title">Ingrédients</span>
                            <i className="fa fa-plus  f4-plus" />
                            <i className="fa fa-minus  f4-minus" />
                            <div className="menu-customization-confirmation-ingredients">
                              <div className="list-of-ingredients">
                                <button className="ingredients">Mauris placerat <i className="fa fa-times" /></button>
                                <button className="ingredients">Ami aceros<i className="fa fa-times" /></button>
                                <div className="ingredients">Scelerisque Fusce<i className="fa fa-times" /></div>
                                <div className="ingredients">Sagittis<i className="fa fa-times" /></div>
                                <div className="ingredients">Tempus dolor<i className="fa fa-times" /></div>
                                <div className="ingredients">Duis tempus metus<i className="fa fa-times" /></div>
                              </div>
                              <div className="menu-customization-confirmation-new-ingredients">
                                <div className="list-header">
                                  <span className="title">( <span style={{color: '#FD6A00', fontWeight: 'bold'}}>06 </span>)
                                    nouveaux
                                    ingrédients
                                    ajoutés</span>
                                </div>
                                <div className="list-of-new-ingredients">
                                  <div> <span>Tomates</span> <i className="fa fa-times" /></div>
                                  <div> <span>Olives</span><i className="fa fa-times" /></div>
                                  <div><span>Viande hachée </span><i className="fa fa-times" /></div>
                                  <div><span>Vermatisu jserd </span><i className="fa fa-times" /></div>
                                  <div> <span>Lorem ispul</span><i className="fa fa-times" /></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fourth-panel3-header">
                      <div className="commander">
                        <div>
                          Commander
                          <i className="fal fa-shopping-cart" />
                        </div>
                        <a className="button-commander-hover" href="paiement.html">
                          {/* <span> Commander <img src="../assets/img/svg/commander.png"></span> */}
                          <div className="toggle-switch">
                            <span>Sur place</span>
                            <div className="switch">
                              <input className="switch-input" id="exampleSwitch2" type="checkbox" name="exampleSwitch" />
                              <label className="switch-paddle" htmlFor="exampleSwitch2">
                                <span className="show-for-sr">Download Kittens</span>
                              </label>
                            </div>
                            <span>Take a way</span>
                          </div>
                        </a>
                      </div>
                      <div className="fourth-p3-header-right-side">
                        <button className="save">Sauvegarder <i className="far fa-book-heart" /></button>
                        <button className="reserver">
                          <a href="booking-page.html">
                            Réserver <i className="fal fa-chair" /> </a></button>
                      </div>
                    </div>
                    <div className="fourth-p3-bottom">
                      <div className="important">
                        <i className="far fa-exclamation-square" />
                        <span>Important</span>
                      </div>
                      <div className="imporant-p">
                        <span>Si vous choisissez de réserver cet menu, vous serez invité à choisir une des deux options
                          suivantes:
                        </span>
                        <div>
                          <img src="../assets/img/svg/Ellipse 485.png" alt="" />
                          <span> Créer une nouvelle réservation avec ce restaurant. </span>
                        </div>
                        <div>
                          <img src="../assets/img/svg/Ellipse 485.png" alt="" />
                          <span>Associez ce menu à une réservation encore valable avec ce même restaurant.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tabs-panel" id="panel4">
                  <div className="evaluation-top">
                    <div className="percentages-evaluation">
                      <div className="header">
                        <div className="raiting">
                          <i className="fal fa-star" />
                          <i className="fal fa-star" />
                          <i className="fal fa-star" />
                          <i className="fal fa-star" />
                          <i className="fal fa-star" />
                        </div>
                        <div className="right-side">
                          <span className="number">4.2/5</span>
                          <span className="vote">12 votes</span>
                        </div>
                      </div>
                      <div className="main">
                        <div className="item">
                          <span className="number-of-star">1 étoile</span>
                          <div className="progress-bar">
                            <span className="progress-bar__inner" style={{width: '10%'}} />
                          </div>
                          <span className="pourcentage">12%</span>
                        </div>
                        <div className="item">
                          <span className="number-of-star">2 étoile</span>
                          <div className="progress-bar">
                            <span className="progress-bar__inner" style={{width: '25%'}} />
                          </div>
                          <span className="pourcentage">12%</span>
                        </div>
                        <div className="item">
                          <span className="number-of-star">3 étoile</span>
                          <div className="progress-bar">
                            <span className="progress-bar__inner" style={{width: '45%'}} />
                          </div>
                          <span className="pourcentage">12%</span>
                        </div>
                        <div className="item">
                          <span className="number-of-star">4 étoile</span>
                          <div className="progress-bar">
                            <span className="progress-bar__inner" style={{width: '90%'}} />
                          </div>
                          <span className="pourcentage">12%</span>
                        </div>
                        <div className="item">
                          <span className="number-of-star">5 étoile</span>
                          <div className="progress-bar">
                            <span className="progress-bar__inner" style={{width: '15%'}} />
                          </div>
                          <span className="pourcentage">12%</span>
                        </div>
                      </div>
                    </div>
                    <div className="news-evalutaion">
                      <span> <strong>5 </strong> nouvelles évaluations.</span>
                      <div className="peoples">
                        <div className="people">
                          <img src="../assets/img/avatar.png" />
                        </div>
                        <div className="people">
                          <img src="../assets/img/avatar.png" />
                        </div>
                        <div className="people">
                          <img src="../assets/img/avatar.png" />
                        </div>
                        <div className="people">
                          <img src="../assets/img/avatar.png" />
                        </div>
                        <div className="people">
                          <img src="../assets/img/avatar.png" />
                        </div>
                      </div>
                      <span className="examine">Examiner</span>
                    </div>
                  </div>
                  <div className="evaluation">
                    <div className="evaluation-header">
                      <span className="evaluation-label">Avis <strong>14555</strong> </span>
                      <span className="evaluation-options">
                        Les plus récents
                        <i className="fal fa-sort-down" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  <div className="card post-card">
                    <div className="post-card-header">
                      <div className="post-card-photo more" />
                    </div>
                    <div className="post-card-body">
                      <div className="user-who-post-wrapper">
                        <div className="user-who-post">
                          <div className="user-who-post-info">
                            <div className="user-who-post-info-avatar">
                              <img src="../assets/img/avatar.png" />
                            </div>
                            <div className="user-who-post-info-info">
                              <span className="user-username">Alex</span>
                              <div className="user-about">
                                <i className="fal fa-map-marker-alt" />
                                <span> Mado Café &amp; Resto</span>
                              </div>
                            </div>
                          </div>
                          <div className="user-who-post-options">
                            <div className="raiting">
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                            </div>
                            <div className="header-note">
                              <span>3.5 <strong>/5</strong></span>
                            </div>
                          </div>
                        </div>
                        <div className="post-card-body-description-user">
                          <div className="description-note">
                            <span className="note">3/5</span>
                            <span className="date">12 janvier 2020 à 18:30</span>
                          </div>
                          <span className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum sit
                            amet metus ut faucibus. Ut tempus lobortis elit, nec consequat mauris tincidunt vitae.
                            Cras sodales, mi non gravida venenatis, ante tortor aliquam ante, in ornare magna
                            tortor dapibus mauris. Vivamus ut lacus commodo lorem aliquam iaculis. Fusce sit amet pretium
                            enim.</span>
                        </div>
                      </div>
                    </div>
                    <div className="divider" />
                    <div className="post-card-footer">
                      <div className="post-card-social-info">
                        <div className="post-card-likes">
                          <i className="icon-heart" />
                          <span className="likes-number">33</span>
                        </div>
                        <div className="post-card-comments">
                          <i className="icon-comment" />
                          <span className="comments-number">32</span>
                          <span className="comments-show-more">Masquer commentaires</span>
                        </div>
                        <div className="post-card-comment-button">
                          <i className="fal fa-flag"> </i>
                        </div>
                      </div>
                      <div className="post-card-comment">
                        <div className="post-card-comment-avatar">
                          <img src="../assets/img/avatar.png" />
                          <i className="fal fa-sort-down" aria-hidden="true" />
                        </div>
                        <div className="post-card-comment-input">
                          <input placeholder="Commenter ce post" className="post-card-comment-input-field" type="text" />
                          <div className="comment-options">
                            <i className="icon-camera" />
                            <i className="icon-smile" />
                            <i className="icon-mic" />
                          </div>
                        </div>
                      </div>
                      <div className="post-card-comments-list">
                        <div className="who-comment">
                          <div className="who-comment-info">
                            <img src="../assets/img/avatar.png" />
                            <span className="who-comment-info-username">Alex </span>
                          </div>
                          <div className="who-comment-info-description">
                            Proin sit amet ipsum eget ante venenatis posuere.
                            Maecenas diam risus, accumsan at facilisis sit amet,
                            eleifend et arcu. Nam viverra pharetra condimentum.
                            Vestibulum dui metus, fringilla sed facilisis ut,
                            congue ut tortor.
                          </div>
                        </div>
                        <div className="who-comment">
                          <div className="who-comment-info">
                            <img src="../assets/img/avatar.png" />
                            <span className="who-comment-info-username">Scholes</span>
                          </div>
                          <div className="who-comment-info-description">
                            Proin sit amet ipsum eget ante venenatis posuere.
                            Maecenas diam risus, accumsan at facilisis sit amet,
                            eleifend et arcu. Nam viverra pharetra condimentum.
                            Vestibulum dui metus, fringilla sed facilisis ut,
                            congue ut tortor.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card post-card">
                    <div className="post-card-header">
                      <div className="post-card-photo more" />
                    </div>
                    <div className="post-card-body">
                      <div className="user-who-post-wrapper">
                        <div className="user-who-post">
                          <div className="user-who-post-info">
                            <div className="user-who-post-info-avatar">
                              <img src="../assets/img/avatar.png" />
                            </div>
                            <div className="user-who-post-info-info">
                              <span className="user-username">Alex</span>
                              <div className="user-about">
                                <i className="fal fa-map-marker-alt" />
                                <span> Mado Café &amp; Resto</span>
                              </div>
                            </div>
                          </div>
                          <div className="user-who-post-options">
                            <div className="raiting">
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                              <i className="fal fa-star" />
                            </div>
                            <div className="header-note">
                              <span>3.5 <strong>/5</strong></span>
                            </div>
                          </div>
                        </div>
                        <div className="post-card-body-description-user">
                          <div className="description-note">
                            <span className="note">3/5</span>
                            <span className="date">12 janvier 2020 à 18:30</span>
                          </div>
                          <span className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum sit
                            amet metus ut faucibus. Ut tempus lobortis elit, nec consequat mauris tincidunt vitae.
                            Cras sodales, mi non gravida venenatis, ante tortor aliquam ante, in ornare magna
                            tortor dapibus mauris. Vivamus ut lacus commodo lorem aliquam iaculis. Fusce sit amet pretium
                            enim.</span>
                        </div>
                      </div>
                    </div>
                    <div className="divider" />
                    <div className="post-card-footer">
                      <div className="post-card-social-info">
                        <div className="post-card-likes">
                          <i className="icon-heart" />
                          <span className="likes-number">33</span>
                        </div>
                        <div className="post-card-comments">
                          <i className="icon-comment" />
                          <span className="comments-number">32</span>
                          <span className="comments-show-more">Masquer commentaires</span>
                        </div>
                        <div className="post-card-comment-button">
                          <i className="fa fa-flag"> </i>
                        </div>
                      </div>
                      <div className="post-card-comment">
                        <div className="post-card-comment-avatar">
                          <img src="../assets/img/avatar.png" />
                          <i className="fal fa-sort-down" aria-hidden="true" />
                        </div>
                        <div className="post-card-comment-input">
                          <input placeholder="Commenter ce post" className="post-card-comment-input-field" type="text" />
                          <div className="comment-options">
                            <i className="icon-camera" />
                            <i className="icon-smile" />
                            <i className="icon-mic" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="feed-secondary">
              <div className="contact">
                <button className="phone-number">
                  <div className="phone-number-avatar">
                    {/* <span className="fa fa-phone-volume" style="color: #FF6900; font-size: 2rem;"></span> */}
                    <i className="fal fa-phone-volume" style={{color: '#FF6900', fontSize: '2rem'}} />
                  </div>
                  <div className="phone-number-info">
                    <span className="info-title">+216 73 367 283</span>
                  </div>
                </button>
                <button className="suivi-nous">
                  <div className="suivi-nous-avatar">
                    <img src="../assets/img/svg/fork.png" />
                  </div>
                  <span>Suivi-nous</span>
                </button>
              </div>
              <button className="reservations">
                <div className="reservation-left-side">
                  <a className="reservations-title" href="booking-page.html">
                    <i className="fal fa-chair" />
                    Réservez maintenant
                  </a>
                </div>
                <div className="reservations-right-side">
                  <i className="far fa-comment-dots" />
                </div>
              </button>
              <div className="list-icon">
                <div>
                  <i className="fal fa-bookmark" />
                  <span>Bookmark</span>
                </div>
                <div>
                  <i className="fal fa-pennant" />
                  <span>Bookmark</span>
                </div>
                <div> <i className="fal fa-share-alt" />
                  <span>Bookmark</span>
                </div>
              </div>
              <div className="completion">
                <img src="../assets/img/svg/907df2d946029c574d06706a33dfded8.png" />
                <div className="completion-main">
                  <div className="completion-title">
                    Achèvement du profil
                  </div>
                  <div className="completion-profil-cheched">
                    <i className="fa fa-square fa-2x checked" />
                    <i className="fa fa-square fa-2x checked" />
                    <i className="fa fa-square fa-2x checked" />
                    <i className="fa fa-square fa-2x checked" />
                    <i className="fa fa-square fa-2x" />
                    <i className="fa fa-square fa-2x" />
                    <span>Encore 2 étapes</span>
                  </div>
                </div>
                <div className="icon-flech-right"> <span><i className="icon-small-arrow-right" /></span></div>
              </div>
              <div className="shared-component-location">
                <div className="shared-component-location-first-title"><span>Vous êtes à Sousse</span></div>
                <div className="shared-component-location-maps">
                  <div>
                    <img src="../assets/img/svg/map.png" />
                  </div>
                  <div className="shared-component-location-bottom">
                    <div className="shared-component-adress">
                      <span>Adresse</span>
                      <span>12 Rude la Liberté, Sousse</span>
                    </div>
                    <div className="shared-component-adress-panneau">
                      <i className="fal fa-map-signs" />
                    </div>
                  </div>
                  <div className="shared-component-profil">
                    <div>
                      <span>Ils étaient chez là</span>
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
              <div className="last-visit-restaurant">
                <div className="last-visit-restaurant-title">
                  <span>Dernières visites à ce restaurant</span>
                </div>
                <div className="last-visit-restaurant-profil">
                  <img src="../assets/img/Ellipse 379.png" />
                  <img src="../assets/img/Ellipse 382.png" />
                  <img src="../assets/img/svg/Ellipse 380.png" />
                  <span> <strong>Moez</strong>,<strong>Sana</strong> et 7 autres personnes</span>
                </div>
              </div>
              <div className="invite-friends">
                <div className="invite-friends-title">
                  Invitez vos amis à visiter ce restaurant
                </div>
                <p>
                  Envoyez une invitation par e-mail pour nous rejoindre et recevez
                  <strong className="highlighted">100 TAKAK</strong> pour chaque <strong> 5 inscriptions confirmées</strong>.
                </p>
                <div className="invite-input">
                  <label>Adresse e-mail</label>
                  <input type="text" placeholder="Ex: mongi@email.com" />
                  <i className="fal fa-paper-plane" aria-hidden="true" />
                </div>
              </div>
              <div className="footer-shared">
                <div className="footer-shared-left-side">
                  <span>Politique de confidentialité</span>
                </div>
                <div className="footer-shared-right-side">
                  <span>Français</span>
                  <i className="far fa-globe-africa" />
                </div>
              </div>
            </div>
          </div>
        </div>
     
      </div>
    )
}

CustomizeMenu.propTypes = {

}

export default CustomizeMenu

