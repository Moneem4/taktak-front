import React, {useContext, useState, useEffect} from 'react';
import { UserContext } from "../../context/UserContext";
import { PostContext } from '../../context/PostContext';
import { RestaurantContext } from '../../context/RestaurantContext';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import TextFormatIcon from '@material-ui/icons/TextFormat';

const styles = (theme) => ({
    paper: {
      backgroundColor: "#ffffff",
      boxShadow: theme.shadows[5],
      width: "100%",
      height: 550,
      borderColor: 'darkgrey',
      borderWidth: 0.5,
      justifyContent: "center"
    },
    appBar: {
        backgroundColor: "#ffffff",
        borderBottom: '0.1px #CAD0D4',
        height: 50,
    },
    closeButton: {
        marginLeft: 10,
        backgroundColor: "grey",
    },
    titleLabel: {
        fontSize: 13,
        color: 'black',
        margin: 10,
        fontWeight: 'bold',
    },
    addStoryBorder:{
        border: "1px solid #e8e8e8",
        borderRadius: "5px",
        padding: "0.7rem",
        height: 330,
        width: 210,
        marginLeft: "40%",
        marginTop: "25%",
    },
    addStory: {
        cursor: "pointer",
        background: "#ff6900",
        '&:hover': {
            backgroundColor: "#ffa500",
        },
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    addStoryVideoBorder:{
        border: "1px solid #e8e8e8",
        borderRadius: "5px",
        padding: "0.7rem",
        height: 330,
        width: 210,
        marginLeft: "20%",
        marginTop: "25%",
    },
    title: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    addPhotoBorder:{
        border: "1px solid #e8e8e8",
        borderRadius: "5px",
        padding: "0.7rem",
        height: "83%",
        width: "97%",
        background: "#2A2A2A",
        alignItems: "center",
        justifyContent: "center",
        margin: 10
    },
    addPhoto: {
        background: "#fff",
        borderRadius: "5px",
        alignItems: "center",
        justifyContent: "center",
        height: "90%",
        width: "35%",
        marginLeft: "33%",
        marginTop: "3%",
        position: "relative"
    },
    text: {
        '&:hover': {
            backgroundColor: "#E3DEDE"
        }
    },
    textOnImage: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        height: 30,
        fontSize: 16,
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        //backgroundColor: 'rgba(227, 222, 222, 0.8)',
    },
    cancelBtn: {
        fontWeight: "bold",
        fontSize: "1.8rem",
        textAlign: "center",
        color: "black",
        backgroundColor: "#E3DEDE",
        //opacity: "0.5",
        marginRight: "10rem",
        cursor: "pointer",
        width: "80%",
        height: 40,
        marginLeft: "10%",
        borderRadius: "5%"
    },
    submitBtn: {
        fontWeight: "bold",
        fontSize: "1.8rem",
        textAlign: "center",
        color: "black",
        backgroundColor: "#ff6900",
        marginRight: "10rem",
        cursor: "pointer",
        width: "80%",
        height: 40,
        marginLeft: "10%",
        borderRadius: "5%"
    }
})

