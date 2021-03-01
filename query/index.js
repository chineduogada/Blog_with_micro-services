const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
// --- posts schema --- //
// {
//   [<postId>]: {
//     [<postId>]: <string>,
//     title: <string>,
//     comments: [
//       {
//         [<commentId>]: <string>,
//         content: <string>,
//       }
//     ]
//   }
// }

// Sends the `posts` obj
app.get("/posts", (_req, res) => {
  res.send(posts);
});

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({
      id,
      content,
      status,
    });
  }

  if (type === "CommentUpdated") {
    const { postId, id, content, status } = data;

    const comment = posts[postId].comments.find((comment) => comment.id === id);

    comment.content = content;
    comment.status = status;
  }
};

// Builds the `posts` obj
app.post("/events", (req, res) => {
  const { data, type } = req.body;

  handleEvent(type, data);

  res.send({ status: "OK" });
});

app.listen(4002, async () => {
  console.log("Query listening on port 4002...");

  const { data } = await axios.get("http://localhost:4005/events");

  for (let event of data) {
    console.log("Processing event:", event.type);

    handleEvent(event.type, event.data);
  }
});
