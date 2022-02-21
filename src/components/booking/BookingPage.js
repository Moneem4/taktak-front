import React, {useState, useContext, useEffect} from 'react';
import { RestaurantContext } from '../../context/RestaurantContext';
import { UserContext } from '../../context/UserContext';
import { NavLink } from 'react-router-dom';
import Modal from "../util/UtilModal";
import ReactStars from "react-rating-stars-component";

function BookingPage(props) {
    const {getRestaurantData, myReservation, setMyReservation} = useContext(RestaurantContext);
    const {activeUser} = useContext(UserContext);
    const [showModalRating, setShowModalRating] = useState(false);

    const getUrlFromPath = () => {
        const paths = window.location.href.split("/");
        let url = paths[4];
        
        return url;
    };

    const [restaurant, setRestaurant] = useState(null);
    useEffect(() => {
        getRestaurantData(getUrlFromPath(), setRestaurant);
    }, [props]);

    const openModalRating = () => {
        setShowModalRating(true);
    };
    
    let firstExample;
    if(restaurant){
        firstExample = {
            size: 30,
            value: restaurant.restaurantRate,
            edit: false,
        };
    };
    
    const handleChange = () => {
        setMyReservation({ ...myReservation, restaurantId: restaurant._id});
    };

    return restaurant ? (
        <div className="booking-page">
            <div className="booking-page-content">
                <div className="eprimez-vous">
                    Réservation
                </div>
                <div className="booking-page-content-feed container">
                    <div className="feed-main">
                        <div className="step-two booking-step">
                            <div className="step-two-body">
                                <div className="header-inner container">
                                    <div className="profile-picture">
                                        <img src={`https://${restaurant.avatar}`} />
                                    </div>
                                    <div className="user-info">
                                        <div className="user-info-info">
                                            <span className="name">{restaurant.name} </span>
                                            <span className="location">
                                                <i className="fal fa-map-marker-alt" /> {restaurant.address}
                                                <div onClick={openModalRating}>
                                                    <ReactStars {...firstExample} />
                                                </div>
                                                <div className="votes">
                                                    {restaurant.restaurantRate}/5
                                                </div>
                                                <div className="votes-nb">
                                                    {restaurant.countVotes} votes
                                                </div>
                                            </span>
                                            <div className="tagsBox">#friends #foodista #pasta</div>
                                        </div>  
                                    </div>
                                    <div className="other-info">
                                        <span>
                                            <i className="fal fa-phone-volume" />
                                            {restaurant.phone}
                                        </span>
                                        <NavLink exact to={`/taktakPoints`}>
                                            <a> 
                                                <img src="../../assets/img/row_.png" />X6 <span className="wintak">WinTak</span> 
                                            </a>
                                        </NavLink>
                                    </div>
                                </div>
                                <img src="../../assets/img/svg/booking-person.svg" className="booking-person" />
                                <span>Hey! Mongi, vous avez choisi de réserver chez ce restaurant. </span>
                                <p>
                                    Nous vous invitons à personnaliser votre réservation en suivant les prochaines étapes.
                                </p>
                                <NavLink exact to={`/booking/`+ restaurant._id + `/bookingProcess`}>
                                    <button onClick={() => handleChange()}>
                                        Suivant
                                    </button>
                                </NavLink>
                            </div>
                        </div>   
                    </div>
                </div>           
            </div>
            <Modal
                showModal={showModalRating}
                setShowModal={setShowModalRating}
                page="createRating"
                evaluatedId={restaurant._id}
                ratingType="RESTAURANT"
            />
        </div>
    ) : (
        <></>
    );
}

export default BookingPage
