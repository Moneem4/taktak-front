import React, {useState, useContext} from 'react';
import { RestaurantContext } from '../../../context/RestaurantContext';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers'

const styles = (theme) => ({
    container: {
        backgroundColor: 'white',
        boxShadow: theme.shadows[5],
        height: 215,
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
        marginTop: '20 !important',
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

function HoraireOuverture(props) {
    const {classes} = props;
    const {profileRestaurant, setProfileRestaurant} = useContext(RestaurantContext);
    const [timeFrom, setTimeFrom] = useState(profileRestaurant.openingTime.timeFrom);
    const [timeTo, setTimeTo] = useState(profileRestaurant.openingTime.timeTo);
    const [days, setDays] = useState([]);

    const handleTimeFromChange = (date) => {
        setTimeFrom(date);
    }
    
    const handleTimeToChange = (date) => {
        setTimeTo(date);
    }

    const [clicked, setClicked] = useState({
        Lundi: false,
        Mardi: false,
        Mercredi: false,
        Jeudi: false,
        Vendredi: false,
        Samedi: false,
        Dimanche: false
    });

    const handleClickChange = (value) => {

        setClicked({ ...clicked, [value]: !clicked[value] });

        if(!clicked[value] === true) {

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

    const handleClose = () => {
        props.setShowModal(!props.showModal);
    };

    function submitChange () {
        setProfileRestaurant((prevProfileRestaurant) => {
            let items = {...prevProfileRestaurant};
      
            let horaire = {...items.openingTime, timeFrom: timeFrom, timeTo: timeTo, days: days};
            
            let updatedHoraire = {...prevProfileRestaurant, openingTime: horaire}
            
            return updatedHoraire;
        });
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
                                <h5 className={classes.label}>To</h5>
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
            <h4 className={classes.label}>Les jours d'ouverture</h4>
            <Grid container direction="row" style={{marginTop: 10}} >
                <Grid item className={classes.divDay} checked={clicked.Lundi} onClick={() => handleClickChange("Lundi")} >
                    <div className={clicked.Lundi ? classes.styleClicked : classes.styleUnClicked}>
                        <span className={classes.spanLabel}>Lundi</span>
                    </div>
                </Grid>
                <Grid item className={classes.divDay} checked={clicked.Mardi} onClick={() => handleClickChange("Mardi")}>
                    <div className={clicked.Mardi ? classes.styleClicked : classes.styleUnClicked}>
                        <span className={classes.spanLabel}>Mardi</span>
                    </div>
                </Grid>
                <Grid item className={classes.divDay} checked={clicked.Mercredi} onClick={() => handleClickChange("Mercredi")}>
                    <div className={clicked.Mercredi ? classes.styleClicked : classes.styleUnClicked}>
                        <span className={classes.spanLabel}>Mercredi</span>
                    </div>
                </Grid>
                <Grid item className={classes.divDay} checked={clicked.Jeudi} onClick={() => handleClickChange("Jeudi")}>
                    <div className={clicked.Jeudi ? classes.styleClicked : classes.styleUnClicked}>
                        <span className={classes.spanLabel}>Jeudi</span>
                    </div>
                </Grid>
                <Grid item className={classes.divDay} checked={clicked.Vendredi} onClick={() => handleClickChange("Vendredi")}>
                    <div className={clicked.Vendredi ? classes.styleClicked : classes.styleUnClicked}>
                        <span className={classes.spanLabel}>Vendredi</span>
                    </div>
                </Grid>
                <Grid item className={classes.divDay} checked={clicked.Samedi} onClick={() => handleClickChange("Samedi")}>
                    <div className={clicked.Samedi ? classes.styleClicked : classes.styleUnClicked}>
                        <span className={classes.spanLabel}>Samedi</span>
                    </div>
                </Grid>
                <Grid item className={classes.divDay} checked={clicked.Dimanche} onClick={() => handleClickChange("Dimanche")}>
                    <div className={clicked.Dimanche ? classes.styleClicked : classes.styleUnClicked}>
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

export default withStyles(styles)(HoraireOuverture)
