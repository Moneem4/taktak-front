import React, {useState, useContext} from 'react';
import { UserContext } from "../../context/UserContext";
import { PostContext } from "../../context/PostContext";
import withStyles from "@material-ui/core/styles/withStyles";
import { NavLink } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { CircularProgress } from '@material-ui/core';

const styles = (theme) => ({
    textareaInput: {
        fontWeight: "normal",
        fontSize: "1.8rem",
        textAlign: "left",
        color: "#3a3a3a",
        marginLeft: 10,
        opacity: 0.7,
    },
    icon: {
        color: "#fff",
        backgroundColor: "#ff6900",
        marginLeft: "95%",
        '&:hover': {
            background: '#f89956',
        },
        marginBottom: 20
    },
  });

function RedigerVotreArticle(props) {
    const { classes } = props;
    const { activeUser, updateTaktakPoints } = useContext(UserContext);
    const { createArticleBlog } = useContext(PostContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [input, setInput] = useState("Choisir une catégorie pour votre article");
    const [uploadedImage, setUploadedImage] = useState(null);
    const [showImage, setShowImage] = useState(false);
    const [loadingPublish, setLoadingPublish] = useState(false);
    const [loadingDraft, setLoadingDraft] = useState(false);
    const [blocText, setBlocText] = useState();
    const [blogData, setBlogData] = useState({
        category: "",
        backgroundImage: "",
        title: "",
        content: []
    });

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const updateInput = (item) => {
        setInput(item);
        setAnchorEl(null);
    };

    const handleAddPicture = () => {
        const fileInput = document.getElementById("icon-button-file");
        fileInput.click();
    };

    const handlePicChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0]
          setUploadedImage(URL.createObjectURL(img));
          setShowImage(true);
          setBlogData({ ...blogData, backgroundImage: img });
        }
    };

    const handleAddImage = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    };

    const handleImageChange = (event, indexx) => {
        const img = event.target.files[0];
        if (img) {

          if(blocText){
            setBlogData((prevBlogData) => {
                let  items = {...prevBlogData}
                let contentList = [...items.content];
                let item = {
                    type: "TEXT",
                    description: blocText,
                };
                
                items.content = [...contentList, item];
                return items;
            });
            setBlocText("");
          }

          setBlogData((prevBlogData) => {
            let items = {...prevBlogData}
            let contentList = [...items.content];
            let item = {
                type: "IMAGE",
                url: img,
            };
            items.content = [...contentList, item];

            return items;
          });
        }
    };

    const handleVideo = () => {
        const fileInput = document.getElementById("videoInput");
        fileInput.click();
    };

    const handleVideoChange = (e) => {
        e.preventDefault()
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            let newVideo = {
                type: "VIDEO",
                file: file,
                videoPreviewUrl: reader.result,
            }
            
            if(blocText){
                setBlogData((prevBlogData) => {
                    let  items = {...prevBlogData}
                    let contentList = [...items.content];
                    let item = {
                        type: "TEXT",
                        description: blocText,
                    };
                    
                    items.content = [...contentList, item];
                    return items;
                });
                setBlocText("");
            }

            setBlogData((prevBlogData) => {
                let  items = {...prevBlogData}
                let contentList = [...items.content];
                items.content = [...contentList, newVideo];
                
                return items;
            });
        }

        reader.readAsDataURL(file)
    }

    const handleChange = (event) => {
        const value = event.target.value;
        const field = event.target.name;
        setBlogData({ ...blogData, [field]: value });
    };

    const handleParagraphChange = (event, index) => {
        const value = event.target.value;
        const field = event.target.name;
        
        setBlogData((prevBlogData) => {
            let  items = {...prevBlogData}
            let contentList = [...items.content];
            let item = contentList[index];
            
            const updatedBlog = {
                ...item,
                [field]: value,
            };
            contentList[index] = updatedBlog;
            items.content = contentList;
            return items;
        });
    };

    const handleBlocChange = (event) => {
        const value = event.target.value;
        const field = event.target.name;
        
        setBlocText(value);
    };

    function submit(status) {
        if(blocText){
            setBlogData((prevBlogData) => {
                let  items = {...prevBlogData}
                let contentList = [...items.content];
                let item = {
                    type: "TEXT",
                    description: blocText,
                };
                    
                items.content = [...contentList, item];
                return items;
            });
            setBlocText("");
        }

        if(status === "PUBLISHED")
        {
            if (!loadingPublish) {
                setLoadingPublish(true);
                if(activeUser.isRestaurant){
                    createArticleBlog(blogData, status, activeUser.connectedRestaurentId, activeUser.isRestaurant).then(response => {
                        updateTaktakPoints( activeUser.userId, activeUser.countPoints+20);
                        setBlogData({
                            category: "Choisir une catégorie pour votre article",
                            backgroundImage: "",
                            title: "",
                            content: []
                        });
                        setShowImage(false);
                        setLoadingPublish(false);
                    });
                }else{
                    createArticleBlog(blogData, status, activeUser.userId, activeUser.isRestaurant).then(response => {
                        updateTaktakPoints( activeUser.userId, activeUser.countPoints+20);
                        setBlogData({
                            category: "Choisir une catégorie pour votre article",
                            backgroundImage: "",
                            title: "",
                            content: []
                        });
                        setShowImage(false);
                        setLoadingPublish(false);
                    });
                } 
            }   
        }else{
            if (!loadingDraft) {
                setLoadingDraft(true);
                if(activeUser.isRestaurant){
                    createArticleBlog(blogData, status, activeUser.connectedRestaurentId, activeUser.isRestaurant).then(response => {
                        setBlogData({
                            category: "Choisir une catégorie pour votre article",
                            backgroundImage: "",
                            title: "",
                            content: []
                        });
                        setShowImage(false);
                        setLoadingDraft(false);
                    });
                }else{
                    createArticleBlog(blogData, status, activeUser.userId, activeUser.isRestaurant).then(response => {
                        setBlogData({
                            category: "Choisir une catégorie pour votre article",
                            backgroundImage: "",
                            title: "",
                            content: []
                        });
                        setShowImage(false);
                        setLoadingDraft(false);
                    });
                }
            }
        }
    }

    const renderBloc = (param, index) => {
        switch (param.type) {
            case 'TEXT':
                return (
                    <TextareaAutosize 
                        rows={1}
                        name="description"
                        value={param.description}
                        onChange={(e) => handleParagraphChange(e,index)} 
                        className={classes.textareaInput}
                    />
                )
            case 'IMAGE':
                return (
                    <img src={URL.createObjectURL(param.url)} alt="img" style={{height: 250, width: 350, marginLeft: "35%"}}/>   
                )
            case 'VIDEO':
                return (
                    <video controls style={{ height: 250, width: 350, marginLeft:"35%" }}>
                        <source src={param.videoPreviewUrl} />
                    </video>   
                )
            default:
                return (
                    <div></div>
                )
        }
    }

    return (
        <div style={{marginBottom: 70}}>
            <div className="write-your-article">
                Rédiger votre article
            </div>
            <div style={{margin: 20}}>
                <div className="write-post-header">
                    <NavLink exact to={`/blog`}>
                        <button>
                            <i className="icon-arrow-left back-to-page-two" />
                        </button>
                    </NavLink>
                    <div className="categories-dropdown">
                        <div className="choose-categorie" onClick={handleClick}>
                            <span>{input}</span>
                            <i className="fal fa-sort-down sort-down" />
                        </div>
                        <div className="dropdown-categorie" id="country-dropdown" 
                            style={{ display: anchorEl ? "block" : "none", marginTop: "19%" }}>
                            <form>
                                <div className="dropdown-top" onClick={() => updateInput("Choisir une catégorie pour votre article")}>
                                    <span>Choisir une catégorie</span> 
                                    <i className="fal fa-sort-up sort-up" />
                                </div>
                                <div className="categories">
                                    <div className="categorie" onClick={() => (updateInput("Recettes"), setBlogData({...blogData, category:"RECETTES"}))}>
                                        <span>Recettes</span>
                                    </div>
                                    <div className="categorie" onClick={() => (updateInput("Voyage culinaire"), setBlogData({...blogData, category:"VAYAGE_CULINAIRE"}))}>
                                        <span>Voyage culinaire</span>
                                    </div>
                                    <div className="categorie" onClick={() => (updateInput("Régime"), setBlogData({...blogData, category:"REGIME"}))}>
                                        <span>Régime</span>
                                    </div>
                                    <div className="categorie" onClick={() => (updateInput("Desserts & Sucrés"), setBlogData({...blogData, category:"DESSERTS_SUCRES"}))}>
                                        <span>Desserts &amp; Sucrés</span>
                                    </div>
                                    <div className="categorie" onClick={() => (updateInput("Les plus évalués"), setBlogData({...blogData, category:"Les plus évalués"}))}>
                                        <span>Les plus évalués</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div style={{ display: showImage ? "none" : "block" }}>
                    <div className="add-cover" onClick={() => handleAddPicture()} >
                        <div>
                            <span className="add">Ajouter une couverture</span> 
                        </div>
                        <div className="add-cover-invisible">
                            <span>Utilisez les formats .jpg .png</span>
                            <span>La taille du fichier ne  doit pas passer plus 1 Mo.</span>
                            <span>Meilleure résolution 1087⨯200</span>
                        </div>
                    </div>
                </div>
                <div
                    className="add-cover"
                    style={{ display: showImage ? "block" : "none" }}
                    onClick={() => handleAddPicture()}
                >
                    <img
                    src={uploadedImage}
                    alt=""
                    style={{ width: "100%", height: "100%" }}
                    />
                </div>
                <input
                    type="file"
                    //id="picInput"
                    id="icon-button-file"
                    onChange={handlePicChange}
                    hidden="hidden"
                    accept="image/*"
                    style={{ display: 'none' }}
                />
                <div className="post-draft">
                    <input
                        placeholder="Titre de votre article"
                        name="title"
                        className="draft-title"
                        value={blogData.title}
                        onChange={handleChange}
                    />
                    <div className="textarea" style={{border: "1px solid #e8e8e8", height: "100%"}}>
                        {blogData.content.map((section, index) =>
                            <div key={index}>
                                {renderBloc(section, index)}
                            </div>
                        )}
                        
                        <TextareaAutosize  
                            rows={1} 
                            name="description"
                            value={blocText}
                            onChange={(e) => handleBlocChange(e)} 
                        />
                        <div className="icons">
                            <i className="icon-draft-word" /> <span className="description-icon">Texte</span>
                            <i className="icon-draft-video" /> <span className="description-icon" onClick={() => handleVideo()}>Vidèo</span>  
                            <i className="icon-draft-image"> </i> <span className="description-icon" onClick={(e) => handleAddImage()}>Image</span> 
                        </div>
                        <input
                            type="file"
                            id="imageInput"
                            onChange={(e) => handleImageChange(e)}
                            hidden="hidden"
                            accept="image/*"
                        />
                        <input
                            type="file"
                            id="videoInput"
                            onChange={handleVideoChange}
                            hidden="hidden"
                            accept="video/mp4"
                        />
                    </div>
                    <div className="divider" style={{marginBottom: 40, marginTop:40}} />                            
                    
                    <div className="buttons">
                        <button onClick={()=>submit("DRAFT")}>Brouillon
                            {loadingDraft && (
                                <CircularProgress
                                    size={24}
                                />
                            )}
                        </button>
                        <button onClick={()=>submit("PUBLISHED")} disabled={loadingPublish}>Publier
                            {loadingPublish && (
                                <CircularProgress
                                    size={24}
                                />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(RedigerVotreArticle);