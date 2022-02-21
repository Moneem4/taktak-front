import React from 'react'
import PropTypes from 'prop-types'
import PostFooter from '../../post/PostFooter'
import Rating from '@material-ui/lab/Rating'

function EvaluationItem(props) {
    const {evaluation} =props
    const {user,evaluated}=evaluation
    return (
             <div className="card post-card">
          <div className="post-card-header">
            <div className="post-card-photo more" />
          </div>
          <div className="post-card-body">
            <div className="user-who-post-wrapper">
              <div className="user-who-post">
                <div className="user-who-post-info">
                  <div className="user-who-post-info-avatar">
                    <img src={user.profileImage} />
                  </div>
                  <div className="user-who-post-info-info">
                    <span className="user-username">{user.userName}</span>
                    <div className="user-about">
                      <i className="fal fa-map-marker-alt" />
                      <span> {evaluated.name}</span>
                    </div>
                  </div>
                </div>
                <div className="user-who-post-options">
                <div className="raiting">
                <Rating
                name="read-only"
                value={evaluated.rate}
                readOnly
              />
                  </div>
                  <div className="header-note">
                    <span>
                    {evaluated.rate} <strong>/5</strong>
                    </span>
                  </div>
                </div>
              </div>
              <div className="post-card-body-description-user">
                <div className="description-note">
                  <span className="note"> {evaluated.rate}/5</span>
                  <span className="date">12 janvier 2020 à 18:30</span>
                </div>
                <span className="description">
                 {evaluated.commentaire}
                </span>
              </div>
            </div>
          </div>
          <div className="divider" />
          <PostFooter post={evaluated}
                user={user} />
        </div>
      
    )
}

EvaluationItem.propTypes = {

}

export default EvaluationItem

