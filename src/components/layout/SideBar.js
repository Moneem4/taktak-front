import React, { useState, useContext, useEffect } from "react";
import { UiContext } from '../../context/UiContext';
import { PostContext } from "../../context/PostContext";
import { NavLink } from "react-router-dom";
import ReservationType from "../notifications/notificationsType/ReservationType";
import MangerAvecType from "../notifications/notificationsType/MangerAvecType";
import QuestionType from "../notifications/notificationsType/QuestionType";
import womenRestaurant from "./woman-restaurant.png";
import logoGradient from "./logo-gradient.svg";
import { useHistory } from "react-router-dom";

function SideBar(props) {
  const {newNotifications} = useContext(UiContext);
  const {notificationsSideBar, setNotificationsSideBar, notifications} = useContext(PostContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const [filtre, setFiltre] = useState({
    afficherTout: true,
    plusRecent: false,
    restaurantsPosts: false,
    usersPosts: false,
    reviews: false
  });

  const handleChange = (event) => {
    let field = event.target.name;
    setFiltre({ ...filtre, [field]: event.target.checked });
  };
 
  const renderNotif = (param) => {
    switch (param.type) {
      case "poste":
        return <div></div>;
      case "invitation":
        return <div></div>;
      case "maj":
        return <div></div>;
      case "commentaire":
        return <div></div>;
      case "inviter":
        return <div></div>;
      case "recherche":
        return <div></div>;
      case "shouaiteAnnif":
        return <div></div>;
      case "reservation":
        return <ReservationType notif={param} key={param.id} />;
      case "anniversaire":
        return <div></div>;
      case "commande":
        return <div></div>;
      case "mangerAvec":
        return <MangerAvecType notif={param} key={param.id} />;
      case "QUESTION":
        return <QuestionType notif={param} key={param.id} />;
      default:
        return null;
    }
  };

  const [searchRestaurantValue, setSearchRestaurantValue] = useState("")
  const handleChangeValue = (event) => {
    setSearchRestaurantValue(event.target.value);
    console.log("searchInput" , searchRestaurantValue)
  };
  const history = useHistory();

  function startSearch(e) {
    if (e.charCode === 13 && searchRestaurantValue !== "") {
    history.push(`/searchRestaurant/${searchRestaurantValue}`)
    };
  }

  useEffect(() => {
    //setNotificationsSideBar(notifications);
    console.log("eeeee:", notificationsSideBar)
  }, [notifications]);

  return (
    <div className="feeds-page-sidemenu sidemenu" id="sidemenu">
      <div className="sidemenu-header">
        <div className="sidemenu-logo">
          <NavLink exact to="/">
            <a>
              <img src={logoGradient} />
            </a>
          </NavLink>
        </div>
        <div className="input-wrapper">
          <img className="woman-restaurant" src={womenRestaurant} />
          <i className="fal fa-search" />
          <input
            type="text"
            placeholder="Rechercher un Resto"
            className="search-rest"
            value = {searchRestaurantValue}
            onChange = {handleChangeValue}
            onKeyPress ={startSearch}
          />
          {/* <i className="icon-search"></i> */}
          <i className="fal fa-eraser eraser" />
        </div>
      </div>
      <div className="sidemenu-body">
        {/*notificationsSideBar ?
          <div className="notifications">
            {notificationsSideBar.map((notif) => (renderNotif(notif)))}
          </div>
        : 
          <></>
        */}
        <ul className="body-navigation">
          <li className=" with-menu">
            <NavLink exact to="/">
              <a>TAKtastic</a>
            </NavLink>
            <button
              className="navigation-autour-de-moi"
              type="button"
              data-toggle="navigation-autour-de-moi"
              onClick={handleClick}
            >
              <i className="fal fa-sliders-h setting" />
            </button>
          
            <div
              className="show"
              id="navigation-autour-de-moi"
              data-dropdown
              data-auto-focus="true"
              style={{ display: anchorEl ? "block" : "none" }}
            >
              <ul className="navigation-autour-de-moi-items">
                <li className="first">

                TAKtastic
                  <button id="close-navigation-autour-de-moi-items" onClick={handleClose}>

                    <i className="fal fa-sliders-h " />
                  </button>
                </li>
                <li>
                  {" "}
                  <strong> Activer tout</strong>
                  <label className="switch">
                    <input type="checkbox" checked={filtre.afficherTout} name="afficherTout" onChange={handleChange}/>
                    <span className="slider round" />
                  </label>
                </li>
                <li>
                  Les plus récents
                  <label className="switch">
                    <input type="checkbox" checked={filtre.plusRecent} name="plusRecent" onChange={handleChange}/>
                    <span className="slider round" />
                  </label>
                </li>
                <li>
                  Posts des restaurants
                  <label className="switch">
                    <input type="checkbox" checked={filtre.restaurantsPosts} name="restaurantsPosts" onChange={handleChange}/>
                    <span className="slider round" />
                  </label>
                </li>
                <li>
                  Posts des users
                  <label className="switch">
                    <input type="checkbox" checked={filtre.usersPosts} name="usersPosts" onChange={handleChange}/>
                    <span className="slider round" />
                  </label>
                </li>
                <li>
                  Reviews
                  <label className="switch ">
                    <input type="checkbox" checked={filtre.reviews} name="reviews" onChange={handleChange}/>
                    <span className="slider round" />
                  </label>
                </li>
              </ul>
            </div>
        
          </li>

          <li className="autour-de-moi-navigation">
            <NavLink exact to="/autourDeMoi">
              <a>Epic Eats</a>
            </NavLink>
          
          </li>
          <li>
            <NavLink exact to="/proposerMoiUnRestaurant">
              <a>So fast, So hot!</a>{" "}
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink exact to="/besties">
              <a>Besties</a>
            </NavLink>
          </li>
        </ul>
        <ul className="useful-links">
          <li>
            <NavLink exact to="/blog">
              <a>Blog</a>
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/promos">
              <a>Promos &amp; Offres</a>
            </NavLink>
          </li>
          <li>
            <a href="#">A propos de nous</a>
          </li>
        </ul>
      </div>

      <div className="sidemenu-footer">
        <button className="restaurant-owner">
          <i className="icon-restaurant"> </i>
          <span className="one">Propriétaire de Resto ?</span>
          <span className="add">Ajouter votre Restaurant</span>
          <i className="fal fa-utensils-alt utensils " />
        </button>
        <span className="rights">All right reserved 2020 . TAKTAK</span>
      </div>
    </div>
  );
}

SideBar.propTypes = {};

export default SideBar;
