import React, {useState, useContext, useEffect} from 'react';
import { RestaurantContext } from '../../../context/RestaurantContext';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import 'date-fns';

const styles = (theme) => ({
    styleClicked: {
        border: '1px solid #ff6900',
        height: "100%"
    }, 
    styleUnClicked: {
        border: '1px solid #ffffff',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: "16px 10px 17px",
        height: 10
    },
    textField: {
        //margin: theme.spacing(4),
        width: "100%",
        fontSize: "2.8rem !important",
        //font: "caption",
        fontWWeight: "bold",
    },
});

function BookingSecondStep(props) {
    const { classes, restaurant } = props;
    const { myReservation, setMyReservation } = useContext(RestaurantContext);
    const [clicked, setClicked] = useState("");

    const handleClickChange = (click, event) => {
        setMyReservation({ ...myReservation, date: event })
        setClicked(click);
    };

    const handleDateChange = (e) => {
        const value = e.target.value;
        //const date = value.getMonth() + 1 + '/' + value.getDate() + '/' + value.getFullYear()
        setMyReservation({ ...myReservation, date: value })
    };
  
    let newDate = new Date();
    const todayDate = newDate.getDate() + '/' + (newDate.getMonth()+1) + '/' + newDate.getFullYear();
    const tomorrowDate = (newDate.getDate()+1) + '/' + (newDate.getMonth()+1) + '/' + newDate.getFullYear();

    useEffect(() => {
        if(myReservation.date === todayDate){
            setClicked("today")
        }else if(myReservation.date === tomorrowDate){
            setClicked("tomorrow")
        }else{
            setClicked("other")
        }
    }, []);

    return (
        <div className="orbit-slide">
            <div className="slide-title">
                Quand ?
            </div>
            <div className="date-selection">
                <div className={clicked=== "today" ? classes.styleClicked : classes.styleUnClicked}>
                    <div className="fixed-date" name= "date" onClick={(e) => handleClickChange("today", todayDate)}>
                        <span>Aujourd’hui</span>
                        <span>{todayDate}</span>
                    </div>
                </div>
                <div className={clicked=== "tomorrow" ? classes.styleClicked : classes.styleUnClicked}>
                    <div className="fixed-date active" name= "date" onClick={(e) => handleClickChange("tomorrow", tomorrowDate)}>
                        <span>Demain</span>
                        <span>{tomorrowDate}</span>
                        <div className="promo" >
                            <p className="pourcentage" style={{marginTop: 65, color: "#ffffff !important"}}>-{restaurant.coutMoyenne}%</p>
                        </div>
                    </div>
                </div>
                <div className={clicked=== "other" ? classes.styleClicked : classes.styleUnClicked}
                style={{position: 'relative', boxShadow: 'none', border: '1px solid #e8e8e8', borderRadius: 5 ,padding: 0}}
                >
                    <form className={classes.container} noValidate>
                        <TextField
                            id="date"
                            type="date"
                            name="date"
                            //defaultValue="2017-05-24"
                            //value={myReservation.date}
                            className={classes.textField}
                            onChange={handleDateChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(BookingSecondStep)
