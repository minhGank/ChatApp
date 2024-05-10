const Message = require("../model/messageModel");
const mongoose = require("mongoose");
exports.addMsg = async (req, res, next) => {
  try {
    const { message, from, to } = req.body;
    const data = await new Message({
      text: message,
      users: [from, to],
      sender: from,
    }).save();
    if (data) {
      return res.json({ msg: "Message added successfully" });
    } else {
      return res.json({ msg: "Message added fail" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getAllMsg = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const conversation = await Message.find({
      users: { $all: [from, to] },
    });
    const projectMessages = conversation.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.text,
      };
    });
    res.json(projectMessages);
  } catch (error) {
    console.log(error);
  }
};
