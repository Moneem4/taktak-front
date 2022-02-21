import React, { useState, useContext, useRef, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { RestaurantContext } from "../../context/RestaurantContext";
import { GridList, GridListTile } from "@material-ui/core";
import { UiContext } from "../../context/UiContext";
import PostFooter from "./PostFooter";
import { InView } from "react-intersection-observer";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";
import { NavLink } from "react-router-dom";
import CampaignIcon from '@mui/icons-material/Campaign';
import "./post.css";
import PopupModal from "./createPost/PopupModal";
import Grid from "@material-ui/core/Grid";

function PostStandard(props) {
  const { post, user, setPosts } = props;
  const { rFollowing, following, activeUser, isFollowing } = useContext(UserContext);
  const { userIsFollowedByRestaurant, isFollowingRestaurantRestaurant, isFollowingRestaurant } = useContext(RestaurantContext);

  const [userIsFollowedByResto, setUserIsFollowedByResto] = useState();
  function buttonDisplayFollow() {
    if (following && rFollowing) {
      const tabIds = following.concat(rFollowing);
      let tab = [];
      
      if (tabIds) {
        tab = tabIds.map((el) => el._id);
      }

      return tab.includes(post.userId) || tab.includes(post.taggedRestaurant);
    }

    return false;
  }
  
  function RenderItem(param) {
    const {
      mediaPlayerRunning,
      setTimelineVideoRunning,
      setMediaPlayerRunning,
    } = useContext(UiContext);
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

    switch (param.type) {
      case "IMAGE":
        return (
          <img
            style={{ cursor: "pointer" }}
            button
            src={`https://${param.url}`}
          />
        );
      case "VIDEO":
        return (
          <InView
            as="div"
            style={{ width: "100%" }}
            onChange={handlePauseVideo}
          >
            <video
              ref={postVideo}
              width={"100%"}
              height={"100%"}
              light={true}
              poster={param.videoThumbNail}
              style={{ zIndex: 1, height: "100%", width: "100% !important" }}
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

  const renderPost = (param) => {
    if (param && param.length) {
      switch (param.length) {
        case 1:
          return (
            <GridList cellHeight={"auto"} cols={1}>
              {param.map((el) => (
                <GridListTile key={param._id}>{RenderItem(el)}</GridListTile>
              ))}
            </GridList>
          );
        case 2:
          return (
            <GridList cellHeight={"auto"} cols={2}>
              {param.map((el) => (
                <GridListTile key={param._id}>
                  <NavLink exact to={`/posts/${post._id}`}>
                    {RenderItem(el)}
                  </NavLink>
                </GridListTile>
              ))}
            </GridList>
          );
        case 3:
          return (
            <div className="card post-card" style={{ height: "auto" }}>
              <div className="post-card-header">
                <div className="post-card-photo more" />
                <div className="post-photos">
                  <div className="post-photo-container photo-one">
                    <NavLink exact to={`/posts/${post._id}`}>
                      {RenderItem(param[0])}
                    </NavLink>
                  </div>
                  <div className="post-photo-container">
                    <NavLink exact to={`/posts/${post._id}`}>
                      {RenderItem(param[1])}
                    </NavLink>
                  </div>
                  <div className="post-photo-container">
                    <NavLink exact to={`/posts/${post._id}`}>
                      {RenderItem(param[2])}
                    </NavLink>
                    <div className="more-photos ">{/* <span>+ 3</span> */}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        default:
          return (
            <div className="card post-card" style={{ height: "auto" }}>
              <div className="post-card-header">
                <div className="post-card-photo more" />
                <div className="post-photos">
                  <div className="post-photo-container photo-one">
                    <NavLink exact to={`/posts/${post._id}`}>
                      {" "}
                      {RenderItem(param[0])}
                    </NavLink>
                  </div>
                  <div className="post-photo-container">
                    <NavLink exact to={`/posts/${post._id}`}>
                      {" "}
                      {RenderItem(param[1])}
                    </NavLink>
                  </div>
                  <div className="post-photo-container">
                    <NavLink exact to={`/posts/${post._id}`}>
                      {" "}
                      {RenderItem(param[2])}
                    </NavLink>
                    <div className="more-photos last-photo">
                      <span> + {param.length - 2}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
      }
    }
  };

  if(user.isRestaurant){
    if(post.isRestaurant){
      isFollowingRestaurantRestaurant(user.connectedRestaurentId, post.userId, setUserIsFollowedByResto);
    }else{
      userIsFollowedByRestaurant(user.connectedRestaurentId, post.userId, setUserIsFollowedByResto);
    }
  }else{
    if(post.isRestaurant){
      isFollowingRestaurant(post.userId, user.userId, setUserIsFollowedByResto)
    }else{
      isFollowing(post.userId, setUserIsFollowedByResto);
    }
  }
  
  return (
    <div>
      {post && (
        <div
          className="post-card"
          style={{
            marginBottom: "3rem",
            border: "1px solid #e8e8e8",
            boxShadow: " 2px 2px 2px rgb(0 0 0 / 5%)",
            borderRadius: " 5px",
            marginTop: "2rem",
          }}
        >
          <div className="post-card-header">
            <div className="post-card-photo">
              {post.media
                ? renderPost(post.media)
                : renderPost([
                    {
                      comments: post.comments,
                      likes: post.likes,
                      media: post.media,
                      postMediaType: post.postMediaType,
                    },
                  ])}
            </div>
          </div>
          <div className="post-card-body">
            <div className="user-who-post-wrapper" style={{height: "100%"}}>
              <div className="user-who-post">
                <Grid container direction="row">
                  <Grid item xs={8}>
                    <div className="user-who-post-info">
                      <div className="user-who-post-info-avatar">
                        {post.isRestaurant ?
                          <img src={`https://${post.user.avatar}`} style={{borderRadius: "20%"}} />
                          :
                          <img src={`https://${post.user.avatar}`} />
                        } 
                      </div>
                      <div className="user-who-post-info-info">
                        <span className="user-username">{post.user.firstName}</span>
                        <div className="user-about">
                          <i className="fal fa-map-marker-alt" aria-hidden="true" />
                          <span>{post.user.location}</span>
                        </div>
                      </div>
                    </div>
                  </Grid> 
                  <Grid item xs={3}>
                    {activeUser.isRestaurant ?
                      activeUser.connectedRestaurentId === post.userId ? (
                        <></>
                      ) : userIsFollowedByResto ? (
                        <UnfollowButton user={activeUser} post={post} />
                      ) : (
                        <FollowButton user={activeUser} post={post} />
                      )
                    :
                      activeUser.userId === post.userId ? (
                        <></>
                      ) : userIsFollowedByResto ? (
                        <UnfollowButton user={activeUser} post={post} />
                      ) : (
                        <FollowButton user={activeUser} post={post} />
                      )
                    }
                  </Grid>
                  <Grid item xs={1} style={{marginTop: 10}}>
                    <PopupModal post={post} setPosts={setPosts} />
                  </Grid>
                </Grid>
              </div>
              {post.promoValue ?
                <div className="post-card-body-description" style={{fontSize: 20, fontWeight: "bold"}}>
                  <CampaignIcon
                    style={{ color: "red", fontSize: 20 }}
                  />
                  &ensp;
                  Prmotion de {post.promoValue} %
                </div>
              :
                <></>
              }
              <div className="post-card-body-description">{post.title}</div>
              {post.postType === "QUESTION" || post.postType === "TEXT" ?
                <div className="post-card-body-description">{post.content}</div>
              :
                <div className="post-card-body-description">{post.content}</div>
              }
            </div>
          </div>
          <div className="divider" />
          <PostFooter post={post} user={user} setUserIsFollowedByResto={setUserIsFollowedByResto} />
        </div>
      )}
    </div>
  );
}

export default PostStandard;
