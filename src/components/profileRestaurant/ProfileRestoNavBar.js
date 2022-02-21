import React ,{useState,useEffect,useContext}from 'react';
import { NavLink } from "react-router-dom";
import { UiContext } from "../../context/UiContext";
import { RestaurantContext } from "../../context/RestaurantContext";
function ProfileRestoNavBar(props) {
    const {restaurant}=props
    const { getIndex } = useContext(UiContext);
    const { myRestaurantsList} = useContext(RestaurantContext);
  
    const getUrlFromPath = () => {
      const paths = window.location.href.split("/");
      let url = paths[4];
      return url;
    };
  
    if (myRestaurantsList) {
      var indexResto = getIndex(getUrlFromPath(), myRestaurantsList, "_id");
    } else {
      var indexResto = -1;
    }
  
    let isMyResto = indexResto >= 0;
  
    return (
        <div>
            <ul className="tabs" data-tabs id="example-tabs">
                <li>
                    <NavLink
                        className="tabs-title tabs-description"
                        activeClassName="tabs-title is-active tabs-description"
                        exact to={`/profileRestaurant/`+ restaurant._id}
                    >
                        <a>Description</a>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="tabs-title tabs-photos"
                        activeClassName="tabs-title is-active tabs-photos"
                        exact to={`/profileRestaurant/`+ restaurant._id + `/photos`}
                    >
                        <a>Photos</a>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="tabs-title tabs-menu"
                        activeClassName="tabs-title is-active tabs-menu"
                        exact to={`/profileRestaurant/`+ restaurant._id + `/menu`}
                    >
                        <a>Menu</a>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="tabs-title tabs-evaluations"
                        activeClassName="tabs-title is-active tabs-evaluations"
                        exact to={`/profileRestaurant/`+ restaurant._id + `/evaluation`}
                    >
                        <a>Evaluations</a>
                    </NavLink>
                </li>
                <li>{isMyResto &&
                        <NavLink
                            className="tabs-title tabs-dashboard"
                            activeClassName="tabs-title is-active tabs-dashboard"
                            exact to={`/profileRestaurant/`+ restaurant._id + `/table-de-board`}
                        >
                            <a><i style={{fontSize: '1.5rem', color: '#ff6900'}} className="icon-dashboard">
                                </i>Tableau de board</a>
                        </NavLink>
                    }
                </li>
                <li>
                    <NavLink
                        className="tabs-title tabs-qrcode"
                        activeClassName="tabs-title is-active tabs-qrcode"
                        exact to={`/profileRestaurant/`+ restaurant._id + `/qrcode`}
                    >
                        <a>QRCode</a>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default ProfileRestoNavBar