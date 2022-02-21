import React, { useState, useContext, useEffect } from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";
import Grid from "@material-ui/core/Grid";
import Ingredient from "../../../assets/img/svg/Ingredient.svg";
import _ from "lodash";

function DetailArticle(props) {
  const { article } = props;
  const { getArticleOptionByArticleId } = useContext(RestaurantContext);

  const [ingredientsList, setIngredientsList] = useState(null);
  useEffect(() => {
    article.ingredients && setIngredientsList([...article.ingredients]);
  }, [props]);

  const [listOptions, setListOptions] = useState();
  useEffect(() => {
    getArticleOptionByArticleId(article._id, setListOptions);
  }, [props]);

  const [listIng, setListIng] = useState({});
  useEffect(() => {
    if (listOptions) {
      const groups = _.groupBy(listOptions, "optionType");
      setListIng(groups);
    }
  }, [listOptions]);

  const handleClose = () => {
    props.setShowModal(!props.showModal);
  };
  
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 10,
        height: 600,
        width: 700,
        overflow: "scroll",
      }}
    >
      <div className="add-article-form">
        <span>Detail article</span>
        <div className="add-article-form-form">
          <div className="image-form">
              <img
                src={`https://${article.image}`}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
          </div>
          <div className="info-form">
            <input
              placeholder="Nom de menu"
              name="name"
              value={article.name}
              disabled
            />
            <div
              className="tags"
              placeholder="Ingrédients"
              style={{ overflow: "scroll", height: 80, 
              overflow: "hidden !important", 
              overflowX: "hidden",}}
            >
              {ingredientsList &&
                ingredientsList.map((el, index) => (
                  <div
                    style={{
                      padding: 5,
                      marginBottom: 5,
                      border: "1px solid #7a7a7a",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      color: "#000",
                      width: "30%",
                      fontSize: 12,
                    }}
                  >
                    {el}
                  </div>
                ))}
            </div>
            <div className="info-form-bottom" style={{ marginTop: 20 }}>
              <input
                placeholder="Prix"
                placeholder={"$"}
                className="price"
                name="price"
                value={parseFloat(article.price)}
                disabled
              />
              <span className="unt-price">dt</span>
              <input
                type="text"
                placeholder={10}
                className="time"
                name="duration"
                value={article.duration}
                disabled
                style={{ marginLeft: "5%" }}
              />
              <div className="title">
                <span style={{fontSize: 10}}> Temps de préparation</span>
              </div>
              <span className="unt-time">min</span>
            </div>
          </div>
        </div>
        <div>
          <div className="seconde-title">
            <span>Les options possible:</span>
          </div>
          {listIng &&
            Object.keys(listIng).map((key) => {
              return (
                <div className="list-of-ingredients-to-choose" key={key}>
                  <div className="confirmation-bottom-content">
                    <Grid container direction="row">
                      <Grid item xs={1}>
                        <img
                          src={Ingredient}
                          style={{ width: 30, height: 30 }}
                        />
                      </Grid>
                      <Grid item xs={10}>
                        <span className="title">{key}</span>
                        <span className="numbers-of-ingr">
                          Il existe {listIng[key].length} ingrédients
                        </span>
                      </Grid>
                    </Grid>
                    <div className="menu-customization-confirmation-ingredients">
                      <div className="list-of-ingredients">
                        <Grid container direction="row">
                          <Grid item xs={9}>
                            {listIng[key].map((item, index) => (
                              <div
                                className="card-ingredients"
                                key={item._id}
                              >
                                <div className="card-ingredients-header">
                                  <img
                                    className="avatar"
                                    src={`https://${item.optionAvatar}`}
                                    style={{ marginTop: 10 }}
                                  />
                                </div>
                                <div className="card-ingredients-body">
                                  <span className="username">
                                    {item.optionName}
                                  </span>
                                </div>
                                <div className="card-ingredients-footer" >
                                  <div className="follow-button" style={{marginLeft: "-5%", width: 60, marginTop: "20%"}}>
                                    <span>+{item.optionPrice} dt</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default DetailArticle;
