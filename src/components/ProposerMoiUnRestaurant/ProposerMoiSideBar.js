import React from "react";

import SideBarPub from "../sideBar/SideBarPub";
import SideBarDernierVenus from "../sideBar/SideBarDernierVenus";
import SideBarSuggestionResto from "../sideBar/SideBarSuggestionResto";

import Rating from "@material-ui/lab/Rating";


function ProposerMoiSideBar(props) {
    
    return (

      <div className="feed-secondary">
        <SideBarPub />
        <SideBarDernierVenus />
        <SideBarSuggestionResto />
      </div>    

    );
}

ProposerMoiSideBar.propTypes = { };

export default ProposerMoiSideBar;