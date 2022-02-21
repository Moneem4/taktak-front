import React from "react";
import SideBarPub from "../sideBar/SideBarPub";
import SideBarAmelioreJournal from "../sideBar/SideBarAmelioreJournal";
import SideBarFoodlist from "../sideBar/SideBarFoodlist";
import SideBarPlusLus from "../sideBar/SideBarPlusLus";

function BestiesSideBar(props) {
    
    return (
      <div className="feed-secondary">
        <SideBarPub />
        <SideBarAmelioreJournal />
        <div className="separator" />
        <SideBarFoodlist />
        <div className="separator" />
        <SideBarPlusLus />
      </div>  
    );
}

BestiesSideBar.propTypes = {};

export default BestiesSideBar;