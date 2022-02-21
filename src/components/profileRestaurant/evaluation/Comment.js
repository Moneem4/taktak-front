import React, {useState, useContext, useEffect} from 'react';
import { RestaurantContext } from '../../../context/RestaurantContext';

function Comment(props) {
    const {comment} = props;
    const { getUser } = useContext(RestaurantContext);

    const [userComment, setUserComment] = useState(null);
    useEffect(() => {
      getUser(comment.userId, setUserComment);
    }, [props]);

    return userComment ? (
        <div className="who-comment">
            <div className="who-comment-info">
                <img src={`https://${userComment.avatar}`}/>
                <span className="who-comment-info-username">{userComment.firstName} {userComment.lastName}</span>
            </div>
            <div className="who-comment-info-description">
                {comment.content}
            </div>
        </div>
    ):(
        <></>
    )
}

export default Comment
