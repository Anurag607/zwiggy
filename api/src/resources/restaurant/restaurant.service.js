const pool = require('../../utils/db.js')

const getAllRestaurants = async () => pool.query(`SELECT * FROM restaurant;`)

const createRestaurant = async (data) => {
  const res = await pool.query(` INSERT INTO restaurant (name, address, rating) VALUES 
  ("${data['name']}", "${data['address']}", ${data['rating']})`)

  return res.insertId
}

const getOneRestaurant = async (id) => pool.query(`SELECT * FROM restaurant WHERE id=${id}`)

const getRestaurantsByCity = async (city) => pool.query(`SELECT * FROM restaurant WHERE city LIKE '${city}'` )

const getRestaurantsById = async (id) => pool.query(`SELECT * FROM restaurant WHERE id = ${id}`)

module.exports = {
  getAllRestaurants,
  createRestaurant,
  getOneRestaurant,
  getRestaurantsByCity,
  getRestaurantsById
}
