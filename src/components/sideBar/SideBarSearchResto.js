import React, {useState} from 'react';
import Map from '../map/App';
import SideBarTopFoodist from "../sideBar/SideBarTopFoodist";
import SideBarAmelioreJournal from "../sideBar/SideBarAmelioreJournal"; 
import SideBarSuggestionResto from "../sideBar/SideBarSuggestionResto";
import SideBarPlusLus from "../sideBar/SideBarPlusLus";

function SideBarSearchResto(props) {
    
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
    });

    return (
      <div className="feed-secondary">
        <div style={{height: 300}}>
          <Map setPlace={(value) =>
            setEventFormData({ ...eventFormData, ['venue']: value })
          } />
        </div>
        <div className="separator" />
        <SideBarAmelioreJournal />
        <div className="separator" />
        <SideBarSuggestionResto />
        <div className="separator" />
        <SideBarPlusLus />
      </div>  
    );
}

export default SideBarSearchResto;