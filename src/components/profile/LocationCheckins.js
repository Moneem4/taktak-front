import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import CheckinMapHeader from "./checkins/CheckinMapHeader";
import RestauranCard from "./checkins/RestauranCard";
import { useParams } from "react-router-dom";
import { RestaurantContext } from "../../context/RestaurantContext";
import { values } from "regenerator-runtime";

function LocationCheckins(props) {
  const { selectedUser, locations, checkins } = props;
  const { getRestaurantData, restaurantsByIds } = useContext(RestaurantContext);

  const params = useParams();
  console.log("params", params);
  const [location, setLocation] = useState({
    [params.location]: locations[params.location],
  });
  console.log("loctionselected", location);
  // useEffect(() => {
  //   setLocation(locations[params.location]);
  //   console.log("loctionselected", location);
  // }, [locations]);

  // useEffect(() => {
  //   const id = Object.values(location)[0][0].restaurantId;
  //   getRestaurantData(id, setRestaurants);
  // }, [location]);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsIds, setRestaurantsIds] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [restaurantsNumber, setRestaurantsNumber] = useState(null);
  const [checkinsNumber, setCheckinsNumber] = useState(null);
  const [cup, setCup] = useState(null);

  useEffect(() => {
    setLocationName(Object.keys(location));
    console.log(Object.values(Object.values(location)[0]), "restaurantsId");
    setRestaurantsIds(Object.keys(Object.values(location)[0]));
    setRestaurantsNumber(Object.keys(Object.values(location)[0]).length);
    let somme = 0;
    for (let i = 0; i < Object.values(Object.values(location)[0]).length; i++) {
      const element = Object.values(Object.values(location)[0])[i];
      for (let j = 0; j < element.length; j++) {
        somme++;
      }
    }
    console.log("somme", somme);
    setCheckinsNumber(somme);
  }, [location]);

  // useEffect(() => {
  //   restaurantsIds &&
  //     restaurantsIds.length > 0 &&
  //     console.log("restaurantsIds", restaurantsIds[0]);

  //   restaurantsIds &&
  //     restaurantsIds.forEach((element) => {
  //       console.log("element", element);
  //       getRestaurantData(element).then((data) => console.log(data));
  //     });
  // }, [restaurantsIds]);

  function removeDuplicated(arr) {
    return arr.filter((value, index) => arr.indexOf(value) === index);
  }
  const storeRestaurants = async () => {
    await restaurantsIds.map((element) => {
      // return getRestaurantData(element,setCup).then(async (data) => {
      //   console.log("dddddddd", element, data);
      //   var joined = restaurants.concat(data);
      //   // setRestaurants(joined)
      //   await setRestaurants((prev) => {
      //     return [...prev, data];
      //   });
      //   return data;
      // });
      getRestaurantData(element, setCup);
      console.log("cup", cup);
      let a = { ...cup };
      setRestaurants((prev) => {
        return [...prev, a];
      });
    });
  };
  useEffect(() => {
    // getRestaurantData(id, setRestaurants);
    // restaurantsIds && storeRestaurants();
    restaurantsIds &&
      restaurantsIds.length &&
      restaurantsByIds(restaurantsIds, setRestaurants);
    // restaurants && setRestaurants((prev) => removeDuplicated(prev));
  }, [restaurantsIds]);

  // useEffect(() => {
  //   var filtered = restaurants.filter(function (el) {
  //     return el != null;
  //   });
  //   restaurants && setRestaurants(filtered);
  // }, [restaurantsIds]);
  useEffect(() => {
    console.log(restaurants, "kakaka");
  }, [restaurants]);
  let tab;

  if (restaurants && restaurants.length >= 1) {
    tab = restaurants.map((el) => <RestauranCard restaurant={el} />);
  }

  useEffect(() => {
    console.log(restaurants, "ijaminna");
  }, [restaurants]);
  return (
    <div className="check-in">
      <div className="check-in-second">
        <CheckinMapHeader
          selectedUser={selectedUser}
          name={locationName}
          restaurantsNumber={restaurantsNumber}
          checkinsNumber={checkinsNumber}
          // placesNumber = {5}
          locationImage={"https://picsum.photos/200/300"}
        />

        {restaurants.length > 0 && tab}
      </div>
    </div>
  );
}

LocationCheckins.propTypes = {};

export default LocationCheckins;
