import React, { useState, useContext, useEffect } from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";
import withStyles from '@material-ui/core/styles/withStyles';
import Ingredient from "../../../assets/img/svg/Ingredient.svg";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import _ from "lodash";

const styles = (theme) => ({
    combobox:{
      padding: "0 2rem",
      borderRadius: 5,
      margin: "2rem 0",
      height: "64px",
      borderColor: "#d5d5d5",
      fontSize: "1.4rem",
      color: "#707070"
    }
});

function AddIngredients(props) {
  const { classes } = props;
  const { personalizeArticle, setPersonalizeArticle } = useContext(RestaurantContext);
  const [input, setInput] = useState("");
  const [selectedOption,setSelectedOption]=useState()
  const [show, setShow] = useState("");
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState(null);

  const handleClickChange = (value) => {
    setSelectedOption(value);
  
    if(personalizeArticle.newIngredients && personalizeArticle.articleOptionsId){
      setPersonalizeArticle((prevPersonalizeArticle) => {
        let items = { ...prevPersonalizeArticle };
        const articleOption={
          id:value._id,
          optionName:value.optionName,
          optionAvatar:value.optionAvatar,
          optionPrice:value.optionPrice
        }
        
        let listNewIngredients = [...items.newIngredients, articleOption];
        let listArticleOptions = [...items.articleOptionsId, value._id];
        items = {
          ...prevPersonalizeArticle,
          newIngredients: listNewIngredients,
          articleOptionsId: listArticleOptions
        };  
        return items;
      });
      setValue(personalizeArticle.articleOptions[0].optionName);
    }else{
      setPersonalizeArticle((prevPersonalizeArticle) => {
        let items = { ...prevPersonalizeArticle };
        const articleOption={
          id:value._id,
          optionName:value.optionName,
          optionAvatar:value.optionAvatar,
          optionPrice:value.optionPrice
        }
        items.newIngredients=[]
        items.articleOptionsId = []
        let listNewIngredients = [...items.newIngredients, articleOption];
        let listArticleOptions = [...items.articleOptionsId, value._id];
        items = {
          ...prevPersonalizeArticle,
          newIngredients: listNewIngredients,
          articleOptionsId: listArticleOptions
        };  
        return items;
      });
    }
    setInput("");
  };

  const handleKeyDown = (event, value) => {
    if (event.key === "Enter") {

      if(personalizeArticle.newIngredients && personalizeArticle.articleOptionsId){
        setPersonalizeArticle((prevPersonalizeArticle) => {
          let items = { ...prevPersonalizeArticle };
          const articleOption={
            id:value._id,
            optionName:value.optionName,
            optionAvatar:value.optionAvatar,
            optionPrice:value.optionPrice
          }
          
          let listNewIngredients = [...items.newIngredients, articleOption];
          let listArticleOptions = [...items.articleOptionsId, value._id];
          items = {
            ...prevPersonalizeArticle,
            newIngredients: listNewIngredients,
            articleOptionsId: listArticleOptions
          };  
          return items;
        });
      }else{
        setPersonalizeArticle((prevPersonalizeArticle) => {
          let items = { ...prevPersonalizeArticle };
          const articleOption={
            id:value._id,
            optionName:value.optionName,
            optionAvatar:value.optionAvatar,
            optionPrice:value.optionPrice
          }
          items.newIngredients=[]
          items.articleOptionsId = []
          let listNewIngredients = [...items.newIngredients, articleOption];
          let listArticleOptions = [...items.articleOptionsId, value._id];
          items = {
            ...prevPersonalizeArticle,
            newIngredients: listNewIngredients,
            articleOptionsId: listArticleOptions
          };  
          return items;
        });
      }
      setInput("");
    }
  };
    
  const [listIng, setListIng] = useState();
  useEffect(() => {
    if (personalizeArticle.article) {
      const groups = _.groupBy(personalizeArticle.article.articleOptions, "optionType");
      setListIng(groups);
    }
  }, [personalizeArticle.article]);
  
  return (
    <div className="customize-order-add-Ingredients">
      <div className="first-title">
        <span>Ajouter des ingrédients</span>
      </div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onKeyDown={(e) => handleKeyDown(e, value)}
        options={personalizeArticle.articleOptions}
        getOptionLabel={(option) => option.optionName}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
              loading="lazy"
              width="30"
              src={`https://${props.optionAvatar}`}
              alt=""
              style={{marginRight: 10}}
            />
            {props.optionName} ({props.optionPrice} dt) 
          </Box>
        )}
        className={classes.combobox}
        style={{height: "15px"}}
        renderInput={(params) => <TextField {...params} label="Options" />}
      />

      <div className="seconde-title" style={{marginTop: 100}}>
        <span>Ou-bien choisir des listes suivantes</span>
      </div>
        {listIng &&
            Object.keys(listIng).map((key) => {
              return (
                <div className="list-of-ingredients-to-choose" key={key}>
                  <div className="confirmation-bottom-content">
                    <img
                      src={Ingredient}
                      style={{ width: 30, height: 30 }}
                    />
                    <span className="title">{key}</span>
                    <span className="numbers-of-ingr">Il existe {listIng[key].length} ingrédients</span>
                    <i className="fa fa-plus  show-plus"
                      style={{
                        display: show === "" ? "block" : "none",
                        marginTop: -50,
                      }}
                      onClick={() => setShow(key)}
                    />
                    <i className="fa fa-minus  close-ing"
                      style={{
                        display: show === key ? "block" : "none",
                        marginTop: -50,
                      }}
                      onClick={() => setShow("")}
                    />
                    <span className="numbers-in-the-list" style={{ marginTop: -50 }}>
                      ( <span style={{ color: "#FF6900" }}> {listIng[key].length} </span> ) dans la liste
                    </span>
                    <div className="menu-customization-confirmation-ingredients"
                      style={{ display: show === key ? "block" : "none" }}
                    >
                      <div className="list-of-ingredients" >
                        {listIng[key].map((item, index) => (
                          <div className="card-ingredients"key={item} id={item._id}
                            onClick={(e) => handleClickChange(item)}
                            style={
                              selectedOption === item._id
                                ? {
                                    border: "1px solid #ff6900",
                                    borderRadius: 5,
                                    width: "93% !important",
                                  }
                                : { border: "1px solid #b9b5b5" }
                            }>
                            <div className="card-ingredients-header">
                              <img
                                className="avatar"
                                src={`https://${item.optionAvatar}`}
                              />
                            </div>
                            <div className="card-ingredients-body">
                              <span className="username">{item.optionName}</span>
                            </div>
                            <div className="card-ingredients-footer">
                              <div className="follow-button" style={{marginLeft: "-5%", width: 60, marginTop: "20%"}}>
                                <span >+ {item.optionPrice} dt</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
        })}
    </div>
  );
}

export default withStyles(styles)(AddIngredients);
