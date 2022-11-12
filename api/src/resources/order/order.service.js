const pool = require('../../utils/db')

const getAllOrders = async () => pool.query(`SELECT * FROM \`order\`;`)

const createOrder = async (ordered_by, restaurant_id, delivered_by) => {
    const [res, ] = await pool.query(`INSERT INTO \`order\` (ordered_by, restaurant_id, delivered_by)
        VALUES (${ordered_by}, ${restaurant_id}, ${delivered_by})`)
    
    return res.insertId
}

const getOrderById = async (id) => pool.query(`SELECT * FROM \`order\` WHERE id = ${id}`)

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder
}