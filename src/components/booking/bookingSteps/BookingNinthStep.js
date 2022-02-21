import React from 'react';

function BookingNinthStep(props) {
    
    return (
        <div className="orbit-slide">
            <div id="loading">
                <div className="loading-inner">
                    <div id="circle" />
                    <img className="chief" src="../../assets/img/svg/chief.svg" />
                </div>
                <div className="loading-info">
                    <span>
                        Votre réservation a été prise en considération!
                    </span>
                    <p>
                        Vous recevrez une notification de confirmation de
                        la part du restaurant.
                    </p>
                </div>
            </div>
        </div>
    )
}

BookingNinthStep.propTypes = {

}

export default BookingNinthStep
