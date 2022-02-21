import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

function OtherMsg(props) {
    const {param, conversation} = props;
    const {activeUser} = useContext(UserContext);
    
    return (
        <div className="message-received">
            <div className="content">
                {activeUser.userId === conversation.userId || activeUser.connectedRestaurentId === conversation.userId ?
                    conversation.participantIsRestaurant ?
                        <img src={`https://${conversation.perticipantResto.avatar}`}  style={{width: 30, heigth: 30, borderRadius: 50}}/>
                    :
                        <img src={`https://${conversation.participant.avatar}`}  style={{width: 30, heigth: 30, borderRadius: 50}}/>
                :
                    conversation.userIsRestaurant ?
                        <img src={`https://${conversation.userResto.avatar}`}  style={{width: 30, heigth: 30, borderRadius: 50}}/>
                    :
                        <img src={`https://${conversation.user.avatar}`}  style={{width: 30, heigth: 30, borderRadius: 50}}/>
                }

                <div className="message">
                    <span>{param.text}</span> 
                    <div className="triangle" />
                </div>
                <span className="fal fa-ellipsis-v" />
            </div>
            <div className="time-send">{param.createdAt} ago</div>
        </div>
    )
}

OtherMsg.propTypes = { }

export default OtherMsg