import React, {useContext} from 'react';
import { UiContext } from '../../context/UiContext';

function AutourDeVous(props) {
    const {restaurant} = props;
    const {} = useContext(UiContext);

    return (
        <div>
            <span className="restaurants-around ">Restaurants autour de vous</span>
            <div className="restaurant">
                <img src="assets/img/2e0dc16abd829f5af42b71ed33f2a82d.png" className="pict-of-res" />
                <div className="restaurant-right-side">
                    <img src="assets/img/3f08a2ba008fd3dd0d8090b4d7ab82d8.png" className="logo" />
                    <div className="restaurant-details">
                        <span className="restaurant-name">Belle Restaurant</span>
                        <div className="restaurant-location">
                            <i className="fal fa-map-marker-alt" />
                            <span className="restaurant-adress">Tunis, Cuisine traditionelle</span>
                        </div>
                        <div className="star-rating">
                            <i className="fal fa-star" />
                            <i className="fal fa-star" />
                            <i className="fal fa-star" />
                            <i className="fal fa-star" />
                            <i className="fal fa-star" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="restaurant">
                <img src="assets/img/2e0dc16abd829f5af42b71ed33f2a82d.png" className="pict-of-res" />
                <div className="restaurant-right-side">
                    <div className="logo">
                        <img src="assets/img/3f08a2ba008fd3dd0d8090b4d7ab82d8.png" alt="" />
                    </div>
                    <div className="restaurant-details">
                        <span className="restaurant-name">Belle Restaurant</span>
                        <div className="restaurant-location">
                            <i className="fal fa-map-marker-alt" />
                            <span className="restaurant-adress">Tunis, Cuisine traditionelle</span>
                        </div>
                        <div className="star-rating">
                            <i className="fal fa-star" />
                            <i className="fal fa-star" />
                            <i className="fal fa-star" />
                            <i className="fal fa-star" />
                            <i className="fal fa-star" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

AutourDeVous.propTypes = { }

export default AutourDeVous