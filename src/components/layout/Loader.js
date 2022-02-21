import React from "react";
import { CircularProgress } from '@material-ui/core'
import chief from '../autourDeMoi/chief.svg'
import PropTypes from "prop-types";

function Loader(props) {
  return (
    <div id="loading" className="autour-de-moi-loading">
      <div className="loading-inner">
        <div>
          <CircularProgress
            className="chief"
            size={300}
            thickness={1.6}
            style={{ color: "#ff6900" }}
          />{" "}
          <img className="chief" src={chief} />
        </div>
      </div>
      <div className="loading-info">
        <span>Momtéééz!</span>
        <p>Bienvenue à notre mplateforme TAKTAK</p>
      </div>
    </div>
  );
}

Loader.propTypes = {};

export default Loader;
