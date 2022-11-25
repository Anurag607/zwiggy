const express = require('express')
const controller = require('./order.controller')

const router = express.Router()

router.route('/')
    .get(controller.getAllOrders)
    .post(controller.createOrder)

router.route('/:id')
    .post(controller.updateOrder)

module.exports = router;