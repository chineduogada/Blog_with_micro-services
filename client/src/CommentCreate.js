import React, { useState } from "react";
import axios from "axios";

function CommentCreate({ postId }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });

    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <div className="form-group">
        <label>Comment</label>
        <input
          type="text"
          className="form-control"
          style={{ margin: "10px 0" }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default CommentCreate;
