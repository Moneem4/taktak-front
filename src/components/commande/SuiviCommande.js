import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import CommandeItem from "./CommandeItem";

function SuiviCommande(props) {
  const { getCommande } = useContext(UserContext);
  const { activeUser } = useContext(UserContext);
  const [myCommandes, setmyCommandes] = useState([]);
 
  useEffect(() => {
    getCommande(activeUser.userId, setmyCommandes);
  }, [props]);
 
  const sort =
    myCommandes &&
    myCommandes.slice().sort(function (a, b) {
      if (a.status < b.status) {
        return -1;
      }
      if (a.status > b.status) {
        return 1;
      }
      return 0;
    });
    
  return (
    <div className="suivi-commande">
      <div className="suivi-commande-content container">
        <div className="suivi-commande-content-first-page">
          <div
            className="commande-section"
            style={{ width: 1100, marginLeft: -50 }}
          >
            Commande en cours
          </div>
          <div className="first-page-header">
            <img
              className="man-wintak"
              src="assets/img/svg/suivi-commande.png"
            />
            <span className="header-title">Suivi de commande</span>
            {myCommandes && (
              <span className="header-description">
                Vous avez ordonné (
                <span style={{ color: "#ff6900", fontWeight: "bold" }}>
                  {myCommandes && myCommandes.length}
                </span>
                ) commandes. Vous pouvez faire le suivi ci-dessous.
              </span>
            )}
          </div>
          {sort && sort.map((commande) => <CommandeItem commande={commande} />)}
        </div>
      </div>
    </div>
  );
}

export default SuiviCommande;
