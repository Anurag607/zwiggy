const pool = require('../../utils/db.js')

const getCurrentOrders = async (id) => pool.query(`SELECT * FROM \`order\` where ordered_by=${id} && status NOT IN('delivered') ;`)

const getPastOrders = async (id) => pool.query(`SELECT * FROM \`order\` where ordered_by=${id} && status IN('delivered') ;`)

const getCurrentRestaurantOrders = async (id) => pool.query(`SELECT * FROM \`order\` where restaurant_id=${id} && status NOT IN('delivered') ;`)

const getPastRestaurantOrders = async (id) => pool.query(`SELECT * FROM \`order\` where restaurant_id=${id} && status IN('delivered') ;`)

const getCurrentDeliveryManOrders = async (id) => pool.query(`SELECT * FROM \`order\` where delivered_by=${id} && status NOT IN('delivered') ;`)

module.exports = {
    getCurrentOrders,
    getCurrentRestaurantOrders,
    getCurrentDeliveryManOrders
}