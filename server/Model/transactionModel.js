const mongoose = require("mongoose");

const TransactionModel = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    account: {
      type: String,
      enum: ["Cash", "Account", "Card"],
      required: true,
    },
    note: {
      type: String,
    },
    desc: {
      type: String,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

let model = mongoose.model("Transaction", TransactionModel);

module.exports = model;
