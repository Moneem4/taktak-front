import React, { useContext } from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";

function ArticleQuantite(props) {
  const { classes } = props;
  const { personalizeArticle, setPersonalizeArticle } = useContext(RestaurantContext);

  function IncrementItem() {
    const data = {
      quantity: personalizeArticle.quantity + 1,
    };

    setPersonalizeArticle({
      ...personalizeArticle,
      quantity: personalizeArticle.quantity + 1,
    });
  }

  function DecreaseItem() {
    if (personalizeArticle.quantity > 1) {
      const data = {
        quantity: personalizeArticle.quantity - 1,
      };
      
      setPersonalizeArticle({
        ...personalizeArticle,
        quantity: personalizeArticle.quantity - 1,
      });
    }
  }
  
const articleOptionPrice= personalizeArticle.newIngredients && personalizeArticle.newIngredients.map((el)=>el.optionPrice);

var sum = 0;
if(articleOptionPrice)
{
  for( var i = 0; i < articleOptionPrice.length; i++ ){
      sum += articleOptionPrice[i] ; 
  }
}

return (
    <div className="customize-order-img">
      <img src={`https://${personalizeArticle.image}`} heigth={50} />
      <div className="details-menu-bottom">
        <div className="quantity-title">
          <span>Quantité</span>
          <div className="quantity-numbrer">
            <i className="far fa-minus-square" onClick={DecreaseItem} />
            <span>{personalizeArticle.quantity}</span>
            <i className="far fa-plus-square" onClick={() => IncrementItem()} />
          </div>
        </div>
        <div className="total-price">
          <span className="price-title">Prix total</span>
          <span className="price-number">
            {
              sum ? personalizeArticle.price.toFixed(2) * personalizeArticle.quantity + sum
            : 
              personalizeArticle.price.toFixed(2) * personalizeArticle.quantity 
            }
          </span>
        </div>
      </div>
    </div>
  );
}

ArticleQuantite.propTypes = {};

export default ArticleQuantite;
