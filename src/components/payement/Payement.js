import React, {useContext, useState,useEffect} from 'react';
import { UiContext } from '../../context/UiContext';
import InfosAdditionnelles from './InfosAdditionnelles';
import ModePayement from './ModePayement';
import VotreCommande from './VotreCommande';
import CommandeTime from './CommandeTime';
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router";
import { RestaurantContext } from "../../context/RestaurantContext";

function Payement(props) {
    const { activeStep, paymentPannel } = useContext(UiContext);
    const { activeUser,commande, setCommande } = useContext(UserContext);
    const { getPersonalizedMenuByUserIdRestaurantId } = useContext(RestaurantContext);
    const [articles, setArticles] = useState(null);

    useEffect(() => {
        getPersonalizedMenuByUserIdRestaurantId(
          activeUser.userId,
          id,
          setArticles
        );
    }, [props]);
    
    let { id } = useParams();
 
    function handleChange(e) {
        setCommande((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    let page;
    if (activeStep === 0) {
        page = <VotreCommande articles={articles} setArticles={setArticles} />;
    } else if (activeStep === 1) {
        page = <InfosAdditionnelles handleChange={handleChange} articles={articles} />;
    }  else if (activeStep === 2) {
        page = <CommandeTime handleChange={handleChange} articles={articles} />;   
    }else if (activeStep === 3) {
        page = <ModePayement handleChange={handleChange} articles={articles} />;   
    }
    
    return (
        <div className="paiement-page">
            <div className="paiement-page-content container">
                <div className="paiement-page-content-first-page">
                    <div className="first-page-header">
                        <img className="man-wintak" src="../assets/img/svg/Payment.png" />
                        <span className="header-title">
                            Payement
                        </span>
                        <span className="header-description">
                            Veuillez vous procédez aux étapes suivantes pour payer votre commande.
                        </span>
                    </div>
                    <div className="auth-form-body">
                        <div id="orbit" className="orbit" role="region" aria-label="Favorite Space Pictures" data-orbit data-use-m-u-i="false" data-wrap-on-keys="false" bull data-auto-play="false">
                            <div className="orbit-bar">
                                <nav className="orbit-bullets">
                                    <button data-slide={0} className="step is-active " style={{width: '100%', height: '100%'}} disabled="true">
                                        <div style={ paymentPannel.votreCommande === "confirmer" ? { borderBottom: '4px solid  #7dc364', padding: '1.8rem 0'} 
                                                    : paymentPannel.votreCommande === "encours" ? {borderBottom: '4px solid #ff6900', padding: '1.8rem 0'}
                                                    : {}}>
                                            <span id="step-one" style={ paymentPannel.votreCommande === "confirmer" ? { fontWeight: 'bold', fontSize: '2rem', color: '#7dc364', opacity: 2} 
                                                    : paymentPannel.votreCommande === "encours" ? {fontWeight: 'bold', fontSize: '2rem', color: '#ff6900', opacity: 2}
                                                    : {}}>01</span>
                                        </div>
                                        <span className="step-description" id="one" 
                                            style={ paymentPannel.votreCommande === "confirmer" ? { fontWeight: 500, fontSize: '1.4rem', color: '#7dc364', paddingLeft: '2rem', opacity: 2} 
                                            : paymentPannel.votreCommande === "encours" ? {fontWeight: 500, fontSize: '1.4rem', color: '#ff6900', paddingLeft: '2rem', opacity: 2}
                                            : {}}>Votre commande</span>
                                    </button>

                                    <button data-slide={1} className="step" style={{width: '100%', height: '100%'}} disabled="true">
                                        <div style={ paymentPannel.infosAdditionnelles === "confirmer" ? { borderBottom: '4px solid  #7dc364', padding: '1.8rem 0'} 
                                                    : paymentPannel.infosAdditionnelles === "encours" ? {borderBottom: '4px solid #ff6900', padding: '1.8rem 0'}
                                                    : {}}>
                                            <span className="step-number" style={ paymentPannel.infosAdditionnelles === "confirmer" ? { fontWeight: 'bold', fontSize: '2rem', color: '#7dc364', opacity: 2} 
                                                    : paymentPannel.infosAdditionnelles === "encours" ? {fontWeight: 'bold', fontSize: '2rem', color: '#ff6900', opacity: 2}
                                                    : {}}>02</span>
                                        </div>
                                        <span className="step-description" id="two" style={ paymentPannel.infosAdditionnelles === "confirmer" ? { fontWeight: 500, fontSize: '1.4rem', color: '#7dc364', paddingLeft: '2rem', opacity: 2} 
                                            : paymentPannel.infosAdditionnelles === "encours" ? {fontWeight: 500, fontSize: '1.4rem', color: '#ff6900', paddingLeft: '2rem', opacity: 2}
                                            : {}}>Informations additionnelles</span>
                                    </button>

                                    <button data-slide={2} className="step" style={{width: '100%', height: '100%'}} disabled="true">
                                        <div style={ paymentPannel.heureCommande === "confirmer" ? { borderBottom: '4px solid  #7dc364', padding: '1.8rem 0'} 
                                                    : paymentPannel.heureCommande === "encours" ? {borderBottom: '4px solid #ff6900', padding: '1.8rem 0'}
                                                    : {}}>
                                            <span className="step-number" style={ paymentPannel.heureCommande === "confirmer" ? { fontWeight: 'bold', fontSize: '2rem', color: '#7dc364', opacity: 2} 
                                                    : paymentPannel.heureCommande === "encours" ? {fontWeight: 'bold', fontSize: '2rem', color: '#ff6900', opacity: 2}
                                                    : {}}>02</span>
                                        </div>
                                        <span className="step-description" id="two" style={ paymentPannel.heureCommande === "confirmer" ? { fontWeight: 500, fontSize: '1.4rem', color: '#7dc364', paddingLeft: '2rem', opacity: 2} 
                                            : paymentPannel.heureCommande === "encours" ? {fontWeight: 500, fontSize: '1.4rem', color: '#ff6900', paddingLeft: '2rem', opacity: 2}
                                            : {}}>Heure commande</span>
                                    </button>

                                    <button data-slide={3} className="step last-step" style={{width: '100%', height: '100%'}} disabled="true">
                                        <div style={ paymentPannel.modePayement === "confirmer" ? { borderBottom: '4px solid  #7dc364', padding: '1.8rem 0'} 
                                                    : paymentPannel.modePayement === "encours" ? {borderBottom: '4px solid #ff6900', padding: '1.8rem 0'}
                                                    : {}}>
                                            <span className="step-number" style={ paymentPannel.modePayement === "confirmer" ? { fontWeight: 'bold', fontSize: '2rem', color: '#7dc364', opacity: 2} 
                                                    : paymentPannel.modePayement === "encours" ? {fontWeight: 'bold', fontSize: '2rem', color: '#ff6900', opacity: 2}
                                                    : {}}>03</span>
                                        </div>
                                        <span className="step-description" id="three" style={ paymentPannel.modePayement === "confirmer" ? { fontWeight: 500, fontSize: '1.4rem', color: '#7dc364', paddingLeft: '2rem', opacity: 2} 
                                            : paymentPannel.modePayement === "encours" ? {fontWeight: 500, fontSize: '1.4rem', color: '#ff6900', paddingLeft: '2rem', opacity: 2}
                                            : {}}>Mode de payement</span>
                                    </button>
                                </nav>
                            </div>
                            <div className="orbit-wrapper">   
                                <ul className="orbit-container">
                                    {page}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payement

