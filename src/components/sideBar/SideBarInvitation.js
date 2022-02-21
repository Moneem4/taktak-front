import React from 'react';

function SideBarInvitation(props) {
    
    return (
        <div className="invitation">
            <div className="invitation-first-title">
                <span>Invitez vos amis à visiter ce restaurant</span>
            </div>
            <div className="invitation-description">
                <span> Envoyez une invitation par e-mail pour nous </span>
                <span>rejoindre et recevez <strong style={{color: '#FD6A00'}}>100
                    TAKAK</strong> pour chaque</span>
                <span> <strong>5 inscriptions confirmées.</strong></span>
            </div>
            <div className="adress-mail">
                <span> Adresse e-mail</span>
                <div className="input-wra">
                    <input placeholder="Ex: mongi@email.com" />
                    <i className="fal fa-paper-plane plane" />
                </div>
            </div>
        </div>
    )
}

SideBarInvitation.propTypes = {

}

export default SideBarInvitation