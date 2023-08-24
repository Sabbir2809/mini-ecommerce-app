// Dependencies
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userController");
const { createProduct, getAllProducts } = require("../controllers/productController");
const { createCart, getAllCartList, deleteCart } = require("../controllers/cartController");
const { authVerify } = require("../middleware/authVerifyMiddleware");
const { paymentGateway, paymentSuccess, paymentFail } = require("../controllers/paymentGateway");

// API Routing End Point:

// @User Authentication API: register, login
router.post("/auth/user-register", register);
router.post("/auth/user-login", login);

// @Product API: createProduct, getAllProducts
router.post("/create-product", authVerify, createProduct);
router.get("/products", getAllProducts);

// @Cart API: createCar, getAllCartList, deleteCart
router.post("/create-cart", authVerify, createCart);
router.post("/cart-list", authVerify, getAllCartList);
router.delete("/delete-cart/:id", authVerify, deleteCart);

// SSLCommerz Payment Gateway API: order, paymentSuccess, paymentFail
router.post("/order", paymentGateway);
router.post("/payment/success/:transId", paymentSuccess);
router.post("/payment/fail/:transId", paymentFail);

// Exports
module.exports = router;
