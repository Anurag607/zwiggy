const pool = require('../../utils/db.js');

const getUserByEmail = async (email) => pool.query(`SELECT * FROM user WHERE email = '${email}';`)

const getUserById = async (id) => pool.query(`SELECT * FROM user WHERE id = ${id};`)

const createCustomer = async (id, address) => pool.query(`INSERT INTO customer (id, address) VALUES (${id}, "${address}") `)

const getCustomerById = async (id) => pool.query(`SELECT * FROM customer WHERE id = ${id};`)

const createUser = async (data) => {
  const {name, password, phone_number, email, user_type} = data;
    const [res, ] = await pool.query(`
            INSERT INTO user (name, email, password, phone_number, user_type)
            VALUES ("${name}", "${email}", "${password}", "${phone_number}", "${user_type}")`
    ) 
    return res.insertId;
}

const updateToken = (userId, token) => pool.query(` UPDATE user SET token = "${token}" WHERE id = ${userId}`)

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  updateToken,
  createCustomer,
  getCustomerById
}
