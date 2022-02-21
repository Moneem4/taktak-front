import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from "../../context/UserContext";
import { RestaurantContext } from '../../context/RestaurantContext';

function RestaurantCardPost(props) {
    const {restaurantPost}=props;
    const {activeUser, updateTaktakPoints} = useContext(UserContext);
    const { isBesty, createBestie, deleteBestie, isFollowingRestaurant, followRestaurant, unfollowRestaurant, 
      isAlcoholic } = useContext(RestaurantContext);
    const [isBestie, setIsBestie] = useState(false);
    const [isAlcool, setIsAlcool] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const [restoFollowed, setRestoFollowed] = useState(false);

    function addBestie() {
      createBestie(restaurantPost._id, setIsBestie);
    };

    function enleverBestie() {
      deleteBestie(isBestie._id);
    };

    function addFollowRestaurant() {
      followRestaurant(restaurantPost._id, activeUser.userId, setRestoFollowed, setIsFollowed)
      .then(response => {
        updateTaktakPoints( activeUser.userId, activeUser.countPoints+2);
      });
    };

    function removeFollowRestaurant() {
      unfollowRestaurant(restoFollowed._id, setIsFollowed);
    };

    useEffect(() => {
        isBesty(restaurantPost._id ,setIsBestie);
        isAlcoholic(restaurantPost._id ,setIsAlcool);
        isFollowingRestaurant(restaurantPost._id, activeUser.userId, setIsFollowed);
    }, [props]);

    console.log("restaurantPost",restoFollowed);
    return (
        <div className="card restaurant-post-card">
            {isBestie ?   
              (<div className="restaurant-my-besty-button">
                  <button>
                    <span className="button-my-besty">My Besty</span>
                    <span className="button-enlever" onClick={enleverBestie}>Enlever</span>
                    <i className="fal fa-star" aria-hidden="true" />
                  </button>
                </div>
              ):(
                <div className="restaurant-my-besty-button">
                  <button>
                    <span className="button-my-besty-click" onClick={addBestie}>Besty</span>
                    <i className="fal fa-star" aria-hidden="true" />
                  </button>
                </div>
            )}
             
                <div className="restaurant-post-card-header">
                  <div className="restaurant-post-card-photo">
                    <img src={`https://${restaurantPost.backgroundImage}`} alt="restaurant-post " />
                  </div>
                </div>
                <div className="restaurant-post-card-body" >
                  <div className="restaurant-who-post-wrapper" >
                    <div className="restaurant-who-post">
                      <div className="restaurant-who-post-info">
                        <div className="restaurant-who-post-info-avatar">
                          <img src={`https://${restaurantPost.avatar}`} />
                        </div>
                        <div className="restaurant-who-post-info-info">
                          <span className="restaurant-username">{restaurantPost.name}</span>
                          <div className="restaurant-about">
                            <i className="icon-marker" />
                            <span>{restaurantPost.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="restaurant-who-post-options">
                        {isAlcool? <div className="cup-button">
                          <i className="fal fa-wine-glass-alt" />
                        </div>:<></>}

                        {isFollowed ? 
                          ( <div className="followed" onClick={removeFollowRestaurant}>
                              <i className="icon-checked" />
                              <span>Déjà suivi</span>
                            </div>
                          ):(    
                            <div className="suiver-button" onClick={addFollowRestaurant}>
                              <i className="fal fa-utensils-alt" />
                              <span>Suivre</span>
                            </div>
                        )}
                       
                        <div className="more-options">
                          <i className="icon-dots-horizontal" />
                        </div>
                      </div>
                    </div>
                    <div className="restaurant-post-card-body-description" style={{marginBottom: 50, height: "50px"}}>
                      {restaurantPost.description}
                    </div>
                  </div>
                </div>
              </div>
              
    )
}

RestaurantCardPost.propTypes = {

}

export default RestaurantCardPost

