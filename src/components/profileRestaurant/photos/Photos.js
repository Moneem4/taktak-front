import React, {useState, useContext, useEffect} from 'react';
import { RestaurantContext } from '../../../context/RestaurantContext';
import MyPhotos from './MyPhotos';
import PostPhoto from './PostPhoto';

function Photos(props) {
    const {restaurantId} = props;
    const {getAllPicturesByUserId, getPicturesByUserId, getTaggedPicturesByUserId, setPostPhoto, handleOpen} = useContext(RestaurantContext)
    const [panel, setPanel] = useState(1)

    const [allPictures, setAllPictures] = useState();
    useEffect(() => {
        getAllPicturesByUserId(restaurantId,setAllPictures);
    }, [props])

    let arrayPhotos=[];
    allPictures && allPictures.map((el) => {
        el.media.map((item)=>{
        const img = {
            _id: el._id,
            image: item,
            likes: el.likes,
            comments: el.comments
        }
        arrayPhotos.push(img);
        })
    });

    if(panel === 1){
        getAllPicturesByUserId(restaurantId,setAllPictures);
    }else if(panel === 2){
        getPicturesByUserId(restaurantId,setAllPictures);
    }else{
        getTaggedPicturesByUserId(restaurantId,setAllPictures);
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    };

    const handleImageChange = (event) => {
        const img = event.target.files[0];
        if (img) {
          handleOpen()
          setPostPhoto((prevPostPhoto) => {
            let items = {...prevPostPhoto}
            let mediaList = [...items.media];
            items.media = [...mediaList, img];

            return items;
          });
        }
    };
    
    return (
        <div className="tabs-panel is-active" id="panel1">
            <PostPhoto allPictures={allPictures} setAllPictures={setAllPictures} />
            <div className="my-photos">
                <div className="my-photos-top">
                    <span style={{ cursor: "pointer" }} className={(panel===1)?"photos-top-ele active":"photos-top-ele"} onClick={()=>setPanel(1)}>
                        <i className="icon-media"/>
                        Afficher tout
                    </span>
                    <span style={{ cursor: "pointer" }} className={(panel===2)?"photos-top-ele active":"photos-top-ele"} onClick={()=>setPanel(2)}>
                        <i className="icon-camera"/>
                        Vos photos
                    </span>
                    <span style={{ cursor: "pointer" }} className={(panel===3)?"photos-top-ele active":"photos-top-ele"} onClick={()=>setPanel(3)}>
                        <i className="icon-user-profile"/>
                        Photos de vous
                    </span>
                </div>
                {allPictures ? (
                    <div className="my-photos-bottom">
                        <div className="my-photos-bottom-header">
                            <span className="photos">Photos <strong>{arrayPhotos.length}</strong> </span>
                            <span onClick={handleClick}>
                                Les plus récents
                                <i className="fal fa-sort-down" />
                            </span>
                        </div>
                        <div
                            className="filter-pane"
                            data-dropdown
                            data-auto-focus="true"
                            style={{ display: anchorEl ? "block" : "none" }}
                        >
                            <ul className="filtre-my-besties-items">
                            <li>
                                <div className="filter-header" onClick={handleClose}>
                                Filtrez l’affichage des restaurants
                                <i className="fal fa-sort-up" aria-hidden="true" />
                                </div>
                            </li>
                            <li>
                                <div className="filter-content">
                                <span className="content-title">Nouveaux</span>
                                <span className="content-title">Les plus évalués</span>
                                <span className="content-title">Les plus appreciés</span>
                                <span className="content-title">Les plus visités</span>
                                <span className="content-title">Les plus visités</span>
                                </div>
                            </li>
                            </ul>
                        </div>
                        <div className="my-photos-photos">
                            <div className="add-photos-border" onClick={() => handleAddPicture()}>
                                <div className="add-photos">
                                    <i className="fas fa-plus" />
                                </div>
                            </div>
                            <input
                                type="file"
                                id="imageInput"
                                onChange={handleImageChange}
                                hidden="hidden"
                                accept="image/*"
                            />
                            {arrayPhotos.map((photo) => (
                                <MyPhotos photo={photo} photos={allPictures} setAllPictures={setAllPictures} key={photo.id} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}

export default Photos