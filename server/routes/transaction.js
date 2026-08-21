const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  getTotal,
  getAccountDetails,
} = require("../Controller/transactionController");

const router = express.Router();

router.route("/addTransaction").post(addTransaction);
router.route("/getAllTransaction").get(getAllTransaction);
router.route("/getTotal").get(getTotal);
router.route("/getAccountDetails").get(getAccountDetails);

module.exports = router;
