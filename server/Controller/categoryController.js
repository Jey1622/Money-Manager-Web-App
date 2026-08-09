const Category = require("../Model/categoryModel");

exports.getCategories = async (req, res, next) => {
  try {
    const { type } = req.body;

    const categories = await Category.find({ type: type });

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
