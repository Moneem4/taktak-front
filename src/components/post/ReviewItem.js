import React from 'react'
import PropTypes from 'prop-types'
import { Rating } from '@material-ui/lab'

function ReviewItem(props) {
    return (
        <div className="one-review">
        <div className="one-review-images">
          <img
            className="person"
            src="../assets/img/avatar.png"
          />
          <div className="star">
            <i className="icon-star" />
          </div>
          <img
            className="restaurant"
            src="../assets/img/icon-restaurant.png"
          />
        </div>
        <div className="one-review-text">
          <span className="person">Lobna Kbayer</span> a évalué
          <span className="restaurant">HOBOS Resto</span>
        </div>
        <div className="rating">
         <Rating value={3}/>
        </div>
      </div>
     
    )
}

ReviewItem.propTypes = {

}

export default ReviewItem

