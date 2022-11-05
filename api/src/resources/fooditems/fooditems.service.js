const pool = require('../../utils/db.js')
const getAllFoodItems = (name) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM  fooditem where item_name like'%${name}%' ;`, (err, res, fields) => {
        if(err) throw err;
        resolve(res);
      })
    })
  }

  module.exports={getAllFoodItems }