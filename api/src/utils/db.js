const mysql = require('mysql')
require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'zwiggy'
})

module.exports = pool;
