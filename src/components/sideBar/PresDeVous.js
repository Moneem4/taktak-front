import React, {useContext} from 'react';
import { UiContext } from '../../context/UiContext';

function PresDeVous(props) {
    const {restaurant} = props;
    const {} = useContext(UiContext);

    return (
        <div className="shared-location">
            <div className="shared-location-first-title">
                <span>Vous êtes à Sousse</span>
            </div>
            <div className="shared-component-location-maps">
                <div>
                    <img src="../assets/img/svg/map.png" />
                </div>
                <div className="shared-profil">
                    <div className="title">
                        <span>Profiles de la même région que vous </span>
                    </div>
                    <div className="shared-component-profil-img">
                        <img src="../assets/img/Ellipse 378.png" />
                        <img src="../assets/img/Ellipse 379.png" />
                        <img src="../assets/img/Ellipse 380.png" />
                        <img src="../assets/img/Ellipse 381.png" />
                        <img src="../assets/img/Ellipse 382.png" />
                        <img src="../assets/img/Ellipse 383.png" />
                        <img src="../assets/img/Ellipse 384.png" />
                        <span id="profil-img-number">+13</span>
                    </div>
                </div>
                <div className="shared-restaurant">
                    <div className="title">
                        <span>Restaurants près de chez vous </span>
                    </div>
                    <div className="shared-restaurant-img">
                        <img src="../assets/img/357d3aecd0be6646f3d4d11f685fd7f5.png" />
                        <img src="../assets/img/87dca6b0c111744707fd2444a90cdfd4.png" />
                        <img src="../assets/img/5b2f41620c6b7c86ee12346c7302d100.png" />
                        <img src="../assets/img/3edbf28ac32161dc9746fe40538d3ace.png" />
                        <img src="../assets/img/726ac3be779fcf94630e79c38d5735ef.png" />
                        <span id="profil-img-number">+4</span>
                    </div>
                    <span className="show-all">Voir tout</span>
                </div>
            </div>
        </div>
    )
}

export default PresDeVous