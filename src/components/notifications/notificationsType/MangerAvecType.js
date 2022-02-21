import React, { useContext } from "react";
import { UiContext } from "../../../context/UiContext";
function MangerAvecType(props) {
  const { notif } = props;
  const { setNewNotifications } = useContext(UiContext);
  function removeNotif(notifId) {
    setNewNotifications((prevNotifications) => {
      let items = [...prevNotifications];
      const indexNotif = items.findIndex((el) => el.id === notifId);
      items.splice(indexNotif, 1);
      return items;
    });
  }
  return (
    <div className="notifications-two" href="booking-page-process.html">
      <div className="header">
        <i className="fal fa-cookie-bite" />
        <span>{notif.nameNotif}</span>
        <i
          className="fal fa-times times-two"
          onClick={() => removeNotif(notif.id)}
        />
      </div>
      <a className="box-notifications" href="booking-page-process.html">
        <img src={notif.userProfileImage} className="logo" />
        <div className="details">
          <span>
            {" "}
            <strong>{notif.user}</strong> est actuellement à{" "}
            <strong>{notif.restoName}</strong> et elle accepte de partager sa
            table avec un inconnu.
          </span>
          <div className="button">
            <i className="fal fa-cookie-bite" />
            <span>Répondre à sa demande</span>
            <i className="fal fa-comments-alt" />
          </div>
        </div>
      </a>
    </div>
  );
}
MangerAvecType.propTypes = {};
export default MangerAvecType;
