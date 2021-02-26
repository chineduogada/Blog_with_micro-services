import axios from "axios";
import React, { useEffect, useState } from "react";

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
        style={{ width: "30%", marginBottom: "20px" }}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
        </div>
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
