import React from "react";
import Comment from "./Comment";

function CommentsBox(props) {
  
  const commentsLayer = props.comments.map((el) => {
    return <Comment comment={el} comments={props.comments} setComments={props.setComments} setCommentsCount = {props.setCommentsCount}   />;
  });

  return <div className="post-card-comments-list">{commentsLayer}</div>;
}

export default CommentsBox;
