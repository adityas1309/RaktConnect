import { Router } from "express";
import Donor from "../models/donor.js";
import jwt from "jsonwebtoken"
const JWT_SECRET = process.env.JWT_SECRET;

donorRouter = Router();

const verifyToken = (req, res, next) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: "Access Denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.email = decoded.email;
    next();
  });
};

donorRouter.post("/donor/details", async (req, res) => {

  try {
    const donor = await Donor.findOne({ email: req.email });

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


donorRouter.post("/donor/update", verifyToken, async (req, res) => {
  const { state, district, medicalCondition, bloodType } = req.body;

  try {
    const donor = await Donor.findOneAndUpdate(
      { email: req.email },
      { state, district, medicalCondition, bloodType },
      { new: true }
    );

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default donorRouter;