import React, { useContext } from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";

function IngredientsSection(props) {
  const { classes } = props;
  const { personalizeArticle, setPersonalizeArticle} = useContext(RestaurantContext);

  const removeIngredient = (item) => {
    let items = {...personalizeArticle};
    let listIngredients = [...items.ingredients];
    const index = listIngredients.findIndex(el => el === item);
    listIngredients.splice(index, 1);
    items.ingredients = listIngredients

    setPersonalizeArticle(items)
  };

  const removeNewIngredient = (item) => {
    let items = {...personalizeArticle};
    let listNewIngredients = [...items.newIngredients];
    let listArticleOptionsId = [...items.articleOptionsId];

    const index1 = listNewIngredients.findIndex(el => el === item);
    const index2 = listArticleOptionsId.findIndex(el => el === item._id);

    listNewIngredients.splice(index1, 1);
    listArticleOptionsId.splice(index2, 1);

    items.newIngredients = listNewIngredients;
    items.articleOptionsId = listArticleOptionsId;

    setPersonalizeArticle(items);

  };
  
  return personalizeArticle && (
    <div className="customize-order-Ingredients">
      <div className="customize-order-Ingredients-header">
        <span className="title">Ingrédients</span>
        <div className="time">
          <i className="fal fa-clock" />
          <span>{personalizeArticle.duration} min</span>
        </div>
      </div>
      <div className="list-of-ingredients">
        {personalizeArticle.ingredients.map((item) => (
          <div className="ingredients" key={item}>
            {item}
            <i className="fa fa-times" onClick={() => removeIngredient(item)} />
          </div>
        ))}
      </div>
      <div className="new-ingredients-added">
        <div className="new-ingredients-added-header">
          <span className="title">
            ({personalizeArticle.newIngredients ? (
              <span style={{ color: "#FD6A00", fontWeight: "bold" }}>
                {personalizeArticle.newIngredients.length}
              </span>
            ):(
              <span style={{ color: "#FD6A00", fontWeight: "bold" }}>
                0
              </span>
            )}
            ) nouveaux ingrédients ajoutés
          </span>
          <div className="question-icon">
            <i className="fa fa-question" />
          </div>
        </div> 
        <div className="list-of-ingredients">
          {personalizeArticle.newIngredients && personalizeArticle.newIngredients.map((item) => (
            <div id="dashed" key={item}>
              {item.optionName}
              <span>+{item.optionPrice} dt</span>
              <i
                className="fa fa-times"
                onClick={() => removeNewIngredient(item)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

IngredientsSection.propTypes = {};

export default IngredientsSection;
