import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { RestaurantContext } from "../../../context/RestaurantContext";

function CustomizeMenuHeader(props) {
  const { restaurant, isMyResto, articlesOfPmIdNum } = props;

  return (
    <div style={{ display: isMyResto ? "none" : "block" }}>
      <div className="menu">
        <div className="add-article-Menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="41.286"
            height="30.287"
            viewBox="0 0 41.286 30.287"
          >
            <defs>
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    "\n                            .a {\n                              fill: orange;\n                            }\n                          ",
                }}
              />
            </defs>
            <g transform="translate(7.75 -0.153)">
              <g transform="translate(-7.75 -63.784)">
                <circle
                  className="a"
                  cx="2.064"
                  cy="2.064"
                  r="2.064"
                  transform="translate(18.579 64.635)"
                />
                <path
                  className="a"
                  d="M270.45,190.55a.688.688,0,0,1-.683-.612c-.668-6.006-6.812-11.831-13.148-12.462a.688.688,0,0,1,.138-1.369c7.048.7,13.631,6.97,14.377,13.683a.688.688,0,0,1-.608.757.711.711,0,0,1-.076,0Z"
                  transform="translate(-233.98 -102.519)"
                />
                <path
                  className="a"
                  d="M3.441,94.224H37.846a3.445,3.445,0,0,0,3.441-3.441A.688.688,0,0,0,40.6,90.1h-.124l-.765-3.825A19.426,19.426,0,0,0,21.331,70.657v-1.3a2.752,2.752,0,1,0-1.376,0v1.3A19.427,19.427,0,0,0,1.577,86.27L.812,90.1H.688A.688.688,0,0,0,0,90.783,3.445,3.445,0,0,0,3.441,94.224ZM19.267,66.7a1.376,1.376,0,1,1,1.376,1.376A1.376,1.376,0,0,1,19.267,66.7ZM2.926,86.54a18.067,18.067,0,0,1,35.433,0L39.07,90.1H2.216Zm36.866,4.931a2.068,2.068,0,0,1-1.947,1.376H3.441a2.068,2.068,0,0,1-1.947-1.376Z"
                  transform="translate(0 0)"
                />
                <path
                  className="a"
                  d="M256.738,176.067a.69.69,0,0,0-.138,1.373c6.336.634,12.479,6.459,13.147,12.465a.688.688,0,0,0,.684.609.7.7,0,0,0,.076,0,.688.688,0,0,0,.608-.757c-.747-6.715-7.33-12.981-14.378-13.686Z"
                  transform="translate(-233.962 -102.483)"
                />
              </g>
            </g>
          </svg>
          <div className="add-article-left">
            <span className="your-menu">Votre panier</span>
            {/*<span className="vide"> (vide) </span>*/}
            <span
              className="nbrs-of-articles"
              style={{ color: "#ffa500", fontSize: "1.6rem" }}
            >
              (
              <span style={{ color: "white", fontSize: "1.6rem" }}>
                {articlesOfPmIdNum} articles
              </span>
              )
            </span>
          </div>
          <NavLink
            exact
            to={`/profileRestaurant/` + restaurant._id + `/personalizedMenu`}
          >
            <div className="add-article-right">
              <button> Consulter Panier </button>
            </div>
          </NavLink>
        </div>
        <div className="square-violet">
          <i className="far fa-info-square info" />
          <span className="info-square-violet">
            Vous pouvez personnaliser vos articles dans l’étape suivante.
          </span>
        </div>
      </div>
    </div>
  );
}

CustomizeMenuHeader.propTypes = {};

export default CustomizeMenuHeader;
