const { validationResult } = require("express-validator");

const handleErrMsg = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.mapped()})
  } else {
    next();
  }
};

module.exports = handleErrMsg;
