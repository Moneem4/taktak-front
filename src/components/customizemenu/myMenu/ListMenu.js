import React, { useContext, useEffect, useState } from "react";
import ListMenuCard from "./ListMenuCard";
import { NavLink } from "react-router-dom";
import { RestaurantContext } from "../../../context/RestaurantContext";
import { UserContext } from "../../../context/UserContext";
import { BrowserRouter as Router, Route, Switch ,useHistory} from "react-router-dom";

function ListMenu(props) {
  const { restaurant } = props;
  const { getPersonalizedMenuByUserIdRestaurantId } = useContext(RestaurantContext);
  const { activeUser } = useContext(UserContext);
  const {commande,setCommande } = useContext(UserContext);
  const [articles, setArticles] = useState(null);
  
  useEffect(() => {
    getPersonalizedMenuByUserIdRestaurantId(
      activeUser.userId,
      restaurant._id,
      setArticles
    );
  }, [props]);
  
  function removeArticles() {
    setArticles([]);
  }

  var somme2=0
 
  if(articles){
        for( var i = 0; i < articles.length; i++ ){
            somme2+=(articles[i].price * articles[i].quantity)
                if(articles[i].articleOptions){
                 for(var j=0;j<articles[i].articleOptions.length;j++)
                 {
          
                    somme2 += articles[i].articleOptions[j].optionPrice ;
        
                }
                   
                    
                    }
else{
                    somme2+=articles[i].price * articles[i].quantity
    }
    
  }}

  const [checked, setChecked] = useState("ON_THE_SPOT");
  const handlePayementChange = (value, e) => {
    setChecked({ ...checked, [value]: e.target.checked });
  
       if (!checked[value] === true) {
      setCommande((prev) => {
        
        let modes = [...prev.commandeTakenMethod, value];

        let updatedMode = { ...prev, commandeTakenMethod: modes };

        return updatedMode;
      })

  }
   
  } 
 
  let history=useHistory()
  const refreshPage = ()=>{
    window.location.reload();
  }

  function navigation(){
    history.push('/payer/'+restaurant._id)
    refreshPage()
  }
  
  return articles && (
    <div>
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
                <div className="arrow-left-iconS3">
                  <i className="fal fa-long-arrow-alt-left" />
                </div>
                <div className="switch">
                  <input
                    className="switch-input"
                    id="exampleSwitch"
                    type="checkbox"            
                    checked={checked.TAKE_AWAY}
                    onClick={(e) => handlePayementChange("TAKE_AWAY", e)}
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
      </div>
        <div className="seconde-panel3">
          <div className="menu-to-confirmed">
            <div className="articles">
              <NavLink
                exact
                to={`/profileRestaurant/` + restaurant._id + `/menu`}
              >
                <div className="arrow-left-iconS3">
                  <i className="fal fa-long-arrow-alt-left" />
                </div>
              </NavLink>
              <div className="nbrs-articles">
                <img src="../../../assets/img/svg/Page-1.png" alt="article" />
                <div>
                  <span>Votre panier</span>
                  <span> ({articles.length} articles) </span>
                </div>
              </div>
              <div className="delete-menu" onClick={removeArticles}>
                <i className="far fa-eraser" />
                <span>Effacer menu</span>
              </div>
            </div>
            <div className="price-to-pay" onClick={navigation}>
              <span >À payer</span>
              <span>
                {somme2 }
                DT
              </span>
            </div>
          </div>
          {articles.map((el) => (
            <ListMenuCard
              article={el}
              key={el._id}
              restaurant={restaurant}
              articles={articles}
              setArticles={setArticles}
            />
          ))}
        </div>
    </div>
  );
}

export default ListMenu;
