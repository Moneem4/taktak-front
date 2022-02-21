import React, {useContext} from 'react';
import { UiContext } from '../../context/UiContext';
import { UserContext } from "../../context/UserContext";

function InfosAdditionnelles(props) {
    const { handleNext, handleBack, setPaymentPannel, facture } = useContext(UiContext);
    const { commande,setCommande } = useContext(UserContext);
    const {articles}=props;
  
    function handleNext2(){
        if(handleNext){
            if(commande.ownerFirstname==="" && commande.ownerLastName==="" && commande.ownerEmail==="" && commande.ownerPhoneNumber==="" && commande.adresse1==="" ){
                alert('champs vides');
            }
        }   
    }
    
    var IDs= articles && articles.map((el)=>(el._id))
    const confirmCommande = () => {
        setPaymentPannel((prevPayementPannel) => { return {...prevPayementPannel, infosAdditionnelles: "confirmer"} })
        setPaymentPannel((prevPayementPannel) => { return {...prevPayementPannel, heureCommande: "encours"} })
        setCommande((prev) => ({ ...prev, articlesId: IDs}));
    };

    const annulerCommande = () => {
        setPaymentPannel((prevPayementPannel) => { return {...prevPayementPannel, votreCommande: "encours"} })
        setPaymentPannel((prevPayementPannel) => { return {...prevPayementPannel, infosAdditionnelles: "waiting"} })
    };
 
    var somme2=0

    if(articles){
        for( var i = 0; i < articles.length; i++ ){
            somme2+=(articles[i].price * articles[i].quantity)
            if(articles[i].articleOptions){
                for(var j=0;j<articles[i].articleOptions.length;j++)
                {
                    somme2 += articles[i].articleOptions[j].optionPrice ;
                }
            }else{
                somme2+=articles[i].price * articles[i].quantity
            }
        }
    }
    
    return (
        <div className="orbit-slide ">
            <button className="go-next" onClick={() => {handleNext(); handleNext2(); confirmCommande()}}>
                Continuer
            </button>
            <div className="orbit-slide-two-header">
                <div className="return" onClick={() => {handleBack(); annulerCommande()}}>
                    <i className="fal fa-long-arrow-alt-left" />
                    <span>Retour</span>
                </div>
                {articles && 
                    <div className="total-to-pay">
                        <span className="total-to-pay-title">Total à payer</span>
                        <span className="total-to-pay-price">{somme2} DT</span>
                    </div>
                }
            </div>
            <div className="promo-code">
                <span className="question">Vous avez un code promotionnel?</span>
                <input type="text" value={facture.codePromotionnel}  name="codePromotionnel"/>
                <span className="application">Appliquer le code</span>
            </div>
            <div className="invoice-details">
                <div className="invoice-details-header">
                    <span className="title">Détails facture</span>
                    <span className="description">Tout les champs sont obligatoires</span>
                </div>
                <div className="renseignements">
                    <input type="text" placeholder="Prénom" value={commande.ownerFirstname}   name="ownerFirstname" onChange={props.handleChange} />
                    <input type="text" placeholder="Nom"  value={commande.ownerLastName}  name="ownerLastName"  onChange={props.handleChange}  />
                </div>                
                <div className="renseignements">
                    <input type="email" placeholder="E-mail" value={commande.ownerEmail} name="ownerEmail"  onChange={props.handleChange} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"  required/>
                    <input type="text" placeholder="N° Mobile" value={commande.ownerPhoneNumber} name="ownerPhoneNumber"   onChange={props.handleChange} />
                </div>
                <div className="renseignements">
                    <input type="text" placeholder="Adresse 1" value={commande.adresse1} name="adresse1"  onChange={props.handleChange}/>
                    <input type="text" placeholder="Adresse 2"  value={commande.adresse2} name="adresse2"  onChange={props.handleChange}/>
                </div>
                <div className="note">
                    <span>Une note spéciale à communiquer?</span>
                    <textarea placeholder=" Message" value={commande.description}  name="description" onChange={props.handleChange} />
                </div>
            </div>
            <div className="slide-three-bottom">
                <div className="return" onClick={() => {handleBack(); annulerCommande()}}>
                    <i className="fal fa-long-arrow-alt-left" />
                    <span>Retour</span>
                </div>
                <div className="go-next" onClick={() => {handleNext(); handleNext2();confirmCommande()}}>
                    <button  >Continuer</button>
                </div>
            </div>
        </div>
    )
}

InfosAdditionnelles.propTypes = { }

export default InfosAdditionnelles

