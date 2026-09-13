const express = require("express");
const router = express.Router();

const { googleLogin } = require("../Controller/AuthController");

router.post("/google_login", googleLogin);

module.exports = router;