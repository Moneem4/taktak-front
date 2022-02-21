import React, { useState, useContext, useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { CircularProgress, withStyles } from "@material-ui/core";
import avatar from "./avatar.png";
import { UPDATE_AVATAR } from "../../graphql/user/user";
import Modal from "../util/UtilModal";
import { useMutation } from "@apollo/client";
import { UserContext } from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import Grid from "@material-ui/core/Grid";
import ProfileStories from "./ProfileStories";

function ProfileHeader(props) {
  const { loaduser, updateAvatar } = useContext(UserContext);

  const { isntme, selectedUser } = props;
  const [showModal, setShowModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  /*const [updateAvatar, { data, loading, error }] = useMutation(UPDATE_AVATAR, {
    onCompleted: async (data) => {
      loaduser();
    },
    onError: (err) => console.log("updateAvatr", err),
  });*/

  const openModal = () => {
    setShowModal(true);
  };

  const handleImageChange = (event) => {
    const img = event.target.files[0];
    if (img) {
      /*updateAvatar({
        variables: {
          id: selectedUser.userId,
          file: img,
        },
      });*/
      setLoading(true)
      updateAvatar(selectedUser.userId, img)

      //setUploadedImage(URL.createObjectURL(img));
      
    }
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "rgba(72,72,72)",
      boxShadow: theme.shadows[1],
      fontWeight: 500,
      fontSize: "1.6rem",
      color: "#fff",
    },
  }))(Tooltip);

  return (
    <div>
      {selectedUser && (
        <div className="profile-page-header">
          <div className="header-inner container">
            <div
              className="profile-picture"
              button
              onClick={() => handleEditPicture()}
            >
              {loading ? (
                <div className="avatarLoading">
                  <CircularProgress color="#ff6900" className="avatarLoading" />
                </div>
              ) : selectedUser.avatar ? (
                <div>
                  <img
                    className="profile-picture-img"
                    src={`https://${selectedUser.avatar}`}
                  />
                  {!isntme ? (
                    <LightTooltip
                      title="changer voter image de profil"
                      placement="center"
                    >
                      <img
                        className="profile-picture-img-hover"
                        src={`https://${selectedUser.avatar}`}
                      />
                    </LightTooltip>
                  ) : (
                    <img
                      className="profile-picture-img-hover"
                      src={`https://${selectedUser.avatar}`}
                    />
                  )}
                </div>
              ) : (
                <div>
                  <img className="profile-picture-img" src={avatar} />
                  <LightTooltip
                    title="changer votre image de profil"
                    placement="right"
                  >
                    <img className="profile-picture-img-hover" src={avatar} />
                  </LightTooltip>
                </div>
              )}
              {!isntme && (
                <input
                  type="file"
                  id="imageInput"
                  onChange={handleImageChange}
                  hidden="hidden"
                  accept="image/*"
                />
              )}
            </div>
            <div className="user-info">
              <div className="user-info-info">
                {selectedUser && (
                  <Grid container direction="row">
                    <Grid item xs={11}>
                      <span className="name">
                        {selectedUser.firstName} {selectedUser.lastName}{" "}
                        <NavLink exact to={"/updateProfile"}>
                          <i className="name icon-pen user-change" />
                        </NavLink>
                      </span>
                    </Grid>
                    
                  </Grid>
                )}

                <span className="location">
                  <i className="fal fa-map-marker-alt" /> &emsp;
                  {selectedUser.location} - {selectedUser.city}
                </span>
                {selectedUser.tags ? (
                  <div className="tags">
                    {selectedUser.tags.map((el) => `#${el} `)}
                  </div>
                ) : (
                  <div className="tags">Ajouter des tags</div>
                )}
              </div>
              <ProfileStories
                profileImage={selectedUser.avatar}
                //stories={selectedUser.stories}
                isntme={props.isntme}
              />
            </div>
          </div>
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            page="profileHeader"
            activeUser={selectedUser}
          />
        </div>
      )}
    </div>
  );
}

export default ProfileHeader;
