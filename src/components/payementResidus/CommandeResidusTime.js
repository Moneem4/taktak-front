import React, { useContext } from 'react';
import { UiContext } from '../../context/UiContext';
import { UserContext } from "../../context/UserContext";
import withStyles from '@material-ui/core/styles/withStyles';
import Slider from '@material-ui/core/Slider';

const styles = (theme) => ({
    root: {
      width: 250,
    },
    margin: {
      height: theme.spacing(3),
    },
});

const marks = [
    { value: 8, label: '08:00' },
    { value: 9, label: '09:00' },
    { value: 10, label: '10:00' },
    { value: 11, label: '11:00' },
    { value: 12, label: '12:00' },
    { value: 13, label: '13:00' },
    { value: 14, label: '14:00' },
    { value: 15, label: '15:00' },
    { value: 16, label: '16:00' },
    { value: 17, label: '17:00' },
    { value: 18, label: '18:00' },
    { value: 19, label: '19:00' },
    { value: 20, label: '20:00' },
    { value: 21, label: '21:00' },
    { value: 22, label: '22:00' },
    { value: 23, label: '23:00' },
    { value: 24, label: '00:00' },
];

function valuetext(value) {
    return `${value}:00`;
}

function CommandeResidusTime(props) {
    const {classes}=props;
    const { handleNext, handleBack, setPaymentPannel } = useContext(UiContext);
    const { commandeResidu, setCommandeResidu } = useContext(UserContext);
    
    const handleTimeChange = (val) => {
      setCommandeResidu({...commandeResidu, timeCommande: val })
    };

    const confirmCommande = () => {
        setPaymentPannel((prevPayementPannel) => { return {...prevPayementPannel, heureCommande: "confirmer"} })
        setPaymentPannel((prevPayementPannel) => { return {...prevPayementPannel, modePayement: "encours"} })
    };

    const annulerCommande = () => {
        setPaymentPannel((prevPayementPannel) => { return {...prevPayementPannel, infosAdditionnelles: "encours"} })
        setPaymentPannel((prevPayementPannel) => { return {...prevPayementPannel, heureCommande: "waiting"} })
    };

    var somme2=0
    if(commandeResidu.articles){
      for( var i = 0; i < commandeResidu.articles.length; i++ ){
        somme2+=(commandeResidu.articles[i].price * commandeResidu.articles[i].quantity)
      }
    }
    
  return (
    <div className="orbit-slide ">
      <button className="go-next" onClick={() => {handleNext(); confirmCommande()}}>
        Continuer
      </button>
      <div className="orbit-slide-two-header">
        <div className="return" onClick={() => {handleBack(); annulerCommande()}}>
          <i className="fal fa-long-arrow-alt-left" />
          <span>Retour</span>
        </div>
        {commandeResidu.articles && 
          <div className="total-to-pay">
            <span className="total-to-pay-title">Total à payer</span>
            <span className="total-to-pay-price">{somme2} DT</span>
          </div>
        }
      </div>
      <div className="orbit-slide">
            <div className="slide-title">À quel heure ?</div>
            <div style={{width: '95%', marginTop: 50, marginLeft: 30}}>
                <Slider
                    defaultValue={commandeResidu.timeCommande}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-always"
                    step={1}
                    min={8}
                    max={24}
                    marks={marks}
                    valueLabelDisplay="on"
                    onChange={ (e, val) => handleTimeChange(val) } 
                />
            </div>
        </div>
    </div>
  )
}

export default withStyles(styles)(CommandeResidusTime)
