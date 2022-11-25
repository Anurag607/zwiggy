const express = require('express')
const controller = require('./me.controller')

const router = express.Router()

router.route('/orders')
 .get(controller.getCurrentOrders)

module.exports = router