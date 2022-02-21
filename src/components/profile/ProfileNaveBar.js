import React from "react";
import { NavLink } from "react-router-dom";

function ProfileNaveBar(props) {
  const { selectedUser } = props;

  return (
    <div>
      <ul className="tabs" data-tabs id="example-tabs">
        <li>
          <NavLink
            className="tabs-title tabs-Description"
            activeClassName="tabs-title tabs-Description is-active"
            exact
            to={`/profile/${selectedUser.userId}`}
          >
            <a>Description</a>
          </NavLink>
        </li>

        <li>
          <NavLink
            exact
            to={`/profile/${selectedUser.userId}/photos`}
            className="tabs-title tabs-photos"
            activeClassName="tabs-title tabs-photos is-active"
          >
            <a>Photos</a>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="tabs-title tabs-Check"
            activeClassName="tabs-title tabs-Check is-active"
            exact
            to={`/profile/${selectedUser.userId}/checkins`}
          >
            <a>Check’ins</a>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="tabs-title tabs-evaluations"
            activeClassName="tabs-title tabs-evaluations is-active"
            exact
            to={`/profile/${selectedUser.userId}/evaluations`}
          >
            <a>Evaluations</a>
          </NavLink>
        </li>
        {!props.isntme ? (
          <li>
            <NavLink
              className="tabs-title tabs-dashboard"
              activeClassName="tabs-title tabs-dashboard is-active"
              to={`/profile/${selectedUser.userId}/dashboard`}
            >
              <a>DashBoard</a>
            </NavLink>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}

ProfileNaveBar.propTypes = {};

export default ProfileNaveBar;
