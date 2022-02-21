import React, { useState, useContext } from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";
import ReactStars from "react-rating-stars-component";
import Modal from "../../util/UtilModal";

function MenuCard(props) {
  const { article, restaurant } = props;
  const [showModal, setShowModal] = useState(false);
  const [showModalRating, setShowModalRating] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const openModalRating = () => {
    setShowModalRating(true);
  };
  const { deleteArticle } = useContext(RestaurantContext);

  function removeArticle(id) {
    deleteArticle(id);
  }
  const firstExample = {
    size: 30,
    value: article.articleRate,
    edit: false,
  };
  
  return article ? (
    <div className="card" style={{ width: "100%", height: 310 }}>
      <div className="cardTop">
        <img
          style={{ objectFit: "contain" }}
          src={`https://${article.image}`}
        ></img>
      </div>
      <div className="cardBottom">
        <div className="cardText">
          <span className="food-name">{article.name}</span>
          <div className="sub-title">
            <p>{article.ingredients.map((el) => `${el},  `)}</p>
          </div>
          <div className="price" style={{cursor : "pointer !important",marginTop: -10}}>
            <span>{article.price} dt</span>
            <div onClick={openModalRating}>
            <ReactStars {...firstExample} />
            </div>
           
          </div>
          <div className="cardHoverText">
            <div className="menu-info-bottom">
              <div className="menu-info-bottom-content">
                <div className="time">
                  <i className="fal fa-clock" />
                  <span>{article.duration} min</span>
                </div>
                <div className="icons">
                  <i className="fal fa-pen" onClick={openModal} />
                  <i
                    className="fal fa-trash-alt"
                    onClick={() => removeArticle(article._id)}
                  />
                  <i className="fal fa-paper-plane paper" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        page="updateArticle"
        article={article}
        restaurant={restaurant}
      />

      <Modal
        showModal={showModalRating}
        setShowModal={setShowModalRating}
        page="createRating"
        evaluatedId={article._id}
        ratingType="ARTICLE"
      />
    </div>
  ) : (
    <></>
  );
}

MenuCard.propTypes = {};

export default MenuCard;
