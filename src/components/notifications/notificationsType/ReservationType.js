import React, {useContext} from 'react';
import { UiContext } from '../../../context/UiContext';
import Rating from "@material-ui/lab/Rating";

function ReservationType(props) {
    const {notif} = props;
    const {setNewNotifications} = useContext(UiContext);

    function removeNotif(notifId) {
      setNewNotifications((prevNotifications) => {
          let items = [...prevNotifications];
          const indexNotif = items.findIndex(
              el => el.id === notifId
          );
          items.splice(indexNotif, 1);
          return items ;
      })
    }

    return (
        <div className="notifications-one">
            <div className="header">
                <i className="fal fa-hourglass" />
                <span>{notif.nameNotif}</span>
                <i className="fal fa-times times-one" onClick={() => removeNotif(notif.id) }/>
            </div>
            <a className="box-notifications" href="booking-page-process.html">
                <img src="../../assets/img/93abed8fb705713fe9a3df74f5d2d7ea.png" className="food" />
                <img src={notif.restoImage} className="logo" />
                <div className="details">
                    <span className="name">{notif.restoName}</span>
                    <div className="location">
                        <i className="fal fa-map-marker-alt" /> {notif.adresse}, {notif.cuisine}
                    </div>
                    <Rating 
                        name="read-only"
                        value={notif.rate}
                        readOnly
                    />
                </div>
            </a>
            <div className="bottom">Consulter tout</div>
        </div>
    )
}

ReservationType.propTypes = { }

export default ReservationType