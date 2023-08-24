const productModel = require("../models/productModel");

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const reqBody = req.body;
    const data = await productModel.create(reqBody);
    res.status(201).json({ status: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All Product
exports.getAllProducts = async (req, res) => {
  try {
    const data = await productModel.aggregate([
      {
        $project: {
          title: 1,
          description: 1,
          price: 1,
          thumbnail: 1,
          discountPrice: 1,
          brand: 1,
          category: 1,
          stock: 1,
          rating: 1,
        },
      },
    ]);
    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
