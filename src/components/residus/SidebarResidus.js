import React, { useContext, useEffect, useState } from "react";
import CardListItem from "./CardListItem";
import { RestaurantContext } from "../../context/RestaurantContext";

function SidebarResidus(props) {
  const { myCommande, setMyCommande, restaurantId, setUnwastableData } = props;
  const { createUnwastableList } = useContext(RestaurantContext);

  function resetList() {
    setMyCommande([]);
  }

  function createUnwastable() {
    const data = myCommande.map((el) => ({
      articleId: el.id,
      quantity: parseInt(el.quantite),
      price: parseFloat(el.newPrice),
    }));

    myCommande && createUnwastableList(restaurantId, data, setUnwastableData).then(() => {
      setMyCommande([]);
    });
  }
  
  return (
    <div>
      <div className="my-list">
        <span className="left-side">
          Ma liste (
          <span style={{ color: "#ff6900" }}>
            {myCommande && myCommande.length && myCommande.length}
          </span>
          )
        </span>
        <span className="right-side" onClick={resetList}>
          Supprimer tout
        </span>
      </div>
      <div className="content-list">
        {myCommande.map((article, index) => (
          <CardListItem
            index={index}
            article={article}
            myCommande={myCommande}
            setMyCommande={setMyCommande}
            previous={false}
          />
        ))}
        <button className="confirmation" onClick={createUnwastable}>
          Confirmer
        </button>
      </div>
    </div>
  );
}

SidebarResidus.propTypes = {};

export default SidebarResidus;
