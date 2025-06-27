import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI = process.env.MONGODB_URL;

const connectDB = async () => {
try {
  const conn = await mongoose.connect(`${URI}`);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
} catch (error) {
  console.log("Error connecting to database :", error);
}
};

export default connectDB;
