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
    const { month, year } = req.query;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    const transaction = await Transaction.find({
      isDelete: false,
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .select("date amount category account note desc")
      .populate("category", "name type");
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
