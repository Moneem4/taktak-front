import React, {useState, useContext} from 'react';
import { UiContext } from '../../context/UiContext';
import withStyles from '@material-ui/core/styles/withStyles';
import TakTakPointsHeader from './TakTakPointsHeader';
import { NavLink } from 'react-router-dom';

const styles = (theme) => ({
    
});

function TakTakPoints(props) {
    const { classes } = props;
    const {points} = useContext(UiContext);
    const [showAlert, setShowAlert] = useState(false);

    const renderPlan = (param) => {
        switch (param.type) {
            case "simple":
                return (
                    <div className="card-plans" onClick={() => showPageBottom(true)}>
                        <div className="content">
                            <span className="title"> -{param.pourcentage}% </span>
                            <span className="subtitle">Pour {param.duree}</span>
                        </div>
                        <div className="bu">{param.description} </div>
                    </div>
                );
            case "avecImage":
                return (
                    <div className="card-plats-with-img" onClick={() => showPageBottom(true)}>
                        <div className="image">
                            <img src="../assets/img/ea08410383b911b2eb74c33a636e3838.png" />
                        </div>
                        <div className="content">
                            <div className="title">
                                <span className="title-pourcentage">{param.pourcentage}</span>
                                <span className="sub-title">{param.plat}</span>
                            </div>
                            <div className="bottom">
                                <span>{param.description} </span>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (null);
        }
    }

    function showPageBottom(action) {
        setShowAlert(action);
    }

    return (
        <div className="taktak-points">
            <div className="taktak-points-content">
                <div className="taktak-points-content-first-page container">
                    <NavLink exact to={`/booking/`+ 1}>
                        <div className="second-page-header-left-side">
                            <i className="fal fa-long-arrow-alt-left" />
                            <span>Retour</span>
                        </div>
                    </NavLink>
                    <div className="first-page-header">
                        <img className="man-wintak" src="assets/img/man-wintak.png" />
                        <span className="header-title">
                            Hey! {points.user}, le transfert des points TakTak sont irréversibles.
                        </span>
                        <span className="header-description">
                            Une fois la commande effectuée, vous ne pouvez plus annuler votre demande.
                        </span>
                        <span className="header-helper">
                            Plus vous gagnez de points, plus vous aurez l’opportunité de bénéficier de nos offres gratuites.
                        </span>
                    </div>
                    <TakTakPointsHeader page={"taktakPoint"} style={"first-page-solde-wintak"}/>
                    <div className="first-page-offers-plans">
                        <span>Choisissez parmi les plans suivant pour convertir vos points et profitez de nos offres</span>
                        <div className="following-offers-plans  ">
                            {points.plans.map((plan) => (
                                renderPlan(plan)
                            ))}
                        </div>
                    </div>
                </div>
                <div className="first-page-bottom" style={{ display: showAlert ? "block" : "none" }}>
                    <div className="solde-after">
                        <span>Merci de choisir notre plan. Votre nouveau solde est : <strong>80 WinTak</strong> </span>
                        <i className="fa fa-times croix" onClick={() => showPageBottom(false)}></i>
                    </div>
                </div>
            </div>    
        </div>
    )
}

TakTakPoints.propTypes = { }

export default withStyles(styles)(TakTakPoints)
