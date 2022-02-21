import React, { useState, useContext, useEffect, useRef } from "react";
import { Collapse } from "@material-ui/core";
import CommentsBox from "./CommentsBox";
import AvatarUser from "../atoms/AvatarUser";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import AvatarRestaurant from "../atoms/AvatarRestaurant";
import Picker from "emoji-picker-react";
import { UserContext } from "../../context/UserContext";
import { PostContext } from "../../context/PostContext";
import LikeButton from "../post/LikeButton"
import { RestaurantContext } from "../../context/RestaurantContext";

function PostFooter(props) {
	const { post, user, setUserIsFollowedByResto } = props;
	const { createComment, getComments, createPostLike, getPostLikes } = useContext(PostContext);
	const { activeUser, updateTaktakPoints, isFollowing } = useContext(UserContext);
	const { isFollowingRestaurantRestaurant, userIsFollowedByRestaurant, isFollowingRestaurant, 
		selectedProfile } = useContext(RestaurantContext);
	const [openComments, setopenComments] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [anchorEmoji, setAnchorEmoji] = useState(null);
	const open = Boolean(anchorEl);
	const open2 = Boolean(anchorEmoji);
	const commentInputRef = useRef(null);
	const [likes, setLikes] = useState();
	const [handler, setHandler] = useState();
	const [selectedUser, setSelectedUser] = useState(activeUser);
	const [selectedResto, setSelectedResto] = useState();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	
	const handleClickEmoji = (event) => {
		setAnchorEmoji(event.currentTarget);
	};

	const id = props.post._id;

	const [comments, setComments] = useState([]);
	useEffect(() => {
		likes && getPostLikes(id, setLikes);
	}, [post, setComments,setLikes]);

	const { content } = post;

	const [commentValueInput, setCommentValueInput] = useState({
	    handlerType: "",
		handlerId: activeUser.userId,
		content: "",
		postId: id,
	});

	useEffect(() => {
		setCommentValueInput((prev) => {
			if(Object.keys(selectedUser).includes("__typename")) {
				return {...prev, handlerType:  "RESTAURANT" ,
				handlerId: selectedUser._id  }
			}
			else return {...prev, handlerType:  "USER" ,
			handlerId: selectedUser.userId  }
		})
	}, [selectedUser.avatar]);

	const handleSubmit = (e) => {
		e.preventDefault();
		alert("you have searched for - " + commentValueInput);
	};

	function handleOpenComments() {
		setopenComments(!openComments);
		getComments(id, setComments);
	}

	const [chosenEmoji, setChosenEmoji] = useState(null);
	const [emojiPicker, setEmojiPicker] = useState(false);
	const [message, setMessageForm] = useState("");

	const onEmojiClick = (event, emojiObject) => {
		const cursor = commentInputRef.current.selectionStart;
		const text =
			message.slice(0, cursor) + emojiObject.emoji + message.slice(cursor);
		setMessageForm(text);
	};

	function emojiPickerOpen() {
		setEmojiPicker(!emojiPicker);
	}

	function handleChange(e, emojiObject) {
		setCommentValueInput((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	}

	let commentscount;
	commentscount= post && post.comments && post.comments.length ;
	const [commentsCount, setCommentsCount] = useState(commentscount);
	
	const handleClose = () => {
		setAnchorEl(null);		
	};

	const switchProfile = (el) => {
		if(el.__typename === "Restaurant")
		{
			//setActiveUser({...activeUser, isRestaurant: true, connectedRestaurentId: el._id})
			setSelectedResto(el)
			
			if(post.isRestaurant){
				isFollowingRestaurantRestaurant(user.connectedRestaurentId, post.userId, setUserIsFollowedByResto);
			}else{
				userIsFollowedByRestaurant(user.connectedRestaurentId, post.userId, setUserIsFollowedByResto);
			}
		}else if(el.__typename === "User"){
			//setActiveUser({...activeUser, isRestaurant: false, connectedRestaurentId: ""})
			
			if(post.isRestaurant){
				isFollowingRestaurant(post.userId, user.userId, setUserIsFollowedByResto)
			}else{
				isFollowing(post.userId, setUserIsFollowedByResto);
			}
		}
		//setCommentValueInput((prev)=> ({...prev, handlerId : el._id, handlerType : "RESTAURANT"}))
		//setAnchorEmoji(null);
		setAnchorEl(null);
	};

	function submit() {
		setCommentValueInput({...commentValueInput,	handlerId:  activeUser.userId })
		createComment(
			commentValueInput.handlerType,
			activeUser.userId,
			commentValueInput.postId,
			commentValueInput.content,
			activeUser.isRestaurant, 
			activeUser.connectedRestaurentId,
			setComments
		).then(response => {
			updateTaktakPoints( activeUser.userId, activeUser.countPoints+2);
		});

		let user ={}
		setCommentsCount((prev) => (prev+1));
			if (selectedUser.__typename==="Restaurant") 
			{
	        	user = { 
					_id: selectedUser._id,
					firstName: selectedUser.name,
					avatar: selectedUser.avatar
				}
			}else {
				user = {
					_id: selectedUser.userId,
					firstName: selectedUser.firstName,
					avatar: selectedUser.avatar
				}
			}
	
		setComments((prev)=>{
			return [...prev,  {createdAt: Date.now() , content : commentValueInput.content,  user : {...user} }]})
				
		setCommentValueInput({
			handlerId:  activeUser.userId ,
			content: "",
			postId: id,
		})

		// setCommentValueInput("")
	}

	function onKeyUp(e) {
		if (e.charCode === 13 && commentValueInput.content !== "") {
			submit();
		};
	}

	return (
		<div className="post-card-footer">
			<div className="post-card-social-info">
				<div className="post-card-likes">
				{/* <i className="icon-heart"  onClick={()=>likePost()}/>
            	<span className="likes-number">{post && post.likes.count}</span> */}
					<LikeButton user={user} post={post} />
				
				</div>
				<div className="post-card-comments">
					<i className="icon-comment" />
					<span className="comments-number">
						{commentsCount}
					</span>
					{commentsCount  ? 
						<span
							button
							onClick={handleOpenComments}
							className="comments-show-more"
						>
							Afficher commentaires
						</span> 
						: 
						<span button className="comments-show-more" > </span> }
				</div>
				<div className="post-card-comment-button">
					<i className="icon-send"> </i>
				</div>
			</div>
			<div className="post-card-comment">
				<div className="post-card-comment-avatar">
					{activeUser.isRestaurant ?
						<img
							alt="img"
							src={`https://${selectedProfile.profile.avatar}`}
							style={{ borderRadius: "20%" }}
						/>
					:
						<img
							alt="img"
							src={`https://${activeUser.avatar}`}
							style={{ borderRadius: "50%" }}
						/>
					}
					
					{/*<ArrowDropDownIcon
						onClick={handleClick}
						fontSize="inherit"
						className="fal fa-sort-down"
					/>
					<Menu
						id="fade-menu"
						anchorEl={anchorEl}
						keepMounted
						open={open}
						onClose={handleClose}
						TransitionComponent={Fade}
					>
						<MenuItem onClick={()=>switchProfile(activeUser)}>
							<AvatarUser activeUser={user} link={false} />
						</MenuItem>

						{myRestaurantsList.map((el,index) => 
						  <MenuItem onClick={()=>{switchProfile(el)}}>
							<AvatarRestaurant activeUser={el} link={false} />
						  </MenuItem>
						)}
					</Menu>*/}
				</div>
				<div className="post-card-comment-input">
					<input
						placeholder="Commenter ce post"
						className="post-card-comment-input-field"
						type="text"
						value={commentValueInput.content}
						ref={commentInputRef}
						onChange={handleChange}
						onKeyPress={onKeyUp}
						name="content"
					/>

					<div className="comment-options">
						<i className="icon-camera" />
						<i className="icon-smile" onClick={handleClickEmoji} />
						<Menu
							id="emoji"
							anchorEl={anchorEmoji}
							keepMounted
							open={open2}
							onClose={handleClose}
							TransitionComponent={Fade}
						>
							<MenuItem>
								<Picker
									onEmojiClick={onEmojiClick}
									disableAutoFocus={true}
									native
								/>
								{/* {chosenEmoji && <EmojiData chosenEmoji={chosenEmoji} />} */}
							</MenuItem>
						</Menu>
					</div>
				</div>
			</div>

			<Collapse in={openComments} timeout="auto" unmountOnExit>
				{comments && <CommentsBox comments={comments} setComments={setComments} setCommentsCount = {setCommentsCount} />}
			</Collapse>
		</div>
	);
}

export default PostFooter;