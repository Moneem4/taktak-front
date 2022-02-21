import React, {useState, useContext, useEffect} from 'react';
import { RestaurantContext } from '../../context/RestaurantContext';
import BookingRestaurant from '../booking/BookingRestaurant';

function ReservationEncours(props) {
    const { getReservationByUserId } = useContext(RestaurantContext);

    const [reservations, setReservations] = useState(null);
    useEffect(() => {
        getReservationByUserId(setReservations);
    }, []);
    
    return (
        <div className="booking-page-process">
            <div className="booking-page-content">
                <div className="booking-page-content-feed container">
                    <div className="feed-main">
                        <div className="first-process">
                            <div className="eprimez-vous"> Réservation encours </div>
                            <div className="header">
                                <img src="assets/img/svg/booking-person.svg" className="booking-person" />
                                <span>Hey! Mongi, vous avez réservé <span style={{color: '#D40562'}}>
                                    {reservations && reservations.length}</span> rendez-vous réservés !</span>
                            </div>
                            <div className="details-restaurants">
                                <div className="list">
                                    {reservations && reservations.map((reservation) => (
                                        <BookingRestaurant reservation={reservation} setReservations={setReservations} key={reservation._id}/>
                                    ))}
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>   
            </div>
        </div>
    )
}


export default ReservationEncours
