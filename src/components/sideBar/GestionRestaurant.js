import React, {useContext} from 'react';
import { UiContext } from '../../context/UiContext';

function GestionRestaurant(props) {
    const {restaurant} = props;
    const {} = useContext(UiContext);

    return (
        <div className="restaurant-management">
            <div className="title">
                <i className="fal fa-utensils-alt" />
                <span>Gestion des restaurants</span>
            </div>
            <div className="restaurant-item">
                <img
                    src="../assets/img/88d2ce29261b4fdd1f5bf2e2bfb17b9b.png"
                    alt=""
                />
                <div className="information">
                    <span className="name">BUBO Resto</span>
                    <div className="dashboard">
                        <i className="fal fa-tachometer-alt-fast" />
                        <span>Tableau de board</span>
                    </div>
                </div>
                <div></div>
            </div>
            <div className="restaurant-item">
                <img
                    src="../assets/img/87dca6b0c111744707fd2444a90cdfd4.png"
                    alt=""
                />
                <div className="information">
                    <span className="name">BUBO Resto</span>
                    <div className="dashboard">
                        <i className="fal fa-tachometer-alt-fast" />
                        <span>Tableau de board</span>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default GestionRestaurant