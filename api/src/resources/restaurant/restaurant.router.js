const express = require('express')
const controllers = require('./restaurant.controller')

const router = express.Router();

router.route('/')
  .get(controllers.getAllRestaurants)
  .post(controllers.createRestaurant);

router.route('/:id/menu')
  .get(controllers.getRestaurantMenu);

router.route('/:id')
  .get(controllers.getRestaurants)
  
module.exports = router;