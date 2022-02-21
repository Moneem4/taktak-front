import React from 'react';
import Slider from 'infinite-react-carousel';

function SideBarPlusLus(props) {
    const {} = props;

    const settings =  {
      autoplay: true,
      //dots: true,
      //dotsScroll: 4
    };

    return (
      <div>
        <div className="most-read-articles">
          <span className="title-feed-secondary">
            Articles les plus lus
          </span>
          <span className="show">Voir tout</span>
        </div>
        <div className="orbit" data-auto-play="false" role="region" data-orbit="kwf537-orbit" data-use-m-u-i="false" data-resize="esym5o-orbit" id="esym5o-orbit" data-events="resize">
          <div className="orbit-wrapper-feed-secondary">
            <div className="orbit-content">
              <Slider { ...settings }>
                <div>
                  <div className="post-card-header">
                    <div className="post-card-photo" />
                      <img src="../assets/img/33a033a489378e066e29560a20381466.png" />
                    </div>
                    <div className="post-card-body">
                      <div className="user-who-post-wrapper">
                        <span className="post-card-title">
                          Catégorie Culinaire
                        </span>
                        <span className="post-card-subtitle">
                          Pellentesque fringilla, ex at scelerisque sagittis
                        </span>
                        <span className="post-card-description">
                          Suspendisse placerat venenatis iaculis. Nam id
                          hendrerit mauris, a lacinia ex. Cras sollicitudin at
                          nibh eu ullamcorper. Duis hendrerit massa vel justo
                          pellentesque vehicula. Proin
                        </span>
                      </div>
                    </div>
                </div>
                <div>
                  <div className="post-card-header">
                    <div className="post-card-photo" />
                      <img src="../assets/img/33a033a489378e066e29560a20381466.png" />
                    </div>
                    <div className="post-card-body">
                      <div className="user-who-post-wrapper">
                        <span className="post-card-title">
                          Catégorie Culinaire
                        </span>
                        <span className="post-card-subtitle">
                          Pellentesque fringilla, ex at scelerisque sagittis
                        </span>
                        <span className="post-card-description">
                          Suspendisse placerat venenatis iaculis. Nam id
                          hendrerit mauris, a lacinia ex. Cras sollicitudin at
                          nibh eu ullamcorper. Duis hendrerit massa vel justo
                          pellentesque vehicula. Proin
                        </span>
                      </div>
                    </div>
                    <div className="profil-foodlist">
                      <div className="visitor">
                        <div className="visitor-avatar">
                          <img src="../assets/img/rafika-bella.png" />
                        </div>
                        <div className="visitor-info">
                          <span className="user-username">Mongi</span>
                          <div className="user-about">
                            <i className="fal fa-map-marker-alt" aria-hidden="true" />
                            <span> Marsa, Tunis</span>
                          </div>
                        </div>
                      </div>
                      <div className="follow-button">
                        <i className="icon-add-friend" />
                      </div>
                    </div>
                  </div>
                <div>
                  <div className="post-card-header">
                    <div className="post-card-photo" />
                    <img src="../assets/img/33a033a489378e066e29560a20381466.png" />
                  </div>
                  <div className="post-card-body">
                    <div className="user-who-post-wrapper">
                      <span className="post-card-title">
                        Catégorie Culinaire
                      </span>
                      <span className="post-card-subtitle">
                        Pellentesque fringilla, ex at scelerisque sagittis
                      </span>
                      <span className="post-card-description">
                        Suspendisse placerat venenatis iaculis. Nam id
                        hendrerit mauris, a lacinia ex. Cras sollicitudin at
                        nibh eu ullamcorper. Duis hendrerit massa vel justo
                        pellentesque vehicula. Proin
                      </span>
                    </div>
                  </div>
                  <div className="profil-foodlist">
                    <div className="visitor">
                      <div className="visitor-avatar">
                        <img src="../assets/img/rafika-bella.png" />
                      </div>
                      <div className="visitor-info">
                        <span className="user-username">Mohamed Amine</span>
                        <div className="user-about">
                          <i className="fal fa-map-marker-alt" aria-hidden="true" />
                          <span> Marsa, Tunis</span>
                        </div>
                      </div>
                    </div>
                    <div className="follow-button">
                      <i className="icon-add-friend" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="post-card-header">
                    <div className="post-card-photo" />
                    <img src="../assets/img/33a033a489378e066e29560a20381466.png" />
                  </div>
                  <div className="post-card-body">
                    <div className="user-who-post-wrapper">
                      <span className="post-card-title">
                        Catégorie Culinaire
                      </span>
                      <span className="post-card-subtitle">
                        Pellentesque fringilla, ex at scelerisque sagittis
                      </span>
                      <span className="post-card-description">
                        Suspendisse placerat venenatis iaculis. Nam id
                        hendrerit mauris, a lacinia ex. Cras sollicitudin at
                        nibh eu ullamcorper. Duis hendrerit massa vel justo
                        pellentesque vehicula. Proin
                      </span>
                    </div>
                  </div>
                  <div className="profil-foodlist">
                    <div className="visitor">
                      <div className="visitor-avatar">
                        <img src="../assets/img/rafika-bella.png" />
                      </div>
                      <div className="visitor-info">
                        <span className="user-username">Ahlem</span>
                        <div className="user-about">
                          <i className="fal fa-map-marker-alt" aria-hidden="true" />
                          <span> Marsa, Tunis</span>
                        </div>
                      </div>
                    </div>
                    <div className="follow-button">
                      <i className="icon-add-friend" />
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    )
}

SideBarPlusLus.propTypes = {

}

export default SideBarPlusLus