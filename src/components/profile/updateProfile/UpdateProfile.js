import React, { useState, useContext, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { UserContext } from "../../../context/UserContext";
import AchevementProfile from "../../sideBar/AchevementProfile";
import BalanceWinTak from "../../sideBar/BalanceWinTak";
import PresDeVous from "../../sideBar/PresDeVous";
import SideBarDernierVisites from "../../sideBar/SideBarDernierVisites";
import SideBarContact from "../../sideBar/SideBarContact";
import UpdateFollowers from "../updateProfile/UpdateFollowers";
import UpdateRestoFlollows from "../updateProfile/UpdateRestoFlollows";
import { useMutation } from "@apollo/client";
import { UPDATE_AVATAR } from "../../../graphql/user/user";
import './updateProfile.css';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import SaveIcon from '@material-ui/icons/Save';
import client from "../../../apollo/client";
import { LOAD_ME } from "../../../graphql/auth/mutations";
import UserStats from "../descreptionUtils/UserStats";
import ProfileStories from "../ProfileStories";
import Followers from "../descreptionUtils/Followers";
import Modal from "../../util/UtilModal";

const styles = (theme) => ({
  textField: {
    color: "#484848",
    height: "5ch",
    backgroundColor: "white",
    width: "200%",
    fontSize: "2rem",
    textAlign: "start",
    border: "0.1px groove darkgrey",
    borderRadius: "3px",
    paddingLeft: 12,
  },
  briefField: {
    height: "5rem",
    fontSize: "2rem",
    color: "#484848",
    boxShadow: "none"
  },
  selectCountry: {
    width: "200%",
    height: "5ch",
    backgroundColor: "white",
    fontSize: "2rem",
    border: "0.1px groove darkgrey",
    borderRadius: "3px",
    paddingLeft: 12,
    color: "#484848",
    textAlign: "center"
  },
});

const languagesList = ["Ar","Fr","En"];
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 }]

