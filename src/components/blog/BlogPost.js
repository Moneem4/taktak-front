import React, {useState, useContext, useEffect} from 'react';
import { PostContext } from "../../context/PostContext";
import { UserContext } from "../../context/UserContext";
import { RestaurantContext } from '../../context/RestaurantContext';
import { NavLink } from 'react-router-dom';

function BlogPost(props) {
    const { post } = props;
    const { getUserData, getArticleBlogLikes, getArticleBlogComments, createArticleBlogLike, 
        deleteArticleBlogLike, articleIsLiked } = useContext(PostContext);
    const { activeUser, updateTaktakPoints } = useContext(UserContext);
    const { getRestaurantData } = useContext(RestaurantContext);
    const [user, setUser] = useState(null);
    const [likes, setLikes] = useState(null);
    const [liked, setLiked] = useState(false);
    const [likeslength, setLikeslength] = useState(0);
    const [comments, setComments] = useState(null);
    
    function likePost() {
        if(activeUser.isRestaurant){
            createArticleBlogLike(activeUser.connectedRestaurentId, post._id);
        }else{
            createArticleBlogLike(activeUser.userId, post._id);
        }

		setLiked(true);
    	setLikeslength((prev) => (prev+1));
	};

    const articleLikeid = likes && likes.map((like) => like._id);
    function dislikePost() {
        articleLikeid && deleteArticleBlogLike(articleLikeid[0]);
		setLiked(false);
    	setLikeslength((prev) => (prev-1));
	};

    function partagerArticle() {
        console.log("partager article");
        updateTaktakPoints( activeUser.userId, activeUser.countPoints+2);
	};

    useEffect(() => {
        if(post)
        {
            getArticleBlogLikes(post._id, setLikes);
            getArticleBlogComments(post._id, setComments);
        }
        
        if(post && post.isRestaurant){
            getRestaurantData(post.userId, setUser);
        }else{
            post && getUserData(post.userId, setUser);
        }
    }, [props]);
    
    const likeButton = liked ? (
		<i  className="icon-heart" onClick={dislikePost}> </i>
	) : (
		<i style={{color : "lightgrey"}} className="icon-heart" onClick={likePost}> </i>
	);

    useEffect(() => {
        if(post)
        {
            if(activeUser.isRestaurant){
                articleIsLiked(post._id, activeUser.connectedRestaurentId, setLiked);
            }else{
                articleIsLiked(post._id, activeUser.userId, setLiked);
            }
            likes && setLikeslength(likes.length);
        }
	}, [activeUser, likes]);
    
    return (post ? (
        <div className="card-blog">
            <NavLink exact to={`/blog/exprimerVous/`+ post._id }>
                <div className="card-blog-header">
                    <img 
                        src={`https://${post.backgroundImage}`} 
                    />
                </div>
            </NavLink>
            <div className="card-blog-body">
                <div className="content-body">
                    {user && post.isRestaurant ? (
                        <div className="post-content-header">
                            <div className="post-header-poster">
                                <img 
                                    src={`https://${user.avatar}`}
                                    style={{borderRadius: "20%"}}
                                />
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
                                <img 
                                    src={`https://${user.avatar}`}
                                />
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
                        <div className="content-title">
                            {post.title}
                        </div>
                        <p>
                            {post.description}
                        </p>
                    </div>
                </div>
                <div className="blog-post-invisible">
                    {/*<div className="last-visit-restaurant-profil">
                        <img src="../assets/img/Ellipse 379.png" />
                        <img src="../assets/img/Ellipse 382.png" />
                        <img src="../assets/img/svg/Ellipse 380.png" />
                        <span> <strong>{post.participants[0].firstName}</strong>,
                        <strong>{post.participants[1].firstName}</strong> et {post.participants.length - 2} autres personnes</span>
                    </div>*/}
                    <div className="post-card-social-info">
                        <div className="left-side">
                            <div className="post-card-likes">
                                    {likeButton}
                                    <span className="likes-number">
                                        {likeslength}
                                    </span>
                            </div>
                            <div className="post-card-comments">
                                <NavLink exact to={`/blog/exprimerVous/`+ post._id }>
                                    <i className="icon-comment" />
                                    <span className="comments-number">{comments && comments.length}</span>
                                </NavLink>
                            </div>
                        </div>
                        <div className="right-side">
                            <div className="post-card-comment-button" onClick={partagerArticle}>
                                <i className="icon-send"/>
                                <i className="fal fa-share-alt share" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    ): (<></>)
    )
}

export default BlogPost