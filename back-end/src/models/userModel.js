const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "User Email Address is Required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "User Password is Required"],
    },
  },
  { timestamps: true, versionKey: false }
);

// validator
userSchema.plugin(uniqueValidator);

// model
const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
