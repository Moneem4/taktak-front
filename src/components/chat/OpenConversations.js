import React, { useContext } from 'react';
import { UiContext } from '../../context/UiContext';
import { UserContext } from '../../context/UserContext';

function OpenConversations(props) {
    const {conversationListOpen, setConversationListOpen} = useContext(UiContext)
    const {activeUser, conversations, setConversations, getConversationByUserId} = useContext(UserContext);
    
    function OpenConversations(){
        setConversationListOpen((prev)=>!prev)
    }

    if(activeUser.isRestaurant){
      getConversationByUserId(activeUser.connectedRestaurentId, setConversations);
    }else{
      getConversationByUserId(activeUser.userId, setConversations);
    }

    return ( conversations &&
      <div className="conversation" >
        <div className="open-button"  onClick={OpenConversations}>
          <i className="far fa-comment-dots" />
          <span>Discussions rapide</span>
          <div className="number">
            +{conversations.length}
            <img src="../assets/img/svg/Ellipse 462.png" alt="" />
          </div>
        </div>
      </div>
    )
}

export default OpenConversations

