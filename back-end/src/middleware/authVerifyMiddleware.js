const jwt = require("jsonwebtoken");

exports.authVerify = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    const tokenData = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const email = tokenData["data"];
    req.headers.email = email;
    next();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
