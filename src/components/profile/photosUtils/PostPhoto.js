import React, {useState, useContext} from 'react';
import { UserContext } from "../../../context/UserContext";
import { RestaurantContext } from "../../../context/RestaurantContext";
import { Button, Card, Collapse } from "@material-ui/core";

function PostPhoto(props) {
    const {classes, allPictures, setAllPictures} = props;
    const { activeUser, updateTaktakPoints } = useContext(UserContext);
    const { createPostPhoto, open, anchorEl, handleOpen, postPhoto, setPostPhoto } = useContext(RestaurantContext);

    const handleChange = (event) => {
        const value = event.target.value;
        const field = event.target.name;
        setPostPhoto({ ...postPhoto, [field]: value });
    };

    const handleAddPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    };

    const handleImageChange = (event) => {
        const img = event.target.files[0];
        if (img) {
          setPostPhoto((prevPostPhoto) => {
            let items = {...prevPostPhoto}
            let mediaList = [...items.media];
            items.media = [...mediaList, img];

            return items;
          });
        }
    };

    function submit() {
        createPostPhoto(postPhoto, allPictures, setAllPictures).then(response => {
            updateTaktakPoints( activeUser.userId, activeUser.countPoints+1);
            setPostPhoto({
                title: "Image",
                content: "",
                postType: "MEDIA",
                postMediaType: "IMAGE",
                media: [],
            });
        });
    }

    return (
        <div button className="tab-one collapsed">
            <div className="tab-one-header">
                <span style={{ display: anchorEl ? "none" : "block" }}>
                    Postez photos ou Déposer directement ici !</span>
                <input
                    type="text"
                    placeholder="Dites quelques choses !"
                    className="input-post"
                    style={{ display: anchorEl ? "block" : "none" }}
                    name="content"
                    value={postPhoto.content}
                    onChange={handleChange}
                />
                <i className="icon-camera" onClick={handleOpen} />
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Card style={{ padding: 10 }} className="tab-one-body">
                    <div id="dropzone" onClick={() => handleAddPicture()}>
                        <span className="here">Uploader vos photos</span>
                    </div>
                    <input
                        type="file"
                        id="imageInput"
                        onChange={handleImageChange}
                        hidden="hidden"
                        accept="image/*"
                    />
                    <div>
                        {postPhoto.media.map((image, index) =>
                            <img src={URL.createObjectURL(image)} alt="img" style={{height: 70, width: 70, marginLeft: "5%"}}/>
                        )}
                    </div>
                    <div className="tab-one-bottom" style={{marginTop: 10}}>
                        <Button className="upload-now" onClick={submit}>Postez</Button>
                    </div>
                </Card>
            </Collapse>
        </div>
    )
}

PostPhoto.propTypes = {

}

export default PostPhoto
