const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

UserSchema.statics.register = async function (name, email, password) {
  let userExists = await this.findOne({ email });
  if (userExists) {
    throw new Error("User already exist.");
  }
  const salt = await bcrypt.genSalt();
  const hashValue = await bcrypt.hash(password, salt);
  const user = await this.create({
    name,
    email,
    password: hashValue,
  });
  return user;
};

UserSchema.statics.login = async function(email,password) {
  let user = await this.findOne({email});
  if(!user) {
    throw new Error("User doesn't exists.")
  }
  let isCorrect = await bcrypt.compare(password,user.password);
  if (isCorrect) {
    return user;
  } else {
    throw new Error('Password incorrect.')
  }
}

module.exports = mongoose.model("User", UserSchema);
