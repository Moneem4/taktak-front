import React, { useContext } from "react";
import { PostContext } from "../../../context/PostContext";

function QuestionType(props) {
  const { notif } = props;
  const { setNotificationsSideBar } = useContext(PostContext);

  function removeNotif() {
    console.log("remoooove:",notif)
    setNotificationsSideBar((prevNotifications) => {
      let items = [...prevNotifications];
      console.log("bbb:",items)
      const indexNotif = items.findIndex((el) => el === notif);
      items.splice(indexNotif, 1);
      return items;
    });
  }

  setTimeout(() => {  
    removeNotif()
  }, 2000);
console.log("kkkkk:",notif)
  return (
    <div className="notifications-two" href="booking-page-process.html">
      <div className="header">
        <i className="fal fa-cookie-bite" />
        <span>Poser une question</span>
        <i
          className="fal fa-times times-two"
          onClick={removeNotif}
        />
      </div>
      <a className="box-notifications" href="booking-page-process.html">
        <img src={`https://${notif.newPost.user.avatar}`} className="logo" />
        <div className="details">
          <span>
            <strong>{notif.newPost.user.firstName} {notif.newPost.user.lastName} </strong> pose une question
            <strong>{notif.newPost.post.content}</strong>
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

export default QuestionType;
