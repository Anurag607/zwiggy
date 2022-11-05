const pool = require('../../utils/db.js');

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM user WHERE email = '${email}';`, (err, res, fields) => {
      if(err) throw err;
      resolve(res);
    })
  })
}

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM user WHERE id = ${id};`, (err, res, fields) => {
      if(err) throw err;
      resolve(res);
    })
  })
}

const createCustomer = (id, address) => {
  return new Promise((resolve, reject) => {
    pool.query(`
      INSERT INTO customer (id, address)
      VALUES (${id}, "${address}")
      `, (err, res, fields) => {
        if(err) throw err;
        resolve(res);
      })
  })
}

const getCustomerById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM customer WHERE id = ${id};`, (err, res, fields) => {
      if(err) throw err;
      resolve(res);
    })
  })
}

const createUser = (data) => {
  const {name, password, phone_number, email, user_type} = data;
  return new Promise((resolve, reject) => {
    pool.query(`
      INSERT INTO user (name, email, password, phone_number, user_type)
      VALUES ("${name}", "${email}", "${password}", "${phone_number}", "${user_type}")
      `, (err, res, fields) => {
        if(err) throw err;
        resolve(res.insertId);
      })
  }) 
}

const updateToken = (userId, token) => {
  return new Promise((resolve, reject) => {
    pool.query(`
      UPDATE user
      SET token = "${token}"
      WHERE id = ${userId}
      `, (err, res, fields) => {
        if(err) throw err;
        resolve(res);
      })
  })
}

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  updateToken,
  createCustomer,
  getCustomerById
}
