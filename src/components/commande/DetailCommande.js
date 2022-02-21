import React, { useContext, useEffect, useState } from "react";
import { RestaurantContext } from "../../context/RestaurantContext";
import { NavLink } from "react-router-dom";
import DetailCommandeItem from "./DetailCommandeItem";
import DetailCommandeUnwastable from "./DetailCommandeUnwastable";

function DetailCommande(props) {
  const { getCommandeById } = useContext(RestaurantContext);

  const getUrlFromPath = () => {
    const paths = window.location.href.split("/");
    let url = paths[4];
    return url;
  };

  const [commande, setCommande] = useState(null);
  useEffect(() => {
      getCommandeById(getUrlFromPath(), setCommande);
  }, []);
  console.log("rrrrrrrrr:", commande)
    return (commande && 
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
                  <span>Retour</span>
                </div>
              </NavLink>
            </div>
            <div className="details-commande">
              <div className="details-commande-header">
                <div className="left-side">
                  <div className="ref-commande">
                    <span>
                      <span style={{ color: "#ff6900" }}> Ref. commande:</span> {commande._id}
                    </span>
                  </div>
                  <div className="restaurant-location">
                    <img src={`https://${commande.restaurant.avatar}`} style={{height: 150, width:150}}/>
                    <div className="restaurant-description">
                      <span className="restaurant-name">
                        {commande.restaurant.name}
                      </span>
                      <div>
                        <i className="fal fa-map-marker-alt" />
                        {commande.restaurant.location},
                        {commande.restaurant.specialty.map((el) => `#${el} `)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="main">
                  <span>Date &amp; Heure de l’opération</span>
                  <span>Sur place / Take away</span>
                  <span>Modalité de payement</span>
                </div>
                <div className="right-side">
                  <span>{commande.createdAt} / {commande.timeCreated}h </span>
                  <span>{commande.commandeTakenMethod}</span>
                  <span>{commande.paymentMethod}</span>
                </div>
              </div>
              {commande && commande.unwastableArticleC ? (
                <div className="command-list">
                  {commande.unwastableArticleC.map((article) => (
                    <DetailCommandeUnwastable
                      article={article}
                      totalPrice={commande.total_price}
                    />
                  ))}
                </div>
              ) : (
                <></>
              )}

              {commande && commande.articlesC ? (
                <div className="command-list">
                  {commande.articlesC.map((article) => (
                    <DetailCommandeItem article={article} />
                  ))}
                </div>
              ) : (
                <></>
              )}
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "normal",
                    fontSize: "3.0rem",
                    color: " #484848",
                  }}
                >
                  Prix Total
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "normal",
                    fontSize: "3.0rem",
                    color: " #ff6900",
                    marginLeft: "250px",
                    fontWeight: "300",
                  }}
                >
                  {commande.total_price} DT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailCommande;
