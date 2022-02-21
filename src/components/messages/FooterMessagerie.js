import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

function FooterMessagerie(props) {
    const {conversation} = props;
    const {createMessage, activeUser} = useContext(UserContext);
    const [input, setInput] = useState("");

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            let inputData
            if(activeUser.userId === conversation.userId){
                inputData = {
                    text: input,
                    conversationId: conversation._id,
                    createdBy: conversation.userId,
                    isRestaurant: false
                }
            }else {
                inputData = {
                    text: input,
                    conversationId: conversation._id,
                    createdBy: conversation.participantId,
                    isRestaurant: false
                }
            }
            createMessage(inputData);
          setInput("");
        }
    };
    
    return (
        <div className="discussion-left-side-bottom">
            <div className="send-msg">
                <input 
                    type="text" 
                    placeholder="Dites quelques choses!" 
                    value={input}
                    onChange={(event) => {
                        setInput(event.target.value);
                    }}
                    onKeyDown={(e) => handleKeyDown(e)}/>
                <i className="fal fa-paper-plane" />
            </div>
            <div className="icons">
                <i className="fal fa-camera-retro camera" />
                <i className="fal fa-microphone micro" />
                <img src="../assets/img/svg/GIF.png" />
                <img src="../assets/img/svg/smile.png" />
            </div>
        </div>
    )
}

FooterMessagerie.propTypes = { }

export default FooterMessagerie