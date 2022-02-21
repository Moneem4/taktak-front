import React from 'react';

function SideBarConfidentialite(props) {
    
    return (
        <div className="f-shared">
            <div className="left-side">
                <span>Politique de confidentialité</span>
            </div>
            <div className="right-side">
                <span>Français</span>
                <i className="fal fa-globe-africa" />
            </div>
        </div>
    )
}

SideBarConfidentialite.propTypes = {

}

export default SideBarConfidentialite