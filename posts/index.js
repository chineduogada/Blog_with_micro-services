const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (_req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  try {
    // Emit event to the EVENT_BUS
    await axios.post("http://localhost:4005/events", {
      type: "PostCreated",
      data: { id, title },
    });
  } catch (err) {
    console.log(err.message);
  }

  res.status(201).send(posts);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type, "but i don't care!");

  res.send({});
});

app.listen(4000, () => {
  console.log("Post listening on port 4000");
});
