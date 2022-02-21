import React from 'react'
import PropTypes from 'prop-types'

function PromoTakTak(props) {
    return (
        <div className="promos-tak-tak">
        <div className="promos-tak-tak-header">
          <h3 className="promos-title">Promos TAK TAK</h3>
          <i className="icon-dots-horizontal" />
        </div>
        <div className="promos">
          <div className="promo">
            <img src="../assets/img/6e7b74dc0f53f8fff799e1b32d704554.png" alt="promo tak tak" />
          </div>
          <div className="promo">
            <img src="../assets/img/6faba7a30c26fb8ad06a842784a80722.png" alt="promo tak tak" />
          </div>
        </div>
      </div>
    )
}

PromoTakTak.propTypes = {

}

export default PromoTakTak

