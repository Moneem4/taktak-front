import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import ArticleQuantite from "./ArticleQuantite";
import IngredientsSection from "./IngredientsSection";
import AddIngredients from "./AddIngredients";
import { RestaurantContext } from "../../../context/RestaurantContext";

function PersonalizeMenu(props) {
  const { personalizeArticle, updateArticleOfPersonalizedMenu ,setPersonalizeArticle, getArticleOfPmById} = useContext(RestaurantContext);

  const getUrlFromPathResto = () => {
    const paths = window.location.href.split("/");
    let url = paths[4];
    return url;
  };

  const getUrlFromPath = () => {
    const paths = window.location.href.split("/");
    let url = paths[6];
    return url;
  };

  useEffect(() => {
    getArticleOfPmById(getUrlFromPath(), setPersonalizeArticle);
  }, []);

  const confirmUpdateMenu = () => {
    const list = personalizeArticle.newIngredients && personalizeArticle.newIngredients.map(function(num) {
      return num.optionName;
    });
     
    const data = {
      quantity: personalizeArticle.quantity,
      rate: personalizeArticle.rate,
      size: personalizeArticle.size,
      ingredients: personalizeArticle.ingredients,
      newIngredients: list,
      articleOptionsId: personalizeArticle.articleOptionsId
    };

    updateArticleOfPersonalizedMenu(personalizeArticle._id, data);
  };

  return personalizeArticle && (
    <div className="third-panel3">
      <div className="menu-to-confirmed">
        <NavLink
          exact
          to={`/profileRestaurant/` + getUrlFromPathResto() + `/personalizedMenu`}
        >
          <div className="arrow-left-iconTh3">
            <i className="fal fa-long-arrow-alt-left" />
          </div>
        </NavLink>
        <span className="personalization-of-ingredients">
          Personnalisation des ingrédients
        </span>
        <NavLink
          exact
          to={`/profileRestaurant/` + getUrlFromPathResto() + `/customizeMenu`}
        >
          <button className="confirm" onClick={confirmUpdateMenu}>
            Confirmer
          </button>
        </NavLink>
      </div>
      <div className="customize-order"> 
        <ArticleCard article={personalizeArticle} />
        <ArticleQuantite />
        <IngredientsSection />
        <AddIngredients />
      </div>
      <div className="menu-to-confirmed-bottom">
        <NavLink
          exact
          to={`/profileRestaurant/` + getUrlFromPath() + `/personalizedMenu`}
        >
          <div className="arrow-left-iconTh3">
            <i className="fal fa-long-arrow-alt-left" />
          </div>
        </NavLink>
        <NavLink
          exact
          to={`/profileRestaurant/` + getUrlFromPathResto() + `/customizeMenu`}
        >
          <button
            className="confirm"
            onClick={confirmUpdateMenu}
            style={{ marginLeft: "80%" }}
          >
            Confirmer
          </button>
        </NavLink>
      </div>
    </div>
  );
}

PersonalizeMenu.propTypes = {};

export default PersonalizeMenu;
