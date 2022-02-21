import React, {useState, useContext, useEffect} from 'react';
import { PostContext } from "../../context/PostContext";
import ProfileStoryItem from '../profile/ProfileStoryItem';
import { NavLink } from "react-router-dom";

function ProfileRestaurantStories(props) {
    const {profileImage} = props
    const { getStoryItemsByUserId } = useContext(PostContext);
    const [stories, setStories] = useState(null);

    const getUrlFromPath = () => {
      const paths = window.location.href.split("/");
      let url = paths[4];
      return url;
  
    };

    useEffect(() => {
      getStoryItemsByUserId(getUrlFromPath(), setStories);
    }, [props]);

    return (
      <div className="user-info-stories">
        {!props.isntme?(
          <NavLink exact to={`/story/create`} style={{marginTop: "2%"}}>
            <div className="story add" >
              <div className="story-image">
                <span>+</span>
              </div>
              <span className="story-user">
                Aujourd’hui
              </span>
            </div>
          </NavLink>
        ):(<></>)}
        {
          stories && stories.map(el => (<ProfileStoryItem profileImage={el.url} story={el}/>))
        }
        <div className="all-stories" style={{marginTop: "2%"}}>
          <span>Toutes mes stories</span>
        </div>
      </div> 
    )
}

export default ProfileRestaurantStories
