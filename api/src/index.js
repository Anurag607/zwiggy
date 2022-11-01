const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const restaurantRouter = require('./resources/restaurant/restaurant.router');

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/restaurants', restaurantRouter);

app.get("/", (req, res) => {
  res.send({ message: "hi there" });
});

app.listen("3000");