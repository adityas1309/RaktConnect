import jwt from "jsonwebtoken";
import { Router } from "express";
import Donor from "../models/donor.js";
const donorRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET; 

// Check if donor information is missing
donorRouter.post("/donor/checkInfo", async (req, res) => {
  const { token } = req.body;
  let user;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    user = await Donor.findById(decoded.id).select("-password");


    if (!user.bloodType || !user.lastDonationDate || !user.state || !user.district) {
      return res.json({ missing: true });
    }

    res.json({ missing: false, user });
  } catch (error) {
    console.error(error)
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

// Update donor info
donorRouter.post("/donor/updateInfo", async (req, res) => {
  const { token, bloodType, lastDonationDate, state, district, medicalCondition } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const updatedUser = await Donor.updateOne(
      { _id: decoded.id }, // Find donor by ID
      {
        $set: {
          bloodType,
          lastDonationDate,
          state,
          district,
          medicalCondition,
        },
      }
    );
    

    if (updatedUser.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error)
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

export default donorRouter;
