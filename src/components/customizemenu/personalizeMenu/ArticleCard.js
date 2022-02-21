import React, { useState, useContext } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Rating from "@material-ui/lab/Rating";
import { RestaurantContext } from "../../../context/RestaurantContext";

const styles = (theme) => ({
  styleClicked: {
    border: "1px solid #ff6900",
  },
  styleUnClicked: {
    border: "1px solid #ffffff",
  },
});

function ArticleCard(props) {
  const { article, classes } = props;
  const { menuPersonaliser, setMenuPersonaliser } = useContext(RestaurantContext);
  const [clicked, setClicked] = useState();

  const updateState = (value) => {
    setClicked(value);
    setMenuPersonaliser({ ...menuPersonaliser, size: value });
  };
  
  return (
    <div className="customize-order-high-top">
      <div className="customize-order-high-top-left-side">
        <span className="food-name-article">{article.name}</span>
        <div className="evalutaion">
          <span className="evalutaion-title">Evaluez cet article</span>
          <Rating name="read-only" value={article.rate} readOnly />
        </div>
     </div>
    </div>
  );
}

ArticleCard.propTypes = {};

export default withStyles(styles)(ArticleCard);
