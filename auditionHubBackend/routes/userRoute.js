const express = require("express");
const { login, changePassword } = require("./../controllers/userController");
const router = express.Router();

router.post("/login", login).put("/changePassword", changePassword);

module.exports = router;