function CreateStory(props) {
    const { classes } = props;
    const { activeUser, updateTaktakPoints } = useContext(UserContext);
    const { createStory, getStoryByUserId, updateStory } = useContext(PostContext);
    const { selectedProfile } = useContext(RestaurantContext);
    const [anchorEl, setAnchorEl] = useState(false);
    const [storyExist, setStoryExist] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [text, setText] = useState(false);
    const [inputData, setInputData] = useState({
        url: "",
        type: "",
        dateCreate: new Date(),
        text: ""
    });

    const handleAddPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    };

    const handleImageChange = (event) => {
        const img = event.target.files[0];
        if (img) {
            setAnchorEl(true)
            setUploadedImage(URL.createObjectURL(img));
            setInputData({ ...inputData, url: img, type: "IMAGE" });
        }
    };

    function addText() {
		setText(!text);
	};

    function cancel() {
        setAnchorEl(false)
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setInputData({ ...inputData, text: value });
    };

    const handleVideo = () => {
        const fileInput = document.getElementById("videoInput");
        fileInput.click();
    };

    const [uploadedVideo, setUploadedVideo] = useState(null)
    const handleVideoChange = (e) => {
        e.preventDefault()
        let reader = new FileReader()
        let file = e.target.files[0]
    
        reader.onloadend = () => {
            setAnchorEl(true) 
            setUploadedVideo({
              file: file,
              videoPreviewUrl: reader.result,
            })
            setInputData({ ...inputData, url: file, type: "VIDEO" });
            //setState({ ...state, content: URL.createObjectURL(file) })
          }
    
          reader.readAsDataURL(file)
      }

    function submit() {
        /*if(activeUser.isRestaurant){
            if(storyExist){
                updateStory(storyExist._id, inputData).then(response => {
                    updateTaktakPoints( activeUser.userId, activeUser.countPoints+3);
                });
            }else{
                createStory(activeUser.connectedRestaurentId, activeUser.isRestaurant, inputData).then(response => {
                    updateTaktakPoints( activeUser.userId, activeUser.countPoints+3);
                });
            }
        }else{
            if(storyExist){
                updateStory(storyExist._id, inputData).then(response => {
                    updateTaktakPoints( activeUser.userId, activeUser.countPoints+3);
                });
            }else{
                createStory(activeUser.userId, activeUser.isRestaurant, inputData).then(response => {
                    updateTaktakPoints( activeUser.userId, activeUser.countPoints+3);
                });
            }
        }*/
        setAnchorEl(false)
    }

    useEffect(() => {
        if(activeUser.isRestaurant){
            getStoryByUserId(activeUser.connectedRestaurentId, setStoryExist);
        }else{
            getStoryByUserId(activeUser.userId, setStoryExist);
        }
    }, [props]);

    return (
        <div className={classes.paper}>
            <Grid
                container
                direction="row"
                style={{height: "100%"}}
            >
                <Grid item xs={3} style={{ borderRight: '0.1px groove #CAD0D4' }}>
                    <Typography className={classes.titleLabel}>
                        Votre Story
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        style={{ marginTop: 10 }}
                        justify="flex-start"
                        lignItems="flex-start"
                    >
                        <Grid item xs={2} style={{ marginLeft: "5%" }}>
                            {activeUser.isRestaurant ?
                                <img src={selectedProfile && `https://${selectedProfile.profile.avatar}`} alt="avatar" style={{width: 40, height: 40, borderRadius: "20%"}} />
                            :
                                <img src={selectedProfile && `https://${selectedProfile.profile.avatar}`} alt="avatar" style={{width: 40, height: 40, borderRadius: "50%"}} />
                            }
                        </Grid>
                        <Grid item xs={9} style={{marginLeft: -10}}>
                            <Typography variant="subtitle2" className={classes.titleLabel}>
                            {activeUser.isRestaurant ?
                                selectedProfile && selectedProfile.profile.name   
                            :
                                selectedProfile && selectedProfile.profile.firstName+" "+selectedProfile.profile.lastName
                            }
                            </Typography>
                        </Grid>
                    </Grid>
                    <div className="divider" style={{marginTop: 20}} />
                    <div style={{ display: anchorEl ? "block" : "none"}}> 
                        <div className={classes.text} style={{ cursor: "pointer"}}>
                            <Grid container direction="row">
                                <Grid item xs={1}> <TextFormatIcon style={{fontSize: 25, margin: 10,}}/> </Grid>
                                <Grid item xs={10} 
                                //onClick={addText}
                                > 
                                    <Typography className={classes.titleLabel}>
                                        Ajouter du texte
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="divider" style={{marginTop: 270}} />
                        <Grid container direction="row">
                            <Grid item xs={6}>
                                <button className={classes.cancelBtn} onClick={cancel}>Abandonner</button>
                            </Grid>
                            <Grid item xs={6}>
                                <button className={classes.submitBtn} onClick={submit}>Partager dans la story</button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={9} style={{ display: anchorEl ? "none" : "block", backgroundColor:"#CAD0D4" }}>
                    <Grid container direction="row">
                        <Grid item xs={6}>
                            <div className={classes.addStoryBorder} onClick={() => handleAddPicture()}>
                                <div className={classes.addStory}>
                                    <Grid container direction="column">
                                        <Grid item>
                                            <PhotoLibraryIcon style={{color:"white", fontSize: 18, marginLeft: "45%"}}/>
                                        </Grid>
                                        <Grid item>
                                            <Typography className={classes.title} style={{marginLeft: "15%"}}>
                                                Créer une Image
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                            <input
                                type="file"
                                id="imageInput"
                                onChange={handleImageChange}
                                hidden="hidden"
                                accept="image/*"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.addStoryVideoBorder} onClick={() => handleVideo()}>
                                <div className={classes.addStory}>
                                    <Grid container direction="column">
                                        <Grid item>
                                            <PhotoLibraryIcon style={{color:"white", fontSize: 18, marginLeft: "45%"}}/>
                                        </Grid>
                                        <Grid item>
                                            <Typography className={classes.title} style={{marginLeft: "15%"}}>
                                                Créer un vidéo
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                            <input
                                type="file"
                                id="videoInput"
                                onChange={handleVideoChange}
                                hidden="hidden"
                                accept="video/*"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={9} style={{ display: anchorEl ? "block" : "none", backgroundColor:"#CAD0D4" }}>
                    <AppBar position="static" className={classes.appBar}>
                        <Toolbar variant="dense">
                            <Typography className={classes.titleLabel}>
                                Aperçu
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.addPhotoBorder}>
                        <div className={classes.addPhoto}>
                            {inputData.type === "IMAGE" ? (
                                <img
                                    src={uploadedImage}
                                    alt=""
                                    style={{ width: "100%", height: "100%",
                                    // marginTop: "45%" 
                                    }}
                                />
                            ):(
                                <video style={{ width: "100%", height: "40%", marginTop: "45%" }} controls>
                                    <source src={uploadedVideo && uploadedVideo.videoPreviewUrl}/>
                                </video>
                            )}
                            <input
                                type="text"
                                placeholder="Ajouter du texte"
                                name="content"
                                className={classes.textOnImage}
                                style={{ display: text ? "block" : "none"}}
                                value={inputData.text}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>   
        </div>
    )
}

export default withStyles(styles)(CreateStory);