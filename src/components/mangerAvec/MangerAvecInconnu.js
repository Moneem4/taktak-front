import React, {useContext, useState} from 'react';
import { UiContext } from '../../context/UiContext';
import AutourDeVous from '../sideBar/AutourDeVous';
import FicheRestaurant from '../sideBar/FicheResataurant';
import FoodistesNearby from './FoodistesNearby';
import Foodlists from './Foodlists';
import MangerAvec from './MangerAvec';
import MaPosition from './MaPosition';
import Map from '../map/App';

function MangerAvecInconnu(props) {
    const {} = props;
    const {getIndex, restaurants} = useContext(UiContext);
    let restaurant = "La Badira"
    var index = getIndex(restaurant, restaurants, 'name');

    const [eventFormData, setEventFormData] = useState({
      creatorId: 1,
      name: 'event',
      date: '22-12-2021',
      venue: 'venue',
      location: 'location',
      capacity: 20,
      description: 'aaaa',
      maxPurchase: 20,
      accessType: 'PUBLIC',
      eventTopic: 'PARTY',
      validation: 'ADMINISTRATOR',
      entryType: 'TICKET',
      picture: '',
    })

    return (
      <div className="eat-with-Stranger">
        <div className="eat-with-Stranger-content ">
          <div style={{height: 200}}>
            <Map setPlace={(value) =>
              setEventFormData({ ...eventFormData, ['venue']: value })
            } />
          </div>
          <div className="eat-with-Stranger-page-content container">
            <div className="content-main">
              <MangerAvec restaurant={restaurants[index]} />
              <Foodlists restaurant={restaurants[index]} />
              <FoodistesNearby restaurant={restaurants[index]} />
            </div>
            <div className="content-secondary">
              <FicheRestaurant restaurant={restaurants[index]}/>
              <AutourDeVous />
            </div>
          </div>
        </div>
      </div>
    )
}

MangerAvecInconnu.propTypes = { }

export default MangerAvecInconnu