import React, {useState, useContext} from 'react';
import { RestaurantContext } from '../../../context/RestaurantContext';

function BookingSeventhStep(props) {
    const { classes } = props;
    const { myReservation, setMyReservation } = useContext(RestaurantContext);

    const onChange = (e) => {
        const value= e.target.value;
        setMyReservation({ ...myReservation, note: value })
    }

    return (
        <div className="orbit-slide">
            <div className="slide-title">
                Une note spéciale pour ce restaurant ?
            </div>
            <div className="write-text">
                <textarea 
                    placeholder={" Votre message ici…"} 
                    onChange={onChange}
                    name={"note"}
                    value={myReservation.note} />
                <span>0/160</span>
            </div>
        </div>
    )
}

export default BookingSeventhStep
