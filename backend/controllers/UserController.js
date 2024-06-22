const createToken = require("../helper/createToken");
const User = require("../models/User");

const UserController = {
  me: (req,res) => {
    let user = req.user;
    return res.json(user)
  },
  login: async (req, res) => {
    try {

      let {email,password} = req.body;
      let user = await User.login(email,password);
      let token = createToken(user._id);
      res.cookie("jwt", token,{httpOnly: true,maxAge: 3 * 24 * 60 * 60 * 1000})
      return res.json({user,token});

    } catch (e) {
      return res.status(400).json({err: e.message})
    }
      
  },
  signUp: async (req, res) => {
    try {
      let { name, email, password } = req.body;
      let user = await User.register(name, email, password);
      let token = createToken(user._id);

      res.cookie("jwt", token,{httpOnly: true,maxAge: 3 * 24 * 60 * 60 * 1000})

      return res.json({user,token});
    } catch (e) {
      return res.status(400).json({ err: e.message });
    }
  },
  logout: async (req,res) => {
    res.cookie('jwt','',{maxAge: 1})
    return res.json({msg: 'user logged out!'})
  }
};

module.exports = UserController;
