import React from 'react';
import CordonneesResto from './CordonneesResto';
import DerniersPosts from './DerniersPosts';
import EnBref from './EnBref';
import Followers from './Followers';

function DescriptionResto(props) {
    const {restaurant, isMyResto} = props;

    return (
      <div className="tabs-content" data-tabs-content="example-tabs">
        <div className="tabs-panel is-active" id="panel1">
          <EnBref restaurant={restaurant} isMyResto={isMyResto} />
          <CordonneesResto restaurant={restaurant} isMyResto={isMyResto}/>    
          <Followers restaurantId={restaurant._id} isMyResto={isMyResto}/>     
          {/*<DerniersPosts restaurant={restaurant}/>*/}
        </div>
      </div>
    )
}

DescriptionResto.propTypes = {

}

export default DescriptionResto