import React, {useContext} from 'react';
import { UiContext } from '../../context/UiContext';
import RestoItemCard from './RestoItemCard';

function SideBarSuggestionResto(props) {
    const {} = props;
    const { restaurants } = useContext(UiContext);

    return (
      <div>
        <div className="title-feed-secondary">
          Suggestion des restaurants
        </div>
        <div className="restaurants" style={{ height: 260, overflow: 'scroll'}}>
          {restaurants.map((item) => (
            <RestoItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    )
}

SideBarSuggestionResto.propTypes = { }

export default SideBarSuggestionResto