function UpdateProfile(props) {
  const { classes } = props;
  const { loaduser, activeUser, updateProfile } = useContext(UserContext);
  const [theUser, setTheUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  async function loadMe () {
    await client
          .query({
            query: LOAD_ME,
          })
          .then(async (data) => {
            setTheUser((user) => {
              return {
                ...user,
                userId: data.data.me._id,
                local: data.data.me.local,
                firstName: data.data.me.firstName,
                lastName: data.data.me.lastName,
                tags: data.data.me.tags,
                uFollowersCount: data.data.me.uFollowersCount,
                rFollowersCount: data.data.me.rFollowersCount,
                uFollowsCount: data.data.me.uFollowsCount,
                description: data.data.me.description,
                birthDate: data.data.me.birthDate,
                phoneNumber: data.data.me.phoneNumber,
                city: data.data.me.city,
                languages: data.data.me.languages,
                avatar: data.data.me.avatar,
                tags: data.data.me.tags,
              };
            });
          })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  useEffect(() => {
    loadMe();
  }, [props]);

  const [stateUserData, setStateUserData] = useState(null);

  useEffect(() => {
    setStateUserData(theUser)
  }, [theUser]);

  /*const [updateAvatar, { data, loading, error }] = useMutation(UPDATE_AVATAR, {
    onCompleted: async (data) => {
      loaduser();
    },
    onError: (err) => console.log("updateAvatr", err),
  });*/

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleImageChange = (event) => {
    const img = event.target.files[0];
    if (img) {
      /*updateAvatar({
        variables: {
          id: theUser.userId,
          file: img,
        },
      });*/
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const field = event.target.name;
    setStateUserData({ ...stateUserData, [field]: value });
  };

  const handleTagsChange = (event) => {
    const value = event.target.value;
    let tagsList = value.split(',');
    setStateUserData({ ...stateUserData, tags: tagsList });
  };

  const handleDateChange = (date) => {
    const dateBirth =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    console.log("date:", dateBirth);
    setStateUserData({ ...stateUserData, birthDate: dateBirth });
  };

  const selectCountry = (val) => {
    setStateUserData({ ...stateUserData, location: val });
  };

  const selectCity = (val) => {
    setStateUserData({ ...stateUserData, city: val });
  };

  const selectLangues = (event, val) => {
    setStateUserData({ ...stateUserData, languages: val });
  };

  async function submitChange() {
    //var languageList = stateUserData.languages.map((e) => e.language);

    const data = {
      firstName: stateUserData.firstName,
      lastName: stateUserData.lastName,
      description: stateUserData.description,
      birthDate: stateUserData.birthDate,
      location: stateUserData.location,
      city: stateUserData.city,
      languages: stateUserData.languages,
      //email: stateUserData.email,
      phoneNumber: stateUserData.phoneNumber,
      tags: stateUserData.tags,
    };
    
    updateProfile( theUser.userId ,data);
    openModal();
  }

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <div className="user-foodlist-profile-page">
    {theUser && stateUserData && <div className="profile-empty">
        <div className="profile-page-header">
          <div className="header-inner container">
            <div className="profile-picture" onClick={() => handleEditPicture()}>
              {theUser.avatar ? (
                <img
                  className="profile-picture-img"
                  src={`https://${theUser.avatar}`}
                />
              ):(
                <div>
                  <img className="profile-picture-empty" src="../../assets/img/Ellipse 386.png" />
                  <i className="fal fa-camera" />
                </div>
              )}
            </div>
            <input
              type="file"
              id="imageInput"
              onChange={handleImageChange}
              hidden="hidden"
              accept="image/*"
            />
            <div className="user-info">
              <div className="user-info-info">
                <span className="name">{theUser.firstName} {theUser.lastName} <i className="icon-pen" /></span>
                  {theUser.location ? (
                    <span className="location">
                      <i className="fal fa-map-marker-alt" /> &emsp;
                      {theUser.location} - {theUser.city}
                    </span>
                  ):(
                    <span className="location">
                      <i className="fal fa-map-marker-alt" /> 
                        Emplacement non spécifié
                    </span>
                  )}
                  {theUser.tags && stateUserData.tags ? (
                    <input
                      type="text"
                      name="tags"
                      //value={stateUserData.tags.map((el) => `${el},`)}
                      value={stateUserData.tags}
                      onChange={handleTagsChange}
                      className="tags"
                    />
                  ):(
                    <input
                      type="text"
                      placeholder="Ajouter des #Hashtags ici en les séparant par (,)"
                      name="tags"
                      value={stateUserData.tags}
                      onChange={handleTagsChange}
                      className="tags"
                    />
                  )}
              </div>
              <ProfileStories
                profileImage={theUser.avatar}
                isntme={false}
              />
            </div>
          </div>
        </div>
        <div className="proposer-moi-page">
          <div className="proposer-moi-page-content container">
            <div className="proposer-moi-page-content-feed">
              <div className="feed-main">
                <div className="tabs-content" data-tabs-content="example-tabs">
                  <div className="tabs-panel is-active" id="panel1">
                    <UserStats isntme={false} selectedUser={theUser}  />
                    <div className="brief profile-section">
                      <h3 className="brief-title profile-title">En Bref</h3>
                      <input type="text"
                        placeholder="Décrivez-vous brièvement ici…" 
                        name={"description"}
                        value={stateUserData.description}
                        onChange={handleChange} 
                        className={classes.briefField} />
                    </div>
                    <div className="personal-information profile-section">
                      <h3 className="personal-information-title profile-title">
                        Informations personnelles
                      </h3>
                      <div className="personal-information-body">
                        <div className="info-item">
                          <span className="info-label">Date de naissance</span>
                          <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <KeyboardDatePicker
                              format="MM/dd/yyyy"
                              value={stateUserData.birthDate}
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                              InputProps={{
                                className: classes.textField,
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        </div>
                        {/*<div className="info-item">
                          <span className="info-label">Pays</span>
                          <div className="langues">
                            <CountryDropdown
                              defaultOptionLabel="Choisir pays..."
                              value={theUser.location}
                              name={"location"}
                              onChange={selectCountry}
                              className={classes.selectCountry}
                            />
                          </div>
                        </div>*/}
                        
                        <div className="info-item">
                          <span className="info-label">Gouvernorat</span>
                          <div className="langues">
                            <RegionDropdown
                              blankOptionLabel="No country selected..."
                              defaultOptionLabel="Now select a region..."
                              country={"Tunisia"}
                              value={stateUserData.city}
                              name={"city"}
                              onChange={selectCity}
                              className={classes.selectCountry}
                            />
                          </div>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Langues</span>
                          <div className="langues">
                            <Autocomplete
                              multiple
                              id="checkboxes-tags-demo"
                              options={languagesList}
                              value={stateUserData.languages ? stateUserData.languages : []}
                              name={"languages"}
                              disableCloseOnSelect
                              getOptionLabel={(option) => option}
                              renderOption={(option, { selected }) => (
                                <React.Fragment>
                                  <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                  />
                                  {option}
                                </React.Fragment>
                              )}
                              style={{ width: "200%" }}
                              onChange={selectLangues}
                              renderInput={(params) => (
                                <TextField {...params} variant="outlined" placeholder="Langues" />
                              )}
                            />
                          </div>
                        </div>
                        <div className="info-item">
                          <span className="info-label">E-mail</span>
                          <form style={{width: "200%"}}>
                            <input type="text" 
                              placeholder="hello@moon.tn"
                              name={"email"}
                              value={stateUserData.local.email}
                              onChange={handleChange} 
                              disabled= "true" />
                          </form>
                        </div>
                        <div className="info-item">
                          <span className="info-label">N° Mobile</span>
                          <form action>
                            <input type="text" 
                              placeholder=" +216 -- --- ---"
                              name={"phoneNumber"}
                              value={stateUserData.phoneNumber}
                              onChange={handleChange} />
                          </form>
                        </div>
                        <div className="follow-button" onClick={submitChange}>
                          <SaveIcon style={{fontSize: 20, color: "#ffffff"}} /> &emsp;
                          <span>Enregistrer</span>
                        </div>
                      </div>
                    </div>
                    <UpdateFollowers selectedUser={theUser} isntme={false}  />
                    <UpdateRestoFlollows selectedUser={theUser} isntme={true}/>
                  </div>
                </div>
              </div>
              <div className="feed-secondary">
                <AchevementProfile />
                <BalanceWinTak />
                <PresDeVous />
                <SideBarDernierVisites />
                <SideBarContact />
              </div>
            </div>
          </div>
        </div>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          page="confirmation"
          userId={theUser.userId}
        />
      </div>
    }
  </div>
 );
}

export default withStyles(styles)(UpdateProfile);
