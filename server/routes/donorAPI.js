import { Router } from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import Donor from "../models/donor.js";

const donorRouter = Router();

donorRouter.get(
  "/donor/checkInfo",
  ClerkExpressRequireAuth(),
  async (req, res) => {
    try {
      const user = await Donor.findOne({ clerkUserId: req.auth.userId }).select(
        "-password"
      );

      if (!user) return res.status(404).json({ error: "User not found" });

      const missing =
        !user.bloodType ||
        !user.lastDonationDate ||
        !user.state ||
        !user.district;

      res.json({ missing, user });
    } catch (error) {
      console.error("Check error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

donorRouter.post(
  "/donor/updateInfo",
  ClerkExpressRequireAuth(),
  async (req, res) => {
    try {
      const user = await Donor.findOneAndUpdate(
        { clerkUserId: req.auth.userId },
        {
          bloodType: req.body.bloodType,
          lastDonationDate: req.body.lastDonationDate,
          state: req.body.state,
          district: req.body.district,
          medicalCondition: req.body.medicalCondition,
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: "Donor not found" });
      }

      res.json({ success: true, donor: user });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ error: "Failed to update donor info" });
      console.log("Auth header:", req.headers.authorization);
      console.log("req.auth.userId from Clerk:", req.auth?.userId);
    }
  }
);

export default donorRouter;