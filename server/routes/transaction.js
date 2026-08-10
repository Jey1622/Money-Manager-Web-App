const express = require("express");
const {
  addTransaction,
  getAllTransaction,
} = require("../Controller/transactionController");

const router = express.Router();

router.route("/addTransaction").post(addTransaction);
router.route("/getAllTransaction").get(getAllTransaction);

module.exports = router;
