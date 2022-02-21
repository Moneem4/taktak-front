import React, {useContext, useState, useEffect} from 'react';
import { RestaurantContext } from '../../context/RestaurantContext';
import { UserContext } from '../../context/UserContext';
import { NavLink } from "react-router-dom";
import Slider from 'infinite-react-carousel';

function BookingProcess(props) {
    const { getReservationById, deleteReservation } = useContext(RestaurantContext);
    const { activeUser } = useContext(UserContext);
    const [showAlert, setShowAlert] = useState(false);
    
    const getUrlFromPath = () => {
        const paths = window.location.href.split("/");
        let url = paths[4];
        
        return url;
    };

    const settings =  {
        autoplay: true
    };

    function annulerBooking() {
        setShowAlert(true);
    }

    function abandonner() {
        setShowAlert(false);
    }

    function deleteBooking() {
        deleteReservation(reservation._id);
        setShowAlert(false);
    }

    const [reservation, setReservation] = useState(null);
    useEffect(() => {
        getReservationById(getUrlFromPath(), setReservation)
    }, []);

    return ( reservation &&
        <div className="booking-page-process">
            <div className="booking-page-process">
                <div className="booking-page-content-feed container">
                    <div className="feed-main">
                        <div className="seconde-process">
                            <div className="eprimez-vous">
                                <NavLink exact to={`/bookingPageProcess`}>
                                    <a className="retour">
                                        <i className="fal fa-long-arrow-left" />
                                        Retour
                                    </a>
                                </NavLink> 
                                Réservation encours
                            </div>
                            <div className="content-process">
                                <div>
                                    <div className="my-booking-ele">
                                        <div className="my-booking-ele-top">
                                            <div className="you-may-like-element">
                                                <div className="you-may-like-element-info">
                                                    <div className="info-header-process">
                                                        <img src={`https://${reservation.restaurant.backgroundImage}`} alt="back" style={{width: 100, height: 100}}/>
                                                        <div className="details">
                                                            <img src={`https://${reservation.restaurant.avatar}`} className="icon-restaurant" />
                                                            <div className="name">
                                                                <span className="restaurant-name">{reservation.restaurant.name}</span>
                                                                <span className="location"><i className="fal fa-map-marker-alt" />{reservation.restaurant.location},
                                                                {reservation.restaurant.specialty.map((el) => `#${el} `)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <span> Décliner <i className="fal fa-times" /></span>
                                        </div>
                                        <div className="my-booking-ele-bottom">
                                            <div>
                                                <span className="my-booking-label"> Date &amp; Heure</span>
                                                <span className="my-booking-value"> {reservation.date} / {reservation.timeFrom} </span>
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
                                                <span className="my-booking-label"> Modalité de payement</span>
                                                <span className="my-booking-value"> {reservation.payment}</span>
                                            </div>
                                            <div>
                                                <span className="my-booking-label">
                                                    Votre note spéciale</span>
                                                <span className="my-booking-value">
                                                    « {reservation.note} » </span>
                                            </div>
                                        </div> 
                                    </div>
                                    <div className="my-booking-footer">
                                        <span className="title">Contacter restaurant</span>
                                        <div className="buttons">
                                            <button className="phone"><i className="fal fa-phone-volume"></i>+216 {reservation.restaurant.phone}</button>
                                            <div className="comment"><i className="fal fa-comment-dots"></i>Discussion instantanée</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content-process-secondary">
                                    <div className="box-content-process-sec">
                                        <NavLink exact to={`/profile/`+activeUser.userId+`/dashboard`}> 
                                            <a className="box-item" href="user-foodlist-profile.html">
                                                    <i className="fal fa-history" />
                                                    <span>Historique</span>
                                                    <span>3</span>
                                            </a>
                                        </NavLink>
                                        <div className="box-item">
                                            <i className="fal fa-repeat-alt" aria-hidden="true" /> 
                                            <span> Relance</span>
                                        </div>
                                        <div className="box-item" onClick={() => annulerBooking()} >
                                            <i className="fal fa-window-close" aria-hidden="true" /> 
                                            <span className="cancel-order"> Annuler</span>
                                        </div>
                                    </div>
                                    <div className="orbit" data-auto-play="false" role="region" data-orbit data-use-m-u-i="false">
                                        <Slider { ...settings }>
                                            <div>
                                                <h3><img className="slide-image" src="../assets/img/Groupe 664.png" /></h3>
                                            </div>
                                            <div>
                                                <h3><img className="slide-image" src="../assets/img/6e7b74dc0f53f8fff799e1b32d704554.png" /></h3>
                                            </div>
                                        </Slider>
                                    </div>
                                </div> 

                            </div>
                        </div>   
                    </div>
                </div>  
                
                <div className="alerte-annulation-commande" style={{ display: showAlert ? "block" : "none" }} >
                    <span className="question">Vous voulez bien annuler cette demande de réservation?</span>
                    <div className="action">
                        <span className="confirmer" onClick={deleteBooking}>Confirmer</span>
                        <span className="annuler" onClick={abandonner}>Abandonner</span>
                    </div>
                </div> 
            </div>   
        </div>
    )
}

export default BookingProcess