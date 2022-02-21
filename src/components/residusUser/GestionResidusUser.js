import React, { useContext, useState, useEffect } from "react";
import { RestaurantContext } from "../../context/RestaurantContext";
import { UserContext } from "../../context/UserContext";
import SidebarResidusUser from "./SidebarResidusUser";
import TextField from '@material-ui/core/TextField';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import CardResidusUser from "./CardResidusUser";
import Grid from "@material-ui/core/Grid";
import { RegionDropdown } from "react-country-region-selector";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton"
import _ from "lodash";

function GestionResidusUser(props) {
  const {activeUser, commandeResidu, setCommandeResidu} = useContext(UserContext);
  const { getUnwastableArticles, getSearchUnwastableArticles, getCategories} = useContext(RestaurantContext);
  const [unwastableArticles, setUnwastableArticles] = useState([]);
  const [categories, setCategories] = useState();
  const [filtre, setFiltre] = useState({
    country: "Tunisia",
    location:"",
    category: "",
  })

  const selectLocation = (val) => {
    if(val === "Location"){
      setFiltre({ ...filtre, location: "" });
    }else{
      setFiltre({ ...filtre, location: val });
    }
  };

  const selectCategory = (event, val) => {
    if(val){
      setFiltre({ ...filtre, category: val.name });
    }else{
      setFiltre({ ...filtre, category: "" });
    }
  };

  function searchArticles() {
    const data = {
      location: filtre.location,
      category: filtre.category
    }
    getSearchUnwastableArticles(data, setUnwastableArticles)
  }

  useEffect(() => {
    getUnwastableArticles(setUnwastableArticles)
    getCategories(setCategories)
  }, [props]);

  const [listArticles, setListArticles] = useState();
  useEffect(() => {
    if (unwastableArticles) {
      const groups = _.groupBy(unwastableArticles, "categoryName");
      setListArticles(groups);
    }
  }, [unwastableArticles]);

  return (unwastableArticles && 
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
            <div style={{ marginTop: 15 }}>
              <Grid container direction="row">
                <Grid item xs={1} style={{ marginTop: "2%" }}>
                  <FilterListIcon style={{width:30 , height:"auto", color:"#ff6900" ,marginLeft:10}} />
                </Grid>
                <Grid item xs={3} style={{ marginTop: "2%" }}>
                  <RegionDropdown
                    blankOptionLabel="No country selected..."
                    defaultOptionLabel="Location"
                    country={filtre.country}
                    value={filtre.location}
                    name={"location"}
                    onChange={selectLocation}
                    style={{height: 50, fontSize: 17}}
                  />
                </Grid>
                <Grid item xs={3} style={{ marginLeft: "2%" }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    name={"category"}
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    onChange={selectCategory}
                    renderInput={(params) => <TextField {...params} label="Category" 
                      //InputProps={{style: { height: 49, fontSize: 17}}}
                      />}
                  />
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={1}>
                  <IconButton
                    color="inherit"
                    aria-label="menu"
                    onClick={searchArticles}
                  >
                    <SearchIcon fontSize="large" style={{ color: "#ff6900" }} />
                  </IconButton>
                </Grid>
              </Grid>
              {/*<TextField id="standard-basic" label="Le plus récents" style={{width:100,marginLeft:20 }} />*/}
            </div>
            <div className="menu-gestion-residus">
              <SearchIcon style={{marginLeft:40}}/>
              <span>{unwastableArticles.length} Resultats trouvé</span>
              <div className="menu-body"  >
              {listArticles &&
                Object.keys(listArticles).map((key) => {
                  return (
                    <div key={key}>
                      <h1>{key}</h1>
                      <Grid container spacing={3}> 
                        {listArticles[key].map((item, index) => (
                          <Grid item xs={6}>
                            <CardResidusUser
                              article={item}
                              list={listArticles}
                              myCommande={commandeResidu}
                              setMyCommande={setCommandeResidu}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </div>
                  )}
              )}
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

GestionResidusUser.propTypes = {};

export default GestionResidusUser;
