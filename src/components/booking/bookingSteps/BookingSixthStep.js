import React, {useState, useContext} from 'react';
import { UserContext } from '../../../context/UserContext';
import { RestaurantContext } from '../../../context/RestaurantContext';
import Grid from "@material-ui/core/Grid";
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
    styleClicked: {
        border: '1px solid #ff6900',
    }, 
    styleUnClicked: {
        border: '1px solid #ffffff',
    }
});

function BookingSixthStap(props) {
    const { classes } = props;
    const { activeUser } = useContext(UserContext);
    const { myReservation, setMyReservation } = useContext(RestaurantContext);

    const handleClickChange = (mode) => {
        setMyReservation({ ...myReservation, payment: mode })
    };
    
    const handleSwitchChange = (e) => {
        setMyReservation({ ...myReservation, usePointTaktak: !e.target.checked })
    };

    return (
        <div className="orbit-slide">
            <div className="slide-title"> Payement ? </div>
            <div className="payment-select">
                <div className={myReservation.payment=== "CASH" ? classes.styleClicked : classes.styleUnClicked}>
                    <div className="payment-choice" onClick={() => handleClickChange("CASH")}>
                        Espèce
                    </div>
                </div>
                <div className={myReservation.payment=== "CHECK" ? classes.styleClicked : classes.styleUnClicked}>
                    <div className="payment-choice" onClick={() => handleClickChange("CHECK")}>
                        Chèque
                    </div>
                </div>
                <div className={myReservation.payment=== "BANK_CARD" ? classes.styleClicked : classes.styleUnClicked}>
                    <div className="payment-choice" onClick={() => handleClickChange("BANK_CARD")}>
                        E-Dinar
                    </div>
                </div>
                <div className={myReservation.payment=== "RESTAURANT_TICKET" ? classes.styleClicked : classes.styleUnClicked}>
                    <div className="payment-choice" onClick={() => handleClickChange("RESTAURANT_TICKET")}>
                        M-Payment
                    </div>
                </div>
            </div>
            <div className="coins-wrapper">
                <div className="coins-left">
                    <Grid
                        container
                        direction="row"
                        spacing={1}
                    >
                        <Grid item xs={7}>
                            <span> Vous avez cumulé </span>
                        </Grid>
                        <Grid item xs={3}>
                            <img src="../../assets/img/row_.png" />
                        </Grid>
                        <Grid item xs={2} >
                            <span>{activeUser.countPoints}</span>
                        </Grid>
                    </Grid>
                </div>
                <div className="coins-right">
                    <span>Voulez-vous en profiter?</span>
                    <div className="switch">
                        <input className="switch-input" 
                            id="usePointTaktak" 
                            type="checkbox" 
                            name="usePointTaktak"
                            checked={!myReservation.usePointTaktak}
                            onClick={(e) => handleSwitchChange(e)} />
                        <span>OUI</span>
                        <label className="switch-paddle" htmlFor="usePointTaktak"> </label>
                        <span>NON</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(BookingSixthStap)
