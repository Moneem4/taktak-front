import React, { useState, useContext } from 'react';
import Slider from "infinite-react-carousel";

function EpicEatsFiltre(props) {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const settings = {
    rows: 1,
    slidesPerRow: 7,
    shift: 0,
    padding: 10,
  };

  const categories = [
    { name: "cat1", image: "../assets/img/svg/fruitdemer.svg" },
    { name: "cat2", image: "../assets/img/svg/fruitdemer.svg" },
    { name: "cat3", image: "../assets/img/svg/fruitdemer.svg" },
    { name: "cat4", image: "../assets/img/svg/fruitdemer.svg" },
    { name: "cat5", image: "../assets/img/svg/pizza.svg" },
    { name: "cat6", image: "../assets/img/svg/fruitdemer.svg" },
    { name: "cat7", image: "../assets/img/svg/fruitdemer.svg" },
    { name: "cat8", image: "../assets/img/svg/pizza.svg" },
  ];

  const items = categories.map((el) => (
    <div
      style={{
        margin: "0.3rem",
        whiteSpace: "nowrap",
        border: "1px solid #e8e8e8",
        borderRadius: "5px",
        height: "16rem !important",
        width: "21rem !important",
      }}
    >
      <div className="food-categories">
        <div className="card-ingredients">
          <div className="card-ingredients-header">
            <img className="category-img" src={el.image} />
          </div>
          <div className="card-ingredients-body">
            <span className="username">{el.name}</span>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="which-restaurant">
      <div className="which-restaurant-left">
        <h3 className="which-restaurant-title">Sousse, Sahloul</h3>
        <div className="refresh">
          <i className="fal fa-location" />
          <span className="refresh-text">Actualiser</span>
        </div>
      </div>
      <div className="which-restaurant-right">
        <button className="navigation-restaurant" type="button" data-toggle="restaurant" onClick={handleClick}>
          <i className="fal fa-sliders-h params" />
        </button>
        <div
          className="dropdown-pane"
          id="navigation-restaurant"
          data-dropdown
          data-auto-focus="true"
          style={{ display: anchorEl ? "block" : "none" }}
        >
          <div className="affiner-header">
              <span>Affiner l’affichage</span>
              <i className="fal fa-sliders-h  paramas-setting" onClick={handleClose} />
          </div>
          <div>
            <Slider {...settings}>
              {items}
            </Slider>
          </div>
          <div className="country-dropdown">
            <div className="country">
              <span> Choisir gouvernerat</span>
              <i className="fal fa-bars bars" />
            </div>
            <div className="drop-pa" id="country-dropdown">
              <form>
                <div className="dropdown-top">
                  <span>Votre région</span>
                  <i className="fal fa-bars menu-close" />
                </div>
                <div className="countries">
                  <div className="country-with-lettre">
                    <div>
                      <span>Béja</span>
                    </div>
                    <div className="lettre">
                      <span>B</span>
                    </div>
                  </div>
                  <div className="country">
                    <span>Ben Arous</span>
                  </div>
                  <div className="country">
                    <span>Sidi Bouzid</span>
                  </div>
                  <div className="country">
                    <span>Tunis</span>
                  </div>
                  <div className="country">
                    <span>Monastir</span>
                  </div>
                  <div className="country">
                    <span>Jendouba</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="choose-options">
            <div className="header">
              <span>Ambiance</span>
              <span>Prix &amp; Budget <span className="single"> / personne</span></span>
            </div>
            <div className="options">
              <div className="item">
                <input className="checkbox" type="checkbox" id="checkbox-1" name="checkbox" />
                <label htmlFor="checkbox-1" />
                <span>En famille</span>
              </div>
              <div className="item">
                <input className="checkbox2" type="checkbox" id="checkbox-2" name="checkbox" />
                <label htmlFor="checkbox-2" />
                <span>En famille</span>
              </div>
            </div>
            <div className="options">
              <div className="item">
                <input className="checkbox" type="checkbox" id="checkbox-3" name="checkbox" />
                <label htmlFor="checkbox-3" />
                <span>En famille</span>
              </div>
              <div className="item">
                <input className="checkbox2" type="checkbox" id="checkbox-4" name="checkbox" />
                <label htmlFor="checkbox-4" />
                <span>En famille</span>
              </div>
            </div>
            <div className="options">
              <div className="item">
                <input className="checkbox" type="checkbox" id="checkbox-5" name="checkbox" />
                <label htmlFor="checkbox-5" />
                <span>En famille</span>
              </div>
              <div className="item">
                <input className="checkbox2" type="checkbox" id="checkbox-6" name="checkbox" />
                <label htmlFor="checkbox-6" />
                <span>En famille</span>
              </div>
            </div>
            <div className="options">
              <div className="item">
                <input className="checkbox" type="checkbox" id="checkbox-7" name="checkbox" />
                <label htmlFor="checkbox-7" />
                <span>En famille</span>
              </div>
              <div className="item">
                <input className="checkbox2" type="checkbox" id="checkbox-8" name="checkbox" />
                <label htmlFor="checkbox-8" />
                <span>En famille</span>
              </div>
            </div>
            <div className="options">
              <div className="item">
                <input className="checkbox" type="checkbox" id="checkbox-9" name="checkbox" />
                <label htmlFor="checkbox-9" />
                <span>En famille</span>
              </div>
              <div className="item">
                <input className="checkbox2" type="checkbox" id="checkbox-10" name="checkbox" />
                <label htmlFor="checkbox-10" />
                <span>En famille</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EpicEatsFiltre

