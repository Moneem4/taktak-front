import React from 'react'
import PropTypes from 'prop-types'

function MobileAppAd(props) {
    return (
        <div className="mobile-app-ad">
        <i className="icon-dots-horizontal" />
        <img
          className="bg"
          src="../assets/img/app-mobile.png"
          alt="mobile add app"
        />
        <div className="mobile-app-ad-header">
          <img src="../assets/img/svg/logo-gradient.svg" />
          <span>Application mobile</span>
        </div>
        <div className="mobile-app-ad-body">
          <p>
            Voir les menus et les photos des restaurants à proximité et
            partager vos beaux endroits préférés avec la communauté Tak Tak.
          </p>
          <p>
            Nous vous enverrons un lien, ouvrez-le sur votre téléphone pour
            télécharger l’application
          </p>
        </div>
        <div className="mobile-app-ad-footer">
          <div className="send">
            <div className="send-header">
              <button className="selected">SMS</button>
              <button className>Email</button>
            </div>
            <div className="send-body">
              <input type="text" placeholder="+216 28 ** **" />
              <div className="send-options">
                <i className="fal fa-pen" />
                <span>Envoyer</span>
              </div>
            </div>
          </div>
          <div className="downloads">
            <img src="../assets/img/google-play.png" alt="apple store" />
            <img src="../assets/img/app-store.png" alt="playstore" />
          </div>
        </div>
      </div>
     
    )
}

MobileAppAd.propTypes = {

}

export default MobileAppAd

