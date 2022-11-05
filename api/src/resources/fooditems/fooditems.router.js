const express = require('express')
const controllers = require('./fooditems.controller')

const router = express.Router();

router.route('/:name')
  .get(controllers.getAllFoodItems)
 

module.exports = router;
