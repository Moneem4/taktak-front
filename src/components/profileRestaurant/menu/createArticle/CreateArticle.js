import React, { useState, useContext, useEffect } from "react";
import { RestaurantContext } from "../../../../context/RestaurantContext";
import { NavLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import MenuList from "../MenuList";
import Modal from "../../../util/UtilModal";
import Ingredient from "../../../../assets/img/svg/Ingredient.svg";

function CreateArticle(props) {
  const { restaurant } = props;
  const { getMenuData, selectedCategory, createArticle } =
    useContext(RestaurantContext);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState();
  const [showBox, setShowBox] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [listNewIngOptions, setListNewIngOptions] = useState({
    optionType: "",
    ingredients: [],
  });

  const openModal = () => {
    setShowModal(true);
  };

  const [newArticle, setNewArticle] = useState({
    name: "",
    ingredients: [],
    price: "",
    duration: "",
    image: "https://picsum.photos/300",
  });

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getMenuData(restaurant.menuId, setCategories);
  }, [props]);

  const handleChange = (event) => {
    const value = event.target.value;
    const field = event.target.name;
    setNewArticle({ ...newArticle, [field]: value });
  };

  const handleChangeIngredients = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const value = event.target.value;
      setIngredientsList([...ingredientsList, value]);
      setInput("");
    }
  };

  const handleAddPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleImageChange = (event) => {
    const img = event.target.files[0];
    if (img) {
      setUploadedImage(URL.createObjectURL(img));
      setShowImage(true);
      setImage(img);
    }
  };

  const [listNewOptions, setListNewOptions] = useState([]);

  const [newOption, setNewOption] = useState({
    _id: listNewOptions.length + 1,
    optionName: "",
    ingredients: [],
  });

  const handleIngredientChange = (event) => {
    const value = event.target.value;
    const field = event.target.name;
    setListNewIngOptions({ ...listNewIngOptions, [field]: value });
  };

  function ajouterNewIngredient() {
    if (listNewIngOptions.optionType === "") {
      alert("SVP Donner type catégories !");
    } else {
      setListNewOptions([...listNewOptions, listNewIngOptions]);
      setListNewIngOptions({
        optionType: "",
        ingredients: [],
      });
    }
  }

  function removeIngredient(id) {
    setListNewOptions((prevListNewOptions) => {
      let items = [...prevListNewOptions];

      const indexItem = items.findIndex((el) => el.id === id);

      items.splice(indexItem, 1);

      return items;
    });
  }

  function removeItem(index) {
    setNewOption((prevNewOption) => {
      let items = prevNewOption;

      let listIngredients = [...items.ingredients];
      listIngredients.splice(index, 1);
      const updatedOptions = {
        ...prevNewOption,
        ingredients: listIngredients,
      };
      return updatedOptions;
    });
  }

  function removeIngItem(index) {
    ingredientsList &&
      setIngredientsList((prevIngredientsList) => {
        const items = [...prevIngredientsList];
        items.splice(index, 1);
        return [...items];
      });
  }

  function addArticle() {
    const newOptions = listNewOptions.map((a) =>
      a.ingredients.map((b) => ({
        type: a.optionType,
        price: b.optionPrice,
        name: b.optionName,
        image: b.optionAvatar,
      }))
    );
    const merged = [].concat.apply([], newOptions);

    const data = {
      name: newArticle.name,
      ingredients: ingredientsList,
      price: newArticle.price,
      duration: newArticle.duration,
      options: merged,
    };
    //console.log("data:", data, image);

    if (selectedCategory) {
      if (typeof image === "undefined") {
        alert("SVP choisir une image pour l'article");
      } else {
        createArticle(selectedCategory, data, image);
        setNewArticle((prevNewArticle) => {
          return {
            ...prevNewArticle,
            name: "",
            ingredients: [],
            price: 0,
            duration: "",
            image: "",
            options: [],
          };
        });
        setIngredientsList([]);
        setListNewOptions([]);
        setNewOption({
          optionName: "",
          ingredients: [],
        });
      }
    } else {
      alert("SVP choisir une catégorie");
    }
  }

  return (
    <div>
      <MenuList categories={categories} restaurant={restaurant} />
      <div className="add-article-form">
        <span>Ajouter nouveau article</span>
        <div className="add-article-form-form">
          <div style={{ display: showImage ? "none" : "block" }}>
            <div className="image-form" onClick={() => handleAddPicture()}>
              Photo
            </div>
            <div className="instruction-media" >
              <span className="instruction-pict-profile" style={{width: 80}}>
                Format idéal <strong> 500x280</strong>
              </span>
            </div>
          </div>
          <div
            className="image-form"
            style={{ display: showImage ? "block" : "none" }}
            onClick={() => handleAddPicture()}
          >
            <img
              src={uploadedImage}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="info-form">
            <input
              placeholder="Nom de menu"
              name="name"
              value={newArticle.name}
              onChange={handleChange}
            />
            <input
              placeholder="Ingrédient"
              name="ingredient"
              onChange={handleChangeIngredients}
              value={input}
              onKeyDown={handleKeyDown}
            />
            <div
              className="tags"
              placeholder="Ingrédients"
              style={{ overflow: "scroll" }}
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
                    }}
                  >
                    <Grid container direction="row">
                      <Grid item xs={10}>
                        {el}
                      </Grid>
                      <Grid item xs={1}>
                        <CloseIcon
                          style={{ color: "#ff6900" }}
                          fontSize="small"
                          onClick={() => removeIngItem(index)}
                        />
                      </Grid>
                    </Grid>
                  </div>
                ))}
            </div>
            <div className="info-form-bottom" style={{ marginTop: 20 }}>
              <input
                placeholder="Prix"
                placeholder={"$"}
                className="price"
                name="price"
                value={newArticle.price}
                onChange={handleChange}
              />
              <span className="unt-price">dt</span>
              <input
                type="text"
                placeholder={10}
                className="time"
                name="duration"
                value={newArticle.duration}
                onChange={handleChange}
                style={{ marginLeft: "5%" }}
              />
              <div className="title">
                <span> Temps de préparation</span>
              </div>
              <span className="unt-time">min</span>
            </div>
          </div>
          <input
            type="file"
            id="imageInput"
            onChange={handleImageChange}
            hidden="hidden"
            accept="image/*"
          />
        </div>

        <div>
          <div className="first-title">
            <Grid container direction="row">
              <Grid item xs={11}>
                <span>Ajouter des ingrédients option</span>
              </Grid>
              <Grid item xs={1}>
                <i
                  className="fa fa-plus  show-plus"
                  style={{
                    display: showBox === false ? "block" : "none",
                  }}
                  onClick={() => setShowBox(true)}
                />
                <i
                  className="fa fa-minus  close-ing"
                  style={{
                    display: showBox === true ? "block" : "none",
                  }}
                  onClick={() => setShowBox(false)}
                />
              </Grid>
            </Grid>
          </div>
          <div
            className="list-of-ingredients-to-choose"
            style={{
              display: showBox ? "block" : "none",
              marginTop: 20,
              marginBottom: 50,
            }}
          >
            <div className="confirmation-bottom-content">
              <Grid container direction="row">
                <Grid item xs={1}>
                  <img src={Ingredient} style={{ width: 30, height: 30 }} />
                </Grid>
                <Grid item xs={8}>
                  <input
                    className="list-of-ingredientsInput"
                    placeholder="Nom ingredient"
                    name="optionType"
                    value={listNewIngOptions.optionType}
                    onChange={handleIngredientChange}
                    style={{ width: "80%" }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <span className="numbers-in-the-list">
                    (
                    <span style={{ color: "#FF6900" }}>
                      {newOption.ingredients.length}
                    </span>
                    ) dans la liste
                  </span>
                </Grid>
              </Grid>
              <div className="menu-customization-confirmation-ingredients">
                <Grid container direction="row">
                  <Grid item xs={3}>
                    <div
                      className="image-form-option"
                      onClick={() => openModal()}
                    >
                      +
                    </div>
                  </Grid>
                  <Grid item xs={9}>
                    <div
                      className="list-of-ingredients"
                      style={{ marginTop: -30 }}
                    >
                      {listNewIngOptions.ingredients.map((el, index) => (
                        <div className="card-ingredients">
                          <div className="card-ingredients-header">
                            <img
                              className="avatar"
                              src={URL.createObjectURL(el.optionAvatar)}
                              style={{ marginTop: 10 }}
                            />
                          </div>
                          <div className="card-ingredients-body">
                            <span className="username">{el.optionName}</span>
                          </div>
                          <div className="card-ingredients-footer">
                            <Grid
                              container
                              direction="row"
                              style={{ marginTop: -120 }}
                            >
                              <Grid item xs={9}></Grid>
                              <Grid item xs={1}>
                                <IconButton
                                  edge="end"
                                  color="inherit"
                                  onClick={() => removeItem(index)}
                                >
                                  <CloseIcon style={{ color: "#ff6900" }} />
                                </IconButton>
                              </Grid>
                            </Grid>
                            <div className="follow-button">
                              <span>+{el.optionPrice} dt</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Grid>
                </Grid>
                <div className="buttons">
                  <button className="btn-add" onClick={ajouterNewIngredient}>
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="seconde-title">
            <span>La liste choisit :</span>
          </div>
          {listNewOptions.map((option) => (
            <div className="list-of-ingredients-to-choose" key={option._id}>
              <div className="confirmation-bottom-content">
                <Grid container direction="row">
                  <Grid item xs={1}>
                    <img src={Ingredient} style={{ width: 30, height: 30 }} />
                  </Grid>
                  <Grid item xs={10}>
                    <span className="title">{option.optionType}</span>
                    <span className="numbers-of-ingr">
                      Il existe {option.ingredients.length} ingrédients
                    </span>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      color="inherit"
                      aria-label="menu"
                      onClick={() => removeIngredient(option.id)}
                    >
                      <DeleteIcon fontSize="large" style={{ color: "red" }} />
                    </IconButton>
                  </Grid>
                </Grid>

                <div className="menu-customization-confirmation-ingredients">
                  <div className="list-of-ingredients">
                    {option.ingredients.map((item) => (
                      <div className="card-ingredients" key={item._id}>
                        <div className="card-ingredients-header">
                          <img
                            className="avatar"
                            src={URL.createObjectURL(item.optionAvatar)}
                            style={{ marginTop: 10 }}
                          />
                        </div>
                        <div className="card-ingredients-body">
                          <span className="username">{item.optionName}</span>
                        </div>
                        <div className="card-ingredients-footer">
                          <div className="follow-button">
                            <span>+{item.optionPrice} dt</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="buttons" style={{ marginTop: 50 }}>
          <NavLink
            exact
            to={`/profileRestaurant/` + restaurant._id + `/ajouterCategories`}
          >
            <button className="btn-retour">
              <i className="fal fa-long-arrow-alt-left" />
              Retour
            </button>
          </NavLink>
          <button className="btn-add" onClick={addArticle}>
            Ajouter
          </button>
        </div>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        page={"addNewIngredient"}
        newOption={newOption}
        setNewOption={setNewOption}
        setListNewIngOptions={setListNewIngOptions}
        action={"create"}
      />
    </div>
  );
}

export default CreateArticle;
