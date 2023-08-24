const mongoose = require("mongoose");

// Schema
const cartSchema = new mongoose.Schema(
  {
    userEmail: { type: String },
    productId: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true, versionKey: false }
);

// model
const cartModel = mongoose.model("Carts", cartSchema);

module.exports = cartModel;
