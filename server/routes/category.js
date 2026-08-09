const express = require("express");
const { getCategories } = require("../Controller/categoryController");

const router = express.Router();

router.route("/getCategories").post(getCategories);

module.exports = router;