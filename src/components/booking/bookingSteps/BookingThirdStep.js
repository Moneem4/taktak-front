import React, {useContext} from 'react';
import { RestaurantContext } from '../../../context/RestaurantContext';
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

function BookingThirdStep(props) {
    const { classes } = props;
    const { myReservation, setMyReservation } = useContext(RestaurantContext);
    
    const handleTimeChange = (val) => {
        //setMyReservation({ ...myReservation, timeFrom: `${val}:00` })
        setMyReservation({ ...myReservation, timeFrom: val })
    };
    
    return (
        <div className="orbit-slide">
            <div className="slide-title">À quel heure ?</div>
            <div style={{width: '95%', marginTop: 50, marginLeft: 30}}>
                <Slider
                    defaultValue={myReservation.timeFrom}
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
    )
}

export default withStyles(styles)(BookingThirdStep)