import React, {useContext, useState} from 'react';
import { RestaurantContext } from '../../../context/RestaurantContext';

function Reservation(props) {
    const {reservation, restaurant} = props;
    const {updateReservation} = useContext(RestaurantContext);
    const [show, setShow] = useState(reservation.confirmation);

    function confirmerReservation() {
        const data = {
            confirmation: true
        }
        updateReservation(reservation._id, data).then(response => {
            setShow(true)
        });
    }

    function annulerReservation() {
        const data = {
            confirmation: false
        }
        updateReservation(reservation._id, data).then(response => {
            setShow(false)
        });
    }

    return (
        <div className="my-booking-ele">
            <div className="my-booking-ele-top">
                <div className="you-may-like-element">
                    <div className="you-may-like-element-info">
                        <div className="info-header">
                            <img src={`https://${restaurant.avatar}`} alt='avatar'/>
                            <div className="name">
                                <span className="restaurant-name">{restaurant.name}</span>
                                <span className="restaurant-location"><i className="icon-marker" />{restaurant.address},
                                    {restaurant.specialty.map((el) => `#${el} `)} </span>
                            </div>
                        </div>
                    </div>
                </div>
                <span> Contacter Client <i className="fal fa-comments" /></span>
                <span onClick={() => confirmerReservation()} > Confirmer <i className="fal fa-check" /></span>
                <span onClick={annulerReservation}> Décliner <i className="fal fa-times" /></span>
            </div>
            <div className="my-booking-ele-main" style={{ display: show ? "block" : "none"}}>
                <span>Vous avez confirmé cette réservation. Le client a bien reçu une notification ! </span>
                {/*<span>Vous avez confirmé cette réservation ça fait 2 jours. Le client a bien reçu une notification ! </span>*/}
            </div>
            <div className="my-booking-ele-bottom">
                <div>
                    <span className="my-booking-label"> Date &amp; Heure</span>
                    <span className="my-booking-value"> {reservation.date} – {reservation.timeFrom}</span>
                </div>
                <div>
                    <span className="my-booking-label"> Nombre de personnes</span>
                    <span className="my-booking-value">
                        <span className="number">{reservation.peopleNumber}</span>
                        <div className="peoples">
                            {reservation.guests.map((item) => (
                                <div className="people">
                                    <img src={`https://${item.avatar}`} alt='img' />
                                </div>
                            ))}
                        </div>
                        <span className="number-sur-taktak"> Dont {reservation.guests.length} son sur TakTak</span>
                    </span>
                </div>
                <div>
                    <span className="my-booking-label"> Modalité de payement</span>
                    <span className="my-booking-value"> {reservation.payment} </span>
                </div>
                <div>
                    <span className="my-booking-label"> Votre note spéciale</span>
                    <span className="my-booking-value"> «&nbsp; {reservation.note} &nbsp;»</span>
                </div>
            </div>
        </div>
    )
}

export default Reservation
