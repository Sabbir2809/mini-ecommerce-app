// Dependencies
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const router = require("./src/routes/api");

// express app
const app = express();

// Application & Security Level Middleware
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize());
const limiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 30 });
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));

// API Health Check Route
app.get("/", (req, res) => {
  res.send("API, All is Well");
});

// Routes
app.use("/api", router);

// Exports
module.exports = app;
