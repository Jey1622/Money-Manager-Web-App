const Category = require("../Model/categoryModel");

//get Categories
exports.getCategories = async (req, res, next) => {
  try {
   const { type } = req.query;

    const categories = await Category.find({
      type,
      isActive: true,
      $or: [
        { userId: null }, // default categories
        // { userId: req.user._id }, // user's custom categories
      ],
    }).select("_id name description emoji");

    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
