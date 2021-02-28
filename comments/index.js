const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: "pending" });

  commentByPostId[req.params.id] = comments;

  try {
    // Emit event to the EVENT_BUS
    await axios.post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId: req.params.id,
        status: "pending",
      },
    });
  } catch (err) {
    console.log(err.message);
  }

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, content, status } = data;

    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        postId,
        id,
        content,
        status,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("Comments listening on port 4001...");
});
