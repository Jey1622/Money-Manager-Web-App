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
      .populate("category", "name type emoji")
      .sort({ date: -1 });

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

//don't need this api
exports.getTotal = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({
      isDelete: false,
    })
      .select("date amount category account")
      .populate("category", " type");

    const incomeTotal = transactions
      .filter((transaction) => transaction.category.type === "Income")
      .reduce((total, transaction) => total + transaction.amount, 0);

    const expenseTotal = transactions
      .filter((transaction) => transaction.category.type === "Expense")
      .reduce((total, transaction) => total + transaction.amount, 0);

    const total = incomeTotal - expenseTotal;

    return res.status(200).json({
      success: true,
      incomeTotal,
      expenseTotal,
      total,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAccountDetails = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({
      isDelete: false,
    })
      .select("date amount category account")
      .populate("category", " type");

    let cashTotal = 0;
    let accountTotal = 0;
    let cardLiability = 0;

    transactions.forEach((transaction) => {
      let amount = transaction.amount;

      if (transaction.account === "Cash") {
        if (transaction.category.type === "Income") {
          cashTotal += amount;
        } else if (transaction.category.type === "Expense") {
          cashTotal -= amount;
        }
      }

      if (transaction.account === "Account") {
        if (transaction.category.type === "Income") {
          accountTotal += amount;
        } else if (transaction.category.type === "Expense") {
          accountTotal -= amount;
        }
      }

      // Card = liability
      if (transaction.account === "Card") {
        if (transaction.category.type === "Expense") {
          cardLiability += amount;
        } else if (transaction.category.type === "Income") {
          cardLiability -= amount;
        }
      }
    });

    const assets = cashTotal + accountTotal;
    const total = assets - cardLiability;

    return res.status(200).json({
      success: true,
      cashTotal,
      accountTotal,
      cardLiability,
      assets,
      total,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getGraphDetails = async (req, res, next) => {
  try {
    const { month, year } = req.query;

    const startDate = new Date(year, month - 6, 1);
    const endDate = new Date(year, month, 1);
    const transaction = await Transaction.find({
      isDelete: false,
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .select("date amount category")
      .populate("category", "type");

    const monthlyData = {};

    transaction.forEach((item) => {
      const date = new Date(item.date);

      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0",
      )}`;

      if (!monthlyData[key]) {
        monthlyData[key] = {
          income: 0,
          expense: 0,
        };
      }

      if (item.category.type === "Income") {
        monthlyData[key].income += item.amount;
      }

      if (item.category.type === "Expense") {
        monthlyData[key].expense += item.amount;
      }
    });

    const result = Object.entries(monthlyData).map(([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense,
      balance: data.income - data.expense,
    }));
   
    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
