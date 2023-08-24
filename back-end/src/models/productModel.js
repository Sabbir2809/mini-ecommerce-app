const mongoose = require("mongoose");

// Schema
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    discountPercentage: { type: Number },
    brand: { type: String },
    category: { type: String },
    stock: { type: String },
    rating: { type: String },
  },
  { timestamps: true, versionKey: false }
);

// model
const productModel = mongoose.model("Products", productSchema);

module.exports = productModel;
