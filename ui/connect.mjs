import mysql from 'mysql'
import dotenvLoad from 'dotenv-load'

dotenvLoad()

const connector = mysql.connection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

connector.connect((err) => {
    if(err) console.error(err.message)
    else console.log("Connected!")
})

export default connector