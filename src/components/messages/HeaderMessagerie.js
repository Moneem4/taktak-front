import React, {useContext} from 'react';
import { UserContext } from "../../context/UserContext";

function HeaderMessagerie(props) {
    const {conversation, index} = props;
    const { activeUser, setConversations, deleteConversation } = useContext(UserContext);

    function removeDiscussion() {
        deleteConversation(conversation._id, setConversations);
    }

    return (conversation ?
        <div className="discussion-left-side-header">
            {activeUser.userId === conversation.userId || activeUser.connectedRestaurentId === conversation.userId ?
                conversation.participantIsRestaurant ?
                    <div className="discussion-header-details-user">
                        <img src={`https://${conversation.perticipantResto.avatar}`} style={{width: 30, height: 30, borderRadius: 50}}/>
                        <span>{conversation.perticipantResto.name}</span>
                    </div>
                :
                    <div className="discussion-header-details-user">
                        <img src={`https://${conversation.participant.avatar}`} style={{width: 30, height: 30, borderRadius: 50}}/>
                        <span>{conversation.participant.firstName} {conversation.participant.lastName}</span>
                    </div>
            :
                conversation.userIsRestaurant ?
                    <div className="discussion-header-details-user">
                        <img src={`https://${conversation.userResto.avatar}`} style={{width: 30, height: 30, borderRadius: 50}}/>
                        <span>{conversation.userResto.name}</span>
                    </div>
                :
                    <div className="discussion-header-details-user">
                        <img src={`https://${conversation.user.avatar}`} style={{width: 30, height: 30, borderRadius: 50}}/>
                        <span>{conversation.user.firstName} {conversation.user.lastName}</span>
                    </div>
            }
            <div className="discussion-header-parameter">
                <div className="banish">
                    <i className="fa fa-ban" />
                    <span>Bannir le contact</span>
                </div>
                <div className="move" onClick={() => removeDiscussion()}>
                    <i className="fal fa-trash-alt" />
                    <span>Supprimer la discussion</span>
                </div>
                <span className="fal fa-ellipsis-v" />
            </div>
        </div>
        :
        <></>
    )
}

HeaderMessagerie.propTypes = { }

export default HeaderMessagerie