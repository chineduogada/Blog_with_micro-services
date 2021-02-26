import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  const fetchComments = useCallback(async () => {
    const { data } = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );

    setComments(data);
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const renderComment = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderComment}</ul>;
}

export default CommentList;
