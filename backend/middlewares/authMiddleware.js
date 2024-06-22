const jwt = require("jsonwebtoken");
const User = require("../models/User");

const AuthMiddleware = (req, res, next) => {
  let token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ err: "unauthancated" });
      } else {
        User.findById(decoded.id).then((user) => {
          req.user = user;
          next();
        });
      }
    });
  } else {
    return res.status(400).json({ err: "need to authancate" });
  }
};

module.exports = AuthMiddleware;
