import React, { useContext } from "react";
import ProposerMoiSideBar from "./ProposerMoiSideBar";
import RestaurantCard from "./RestaurantCard";
import Slider from 'infinite-react-carousel';
import { UiContext } from '../../context/UiContext';

function ProposerMoiUnRestaurant() {
  const {restaurants} = useContext(UiContext);
  
  const settings =  {
    // autoplay: true,
    // rows:1,
    slidesPerRow: 1,
    centerMode: true,
    centerPadding: 120,
    // duration: 500,
    // shift: 10,
    // initialSlide: 0,
    dots: true
  };

  const items = restaurants.map((el) => (
    <div>
      <RestaurantCard restaurant={el} />
    </div>
  ));


  return (
    <div>
      <div className="proposer-moi-page">
        <div className="proposer-moi-page-content container">
          <div className="proposer-moi-page-content-feed">
          <div className="feed-main"  >
            <div style={{width: '50%', margin: 10}}>
              <Slider { ...settings }>
                {items}
              </Slider>
              <div className="slider-controls">
                  <button id="goNext"><span className="fal fa-times" /></button>
                  <button id="goPrev"><span className="fal fa-check" /></button>
              </div>
            </div>
          </div>
            <ProposerMoiSideBar />
            
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProposerMoiUnRestaurant;
