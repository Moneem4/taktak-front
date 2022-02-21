import React, { useContext } from "react";
import { RestaurantContext } from "../../context/RestaurantContext";
import { UserContext } from "../../context/UserContext";
import "./unfollow.css";

function UnfollowButton(props) {
	const { post, user } = props;
	const {unfollowRestaurantRestaurant, unFollowRestaurant, restaurantUnfollowUser} = useContext(RestaurantContext)
	const {unfollowUser} = useContext(UserContext)

	function userUnFollow() {
		if(post.isRestaurant){
		  unFollowRestaurant(post.userId, user.userId);
		}else{
		  unfollowUser(post.userId);
		}
	}

	function restaurantUnFollow() {
		if(post.isRestaurant){
		  unfollowRestaurantRestaurant(user.connectedRestaurentId, post.userId);
		}else{
		  restaurantUnfollowUser(user.connectedRestaurentId, post.userId);
		}
	}
 
	if(user.isRestaurant){
		return (
			<div className="user-who-post-options" button style={{marginLeft: "9%"}}>
				<div className="followed" onClick={() => {restaurantUnFollow()}}>
					<i className="icon-checked" />
					<span>Déjà suivi</span>
				</div>
			</div>
		);
	}else{
		return (
			<div className="user-who-post-options" button style={{marginLeft: "9%"}}>
				<div className="followed" onClick={() => {userUnFollow()}}>
					<i className="icon-checked" />
					<span>Déjà suivi</span>
				</div>
			</div>
		);
	}
}

export default UnfollowButton;
