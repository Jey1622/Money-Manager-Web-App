const mongoose = require("mongoose");

const CategoryModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Income", "Expense"],
      required: true,
    },
    emoji: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      trim: true,
    },

    // null = default category
    // ObjectId = category created by a user
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

let model = mongoose.model("Category", CategoryModel);

module.exports = model;
