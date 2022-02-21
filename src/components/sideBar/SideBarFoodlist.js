import React, {useContext} from 'react';
import { UiContext } from '../../context/UiContext';

function SideBarFoodlist(props) {
    const {} = props;
    const { foodiste } = useContext(UiContext);
    
    return (
      <div>
        <div className="title-feed-secondary">
          <span>Foodiste de la semaine</span>
        </div>
        <div className="foodliste-week-profile">
          <div className="profil-foodlist">
            <div className="visitor">
              <div className="visitor-avatar">
                <img src={foodiste.profileImage} />
              </div>
              <div className="visitor-info">
                <span className="user-username">{foodiste.userName}</span>
                <div className="user-about">
                  <i className="fal fa-map-marker-alt" aria-hidden="true" />
                  <span>{foodiste.adresse}</span>
                </div>
              </div>
            </div>
            <div className="follow-button">
              <i className="icon-add-friend" />
            </div>
          </div>
          <div className="foodliste-week-footer">
            <div className="item">
              <div className="outside-circle">
                <div className="circle-orange">
                  <i className="fal fa-mobile-android" />
                </div>
              </div>
              <span>{foodiste.stories} stories</span>
            </div>
            <div className="item">
              <div className="outside-circle">
                <div className="circle-orange">
                  <i className="fal fa-mobile-android" />
                </div>
              </div>
              <span>{foodiste.articles} articles</span>
            </div>
            <div className="item">
              <div className="outside-circle">
                <div className="circle-orange">
                  <i className="fal fa-mobile-android" />
                </div>
              </div>
              <span>{foodiste.posts} posts</span>
            </div>
            <div className="item">
              <div className="outside-circle">
                <div className="circle-orange">
                  <i className="fal fa-mobile-android" />
                </div>
              </div>
              <span>{foodiste.restos} restos</span>
            </div>
          </div>
        </div>
      </div>
    )
}

SideBarFoodlist.propTypes = {

}

export default SideBarFoodlist