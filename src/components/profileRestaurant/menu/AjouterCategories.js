import React, { useState, useContext, useEffect } from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";
import { NavLink } from "react-router-dom";
import Input from "@material-ui/core/Input";
import { UiContext } from "../../../context/UiContext";
import CategoeiesContainer from "./createArticle/categoriesUtil/CategoeiesContainer";

const categoriesList = [
  "Coffee & Tea",
  "Soup",
  "Salads",
  "Gluten-Free",
  "Juice  & Smoothies",
  "Kebab",
  "Waffles",
  "Falafel",
  "Wraps",
  "Cheesesteaks",
  "Donuts",
  "Ice Cream & Frozen Yogurt",
  "Hot Dogs",
  "Bagels",
  "Tacos",
  "Barbeque",
  "Ramen",
  "Bakeries",
  "Chicken Wings",
  "Cocktail Bars",
  "Noodles",
  "Sushi Bars",
];

function AjouterCategories(props) {
  const { restaurant } = props;
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState();
  const [editInput, setEditInput] = useState();
  const { getMenuData, createCategory, deleteCategory, updateCategory } =
    useContext(RestaurantContext);
  const { getIndex } = useContext(UiContext);

  const [categories, setCategories] = useState();
  useEffect(() => {
    getMenuData(restaurant.menuId, setCategories);
  }, [props]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const value = event.target.value;

      const data = {
        menuId: restaurant.menuId,
        name: value,
      };

      if (categories === null || categories.length < 5) {
        createCategory(data);
        const newItem = {
          _id: data.menuId,
          name: data.name,
        };
        setCategories([...categories, newItem]);
      } else {
        alert("Vous avez droit à ajouter 5 catégories seulement!");
      }
      setInput("");
    }
  };

  function removeCategory(id) {
    deleteCategory(id, setCategories);
  }

  function editCategory(id, data) {
    setEdit(id);
    setEditInput(data);
  }

  const handleKeyDownEdit = (event, id) => {
    if (event.key === "Enter") {
      const value = event.target.value;

      const data = {
        name: value,
      };
      setEdit();
      updateCategory(id, data);
      var index = getIndex(id, categories, "_id");

      setCategories((prevCategories) => {
        let items = [...prevCategories];

        const updatedCategory = { ...prevCategories[index], name: value };
        items[index] = updatedCategory;

        return items;
      });
    }
  };

  const handleChangeEdit = (e) => {
    const value = e.target.value;
    setEditInput(value);
  };

  const addCategories = () => {
    console.log("zzzz:", categories);
  };

  useEffect(() => {
  console.log(categories, "categorieschanging")
  }, [categories])
  
  return (
    <div>
      <span className="add-category-title">
        <strong>Commencez par ajouter vos catégories ( </strong>ex. Petit
        Déjeuner <strong>)</strong>
      </span>
      <div className="add-category-helper">
        <img src="../../assets/img/svg/smile-happy.svg" />
        <div className="helper-info">
          <p> Vous avez droit à ajouter 5 catégories seulement! </p>
          <p>
            Passez au PREMIUM pour bénéficier d’un nombre illimité de catégories
          </p>
          <span>Abonnement Premium </span>
        </div>
      </div>

      <div className="added-categories">
        <CategoeiesContainer 
         cards={categories}
         setCards={setCategories}
         editInput={editInput} 
         edit={edit} 
         handleChangeEdit ={handleChangeEdit}
         editCategory={editCategory} 
         removeCategory={removeCategory}
         handleKeyDownEdit = {handleKeyDownEdit} />
        {/* {categories &&
          categories.map((el) => (
            <div className="added-category" key={el._id}>
              <span style={{ display: edit === el._id ? "none" : "block" }}>
                {" "}
                {el.name}{" "}
              </span>
              <Input
                value={editInput}
                inputProps={{ "aria-label": "description" }}
                onChange={handleChangeEdit}
                onKeyDown={(e) => handleKeyDownEdit(e, el._id)}
                style={{
                  display: edit === el._id ? "block" : "none",
                  fontSize: 15,
                }}
              />
              <div className="icons">
                <i
                  className="fal fa-pen"
                  onClick={() => editCategory(el._id, el.name)}
                />
                <i
                  className="fal fa-trash-alt"
                  onClick={() => removeCategory(el._id)}
                />
                <i className="fal fa-arrows-alt" />
              </div>
            </div>
         
         ))} */}
        <div style={{marginTop : "10px"}} className="input-add-category">
          <input
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <span>
            Tapez <strong> ENTRER</strong> pour valider{" "}
            <i className="icon-checked" />
          </span>
        </div>
      </div>

      <span className="add-category-btn" onClick={addCategories}>
        Ajoutez catégories
      </span>
      <div className="divider" />
      <div className="add-category-bottom">
        <NavLink exact to={`/profileRestaurant/` + restaurant._id + `/menu`}>
          <div className="retour">
            <i className="fal fa-long-arrow-alt-left" />
            <span>Retour</span>
          </div>
        </NavLink>
        <NavLink
          exact
          to={`/profileRestaurant/` + restaurant._id + `/nouveauArticle`}
        >
          <button>Continuer</button>
        </NavLink>
      </div>
    </div>
  );
}

export default AjouterCategories;
