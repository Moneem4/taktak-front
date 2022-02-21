import React from "react";

function SideBarMap(props) {
  const { restaurant } = props;

  return (
    <div className="shared-component-location">
      <div className="shared-component-location-first-title">
        <span>Vous êtes à Sousse</span>
      </div>
      <div className="shared-component-location-maps">
        <div>
          <img src="../../assets/img/svg/map.png" />
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
            <img src="../../assets/img/Ellipse 378.png" />
            <img src="../../assets/img/Ellipse 379.png" />
            <img src="../../assets/img/Ellipse 380.png" />
            <img src="../../assets/img/Ellipse 381.png" />
            <img src="../../assets/img/Ellipse 382.png" />
            <img src="../../assets/img/Ellipse 383.png" />
            <img src="../../assets/img/Ellipse 384.png" />
            <span id="../../profil-img-number">+13</span>
          </div>
        </div>
      </div>
    </div>
  );
}

SideBarMap.propTypes = {};

export default SideBarMap;
