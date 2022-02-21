import React, { useContext, useEffect, useState } from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  styleClicked: {
    border: "1px solid #ff6900",
    borderRadius: 5,
    width: "93% !important",
  },
  styleUnClicked: {
    border: "1px solid #484848",
  },
});

function MenuList(props) {
  const { classes, restaurant, type } = props;
  const {
    selectedCategory,
    setSelectedCategory,
    getCategoryById,
    getMenuData,
    setCategoryItem,
  } = useContext(RestaurantContext);

  const [categories, setCategories] = useState();
  useEffect(() => {
    getMenuData(restaurant.menuId, setCategories);
  }, [props]);

  const handleClickChange = (value) => {
    setSelectedCategory(value);
    //getCategoryById(value, setCategoryArticles);
    setCategoryItem(value);
  };

  return (
    <div>
      {categories ? (
        <div className="menu-picker">
          <div className="arrow">
            <i className="icon-small-arrow-right" />
          </div>
          <div className="menu-p">
            <div className="menu-picker-items">
              {categories.map((el) => (
                <button
                  className="picker-item"
                  id={el._id}
                  onClick={(e) => handleClickChange(el._id)}
                  key={el._id}
                  style={
                    selectedCategory === el._id
                      ? {
                          border: "1px solid #ff6900",
                          borderRadius: 5,
                          width: "93% !important",
                        }
                      : { border: "1px solid #b9b5b5" }
                  }
                >
                  {el.name}
                </button>
              ))}
            </div>
          </div>
          <div className="arrow last">
            <i className="icon-small-arrow-right" />
          </div>
          <span style={{ display: type === "menu" ? "block" : "none" }}>
            <i className="far fa-sliders-h set" />
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default withStyles(styles)(MenuList);
