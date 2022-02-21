import React, {useState, useContext} from 'react';
import { PostContext } from "../../context/PostContext";

function NavBarBlog(props) {
  const { filter, setFilter } = useContext(PostContext);
  const [styleSelected, setStyleSelected] = useState("tabs-title is-active");
  const [styleNotSelected, setStyleNotSelected] = useState("tabs-title");

  const filterPosts = (type) => {
    setFilter(type);
  };

    return (
        <div className="blog-header container">
            <ul className="tabs" data-tabs id="example-tabs">
              <span className="all-categories"> <i className="fal fa-caret-circle-down" /> Toutes les catégories</span>
              
              <li className= { filter === "RECETTES" ? styleSelected : styleNotSelected }
                onClick={() => filterPosts("RECETTES")}>
                <a 
                  ><strong> Recettes</strong> (23)</a>
              </li>

              <li className={ filter === "VAYAGE_CULINAIRE" ? styleSelected : styleNotSelected }
                 onClick={() => filterPosts("VAYAGE_CULINAIRE")}>
                <a 
                  > <strong> Voyage culinaire</strong> (14)</a>
              </li>

              <li className={ filter === "REGIME" ? styleSelected : styleNotSelected }
                 onClick={() => filterPosts("REGIME")}>
                <a 
                  > <strong>Régime</strong> (31)</a>
              </li>

              <li className= { filter === "DESSERTS_SUCRES" ? styleSelected : styleNotSelected }
                 onClick={() => filterPosts("DESSERTS_SUCRES")}>
                <a 
                  > <strong>Desserts &amp; Sucrés</strong> (12)</a>
              </li>

              <span className="most-valued">Les plus évalués<i className="fal fa-caret-down" /></span>
            </ul>
          </div>
    )
}

NavBarBlog.propTypes = {

}

export default NavBarBlog