const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
// app.use(cors());

app.get("/comments", (req, res) => {});
app.post("/comments", (req, res) => {});

app.listen(4001, () => {
  console.log("Listening on port 4001");
});
