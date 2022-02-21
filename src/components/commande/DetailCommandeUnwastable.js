import React from "react";

function DetailCommandeUnwastable(props) {
  const { article } = props;

  return (
    <div className="details-commande-food">
      <div className="left-side">
        <img src={`https://${article.image}`} className="details-commande-img" />
        <div className="main">
          <span className="food-name">{article.name}</span>
          <span className="food-description">{article.ingredients.map((el) => `#${el} `)}</span>

          <div className="time">
            <i className="fal fa-clock" />
            <span>{article.duration} min</span>
          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="quantity">
          <span className="Qnt-title">Quantité</span>
          <span className="Qnt-number">{article.quantity}</span>
        </div>
      </div>
    </div>
  );
}

export default DetailCommandeUnwastable;
