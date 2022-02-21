import React from 'react';
import SideBarHeader from "../sideBar/SideBarHeader";
import AchevementRestoProfile from '../sideBar/AchevementRestoProfile';
import SideBarPromo from '../sideBar/SideBarPromo';
import SideBarMap from '../sideBar/SideBarMap';
import SideBarDernierVisites from '../sideBar/SideBarDernierVisites';
import SideBarInvitation from '../sideBar/SideBarInvitation';
import SideBarConfidentialite from '../sideBar/SideBarConfidentialite';

function SidebarProfileResto(props) {
    const {restaurant} = props;
    
    return (
      <div className="feed-secondary">
        <SideBarHeader restaurant={restaurant} />
        <AchevementRestoProfile restaurant={restaurant} />
              
        <a className="feed-secondary-gestuin-de-residus" href="gestion-de-residus.html">
          <div className="left-side">
            <i className="fal fa-comment-alt-exclamation" />
            <span>Gestion des résidus</span>
          </div>
          <i className="fal fa-question-square question" />
        </a>
              
        <SideBarPromo restaurant={restaurant} />
        <SideBarMap restaurant={restaurant} />
        <SideBarDernierVisites restaurant={restaurant} />
        <SideBarInvitation />
        <SideBarConfidentialite />
              
      </div>
    )
}

SidebarProfileResto.propTypes = {

}

export default SidebarProfileResto