import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import MyMsg from './MyMsg';
import OtherMsg from './OtherMsg';
import { NOTIF_NEW_MESSAGE } from "../../graphql/chat/chat";
import { useSubscription } from '@apollo/react-hooks';

function MessagesList(props) {
    const {conversation} = props;
    const { activeUser, messages, setMessages } = useContext(UserContext);

    const getUrlFromPath = () => {
        const paths = window.location.href.split("/");
        let url = paths[4];
        return url;
    };
    
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
    
    const { data } = useSubscription(NOTIF_NEW_MESSAGE, {
        variables: {
            conversationId: getUrlFromPath()
        }
    });

    if (data) {
        setMessages([...messages, data.newMessages])
    }

    useEffect(() => { 
        conversation && setMessages(conversation.messages)
    },[props]);

    return (conversation && messages ?
        <div className="discussion-left-side-main" style={{height: 390, overflow: 'scroll'}}>
            <div className="discussion">
                {messages.map((message) => (
                    renderMessage(message)
                ))}
                
                <div className="writing" style={{ display: conversation.writing ? "block" : "none" }}>
                    <img className="user-img" src="../assets/img/svg/User.png" />
                    <img className="icon-writing" src="../assets/img/svg/Groupe 199.png" />
                </div>
            </div>
        </div>
        :
        <></>
    )
}

MessagesList.propTypes = { }

export default MessagesList