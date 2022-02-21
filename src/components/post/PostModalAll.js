
  
import React, {useState, useContext, useRef} from 'react';
import { PostContext } from "../../../context/PostContext";
import { UserContext } from "../../../context/UserContext";
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/';
import SmallProfileImage from "../../util/SmallProfileImage";
import { fromNow } from "../../Common/time/fromNow";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import SvgIcon from "@material-ui/core/SvgIcon";
import { ReactComponent as Clap } from "../clap.svg";
import ShareIcon from "@material-ui/icons/Share";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import Grid from "@material-ui/core/Grid";
import Tooltip from '@material-ui/core/Tooltip';
import AccordionActions from "@material-ui/core/AccordionActions";
import { InView } from "react-intersection-observer";
import Comments from "../Comments";

const useStyles = makeStyles({
    paper: {
        backgroundColor: '#303030',
        boxShadow: theme.shadows[5],
        width: 1100, 
        height: 550,
        borderColor: 'darkgrey',
        borderWidth: 0.5,
        marginTop:50
    },
    appBar: {
        borderBottom: "0.1px groove darkgrey",
        height: 50
    },
    closeButton: {
        marginLeft: 30,
    },
    imageContent: {
        objectFit: "cover",
        width: "100%",
        height: 550
    },
    titleLabel: {
        fontSize: 16,
        color: "white",
        margin: 10,
        fontWeight: "bold"
    },
    descriptionLabel: {
        fontSize: 14,
        color: "white",
        margin: 10
    },
    colorLight: {
        //color: fade(theme.palette.primary.light, 1),
        color: "white",
        marginLeft: theme.spacing(1),
    },
});

