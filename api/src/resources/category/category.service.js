const pool = require('../../utils/db.js')

const getAllCategories = (id) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT category.id,rest_id,category.name FROM category,restaurant WHERE rest_id=restaurant.id AND restaurant.id=${id}  ;`, (err, res, fields) => {
        if(err) throw err;
        resolve(res);
      })
    })
  }
module.exports= { getAllCategories };