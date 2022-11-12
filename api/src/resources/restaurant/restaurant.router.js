const express = require('express')
const controllers = require('./restaurant.controller')

const router = express.Router();

router.route('/')
  .get(controllers.getAllRestaurants)
  .post(controllers.createRestaurant);
router.route('/:id/menu/')
  .get(controllers.getRestaurantMenu);
router.route('/:city')
  .get(controllers.getRestaurantsByCity);
  
module.exports = router;