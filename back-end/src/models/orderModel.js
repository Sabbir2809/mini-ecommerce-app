const mongoose = require("mongoose");

// Schema
const orderSchema = new mongoose.Schema(
  {
    product: { type: Object },
    paidStatus: { type: Boolean },
    transactionId: { type: String },
  },
  { timestamps: true, versionKey: false }
);

// model
const orderModel = mongoose.model("Orders", orderSchema);

module.exports = orderModel;
