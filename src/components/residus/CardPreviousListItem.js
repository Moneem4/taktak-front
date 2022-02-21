import { Input } from "@material-ui/core";
import React, { useContext, useEffect, useState, useRef } from "react";
import { UiContext } from "../../context/UiContext";

function CardPreviousListItem(props) {
  const { article, list, setList, previous, index } = props;

  useEffect(() => {
    console.log(article, "article previous");
  }, [props]);
  function IncrementItem() {
    setList((prevCommande) => {
      let items = [...prevCommande];
      let item = { ...items[index] };
      const updatedCommande = {
        ...prevCommande[index],
        quantite: item.quantite + 1,
      };
      items[index] = updatedCommande;

      return items;
    });
  }

  function DecreaseItem() {
    if (list[index].quantite > 1) {
      setList((prevCommande) => {
        let items = [...prevCommande];
        let item = { ...items[index] };
        const updatedCommande = {
          ...prevCommande[index],
          quantite: item.quantite - 1,
        };
        items[index] = updatedCommande;

        return items;
      });
    }
  }

  function removeArticle() {
    setList((prevCommande) => {
      let items = [...prevCommande];

      const indexArticle = items.findIndex((el) => el.id === article.id);

      items.splice(indexArticle, 1);
      return items;
    });
  }
  function handleChangeNewPrice(evt) {
    setList((prevCommande) => {
      let items = [...prevCommande];
      const updatedCommande = {
        ...prevCommande[index],
        newPrice: evt.target.value,
      };
      items[index] = updatedCommande;

      return items;
    });
  }
  return (
    <div className="lists">
      {list && article && index >= 0 && (
        <div className="list-item">
          <img
            src={`https://${article.image}`}
            style={{ width: "70px", height: "70px" }}
          />
          <div className="list-item-details">
            <div className="first-details">
              <div className="details-food">
                <span className="food-name">{article.name}</span>
              </div>
              <i className="fal fa-trash-alt" onClick={removeArticle} />
            </div>
            <div className="food-price">
              <span>{list[index].price} dt</span>
            </div>
            <div className="new-price">
              <span className="new-price-title">Nouveau prix</span>
              <form>
                <input
                  type="number"
                  className="new-price-number"
                  // required={true}
                  onChange={handleChangeNewPrice}
                  value={list[index].newPrice}
                />
              </form>
            </div>
            <div className="Qty-available">
              <span className="title">Qte. disponible</span>
              <div className="Qty-number">
                <div onClick={DecreaseItem}>
                  <i className="fa fa-minus" />
                </div>
                <div className="number">
                  <span>{list[index].quantite}</span>
                </div>
                <div onClick={IncrementItem}>
                  <i className="fa fa-plus" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

CardPreviousListItem.propTypes = {};

export default CardPreviousListItem;
