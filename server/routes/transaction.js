const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  getTotal,
} = require("../Controller/transactionController");

const router = express.Router();

router.route("/addTransaction").post(addTransaction);
router.route("/getAllTransaction").get(getAllTransaction);
router.route("/getTotal").get(getTotal);

module.exports = router;
