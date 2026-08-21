const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  getTotal,
  getAccountDetails,
  getGraphDetails,
} = require("../Controller/transactionController");

const router = express.Router();

router.route("/addTransaction").post(addTransaction);
router.route("/getAllTransaction").get(getAllTransaction);
router.route("/getTotal").get(getTotal);
router.route("/getAccountDetails").get(getAccountDetails);
router.route("/getGraphDetails").get(getGraphDetails);

module.exports = router;
