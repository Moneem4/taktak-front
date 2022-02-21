import React, {useEffect, useState} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import { NavLink } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

const styles = (theme) => ({
    textareaInput: {
        height: "40rem",
        fontWeight: "normal",
        fontSize: "1.8rem",
        textAlign: "left",
        color: "#3a3a3a",
        border: 0,
        opacity: 0.7,
    },
    subtitle: {
        fontSize: "3rem",
        textAlign: "left",
        color: "#000",
        marginBottom:"1%",
        border: "1px solid #e8e8e8",
        width: "30%"
    },
    icon: {
        color: "#fff",
        backgroundColor: "#ff6900",
        marginLeft: "95%",
        '&:hover': {
            background: '#f89956',
        },
        marginBottom: 20
    }
  });

function BlogContent(props) {
    const { classes } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [input, setInput] = useState("Choisir une catégorie pour votre article");
    const [uploadedImage, setUploadedImage] = useState(null);
    const [showImage, setShowImage] = useState(false);
    const [showImageP, setShowImageP] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [indexP, setIndexP] = useState();
    const [blogData, setBlogData] = useState({
        category: "",
        backgroungImage: "",
        title: "",
        paragraphsList: [{
            subtitle: "",
            content: "",
            images: [],
            videos: []
        }],
    });

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const updateInput = (item) => {
        setInput(item);
        setAnchorEl(null);
    };

    const handleAddPicture = () => {
        const fileInput = document.getElementById("picInput");
        fileInput.click();
    };

    const handlePicChange = (event) => {
        const img = event.target.files[0];
        if (img) {
          setUploadedImage(URL.createObjectURL(img));
          setShowImage(true);
          setBlogData({ ...blogData, backgroungImage: img });
        }
    };

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
            let paragraphs = [...items.paragraphsList];
            let item = paragraphs[index];
            
            const updatedBlog = {
                ...item,
                [field]: value,
            };
            paragraphs[index] = updatedBlog;
            items.paragraphsList = paragraphs;
            return items;
        });
    };

    function createParagraph() {
        setBlogData((prevBlogData) => {
            let  items = {...prevBlogData}
            let paragraphs = [...items.paragraphsList];
            let item = {
                subtitle: "",
                content: "",
                images: [],
                videos: []
            };
            
            items.paragraphsList = [...paragraphs, item];
            return items;
        });
    }

    const handleAddImage = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    };

    const handleImageChange = (event, indexx) => {
        const img = event.target.files[0];
        if (img) {
          setShowImageP(true);

          setBlogData((prevBlogData) => {
            let items = {...prevBlogData}

            const paragraphs = [...items.paragraphsList];

            const item = {...paragraphs[indexx]};

            item.images.push(img);

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
        let reader = new FileReader()
        let file = e.target.files[0]

        setShowVideo(true);

        reader.onloadend = () => {
        let newVideo = {
            file: file,
            videoPreviewUrl: reader.result,
        }
        
        setBlogData((prevBlogData) => {
            let  items = {...prevBlogData}
            let paragraphs = [...items.paragraphsList];
            let item = paragraphs[indexP];
            item.videos = [...items.paragraphsList[indexP].videos, newVideo];
            return items;
        });

        }

        reader.readAsDataURL(file)
    }

    function submit() {
        
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
                                    <div className="categorie" onClick={() => (updateInput("Recettes"), setBlogData({...blogData, category:"Recettes"}))}>
                                        <span>Recettes</span>
                                    </div>
                                    <div className="categorie" onClick={() => (updateInput("Voyage culinaire"), setBlogData({...blogData, category:"Voyage culinaire"}))}>
                                        <span>Voyage culinaire</span>
                                    </div>
                                    <div className="categorie" onClick={() => (updateInput("Régime"), setBlogData({...blogData, category:"Régime"}))}>
                                        <span>Régime</span>
                                    </div>
                                    <div className="categorie" onClick={() => (updateInput("Desserts & Sucrés"), setBlogData({...blogData, category:"Desserts & Sucrés"}))}>
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
                    id="picInput"
                    onChange={handlePicChange}
                    hidden="hidden"
                    accept="image/*"
                />
                <div className="post-draft">
                    <input
                        placeholder="Titre de votre article"
                        name="title"
                        className="draft-title"
                        value={blogData.title}
                        onChange={handleChange}
                    />
                    {blogData.paragraphsList.map((el, index) => (
                        <div key={index}>
                            <div className="textarea" >
                                <input
                                    placeholder="Titre de votre paragraphe"
                                    name="subtitle"
                                    className={classes.subtitle}
                                    value={el.subtitle}
                                    onChange={(e) => handleParagraphChange(e,index)}
                                />
                                <textarea 
                                    style={{color: "#000", fontSize: "2.8rem", border: "1px solid #e8e8e8", height: 100}} 
                                    placeholder={"Corps de votre article "} 
                                    name="content"
                                    value={el.content}
                                    onChange={(e) => handleParagraphChange(e,index)} />
                                <div className="icons">
                                    <i className="icon-draft-word" /> <span className="description-icon">Texte</span>
                                    <i className="icon-draft-video" /> <span className="description-icon" onClick={() => (handleVideo(), setIndexP(index))}>Vidèo</span>  
                                    <i className="icon-draft-image"> </i> <span className="description-icon" onClick={(e) => (handleAddImage(), setIndexP(index))}>Image</span> 
                                </div>
                            </div>
                            <div
                                className="image-form"
                                style={{ display: showImageP ? "block" : "none" }}
                            >
                                {blogData.paragraphsList[index].images && 
                                blogData.paragraphsList[index].images.map((el, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(el)}
                                        alt=""
                                        style={{ width: 100, height: 80, margin: 5 }}
                                    />
                                ))}
                            </div>
                            <div
                                className="image-form"
                                style={{ display: showVideo ? "block" : "none" }}
                            >
                                {blogData.paragraphsList[index].videos
                                    ? blogData.paragraphsList[index].videos.map((video, index) => (
                                        <video width="200" controls style={{ margin: 5 }} key={index}>
                                            <source src={video.videoPreviewUrl} />
                                        </video>
                                    ))
                                    : null}
                            </div>
                            <div className="divider" style={{marginBottom: 40, marginTop:40}} />
                            <input
                                type="file"
                                id="imageInput"
                                onChange={(e) => handleImageChange(e, indexP)}
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
                    ))}
                    
                    <IconButton
                        background='white'
                        aria-label='open drawer'
                        onClick={createParagraph}
                        edge='start'
                        className={classes.icon}>
                        <AddIcon />
                    </IconButton>
                    
                    <div className="buttons">
                        <button>Brouillon</button>
                        <button onClick={()=>submit()}>Publier</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(BlogContent);