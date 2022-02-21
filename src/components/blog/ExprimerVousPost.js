import React, { useState, useContext, useEffect } from 'react';
import { PostContext } from "../../context/PostContext";
import { UserContext } from "../../context/UserContext";
import { RestaurantContext } from '../../context/RestaurantContext';
import { NavLink } from 'react-router-dom';
import { Collapse } from "@material-ui/core";
import CommentsBox from "../post/CommentsBox";

function ExprimerVousPost(props) {
    const { activeUser, updateTaktakPoints } = useContext(UserContext);
    const { getUserData, getArticleBlogData, getArticleBlogLikes, getArticleBlogComments, 
        createArticleBlogLike, deleteArticleBlogLike, createArticleBlogComment, articleIsLiked } = useContext(PostContext);
    const { getRestaurantData, selectedProfile } = useContext(RestaurantContext);

    const getUrlFromPath = () => {
        const paths = window.location.href.split("/");
        let url = paths[5];
            
        return url;
    };

    const [user, setUser] = useState(null);
    const [article, setArticle] = useState(null);
    const [likes, setLikes] = useState(null);
    const [comments, setComments] = useState(null);
    const [liked, setLiked] = useState(false);
    const [likeslength, setLikeslength] = useState(0);
    const [openComments, setopenComments] = useState(false);
    const articleLikeid = likes && likes.map((like) => like._id);
    const [commentValueInput, setCommentValueInput] = useState({
	    handlerType: "USER",
		content: "",
		articleBlogId: getUrlFromPath(),
	});
    
    let commentscount;
	commentscount= comments && comments.length ;
	const [commentsCount, setCommentsCount] = useState(commentscount)

    const renderBloc = (param, index) => {
        switch (param && param.type) {
            case 'TEXT':
                return (
                    <p style={{fontSize: 20}}>{param.description} </p>
                )
            case 'IMAGE':
                return (
                    <img 
                        src={`https://${param.description}`}
                        alt="img" 
                        style={{height: 250, width: 350, marginLeft: "35%"}}
                    />   
                )
            case 'VIDEO':
                return (
                    <video controls style={{ height: 250, width: 350, marginLeft:"35%" }}>
                        <source src={`https://${param.description}`} />
                    </video>   
                )
            default:
                return (
                    <div></div>
                )
        }
    };

    function likePost() {
        if(activeUser.isRestaurant){
            createArticleBlogLike(activeUser.connectedRestaurentId, article._id);
        }else{
            createArticleBlogLike(activeUser.userId, article._id);
        }

		setLiked(true);
    	setLikeslength((prev) => (prev+1));
	};

    function dislikePost() {
        articleLikeid && deleteArticleBlogLike(articleLikeid[0]);
		setLiked(false);
    	setLikeslength((prev) => (prev-1));
	};

    useEffect(() => {
        getArticleBlogData(getUrlFromPath(), setArticle);
    }, [props]);

    if(article && article.isRestaurant){
        getRestaurantData(article.userId, setUser);
    }else if(article){
        getUserData(article.userId, setUser);
    }

    useEffect(() => {
        getArticleBlogLikes(getUrlFromPath(), setLikes);
        getArticleBlogComments(getUrlFromPath(), setComments);
    }, [props]);
    
    useEffect(() => {
        if(activeUser.isRestaurant){
            article && articleIsLiked(article._id, activeUser.connectedRestaurentId, setLiked);
        }else{
            article && articleIsLiked(article._id, activeUser.userId, setLiked);
        }
        likes && setLikeslength(likes.length);
	}, [activeUser, likes]);

    const likeButton = liked ? (
		<i  className="icon-heart" onClick={dislikePost}> </i>
	) : (
		<i style={{color : "lightgrey"}} className="icon-heart" onClick={likePost}> </i>
	);
    
    function handleChange(e, emojiObject) {
        setCommentValueInput((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
    }

    function onKeyUp(e) {
		if (e.charCode === 13 && commentValueInput.content !== "") {
			submit();
		};
	}

    function handleOpenComments() {
		setopenComments(!openComments);
	}

    function submit() {
        if(activeUser.isRestaurant){
            createArticleBlogComment(
                commentValueInput.handlerType,
                commentValueInput.articleBlogId,
                commentValueInput.content,
                activeUser.connectedRestaurentId,
                activeUser.isRestaurant
            ).then(response => {
                updateTaktakPoints( activeUser.userId, activeUser.countPoints+2);
            });
        }else{
            createArticleBlogComment(
                commentValueInput.handlerType,
                commentValueInput.articleBlogId,
                commentValueInput.content,
                activeUser.userId,
                activeUser.isRestaurant
                //setComments
            ).then(response => {
                updateTaktakPoints( activeUser.userId, activeUser.countPoints+2);
            });
        }
        

        setCommentValueInput((prev) => ({
            ...prev,
            content: "",
        }));
    }

    return (
        <div style={{marginBottom: 70}}>
            <div className="write-your-article">
                Exprimez-vous
            </div>
            <div style={{marginTop: 20}}>
                <div className="blog-post-details-header">
                    <div className="details-back">
                        <NavLink exact to={`/blog`}>
                            <span className="icon-arrow-left back-to-page-one" />
                        </NavLink>
                        <p> Voyage Culinaire </p>
                    </div>
                    <NavLink exact to={`/blog/nouveauArticle`} style={{color: "#fff"}}>
                        <button>
                            <i className="fal fa-pencil" />
                            <span style={{marginLeft: 10}}>Nouveau article</span>
                        </button>
                    </NavLink>
                </div>
                <div className="blog-post with-details">
                    <div className="blog-post-media">
                        <img src={article && `https://${article.backgroundImage}`} />
                    </div>
                    <div className="blog-post-content">
                        {user && article.isRestaurant ? (
                            <div className="post-content-header">
                                <div className="post-header-poster">
                                    <img src={`https://${user.avatar}`} style={{borderRadius: "20%"}}/>
                                    <div className="poster-info">
                                        <span className="poster-name">
                                            {user.name}
                                        </span>
                                        <span className="poster-location">
                                            <i className="icon-marker"> </i>
                                            {user.location}
                                        </span>
                                    </div>
                                </div>
                                <div className="post-info">
                                    <span>{user.createdAt} . 2 min de lecture</span>
                                </div>
                            </div>
                        ): user ? (
                            <div className="post-content-header">
                                <div className="post-header-poster">
                                    <img src={`https://${user.avatar}`} />
                                    <div className="poster-info">
                                        <span className="poster-name">
                                            {user.firstName} {user.lastName}
                                        </span>
                                        <span className="poster-location">
                                            <i className="icon-marker"> </i>
                                            {user.location}
                                        </span>
                                    </div>
                                </div>
                                <div className="post-info">
                                    <span>{user.createdAt} . 2 min de lecture</span>
                                </div>
                            </div>
                        ): (
                            <></>
                        )}
                        <div className="post-content-content">
                            <div className="content-title-new-article">
                                {article && article.title}
                            </div>
                            {article && article.contentBlog.map((section, index) =>
                                <div key={index}>
                                    {renderBloc(section, index)}
                                </div>
                            )}   
                        </div>
                    </div>    
                </div>
                <div className="divider" />
                <div className="card post-card">
                    <div className="post-card-footer">
                        <div className="post-card-social-info">
                            <div className="post-card-likes">
                                {likeButton}
                                <span className="likes-number">
                                    {likeslength}
                                </span>
                            </div>
                            <div className="post-card-comments">
                                <i className="icon-comment" />
                                <span className="comments-number">{comments && comments.length}</span>
                                {comments && comments.length  ? (
                                    <span
                                        button
                                        onClick={handleOpenComments}
                                        className="comments-show-more"
                                    >
                                        Afficher commentaires
                                    </span> 
                                ):( 
                                    <span
                                        button
                                        className="comments-show-more"
                                    >
                                    </span> )}
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
                            </div>
                            <div className="post-card-comment-input">
                                <input 
                                    placeholder="Commenter ce post" 
                                    className="post-card-comment-input-field" 
                                    type="text"
                                    value={commentValueInput.content}
						            onChange={handleChange}
                                    onKeyPress={onKeyUp}
                                    name="content" />
                                <div className="comment-options">
                                    <i className="icon-camera" />
                                    <i className="icon-smile" />
                                    <i className="icon-mic" />
                                </div>
                            </div>
                            <Collapse in={openComments} timeout="auto" unmountOnExit>
                                {comments && <CommentsBox comments={comments} setComments={setComments} setCommentsCount = {setCommentsCount} />}
                            </Collapse>
                        </div>
                    </div>
                </div>             
            </div>        
        </div>
    )
}

export default ExprimerVousPost