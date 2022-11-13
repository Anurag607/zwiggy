const pool = require('../../utils/db.js');

const getUserByEmail = async (email, con) => {
  let db = con ? con : pool;
  return db.query(`SELECT * FROM user WHERE email = '${email}';`)
}

const getUserById = async (id, con) => {
  let db = con ? con : pool;
  return db.query(`SELECT * FROM user WHERE id = ${id};`)
}

const createCustomer = async (id, address, con) => {
  let db = con ? con : pool;
  return db.query(`INSERT INTO customer (id, address) VALUES (${id}, "${address}") `)
}

const getCustomerById = async (id, con) => {
  let db = con ? con : pool;
  return db.query(`SELECT * FROM customer WHERE id = ${id};`)
}

const getDeliveryManById = async (id, con) => {
  let db = con ? con : pool;
  return db.query(`SELECT * FROM delivery_man WHERE id = ${id};`)
}

const createUser = async (data, con) => {
  let db = con ? con : pool;
  const {name, password, phone_number, email, user_type} = data;
    const [res, ] = await db.query(`
            INSERT INTO user (name, email, password, phone_number, user_type)
            VALUES ("${name}", "${email}", "${password}", "${phone_number}", "${user_type}")`
    ) 
    return res.insertId;
}

const updateToken = (userId, token, con) => {
  let db = con ? con : pool;
  return db.query(` UPDATE user SET token = "${token}" WHERE id = ${userId}`)
}

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  updateToken,
  createCustomer,
  getCustomerById,
  getDeliveryManById
}
