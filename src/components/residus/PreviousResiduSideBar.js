import React, { useContext, useEffect, useState } from "react";
import CardPreviousListItem from "./CardPreviousListItem";
import { RestaurantContext } from "../../context/RestaurantContext";
import { CircularProgress } from "@material-ui/core";

function PreviousResiduSideBar(props) {
  const {
    previousList,
    setUnwastableData,
    restaurantId,
    index,
    unwastableId,
    unwastableMenuId,
    setPreviousLists,
  } = props;
  
  const { deleteUnwastableList, updateUnwastableList } = useContext(RestaurantContext);
  const [list, setList] = useState(previousList);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    setList(previousList);
  }, [previousList]);

  function deleteList() {
    deleteUnwastableList(
      unwastableId,
      unwastableMenuId,
      setDeleteLoading,
      setUnwastableData
    );
  }

  // function createUnwastable() {
  //   const data = myCommande.map((el) => ({
  //     articleId: el.id,
  //     quantity: parseInt(el.quantite),
  //     price: parseFloat(el.newPrice),
  //   }));

  //   console.log(data, "createUnwastableInput");
  //   myCommande && createUnwastableList(restaurantId, data, setUnwastableData);
  // }

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  function updateList() {
    const data = list.map((el) => ({
      articleId: el.id,
      quantity: parseInt(el.quantite),
      price: parseFloat(el.newPrice),
    }));
    
    list &&
      updateUnwastableList(
        unwastableId,
        unwastableMenuId,
        data,
        setLoadingUpdate
      );
  }

  return (
    <>
      {list && (
        <div className="listContainer">
          <div className="my-list" style={{ marginTop: 30 }}>
            <span className="left-side">
              Menu {index + 1} (
              <span style={{ color: "#ff6900" }}>
                {list && list.length && list.length}
              </span>
              )
            </span>
            {!deleteLoading ? (
              <span className="right-side" onClick={deleteList}>
                Supprimer tout
              </span>
            ) : (
              <span className="right-side">
                <CircularProgress
                  thickness={2.6}
                  style={{ color: "rgba(255,255,255)" }}
                />
              </span>
            )}
          </div>
          <div className="content-list">
            {list &&
              list.length &&
              list.map((article, index) => (
                <CardPreviousListItem
                  index={index}
                  article={article}
                  list={list}
                  setList={setList}
                  previous={true}
                />
              ))}
            {loadingUpdate ? (
              <button className="confirmationCircularProgress">
                <CircularProgress
                  thickness={2.6}
                  style={{ color: "#ff6900" }}
                />
              </button>
            ) : (
              <button className="confirmation" onClick={updateList}>
                Mettre à jour
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

PreviousResiduSideBar.propTypes = {};

export default PreviousResiduSideBar;
