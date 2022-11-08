const express = require('express')
const controllers = require('./restaurant.controller')

const router = express.Router();

router.route('/')
  .get(controllers.getAllRestaurants)
  .post(controllers.createRestaurant);
router.route('/:id/menu/')
  .get(controllers.getRestaurantMenu);
module.exports = router;
