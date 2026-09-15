const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  getTotal,
  getAccountDetails,
  getGraphDetails,
} = require("../Controller/transactionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/addTransaction").post(authMiddleware,addTransaction);
router.route("/getAllTransaction").get(authMiddleware,getAllTransaction);
router.route("/getTotal").get(authMiddleware,getTotal);
router.route("/getAccountDetails").get(authMiddleware,getAccountDetails);
router.route("/getGraphDetails").get(authMiddleware,getGraphDetails);

module.exports = router;
