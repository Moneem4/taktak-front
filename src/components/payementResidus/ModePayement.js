import React, {useState, useContext} from 'react';
import { UiContext } from '../../context/UiContext';
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles';
import _ from "lodash";

const styles = (theme) => ({
    styleClicked: {
        border: '1px solid #ff6900',
    }, 
    styleUnClicked: {
        border: '1px solid #ffffff',
    }
});

function ModePayement(props) {
    const { classes } = props;
    const { handleBack, setPaymentPannel, facture, setFacture, points } = useContext(UiContext);
    const { activeUser, createUnwastableCommande, commandeResidu, setCommandeResidu } = useContext(UserContext);
    const [clicked, setClicked] = useState();

    let history = useHistory();
    let { id } = useParams();
   
    const annulerCommande = () => {
        setPaymentPannel((prevPayementPannel) => { return {...prevPayementPannel, infosAdditionnelles: "encours"} })
        setPaymentPannel((prevPayementPannel) => { return {...prevPayementPannel, modePayement: "waiting"} })
    };
    
    const handleChange = (e) => {
        setFacture({ ...facture, winTak: !facture.winTak });
        setCommandeResidu({...commandeResidu, winTak: !commandeResidu.winTak });
    };

    const handleClickChange = (mode) => {
      setCommandeResidu((prev) => ({...prev, paymentMethod: mode }));
      setClicked(mode);
    };
  
    var somme2=0
    if(commandeResidu.articles){
      for( var i = 0; i < commandeResidu.articles.length; i++ ){
        somme2+=(commandeResidu.articles[i].price * commandeResidu.articles[i].quantity)
      }
    }

    const submitCommande = () => {
        const groups = _.groupBy(commandeResidu.articles, "restaurantId");
        Object.keys(groups).map((key) => {
            let articlesId = []
            let articlesC = []
            groups[key].map((item, index) => {
                articlesId.push(item._id)
                articlesC.push(item)
            })
            var somme2=0
            if(groups[key]){
                for( var i = 0; i < groups[key].length; i++ ){
                    somme2+=(groups[key][i].price * groups[key][i].quantity)
                }
            }
            const data = {
                userId:activeUser.userId,
	            restaurantId: key,
                ownerFirstname:commandeResidu.ownerFirstname,
                ownerLastName: commandeResidu.ownerLastName,
                ownerEmail:commandeResidu.ownerEmail,
                ownerPhoneNumber: commandeResidu.ownerPhoneNumber,
                description:commandeResidu.description,
                adresse1:commandeResidu.adresse1,
                adresse2:commandeResidu.adresse2,
                commandeTakenMethod:"TAKE_AWAY",
                paymentMethod:commandeResidu.paymentMethod,
                status: "WAITING",
                usePointTaktak: commandeResidu.winTak,
                timeCommande: commandeResidu.timeCommande,
                articlesId: articlesId, 
                articlesC: articlesC,
                total_price:somme2,
            };
            createUnwastableCommande(data);
        })

        history.push("/payerResidus/" + id + "/result");
    }

    return (
        <div className="orbit-slide">
            <button className="go-next"  onClick={submitCommande} >
                Continuer
            </button>        
            <div className="orbit-slide-three-header">
                <div className="return" onClick={() => {handleBack(); annulerCommande()}}>
                    <i className="fal fa-long-arrow-alt-left" />
                    <span>Retour</span>
                </div>
                {commandeResidu.articles && 
                  <div className="total-to-pay">
                    <span className="total-to-pay-title">Total à payer</span>
                    <span className="total-to-pay-price">  {somme2}DT</span>
                  </div>
                }
            </div>
            <div className="paiement-solde-wintak">
                <div className="solde-wintak-left-side">
                  <span>Votre solde TakTak</span>
                  <span>Jusqu’au {points.dateExpirer} </span>
                  <img className="triangle" src="../assets/img/svg/Polygone 2.png" />
                </div>
                <div className="solde-wintak-right-side">
                    <img src="../assets/img/svg/row_1.png" alt="" />
                    <div className="solde">
                        <span>{points.somme}</span>
                        <span>WinTak</span>
                    </div>
                    <div className="price">
                        <span>= {points.argent} DT</span>
                    </div>
                    <button className="button-sold-wintak">
                        <span>Utiliser mon solde WinTak</span>
                        <input className="checkbox" type="checkbox" id="checkbox-1" name="winTak" onChange={handleChange}/>
                        <label htmlFor="checkbox-1" />
                    </button>
                </div>
            </div>
            <div className="remains-to-pay-description">
                <span>Le reste est à payer en utilisant un moyen de paiement parmi la liste ci-dessous.</span>
            </div>
            <div className="remains-to-pay">
                {commandeResidu.articles &&
                    <div className="the-amount">
                        <span className="the-amount-title">Reste à payer</span>
                        <span className="the-amount-number">{commandeResidu.winTak ? somme2- points.argent 
                            : somme2 } DT</span>
                    </div>
                }
                <div className="means-of-payment">
                    <div style={clicked=== "EDINAR" ? {border: '1px solid #ff6900'} : {border: '1px solid #ffffff'}}
                    >
                        <div className="method-of-payment" onClick={() => handleClickChange("EDINAR")}>
                            <img src="../assets/img/e-dinar.png" />
                            <span>E-dinar</span>
                        </div>
                    </div>
                    <div style={clicked=== "VIREMENT_BANCAIRE" ? {border: '1px solid #ff6900'} : {border: '1px solid #ffffff'}}>
                        <div className="method-of-payment" onClick={() => handleClickChange("VIREMENT_BANCAIRE")}>
                            <img src="../assets/img/virement-bank.png" />
                            <span>Virement bancaire</span>
                        </div>
                    </div>
                    <div style={clicked=== "MOBI_POSTE" ? {border: '1px solid #ff6900', borderRadius: 5} : {border: '1px solid #ffffff'}}>
                        <div className="method-of-payment" onClick={() => handleClickChange("MOBI_POSTE")}>
                            <img src="../assets/img/Mobi-poste.png" />
                            <span>Mobi-Poste</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="slide-three-bottom">
                <div className="return" onClick={() => {handleBack(); annulerCommande()}}>
                    <i className="fal fa-long-arrow-alt-left" />
                    <span>Retour</span>
                </div>
                <div className="confirm">
                    <button onClick={submitCommande} >Confirmer</button>
                </div>       
            </div>
        </div>            
    )
}

ModePayement.propTypes = { }

export default withStyles(styles)(ModePayement) 

