import { Router } from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import BloodRequest from "../models/bloodRequest.js";
import Patient from "../models/patient.js";

const patientRouter = Router();

patientRouter.post(
  "/verify/patient",
  ClerkExpressRequireAuth(),
  async (req, res) => {
    try {
      const updatedPatient = await Patient.findOneAndUpdate(
        { clerkUserId: req.auth.userId },
        {
          clerkUserId: req.auth.userId, 
          name: req.body.name,
          age: req.body.age,
          bloodType: req.body.bloodType?.toLowerCase(),
          phoneNumber: req.body.phoneNumber,
          medicalCondition: req.body.medicalCondition,
          emailId: req.body.emailId,
        },
        { new: true, upsert: true }
      );

      res.status(200).json({ success: true, data: updatedPatient });
    } catch (err) {
      console.error("Patient profile update error:", err);
      res.status(500).json({ message: "Error updating patient profile" });
    }
  }
);

patientRouter.post(
  "/patient/bloodRequests",
  ClerkExpressRequireAuth(),
  async (req, res) => {
    try {
      const { hospitalId, units, bloodType, urgencyLevel, requestDate, note } =
        req.body;

      if (
        !hospitalId ||
        !units ||
        !bloodType ||
        !urgencyLevel ||
        !requestDate
      ) {
        return res
          .status(400)
          .json({ message: "All required fields must be filled" });
      }

      const bloodRequest = new BloodRequest({
        patientId: req.auth.userId,
        hospitalId,
        bloodType,
        units,
        urgencyLevel,
        requestDate,
        note,
        status: "active",
      });

      await bloodRequest.save();
      res.status(201).json({ message: "Blood request created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

patientRouter.get(
  "/patient/requestHistory",
  ClerkExpressRequireAuth(),
  async (req, res) => {
    try {
      const bloodRequests = await BloodRequest.find({
        patientId: req.auth.userId,
      });

      if (!bloodRequests || bloodRequests.length === 0) {
        return res
          .status(404)
          .json({ message: "No blood request history found" });
      }

      res.status(200).json({ success: true, data: bloodRequests });
    } catch (error) {
      console.error("Error fetching blood history:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

patientRouter.put(
  "/patient/cancelRequest/:id",
  ClerkExpressRequireAuth(),
  async (req, res) => {
    try {
      const requestId = req.params.id;

      const request = await BloodRequest.findOneAndUpdate(
        { _id: requestId, patientId: req.auth.userId, status: "active" },
        { status: "cancelled" },
        { new: true }
      );

      if (!request) {
        return res
          .status(404)
          .json({ message: "Request not found or already processed" });
      }

      res.status(200).json({ success: true, data: request });
    } catch (error) {
      console.error("Error cancelling blood request:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default patientRouter;
