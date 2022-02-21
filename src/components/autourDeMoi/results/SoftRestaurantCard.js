import React, {useState} from 'react';
import Modal from "../../util/UtilModal";
import ReactStars from "react-rating-stars-component";

function SoftRestaurantCard(props) {
    const {restaurant}=props
    const [showModalRating, setShowModalRating] = useState(false);

    const openModalRating = () => {
      setShowModalRating(true);
    };
  
    const firstExample = {
      size: 20,
      value: restaurant.rate,
      edit: false,
    };

    return (
      <div className="soft-restaurant">
        <div className="soft-restaurant-header">
          <img src={restaurant.profileImage} />
          <div className="hover-star">
            <i className="fal fa-star" />
          </div>
        </div>
        <div className="soft-restaurant-body">
          <div className="soft-restaurant-body-header">
            <img src={restaurant.profileImage} />
            <div className="name">
              <span className="restaurant-name">{restaurant.name}</span>
              <span className="restaurant-location">
                <i className="icon-marker" />
               {restaurant.location}
              </span>
            </div>
        
            <div style={{ marginLeft: "auto", marginTop: "-1rem" }}>
              <div onClick={openModalRating}>
                <ReactStars {...firstExample} />
              </div>
            </div>
        
          </div>
          <div className="soft-restaurant-body-footer">
            <div className="people-was-here">
              <div className="peoples">
                <div className="people">
                  <img className='roundedImage' src={restaurant.friendsBeenThere[0].profileImage} />
                </div>
                <div className="people">
                  <img className='roundedImage' src={restaurant.friendsBeenThere[1].profileImage} />
                </div>
                <div className="people">
                  <img className='roundedImage' src={restaurant.friendsBeenThere[2].profileImage} />
                </div>
                <div className="people">
                  <img className='roundedImage' src={restaurant.friendsBeenThere[3].profileImage} />
                </div>
              </div>
              <span>
                <strong>{restaurant.friendsBeenThere[0].name}</strong> et {restaurant.friendsBeenThereNumber} autres étaient là !
              </span>
            </div>
          </div>
         <div className="soft-restaurant-body-invisible">
         {restaurant.promo? 
            <div className="promo">
              <span className="promo-name">PROMO</span>
              <span className="promo-value"> {restaurant.promo} </span>
            </div>
              :<></>}
            <button>
              <i className="icon-restaurant" />
              Suivre
            </button>
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
      
    )
}

SoftRestaurantCard.propTypes = {

}

export default SoftRestaurantCard

