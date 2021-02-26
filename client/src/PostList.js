import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

function PostList() {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const { data } = await axios.get("http://localhost:4000/posts");
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderPost = Object.values(posts).map((post) => {
    return (
      <div
        key={post.id}
        className="card"
        style={{ width: "30%", marginBottom: "20px", padding: "10px" }}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
        </div>

        <CommentList postId={post.id} />
        <CommentCreate postId={post.id} />
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderPost}
    </div>
  );
}

export default PostList;
