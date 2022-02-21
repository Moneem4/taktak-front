import React, { useContext, useState, useEffect } from "react";
import { RestaurantContext } from "../../../../context/RestaurantContext";

function UpdateOption(props) {
  const { setListOptions, updatedOptions, setUpdatedOptions, option } = props;
  const { getIndex } = useContext(RestaurantContext);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState(option.optionAvatar);

  const [newOption, setNewOption] = useState({
    _id: option._id,
    articleId: option.articleId,
    optionName: option.optionName,
    optionPrice: option.optionPrice,
    optionAvatar: option.optionAvatar,
    optionType: option.optionType,
  });

  const handleClose = () => {
    props.setShowModal(!props.showModal);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const field = event.target.name;
    setNewOption({ ...newOption, [field]: value });
  };

  const handleAddPicture = () => {
    const fileInput = document.getElementById("imageOptionInput");
    fileInput.click();
  };

  const handleImageOptionChange = (event) => {
    const img = event.target.files[0];
    if (img) {
      setUploadedImage(URL.createObjectURL(img));
      setShowImage(true);
      setImage(img);
    }
  };

  function modifierOption() {
    const data = {
      _id: newOption._id,
      articleId: newOption.articleId,
      optionName: newOption.optionName,
      optionPrice: newOption.optionPrice,
      optionAvatar: image,
      optionType: newOption.optionType,
      actionType: "ISUPDATED",
    };

    var index = getIndex(data._id, updatedOptions, "_id");
    setUpdatedOptions((prevUpdatedOptions) => {
      let items = [...prevUpdatedOptions];
      items[index] = data;
      return items;
    });

    /*const data2 = {
      _id: newOption._id,
      articleId: newOption.articleId,
      optionName: newOption.optionName,
      optionPrice: newOption.optionPrice,
      optionAvatar: image,
      optionType: newOption.optionType,
    };

    setListOptions((prevListOptions) => {
      let items = [...prevListOptions];
      items[index] = data2;
      return items;
    });*/

    handleClose();
  }
  return (
    <div>
      <div className="add-article-form">
        <span>Modifier ingredient</span>
        <div className="add-article-form-form">
          <div style={{ display: showImage ? "none" : "block" }}>
            <div className="image-form" onClick={() => handleAddPicture()}>
              {typeof option.optionAvatar === "string" ? (
                <img
                  src={`https://${newOption.optionAvatar}`}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <img
                  className="avatar"
                  src={URL.createObjectURL(newOption.optionAvatar)}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
              )}
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
              value={newOption.optionName}
              disabled
            />
            <div className="info-form-bottom" style={{ marginTop: 20 }}>
              <input
                placeholder="Prix"
                className="price"
                name="optionPrice"
                value={newOption.optionPrice}
                onChange={handleChange}
              />
              <span className="unt-price">dt</span>
            </div>
          </div>
          <input
            type="file"
            id="imageOptionInput"
            onChange={handleImageOptionChange}
            hidden="hidden"
            accept="image/*"
          />
        </div>
        <div className="buttons" style={{ marginTop: 50 }}>
          <button className="btn-retour" onClick={handleClose}>
            Annuler
          </button>
          <button className="btn-add" onClick={modifierOption}>
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateOption;
