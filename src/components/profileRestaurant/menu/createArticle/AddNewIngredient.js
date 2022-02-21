import React, { useState } from "react";

function CreateArticle(props) {
  const {
    listIng,
    action,
    setListOptions,
    setListNewIngOptions,
    setUpdatedOptions,
  } = props;
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState();

  const [newIngredient, setNewIngredient] = useState({
    optionName: "",
    optionPrice: 0,
    optionAvatar: "",
  });

  const handleClose = () => {
    props.setShowModal(!props.showModal);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const field = event.target.name;
    setNewIngredient({ ...newIngredient, [field]: value });
  };

  const handleAddPicture = () => {
    const fileInput = document.getElementById("imageIngredientInput");
    fileInput.click();
  };

  const handleImageIngredientChange = (event) => {
    const img = event.target.files[0];
    if (img) {
      setUploadedImage(URL.createObjectURL(img));
      setShowImage(true);
      setImage(img);
    }
  };

  function addIngredient() {
    const data = {
      optionName: newIngredient.optionName,
      optionPrice: newIngredient.optionPrice,
      optionAvatar: image,
    };

    if (action === "create") {
      if (typeof data.optionAvatar !== "undefined") {
        setListNewIngOptions((prevListNewIngOptions) => {
          let items = { ...prevListNewIngOptions };
          let ingredientsList = items.ingredients;
          let itemIngredients = [...ingredientsList, data];

          const updatedOption = {
            ...prevListNewIngOptions,
            ingredients: itemIngredients,
          };
          items = updatedOption;

          return items;
        });
        handleClose();
      } else {
        alert("SVP choisir une image !");
      }
    } else if (action === "createUpdate") {
      if (typeof data.optionAvatar !== "undefined") {
        const dataOption = {
          optionName: newIngredient.optionName,
          optionPrice: newIngredient.optionPrice,
          optionAvatar: image,
          actionType: "ISNEW",
        };

        setListNewIngOptions((prevListNewIngOptions) => {
          let items = { ...prevListNewIngOptions };
          let ingredientsList = items.ingredients;
          let itemIngredients = [...ingredientsList, dataOption];

          const updatedOption = {
            ...prevListNewIngOptions,
            ingredients: itemIngredients,
          };
          items = updatedOption;

          return items;
        });
        handleClose();
      } else {
        alert("SVP choisir une image !");
      }
    } else {
      Object.keys(listIng).map((key) => {
        if (key === action) {
          const dataNewOption2 = {
            optionAvatar: data.optionAvatar,
            optionName: data.optionName,
            optionPrice: parseFloat(data.optionPrice),
            optionType: action,
            actionType: "ISNEW",
          };

          setUpdatedOptions((prevUpdatedOptions) => {
            return [...prevUpdatedOptions, dataNewOption2];
          });
        }
      });
      handleClose();
    }
  }

  return (
    <div>
      <div className="add-article-form">
        <span>Ajouter nouveau ingredient</span>
        <div className="add-article-form-form">
          <div style={{ display: showImage ? "none" : "block" }}>
            <div className="image-form" onClick={() => handleAddPicture()}>
              Photo
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
              name="optionName"
              value={newIngredient.optionName}
              onChange={handleChange}
            />
            <div className="info-form-bottom" style={{ marginTop: 20 }}>
              <input
                placeholder="Prix"
                className="price"
                name="optionPrice"
                value={newIngredient.optionPrice}
                onChange={handleChange}
              />
              <span className="unt-price">dt</span>
            </div>
          </div>
          <input
            type="file"
            id="imageIngredientInput"
            onChange={handleImageIngredientChange}
            hidden="hidden"
            accept="image/*"
          />
        </div>
        <div className="buttons" style={{ marginTop: 50 }}>
          <button className="btn-retour" onClick={handleClose}>
            Annuler
          </button>
          <button className="btn-add" onClick={addIngredient}>
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateArticle;
