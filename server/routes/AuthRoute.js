const express = require("express");
const router = express.Router();
const authMiddleware=require("../middleware/authMiddleware")


const { googleLogin, logout } = require("../Controller/AuthController");

router.post("/google_login", googleLogin);
router.post("/logout", logout);

router.get("/me", authMiddleware, (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports = router;