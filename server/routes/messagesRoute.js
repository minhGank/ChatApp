const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController");

router.post("/addMsg", messagesController.addMsg);
router.post("/getMsg", messagesController.getAllMsg);

module.exports = router;
