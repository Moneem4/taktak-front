import React, { useContext, useState, useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileNaveBar from "./ProfileNaveBar";
import Description from "./Description";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import Photos from "./photosUtils/Photos";
import Checkins from "./Checkins";
import Evaluations from "./Evaluations";
import DashBoard from "./DashBoard";
import { UiContext } from "../../context/UiContext";
import PostModal from "../post/PostModal";
import LocationCheckins from "./LocationCheckins";
import CheckinLocationCard from "./checkins/CheckinLocationCard";
import client from "../../apollo/client";
import { GET_USER } from "../../graphql/user/user";
import AchevementProfile from "../sideBar/AchevementProfile";
import GestionRestaurant from "../sideBar/GestionRestaurant";
import BalanceWinTak from "../sideBar/BalanceWinTak";
import PresDeVous from "../sideBar/PresDeVous";
import SideBarDernierVisites from "../sideBar/SideBarDernierVisites";
import SideBarContact from "../sideBar/SideBarContact";
import { UserContext } from "../../context/UserContext";
import { NavLink } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from '@material-ui/icons/Create';
import SuivreBtn from "./SuivreBtn";

function Profile({ match, location }) {
  const {
    params: { userId },
  } = match;
  const {
    contentInPostModal,
    indexOfClickedElement,
    openModalPost,
  } = useContext(UiContext);
  const { activeUser, loadUserById, setSelectedUser, isFollowing } = useContext(UserContext);

  const { handleClosePostModal } = useContext(UiContext);

  const [isntme, setIsntme] = useState(null);
  const [theUser, setTheUser] = useState(null);
  const [follow, setFollow] = useState(null);

  const getUrlFromPath = () => {
    const paths = window.location.href.split("/");
    let url = paths[4];
    
    return url;
};

  useEffect(() => {
    setTheUser(activeUser);
    setSelectedUser(activeUser);
    isFollowing(getUrlFromPath(), setFollow);
  }, [activeUser.avatar]);

  useEffect(() => {
    if (activeUser.userId !== userId) {
      setIsntme(true);
    } else setIsntme(false);
  }, [match]);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      if (isntme) {
        loadUserById(userId, setTheUser);
      }
    }
    return () => (isSubscribed = false);
  }, [isntme]);
  
  return (
    <div>
      {theUser && (
        <div>
          <PostModal
            data={contentInPostModal}
            index={indexOfClickedElement}
            open={openModalPost}
            handleClose={handleClosePostModal}
          />
              <div className="user-foodlist-profile-page">
                <div className="user-foodlist-profile-page-content">
                  <ProfileHeader isntme={isntme} selectedUser={theUser} />
                  <SuivreBtn  isntme={isntme} isFollowing={follow}/>
                  <Router>
                <Switch>
                  <div className="user-foodlist-profile-page-content-feed container">
                    <div className="feed-main">
                      <ProfileNaveBar isntme={isntme} selectedUser={theUser} />
                      <div
                        className="tabs-content"
                        data-tabs-content="example-tabs"
                      >
                        <Route exact path={`/profile/${theUser.userId}`}>
                          <Description isntme={isntme} selectedUser={theUser} />
                        </Route>

                        <Route exact path={`/profile/${theUser.userId}/photos`}>
                          <Photos userId={theUser} />
                        </Route>

                        <Route
                          exact
                          path={`/profile/:${theUser.userId}/checkins`}
                          component={() => (
                            <Checkins isntme={isntme} selectedUser={theUser} />
                          )}
                        />
                        {/* <Route
                          exact
                          path={`/profile/:${theUser.userId}/checkins/:location`}
                          component={() => (
                            <LocationCheckins
                              isntme={isntme}
                              selectedUser={theUser}
                            />
                          )}
                        /> */}
                        {/* <Route
                          exact
                          path={`/profile/:${theUser.userId}/evaluations`}
                          component={Evaluations}
                        />
                        <Route
                          exact
                          path={`/profile/:${theUser.userId}/dashboard`}
                          component={DashBoard}
                        /> */}
                      </div>
                    </div>

                    <div className="feed-secondary">
                      <AchevementProfile />
                      <GestionRestaurant />
                      <BalanceWinTak />
                      <PresDeVous />
                      <SideBarDernierVisites />
                      <SideBarContact />
                    </div>
                  </div>
                  </Switch>
              </Router>
                </div>

                <div className="user-foodlist-add-profile-picture">
                  <span className="title-header">Photo de profile</span>
                  <div className="circle" id="dropzone2">
                    <i className="fal fa-portrait" />
                    <span className="import-picture-first-methode">
                      Glissez directement votre photo ici
                    </span>
                    <div className="import-picture-second-methode" id>
                      <span className="here">Importer photos</span>
                    </div>
                  </div>
                  <div className="user-foodlist-add-profile-picture-bottom">
                    <span className="profil-picture-instruction">
                      Photo ne doit pas dépasser 500 ko Formats acceptées: .jpeg
                      .gif .png
                    </span>
                    <span className="profil-picture-third-methode">
                      Parcourir mes photos
                    </span>
                    <button className="confirm"> Confirmer</button>
                  </div>
                </div>
              </div>
         
        </div>
      )}
    </div>
  );
}

Profile.propTypes = {};

export default Profile;