const mongoose = require("mongoose");
const transactions = require("../config/transaction.json");
const Transaction=require("../Model/transactionModel")

const path = require("path");
const dotenv = require("dotenv");
dotenv.config({
  path: path.join(__dirname, "../config/config.env")
});


const seedTransactions = async () => {
  try {
    await mongoose.connect(process.env.DB_LOCAL_URI);

    console.log("MongoDB connected");

    // Remove existing default Transactions
    await Transaction.deleteMany({ userId: null });

    // Insert default Transactions
    await Transaction.insertMany(transactions);

    console.log(`${transactions.length} Transactions inserted successfully`);

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

seedTransactions();