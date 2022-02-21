import React, { useState, useContext } from "react";
import { RestaurantContext } from "../../context/RestaurantContext";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../../context/UserContext";
import a from '../profile/avatar1.png'
import "./suggestion.css";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "20%",
    marginRight: 10,
    marginLeft: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
  },
  pos: {},
});

function SuggestionItem(props) {
  const classes = useStyles();
  const { user } = props;
  const { activeUser, Followuser, unfollowUser, isFollowing } = useContext(UserContext);
  const { userIsFollowedByRestaurant } = useContext(RestaurantContext);
  const [isfollowed, setIsfollowed] = useState(false);

  function addUserFollower() {
    Followuser(user._id);
  }

  function unFollowuser() {
    unfollowUser(user._id); 
  }

  if(activeUser.isRestaurant){
    userIsFollowedByRestaurant(activeUser.connectedRestaurentId, user._id, setIsfollowed);
  }else{
    isFollowing(user._id, setIsfollowed);
  }

  return (
    <div className="profile-follow-card" style={{marginRight : "7px"}}>
      <div className="profile-follow-card-header">
      <NavLink exact to={`/profile/${user._id}`}>
       {user.avatar ? <img
          className="avatar"
          style={{ borderRadius: "50%", cursor : "pointer" }}
          src={`https://${user.avatar}`}
        /> : <img
        className="avatar"
        style={{ borderRadius: "50%" , cursor : "pointer" }}
        src={a}
      /> }
      </NavLink>
      </div>
      <div className="profile-follow-card-body">
        <div className="profile-follow-card-body-header">
          <div className="profile">
            <span className="profile-name">
              {user.firstName.length > 18
                ? user.firstName.substring(0, 18 - 3) + "..."
                : user.firstName}
            </span>
            <span className="profile-location">
              <i className="icon-marker" />
              {user.city}
            </span>
          </div>
        </div>
        <div className="profile-follow-card-body-invisible">
          {!isfollowed ? (
            <button onClick={() => {
              addUserFollower();
            }}>
              <i className="fal fa-user-plus" />
              Suivre
            </button>
          ) : (
            <button  onClick={() => {
              unFollowuser(user._id);
            }}>
               <i className="icon-checked" />
               Suivi
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SuggestionItem;
