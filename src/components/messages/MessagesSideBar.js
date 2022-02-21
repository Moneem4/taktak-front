import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

function MessagesSideBar(props) {
    const {conversation} = props;
    const { activeUser } = useContext(UserContext);

    const renderFile = (param) => {
        switch (param.type) {
            case "photo":
                return  <img src={param.content} key={param.id} alt="photo"/> ;
            case "video":
                return null ;
            default:
                return null;
        }
    };
    
    return (conversation ?
        <div className="discussion-right-side">
            {activeUser.userId === conversation.userId || activeUser.connectedRestaurentId === conversation.userId ?
                conversation.participantIsRestaurant ?
                    <div className="discussion-right-side-header">
                        <img src={`https://${conversation.perticipantResto.avatar}`} alt="profileImage" style={{borderRadius: 10}} />
                    </div>
                :
                    <div className="discussion-right-side-header">
                        <img src={`https://${conversation.participant.avatar}`} alt="profileImage" style={{borderRadius: 50}} />
                    </div>
            :
                conversation.userIsRestaurant ?
                    <div className="discussion-right-side-header">
                        <img src={`https://${conversation.userResto.avatar}`} alt="profileImage" style={{borderRadius: 10}} />
                    </div>
                :
                    <div className="discussion-right-side-header">
                        <img src={`https://${conversation.user.avatar}`} alt="profileImage" style={{borderRadius: 50}} />
                    </div>
            }
            
            <div className="discussion-right-side-main">
                {activeUser.userId === conversation.userId || activeUser.connectedRestaurentId === conversation.userId ?
                    conversation.participantIsRestaurant ?
                        <div>
                            <span className="discussion-right-side-main-name">{conversation.perticipantResto.name}</span>
                            <div className="location">
                                <i className="far fa-map-marker-alt map" />
                                <span>{conversation.perticipantResto.location}</span>
                            </div>
                            <div className="hashtag">
                                {conversation.perticipantResto.tags ?
                                    conversation.perticipantResto.tags.map((el) => <span>`#${el} `</span>)
                                :
                                <></>}
                            </div>
                        </div>
                    :
                        <div>
                            <span className="discussion-right-side-main-name">{conversation.participant.firstName} {conversation.participant.lastName}</span>
                            <div className="location">
                                <i className="far fa-map-marker-alt map" />
                                <span>{conversation.participant.location}</span>
                            </div>
                            <div className="hashtag">
                                {conversation.participant.tags ?
                                    conversation.participant.tags.map((el) => <span>`#${el} `</span>)
                                :
                                <></>}
                            </div>
                        </div>
                :
                    conversation.userIsRestaurant ?
                        <div>
                            <span className="discussion-right-side-main-name">{conversation.userResto.name}</span>
                            <div className="location">
                                <i className="far fa-map-marker-alt map" />
                                <span>{conversation.userResto.location}</span>
                            </div>
                            <div className="hashtag">
                                {conversation.userResto.tags ?
                                    conversation.userResto.tags.map((el) => <span>`#${el} `</span>)
                                :
                                <></>}
                            </div>
                        </div>
                    :
                        <div>
                            <span className="discussion-right-side-main-name">{conversation.user.firstName} {conversation.user.lastName}</span>
                            <div className="location">
                                <i className="far fa-map-marker-alt map" />
                                <span>{conversation.user.location}</span>
                            </div>
                            <div className="hashtag">
                                {conversation.user.tags ?
                                    conversation.user.tags.map((el) => <span>`#${el} `</span>)
                                :
                                <></>}
                            </div>
                        </div>
                }
            </div>
            <div className="discussion-right-side-bottom">
                <span>Fichiers partagés</span>
                <div className="discussion-right-side-bottom-img">
                    {/*conversation.fichiersPartages.map((item) => (
                        renderFile(item)
                    ))*/}
                </div>
            </div>
        </div>
        :
        <></>
    )
}

MessagesSideBar.propTypes = { }

export default MessagesSideBar