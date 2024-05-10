const User = require("../model/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const userCheck = await User.findOne({ username });
    const emailCheck = await User.findOne({ email });
    if (userCheck) {
      return res.json({ msg: "Username already used", status: false });
    }
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email: email,
      password: hashPassword,
      username: username,
    });
    await newUser.save();
    delete newUser.password;
    res.json({ status: true, newUser });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const checkPassword = bcrypt.compare(password, user.password);
      if (checkPassword == true) {
        delete user.password;
        res.json({ status: true, user });
      } else {
        return res.json({ msg: "Password is incorrect", status: false });
      }
    } else {
      return res.json({
        msg: "We couldn't find any account that goes with this email address",
        status: false,
      });
    }
  } catch (ex) {
    next(ex);
  }
};

exports.setProfilePicture = async (req, res, next) => {
  try {
    const username = req.params.username;
    const selectedAvatar = req.body.img;
    console.log(selectedAvatar);
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.json({
        msg: "Username not found, please login again",
        status: false,
      });
    }
    user.avatar = selectedAvatar;
    user.hasAvatarImage = true;
    await user.save();
    return res.json({ status: true, msg: "Set avatar success" });
  } catch (error) {
    console.log(error);
    res.json({ status: false, msg: error });
  }
};

exports.getAllUSers = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({
        msg: "User not found. Please log in again",
        status: false,
      });
    }
    const allUsers = await User.find({ _id: { $ne: userId } }).select(
      "username _id email avatar"
    );
    return res.json({ allUsers: allUsers, status: true, currentUser: user });
  } catch (error) {
    console.log(error);
  }
};
