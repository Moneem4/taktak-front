import React, { useState, useEffect, useContext } from "react";
import { PostContext } from "../../context/PostContext";
import { UserContext } from "../../context/UserContext";
import { Button } from "@material-ui/core";

function LikeButton(props) {
	const { post, user } = props;
	const { activeUser, updateTaktakPoints } = useContext(UserContext);
	const { createPostLike, getPostLikes, deletePostLike } = useContext(PostContext);

	const id = post && post._id;
	const postLikeid = post && post.likes && post.likes.map((likes) => likes._id);
	
	// const likes= post && post.relatedPosts && post.relatedPosts.likes &&  post.relatedPosts.likes.map((likes)=>likes._id);
	// console.log(likes,"LikesId");
	
	const [liked, setLiked] = useState(false);
  	let likes;
   	likes=post && post.likes &&  post.likes.length

 	const [likeslength, setLikeslength] = useState(likes)
  
	function likePost() {
		createPostLike(activeUser.userId, post._id, activeUser.isRestaurant, activeUser.connectedRestaurentId);
		setLiked(true);
    	setLikeslength((prev) => (prev+1))
		/*.then(response => {
            if(likeslength === 100 && 
				post.userId === activeUser.userId && 
				(post.postMediaType === "IMAGE" || post.postMediaType === "VIDEO")
			){
				updateTaktakPoints( post.userId, activeUser.countPoints+5);
			}
        });*/
	};

	function dislikePost() {
		postLikeid && deletePostLike(postLikeid[0]);
		setLiked(false);
    	setLikeslength((prev) => (prev-1))
	};

	useEffect(() => {
		if (
			activeUser &&
			activeUser.userId &&
			post.likes &&
			post.likes.find((like) => like.userId === activeUser.userId)
		) {
			setLiked(true);
		} else setLiked(false);
	}, [activeUser, post.likes]);

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

export default LikeButton;
