const pool = require('../../utils/db.js')


const getAllCategories = async (id) => pool.query(`SELECT category.id, rest_id, category.name FROM category, restaurant 
                                                    WHERE rest_id=restaurant.id AND restaurant.id=${id};`)


module.exports= { getAllCategories };