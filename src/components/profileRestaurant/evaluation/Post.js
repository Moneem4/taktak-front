import React, {useState, useContext, useEffect, useRef} from 'react';
import { RestaurantContext } from '../../../context/RestaurantContext';
import { UserContext } from '../../../context/UserContext';
import Rating from "@material-ui/lab/Rating";
import { Collapse } from "@material-ui/core";
import Comment from './Comment';
import CommentsBox from "./CommentsBox";
import RatingLikeButton from './RatingLikeButton';

function Post(props) {
    const {avis} = props;
    const { getUser, createRatingComment } = useContext(RestaurantContext);
    const { activeUser } = useContext(UserContext);
    //const { getComments } = useContext(PostContext);
    const [selectedUser, setSelectedUser] = useState(activeUser);
    const [openComments, setopenComments] = useState(false);
    const [comments, setComments] = useState(avis.ratingComments);
    const id = props.avis._id;

    let listCommentsCount;
	listCommentsCount= avis && avis.ratingComments && avis.ratingComments.length ;
    const [commentsCount, setCommentsCount] = useState(listCommentsCount);

    const [user, setUser] = useState(null);
    useEffect(() => {
      getUser(avis.userId, setUser);
    }, [props]);

    function handleOpenComments() {
		setopenComments(!openComments);
		//getComments(id, setComments);
	}

    const commentInputRef = useRef(null);
    const [commentValueInput, setCommentValueInput] = useState({
	    handlerType: "",
		handlerId: "",
		content: "",
		ratingId: id,
	});

    function handleChange(e, emojiObject) {
		setCommentValueInput((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

    function submit() {
        createRatingComment(
            //commentValueInput.handlerType,
            //commentValueInput.handlerId,
            commentValueInput.ratingId,
            commentValueInput.content
        );
        
        setCommentsCount((prev) => (prev+1));

        let user ={};
        if (selectedUser.__typename==="Restaurant") 
            user = { _id: selectedUser._id,
                firstName: selectedUser.name,
                avatar: selectedUser.avatar}
        else 
            user = { _id: selectedUser.userId,
                firstName: selectedUser.firstName,
                avatar: selectedUser.avatar}
        
        setComments((prev)=>{
            let newComment = {
                ratingId: avis._id,
                content : commentValueInput.content,
                userId : activeUser.userId
            }

            let items= [...prev, newComment];

            return items;
        });
                    
        setCommentValueInput({
            handlerId:  activeUser.userId ,
            content: "",
            postId: id,
        });
    };

    function onKeyUp(e) {
		if (e.charCode === 13 && commentValueInput.content !== "") {
			submit();
		};
	};

    return user ? (
        <div className="card post-card" style={{height: "100%"}}>
            <div className="post-card-header">
                <div className="post-card-photo more" />
            </div>
            <div className="post-card-body">
                <div className="user-who-post-wrapper">
                    <div className="user-who-post">
                        <div className="user-who-post-info">
                            <div className="user-who-post-info-avatar">
                                <img src={`https://${user.avatar}`}/>
                            </div>
                            <div className="user-who-post-info-info">
                                <span className="user-username">{user.firstName} {user.lastName}</span>
                                <div className="user-about">
                                    <i className="fal fa-map-marker-alt" />
                                    {user.location}
                                </div>
                            </div>
                        </div>
                        <div className="user-who-post-options">
                            <div>
                                <Rating 
                                    name="read-only"
                                    value={avis.rateValue}
                                    readOnly
                                />
                            </div>
                            <div className="header-note">
                                <span> {avis.rateValue} <strong>/5</strong></span>
                            </div>
                        </div>
                    </div>
                    <div className="post-card-body-description-user">
                        <div className="description-note">
                            <span className="date">04 Aout 2021 à 12:00 </span>
                        </div>
                        <span className="description"> {avis.comment}.</span>
                    </div>
                </div>
            </div>
            <div className="divider" />
            <div className="post-card-footer">
                <div className="post-card-social-info">
                    <div className="post-card-likes">
                        {/*<i className="icon-heart" />   
                        {avis.ratingLikes ? (
                            <span className="likes-number">{avis.ratingLikes.length}</span>
                        ) : (
                            <span className="likes-number">0</span>
                        )*/}

                        <RatingLikeButton user={activeUser} post={avis} />
                    </div>
                    <div className="post-card-comments">
                        <i className="icon-comment" />
                        {avis.ratingComments ? (
                            <span className="comments-number">{commentsCount}</span>
                        ) : (
                            <span className="comments-number">0</span>
                        )}

                        {openComments ? (
                            <span button className="comments-show-more" onClick={handleOpenComments}> Masquer commentaires </span> 
                        ):(
                            <span button onClick={handleOpenComments} className="comments-show-more">
                                Afficher commentaires
                            </span>
                        )}

                    </div>
                    <div className="post-card-comment-button">
                        <i className="fal fa-flag"> </i>
                    </div>
                </div>
                <div className="post-card-comment">
                    <div className="post-card-comment-avatar">
                        <img src={`https://${user.avatar}`}/>
                        <i className="fal fa-sort-down" aria-hidden="true" />
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
                            name="content" />
                        
                        <div className="comment-options">
                            <i className="icon-camera" />
                            <i className="icon-smile" />
                            <i className="icon-mic" />
                        </div>
                    </div>
                </div>
                {/*<div className="post-card-comments-list">
                    {avis.ratingComments && avis.ratingComments.map((el) => (
                        <Comment comment={el} />
                    ))}
                </div>*/}
                <Collapse in={openComments} timeout="auto" unmountOnExit>
                    <div className="post-card-comments-list">
                        {avis.ratingComments && <CommentsBox comments={comments} setComments={setComments} setCommentsCount = {setCommentsCount} />}
                    </div>
                </Collapse>
            </div>
        </div>
    ) : (
        <></>
    );
}

export default Post
