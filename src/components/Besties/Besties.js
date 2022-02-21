import React, {useState, useContext, useEffect} from 'react';
import { RestaurantContext } from '../../context/RestaurantContext';
import { UserContext } from "../../context/UserContext";
import BestiesSideBar from "./BestiesSideBar"; 
import RestaurantCardPost from '../post/RestaurantCardPost';
import PromoTakTak from '../ads/PromoTakTak';

function Besties(props) {
  const { getBestiesyUserId, getNotBesties } = useContext(RestaurantContext);
  const { activeUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const [restaurantsList, setRestaurantsList] = useState(null);
  const [notBestiesList, setNotBestiesList] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const items=restaurantsList && restaurantsList.map(el=><RestaurantCardPost restaurantPost={el}/>);
    const itemsNotBesties= notBestiesList && notBestiesList.map(el=><RestaurantCardPost restaurantPost={el}/>);

    useEffect(() => {
      getBestiesyUserId(activeUser.userId, setRestaurantsList);
      getNotBesties(setNotBestiesList);
    }, [props]);

    return (
      <div className="my-besties-page">   
        <div className="my-besties-page-content container">
          <div className="my-besties-page-content-feed">
            <div className="feed-main">
              <div className="search-result">
                <span className="number-result">Sousse, {restaurantsList && restaurantsList.length} restaurants trouvés</span>
                <div className="filter">
                  <div onClick={handleClick} >
                    <span>Les plus évalués </span>
                    <i className="fal fa-sort-down" aria-hidden="true" />
                  </div>
                  <div
                    className="filter-pane"
                    data-dropdown
                    data-auto-focus="true"
                    style={{ display: anchorEl ? "block" : "none" }}
                  >
                    <ul className="filtre-my-besties-items">
                      <li>
                        <div className="filter-header" onClick={handleClose}>
                          Filtrez l’affichage des restaurants
                          <i className="fal fa-sort-up" aria-hidden="true" />
                        </div>
                      </li>
                      <li>
                        <div className="filter-content">
                          <span className="content-title">Nouveaux</span>
                          <span className="content-title">Les plus évalués</span>
                          <span className="content-title">Les plus appreciés</span>
                          <span className="content-title">Les plus visités</span>
                          <span className="content-title">Les plus visités</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {items}
              {itemsNotBesties}
              <PromoTakTak />
            </div>
            <BestiesSideBar />
          </div>
        </div>       
      </div>
    )
}

Besties.propTypes = {

}

export default Besties

