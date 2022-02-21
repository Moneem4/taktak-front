import React from 'react';
import { NavLink } from "react-router-dom";

function MyStory(props) {
  
    return (
      <NavLink exact to={`/story/create`}>
        <div className="carousel-cell" >
          <div className="story add">
            <div className="story-image">
              <span>+</span>
            </div>
            <span className="story-user">
              Vous
            </span>
          </div>
        </div>
      </NavLink>
    )
}

export default MyStory

