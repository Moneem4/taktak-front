import React from 'react';
import ReactStars from 'react-rating-stars-component';

function RestaurantCardSearch(props) {
  const {result} = props;

  const rating = {
    size: 10,
    value: 4,
    edit: false,
  };

    return (
      <div className="card restaurant-post-card">
        <div className="restaurant-my-besty-button">
          <button>
            <span className="button-my-besty">My Besty</span>
            <span className="button-enlever">Enlever</span>
            <i className="fal fa-star" />
          </button>
        </div>
        {/* <div>  <ReactStars {...rating} /></div> */}
     
        <div className="restaurant-post-card-header">
          <div className="restaurant-post-card-photo">
            <img src={`https://${result.avatar}`} alt="restaurant-post " />
          </div>
        </div>
        <div className="restaurant-post-card-body">
          <div className="restaurant-who-post-wrapper">
            <div className="restaurant-who-post">
              <div className="restaurant-who-post-info">
                <div className="restaurant-who-post-info-avatar">
                  <img src={`https://${result.backgroundImage}`} />
                </div>
                <div className="restaurant-who-post-info-info">
                  <span className="restaurant-username">{result.name}</span>
                  <div className="restaurant-about">
                    <i className="icon-marker" />
                    <span>{result.location}, {result.specialty.map((el) => `#${el} `)}</span>
                  </div>
                </div>
              </div>
              <div className="restaurant-who-post-options">
                <div className="cup-button">
                  <i className="fal fa-wine-glass-alt" />
                </div>
                <div className="followed">
                  <i className="icon-checked" />
                  <span>Déjà suivi</span>
                </div>
                <div className="more-options">
                  <i className="icon-dots-horizontal" />
                </div>
              </div>
            </div>
            <div className="restaurant-post-card-body-description">
              {result.description}
            </div>
          </div>
        </div>
      </div>
   
    )
}

export default RestaurantCardSearch

