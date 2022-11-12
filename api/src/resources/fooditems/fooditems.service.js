const pool = require('../../utils/db.js')
const getAllFoodItems = async (name) => pool.query(`SELECT * FROM  fooditem where item_name like '${name}';`)

const getFoodItembyCategory = async (id) => pool.query(`SELECT * FROM fooditem where cat_id =${id} ;`);

  module.exports = { 
    getAllFoodItems,getFoodItembyCategory 
  }