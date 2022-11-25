const service = require('./order.service')
const userService = require('../user/user.service')
const restaurantService = require('../restaurant/restaurant.service')

const getAllOrders = async (req, res) => {
    try {
        const [data, ] = await service.getAllOrders()
        if(data.length==0) {
            return res.status(404).send( {message: "data not found"} );
        }
        res.status(200).json(JSON.parse(JSON.stringify(data)))
    } catch(err) {
        res.status(500).send( {error: err} )
    }
}

const createOrder = async (req, res) => {
    try {
        let {ordered_by, restaurant_id, delivered_by, fooditems } = req.body;

        ordered_by = parseInt(ordered_by)
        restaurant_id = parseInt(restaurant_id)
        delivered_by = parseInt(delivered_by)
        fooditems=JSON.parse(fooditems) 

        if(!ordered_by || !restaurant_id || !delivered_by || !fooditems) {
            return res.status(400).send({message: "some inputs are missing"})
        }

        const [ordered_by_user, ] = await userService.getCustomerById(ordered_by)
        const [restaurant, ] = await restaurantService.getRestaurantById(restaurant_id)
        const [delivered_by_user, ] = await userService.getDeliveryManById(delivered_by)

        if(ordered_by_user.length == 0 || restaurant.length == 0 || delivered_by_user.length == 0) {
            return res.status(400).send({message: "foreign key constraint failed"})
        }

        const orderId = await service.createOrder(ordered_by, restaurant_id, delivered_by) 

        const [newOrder, ] = await service.getOrderById(orderId)
        await service.createOrderItems(orderId, fooditems)
        const [newOrderitems,] = await service.getOrderItemsById(orderId)

        JSON.parse(JSON.stringify(newOrder))

        newOrder[0]["items"] = JSON.parse(JSON.stringify(newOrderitems))

        res.status(201).json(newOrder)
    } catch(err) {
        res.status(500).send({error: err})
    }
}

module.exports = {
    getAllOrders,
    createOrder
}