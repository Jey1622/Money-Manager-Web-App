const mongoose = require("mongoose");
const Category = require("../Model/categoryModel");
const categories = require("../config/categories.json");

const path = require("path");
const dotenv = require("dotenv");
dotenv.config({
  path: path.join(__dirname, "../config/config.env")
});

// const MONGO_URI = "mongodb://127.0.0.1:27017/expenseDB";

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.DB_LOCAL_URI);

    console.log("MongoDB connected");

    // Remove existing default categories
    await Category.deleteMany({ userId: null });

    // Insert default categories
    await Category.insertMany(categories);

    console.log(`${categories.length} categories inserted successfully`);

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

seedCategories();