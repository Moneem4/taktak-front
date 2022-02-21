import React,{useContext} from 'react';
import {UiContext} from '../../context/UiContext';
import { UserContext } from '../../context/UserContext';

function ConversationItem(props) {
  const {follower} = props;
  const {loadConversations} = useContext(UiContext);
  const {activeUser, getConversation} = useContext(UserContext);

  function OpenConversations(){
    const input= {
      userId: activeUser.isRestaurant ? activeUser.connectedRestaurentId : activeUser.userId,
      userIsRestaurant: activeUser.isRestaurant,
      participantId: follower.user._id,
      participantIsRestaurant: follower.type === "USER" ? false : true
    }
    getConversation(input).then((data) => {
      loadConversations(data._id);
    });
  }
 
  return (
      <div className="online-profile" button onClick={OpenConversations}>
        {follower.type === "RESTAURANT" ?
          <div>
            <img
              src={`https://${follower.user.avatar}`}
              className="online-profile-img"
              style={{borderRadius:"20%"}}
            />
            <span className="online-profile-name" style={{marginLeft: 10, fontSize: 14}}>
              {follower.user.name}
            </span>
          </div>
        :
          <div>
            <img
              src={`https://${follower.user.avatar}`}
              className="online-profile-img"
              style={{borderRadius:"50%"}}
            />
            <span className="online-profile-name" style={{marginLeft: 10, fontSize: 14}}>
              {follower.user.firstName} {follower.user.lastName}
            </span>
          </div>
        }
        
        {/*<span className="time-disconnected">{props.conversation.lastTimeChecked}</span>
        {props.conversation.lastTimeChecked?<img
          src="../assets/img/svg/Ellipse 317.png"
          className="online"
          alt=""
        />:<></>*/}
    </div>
  )
}

ConversationItem.propTypes = {

}

export default ConversationItem

