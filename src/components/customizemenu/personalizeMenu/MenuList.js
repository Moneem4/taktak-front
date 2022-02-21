import React, { useContext, useState, useEffect } from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";
import { UserContext } from "../../../context/UserContext";
import MenuItemCard from "./MenuItemCard";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch ,useHistory} from "react-router-dom";

function MenuList(props) {
  const { getPersonalizedMenuByUserIdRestaurantId, personalizeArticle } = useContext(RestaurantContext);
  const { activeUser } = useContext(UserContext);

  const getUrlFromPath = () => {
    const paths = window.location.href.split("/");
    let url = paths[4];

    return url;
  };

  const [articlesList, setArticlesList] = useState(null);
  useEffect(() => {
    getPersonalizedMenuByUserIdRestaurantId(
      activeUser.userId,
      getUrlFromPath(),
      setArticlesList
    );
  }, [props]);

  let history=useHistory()
  const refreshPage = ()=>{
    window.location.reload();
  }

  function navigation(){
    history.push('/payer/'+getUrlFromPath())
    refreshPage()
  }
  
  return (
    <div>
      {articlesList && (
        <div className="fourth-panel3">
          <div className="fourth-panel3-header">
            <div className="commander" onClick={navigation}>
            <div>
              Commander
              <i className="fal fa-shopping-cart" />
            </div>
              <a className="button-commander-hover" >
                <div className="toggle-switch">
                  <span>Sur place</span>
                  <div className="switch">
                    <input
                      className="switch-input"
                      id="exampleSwitch"
                      type="checkbox"
                      name="exampleSwitch"
                    />
                    <label className="switch-paddle" htmlFor="exampleSwitch">
                      <span className="show-for-sr">Download Kittens</span>
                    </label>
                  </div>
                  <span>Take a way</span>
                </div>
              </a>
            </div>
            <div className="fourth-p3-header-right-side">
              <button className="save">
                Sauvegarder
                <i className="far fa-book-heart" />
              </button>
              <button className="reserver">
                <a href="booking-page.html">
                  Réserver
                  <i className="fal fa-chair" />
                </a>
              </button>
            </div>
          </div>
          <div className="customize-order-final-step" >
            {articlesList.map((item) => (
              <MenuItemCard item={item} key={item._id} />
            ))}
          </div>
          <div className="fourth-p3-bottom">
            <div className="important">
              <i className="far fa-exclamation-square" />
              <span>Important</span>
            </div>
            <div className="imporant-p">
              <span>
                Si vous choisissez de réserver cet menu, vous serez invité à
                choisir une des deux options suivantes:{" "}
              </span>
              <div>
                <img src="../assets/img/svg/Ellipse 485.png" alt="" />
                <span>
                  {" "}
                  Créer une nouvelle réservation avec ce restaurant.{" "}
                </span>
              </div>
              <div>
                <img src="../assets/img/svg/Ellipse 485.png" alt="" />
                <span>
                  Associez ce menu à une réservation encore valable avec ce même
                  restaurant.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuList;
