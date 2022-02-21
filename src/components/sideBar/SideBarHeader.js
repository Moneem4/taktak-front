import React, {useState, useContext} from "react";
import { UserContext } from "../../context/UserContext";
import { RestaurantContext } from "../../context/RestaurantContext";
import { NavLink } from "react-router-dom";

function SideBarHeader(props) {
  const { restaurant } = props;
  const { activeUser, updateTaktakPoints } = useContext(UserContext);
  const { isFollowingRestaurantRestaurant, isFollowingRestaurant, followRestaurantRestaurant, followRestaurant,
    unfollowRestaurantRestaurant, unFollowRestaurant } = useContext(RestaurantContext);
  const [restoIsFollowed, setRestoIsFollowed] = useState();

  function followResto() {
    if(activeUser.isRestaurant){
      followRestaurantRestaurant(activeUser.connectedRestaurentId, restaurant._id).then(response => {
        updateTaktakPoints( activeUser.userId, activeUser.countPoints+2);
      });
    }else{
      followRestaurant(restaurant._id, activeUser.userId).then(response => {
        updateTaktakPoints( activeUser.userId, activeUser.countPoints+2);
      });
    }
  }

  function unFollowResto() {
    if(activeUser.isRestaurant){
      unfollowRestaurantRestaurant(activeUser.connectedRestaurentId, restaurant._id);
      setRestoIsFollowed(false);
    }else{
      unFollowRestaurant(restaurant._id, activeUser.userId);
      setRestoIsFollowed(false);
    }
  }

  if(activeUser.isRestaurant){
    isFollowingRestaurantRestaurant(activeUser.connectedRestaurentId, restaurant._id, setRestoIsFollowed);
  }else{
    isFollowingRestaurant(restaurant._id, activeUser.userId, setRestoIsFollowed)
  }

  return (
    <div>
      <div className="contact">
        <button className="phone-number">
          <i className="fal fa-phone-volume phone-icon" />
          <span className="phone-number-info">{restaurant.phone}</span>
        </button>
        {restoIsFollowed ?
          <button className="suivi-nous" onClick={unFollowResto}>
            <div className="suivi-nous-avatar">
              <img src="../../assets/img/svg/fork.png" />
            </div>
            <span>Suivi</span>
          </button>
        :
          <button className="suivi-nous" onClick={followResto}>
            <div className="suivi-nous-avatar">
              <img src="../../assets/img/svg/fork.png" />
            </div>
            <span>Suivi-nous</span>
          </button>
        }
      </div> 
      <NavLink exact to={`/booking/` + restaurant._id}>
        <button className="reservations">
          <div className="reservation-left-side">
            <a className="reservations-title">
              <i className="icon-chair" />
              Réservez maintenant
            </a>
          </div>
          <div className="reservations-right-side">
            <i className="far fa-comment-dots" />
          </div>
        </button>
      </NavLink>
      <div className="list-icon">
        <div>
          <i className="fal fa-bookmark" />
          <span>Bookmark</span>
        </div>
        <div>
          <i className="fal fa-pennant" />
          <span>Signal</span>
        </div>
        <div>
          <i className="fal fa-share-alt" />
          <span>Share</span>
        </div>
        <div>
          <i className="fal fa-pennant" />
          <span>Itinerary</span>
        </div>
      </div>
    </div>
  );
}

SideBarHeader.propTypes = {};

export default SideBarHeader;
