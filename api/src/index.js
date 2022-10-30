const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "hi there" });
});

app.listen("3000");
