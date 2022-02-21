import React, { useContext, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Slider from "infinite-react-carousel";
import { UiContext } from "../../context/UiContext";
import Paper from "@material-ui/core/Paper";
import { InView } from "react-intersection-observer";
import "../../App.css";
import CommentsBox from "./CommentsBox";
import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    textAlign: "center",
    objectFit: "contain",
    maxHeight: "100vh",
    maxWidtht: "100vh",
  },
  paper: {
    backgroundColor: "#f8f7fa",
    boxShadow: theme.shadows[5],
    width: "90vw",
    height: "90vh",
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
    maxHeight: "80vh",
  },
}));

function PostModal(props) {
  const { openModalPost, setOpenModalPost, photos } = useContext(UiContext);
  const { contentInPostModal, setContentInPostModal } = useContext(UiContext);
  const { indexOfClickedElement, setIndexOfClickedElement } =
    useContext(UiContext);
  const { handleClosePostModal } = useContext(UiContext);
  const classes = useStyles();

  const settings = {
    rows: 1,
    slidesPerRow: 1,
    initialSlide: indexOfClickedElement,
    width: "50%",
    afterChange: (currentSlide) => {
      console.log(currentSlide);
    },
  };
  const { mediaPlayerRunning, setTimelineVideoRunning, setMediaPlayerRunning } =
    useContext(UiContext);

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
  function RenderItem(param) {
    switch (param.postMediaType) {
      case "IMAGE":
        return (
          <div className={classes.image}>
            <img src={`https://${param.media}`} className={classes.image} />
          </div>
        );
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
              <source src={`https://${param.media}`} type="video/mp4" />
            </video>
          </InView>
        );

      default:
        return null;
    }
  }

  const tab = props.data.map((el) => RenderItem(el));
  // const handleClose = () => {
  //   setOpenModalPost(!openModalPost)
  //   console.log(openModalPost)
  // };
  
  const comments = [
    {
      userId: "46837c40-2c0a-11ec-9111-511718fb2873",
      commentHandler: {
        firstName: "so7leb",
        profileImage: "../assets/img/avatar.png",
      },
      content: "commentaire so7leb",
    },
    {
      userId: "46837c40-2c0a-11ec-9111-511718fb2873",
      commentHandler: {
        firstName: "so7leb",
        profileImage: "../assets/img/avatar.png",
      },
      content: "commentaire so7leb",
    },
    {
      userId: "46837c40-2c0a-11ec-9111-511718fb2873",
      commentHandler: {
        firstName: "so7leb",
        profileImage: "../assets/img/avatar.png",
      },
      content: "commentaire so7leb",
    },
    {
      userId: "46837c40-2c0a-11ec-9111-511718fb2873",
      commentHandler: {
        firstName: "so7leb",
        profileImage: "../assets/img/avatar.png",
      },
      content: "commentaire so7leb",
    },
    {
      userId: "46837c40-2c0a-11ec-9111-511718fb2873",
      commentHandler: {
        firstName: "so7leb",
        profileImage: "../assets/img/avatar.png",
      },
      content: "commentaire so7leb",
    },
    {
      userId: "46837c40-2c0a-11ec-9111-511718fb2873",
      commentHandler: {
        firstName: "so7leb",
        profileImage: "../assets/img/avatar.png",
      },
      content: "commentaire so7leb",
    },
    {
      userId: "46837c40-2c0a-11ec-9111-511718fb2873",
      commentHandler: {
        firstName: "so7leb",
        profileImage: "../assets/img/avatar.png",
      },
      content: "commentaire so7leb",
    },
    {
      userId: "46837c40-2c0a-11ec-9111-511718fb2873",
      commentHandler: {
        firstName: "ma9arouna",
        profileImage: "../assets/img/avatar.png",
      },
      content: "ma9arouna commentaire",
    },
    {
      userId: "46837c40-2c0a-11ec-9111-511718fb2873",
      commentHandler: {
        firstName: "mar9A",
        profileImage: "../assets/img/avatar.png",
      },
      content: "commentaire mar9a",
    },
  ];

  const changeSlide = (e) => {
    console.log("zzzzccc:", e.target.value);
  };
  return (
    <Modal
      style={{ zIndex: "99999999999999999999" }}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModalPost}
      onClose={handleClosePostModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModalPost}>
        <Paper className={classes.paper}>
          {/* <h2 id="transition-modal-title">Transition modal</h2> */}
          {/* <p id="transition-modal-description">react-transition-group animates me.</p> */}
          <div className="post-card-body">
            <div className="user-who-post-wrapper">
              <div className="user-who-post">
                <div className="user-who-post-info">
                  <div className="user-who-post-info-avatar">
                    <img src="" />
                  </div>
                  <div className="user-who-post-info-info">
                    <span className="user-username">boti boti</span>
                    <div className="user-about">
                      <i className="fal fa-map-marker-alt" aria-hidden="true" />
                      <span>sousse</span>
                    </div>
                  </div>
                </div>
                <div className="user-who-post-options">
                  <div className="follow-button">
                    <i className="icon-add-friend" />
                    <span>Suivre</span>
                  </div>
                  <div className="more-options">
                    <i className="icon-dots-horizontal" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.secondLayer}>
            <div style={{ width: "60%", height: "auto" }}>
              <Slider {...settings}>{tab}</Slider>
            </div>
            <div
              className="commentBox"
              style={{ width: "40%", height: "auto" }}
            >
              <CommentsBox comments={comments} />
            </div>
          </div>

          <div className="post-card-footer">
            <div className="post-card-social-info">
              <div className="post-card-likes">
                <i className="icon-heart" />
                {/* <span className="likes-number">{post.likesNumber}</span> */}
                <span className="likes-number">333</span>
              </div>
              <div className="post-card-comments">
                <i className="icon-comment" />
                {/* <span className="comments-number">{post.commentsNumber}</span> */}
                <span className="comments-number">333</span>
                {/* <span button onClick={handleOpenComments} className="comments-show-more">Afficher commentaires</span> */}
              </div>
              <div className="post-card-comment-button">
                <i className="icon-send"> </i>
              </div>
            </div>
            <div className="post-card-comment">
              <div className="post-card-comment-avatar">
                {/* <img src={user.profileImage} /> */}
                <img src="" />
                <i className="fal fa-sort-down" />
              </div>
              <div className="post-card-comment-input">
                <input
                  placeholder="Commenter ce post"
                  className="post-card-comment-input-field"
                  type="text"
                  // value={commentValueInput}
                  name="commentInput"
                  // onChange={handleChange}
                />
                <div className="comment-options">
                  <i className="icon-camera" />
                  <i className="icon-smile" />
                  {/* <i className="icon-mic" /> */}
                </div>
              </div>
            </div>
          </div>
        </Paper>

        {/* <Slider {...settings}  style={{height: '50%', width:'50%'}} >
          <div style={{height: '50%'}}>
          <img src={props.data[props.index]}/>
          </div>
         
         </Slider> */}
      </Fade>
    </Modal>
  );
}

PostModal.propTypes = {};

export default PostModal;
