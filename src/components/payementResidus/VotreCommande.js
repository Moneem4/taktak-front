import React, { useContext, useEffect } from "react";
import { UiContext } from "../../context/UiContext";
import VotreCommandeItem from "./VotreCommandeItem";
import { UserContext } from "../../context/UserContext";
import { useHistory } from "react-router-dom";

function VotreCommande(props) {
  const { handleNext, handleBack, setPaymentPannel } = useContext(UiContext);
  const { commandeResidu } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (commandeResidu.articles && commandeResidu.articles.length === 0)
      history.push(`/gestionResidusUser`);
  }, [commandeResidu.articles]);

  const confirmCommande = () => {
    if (commandeResidu.articles) {
      setPaymentPannel((prevPayementPannel) => {return { ...prevPayementPannel, votreCommande: "confirmer" } });
      setPaymentPannel((prevPayementPannel) => {return { ...prevPayementPannel, infosAdditionnelles: "encours" } });
      //setMyCommande({...myCommande, total_price:sum});
    }
  };
  
  var somme2=0
  if(commandeResidu.articles){
    for( var i = 0; i < commandeResidu.articles.length; i++ ){
      somme2+=(commandeResidu.articles[i].price * commandeResidu.articles[i].quantity)
    }
  }

  return (
    <div className="orbit-slide">
      <button className="go-next" onClick={() => {handleNext(); confirmCommande()}}>
        Continuer
      </button>

      {commandeResidu.articles && (
        <div className="total-to-pay">
          <span className="total-to-pay-title">Total à payer</span>
          <span className="total-to-pay-price"> {somme2.toFixed(2)} DT </span>
        </div>
      )}

      {commandeResidu.articles &&
        commandeResidu.articles.map((el) => (
          <VotreCommandeItem
            article={el}
            key={el.id}
          />
        ))}

      <div className="slide-three-bottom">
        <div className="return" onClick={handleBack}></div>

        <div className="go-next" onClick={() => {handleNext(); confirmCommande()}}>
          <button>Continuer</button>
        </div>
      </div>
    </div>
  );
}

VotreCommande.propTypes = {};

export default VotreCommande;
