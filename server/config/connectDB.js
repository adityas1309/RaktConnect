import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI = process.env.MONGO_URI;

const connectDB = async () => {
  await mongoose.connect(`${URI}`);
};

export default connectDB;
