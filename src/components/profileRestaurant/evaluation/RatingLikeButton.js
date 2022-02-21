import React, { useState, useEffect, useContext } from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";
import { Button } from "@material-ui/core";
import { UserContext } from "../../../context/UserContext";

function RatingLikeButton(props) {
	const { post, user } = props;
    const { createRatingLike, deleteRatingLike } = useContext(RestaurantContext);
    const { activeUser } = useContext(UserContext);

	const postLikeid = post && post.ratingLikes && post.ratingLikes.map((likes) => likes._id);
	
	const [liked, setLiked] = useState(false);
    let likes;
	if(post.ratingLikes)
	{
		likes=post && post.ratingLikes &&  post.ratingLikes.length;
	} else {
		likes=0;
	}
    
    const [likeslength, setLikeslength] = useState(likes);
  
	function likePost() {
		createRatingLike(post._id);
		setLiked(true);
    	setLikeslength((prev) => (prev+1));
	};

	function dislikePost() {
		postLikeid && deleteRatingLike(postLikeid[0]);
		setLiked(false);
    	setLikeslength((prev) => (prev-1));
	};

	useEffect(() => {
		if (
			activeUser &&
			activeUser.userId &&
			post.ratingLikes &&
			post.ratingLikes.find((like) => like.userId === activeUser.userId)
		) {
			setLiked(true);
			console.log("likes",liked)
		} else setLiked(false);
	}, [activeUser, post.ratingLikes]);

	const likeButton = liked ? (
		<i  className="icon-heart" onClick={dislikePost}> </i>
	) : (
		<i style={{color : "lightgrey"}} className="icon-heart" onClick={likePost}> </i>
	);

	return (
		<Button>
			{likeButton}
      		<span style={{ fontSize: "2.2rem" }}>
				{likeslength}
			</span>
		</Button>
	);
}

export default RatingLikeButton;
