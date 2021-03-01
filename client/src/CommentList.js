import React from "react";

function CommentList({ comments }) {
  const moderateComment = (comment) => {
    if (comment.status === "pending") {
      return "This comment is awaiting moderation";
    }
    if (comment.status === "approved") {
      return comment.content;
    }
    if (comment.status === "rejected") {
      return "This comment has been rejected!";
    }
  };

  const renderComment = comments.map((comment) => {
    return <li key={comment.id}>{moderateComment(comment)}</li>;
  });

  return <ul>{renderComment}</ul>;
}

export default CommentList;
