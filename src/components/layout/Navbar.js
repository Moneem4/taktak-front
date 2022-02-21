import React, { useContext, useState, useEffect } from "react";
import { RestaurantContext } from "../../context/RestaurantContext";
import { UserContext } from "../../context/UserContext";
import withStyles from "@material-ui/core/styles/withStyles";
import AvatarUser from "../atoms/AvatarUser";
import AvatarRestaurant from "../atoms/AvatarRestaurant";
import Box from "./Box";
import { NavLink } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import Notifications from "../notifications/Notifications";
import { PostContext } from "../../context/PostContext";
import { NOTIF_NEW_POST } from "../../graphql/post/post";
import { useSubscription } from '@apollo/react-hooks';

const styles = (theme) => ({
  select: {
    width: "80%",
    maxWidth: 360,
  },
  nested: {
    width: 125,
  },
});

function Navbar(props) {
  const { classes } = props;
  const [showBox, setShowBox] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openArrow = Boolean(anchorEl);
  const { getRestaurantByUserId, myRestaurantsList, setMyRestaurantsList, selectedProfile, setSelectedProfile } = useContext(RestaurantContext);
  const { activeUser, setActiveUser } = useContext(UserContext);
  const {notifications, showNotifIcon, notificationsSideBar} = useContext(PostContext);
  const [open, setOpen] = useState(false);
  const [marginTopState, setMarginTopState] = useState("0%");

  useEffect(() => {
    getRestaurantByUserId(activeUser.userId, setMyRestaurantsList);
  }, [props]);

  useEffect(() => {
    setSelectedProfile({type:"USER", profile: activeUser})
  }, [myRestaurantsList]);

  function handleClick(e) {
    e.preventDefault();
    setShowBox((prev) => !prev);
  }

  const handleClickArrow = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = (el) => {
    setAnchorEl(null);
    setSelectedProfile(el);
    
    if(el.type === "RESTAURANT"){
      setActiveUser({...activeUser, isRestaurant: true, connectedRestaurentId: el.profile._id})
    }else{
      setActiveUser({...activeUser, isRestaurant: false, connectedRestaurentId: ""})
    }
  };

  const handleRestoClick = () => {
    setOpen(!open);
    if (!open) {
      setMarginTopState("100%");
    } else {
      setMarginTopState("0%");
    }
  };

  const myProfiles = myRestaurantsList && myRestaurantsList.map((el, index) => {
    const item = {
      type: "RESTAURANT",
      profile: el
    }
    return item
  })

  const itemUser = {
    type: "USER",
    profile: activeUser
  }
  myProfiles.push(itemUser)

  const { data, error, loading } = useSubscription(NOTIF_NEW_POST, {});
  /*if (loading) {
    return <div>Loading...</div>;
  };

  if (error) {
    return <div>Error! {error.message}</div>;
  };*/

  if (data) {
    const item = {
      ...data,
      type: "QUESTION"
    }
    notifications.push(item)
    notificationsSideBar.push(item)
  }

  return (
    <nav className="navbar">
      {activeUser && (
        <div className="navbar-content">
          <Box
            handleClick={handleClick}
            showBox={showBox}
            setShowBox={setShowBox}
          />
          <div className="app-download">
            <i className="icon-phone icon" />
            <span>Télécharger application mobile</span>
            <i className="icon-android icon" />
            <i className="icon-apple icon" />
          </div>
          <div className="notifications-messages">
            <div className="notifications">
              <div className="notifications-bar">
                <NavLink exact to="/notifications">
                  <a href="notifications.html">
                    <i className="icon-notification icon" />
                  </a>
                </NavLink>
                {notifications.length > 0 ? 
                  <span style={{ display: showNotifIcon ? "block" : "none"}}
                  className="number">{notifications.length}</span>
                :
                  <></>
                }
              </div>
              <div className="notification-hover">
                <div className="arrow-up" />
                <span>notification</span>
              </div>
            </div>
            <div className="messages">
              <div className="message-bar">
                <NavLink exact to={`/bookingPageProcess`}>
                  <a>
                    <i className="icon-message icon" />
                  </a>
                </NavLink>
                <span className="number">2</span>
              </div>
              <div className="messages-hover">
                <div className="arrow-up" />
                <span>Réservation &amp; Commande</span>
              </div>
            </div>
            <div className="menu-customize">
              <div className="menu-customize-bar">
                <NavLink exact to={`/customizeMenu`}>
                  <a href="menu-customize.html">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={35}
                      height={25}
                      viewBox="0 0 41.286 30.287"
                    >
                      <defs>
                        <style
                          dangerouslySetInnerHTML={{
                            __html:
                              "\n                .a {\n                  fill: #484848;\n                }\n              ",
                          }}
                        />
                      </defs>
                      <g transform="translate(7.75 -0.153)">
                        <g transform="translate(-7.75 -63.784)">
                          <circle
                            className="a"
                            cx="2.064"
                            cy="2.064"
                            r="2.064"
                            transform="translate(18.579 64.635)"
                          />
                          <path
                            className="a"
                            d="M270.45,190.55a.688.688,0,0,1-.683-.612c-.668-6.006-6.812-11.831-13.148-12.462a.688.688,0,0,1,.138-1.369c7.048.7,13.631,6.97,14.377,13.683a.688.688,0,0,1-.608.757.711.711,0,0,1-.076,0Z"
                            transform="translate(-233.98 -102.519)"
                          />
                          <path
                            className="a"
                            d="M3.441,94.224H37.846a3.445,3.445,0,0,0,3.441-3.441A.688.688,0,0,0,40.6,90.1h-.124l-.765-3.825A19.426,19.426,0,0,0,21.331,70.657v-1.3a2.752,2.752,0,1,0-1.376,0v1.3A19.427,19.427,0,0,0,1.577,86.27L.812,90.1H.688A.688.688,0,0,0,0,90.783,3.445,3.445,0,0,0,3.441,94.224ZM19.267,66.7a1.376,1.376,0,1,1,1.376,1.376A1.376,1.376,0,0,1,19.267,66.7ZM2.926,86.54a18.067,18.067,0,0,1,35.433,0L39.07,90.1H2.216Zm36.866,4.931a2.068,2.068,0,0,1-1.947,1.376H3.441a2.068,2.068,0,0,1-1.947-1.376Z"
                            transform="translate(0 0)"
                          />
                          <path
                            className="a"
                            d="M256.738,176.067a.69.69,0,0,0-.138,1.373c6.336.634,12.479,6.459,13.147,12.465a.688.688,0,0,0,.684.609.7.7,0,0,0,.076,0,.688.688,0,0,0,.608-.757c-.747-6.715-7.33-12.981-14.378-13.686Z"
                            transform="translate(-233.962 -102.483)"
                          />
                        </g>
                      </g>
                    </svg>{" "}
                  </a>
                </NavLink>
                <span className="number">4</span>
              </div>
              <div className="menu-customize-hover">
                <div className="arrow-up" />
                <span>Menu personnalisé</span>
              </div>
            </div>
          </div>
          {selectedProfile ? 
            <div className="user-widget">
              {selectedProfile.type === "USER" ?
                <span className="user-name">
                  <strong>{selectedProfile.profile.firstName}</strong>
                </span>
              :
                <span className="user-name">
                  <strong>{selectedProfile.profile.name}</strong>
                </span>
              }
              <div className="user-widget-settings">
                {selectedProfile.type === "USER" ?
                  <NavLink
                    style={{ margin: "3px" }}
                    exact
                    to={`/profile/${selectedProfile.profile.userId}`}
                  >
                    <AvatarUser activeUser={selectedProfile.profile} />
                  </NavLink>
                :
                  <NavLink
                    style={{ margin: "3px" }}
                    exact
                    to={`/profileRestaurant/` + selectedProfile.profile._id}
                  >
                    <AvatarRestaurant
                      activeUser={selectedProfile.profile}
                      link={false}
                      onClick={handleClickArrow}
                    />
                  </NavLink>
                }
                
                <div className="change-compte-pro" onClick={handleClickArrow}>
                  <i className="fal fa-repeat-alt" />
                </div>
                
                {myProfiles && myProfiles.length > 0 ? (
                  <div className="user-widget-settings">
                    <ArrowDropDownIcon
                      onClick={handleClickArrow}
                      fontSize="inherit"
                      className="fal fa-sort-down"
                    />
                    <Menu
                      id="fade-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={openArrow}
                      onClose={() => handleClose(selectedProfile)}
                      TransitionComponent={Fade}  
                    >   
                      {selectedProfile && (selectedProfile.profile._id || selectedProfile.profile.userId) &&   myProfiles
                        .filter((option) => option.profile.userId !== selectedProfile.profile.userId || option.profile._id !== selectedProfile.profile._id)
                        .map((el, index) => (
                        el.type === "RESTAURANT" ?
                          <MenuItem
                            onClick={() => {
                              handleClose(el);
                            }}
                            key={el}
                          >
                            <div style={{ display: "flex" }}>
                              <AvatarRestaurant activeUser={el.profile} link={true} />
                              <span className="resto-name">
                                <strong>{el.profile.name}</strong>
                              </span>
                            </div>
                          </MenuItem>
                        :
                          <MenuItem
                            onClick={() => {
                              handleClose(el);
                            }}
                            key={el}
                          >
                            <div style={{ display: "flex" }}>
                              <AvatarUser activeUser={el.profile} />
                              <span className="resto-name">
                                <strong>{el.profile.firstName}</strong>
                              </span>
                            </div>
                          </MenuItem>
                      ))}
                    </Menu>
                    <button
                      onClick={handleClick}
                      style={{ cursor: "pointer", marginLeft: "7px" }}
                    >
                      <MoreVertIcon fontSize="large" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={handleClick}
                      style={{ cursor: "pointer", marginLeft: "7px" }}
                    >
                      <MoreVertIcon fontSize="large" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            :
            <></>
          }
        </div>
      )}
    </nav>
  );
}

export default withStyles(styles)(Navbar);
