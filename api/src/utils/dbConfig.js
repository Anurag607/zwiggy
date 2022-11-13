require('dotenv').config();

const con = {
  host: 'localhost',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'zwiggy'
}

module.exports = con;