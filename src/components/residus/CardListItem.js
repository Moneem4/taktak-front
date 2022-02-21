import { Input } from "@material-ui/core";
import React, { useContext, useEffect, useState, useRef } from "react";
import { UiContext } from "../../context/UiContext";

const EditableElement = (props) => {
  const { onChange } = props;
  const element = useRef();
  let elements = React.Children.toArray(props.children);
  if (elements.length > 1) {
    throw Error("Can't have more than one child");
  }
  const onMouseUp = () => {
    const value = element.current?.value || element.current?.innerText;
    onChange(value);
  };
  useEffect(() => {
    const value = element.current?.value || element.current?.innerText;
    onChange(value);
  }, []);
  elements = React.cloneElement(elements[0], {
    contentEditable: true,
    suppressContentEditableWarning: true,
    ref: element,
    onKeyUp: onMouseUp,
  });
  return elements;
};
function CardListItem(props) {
  const { article, myCommande, setMyCommande, previous, index } = props;
  const { getIndex } = useContext(UiContext);

  // const [index, setIndex] = useState(0);
  // useEffect(() => {
  //   if !previous {}
  //   myCommande &&
  //     myCommande.length &&
  //     setIndex(getIndex(article.id, myCommande, "id"));
  // }, [props]);
  useEffect(() => {
    console.log(index, "carListItemIndex");
  }, [props]);
  function IncrementItem() {
    setMyCommande((prevCommande) => {
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
    if (myCommande[index].quantite > 1) {
      setMyCommande((prevCommande) => {
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
    setMyCommande((prevCommande) => {
      let items = [...prevCommande];

      const indexArticle = items.findIndex((el) => el.id === article.id);

      items.splice(indexArticle, 1);
      return items;
    });
  }
  function handleChangeNewPrice(evt) {
    setMyCommande((prevCommande) => {
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
      {myCommande && article && index >= 0 && (
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
              <span>{article.price} dt</span>
            </div>
            <div className="new-price">
              <span className="new-price-title">Nouveau prix</span>
              <form>
                <input
                  type="number"
                  className="new-price-number"
                  // required={true}
                  onChange={handleChangeNewPrice}
                  value={myCommande[index].newPrice}
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
                  <span>{myCommande[index].quantite}</span>
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

CardListItem.propTypes = {};

export default CardListItem;
