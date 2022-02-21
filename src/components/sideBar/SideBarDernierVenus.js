import React, {useContext} from 'react';
import { UiContext } from '../../context/UiContext';
import VenusItemCard from './VenusItemCard';

function SideBarDernierVenus(props) {
    const { venus } = useContext(UiContext);

    return (
      <div>
        <div className="title-feed-secondary">
          <span>Derniers venus</span>
        </div>
        <div className="profiles-last-comer" style={{height: 200, overflow: 'scroll', width : "auto" }}>
          {venus.map((item) => (
            <VenusItemCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    )
}

SideBarDernierVenus.propTypes = {

}

export default SideBarDernierVenus