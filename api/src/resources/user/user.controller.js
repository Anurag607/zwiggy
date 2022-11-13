const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt');
const config = require('../../utils/dbConfig')
require('dotenv').config();

const service = require('./user.service');

const registerUser = async (req, res) => {
  const {name, password, phone_number, email, user_type} = req.body;

  if(!name || !password || !email || !user_type) {
    return res.status(400).send({message: "Some inputs are missing"});
  }

  if(user_type != "customer" && user_type != "restaurant manager" && user_type != "delivery man") {
    return res.status(409).send({message: "Invalid user type"}); 
  }

  con = await mysql.createConnection(config)

  const [oldUser, ] = await service.getUserByEmail(email, con);

  if(oldUser.length != 0) {
    return res.status(409).send({message: "User already exists"});
  }

  req.body["password"] = await bcrypt.hash(password, 10);

  await con.query('START TRANSACTION');

  try {
    newUserId = await service.createUser(req.body, con);

    const token = jwt.sign(
      {user_id: newUserId, email},
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h"
      }
    );

    await service.updateToken(newUserId, token, con);

    [newUser, ] = await service.getUserById(newUserId, con);

    if(user_type == "customer") {
      await service.createCustomer(newUserId, req.body["address"], con);
      [newUser[0]["customer"], ] = await service.getCustomerById(newUserId, con);
    }
    else if(user_type == "delivery man") {
    }
    else if(user_type == "restaurant manager") {
    }
    else {
      return res.status(409).send({message: "Invalid user type"});
    }

    await con.query('COMMIT')

    res.status(201).json(JSON.parse(JSON.stringify(newUser)));
  } catch(err) {
    console.log(err);
    con.query('ROLLBACK')
    res.status(400).send({message: "Invalid inputs"})
  }
}

const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body; 

    if(!(email && password)) {
      return res.status(400).send({message: "Email and password are required"});
    }

    let [user, ] = await service.getUserByEmail(email, con)

    if(user.length==0 || !(await bcrypt.compare(password, user[0].password))) {
      return res.status(400).send({message: "Invalid credentials"});
    }

    const token = jwt.sign(
      {user_id: user[0].id, email},
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h"
      }
    );

    await service.updateToken(user[0].id, token, con); 

    user[0].token = token; 

    res.status(200).json(JSON.parse(JSON.stringify(user)));

  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  registerUser,
  loginUser
}