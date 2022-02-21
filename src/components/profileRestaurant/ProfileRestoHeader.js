import React, { useState, useContext } from "react";
import Rating from "@material-ui/lab/Rating";
import avatar from "../profile/avatar.png";
import Modal from "../util/UtilModal";
import { UPDATE_AVATAR, UPDATE_RESTAURANT } from "../../graphql/user/user";
import { useMutation } from "@apollo/client";
import { RestaurantContext } from "../../context/RestaurantContext";
import QRCode from "react-weblineindia-qrcode-generator";

function ProfileRestoHeader(props) {
  const { restaurant, isMyResto, setRestaurant, isProfile } = props;

  const [showModal, setShowModal] = useState(false);
  const [showModalCreateRating, setShowModalCreateRating] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const openModalRating = () => {
    setShowModalCreateRating(true);
  };

  const { updateRestaurant } = useContext(RestaurantContext);
  // const [updateRestaurant, { data, loading, error }] = useMutation(UPDATE_RESTAURANT, {
  //   onCompleted: async (data) => {
  //    console.log("avatar updated",data)
  //   },
  //   onError: (err) => console.log("update restaurant avatar error", err),
  // });
  const handleImageProfileChange = (event) => {
    const img = event.target.files[0];
    if (img) {
      updateRestaurant(restaurant._id, img, "avatar", setRestaurant);
    }
  };

  const handleEditProfilePicture = () => {
    const fileInput = document.getElementById("imageProfileInput");
    if (isProfile) {
      fileInput.click();
    }
  };
  return (
    <div className="header-inner container">
      <div
        className="profile-picture"
        button
        onClick={() => handleEditProfilePicture()}
      >
        {restaurant.avatar ? (
          <img src={`https://${restaurant.avatar}`} />
        ) : (
          <img className="profile-picture-img" src={avatar} />
        )}
        {isMyResto && (
          <input
            type="file"
            id="imageProfileInput"
            onChange={handleImageProfileChange}
            hidden="hidden"
            accept="image/*"
          />
        )}
      </div>
      <div className="user-info">
        <div className="user-info-info">
          <span className="name">
            {restaurant.name}
            <i
              className="name icon-pen  "
              onClick={() => openModal()}
              style={{ display: isMyResto ? "block" : "none", float: "right" }}
            />
          </span>
          <span className="location">
            <i className="fal fa-map-marker-alt" /> {restaurant.address}
            {restaurant.location}
            <div
              onClick={() => openModalRating()}
              style={{ marginLeft: 20, cursor: "pointer" }}
            >
              <Rating
                Button
                name="read-only"
                value={restaurant.restaurantRate}
                readOnly
              />
            </div>
            <div
              className="votes"
              style={{ cursor: "pointer" }}
              onClick={() => openModalRating()}
            >
              {restaurant.restaurantRate}/5
            </div>
            <div
              className="votes-nb "
              style={{ cursor: "pointer" }}
              onClick={() => openModalRating()}
            >
              {/*restaurant.votes.length*/}{" "}
              {restaurant.countVotes ? restaurant.countVotes : 0} votes
            </div>
          </span>
          <div className="tags">{restaurant.tags.map((el) => `#${el} `)}</div>
        </div>
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        page="profileRestoHeader"
        activeResto={restaurant}
      />

      <Modal
        showModal={showModalCreateRating}
        setShowModal={setShowModalCreateRating}
        page="createRating"
        evaluatedId={restaurant._id}
        ratingType="RESTAURANT"
      />
    </div>
  );
}
ProfileRestoHeader.defaultProps = {
  isProfile: true,
};
export default ProfileRestoHeader;
