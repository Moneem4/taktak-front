import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import CheckinLocationCard from "./checkins/CheckinLocationCard";
import { UserContext } from "../../context/UserContext";
import LocationCheckins from "./LocationCheckins";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function Checkins(props) {
  const { selectedUser } = props;

  const [checkins, setCheckins] = useState(null);
  const { getCheckinsByUserId } = useContext(UserContext);
  const [tab, setTab] = useState([]);
  let trimData = {};

  const [locations, setLocations] = useState(null);

  useEffect(() => {
    getCheckinsByUserId(selectedUser.userId, setCheckins);
    if (checkins) {
      const grouper = checkins.map((el) => ({
        location: el.location,
        restaurent: el.restaurantId,
      }));
      for (let index = 0; index < grouper.length; index++) {
        const group = grouper[index];
        let key = group[Object.keys(group)[1]];

        let primaryKey = group[Object.keys(group)[0]];
        if (trimData[primaryKey]) {
          if (trimData[primaryKey][key]) {
            trimData[primaryKey][key].push(checkins[index]);
          } else {
            trimData[primaryKey][key] = [];

            trimData[primaryKey][key].push(checkins[index]);
          }
        } else {
          trimData[primaryKey] = {};

          trimData[primaryKey][key] = [];

          trimData[primaryKey][key].push(checkins[index]);
        }
      }
      setTab(
        Object.keys(trimData).map((el) => (
          <CheckinLocationCard
            selectedUser={selectedUser}
            name={el}
            checkins={trimData[el]}
            allcheckins={checkins}
          />
        ))
      );
      console.log(tab);
    }
    console.log("trimdata", trimData);
    setLocations(trimData);
  }, [checkins]);

  useEffect(() => {
    console.log("checkins", checkins);
    setLocations(trimData);
  }, [checkins]);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path={`/profile/:${selectedUser.userId}/checkins/`}
          component={() => (
            <div className="tabs-panel is-active" id="panel1">
              <div className="check-in">
                <div className="check-in-first">
                  <div className="check-in-header">
                    {checkins && checkins.length && (
                      <span className="checkin-label">
                        Lieux <strong> </strong>
                      </span>
                    )}

                    {/* <span className="checkin-options">
              Les plus récents
              <i className="fal fa-sort-down" aria-hidden="true" />
            </span> */}
                  </div>
                  <div className="check-in-body">{tab}</div>
                </div>
              </div>
            </div>
          )}
        />

        <Route
          exact
          path={`/profile/:${selectedUser.userId}/checkins/:location`}
          component={() => (
            <LocationCheckins
              // isntme={isntme}
              selectedUser={selectedUser}
              checkins={checkins}
              locations={locations}
            />
          )}
        />
      </Switch>
    </Router>
  );
}

Checkins.propTypes = {};

export default Checkins;
