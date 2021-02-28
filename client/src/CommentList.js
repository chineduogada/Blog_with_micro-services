import React from "react";

function CommentList({ comments }) {
  const moderateComment = (comment) => {
    if (comment.status === "pending") {
      return "Comment is awaiting moderation";
    }
    if (comment.status === "approved") {
      return comment.content;
    }
    if (comment.status === "rejected") {
      return "Comment is rejected!";
    }
  };

  const renderComment = comments.map((comment) => {
    return <li key={comment.id}>{moderateComment(comment)}</li>;
  });

  return <ul>{renderComment}</ul>;
}

export default CommentList;
