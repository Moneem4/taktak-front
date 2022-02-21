import React, { useState, useContext, useEffect } from "react";
import { RestaurantContext } from "../../context/RestaurantContext";

function SideBarDernierVisites(props) {
  const { restaurant } = props;
  const [lastVisitors, setLastVisitors] = useState([]);
  const { restaurantLastVisitors } = useContext(RestaurantContext);

  useEffect(() => {
    restaurant && restaurantLastVisitors(restaurant._id, setLastVisitors);
  }, [props]);

  useEffect(() => {
  }, [lastVisitors]);
  
  return (
    <>
      {lastVisitors && (
        <div className="last-visit-restaurant">
          <div className="last-visit-restaurant-title">
            <span>Dernières visites à ce restaurant</span>
          </div>
          <div className="last-visit-restaurant-profil">
            {lastVisitors[0] && (
              <img src={`https://${lastVisitors[0].avatar}`} />
            )}
            {lastVisitors[1] && (
              <img src={`https://${lastVisitors[1].avatar}`} />
            )}
            {lastVisitors[2] && (
              <img src={`https://${lastVisitors[2].avatar}`} />
            )}

            <span style={lastVisitors.length < 3 && { paddingLeft: 25 }}>
              <strong>{lastVisitors[0] && lastVisitors[0].firstName}</strong>,
              <strong>{lastVisitors[1] && lastVisitors[1].firstName}</strong>
              {lastVisitors.length - 2 > 0 &&
                `et ${lastVisitors.length - 2} autres personnes`}
              {lastVisitors.length == 1 && ` a rendu visite à ce restaurant`}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

SideBarDernierVisites.propTypes = {};

export default SideBarDernierVisites;
