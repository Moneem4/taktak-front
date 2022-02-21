import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { PostContext } from '../../context/PostContext';
import { UiContext } from '../../context/UiContext';
import NotificationSideBar from "./NotificationSideBar";
import { NavLink } from 'react-router-dom';
import NewPostNotification from "./NewPostNotification";

function Notifications(props) {
  const { classes } = props;
  const { getNotifNewPost } = useContext(UserContext)
  const { notifications, setNotifications, getUserNotifications, setShowNotifIcon } = useContext(PostContext);
  const [showPanel1, setShowPanel1] = useState(true);
  const [showPanel2, setShowPanel2] = useState(false);
  const [stylePanel1, setStylePanel1] = useState("tabs-title is-active");
  const [stylePanel2, setStylePanel2] = useState("tabs-title");
  const [userNotifsList, setUserNotifsList] = useState(null);

  const renderNotif = (param) => {
    switch (param.type) {
        case "poste":
            return (
              <div>
                <div className="notification-element">
                  <span className="circle" />
                  <div className="notification-element-top">
                    <img src={param.profileImage} />
                    <div className="notification-top-info">
                      <span><strong>{param.participants[0].name} </strong> et {param.participants.length - 1} autres ont aimé
                        votre post</span>
                      <span><i className="fal fa-history" />il y a {param.date}</span>
                    </div>
                  </div>
                  <div className="notification-element-body">
                    <img src={param.posteImage} />
                    <div className="body-info">
                      <p> {param.postDescription} </p>
                      <div className="notification-icons">
                        <span> <i className="icon-heart" /> {param.postLikes}</span>
                        <span> <i className="icon-comment" />{param.postComments}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="divider" />
              </div>
            )
          ;
        case "invitation":
          return (
            <div>
              <div className="notification-element">
                <span className="circle" />
                <div className="notification-element-top">
                  <img src={param.profileImage} />
                  <div className="notification-top-info">
                    <span><strong>{param.userName} </strong>a accepté votre demande de connexion</span>
                    <span><i className="fal fa-history" /> il y a {param.date}</span>
                  </div>
                </div>
                <div className="notification-element-footer">
                  <i className="fal fa-comments-alt" /> Commencer une conversation
                </div>
              </div>
              <div className="divider" />
            </div>
          );
        case "maj":
          return (
              <div>
                <div className="notification-element taktak">
                    <span className="circle" />
                    <div className="notification-element-top">
                      <span>
                        <i className="fal fa-shield-check" />
                      </span>
                      <div className="notification-top-info">
                        <span> Nous avons mis à jour notre
                          <strong> {param.description} </strong>
                        </span>
                        <span><i className="fal fa-history" />il y a {param.date}</span>
                      </div>
                    </div>
                    <div className="notification-element-footer-taktak">
                      <span className="title-strong">Consulter les nouvelles conditions</span>
                    </div>
                  </div>
                  <div className="divider" />
              </div>
            );
        case "commentaire":
          return (
              <div>
                <div className="notification-element comment">
                    <span className="circle" />
                    <div className="notification-element-top">
                      <img src={param.restoImage} />
                      <div className="notification-top-info">
                        <span><strong>{param.restoName} </strong> t’a mentionné dans un commentaire</span>
                        <span><i className="fal fa-history" />il y a {param.date}</span>
                      </div>
                    </div>
                    <div className="notification-element-body">
                      <div className="body-info">
                        <p> {param.commentaire} </p>
                        <div className="reply">
                          Répondre
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="divider" />
              </div>
            );
        case "inviter":
          return (
              <div>
                <div className="notification-element taktak">
                  <span className="circle" />
                  <div className="notification-element-top">
                    <span>
                        <i className="fal fa-gift" />
                      </span>
                      <div className="notification-top-info">
                        <span> Invitez un ami à suivre un restaurant et gagnez
                          <strong>{param.description}</strong>
                        </span>
                        <span><i className="fal fa-history" />il y a {param.date}</span>
                      </div>
                    </div>
                    <div className="notification-element-footer-taktak">
                      <span className="title-strong">Obtenez votre lien de parrainage</span>
                    </div>
                  </div>
                  <div className="divider" />
              </div>
            );
        case "recherche":
          return (
              <div>
                <div className="notification-element taktak">
                    <span className="circle" />
                    <div className="notification-element-top">
                      <span>
                        <i className="fal fa-search" />
                      </span>
                      <div className="notification-top-info">
                        <span>
                          Vous êtes apparu dans
                          <strong> {param.description} recherches</strong> cette semaine.
                        </span>
                        <span><i className="fal fa-history" />il y a {param.date}</span>
                      </div>
                    </div>
                    <div className="notification-element-footer-taktak">
                      {param.users.map((participant) => (
                        <img src={participant.profilePicture} />
                      ))}
                    </div>
                  </div>
                  <div className="divider" />
              </div>
            );
        case "shouaiteAnnif":
          return (
              <div>
                <div className="notification-element taktak">
                  <span className="circle" />
                  <div className="notification-element-top">
                    <span>
                      <i className="fal fa-birthday-cake" />
                    </span>
                    <div className="notification-top-info">
                      <span> Vous êtes apparu dans
                        <strong> 3 recherches</strong> cette semaine.
                      </span>
                      <span><i className="fal fa-history" />il y a {param.date}</span>
                    </div>
                  </div>
                  <div className="notification-element-footer-taktak">
                    <span className="title">Hey! Souhaitez un Joyeux anniversaire er proposez un restaurant pour la
                      fête.</span>
                    <div className="send-birthday">
                      <input type="text" />
                      <i className="fal fa-at" />
                      <button>Envoyer</button>
                    </div>
                  </div>
                </div>
                <div className="divider" />
              </div>
            );
        case "reservation":
          return (
              <div>
                <a className="notification-element-rappel" href="booking-page-process.html">
                    <div className="notification-element-rappel-right-side">
                      <i className="fal fa-user-clock" />
                    </div>
                    <div className="notification-element-rappel-left-side">
                      <div className="notification-rappel-top">
                        <div className="notification-top-info">
                          <img src={param.restoImage} alt="" />
                          <div className="info-restaurant">
                            <span className="name">{param.restoName} </span>
                            <span className="details"><i className="fal fa-history" />il y a {param.date}</span>
                          </div>
                        </div>
                        <div className="rappel-reservation"><span>Rappel pour Réservation</span></div>
                      </div>
                      <div className="notification-element-body">
                        <img src={param.restoBackgroundImage} alt="" />
                        <div className="body-info">
                          <div>
                            <span className="my-booking-label">
                              Date &amp; Heure</span>
                            <span className="my-booking-value">
                              {param.time}</span>
                          </div>
                          <div>
                            <span className="my-booking-label">
                              Nombre de personnes</span>
                            <span className="my-booking-value">
                              <span className="number">{param.participants.length}</span>
                              <div className="peoples">
                                {param.participants.map((participant) => (
                                  <div className="people">
                                    <img src={participant.profilePicture} />
                                  </div>
                                ))}
                              </div>
                              <span className="number-sur-taktak"> Dont 3 son sur TakTak</span>
                            </span>
                          </div>
                          <div>
                            <span className="my-booking-label">
                              Modalité de payement</span>
                            <span className="my-booking-value"> {param.payement}</span>
                          </div>
                          <div>
                            <span className="my-booking-label">
                              Promo</span>
                            <span className="my-booking-value"> {param.promo}</span>
                          </div>
                          <div>
                            <span className="my-booking-label">
                              Votre note spéciale</span>
                            <span className="my-booking-value">
                              «&nbsp; {param.note} &nbsp;»</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                  <div className="divider" />
              </div>
            );
        case "anniversaire":
          return (
              <div>
                <div className="notification-element birthday">
                    <div className="notification-element">
                      <span className="left-side">
                        <i className="fal fa-birthday-cake" aria-hidden="true" />
                      </span>
                      <div className="right-side">
                        <img src="../assets/img/f722d9048b529fc2d13f2406469b4b7b.png" alt="" />
                        <div className="wish-a-ha-bir">
                          <span>Joyeux anniversaire {param.userName}, Wooooow !</span>
                          <div className="circle-" />
                        </div>
                        <div className="time">
                          <i className="fal fa-history" />
                          <span> il y a {param.date} </span>
                        </div>
                        {param.comments.map((comment) => (
                          <div className="notifications-user-birthday">
                            <img src={comment.userImage} />
                            <div className="description">
                              <p>{comment.user} t’a souhaité un joyeux anniversaire.</p>
                              <p> Elle t’a proposé <strong> {comment.restoName} </strong>  pour la fête.</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="divider" />
              </div>
            );
        case "commande":
          return (
              <div>
                <a className="notification-element taktak" style={{display: 'flex', flexDirection: 'column'}}>
                    <span className="circle" />
                    <div className="notification-element-top">
                      <span>
                        <i className="fal fa-box-heart" />
                      </span>
                      <div className="notification-top">
                        <span>
                          Consultez l’état de vos commandes (<span style={{color: '#ff6900', fontSize: '1.8rem'}}>
                            {param.commandes.length} </span>).
                        </span>
                      </div>
                    </div>
                    <div className="notification-element-footer-commande">
                      {param.commandes.map((commande) => (
                        <NavLink exact to={`/suivi-commande`}>
                          <div className="ref-commande">
                            <span className="ref">Ref: <span className="numero">{commande.ref}</span> </span>
                          </div>
                        </NavLink>
                      ))}
                    </div>
                </a>
                <div className="divider" />
              </div>
            );
        case "mangerAvec":
          return (
              <div>
                <div className="notification-element eat">
                  <div className="notification-element">
                    <span className="left-side">
                      <i className="fal fa-cookie-bite" aria-hidden="true" />
                    </span>
                    <div className="right-side">
                      <div className="wish-a-ha-bir">
                        <span>Manger avec inconnu</span>
                        <div className="circle-" />
                      </div>
                      <div className="time">
                        <i className="fal fa-history" />
                        <span> il y a {param.date}</span>
                      </div>
                      {param.propositions.map((proposition) => (
                        <div className="notifications-user-birthday">
                          <img src={proposition.userImage} />
                          <div className="description">
                            <p>{proposition.user} t’a souhaité un joyeux anniversaire.</p>
                            <p> Elle t’a proposé <strong> {proposition.restoName} </strong> pour la fête.</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
        case "QUESTION":
          return (
            <div>
              <div className="notification-element">
                <span className="circle" />
                <div className="notification-element-top">
                  <img src={`https://${param.newPost.user.avatar}`} />
                  <div className="notification-top-info">
                    <span><strong>{param.newPost.user.firstName} {param.newPost.user.lastName}</strong> a posé une question</span>
                    <span><i className="fal fa-history" /> il y a {param.newPost.post.createdAt}</span>
                  </div>
                </div>
                <div className="notification-element-body">
                    <div className="body-info">
                      <p> {param.newPost.post.content} </p>
                      <div className="notification-icons">
                        <span> <i className="icon-heart" /> {param.newPost.post.likes ? param.newPost.post.likes.length : 0}</span>
                        <span> <i className="icon-comment" />{param.newPost.post.comments ? param.newPost.post.comments.length : 0}</span>
                      </div>
                    </div>
                  </div>
              </div>
              <div className="divider" />
            </div>
          );          
        default:
          return (null);
    }
  }

  function showPanelRecentes() {
    setShowPanel1(true);
    setShowPanel2(false);
    setStylePanel1("tabs-title is-active");
    setStylePanel2("tabs-title");
  }

  function showPanelAnciennes() {
    setShowPanel1(false);
    setShowPanel2(true);
    setStylePanel2("tabs-title is-active");
    setStylePanel1("tabs-title");
  }

  useEffect(() => {
    getUserNotifications(setUserNotifsList);
    setShowNotifIcon(false);
  }, []);
  
    return (
      <div className="notifications-page">
        <div className="notifications-page-content container">
          <div className="notifications-page-content-feed">
            <div className="feed-main" >
              <ul className="tabs" data-tabs id="example-tabs">
                <li className={stylePanel1} >
                    <a aria-selected="true" onClick={() => showPanelRecentes()}>Récentes</a>
                </li>
                <li className={stylePanel2} >
                    <a data-tabs-target="panel2" onClick={() => showPanelAnciennes()}>Anciennes</a>
                </li>
                <span className="all">
                  Tout marquer comme vu
                </span>
              </ul>
              <div className="tabs-content" data-tabs-content="example-tabs">
                {notifications ?
                  <div className="tabs-panel" id="panel1" style={{ display: showPanel1 ? "block" : "none"}}>
                    {/*<NewPostNotification />*/}
                    {notifications.map((notif) => (
                      renderNotif(notif)
                    ))}
                  </div>
                :
                  <></>
                }
                {userNotifsList ?
                  <div className="tabs-panel" id="panel2" style={{ display: showPanel2 ? "block" : "none" }}> 
                    {userNotifsList.map((notif) => (
                      renderNotif(notif)
                    ))}
                  </div>
                :
                  <></>
                }
              </div>
            </div>
            <NotificationSideBar />
            <div className="alert-notifications">
              <span>Merci de choisir notre plan. Votre nouveau solde est : <strong>80 WinTak</strong> </span>
              <i className="fa fa-times croix" />
            </div>
          </div>
        </div>
      </div>
    )
}

Notifications.propTypes = {

}

export default Notifications

