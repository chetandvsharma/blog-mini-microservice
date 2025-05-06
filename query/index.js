const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", async (req, res) => {});
app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type = 'PostCreated') {
    const {id, title} = data;

    posts[]
  } else if (type = 'CommentCreated') {

  }
});

app.listen(4002, () => {
  console.log("server running on port ", 4002);
});
