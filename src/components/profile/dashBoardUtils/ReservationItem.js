import React from "react";
import  Rating  from "@material-ui/lab/Rating";

function ReservationItem(props) {
  const {reservation} = props;
  return (
    <div className="my-booking-ele">
      <a className="my-booking-ele-top" href="booking-process.html">
        <div className="you-may-like-element-booking">
          <div className="you-may-like-element-media-booking">
            <img src={reservation.restaurant.avatar} />
          </div>
          <div className="you-may-like-element-info-booking">
            <div className="info-header">
              <img src={reservation.restaurant.avatar} />
              <div className="name">
                <span className="restaurant-name">
                  {reservation.restaurant.name}
                </span>
                <span className="restaurant-location">
                  <i className="icon-marker" />
                  {reservation.restaurant.location}
                </span>
                <div className="raiting">
                  <Rating disabled value={reservation.restaurant.rate} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {reservation.isConfirmed ? (
          <span className="Confirmed">
            Confirmée <i className="fal fa-calendar-check" />
          </span>
        ) : (
          <span>
            En attente <i className="icon-time" />
          </span>
        )}
      </a>
      <div className="divider" />
      <a className="my-booking-ele-bottom" href="booking-process.html">
        <div>
          <span className="my-booking-label">Date &amp; Heure</span>
          <span className="my-booking-value">
            {/* Lundi 12 Mars 2010 / 19:00 – 21:00 */}
            {`${reservation.date} / ${reservation.time}`}
          </span>
        </div>
        <div>
          <span className="my-booking-label">Nombre de personnes</span>
          <span className="my-booking-value">
            <span className="number">{reservation.numberOfperson}s</span>
            <div className="peoples">
              <div className="people">
                <img src={reservation.peopleOnTakaTak[0].avatar} />
              </div>
              <div className="people">
                <img src={reservation.peopleOnTakaTak[1].avatar} />
              </div>
              <div className="people">
                <img src={reservation.peopleOnTakaTak[2].avatar} />
              </div>
            </div>
            <span className="number-sur-taktak">
              {" "}
              Dont {reservation.peopleOnTakaTak.length} son sur TakTak
            </span>
          </span>
        </div>
        <div>
          <span className="my-booking-label">Modalité de payement</span>
          <span className="my-booking-value"> {reservation.paymentMethod}</span>
        </div>
        <div>
          <span className="my-booking-label">Votre note spéciale</span>
          <span className="my-booking-value">
            «&nbsp;{reservation.specialNote}&nbsp;»
          </span>
        </div>
      </a>
    </div>
  );
}

ReservationItem.propTypes = {};

export default ReservationItem;
