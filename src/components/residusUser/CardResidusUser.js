import React from "react";

function CardResidusUser(props) {
  const { article, setMyCommande, myCommande} = props;

  const commande = {
    _id:article.article._id,
    name: article.article.name,
    image: article.article.image,
    ingredients: article.article.ingredients,
    price: article.price,
    restaurantId: article.restaurantId,
    unwastableId: article.unwastableId,
    quantity:1,
    duration: article.article.duration,
    //newIngredients: article.article.newIngredients,
  };

  function ajouterArticle() {
    setMyCommande((prevMyCommande) => {
      let items = {...prevMyCommande};
      let articles = [...items.articles, { ...commande }];
      let updatedArticles = {...prevMyCommande, articles: articles}
      return updatedArticles;
    });
  }

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

  let button;
  const indexArticle = myCommande.articles.findIndex((el) => el._id === article.article._id);
  if (indexArticle >= 0) {
    button = (
      <div className="remove"
        onClick={() => removeArticle()}
      >
        <button style={{width: 80}}>
          <i className="far fa-minus" />
          &ensp; Supprimer
        </button>
      </div>
    );
  } else {
    button = (
      <div className="add-to-menu"
        onClick={() => ajouterArticle()}
      >
        <button style={{width: 80}}>
          <i className="far fa-plus" />
          &ensp; Ajouter
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="cardTop">
        <img
          src={`https://${article.article.image}`}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
      <div className="cardBottom">
        <div className="cardText">
          <span className="food-name">{article.article.name}</span>
          <div className="sub-title">
            <p>{article.article.ingredients}</p>
          </div>
          <div className="price">
            <span>{article.price} dt</span>
          </div>
          <div className="cardHoverText">
            <div className="menu-info-bottom">
              <div className="menu-info-bottom-content">
                <div className="time">
                  <i className="fal fa-clock" />{article && article.article && 
                  <span>{article.article.duration} min</span>}
                </div>
                <div className="add-remove">
                  <div className="food-done">
                    <img
                      className="circle-white"
                      src="assets/img/white-circle.png"
                    />
                    <img className="added" src="assets/img/svg/done.png" />
                  </div>
                  {button}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardResidusUser;
