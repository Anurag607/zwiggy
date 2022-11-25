const jwt = require('jsonwebtoken')

const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if(!token) {
    return res.status(403).send({message: "You are not authorized"});
  }

  try {
    const decoded = jwt.verify(token, "rayal10minhipadhega");
    req.user = decoded;
  } catch(err) {
    return res.status(403).send({message: "You are not authorized"});
  }

  return next();
}

module.exports = {
  verifyToken
}
