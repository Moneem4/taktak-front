import React, {useContext, useRef} from 'react';
import FoodCategory from './FoodCategory';
import Slider from "infinite-react-carousel";
import { UserContext } from '../../context/UserContext';
import { RestaurantContext } from '../../context/RestaurantContext';

function AutourdeMoi(props) {
 const {follwing} = useContext(UserContext)
 //const {} = useContext(RestaurantContext);

  const sliderRef = useRef();

  const settings =  {
    autoplay: false,
    //dots: true,
    dotsScroll: 1,    
    arrows: false
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
    //sliderRef.current.slickGoTo(2)
  }

    return (
      <div className="autour-de-moi-page">
        <div className="autour-de-moi-page-content container">
          <div className="autour-de-moi-page-content-inner">
            <div className="content-header">
              <img className="man-2min" src="../assets/img/svg/man-2min.svg" />
              <span className="header-title">
                Hey! Mongi, vous êtes ici pour la première fois?
              </span>
              <span className="header-description">
                Nous voudrions vous aider à mieux trouver le meilleur restaurant
                pour votre prochaine dinner.
              </span>
              <span className="header-helper">
                Définissez vos préférences en répondant aux questions suivants
                (2min).</span>
              <div className="content-body" style={{width: "90%", height: "50%", margin: 50}}>
                <Slider { ...settings } ref={sliderRef}>
                  <div className="vousetesplutotBigBox">
                    <span className="vousetesplutot">What are you looking for ?1</span>
                    <div className="vousetesplutotBox">
                      <FoodCategory  category={{name:"Restaurant", question:"question1"}} next={goToNext} />
                      <FoodCategory category={{name:"Pizzeria", question:"question1"}} next={goToNext}/>
                      <FoodCategory category={{name:"Fast Food", question:"question1"}} next={goToNext}/>
                      <FoodCategory category={{name:"Creperie", question:"question1"}} next={goToNext}/>
                      <FoodCategory category={{name:"Desserts", question:"question1"}} next={goToNext}/>
                      <FoodCategory category={{name:"Coffee and Tea", question:"question1"}} next={goToNext}/>
                      <FoodCategory category={{name:"Bakeries", question:"question1"}} next={goToNext}/>
                      <FoodCategory category={{name:"Ice-cream Shops", question:"question1"}} next={goToNext}/>
                    </div>
                  </div>
                  <div className="vousetesplutotBigBox">
                    <span className="vousetesplutot">When are you coming ? 2</span>
                    <div className="slide-content-three">
                      <FoodCategory  category={{name:"Morning", question:"question2"}} next={goToNext}/>
                      <FoodCategory  category={{name:"Noon", question:"question2"}} next={goToNext}/>
                      <FoodCategory  category={{name:"Night", question:"question2"}} next={goToNext}/>
                      {/*<div className="food-category">
                        <img className="category-img" src="assets/img/svg/pasta.svg" />
                        <span className="category-name">Morning</span>
                      </div>
                      <div className="food-category">
                        <img className="category-img" src="assets/img/svg/pizza.svg" />
                        <span className="category-name">Noon</span>
                      </div>
                      <div className="food-category">
                        <img className="category-img" src="assets/img/svg/fruitdemer.svg" />
                        <span className="category-name">Night</span>
                      </div>*/}
                    </div>
                  </div>
                  <div className="vousetesplutotBigBox">
                    <span className="vousetesplutot">How much money do you have ? 3</span>
                    <div className="slide-content-three">
                      <FoodCategory  category={{name:"Fast food", question:"question3"}} next={goToNext}/>
                      <FoodCategory  category={{name:"Fast food", question:"question3"}} next={goToNext}/>
                      <FoodCategory  category={{name:"Fast food", question:"question3"}} next={goToNext}/>
                    </div>
                  </div>
                  <div className="vousetesplutotBigBox">
                    <span className="vousetesplutot">What does your craving look like ? 4</span>
                    <div className="slide-content">
                      <FoodCategory  category={{name:"Coffee & Tea", question:"question4"}} />
                      <FoodCategory  category={{name:"Meat", question:"question4"}} />
                      <FoodCategory  category={{name:"Chicken", question:"question4"}} />
                      <FoodCategory  category={{name:"SeaFood", question:"question4"}} />
                      <FoodCategory  category={{name:"Soup", question:"question4"}} />
                      <FoodCategory  category={{name:"Salads", question:"question4"}} />
                      <FoodCategory  category={{name:"Sandwiches", question:"question4"}} />
                      <FoodCategory  category={{name:"Hamburgers", question:"question4"}} />
                      <FoodCategory  category={{name:"Pizza", question:"question4"}} />
                      <FoodCategory  category={{name:"Vegetarian", question:"question4"}} />
                      <FoodCategory  category={{name:"Vegan", question:"question4"}} />
                      <FoodCategory  category={{name:"Tapas", question:"question4"}} />
                      <FoodCategory  category={{name:"Gluten-Free", question:"question4"}} />
                      <FoodCategory  category={{name:"Juice & Smoothies", question:"question4"}} />
                      <FoodCategory  category={{name:"Kebab", question:"question4"}} />
                      <FoodCategory  category={{name:"Waffles", question:"question4"}} />
                      <FoodCategory  category={{name:"Falafel", question:"question4"}} />
                      <FoodCategory  category={{name:"Wraps", question:"question4"}} />
                      <FoodCategory  category={{name:"Cheesesteaks", question:"question4"}} />
                      <FoodCategory  category={{name:"Donuts", question:"question4"}} />
                      <FoodCategory  category={{name:"Ice Cream & Frozen Yogurt", question:"question4"}} />
                      <FoodCategory  category={{name:"Hot Dogs", question:"question4"}} />
                      <FoodCategory  category={{name:"Bagels", question:"question4"}} />
                      <FoodCategory  category={{name:"Tacos", question:"question4"}} />
                      <FoodCategory  category={{name:"Barbeque", question:"question4"}} />
                      <FoodCategory  category={{name:"Ramen", question:"question4"}} />
                      <FoodCategory  category={{name:"Bakeries", question:"question4"}} />
                      <FoodCategory  category={{name:"Chicken Wings", question:"question4"}} />
                      <FoodCategory  category={{name:"Cocktail Bars", question:"question4"}} />
                      <FoodCategory  category={{name:"Noodles", question:"question4"}} />
                      <FoodCategory  category={{name:"Sushi Bars", question:"question4"}} />
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

AutourdeMoi.propTypes = {

}

export default AutourdeMoi

