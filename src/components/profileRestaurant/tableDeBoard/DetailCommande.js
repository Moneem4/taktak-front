
import React, {useContext,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
function DetailCommande(props){



    return(
   <div className="suivi-commande">
        <div className="suivi-commande-content container">
          <div className="suivi-commande-content-second-page">
            <div className="second-page-header">
              <img className="man-wintak" src="../assets/img/svg/suivi-commande.png" />
              <span className="header-title">
                Détails commande
              </span>
              <NavLink exact to={`/bookingPageProcess`}>
                <div className="retour">
                  <i className="fal fa-long-arrow-alt-left" />
                  <span>
                    Retour
                  </span>
                </div>
              </NavLink>
            </div>
            <div className="details-commande">
              <div className="details-commande-header">
                <div className="left-side">
                  <div className="ref-commande">
                    <span> <span style={{color: '#ff6900'}}> Ref. commande:</span> {}</span>
                  </div>
                  <div className="restaurant-location">
                    <img  />
                    <div className="restaurant-description">
                      <span className="restaurant-name">{} </span>
                    
                      <div>
                        <i className="fal fa-map-marker-alt" />
                        {}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="main">
                  <span>Date &amp; Heure de l’opération</span>
                  <span>Sur place / Take away</span>
                  <span>Modalité de payement</span>
                </div>
                
                {
                <div className="right-side">
                    <span> </span>
                    <span>{}</span>
                    <span>{}</span>
                </div>
            }
               
              </div>
              <div className="command-list">
              
              </div>
            </div>
          </div>
        </div>
       </div>
    )
}
export default DetailCommande;