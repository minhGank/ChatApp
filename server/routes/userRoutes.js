const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.post("/setProfilePicture/:username", userControllers.setProfilePicture);
router.get("/allUsers/:id", userControllers.getAllUSers);

module.exports = router;
