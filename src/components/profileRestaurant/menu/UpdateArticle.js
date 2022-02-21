import React, { useState, useContext, useEffect } from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";
import MenuList from "./MenuList";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import Ingredient from "../../../assets/img/svg/Ingredient.svg";
import Modal from "../../util/UtilModal";
import _ from "lodash";

function UpdateArticle(props) {
  const { article, restaurant } = props;
  const {
    getMenuData,
    getArticleOptionByArticleId,
    getIndex,
    updateArticle,
    updateArticleWithImage,
    setMenuUpdated,
  } = useContext(RestaurantContext);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [ingredientsList, setIngredientsList] = useState(null);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [showBox, setShowBox] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [listNewOptions, setListNewOptions] = useState([]);
  const [listNewIngOptions, setListNewIngOptions] = useState({
    optionType: "",
    ingredients: [],
  });

  useEffect(() => {
    setMenuUpdated(false);
  }, [props]);

  const [action, setAction] = useState();

  useEffect(() => {
    article.ingredients && setIngredientsList([...article.ingredients]);
  }, [props]);

  const [newOption, setNewOption] = useState({
    _id: listNewOptions.length + 1,
    optionType: "",
    ingredients: [],
  });

  const [newArticle, setNewArticle] = useState({
    name: article.name,
    ingredients: ingredientsList,
    price: parseFloat(article.price),
    duration: article.duration,
    image: article.image,
    options: [],
  });

  const [listOptions, setListOptions] = useState();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getMenuData(restaurant.menuId, setCategories);
    getArticleOptionByArticleId(article._id, setListOptions);
  }, [props]);

  const [updatedOptions, setUpdatedOptions] = useState([]);

  const [listIng, setListIng] = useState({});
  useEffect(() => {
    if (updatedOptions) {
      const groups = _.groupBy(updatedOptions, "optionType");
      setListIng(groups);
      console.log(updatedOptions, "updatedOptions");
    }
  }, [updatedOptions]);

  function getUnique(array) {
    var uniqueArray = [];

    // Loop through array values
    for (var value of array) {
      if (uniqueArray.indexOf(value) === -1) {
        uniqueArray.push(value);
      }
    }
    return uniqueArray;
  }
  useEffect(() => {
    listOptions &&
      listOptions.map((option) => {
        let action;
        if (option.actionType === "ISNEW") {
          action = option.actionType;
        } else {
          action = "NOUPDATE";
        }
        let item = {
          _id: option._id,
          articleId: option.articleId,
          optionAvatar: option.optionAvatar,
          optionName: option.optionName,
          optionPrice: option.optionPrice,
          optionType: option.optionType,
          actionType: action,
        };
        setUpdatedOptions((prev) => {
          return getUnique([...prev, item]);
        });
      });
  }, [listOptions]);

  const openModal = (type) => {
    setShowModalAdd(true);
    setAction(type);
  };

  const [option, setOption] = useState(null);
  const openModalUpdate = (type, item) => {
    setShowModal(true);
    setOption(item);
  };

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

  const handleIngredientChange = (event) => {
    const value = event.target.value;
    const field = event.target.name;
    setListNewIngOptions({ ...listNewIngOptions, [field]: value });
  };

  const handleClose = () => {
    props.setShowModal(!props.showModal);
  };

  function ajouterNewIngredient() {
    console.log("listNewOp");
    if (listNewIngOptions.optionType === "") {
      alert("SVP Donner type catégories !");
    } else {
      setListOptions((prevListOptions) => {
        const newOptions = listNewIngOptions.ingredients.map((b) => ({
          articleId: article._id,
          optionType: listNewIngOptions.optionType,
          optionPrice: b.optionPrice,
          optionName: b.optionName,
          optionAvatar: b.optionAvatar,
          actionType: "ISNEW",
        }));

        return newOptions;
      });

      setListNewIngOptions({
        optionType: "",
        ingredients: [],
      });
    }
  }

  useEffect(() => {
    let ingredients = { ...listIng };
    ingredients[newOption.optionType] = newOption.ingredients;
    setListIng({ ...ingredients });
  }, [newOption.ingredients]);

  function removeIngredient(type) {
    // setListOptions((prevListOptions) => {
    //   const items = [...prevListOptions].filter((el) => el.optionType !== type);
    //   console.log("items:", items);
    //   return [...items];
    // });
    let arr = listOptions.map((el) => {
      if (el.optionType === type) {
        return el._id;
      }
    });

    arr.forEach((el) => {
      if (el) {
        removeAddedItem(el);
      }
    });
  }

  function removeItem(index) {
    setListNewIngOptions((prevListNewIngOptions) => {
      let items = prevListNewIngOptions;

      let listIngredients = [...items.ingredients];
      listIngredients.splice(index, 1);
      const updatedOptions = {
        ...prevListNewIngOptions,
        ingredients: listIngredients,
      };
      return updatedOptions;
    });
  }

  function removeAddedItem(id) {
    var index = getIndex(id, updatedOptions, "_id");
    setUpdatedOptions((prevUpdatedOptions) => {
      let items = [...prevUpdatedOptions];

      const updatedOption = {
        ...prevUpdatedOptions[index],
        actionType: "ISDELETED",
      };
      items[index] = updatedOption;

      return items;
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

  function modifierArticle() {
    const data = {
      name: newArticle.name,
      ingredients: ingredientsList,
      price: newArticle.price,
      duration: newArticle.duration,
      options: updatedOptions,
    };

    if (image === null) {
      updateArticle(article._id, data, article.image, updatedOptions);
    } else {
      updateArticleWithImage(article._id, data, image, updatedOptions);
    }
    handleClose();
  }

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
      <MenuList categories={categories} restaurant={restaurant} />
      <div className="add-article-form">
        <span>Modifier article</span>
        <div className="add-article-form-form">
          <div style={{ display: showImage ? "none" : "block" }}>
            <div className="image-form" onClick={() => handleAddPicture()}>
              <img
                src={`https://${newArticle.image}`}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
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
                      onClick={() => openModal("createUpdate")}
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
                      <Grid item xs={1}>
                        <IconButton
                          color="inherit"
                          aria-label="menu"
                          onClick={() => removeIngredient(key)}
                        >
                          <DeleteIcon
                            fontSize="large"
                            style={{ color: "red" }}
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <div className="menu-customization-confirmation-ingredients">
                      <div className="list-of-ingredients">
                        <Grid container direction="row">
                          <Grid item xs={3}>
                            <div
                              className="image-form-option"
                              onClick={() => openModal(key)}
                              style={{ marginTop: 30 }}
                            >
                              +
                            </div>
                          </Grid>
                          <Grid item xs={9}>
                            {listIng[key]
                              .filter(
                                (option) => option.actionType != "ISDELETED"
                              )
                              .map((item, index) => (
                                <div
                                  className="card-ingredients"
                                  key={item._id}
                                >
                                  <div className="card-ingredients-header">
                                    {typeof item.optionAvatar === "string" ? (
                                      <img
                                        className="avatar"
                                        src={`https://${item.optionAvatar}`}
                                        style={{ marginTop: 10 }}
                                      />
                                    ) : (
                                      <img
                                        className="avatar"
                                        src={URL.createObjectURL(
                                          item.optionAvatar
                                        )}
                                        style={{ marginTop: 10 }}
                                      />
                                    )}
                                  </div>
                                  <div className="card-ingredients-body">
                                    <span className="username">
                                      {item.optionName}
                                    </span>
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
                                          onClick={() =>
                                            removeAddedItem(item._id)
                                          }
                                        >
                                          <CloseIcon
                                            style={{ color: "#ff6900" }}
                                          />
                                        </IconButton>
                                      </Grid>
                                    </Grid>
                                    <div
                                      className="follow-button"
                                      onClick={() =>
                                        openModalUpdate("updateOption", item)
                                      }
                                    >
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

        <div className="buttons">
          <button className="btn-add" onClick={modifierArticle}>
            Enregistrer
          </button>
        </div>
      </div>
      <Modal
        showModal={showModalAdd}
        setShowModal={setShowModalAdd}
        page={"addNewIngredient"}
        setNewOption={setNewOption}
        listIng={listIng}
        setListOptions={setListOptions}
        listNewIngOptions={listNewIngOptions}
        setListNewIngOptions={setListNewIngOptions}
        setUpdatedOptions={setUpdatedOptions}
        action={action}
      />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        page={"updateOption"}
        option={option}
        updatedOptions={updatedOptions}
        setUpdatedOptions={setUpdatedOptions}
        setListOptions={setListOptions}
      />
    </div>
  );
}

export default UpdateArticle;
