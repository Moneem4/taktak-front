import React from 'react';
import { NavLink } from "react-router-dom";

function BookingRestauranCard(props) {
    const { restaurant } = props;
    let rate;

    if (restaurant.rate === 5) {
        rate = (
            <div>
                <span className="icon-star full" />
                <span className="icon-star full" />
                <span className="icon-star full" />
                <span className="icon-star full" />
                <span className="icon-star full" />
            </div>
        );
      } else if (restaurant.rate === 4) {
        rate = (
            <div>
                <span className="icon-star full" />
                <span className="icon-star full" />
                <span className="icon-star full" />
                <span className="icon-star full" />
                <span className="icon-star" />
            </div>
        );
      } else if (restaurant.rate === 3) {
        rate = (
            <div>
                <span className="icon-star full" />
                <span className="icon-star full" />
                <span className="icon-star full" />
                <span className="icon-star" />
                <span className="icon-star" />
            </div>
        );
      } else if (restaurant.rate === 2) {
        rate = (
            <div>
                <span className="icon-star full" />
                <span className="icon-star full" />
                <span className="icon-star" />
                <span className="icon-star" />
                <span className="icon-star" />
            </div>
        );
      } else if (restaurant.rate === 1) {
        rate = (
            <div>
                <span className="icon-star full" />
                <span className="icon-star" />
                <span className="icon-star" />
                <span className="icon-star" />
                <span className="icon-star" />
            </div>
        );
      } else {
        rate = (
            <div>
                <span className="icon-star" />
                <span className="icon-star" />
                <span className="icon-star" />
                <span className="icon-star" />
                <span className="icon-star" />
            </div>
        );
    }

    return (
        <NavLink exact to={`/bookingProcess/`+restaurant.id}>
            <a className="soft-restaurant">
                <div className="soft-restaurant-header">
                    <img src={restaurant.backgroundImage} />
                </div>
                <div className="soft-restaurant-body">
                    <div className="soft-restaurant-body-header">
                        <img src={restaurant.picture} />
                        <div className="name">
                            <span className="restaurant-name">{restaurant.name}</span>
                            <span className="restaurant-location"><i className="icon-marker" />{restaurant.adresse}, {restaurant.cuisine}</span>
                        </div>
                        <div className="raiting">
                            {rate}
                        </div>
                    </div>
                    <div className="soft-restaurant-body-footer">
                        <div className="people-was-here">
                            <div className="peoples">
                                <div className="people">
                                    <img src={restaurant.visiteurs[0].profileImage} />
                                </div>
                                <div className="people">
                                    <img src={restaurant.visiteurs[1].profileImage} />
                                </div>
                                <div className="people">
                                    <img src={restaurant.visiteurs[2].profileImage} />
                                </div>
                                <div className="people">
                                    <img src={restaurant.visiteurs[3].profileImage} />
                                </div>
                            </div>
                            <span><strong>{restaurant.visiteurs[0].name}</strong> et {restaurant.visiteurs.length - 1} autres étaient là !</span>
                        </div>
                    </div>
                    <div className="soft-restaurant-body-invisible">
                        <div className="promo">
                            <span className="promo-name">PROMO  </span>
                            <span className="promo-value">{restaurant.promo}</span>
                        </div>
                        <button>
                            <i className="icon-restaurant" />
                            Suivre
                        </button>
                    </div>
                </div>  
            </a>   
        </NavLink>
    )
}

BookingRestauranCard.propTypes = {

}

export default BookingRestauranCard