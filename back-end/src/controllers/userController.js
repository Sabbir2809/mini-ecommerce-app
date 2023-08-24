const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// register
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All Field are Required" });
    }

    if (password.length < 4) {
      return res
        .status(400)
        .json({ success: false, message: "The length of User password can be minimum 4 characters" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User Already Exist" });
    }

    // Hashed Password
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await userModel.create({ email, password: hashedPassword });

    res.status(201).json({
      success: true,
      status: "Registration Successful",
      data: {
        email: user.email,
        _id: user.id,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Email is not registered" });
    }

    // Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid Username or Password" });
    }

    // Generate JWT token
    const payload = {
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // Expiry time in seconds
      data: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

    res.status(200).json({
      success: true,
      token: token,
      data: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
