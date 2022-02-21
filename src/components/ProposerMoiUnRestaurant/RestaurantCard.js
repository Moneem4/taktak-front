import React from 'react';
import Rating from "@material-ui/lab/Rating";

function RestaurantCard(props) {
    const { restaurant } = props;
    return (
            <div  className="suggest-restaurant-slider">
                <div className="one-slider">
                    <div className="one-slider-media">
                      <img src={restaurant.backgroundImage} alt="image2"/>
                    </div>
                    <div className="one-slider-info">
                      <div className="info-logo">
                        <img src={restaurant.profileImage} alt="restaurantIcon"/>
                      </div>
                      <span className="info-name">{restaurant.name}</span>
                      <Rating 
                        name="read-only"
                        value={restaurant.rate}
                        readOnly
                      />
                      <p className="info-description">
                        {restaurant.description}
                      </p>
                    </div>
                    <div className="one-slider-bottom">
                      <div className="people-was-here">
                        <div className="peoples">
                            {restaurant.visiteurs.map((el) => (
                                <div className="people">
                                    <img src={el.profileImage} alt="avatar"/>
                                </div>
                            ))}
                        </div>
                        <span><strong>{restaurant.visiteurs[0].firstName}</strong> et {restaurant.visiteurs.length - 1} autres étaient là !</span>
                      </div>
                      <button className="follow btn">
                        <i className="icon-checked" />
                        Déjà suivi
                      </button>
                      <button className="follow send">
                        <i className="icon-send" />
                      </button>
                    </div>
                  </div>
                
            </div>
    )
}

RestaurantCard.propTypes = {

}

export default RestaurantCard