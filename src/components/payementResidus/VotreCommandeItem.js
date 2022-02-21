import React, { useContext, useState } from "react";
import { UiContext } from "../../context/UiContext";
import { UserContext } from "../../context/UserContext";

function VotreCommandeItem(props) {
  const { article } = props;
  const { getIndex } = useContext(UiContext);
  const { commandeResidu, setCommandeResidu } = useContext(UserContext);
  
  function IncrementItem() {
    var index = getIndex(article._id, commandeResidu.articles, '_id');
    setCommandeResidu((prevCommandeResidu) => {
      let items = {...prevCommandeResidu};
      let articles = [...items.articles];
      let item = { ...articles[index] };
      const updatedQuantity = {...item, quantity: item.quantity + 1};
      articles[index] = updatedQuantity;
      const updatedArticle = {
        ...prevCommandeResidu,
        articles: articles,
      };

      return updatedArticle;
    });
  }
 
  function DecreaseItem() {
    var index = getIndex(article._id, commandeResidu.articles, '_id');
    if (article.quantity > 1) {
      setCommandeResidu((prevCommandeResidu) => {
        let items = {...prevCommandeResidu};
        let articles = [...items.articles];
        let item = { ...articles[index] };
        const updatedQuantity = {...item, quantity: item.quantity - 1};
        articles[index] = updatedQuantity;
        const updatedArticle = {
          ...prevCommandeResidu,
          articles: articles,
        };

        return updatedArticle;
      });
    }
  }

  function removeArticle() {    
    setCommandeResidu((prevCommandeResidu) => {
      let items = {...prevCommandeResidu};
      let articles = [...items.articles];

      const indexArticle = articles.findIndex((el) => el._id === article._id);
      articles.splice(indexArticle, 1);
      const updatedArticle = {
        ...prevCommandeResidu,
        articles: articles,
      };

      return updatedArticle;
    });
  }

  return (
    <div className="paiement-recap">
      <img src={`https://${article.image}`} className="paiement-recap-img" />
      <div className="paiement-recap-main">
        <span className="food-name">{article.name}</span>
        {<span className="food-description"> {article.ingredients.map((el) => `#${el} `)} </span>}
      </div>
      <div className="paiement">
        <div className="Qte">
          <span className="Qte-title">Quantité</span>
          <i className="fal fa-minus-square moins" onClick={DecreaseItem}/>
          <span className="Qte-number">{article.quantity}</span>
          <i className="fal fa-plus-square plus" onClick={IncrementItem}/>
        </div>
        <div className="price">
          <span className="total-price">Prix total</span>
          <span className="price-number">{article.price * article.quantity} dt</span>
        </div>
      </div>
      <div className="remove">
        <i className="fal fa-trash-alt" onClick={removeArticle} />
      </div>
    </div>
  );
}

VotreCommandeItem.propTypes = {};

export default VotreCommandeItem;
