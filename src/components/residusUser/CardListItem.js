import React, { useContext, useEffect, useState, useRef } from "react";
import { UiContext } from "../../context/UiContext";

function CardListItem(props) {
  const { article, myCommande, setMyCommande } = props;
  const { getIndex } = useContext(UiContext);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    myCommande.articles &&
      myCommande.articles.length &&
      setIndex(getIndex(article.id, myCommande.articles, "_id"));
  }, [props]);

  function removeArticle() {
    setMyCommande((prevMyCommande) => {
      let items = {...prevMyCommande};
      let articles = [...items.articles];
      const indexArticle = articles.findIndex((el) => el._id === article._id);
      articles.splice(indexArticle, 1);
      let updatedArticles = {...prevMyCommande, articles: articles}
      return updatedArticles;
    });
  }

  return (
    <div className="lists">
      {myCommande && article && (
        <div className="list-item" style={{display:"flex",borderBottom:"1px solid #e8e8e8",marginBottom:"margin-bottom: 2rem"}}>
          <img
            src={`https://${article.image}`}
            style={{ width: "70px", height: "70px" }}
          />
          <div className="list-item-details">  
            <div className="first-details" >
              <div className="details-food" > 
                <span className="food-name"  >{article.name}</span>  
              </div>
              <i className="fal fa-trash-alt" onClick={removeArticle} />  
            </div>
            <div className="new-price" style={{fontSize:"1.8rem",color:"#ff6900"}}  >
              <span>{article.price} dt</span>  
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

CardListItem.propTypes = {};

export default CardListItem;
