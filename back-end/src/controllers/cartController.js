const { mongoose } = require("mongoose");
const cartModel = require("../models/cartModel");

// create cart
exports.createCart = async (req, res) => {
  try {
    const data = await cartModel.create(req.body);
    res.status(201).json({ status: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// get all cart list
exports.getAllCartList = async (req, res) => {
  try {
    const reqBody = req.body;
    const email = reqBody.userEmail;
    const data = await cartModel.aggregate([
      { $match: { userEmail: email } },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "cartList",
        },
      },
      {
        $project: {
          _id: 1,
          userEmail: 1,
          productId: 1,
          cartList: 1,
        },
      },
      { $unwind: "$cartList" },
    ]);

    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

// delete cart product
exports.deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { _id: id };
    const data = await cartModel.deleteOne(query, { new: true });

    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};
