import React, { useContext, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AvatarUser from "../atoms/AvatarUser";
import Picker from "emoji-picker-react";
import CommentsBox from "./CommentsBox";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Fade from "@material-ui/core/Fade";
import AvatarRestaurant from "../atoms/AvatarRestaurant";
import Backdrop from "@material-ui/core/Backdrop";
import LikeButton from "../post/LikeButton";
import Slider from "infinite-react-carousel";
import { UiContext } from "../../context/UiContext";
import Paper from "@material-ui/core/Paper";
import { InView } from "react-intersection-observer";
import "../../App.css";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router";
import { PostContext } from "../../context/PostContext";
import { Collapse, GridList, GridListTile } from "@material-ui/core";
import { UserContext } from "../../context/UserContext";
import PostFooter from "./PostFooter";
import { RestaurantContext } from "../../context/RestaurantContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    textAlign: "center",
    objectFit: "contain",

    height: "50vh",
    width: "50vh",
  },
  imageContainer: {
    textAlign: "center",
    // border: '10px solid rgba(0, 0, 0, 0.05)',
    height: "50vh",
    width: "50vh",
  },
  paper: {
    backgroundColor: "#f8f7fa",
    boxShadow: theme.shadows[1],
    width: "100%",
    height: "76%",
    borderColor: "darkgrey",
    borderWidth: 0.5,
    margin: "auto",
  },
  appBar: {
    marginBottom: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeButton: {
    marginLeft: 30,
  },
  imageContent: {
    objectFit: "cover",
    width: "100%",
    height: 550,
  },
  titleLabel: {
    fontSize: 16,
    color: "white",
    margin: 10,
    fontWeight: "bold",
  },
  descriptionLabel: {
    fontSize: 14,
    color: "white",
    margin: 10,
  },
  colorLight: {
    //color: fade(theme.palette.primary.light, 1),
    color: "white",
    marginLeft: theme.spacing(1),
  },
  secondLayer: {
    display: "flex",
    alignItems: "stretch",
    height: "50vh",
  },
}));

