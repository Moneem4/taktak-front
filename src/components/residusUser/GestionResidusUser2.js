import React, { useContext, useState, useEffect } from "react";
import { RestaurantContext } from "../../context/RestaurantContext";
import { UserContext } from "../../context/UserContext";
import SidebarResidusUser from "./SidebarResidusUser";
import TextField from '@material-ui/core/TextField';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import CardResidusUser from "./CardResidusUser";
import Grid from "@material-ui/core/Grid";
import _ from "lodash";

function GestionResidusUser2(props) {
  const {activeUser, getUnwastables, commandeResidu, setCommandeResidu} = useContext(UserContext);
  const { getCategoryByArticle } = useContext(RestaurantContext);
  const [listArticles, setListArticles] = useState();
  const [unwastable, setUnwastable] = useState([]);  
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getUnwastables(setUnwastable)
  }, [props]);

  useEffect(() => {
    unwastable && unwastable.forEach((el)=>{  
      el.list.forEach((category)=>{
        category.articles.forEach((article)=>{
          const dataArticle= {
            ...article,
            restaurantId: el.restaurantId,
            unwastableMenuId: el._id
          }
          setArticles((prev) => [...prev, dataArticle])
        })
      })
    })

    /*if (articles) {
      const groups = _.groupBy(articles, "unwastableMenuId");
      setListArticles(groups);
    }*/
  }, [unwastable]);

  let arr = []
  if(articles.length>0){
    articles.map((el) => {
      getCategoryByArticle(el.article._id).then(response => {
        const articleInfo = {
          ...el.article,
          category: response
        }
        arr.push(articleInfo)
      });
    }); 
  }

  //const groups = arr ? _.groupBy(arr, "categoryId") : [];
  //setListArticles(groups);

  return (
    <div className="gestion-de-residus">
      <div className="gestion-de-residus-content">
        <div className="gestion-de-residus-Restaurant-content-feed container">
          <div className="gestion-residus-Restaurant">
            <div className="gestion-residus-Restaurant-header">
              <span className="gestion-residus-Restaurant-header-title">
              <span  style={{color:"#ff6900"}}>Hi {activeUser.lastName}</span><br></br><br></br><br></br>
                Gestion de résidus
              </span>
              <span className="gestion-residus-Restaurant-header-description">
                Cet espace vos permet de gérer le résidus de vos aliments et plats.
              </span>
              <span className="gestion-residus-Restaurant-header-title"> </span>
            </div>  
            <div style={{ marginTop: 30 }}>
              <FilterListIcon style={{width:50 , height:"auto",color:"#ff6900" ,marginLeft:20}} />
              <TextField id="standard-basic" label="Choisir Gourvernat" style={{width:100,marginLeft:20 }}  />
              <TextField id="standard-basic" label="Le moins chers" style={{width:100,marginLeft:20 }} />
              <TextField id="standard-basic" label="Le plus récents" style={{width:100,marginLeft:20 }} />
            </div>
            <div className="menu-gestion-residus">
              <SearchIcon style={{marginLeft:40}}/>
              <span>{articles.length} Resultats trouvé</span>
              <div className="menu-body"  >
                <div>
                  {/*<h1>{el.restaurant.name}</h1>  */} 
                  <Grid container spacing={3}>
                    {articles && articles.map((article)=>
                      <Grid item xs={6} key={article._id}>
                        <CardResidusUser
                          article={article}
                          myCommande={commandeResidu}
                          setMyCommande={setCommandeResidu}
                          unwastable={unwastable}
                        />
                      </Grid>
                    )}
                  </Grid> 
                </div>
              {/*
                unwastable && unwastable.map((el) => {
                  return (
                    <div>
                      <h1>{el.restaurant.name}</h1>   
                      {el.list.map((list) => {
                        return (
                          <Grid container spacing={3}>
                            {list.articles.map((article)=>{
                              return(
                              <Grid item xs={6}>
                                 <CardResidusUser
                                  article={article}
                                  list={list}
                                  myCommande={commandeResidu}
                                  setMyCommande={setCommandeResidu}
                                  unwastable={unwastable}
                                />
                              </Grid>
                            )})}
                          </Grid>);
                      })}  
                    </div>
              )})*/}
            </div>
          </div>       
        </div>
        <SidebarResidusUser
          myCommande={commandeResidu}
          setMyCommande={setCommandeResidu}
        />
      </div>
    </div>   
  </div>
  );
}

GestionResidusUser2.propTypes = {};

export default GestionResidusUser2;
