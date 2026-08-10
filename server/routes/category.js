const express = require("express");
const { getCategories } = require("../Controller/categoryController");

const router = express.Router();

router.route("/getCategories").get(getCategories);

module.exports = router;