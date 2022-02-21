import React, {useContext} from 'react';
import { UiContext } from "../../../context/UiContext";
import { PostContext } from "../../../context/PostContext";

function MyPhotos(props) {
    const {photo, setAllPictures} = props;
    const { handleOpenPostModal } = useContext(UiContext);
    const { deletePost } = useContext(PostContext);
    
    const images = props.photos;
    const content = [];
    images && images.map((el) => {
        el.media.map((item)=>{
        content.push(item.url);
        })
    });

    function removePicture() {
        deletePost(photo._id, setAllPictures);
    }
    
    return (
        <div className="photo" 
            //onClick={(e) => {handleOpenPostModal(e, content, props.photo.image)}}
        >
            <img button src={`https://${props.photo.image.url}`} />
            <div className="hover">
                <i className="fal fa-trash-alt remove" onClick={removePicture}/>
                <div className="hover-bottom">
                    <div className="left">
                        <i className="fal fa-heart heart" />
                        {props.photo.likes ? props.photo.likes.length : 0}
                    </div>
                    <div className="right">
                        <i className="fal fa-comment-dots comment" />
                        {props.photo.comments ? props.photo.comments.length : 0}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPhotos
