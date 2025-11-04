<<<<<<< HEAD
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
=======
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
>>>>>>> 4133f435f42f856e397f4544f05406be8d1653a0
    process.exit(1);
  }
};

<<<<<<< HEAD
export default connectDB;
=======
module.exports = connectDB;
>>>>>>> 4133f435f42f856e397f4544f05406be8d1653a0
