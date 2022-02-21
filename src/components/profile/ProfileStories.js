import React, {useState, useContext, useEffect} from 'react';
import { UserContext } from "../../context/UserContext";
import { PostContext } from "../../context/PostContext";
import ProfileStoryItem from './ProfileStoryItem';
import { NavLink } from "react-router-dom";

function ProfileStories(props) {
    const {profileImage} = props
    const { activeUser } = useContext(UserContext);
    const { getStoryItemsByUserId } = useContext(PostContext);
    const [stories, setStories] = useState(null);

    useEffect(() => {
      getStoryItemsByUserId(activeUser.userId, setStories);
    }, [props]);

    return (
      <div className="user-info-stories">
        {!props.isntme?(
          <NavLink exact to={`/story/create`} style={{marginTop: "4%"}}>
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
        {stories ?
          stories.map(el => (<ProfileStoryItem profileImage={profileImage} story={el}/>))
        :
          <div className="story-empty">
            <i className="fas fa-info" />
            <span>Cet espace est réservé à vos stories. Partagez vos moments culinaires avec la communauté.</span>
          </div>
        }

        {stories ? 
          <div className="all-stories">
            <span>Toutes mes stories</span>
          </div>
        :
          <></>
        }
      </div> 
    )
}

export default ProfileStories
