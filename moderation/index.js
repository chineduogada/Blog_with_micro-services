const axios = require("axios");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const { postId, id, content } = data;

    const status = /orange/i.test(content) ? "rejected" : "approved";

    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        postId,
        id,
        status,
        content,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Moderation listening on port 4003...");
});