function ShowPost(props) {
    const { classes, post } = props;
   
    const {
        updatePlayList,
        showComments,
        commentHeight,
        setMediaPlayerRunning,
        setTimelineVideoRunning,
        posts, 
        setPosts,
        getIndex
    } = useContext(PostContext);

    const handleClose = () => {
        props.setShowModal(!props.showModal);
    };

    const postVideo = useRef(null);
    const handlePauseVideo = () => {
        postVideo.current.pause();
    };
    const onPlaying = () => {
        setMediaPlayerRunning(false);
        setTimelineVideoRunning(true);
    };
    const renderPost = (content, type, videoThumbNail) => {
        switch(type) {
          case "image":
            return  <img
                        src={content}
                        alt="Post Image"
                        className={classes.imageContent}
                    />;
          default:
            return  <InView as="div" style={{ width: "100%" }} onChange={handlePauseVideo}>
                        <video
                            ref={postVideo}
                            width={"100%"}
                            height={"100%"}
                            light={true}
                            style={{ zIndex: 1 }}
                            poster={videoThumbNail}
                            style={{ height: 550, width: "100% !important" }}
                            controls
                            onPlay={() => onPlaying()}
                        >
                            <source src={content} type="video/mp4" />
                        </video>
                    </InView>;
        }
    }

    //var index = getIndex(post.postId, posts, 'postId');

    /*function clapToPost () 
    {
        setPosts((prevPosts) => {
            let items = [...prevPosts];
            let item = {...items[index]}
            let likePost = {
                postId: item.postId,
                userHandler:  item.userHandler,
                createdAt: item.createdAt,
                content: item.content,
                description: item.description,
                title: item.title,
                postType: item.postType,
                likeCount: item.likeCount+1,
                commentCount: item.commentCount,
                shareCount: item.shareCount,
                userId: item.userId,
                profileImageUrl: item.profileImageUrl,
                userName: item.userName,
                comments: item.comments,
                numberOfViews: item.numberOfViews,
                partners: item.partners
            }
            items[index] = likePost;
            return (items);
        })
    }*/

    return (
        <div className={classes.paper}>
            <Grid
                container
                direction="row"
                justify="flex-start"
                lignItems="flex-start"
            >
                <Grid item xs={7} style={{ borderRight: "0.1px groove darkgrey"}}>
                    {renderPost(post.content, post.postType, post.videoThumbNail)}
                </Grid>
                <Grid item xs={5}>
                    <AppBar position="static" className={classes.appBar}>
                        <Toolbar variant="dense">
                            <Grid
                                container
                                direction="row"
                                style={{ marginTop: 10, marginLeft: -30 }}
                                justify="flex-start"
                                lignItems="flex-start"
                            >
                                <Grid item xs={2} style={{paddingTop: 5}}>
                                    <SmallProfileImage
                                        imageUrl={post.profileImageUrl}
                                        height={30}
                                        width={30}
                                    />
                                </Grid>
                                <Grid item xs={9}>
                                    <Grid
                                        container
                                        direction="column"
                                        justify="flex-start"
                                        alignItems="flex-start"
                                        >
                                        <Typography variant="subtitle2" style={{ marginLeft: 14 }}>
                                            {post.userName}
                                        </Typography>
                                        <Typography className={classes.colorLight} variant="caption" style={{ marginLeft: 14 }} >
                                            {fromNow(post.createdAt)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={1}>
                                    <Tooltip title="Close" arrow>
                                        <IconButton edge="end" className={classes.closeButton} color="inherit" aria-label="menu" onClick={() => handleClose()}>
                                            <CloseIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>

                    <Typography className={classes.titleLabel}>
                        {/*post.title*/}Title title
                    </Typography>
                    <Typography className={classes.descriptionLabel}>
                        {/*post.description*/}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis iaculis mi. Suspendisse potenti.
                    </Typography>

                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="flex-start"
                        style={{ borderBottom: "0.1px groove darkgrey"}}
                    >
                        <Grid item >
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                style={{marginLeft: 10}}
                            >
                            <SvgIcon
                                component={Clap}
                                viewBox="0 0 600 476.6"
                                style={{ fontSize: 15 }}
                            />
                            <Typography className={classes.colorLight} variant="caption">
                                {post.likeCount}
                            </Typography>
                            </IconButton>
                        </Grid>

                        <Grid item >
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="share"
                                //onClick={() => showCommentPanel()}
                            >
                                <Typography className={classes.colorLight} variant="caption">
                                    Comments {post.commentCount}
                                </Typography>
                            </IconButton>
                        </Grid>

                        <Grid item>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="share"
                            >
                                <Typography className={classes.colorLight} variant="caption">
                                    Share
                                </Typography>
                                <Typography className={classes.colorLight} variant="caption">
                                    {post.shareCount}
                                </Typography>
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Grid 
                        container 
                        direction="row"
                        justify="space-between"
                        alignItems="flex-start"
                        style={{ borderBottom: "0.1px groove darkgrey"}}
                    >
                        <Grid item >
                            <IconButton
                                className={classes.colorLight}
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sizeSmall
                               // onClick={() => clapToPost()}
                            >
                                <SvgIcon
                                    component={Clap}
                                    viewBox="0 0 600 460"
                                    style={{ fontSize: 20 }}
                                />
                                <Typography
                                    className={classes.colorLight}
                                    variant="caption"
                                >
                                    Clap
                                </Typography>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                className={classes.colorLight}
                                edge="start"
                                color="inherit"
                                aria-label="share"
                                sizeSmall
                            >
                                <ShareIcon style={{ fontSize: 20 }} />
                                <Typography
                                    className={classes.colorLight}
                                    variant="caption"
                                >
                                    Share
                                </Typography>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                className={classes.colorLight}
                                edge="start"
                                color="inherit"
                                aria-label="save"
                                onClick={() =>
                                    updatePlayList(
                                    post.title,
                                    post.duration,
                                    post.postId,
                                    post.content,
                                    post.postType
                                    )
                                }
                            >
                                <PlaylistAddIcon />
                                <Typography className={classes.colorLight} variant="caption">
                                    Save
                                </Typography>
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Grid item style={{ width: "100%"}}>
                        <AccordionActions style={{height: 250}}>
                            <Comments
                                comments={post.comments}
                                height={30}
                                width={30}
                                commentHeight={commentHeight}
                                showComments={showComments}
                                marginTop={50}
                                from={"showPost"}
                            />
                        </AccordionActions>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles) (ShowPost);
