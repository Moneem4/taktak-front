import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import Rcards from "../descreptionUtils/Rcards";

function UpdateRestoFlollows(props) {
  const {isntme} = props;
  const { activeUser, getUserRestaurantFollowed } = useContext( UserContext );
  const [rFollowing, setRFollowing] = useState(null);

  useEffect(() => {
    getUserRestaurantFollowed(activeUser.userId, setRFollowing);
  }, []);

  let tab;
  if (rFollowing) {
    tab = rFollowing.map((el) => <Rcards restaurant={el} />);
  }
  else tab = <span  className="resto-element">no restaurant followed yet</span>

  return (
    <div>
      <div className="restaurants-followed profile-section" >
        <h3 className="restaurants-followed-title profile-title">
          Restaurants suivis
        </h3>
        <div className="you-may-like">
          <div className="you-may-like-body">{tab}</div>
        </div>
      </div>
    </div>
  );
}

export default UpdateRestoFlollows;
