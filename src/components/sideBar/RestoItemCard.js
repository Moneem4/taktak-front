import React from 'react';
import Rating from '@material-ui/lab/Rating'

function RestoItemCard(props) {
    const {item} = props;

    return (
        <div className="restaurant">
            <img src={item.picture} className="pict-of-res" />
            <div className="restaurant-right-side">
                <img src="../assets/img/3f08a2ba008fd3dd0d8090b4d7ab82d8.png" className="logo" />
                <div className="restaurant-details">
                    <span className="restaurant-name">{item.name}</span>
                    <div className="restaurant-location">
                        <i className="fal fa-map-marker-alt" />
                        <span className="restaurant-adress">
                            {item.cuisine}
                        </span>
                    </div>
                    <Rating
                        name="read-only"
                        value={item.rate}
                        readOnly
                    />
                </div>
            </div>
        </div>
    )
}

RestoItemCard.propTypes = { }

export default RestoItemCard