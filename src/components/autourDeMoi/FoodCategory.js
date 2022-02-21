import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { RestaurantContext } from '../../context/RestaurantContext';

function FoodCategory(props) {
    const {category, next} = props;
    const {response, setResponse} = useContext(RestaurantContext);

    const changeQuestion = () => {
    
        setResponse({ ...response, [category.question]: category.name });
        
        if(category.question !== "question4"){
            next();
        }
    };

    return (
        <div>
            {(category.question === "question4") ? 
            (
                <NavLink exact to={`/autourDeMoi/${props.category.name}`}>
                    <div className="food-category" onClick={changeQuestion} >
                        <img className="category-img" src="../assets/img/svg/fastfood.svg" />
                        <span className="category-name">{category.name}</span>
                    </div>
                </NavLink>
            ):(
                <div className="food-category" onClick={changeQuestion} >
                    <img className="category-img" src="../assets/img/svg/fastfood.svg" />
                    <span className="category-name">{category.name}</span>
                </div>
            )}
        </div>
    )
}

export default FoodCategory

