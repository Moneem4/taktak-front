import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "../../context/UserContext";
import { RestaurantContext } from "../../context/RestaurantContext";

function FollowButton(props) {
  const { post, user } = props;
  const {
    Followuser,
    followers,
    following,
    rFollowing,
    activeUser, 
    updateTaktakPoints
  } = useContext(UserContext);

  const {restaurantFollowUser, followRestaurantRestaurant, followRestaurant} = useContext(RestaurantContext)

  if (followers) ;
  if (following) ;
  if (rFollowing) ;

  function userFollower() {
    if(post.isRestaurant){
      followRestaurant(post.userId, user.connectedRestaurentId).then(response => {
        updateTaktakPoints( user.userId, activeUser.countPoints+2);
      });
    }else{
      Followuser(post.userId).then(response => {
        updateTaktakPoints( user.userId, activeUser.countPoints+2);
      });
    }
  }

  function restaurantFollow() {
    if(post.isRestaurant){
      followRestaurantRestaurant(user.connectedRestaurentId, post.userId).then(response => {
        updateTaktakPoints( user.userId, activeUser.countPoints+2);
      });
    }else{
      restaurantFollowUser(user.connectedRestaurentId, post.userId).then(response => {
        updateTaktakPoints( user.userId, activeUser.countPoints+2);
      });
    }
  }

  if(user.isRestaurant){
      return (
        <div
          className="user-who-post-options"
          button
          style={{marginLeft: "60%"}}
        >
          <div className="follow-button" onClick={() => {restaurantFollow() }} >
            <i className="icon-add-friend" />
            <spain className="save" >suivre </spain>
          </div>
        </div>
      );
  }else{
      return (
        <div className="user-who-post-options" style={{marginLeft: "60%"}}>
          <div
            className="follow-button"
            button
            onClick={() => {
              userFollower();
            }}
          >
            <i className="icon-add-friend" />
            <spain className="save">suivre </spain>
          </div>
        </div>
      );
  }
}

export default FollowButton;
