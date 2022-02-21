import React, { useContext } from 'react';
import { RestaurantContext } from '../../context/RestaurantContext';
import { NavLink } from "react-router-dom";

function BookingRestaurant(props) {
    const {reservation, setReservations} = props;
    const { deleteReservation } = useContext(RestaurantContext);

    function removeReservation () {
        deleteReservation(reservation._id);
        setReservations((prevReservations) => {
            let items = [...prevReservations];
            const indexReservation = items.findIndex(
                el => el.id === reservation.id
            );
            items.splice(indexReservation, 1);
            return items;
        })
    }

    return (reservation &&
        <div className="my-booking-ele">
            <NavLink exact to={`/bookingProcess/`+reservation._id}>
                <div className="my-booking-ele-top">
                    <div className="you-may-like-element">
                        <div className="you-may-like-element-info">
                            <div className="info-header">
                                <img src={`https://${reservation.restaurant.avatar}`} />
                                <div className="name">
                                    <span className="restaurant-name">{reservation.restaurant.name}</span>
                                    <span className="time">
                                        <i className="fal fa-history" style={{marginRight: '1rem'}} />
                                        il y a 2 heures
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span onClick= {() => removeReservation()}> Décliner <i className="fal fa-times" /></span>
                </div>
                <img src={`https://${reservation.restaurant.backgroundImage}`} alt="back" style={{width: 426, height:150}}/>
                <div className="my-booking-ele-bottom">
                    <div>
                        <span className="my-booking-label"> Date &amp; Heure</span>
                        <span className="my-booking-value"> {reservation.date} / {reservation.timeFrom}</span>
                    </div>
                    <div>
                        <span className="my-booking-label"> Nombre de personnes</span>
                        <span className="my-booking-value">
                            <span className="number">{reservation.peopleNumber}</span>
                            <div className="peoples">
                                {reservation.guests.map((item) => (
                                    <div className="people" key={item._id}>
                                        <img src={`https://${item.avatar}`} />
                                    </div>
                                ))}
                            </div>
                            <span className="number-sur-taktak"> Dont {reservation.guests.length} son sur TakTak</span>
                        </span>
                    </div>
                    <div>
                        <span className="my-booking-label"> Modalité de payment</span>
                        <span className="my-booking-value"> {reservation.payment}</span>
                    </div>
                    <div>
                        <span className="my-booking-label"> Votre note spéciale</span>
                        <span className="my-booking-value"> {reservation.note} </span>
                    </div>
                </div>
            </NavLink>
            <div className="divider " />
            <a className="my-booking-footer">
                <button className="cancel" onClick={removeReservation}> 
                    <i className="fal fa-window-close" /> Annuler la réservation
                </button>        
                <button className="phone"><i className="fal fa-phone-volume" />+216 {reservation.restaurant.phone}</button>
                <div className="comment"><i className="fal fa-comment-dots" /></div>
            </a>
        </div>
    )
}

export default BookingRestaurant