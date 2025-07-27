const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let posts = {};
const handleEvent = (event, data) => {
  if (type == "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type == "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type == "CommentUpdated") {
    console.log("data >> ", data);
    const { id, content, postId, status } = data;
    console.log("postId >> ", postId);

    const post = posts[postId];
    console.log("post >>> ", post);
    const comment = post.comments.find((comment) => comment.id === id);

    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", async (req, res) => {
  res.send(posts);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log("server running on port ", 4002);

  const res = await axios.get("http://event-bus-srv:4005/events");

  for (let event of res.data) {
    handleEvent(event.type, event.data);
  }
});
