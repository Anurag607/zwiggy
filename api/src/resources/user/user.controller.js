const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const service = require('./user.service');

const registerUser = async (req, res) => {
  try {
    const {name, password, phone_number, email, user_type} = req.body;

    if(!name || !password || !email || !user_type) {
      res.status(400).send({message: "Some inputs are missing"});
    }

    if(user_type != "customer" && user_type != "restaurant manager" && user_type != "delivery man") {
      return res.status(409).send({message: "Invalid user type"}); 
    }

    const oldUser = await service.getUserByEmail(email);

    if(oldUser.length != 0) {
      return res.status(409).send({message: "User already exists"});
    }

    req.body["password"] = await bcrypt.hash(password, 10);

    newUserId = await service.createUser(req.body);

    const token = jwt.sign(
      {user_id: newUserId, email},
      "rayal10minhipadhega",
      {
        expiresIn: "2h"
      }
    );

    await service.updateToken(newUserId, token);

    newUser = await service.getUserById(newUserId);

    if(user_type == "customer") {
      await service.createCustomer(newUserId, req.body["address"]);
      newUser[0]["customer"] = await service.getCustomerById(newUserId);
    }
    else if(user_type == "delivery man") {
    }
    else if(user_type == "restaurant manager") {
    }
    else {
      return res.status(409).send({message: "Invalid user type"});
    }

    res.status(201).json(JSON.parse(JSON.stringify(newUser)));
  } catch(err) {
    console.log(err);
  }
}

const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body; 

    if(!(email && password)) {
      res.status(400).send({message: "Email and password are required"});
    }

    let user = await service.getUserByEmail(email);

    if(user.length==0 || !(await bcrypt.compare(password, user[0].password))) {
      res.status(400).send({message: "Invalid credentials"});
    }

    const token = jwt.sign(
      {user_id: user[0].id, email},
      "rayal10minhipadhega",
      {
        expiresIn: "2h"
      }
    );

    await service.updateToken(user[0].id, token); 

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
