import React, {useContext} from 'react';
import { UiContext } from '../../context/UiContext';

function SideBarContact(props) {
    const {restaurant} = props;
    const {} = useContext(UiContext);

    return (
        <div className="invite-friends">
            <div className="invite-friends-title">
                Invitez vos amis à nous rejoindre
            </div>
            <p>
                Envoyez une invitation par e-mail pour nous rejoindre et recevez
                <strong className="highlighted">100 TAKAK</strong> pour chaque{" "}
                <strong> 5 inscriptions confirmées</strong>.
            </p>
            <div className="invite-input">
                <label>Adresse e-mail</label>
                <input type="text" placeholder="Ex: mongi@email.com" />
                <i className="fal fa-paper-plane" />
             </div>
        </div>
    )
}

export default SideBarContact