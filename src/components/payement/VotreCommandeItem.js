import React, {useContext} from 'react';
import { UiContext } from '../../context/UiContext';
import { RestaurantContext } from "../../context/RestaurantContext";

function VotreCommandeItem(props) {
    const {article, setArticles, articles} = props;
    const { getIndex} = useContext(UiContext);
    var index = getIndex(article._id, articles, '_id');
    const { deleteArticleFromPersonalizeMenu, updateArticleOfPersonalizedMenu } = useContext(RestaurantContext);

    function IncrementItem() {
        const data = {
          quantity: article.quantity + 1,
        };
        
        updateArticleOfPersonalizedMenu(article._id, data);
        setArticles((prevArticles) => {
          let items = [...prevArticles];
          let item = { ...items[index] };
          const updatedMenu = {
            ...prevArticles[index],
            quantity: item.quantity + 1,
          };
          items[index] = updatedMenu;
    
          return items;
        });
    }

    function DecreaseItem() {
        if (article.quantity > 1) {
          const data = {
            quantity: article.quantity - 1
          };
          updateArticleOfPersonalizedMenu(article._id, data);
          setArticles((prevArticles) => {
            let items = [...prevArticles];
            let item = { ...items[index] };
            const updatedMenu = {
              ...prevArticles[index],
              quantity: item.quantity - 1,
            };
            items[index] = updatedMenu;
    
            return items;
          });
        }
    }
    
    function removeArticle() {
        deleteArticleFromPersonalizeMenu(article._id);
        
        setArticles((prevArticles) => {
          let items = [...prevArticles];
          const indexArticle = items.findIndex((el) => el._id === article._id);
          items.splice(indexArticle, 1);
          return items;
        });
    }
    
    const articleOptionPrice= article && article.articleOptions && article.articleOptions.map((el)=>el.optionPrice);

    const articleOptionName= article && article.articleOptions && article.articleOptions.map((el)=>el.optionName);

    var sum = 0;
    for( var i = 0; i < articleOptionPrice.length; i++ ){
      sum += articleOptionPrice[i] ; 
    }

    return (
        <div className="paiement-recap">
            <img src={`https://${article.image}`} className="paiement-recap-img" style={{height: 100}}/>
            <div className="paiement-recap-main">
                <span className="food-name">{article.name}</span>
                {
                    <span className="food-description"> {article.ingredients} {articleOptionName} </span>
                }
            </div>
            <div className="paiement">
                <div className="Qte">
                    <span className="Qte-title">Quantité</span>
                    <i className="fal fa-minus-square moins" onClick={DecreaseItem} />
                    <span className="Qte-number">{article.quantity}</span>
                    <i className="fal fa-plus-square plus" onClick={IncrementItem} />
                </div>
                <div className="price">
                    <span className="total-price">Prix total</span>
                    <span className="price-number">
                    {article.articleOptions ?(article.price*article.quantity)+sum :(article.price*article.quantity)} dt</span>
                </div>
            </div>
            <div className="remove" onClick={() => removeArticle()} >
                <i className="fal fa-trash-alt" />
            </div>
        </div>
    )
}

VotreCommandeItem.propTypes = { }

export default VotreCommandeItem

