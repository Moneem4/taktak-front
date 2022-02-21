import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function CheckinLocationCard(props) {
  const {
    selectedUser: { userId },
    name,
    checkins,
  } = props;

  const [checkinsCount, setCheckinsCount] = useState(0);
  const [restuarentsChecked, setRestuarentsChecked] = useState(0);
  useEffect(() => {
    console.log(checkins);
    if (checkins) {
      let restaurents = Object.keys(checkins);
      setRestuarentsChecked(restaurents.length);
    }
  }, [props]);
  return (
    <NavLink
      className="tabs-title tabs-Description"
      activeClassName="tabs-title tabs-Description is-active"
      exact
      to={`/profile/${userId}/checkins/${name}`}
    >
      <div className="check-in-place">
        <div className="place-media">
          <img src={"https://picsum.photos/430"} />
          <div className="check-in-place-hover">
            <i className="fal fa-map-marker-smile"></i>
            {props.allcheckins && props.allcheckins.length && (
              <span>{props.allcheckins.length} check'ins</span>
            )}
          </div>
        </div>
        <div className="place-info">
          <span>
            <i className="icon-marker" /> {props.name}
          </span>
          <span className="place-restaurants">
            {restuarentsChecked} restaurants
          </span>
        </div>
      </div>
    </NavLink>
  );
}

CheckinLocationCard.propTypes = {};

export default CheckinLocationCard;
