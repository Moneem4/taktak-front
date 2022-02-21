import React from 'react';
import Rating from "@material-ui/lab/Rating";

function FicheRestaurant(props) {
    const {restaurant} = props;

    return (
        <div className="card-restaurant-cover">
            <span className="title">Fiche resturant</span>
            <div className="card-restaurant">
                <div className="image">
                    <img src={restaurant.backgroundImage} />
                </div>
                <div className="content">
                    <div className="informations-restaurant">
                        <div className="details-restaurant">
                            <img className="logo-restaurant" src={restaurant.picture} />
                            <div className>
                                <span className="name-restaurant">{restaurant.name}</span>
                                <div>
                                    <i className="fal fa-map-marker-alt" />
                                    <span className="adress">{restaurant.adresse}, {restaurant.cuisine}</span>
                                </div>
                            </div>
                        </div>
                        <Rating
                            name="read-only"
                            value={restaurant.rate}
                            readOnly
                        />
                    </div>
                    <div className="shared-component-profil-img"> <div />
                        <div>
                            <div className="imgs">
                                {restaurant.visiteurs.slice(0, 4).map((item) => (
                                    <img src={item.profileImage} />
                                ))}
                                <span id="profil-img-number">+{restaurant.visiteurs.length - 4}</span>
                            </div>
                            <span> <strong style={{color: '#175db3'}}>{restaurant.visiteurs[0].name} </strong> et {restaurant.visiteurs.length - 1} autres étaient là !</span>
                        </div>
                    </div>
                    <div className="bottom">
                        <div>
                            <div className="promo">
                                <span className="title"> Promo </span>
                                <span className="pourcentage"> -{restaurant.promo}% </span>
                            </div>
                            <button> <i className="icon-restaurant"> </i>Suivre</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shared-component-profil">
                <div>
                    <span>Ils étaient à <strong>{restaurant.name} Restaurant</strong> </span>
                </div>
                <div className="shared-component-profil-img">
                    {restaurant.visiteurs.slice(0, 4).map((item) => (
                        <img src={item.profileImage} />
                    ))}
                    <span id="profil-img-number" style={{marginLeft: 15}}>+{restaurant.visiteurs.length - 4}</span>
                </div>
            </div>
        </div>
    )
}

FicheRestaurant.propTypes = { }

export default FicheRestaurant