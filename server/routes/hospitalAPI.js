import { Router } from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import BloodRequest from "../models/bloodRequest.js";
import Hospital from "../models/hospital.js";

const hospitalRouter = Router();

hospitalRouter.post(
  "/hospital/complete-profile",
  ClerkExpressRequireAuth(),
  async (req, res) => {
    try {
      const updatedHospital = await Hospital.findOneAndUpdate(
        { clerkUserId: req.auth.userId },
        {
          clerkUserId: req.auth.userId, 
          name: req.body.hospitalName,
          contactNumber: req.body.contactNumber,
          location: req.body.location,
          emailId: req.body.emailId,
        },
        { new: true, upsert: true }
      );

      res.status(200).json({ success: true, data: updatedHospital });
    } catch (err) {
      console.error("Hospital profile update error:", err);
      res.status(500).json({ message: "Error updating hospital profile" });
    }
  }
);

hospitalRouter.get(
  "/hospital/requests",
  ClerkExpressRequireAuth(),
  async (req, res) => {
    try {
      const hospital = await Hospital.findOne({
        clerkUserId: req.auth.userId,
      });

      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }

      const requests = await BloodRequest.find({
        hospitalId: hospital._id,
        status: "active",
      });

      res.json(requests);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

hospitalRouter.put(
  "/hospital/requests/:id/status",
  ClerkExpressRequireAuth(),
  async (req, res) => {
    const { status } = req.body;

    try {
      const hospital = await Hospital.findOne({
        clerkUserId: req.auth.userId,
      });

      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }

      const request = await BloodRequest.findOneAndUpdate(
        { _id: req.params.id, hospitalId: hospital._id },
        { status },
        { new: true }
      );

      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }

      res.json(request);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Failed to update status" });
    }
  }
);

export default hospitalRouter;
