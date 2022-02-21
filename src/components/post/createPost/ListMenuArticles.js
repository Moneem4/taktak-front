import React, { useContext, useState, useEffect } from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";
import withStyles from "@material-ui/core/styles/withStyles";
import { UserContext } from "../../../context/UserContext";

const styles = (theme) => ({
    root: {
        width: 600,
        height: 450,
        backgroundColor: "#fff",
        marginLeft: "-10%",
        overflow: "scroll",
        padding: 10
    }
});

function ListMenuArticles(props) {
  const { classes, setShowModal, postForm, setPostForm, typePost } = props;
  const {activeUser} = useContext(UserContext);
  const {getArticlesByRestaurantId} = useContext(RestaurantContext);
  const [articlesList, setArticlesList] = useState(null);

  const handleClose = () => {
    setShowModal(!props.showModal);
  };
  
  const handleChange = (article) => {
      if(typePost==="promos"){
        const item = {
            _id: article._id,
            image: article.image,
            name: article.name
        }
        setPostForm({...postForm, articlesId: [...postForm.articlesId, article._id], articles: [...postForm.articles, item]});
      }else {
        const item = {
            _id: article._id,
            image: article.image,
            name: article.name
        }
        setPostForm({...postForm, articlesId: [article._id], articles: [item]});
      }
    handleClose()
  };

  useEffect(() => {
    getArticlesByRestaurantId(activeUser.userId, setArticlesList);
  }, []);

  return (articlesList && 
    <div className={classes.root}>
        {articlesList.map((article, index) => (
            <div style={postForm.articlesId.findIndex(el => el === article._id) >= 0 ? 
                {border: '1px solid #ff6900', borderRadius: "5px", height: 104, marginBottom: 10} : 
                {border: '1px solid #ffffff'}} key={index}>
                <div className="post-article" onClick={() => handleChange(article)} >
                    <img src={`https://${article.image}`} className="post-article-img" style={{height: 100}}/>
                    <div className="post-article-main">
                        <span className="food-name">{article.name}</span>
                        <span className="food-description">{article.ingredients.map((el) => `#${el} `)} </span>
                    </div>
                    <div className="postArticle">
                        <div className="price">
                            <span className="total-price">Prix: </span>
                            <span className="price-number">{article.price} </span>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
  );
}

export default withStyles(styles)(ListMenuArticles);
