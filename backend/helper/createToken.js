const jwt = require("jsonwebtoken");

const createToken = (id) => {
  const maxAge = 3 * 24 * 60 * 60;
  return jwt.sign({ id },process.env.JWT_SECRET , { expiresIn: maxAge });
};

module.exports = createToken;
