import React from 'react'
import PropTypes from 'prop-types'
import ReviewItem from './ReviewItem'

function Reviews(props) {
    return (
        <div className="reviews">
        <h3 className="reviews-title">Reviews</h3>
        <div className="reviews-body">
          <div className="reviews-list">
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
          </div>
          <div className="divider" />
          <div className="reviews-options">
            <span>Consulter plus de reviews</span>
            <i className="icon-dots-horizontal" />
          </div>
        </div>
      </div>

    )
}

Reviews.propTypes = {

}

export default Reviews

