import React, { useContext } from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";
import { NavLink } from "react-router-dom";
import CustomizeMenuHeader from "../../customizemenu/listArticles/CustomizeMenuHeader";

function MenuHeader(props) {
  const { restaurant, isMyResto, articlesOfPmIdNum } = props;
  const { categories } = useContext(RestaurantContext);

  return (
    <div>
      <div
        className="add-article"
        style={{ display: isMyResto ? "block" : "none" }}
      >
        <div className="add-article-left">
          <img src="../../assets/img/svg/smile-happy.svg" />
          <div>
            <span>Votre panier</span>
            {categories ? (
              <span>{categories.length} catégories . 0 articles</span>
            ) : (
              <span>0 catégories . 0 articles</span>
            )}
          </div>
        </div>
        <div className="add-article-right">
          <NavLink
            exact
            to={`/profileRestaurant/` + restaurant._id + `/ajouterCategories`}
          >
            <button> Ajouter un article </button>
          </NavLink>
        </div>
      </div>
      <CustomizeMenuHeader
        isMyResto={isMyResto}
        articlesOfPmIdNum={articlesOfPmIdNum}
        restaurant={restaurant}
      />
    </div>
  );
}

MenuHeader.propTypes = {};

export default MenuHeader;
