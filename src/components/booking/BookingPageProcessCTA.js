import React, {useContext} from 'react';
import Grid from "@material-ui/core/Grid";
import BookingRestauranCard from './BookingRestaurantCard';
import { UiContext } from "../../context/UiContext";

function BookingPageProcessCTA(props) {
    const { restaurants } = useContext(UiContext);

    return (
        <div className="booking-page">
            <div className="booking-page-content">
                <div className="eprimez-vous">
                    Réservation
                </div>
                <div className="booking-page-content-feed container">
                    <div className="feed-main">
                        <div className="step-two booking-step">
                            <div className="step-one booking-step">
                                <div className="step-one-header">
                                    <img src="assets/img/svg/booking-person.svg" />
                                    <span>Hey! Mongi, vous avez choisi de demander une réservation. </span>
                                    <p>Nous vous invitons à commencer par choisir un restaurant.</p>
                                </div>
                                <div className="booking-input">
                                    <input placeholder="Tapez nom de restaurant" />
                                    <span className="icon-search2" />
                                </div>
                                <div className="booking-slider-select">
                                    <span>Ou-bien choisir un parmi notre best-of</span>
                                    <Grid
                                        container
                                        direction="row"
                                        spacing={4}
                                    >
                                        {restaurants.map((restaurant) => (
                                            <Grid item xs={4}>
                                                <div className="restaurants-list">
                                                    <BookingRestauranCard restaurant={restaurant} />
                                                </div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

BookingPageProcessCTA.propTypes = {

}

export default BookingPageProcessCTA