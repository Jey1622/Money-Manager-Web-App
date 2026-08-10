const Category = require("../Model/categoryModel");
const Transaction = require("../Model/transactionModel");

exports.addTransaction = async (req, res, next) => {
  try {
    const { date, amount, category, account, note, desc } = req.body;
    const transaction = await Transaction.create({
      date,
      amount,
      category,
      account,
      note,
      desc,
    });
    return res.status(201).json({
      success: true,
      message: "Transaction Added Successfully",
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.find({ isDelete: false })
      .select("date amount category account note desc")
      .populate("category", "name");
    return res.status(200).json({
      success: true,
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
