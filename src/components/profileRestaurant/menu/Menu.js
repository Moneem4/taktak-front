import React, { useContext, useEffect, useState } from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";
import { UserContext } from "../../../context/UserContext";
import MenuCard from "./MenuCard";
import MenuHeader from "./MenuHeader";
import MenuList from "./MenuList";
import MenuCardPM from "./MenuCardPM";

function NavBarBlog(props) {
  const { restaurant, isMyResto } = props;
  const {
    getMenuData,
    category,
    articles,
    getPersonalizedMenuByUserIdRestaurantId,
    menuUpdated,
    getCategoryById,
    categoryItem,
  } = useContext(RestaurantContext);

  const { activeUser } = useContext(UserContext);

  const [categories, setCategories] = useState();
  const [articlesList, setArticlesList] = useState(null);
  useEffect(() => {
    getMenuData(restaurant.menuId, setCategories);
    getPersonalizedMenuByUserIdRestaurantId(
      activeUser.userId,
      restaurant._id,
      setArticlesList
    );
    getCategoryById(categoryItem);
  }, [props, menuUpdated]);

  return (
    <div className="tabs-panel is-active" id="panel3">
      <MenuHeader
        restaurant={restaurant}
        isMyResto={isMyResto}
        //articlesOfPmIdNum={articlesOfPmId.length}
      />

      <MenuList restaurant={restaurant} />

      <div className="menu">
        {category ? (
          category.articles ? (
            <span>
              Vous avez ajouté (
              <span style={{ color: "#131D28" }}>
                {category.articles.length}
              </span>
              ) articles dans {category.name}.
            </span>
          ) : (
            <span>
              Vous avez ajouté (<span style={{ color: "#131D28" }}>0</span>)
              articles dans {category.name}.
            </span>
          )
        ) : (
          <span>Vous avez ajouté 0 articles</span>
        )}
        <br />
        {category ? (
          articles ? (
            <div className="menu-first">
              <div className="menu-body">
                {articles.map((article) =>
                  isMyResto ? (
                    <MenuCard article={article} restaurant={restaurant} />
                  ) : (
                    <MenuCardPM
                      article={article}
                      restaurantId={restaurant._id}
                      articlesList={articlesList}
                    />
                  )
                )}
              </div>
            </div>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

NavBarBlog.propTypes = {};

export default NavBarBlog;
