const express = require("express");
const cors = require("cors");
const auth = require('./utils/auth');
const restaurantRouter = require('./resources/restaurant/restaurant.router');
const fooditemsRouter = require('./resources/fooditems/fooditems.router');
const userRouter = require('./resources/user/user.router');
const orderRouter = require('./resources/order/order.router')

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);
app.use(auth.verifyToken);
app.use('/api/restaurants', restaurantRouter);
app.use('/api/fooditems',fooditemsRouter);
app.use('/api/orders', orderRouter)


app.listen("3000");