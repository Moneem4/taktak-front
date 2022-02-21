import React, {useState, useEffect, useContext} from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";
import Post from "./Post";
import TableEvaluationEtoile from "./TableEvaluationEtoile";
import TableNewEvaluation from "./TableNewEvaluation";

function Evaluation(props) {
  const { restaurant } = props;
  const { getRatingsByRestaurantId } = useContext(RestaurantContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const [ratings, setRatings] = useState(null);
  useEffect(() => {
    getRatingsByRestaurantId(restaurant._id, setRatings);
  }, [props]);

  const handleClick = (event) => {
    console.log("anchor:", event.currentTarget);
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return ratings ? (
    <div className="tabs-panel is-active" id="panel4">
      <div className="evaluation-top">
        <TableEvaluationEtoile />
        <TableNewEvaluation />
      </div>
      <div className="evaluation">
        <div className="evaluation-header">
          <span className="evaluation-label">
            Avis <strong>{ratings.length}</strong>{" "}
          </span>
          <span className="evaluation-options">
            <div onClick={handleClick}>
              Les plus récents
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
          </span>
        </div>
      </div>
      {ratings.map((el) => (
        <Post avis={el} />
      ))}
    </div>
  ) : (
    <></>
  );
}

Evaluation.propTypes = {};

export default Evaluation;
