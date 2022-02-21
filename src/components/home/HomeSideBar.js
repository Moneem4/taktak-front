import React from "react";
import { NavLink } from 'react-router-dom';
import AchevementProfile from "../sideBar/AchevementProfile";
import SideBarVisiteGuide from "../sideBar/SideBarVisiteGuide";
import SideBarMiniMap from "../sideBar/SideBarMiniMap";
import SideBarDernierVenus from "../sideBar/SideBarDernierVenus";
import SideBarAmelioreJournal from "../sideBar/SideBarAmelioreJournal";
import SideBarSuggestionResto from "../sideBar/SideBarSuggestionResto";
import SideBarFoodlist from "../sideBar/SideBarFoodlist";
import SideBarPlusLus from "../sideBar/SideBarPlusLus";
import SideBarPub from "../sideBar/SideBarPub";
import SideBarTopFoodist from "../sideBar/SideBarTopFoodist";
import './menusidebar.css'

function HomeSideBar(props) {
    
    return (

      <div className="feed-secondary">
        <button className="book-restaurant">
          <div className="booking-button">
            <i className="icon-chair" />
            <span className="title">Réservez</span>
            <NavLink exact to="/booking-page-process-CTA">
              <a className="span-hover">
                Réservez un Restaurant
              </a>
            </NavLink>
            <i className="icon-small-arrow-right arrow" />
          </div>
          <div className="commander-button">
            <i className="fal fa-shopping-basket" />
            <span className="title">Commander</span>
            <span className="span-hover">Commander un menu</span>
            <i className="icon-small-arrow-right arrow" />
          </div>
        </button>
        <AchevementProfile />
        <div className="separator2" />
        <SideBarAmelioreJournal />
        <SideBarVisiteGuide />
        <SideBarMiniMap />
        <SideBarDernierVenus />
      
        <div className="separator2" />
        
        <SideBarSuggestionResto />
        <SideBarFoodlist />
        <SideBarPlusLus />
        <div className="separator" />
        <SideBarPub />
        <SideBarTopFoodist />
      </div>

    );
}

HomeSideBar.propTypes = {};

export default HomeSideBar;