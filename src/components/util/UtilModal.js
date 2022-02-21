import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import BookingArticle from "../booking/bookingSteps/BookingArticle";
import HoraireOuverture from "../profileRestaurant/createRestaurant/HoraireOuverture";
import UpdatePersonalInfos from "../profile/descreptionUtils/UpdatePersonalInfos";
import UpdateBrief from "../profile/descreptionUtils/UpdateBrief";
import UpdateProfileHeader from "../profile/UpdateProfileHeader";
import UpdateProfileRestoHeader from "../profileRestaurant/UpdateProfileRestoHeader";
import UpdateDescriptionResto from "../profileRestaurant/description/UpdateDescriptionResto";
import UpdateCordonneesResto from "../profileRestaurant/description/UpdateCordonneesResto";
import UpdateHoraires from "../profileRestaurant/UpdateHoraires";
import UpdateArticle from "../profileRestaurant/menu/UpdateArticle";
import DetailArticle from "../profileRestaurant/menu/DetailArticle";
import AddNewIngredient from "../profileRestaurant/menu/createArticle/AddNewIngredient";
import UpdateOption from "../profileRestaurant/menu/createArticle/UpdateOption";
import ConfirmationModal from "../profile/updateProfile/ConfirmationModal";
import CreateRating from '../ratings/CreateRating';
import CreateStory from '../stories/CreateStory';
import SwitchProfile from '../layout/SwitchProfile';
import AccessPost from '../post/AccessPost';
import AddAccessPost from '../post/createPost/AddAccessPost';
import ListMenuArticles from "../post/createPost/ListMenuArticles";
import ProfilData from "../home/ProfilData";

const styles = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
    marginLeft: 250,
  },
});

function UtilModal(props) {
  const { classes, page } = props;

  const handleClose = () => {
    props.setShowModal(!props.showModal);
  };

  let modalPage;
  if (page === "menu") {
    modalPage = (
      <BookingArticle
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        article={props.menu}
      />
    );
  } else if (page === "horaireOuverture") {
    modalPage = (
      <HoraireOuverture
        showModal={props.showModal}
        setShowModal={props.setShowModal}
      />
    );
  } else if (page === "updatePersonalInfos") {
    modalPage = (
      <UpdatePersonalInfos
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        user={props.user}
        setUser={props.setUser}
      />
    );
  } else if (page === "brief") {
    modalPage = (
      <UpdateBrief
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        user={props.user}
        activeUser={props.activeUser}
        setUser={props.setUser}
      />
    );
  } else if (page === "profileHeader") {
    modalPage = (
      <UpdateProfileHeader
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        activeUser={props.activeUser}
      />
    );
  } else if (page === "profileRestoHeader") {
    modalPage = (
      <UpdateProfileRestoHeader
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        activeResto={props.activeResto}
      />
    );
  } else if (page === "restoDescription") {
    modalPage = (
      <UpdateDescriptionResto
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        activeResto={props.activeResto}
      />
    );
  } else if (page === "restoCordonnees") {
    modalPage = (
      <UpdateCordonneesResto
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        activeResto={props.activeResto}
        clicked={props.clicked}
        setClicked={props.setClicked}
        checked={props.checked}
        setChecked={props.setChecked}
      />
    );
  } else if (page === "updateHoraire") {
    modalPage = (
      <UpdateHoraires
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        newRestoData={props.newRestoData}
        setNewRestoData={props.setNewRestoData}
        clickedDays={props.clickedDays}
        setClickedDays={props.setClickedDays}
        time={props.time}
        setTime={props.setTime}
      />
    );
  } else if (page === "updateArticle") {
    modalPage = (
      <UpdateArticle
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        article={props.article}
        restaurant={props.restaurant}
      />
    );
  } else if (page === "addNewIngredient") {
    modalPage = (
      <AddNewIngredient
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        setNewOption={props.setNewOption}
        listIng={props.listIng}
        setListOptions={props.setListOptions}
        action={props.action}
        listNewIngOptions={props.listNewIngOptions}
        setListNewIngOptions={props.setListNewIngOptions}
        setUpdatedOptions={props.setUpdatedOptions}
      />
    );
  } else if (page === "updateOption") {
    modalPage = (
      <UpdateOption
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        option={props.option}
        updatedOptions={props.updatedOptions}
        setUpdatedOptions={props.setUpdatedOptions}
        setListOptions={props.setListOptions}
      />
    );
  } else if (page === "confirmation") {
    modalPage = (
      <ConfirmationModal
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        userId={props.userId}
      />
    );
  } else if (page === "createRating") {
    modalPage = (
      <CreateRating
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        evaluatedId={props.evaluatedId}
        ratingType={props.ratingType}
      />
    );
  } else if (page === "switchProfile") {
    modalPage = (
      <SwitchProfile
        showModal={props.showModal}
        setShowModal={props.setShowModal}
      />
    );
  } else if (page === "accessPost") {
    modalPage = (
      <AccessPost
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        post={props.post}
      />
    );
  } else if (page === "addAccessPost") {
    modalPage = (
      <AddAccessPost
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        postForm={props.postForm}
        setPostForm={props.setPostForm}
      />
    );
  } else if (page === "detailArticle") {
    modalPage = (
      <DetailArticle
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        article={props.article}
      />
    );
  } else if (page === "articlesList") {
    modalPage = (
      <ListMenuArticles
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        setPostForm={props.setPostForm}
        postForm={props.postForm}
        typePost={props.typePost}
      />
    );
  } else if (page === "profilData") {
    modalPage = (
      <ProfilData
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        profilData={props.profilData}
      />
    );
  }

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={props.showModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {modalPage}
      </Modal>
    </div>
  );
}

UtilModal.propTypes = {};

export default withStyles(styles)(UtilModal);
