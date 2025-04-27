import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/connectDB.js";
import authRouter from "./routes/auth.js";
import apiRouter from "./routes/apiRoutes.js";
import patientRouter from "./routes/patientAPI.js";
import donorRouter from "./routes/donorAPI.js";
import hospitalRouter from "./routes/hospitalAPI.js";

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin:[ "http://localhost:5173" , "https://raktconnect.onrender.com" ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/", authRouter);
app.use("/", apiRouter);
app.use("/", patientRouter);
app.use("/", donorRouter);
app.use("/", hospitalRouter)

app.get("/", (req, res) => {
  res.send("Welcome to RaktConnect API");
});


connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to database :", err);
  });
