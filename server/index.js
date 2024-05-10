const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messagesRoute");
require("dotenv").config();
const socket = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/message", messageRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    //dont know 2 lines below this for what
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(console.log(err));
  });

const server = app.listen(process.env.PORT, () => {
  console.log("Server connected");
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUser = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUser.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUser.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    }
  });
});
