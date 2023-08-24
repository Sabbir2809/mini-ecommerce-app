// Dependencies
const app = require("./app");
const connectDB = require("./src/config/DB");

// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // MongoDB Connection
  connectDB();
  console.log(`Server is Running at http://localhost:${PORT}`);
});
