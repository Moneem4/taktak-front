import React from 'react';

function MyMsg(props) {
    const {param} = props;
    
    return (
        <div className="message-sent">
            <div className="content">
                <div className="content-msg">
                    <div className="triangle" />
                    <div className="message">{param.text} </div>
                    <span className="fal fa-ellipsis-v" />
                </div>
            </div>
            <div className="time-send">{param.createdAt}</div>
        </div>
    )
}

MyMsg.propTypes = { }

export default MyMsg