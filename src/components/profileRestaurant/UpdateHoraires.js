import React, {useContext, useState} from 'react';
import { RestaurantContext } from "../../context/RestaurantContext";
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers'

const styles = (theme) => ({
    container: {
        backgroundColor: 'white',
        boxShadow: theme.shadows[5],
        height: 225,
    },
    textField: {
        color: "black",
        maxHeight: "5ch",
        fontSize: 13,
        backgroundColor: "white",
    },
    label: {
        fontSize: 14,
        color: '#d40562',
        textAlign: "left",
        marginLeft: "1vw",
        marginRight: "1vw",
        marginTop: 20,
        width: "-webkit-fill-available",
    },
    divDay: {
        width: '10rem', 
        height: '5rem', 
        borderRadius: '5px', 
        background: '#fff', 
        border: '1px solid #e8e8e8', 
        margin: 10, cursor: 'pointer',
        '&:hover': {
            border: '1px solid #d40562',
        }
    },
    spanLabel: {
        fontSize: 14,
        color: '#000',
        textAlign: "center !important",
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        margin: '0 auto'
    },
    styleClicked: {
        border: '1px solid #d40562',
        borderRadius: 5,
        height: '100%'
    },
    styleUnClicked: {
        border: '1px solid #ffffff',
    }
});

function UpdateHoraires(props) {
    const {classes, newRestoData, setNewRestoData, clickedDays, setClickedDays, setTime} = props;
    const [timeFrom, setTimeFrom] = useState(newRestoData.openingTime.timeFrom);
    const [timeTo, setTimeTo] = useState(newRestoData.openingTime.timeTo);
    const [days, setDays] = useState(newRestoData.openingTime.days);

    const handleClose = () => {
        props.setShowModal(!props.showModal);
    };

    const handleTimeFromChange = (date) => {
        setTimeFrom(date);
    }
    
    const handleTimeToChange = (date) => {
        setTimeTo(date)
    }

    const handleClickChange = (value) => {

        setClickedDays({ ...clickedDays, [value]: !clickedDays[value] });

        if(!clickedDays[value] === true) {

            setDays([...days, value]);

        } else {

            setDays((prevDays) => {

                let items = [...prevDays];
    
                const indexDay = items.findIndex(
                    el => el === value
                );
    
                items.splice(indexDay, 1);
                
                return items;
            })
        }
    }

    async function submitChange () {
        setNewRestoData((prevNewRestoData) => {
            let items = {...prevNewRestoData};
      
            let horaire = {...items.openingTime, timeFrom: timeFrom, timeTo: timeTo, days: days};
            
            let updatedHoraire = {...prevNewRestoData, openingTime: horaire}
            
            return updatedHoraire;
        });

        const timeF = timeFrom.toString().substr(16, 5);
        const timeT = timeTo.toString().substr(16, 5);
        setTime(timeF + " - " + timeT)
        
        handleClose()
    }

    return (
        <div className={classes.container}>
            <Grid container direction="row" style={{marginTop: 10}} >
                <Grid item xs={3}>
                    <h4 className={classes.label}>Horaire d'ouverture</h4>
                </Grid>
                <Grid item xs={8}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <Grid item xs={5}>
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    value={timeFrom}
                                    onChange={handleTimeFromChange}
                                    KeyboardButtonProps={{
                                        className: classes.textField,
                                        'aria-label': 'change time',
                                    }}
                                    InputProps={{
                                        className: classes.textField,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={1} style={{ margin: 'auto' }}>
                                <h6 className={classes.label}>To</h6>
                            </Grid>
                            <Grid item xs={5}>
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    value={timeTo}
                                    onChange={handleTimeToChange}
                                    KeyboardButtonProps={{
                                        className: classes.textField,
                                        'aria-label': 'change time',
                                    }}
                                    InputProps={{
                                        className: classes.textField,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
            <h4 className={classes.label}>Les jours d'ouverture :</h4>
            <Grid container direction="row" style={{marginTop: 20}} >
                <Grid item className={classes.divDay} checked={clickedDays.Lundi} onClick={() => handleClickChange("Lundi")} >
                    <div className={clickedDays.Lundi ? classes.styleClicked : classes.styleUnClicked}>
                        <span className={classes.spanLabel} style={{padding: 15}}>Lundi</span>
                    </div>
                </Grid>
                <Grid item className={classes.divDay} checked={clickedDays.Mardi} onClick={() => handleClickChange("Mardi")}>
                    <div className={clickedDays.Mardi ? classes.styleClicked : classes.styleUnClicked}>
                        <span className={classes.spanLabel} style={{padding: 15}}>Mardi</span>
                    </div>
                </Grid>
                <Grid item className={classes.divDay} checked={clickedDays.Mercredi} onClick={() => handleClickChange("Mercredi")}>
                    <div className={clickedDays.Mercredi ? classes.styleClicked : classes.styleUnClicked}>
                        <span className={classes.spanLabel} style={{padding: 5}}>Mercredi</span>
                    </div>
                </Grid>
                <Grid item className={classes.divDay} checked={clickedDays.Jeudi} onClick={() => handleClickChange("Jeudi")}>
                    <div className={clickedDays.Jeudi ? classes.styleClicked : classes.styleUnClicked}>
                        <span className={classes.spanLabel} style={{padding: 15}}>Jeudi</span>
                    </div>
                </Grid>
                <Grid item className={classes.divDay} checked={clickedDays.Vendredi} onClick={() => handleClickChange("Vendredi")}>
                    <div className={clickedDays.Vendredi ? classes.styleClicked : classes.styleUnClicked}>
                        <span className={classes.spanLabel} style={{padding: 5}}>Vendredi</span>
                    </div>
                </Grid>
                <Grid item className={classes.divDay} checked={clickedDays.Samedi} onClick={() => handleClickChange("Samedi")}>
                    <div className={clickedDays.Samedi ? classes.styleClicked : classes.styleUnClicked}>
                        <span className={classes.spanLabel} style={{padding: 10}}>Samedi</span>
                    </div>
                </Grid>
                <Grid item className={classes.divDay} checked={clickedDays.Dimanche} onClick={() => handleClickChange("Dimanche")}>
                    <div className={clickedDays.Dimanche ? classes.styleClicked : classes.styleUnClicked}>
                        <span className={classes.spanLabel}>Dimanche</span>
                    </div>
                </Grid>
            </Grid>
            <Grid container direction="row" style={{marginTop: 5}}>
                <Grid item xs={10}></Grid>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<SaveIcon />}
                        onClick={submitChange}
                        style={{fontSize: 12}}
                    >
                       
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(UpdateHoraires)
