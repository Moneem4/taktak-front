import React from 'react';

function AchevementRestoProfile(props) {
    const {restaurant} = props;
    
    return (
        <div className="completion">
            <img src= {restaurant.profileImage} style={{width: 50, height: 50, borderRadius: 5}} />
            <div className="completion-main">
                <div className="completion-title">
                    Achèvement du profil
                </div>
                <div className="completion-profil-cheched">
                    <i className="fa fa-square fa-2x checked" />
                    <i className="fa fa-square fa-2x checked" />
                    <i className="fa fa-square fa-2x checked" />
                    <i className="fa fa-square fa-2x checked" />
                    <i className="fa fa-square fa-2x" />
                    <i className="fa fa-square fa-2x" />
                    <span>Encore 2 étapes</span>
                </div>
            </div>
            <div className="icon-flech-right"> <span><i className="icon-small-arrow-right" /></span></div>
        </div>
    )
}

AchevementRestoProfile.propTypes = {

}

export default AchevementRestoProfile