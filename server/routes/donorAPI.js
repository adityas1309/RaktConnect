import { Router } from "express";
import Donor from "../models/donor.js";
import jwt from "jsonwebtoken"
const JWT_SECRET = process.env.JWT_SECRET;

const donorRouter = Router();

donorRouter.post("/donor/checkInfo", async (req, res) => {
  const { emailId } = req.body;

  console.log(emailId);
  

  try {
    const donor = await Donor.findOne({ emailId });

    console.log(donor);
    

    if (
      !donor ||
      !donor.bloodType ||
      !donor.lastDonationDate ||
      !donor.state ||
      !donor.district
    ) {
      return res.json({ missing: true });
    }

    res.json({ missing: false, donor });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update donor info
donorRouter.post("/donor/updateInfo", async (req, res) => {
  const {
    emailId,
    bloodType,
    lastDonationDate,
    state,
    district,
    medicalCondition,
  } = req.body;

  try {
    await Donor.updateOne(
      { emailId },
      {
        $set: {
          bloodType,
          lastDonationDate,
          state,
          district,
          medicalCondition,
        },
      },
      { upsert: true }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update donor info" });
  }
});

export default donorRouter;