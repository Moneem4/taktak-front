import React from 'react'
import PropTypes from 'prop-types'

function RestaurantBook(props) {
    return (
        <div className="restaurant-book">
        <div className="restaurant-book-header">
          <div className="description-left">
            {/* <i className="icon-chair"></i> */}
            <a className="title" href="booking-page.html">
              Réservez un restaurant
            </a>
            <div className="description-footer">
              Proin sit amet ipsum eget ante venenatis posuere. Maecenas
              diam risus, accumsan at facilisis sit amet, eleifend et
              arcu.
            </div>
          </div>
          <div>
            <i className="fal fa-chevron-right" />
          </div>
        </div>
        <div className="restaurant-book-footer">
          <div className="footer-left">
            <span className="highlighted">Restos</span>
            <span>
              Les plus
              <br />
              demandés
            </span>
          </div>
          <div className="footer-right">
            <img src="../assets/img/3f08a2ba008fd3dd0d8090b4d7ab82d8.png" />
            <img src="../assets/img/earth-2.png" />
            <img src="../assets/img/fossa.png" />
            <img src="../assets/img/fox-hub-2.png" />
            <img src="../assets/img/asgardia-2.png" />
            <img src="../assets/img/muzica-2.png" />
          </div>
        </div>
      </div>

    )
}

RestaurantBook.propTypes = {

}

export default RestaurantBook

