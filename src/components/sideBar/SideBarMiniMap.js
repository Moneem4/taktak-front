import React, {useContext} from 'react';
import { UiContext } from '../../context/UiContext';

function SideBarMiniMap(props) {
    const { restaurants } = useContext(UiContext);

    return (
        <div className="maps">
            <img src="../assets/img/maps.png" alt="" />
            <div className="show-134-restos">
                <span>Afficher nos {restaurants.length} Restos sur map</span>
            </div>
        </div>
    )
}

SideBarMiniMap.propTypes = { }

export default SideBarMiniMap