function PostPage(props) {
 
  const ref = useRef(null);
	const { activeUser, loadUserById } = useContext(UserContext);
  let { id } = useParams();
  const [commentValueInput, setCommentValueInput] = useState({
	    handlerType: "",
		  handlerId: "",
		  content: "",
		  postId: id,
	});

  function handleChange(e, emojiObject) {
    setCommentValueInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const [selectedUser, setSelectedUser] = useState(activeUser);
  const { myRestaurantsList } = useContext(RestaurantContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEmoji, setAnchorEmoji] = React.useState(null);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [openComments, setopenComments] = useState(false);
  const [postHandler, setPostHandler] = useState(null);
  const { rFollowing, following } = useContext(UserContext);
  const {
    getPostByIdFromFeed,
    createComment,
    getComments,
    getPostById,
    createPostLike,
    getPostLikes,
  } = useContext(PostContext);
  
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEmoji);
  const [comments, setComments] = useState(null);

  const handleClose = (el) => {
    setAnchorEl(null);
    setSelectedUser(el);
    setCommentValueInput((prev) => ({
      ...prev,
      handlerId: el._id,
      handlerType: "RESTAURANT",
    }));
    setAnchorEmoji(null);
    // if (chosenEmoji) {
    // 	const { emoji } = chosenEmoji;
    // 	console.log(emoji);
    // 	setCommentValueInput((prev) => prev.concat(emoji));
    // 	setChosenEmoji(null);
    // }
  };
 
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPostById(id, setPost);
    getComments(id, setComments);
  }, [id]);
  
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    post && loadUserById(post.userId, setPostHandler);
  }, [post]);
  
  const classes = useStyles();

  const idRelated =
    post && post.relatedPosts && post.relatedPosts.map((id) => id._id);
 
  const settings = {
    rows: 1,
    slidesPerRow: 1,
    initialSlide: 0,
  };

  function onKeyUp(e) {
		if (e.charCode === 13 && commentValueInput.content !== "") {
			submit();
		};
	}

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const { mediaPlayerRunning, setTimelineVideoRunning, setMediaPlayerRunning } = useContext(UiContext);

  const postVideo = useRef(null);

  const handlePauseVideo = () => {
    postVideo.current.pause();
  };

  useEffect(() => {
    if (mediaPlayerRunning) {
      if (postVideo.current) {
        handlePauseVideo();
      }
    }
  }, [mediaPlayerRunning]);

  const onPlaying = () => {
    setMediaPlayerRunning(false);
    setTimelineVideoRunning(true);
  };

  function handleOpenComments() {
    setopenComments(!openComments);
    getComments(id, setComments);
  }

  let commentscount;
	commentscount= post && post.comments && post.comments.length ;
	const [commentsCount, setCommentsCount] = useState(commentscount)

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
    );
 
    let user ={}
    setCommentsCount((prev) => (prev+1));

    if (selectedUser.__typename==="Restaurant") 
      user = { 
        _id: selectedUser._id,
        firstName: selectedUser.name,
        avatar: selectedUser.avatar}
    else user = {
      _id: activeUser.userId,
      firstName: activeUser.firstName,
      avatar: activeUser.avatar}
    
    setComments((prev)=>{
       return [...prev,  {createdAt: Date.now() , content : commentValueInput.content,  user : {...user} }]})
    
    setCommentValueInput({
      handlerId:  activeUser.userId ,
      content: "",
      postId: id,
    })
  }

  function RenderItem(param) {
    switch (param.type) {
      case "IMAGE":
        return <img src={`https://${param.url}`} className={classes.image} />;
      case "video":
        return (
          <InView
            as="div"
            style={{ width: "100%" }}
            onChange={handlePauseVideo}
          >
            <video
              ref={postVideo}
              width={"90%"}
              height={"100%"}
              light={true}
              poster={param.videoThumbNail}
              style={{
                zIndex: 1,
                height: "100%",
                width: "100% !important",
                position: "relative",
                left: "5%",
              }}
              controls
              onPlay={() => onPlaying()}
            >
              <source src={`https://${param.url}`} type="video/mp4" />
            </video>
          </InView>
        );

      default:
        return null;
    }
  }

  const tab = post && post.media && post.media.map((el) => RenderItem(el));

  function buttonDisplayFollow() {
    if (following && rFollowing) {
      const tabIds = following.concat(rFollowing);
      let tab = [];
      console.log(tabIds, "tab concat");
      if (tabIds) {
        tab = tabIds.map((el) => el._id);
      }

      return tab.includes(post.userId) || tab.includes(post.taggedRestaurant);
    }

    return false;
  }

  useEffect(() => {
		setCommentValueInput((prev) => {
			if(Object.keys(selectedUser).includes("__typename")) {
				return {...prev, handlerType:  "RESTAURANT" ,
				handlerId: selectedUser._id  }
			}
			else return {...prev, handlerType:  "USER" ,
			handlerId: selectedUser.userId  }
		})
	}, [selectedUser.avatar])

  post && console.log(post, "sdfs");
  return (
    <div className={classes.paper}>
      {postHandler && (
        <div className="post-card-body">
          <div className="user-who-post-wrapper">
            <div className="user-who-post">
              <div className="user-who-post-info">
                <div className="user-who-post-info-avatar">
                  <img src={"https://" + postHandler.avatar} />
                </div>
                <div className="user-who-post-info-info">
                  <span className="user-username">
                    {postHandler.firstName + " " + postHandler.lastName}
                  </span>
                  <div className="user-about">
                    <i className="fal fa-map-marker-alt" aria-hidden="true" />
                    <span>{postHandler.location}</span>
                  </div>
                </div>
              </div>
              <div className="user-who-post-options">
                {/*buttonDisplayFollow() ? (
                  <div className="follow-button">
                    <i className="icon-add-friend" />
                    <span>Suivre</span>
                  </div>
                ) : (
                  <span></span>
                )*/}
                {/* <div className="more-options">
                  <i className="icon-dots-horizontal" />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={classes.secondLayer}>
        <div style={{ width: "70%", height: "60vh" }}>
          {post && post.media && tab && (
            <Slider {...settings}>{tab}</Slider>
          )}
        </div>
        <div className="post-card-footer">
          <div className="commentBox" style={{ width: "100%", height: 280 }}>
            <div className="post-card-comment">
              <Grid container direction="row">
                <Grid item xs={2} >
                  <div className="post-card-comment-avatar">
                    {activeUser &&
                      <AvatarUser
                        style={
                          activeUser.isRestaurant
                            ? { borderRadius: "3%" }
                            : { borderRadius: "50%" }
                        }
                        activeUser={activeUser}
                        link={false}
                      />
                    }
                  </div>
                </Grid>
                <Grid item xs={8} >
                  <div className="post-card-comment-input">
                    <input
                      ref={ref}
                      placeholder="Commenter ce post"
                      className="post-card-comment-input-field"
                      type="text"
                      value={commentValueInput.content}
                      onChange={handleChange}
                      onKeyPress={onKeyUp}
                      name="content"
                    />
                    <div className="comment-options">
                      <i className="icon-camera" />
                      <i className="icon-smile" />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
            {comments && <CommentsBox comments={comments} />}
          </div>
        </div>
      </div>

      {post && (
        <div className="post-card-footer">
          <div className="post-card-social-info">
            <div className="post-card-likes">
              {/* <span className="likes-number">{likes.length}</span> */}
              <LikeButton user={activeUser} post={post} />
            </div>
            <div className="post-card-comments">
              <i className="icon-comment" />
              {/* <span className="comments-number">{post.commentsNumber}</span> */}
              {comments && (
                <span className="comments-number">{comments.length}</span>
              )}
              {/* <span button onClick={handleOpenComments} className="comments-show-more">Afficher commentaires</span> */}
            </div>
            <div className="post-card-comment-button">
              <i className="icon-send"> </i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

PostPage.propTypes = {};

export default PostPage;
