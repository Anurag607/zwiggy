const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const restaurantRouter = require('./resources/restaurant/restaurant.router');
const fooditemsRouter = require('./resources/fooditems/fooditems.router');
const userRouter = require('./resources/user/user.router');

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/restaurants', restaurantRouter);
app.use('/api/fooditems',fooditemsRouter);
app.use('/api/user', userRouter);

app.listen("3000");
