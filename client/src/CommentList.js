import React from "react";

function CommentList({ comments }) {
  const renderComment = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderComment}</ul>;
}

export default CommentList;
