const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB URI
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Successfully Connected to MongoDB`);
    //  MongoDB Error
    mongoose.connection.on('error', (error) => {
      console.error(`MongoDB Connection Error: ${error.message}`);
    });
  } catch (error) {
    console.error(`Could Not Connect to MongoDB: ${error.message}`);
  }
};

module.exports = connectDB;
