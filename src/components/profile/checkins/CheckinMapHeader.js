import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function CheckinMapHeader(props) {
  console.log(props.name, "nameLocation");
  return (
    // <div>
    //   <h1>hounikaya</h1>
    // </div>
    <div className="check-in-map">
      <div className="check-in-map-header">
        <span className="map-label"> </span>
        <span className="map-options">
          Les plus récents
          <i className="fal fa-sort-down" aria-hidden="true" />
        </span>
      </div>
      <div className="check-in-map-body">
        <img src={props.locationImage} />
        <NavLink exact to={`/profile/:${props.selectedUser.userId}/checkins`}>
          <div className="retour">
            <i className="fal fa-long-arrow-left" />
            <span>Retour</span>
          </div>
        </NavLink>

        <div className="map-info">
          <span>
            <i className="icon-marker" />
            {props.name}
          </span>
          <span>
            <i className="fal fa-map-marker-smile" />
            {props.checkinsNumber} check'ins
          </span>
          <span>{props.restaurantsNumber} restaurants</span>
        </div>
      </div>
    </div>
  );
}

CheckinMapHeader.propTypes = {};

export default CheckinMapHeader;
