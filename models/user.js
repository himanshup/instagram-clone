const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let userSchema = new mongoose.Schema({
  username: String,
  password: String
  // avatar: String,
  // followers: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User"
  //   }
  // ],
  // following: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User"
  //   }
  // ]
});

// use bcrypt to hash password before saving to database
userSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

userSchema.pre("save", function(next) {
  if (!this.password) {
    console.log("models/user.js =======NO PASSWORD PROVIDED=======");
    next();
  } else {
    console.log("models/user.js hashPassword in pre save");

    this.password = this.hashPassword(this.password);
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
