const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const { body } = require("express-validator");
const handleErrMsg = require("../middlewares/handleErrMsg");
const User = require('../models/User')
const AuthMiddleware = require("../middlewares/authMiddleware");

router.post("/login",  [
  body("email").notEmpty(),
  body("password").notEmpty(),
],handleErrMsg, UserController.login);

router.post(
  "/sign-up",
  [
    body("name").notEmpty(),
    body("email").notEmpty().custom(async value => {
      const user = await User.findOne({email: value});
      if (user) {
        throw new Error("E-mail already in use.");
      }
    }),
    body("password").notEmpty(),
  ],
  handleErrMsg,
  UserController.signUp
);

router.post('/logout',UserController.logout);

router.get('/me',AuthMiddleware, UserController.me)


module.exports = router;
