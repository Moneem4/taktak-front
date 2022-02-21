import React, { useState, useContext, useEffect } from "react";
import Modal from "../../util/UtilModal";
import ReactStars from "react-rating-stars-component";
import { RestaurantContext } from "../../../context/RestaurantContext";

function RestauranCard(props) {
  const { isRestaurantOpen } = useContext(RestaurantContext);
  const { restaurant } = props;
  const [showModalRating, setShowModalRating] = useState(false);
  const openModalRating = () => {
    setShowModalRating(true);
  };

  const firstExample = {
    size: 10,
    value: props.restaurant.restaurantRate,
    edit: false,
  };

  console.log(props.restaurant, "props");

  var ho = new Date(restaurant.openingTime.timeFrom).getHours();
  var mo = new Date(restaurant.openingTime.timeFrom).getMinutes();
  var hf = new Date(restaurant.openingTime.timeTo).getHours();
  var mf = new Date(restaurant.openingTime.timeTo).getMinutes();
  console.log(ho, mo, "homo");
  function pad(val) {
    return val < 10 ? "0" + val : val;
  }

  const [isOpen, setIsOpen] = useState();
  useEffect(() => {
    isRestaurantOpen(restaurant.openingTime, setIsOpen);
  }, [restaurant]);
  return (
    <div>
      {props.restaurant && (
        <div className="restaurant-with-info">
          <div className="slide-media">
            <img
              style={{ objectFit: "contain" }}
              src={`https://${props.restaurant.backgroundImage}`}
            />
          </div>
          <div className="slide-info">
            <div className="slide-info-header">
              <img src={`https://${props.restaurant.avatar}`} />
              <div className="name">
                <span className="restaurant-name">{props.restaurant.name}</span>
                <span className="restaurant-location">
                  <i className="icon-marker" />
                  {props.restaurant.location}
                </span>
              </div>
              <div style={{ marginLeft: "auto", marginTop: "-1rem" }}>
                <div onClick={openModalRating}>
                  <ReactStars {...firstExample} />
                </div>
              </div>
            </div>
            <div className="slide-info-body">
              <div className="time">
                <i className="icon-clock" />

                <span className="title">Horaires d’ouverture</span>
                {isOpen ? (
                  <span className="status" style={{ background: "#ff0000" }}>
                    ouvert
                  </span>
                ) : (
                  <span style={{ background: "#ff0000" }} className="status">
                    Closed
                  </span>
                )}
                <span className="_time">
                  {pad(ho)}:{pad(mo)} - {pad(hf)}:{pad(mf)}
                </span>
              </div>
        
              <div className="info">
                <i className="icon-info" />
                <span className="title">Infos utiles</span>
                <div className="_info">
                  {props.restaurant &&
                    props.restaurant.services &&
                    props.restaurant.services.map((el) => <span>{el}</span>)}
                </div>
              </div>
              {/* <div className="people-was-here">
              <div className="peoples">
                <div className="people">
                  <img src="../assets/img/avatar.png" />
                </div>
                <div className="people">
                  <img src="../assets/img/avatar.png" />
                </div>
                <div className="people">
                  <img src="../assets/img/avatar.png" />
                </div>
                <div className="people">
                  <img src="../assets/img/avatar.png" />
                </div>
              </div>
              <span>
                <strong>Ahmed</strong> et 12 autres étaient là !
              </span>
            </div>
          */}
            </div>
            <div className="slide-info-footer" />
          </div>
        </div>
      )}
      <Modal
        showModal={showModalRating}
        setShowModal={setShowModalRating}
        page="createRating"
        evaluatedId={props.restaurant._id}
        ratingType="RESTAURANT"
      />
    </div>
  );
}

export default RestauranCard;
