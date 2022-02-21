import React from 'react';

function DetailCommandeItem (props) {
    const {article} = props;
    
    const articleOptionPrice=article.articleOptions.map((el)=>el.optionPrice)

    var sum = 0;
    var somme=0;
    const articleQuantity=article.quantity;
    const articlePrice= article.price;

    if(articleOptionPrice)
    {
        for(var i=0;i<articleOptionPrice.length;i++){
            if(articleOptionPrice){
                sum+=articleOptionPrice[i];
            }else{
                sum+=0;
            } 
        }
    }
    somme = articleQuantity * articlePrice + sum;

    return (
        <div className="details-commande-food">
            <div className="left-side"> 
                <img src={`https://${article.image}`} className="details-commande-img" />
                <div className="main">
                    <span className="food-name">{article.name} - {article.size}</span>
                    <span className="food-description">{article.ingredients.map((el) => `#${el} `)}</span>
                    {article.articleOptions ? 
                        <span className="food-description"> {article.articleOptions.map((el) => `#${el} `)}</span>
                    :
                        <></>
                    }
                    <div className="time">
                        <i className="fal fa-clock" />
                        <span>{article.duration} min</span>
                    </div>
                </div>
            </div>
            <div className="right-side">
                <div className="quantity">
                    <span className="Qnt-title">Quantité</span>
                    <span className="Qnt-number">{article.quantity}</span>
                </div>
                <div className="price">
                    <span className="price-title">Prix Total</span>
                    <span className="price-number"> {somme} dt</span>
                </div>
            </div>
        </div>            
    )
}

export default DetailCommandeItem 

