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
      transaction
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
