import React from 'react';
import Slider from 'infinite-react-carousel';

function SideBarPromo(props) {
    const {restaurant} = props;

    const settings =  {
        autoplay: true
    };

    return (
        <div className="feed-secondary-promo">
            <div className="promo-header">
                <span className="title-header">Vos promos</span>
            </div>
            {/*<Slider { ...settings }>
                {restaurant.promoImage.map((el) => (
                    <div>
                        <h3><img className="slide-image" src={el.content} alt="promo" /></h3>
                    </div>
                ))}
            </Slider>*/}
        </div>
    )
}

SideBarPromo.propTypes = {

}

export default SideBarPromo