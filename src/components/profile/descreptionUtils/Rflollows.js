import React, { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import Rcards from "./Rcards";

function Rflollows(props) {
  const {isntme} = props;
  const { rFollowing, userRestaurantFollowing } = useContext(UserContext);
  let tab;

  if (!isntme){
    if (rFollowing) {
      tab = rFollowing.map((el) => <Rcards restaurant={el} />);
    }
    else tab =<div className="you-may-like-element"> <h1>no restaurant followed yet</h1></div>
  } else {
    if (userRestaurantFollowing) {
      tab = userRestaurantFollowing.map((el) => <Rcards restaurant={el} />);
    }
    else tab = <span>no restaurant followed yet</span>
  }

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



export default Rflollows;
