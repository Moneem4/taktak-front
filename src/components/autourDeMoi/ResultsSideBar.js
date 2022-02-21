import React from "react";

function ProposerMoiSideBar(props) {
    
    return ( 
      <div className="more">
        <div className="location-maps">
          <img src="../../assets/img/CaptureMaps.png" className="maps" />
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
        <div className="top-foodies">
          <ul className="tabs" data-tabs id="foodies-tabs">
            <li className="tabs-title is-active">
              <a href="#fpanel1" aria-selected="true">TOP5 Foodies</a>
            </li>
            <li className="tabs-title">
              <a data-tabs-target="fpanel2" href="#fpanel2">Best Photo</a>
            </li>
            <li className="tabs-title">
              <a data-tabs-target="fpanel3" href="#fpanel3">Best Blogger</a>
            </li>
          </ul>
          <div className="tabs-content foodies-tabs-content" data-tabs-content="foodies-tabs">
            <div className="tabs-panel is-active" id="fpanel1">
              <div className="one-foodie">
                <span className="one-foodie-number">#1</span>
                <img className="avatar" src="../../assets/img/avatar.png" />
                <div className="one-foodie-info">
                  <span className="one-foodie-info-name">Imen</span>
                  <p>
                    38 Restos visités . 51 photos prises . 19 posts partagés
                  </p>
                </div>
              </div>
              <div className="one-foodie">
                <span className="one-foodie-number">#2</span>
                <img className="avatar" src="../../assets/img/avatar.png" />
                <div className="one-foodie-info">
                  <span className="one-foodie-info-name">Imen</span>
                  <p>
                    38 Restos visités . 51 photos prises . 19 posts partagés
                  </p>
                </div>
              </div>
              <div className="one-foodie">
                <span className="one-foodie-number">#3</span>
                <img className="avatar" src="../../assets/img/avatar.png" />
                <div className="one-foodie-info">
                  <span className="one-foodie-info-name">Imen</span>
                  <p>
                    38 Restos visités . 51 photos prises . 19 posts partagés
                  </p>
                </div>
              </div>
            </div>
            <div className="tabs-panel" id="fpanel2">
              <div className="one-foodie">
                <span className="one-foodie-number">#1</span>
                <img className="avatar" src="assets/img/avatar.png" />
                <div className="one-foodie-info">
                  <span className="one-foodie-info-name">Imen</span>
                  <p>
                    38 Restos visités . 51 photos prises . 19 posts partagés
                  </p>
                </div>
              </div>
            </div>
            <div className="tabs-panel" id="fpanel3">
              <div className="one-foodie">
                <span className="one-foodie-number">#1</span>
                <img className="avatar" src="assets/img/avatar.png" />
                <div className="one-foodie-info">
                  <span className="one-foodie-info-name">Imen</span>
                  <p>
                    38 Restos visités . 51 photos prises . 19 posts partagés
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    );
}

ProposerMoiSideBar.propTypes = {};

export default ProposerMoiSideBar;