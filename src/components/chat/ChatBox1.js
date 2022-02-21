import React,{useContext, useState, useEffect} from 'react';
import { UiContext } from '../../context/UiContext';
import { UserContext } from '../../context/UserContext';
import MyMsg from '../messages/MyMsg';
import OtherMsg from '../messages/OtherMsg';
import { NOTIF_NEW_MESSAGE } from "../../graphql/chat/chat";
import { useSubscription } from '@apollo/react-hooks';

function ChatBox1(props) {
  const {conversationId, index} = props
  const {closeChatBox} = useContext(UiContext)
  const {activeUser, getConversationById, sendMessage, messagesList, setMessagesList} = useContext(UserContext);
  const [conversationData, setConversationData] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [input, setInput] = useState("");

  const renderMessage = (param) => {
    if(activeUser.isRestaurant){
        switch (param.createdBy === activeUser.connectedRestaurentId) {
            case true:
                return  <MyMsg param={param} />;
            case false:
                return  <OtherMsg param={param} conversation={conversation} />;
            default:
                return null;
        }
    }else{
        switch (param.createdBy === activeUser.userId) {
            case true:
                return  <MyMsg param={param} />;
            case false:
                return  <OtherMsg param={param} conversation={conversation}/>;
            default:
                return null;
        }
    }
  };

  useEffect(() => {
    getConversationById(conversationId, setConversationData).then((data) => {
      setConversation(data);
      if(data.messages){
        setMessagesList(data.messages)
      }
    });
  }, [props]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
        let inputData
        if(activeUser.userId === conversationData.userId){
            inputData = {
                text: input,
                conversationId: conversationData._id,
                createdBy: conversationData.userId,
                isRestaurant: false
            }
        }else {
            inputData = {
                text: input,
                conversationId: conversationData._id,
                createdBy: conversationData.participantId,
                isRestaurant: false
            }
        }
        sendMessage(inputData, index);
        setInput("");
    }
  };

  const { data } = useSubscription(NOTIF_NEW_MESSAGE, {
    variables: {
        conversationId: conversationId
    }
  });

  useEffect(() => {
    if(data) {
      setMessagesList([...messagesList, data.newMessages]);
    }
  },[data]);
  
    return ( conversationData && 
      <div className="convesation-open">
        <div className="discussion-header">
          {activeUser.userId === conversationData.userId || activeUser.connectedRestaurentId === conversationData.userId ?
            conversationData.participantIsRestaurant ?
              <div className="img-user-resto">
                <img src={`https://${conversationData.perticipantResto.avatar}`}/>
              </div>
            :
              <div className="img-user">
                <img src={`https://${conversationData.participant.avatar}`} style={{borderRadius: 50}}/>
              </div>
          :
            conversationData.userIsRestaurant ?
              <div className="img-user-resto">
                <img src={`https://${conversationData.userResto.avatar}`}/>
              </div>
            :
              <div className="img-user">
                <img src={`https://${conversationData.user.avatar}`} style={{borderRadius: 50}}/>
              </div>
          }

          {activeUser.userId === conversationData.userId || activeUser.connectedRestaurentId === conversationData.userId ?
            conversationData.participantIsRestaurant ?
              <span style={{fontWeight: "bold", fontSize: "2rem", color: "#fff", marginLeft: 50, marginTop: -5}}>
                {conversationData.perticipantResto.name}</span>
            :
              <span style={{fontWeight: "bold", fontSize: "2rem", color: "#fff", marginLeft: 50, marginTop: -5}}>
                {conversationData.participant.firstName} {conversationData.participant.lastName}</span>
          :
            conversationData.userIsRestaurant ?
              <span style={{fontWeight: "bold", fontSize: "2rem", color: "#fff", marginLeft: 50, marginTop: -5}}>
                {conversationData.userResto.name}</span>
            :
              <span style={{fontWeight: "bold", fontSize: "2rem", color: "#fff", marginLeft: 50, marginTop: -5}}>
                {conversationData.user.firstName} {conversationData.user.lastName}</span>
          }
          <i style={{cursor : "pointer"}} className="fas fa-times" button onClick={(e)=>closeChatBox(props.index,e)}/>
        </div>
        <div className="discussion-main" style={{height: 240, overflow: 'scroll'}}>
          <div className="discussion">
            {messagesList && messagesList.map((message) => (
              renderMessage(message)
            ))}
          </div> 
        </div>
        <div className="discussion-bottom">
          <div className="send-msg">
            <input 
              type="text" 
              placeholder="Dites quelques choses!"
              onChange={(event) => {
                setInput(event.target.value);
              }}
              value={input}
              onKeyDown={(e) => handleKeyDown(e)} />
            <img src="../assets/img/svg/enter.png" />
          </div>
          <div className="icons">
            <img src="../assets/img/svg/camera.png" />
            <img src="../assets/img/svg/micro.png" />
            <img src="../assets/img/svg/GIF.png" />
            <img src="../assets/img/svg/smile.png" />
          </div>
        </div>
      </div>
     
    )
}

export default ChatBox1
