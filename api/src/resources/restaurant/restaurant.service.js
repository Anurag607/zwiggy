const pool = require('../../utils/db.js')

const getAllRestaurants = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM restaurant;`, (err, res, fields) => {
      if(err) throw err;
      resolve(res);
    })
  })
}

const createRestaurant = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(`
      INSERT INTO restaurant (name, address, rating)
      VALUES ("${data['name']}", "${data['address']}", ${data['rating']})
      `, (err, res, fields) => {
        if(err) throw err;
        resolve(res.insertId);
      })
  })
}

const getOneRestaurant = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`
      SELECT * FROM restaurant
      WHERE id=${id}`,
      (err, res, fields) => {
        if(err) throw err;
        console.log(res);
        resolve(res);     
      })
  })
}

module.exports = {
  getAllRestaurants,
  createRestaurant,
  getOneRestaurant
}
