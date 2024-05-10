const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
  username: {
    min: 3,
    max: 20,
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  hasAvatarImage: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userShema);
