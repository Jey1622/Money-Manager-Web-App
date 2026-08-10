const express = require("express");
const { addTransaction } = require("../Controller/transactionController");

const router = express.Router();

router.route("/addTransaction").post(addTransaction);

module.exports = router;