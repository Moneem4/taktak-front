import React from "react";
import Grid from "@material-ui/core/Grid";

function CardResidus(props) {
  const { article, setMyCommande, myCommande } = props;
  const commande = {
    id: article._id,
    duration: article.duration,
    name: article.name,
    image: article.image,
    price: article.price,
    newPrice: article.price,
    quantite: 1,
  };

  function ajouterArticle() {
    setMyCommande((prevCommande) => {
      return [...prevCommande, { ...commande }];
    });
  }

  function removeArticle() {
    setMyCommande((prevCommande) => {
      let items = [...prevCommande];

      const indexArticle = items.findIndex((el) => el.id === article._id);

      items.splice(indexArticle, 1);
      return items;
    });
  }

  let button;
  
  const indexArticle = myCommande.findIndex((el) => el.id === article._id);
  if(indexArticle >= 0){
    button = (
      <div className="remove"
        onClick={() => removeArticle()}
      >
        <button>
          <i className="far fa-minus" />
          &ensp; Supprimer
        </button>
      </div>
    );
  }else{
    button = (
      <div className="add-to-menu"
        onClick={() => ajouterArticle()}
      >
        <button>
          <i className="far fa-plus" />
          &ensp; Ajouter
        </button>
      </div>
    );
  }

  return article ? (  
    <div className="card" style={{ width: "100%", height: 375 }}>
      <div className="cardTop">
        <img
          style={{ objectFit: "contain" }}
          src={`https://${article.image}`}
        />
      </div>
      <div className="cardBottom">
        <div className="cardText">
          <span className="food-name">{article.name}</span>
          <div className="sub-title" style={{height: 70}}>
            <p>{article.ingredients.map((el) => `${el},  `)}</p>
          </div>
          <div className="price" style={{ marginTop: -10 }}>
            <span>{article.price} dt</span>
          </div>
          <div className="cardHoverText">
            <div className="menu-info-bottom">
              <div className="menu-info-bottom-content">
                <Grid container direction="row">
                  <Grid item xs={8}>
                    <div className="time">
                      <i className="fal fa-clock" />
                      <span>{article.duration} min</span>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    {button}
                  </Grid>
                </Grid>
              </div>              
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default CardResidus;
