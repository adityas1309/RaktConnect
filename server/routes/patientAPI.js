import { Router } from "express";
import jwt from "jsonwebtoken";
import BloodRequest from "../models/bloodRequest.js";

const JWT_SECRET = process.env.JWT_SECRET;

const patientRouter = Router();

patientRouter.post("/patient/bloodRequests", async (req, res) => {
  try {
    const {
      hospitalId,
      units,
      bloodType,
      urgencyLevel,
      requestDate,
      note,
      token,
    } = req.body;

    if (
      !hospitalId ||
      !units ||
      !bloodType ||
      !urgencyLevel ||
      !requestDate ||
      !token
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const bloodRequest = new BloodRequest({
      patientId: decoded.id,
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
});

patientRouter.post("/patient/requestHistory", async (req, res) => {
  try {
    const { authToken } = req.body;

    if (!authToken) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(authToken, JWT_SECRET);
    const patientId = decoded.id;

    const bloodRequests = await BloodRequest.find({ patientId });

    if (bloodRequests.length === 0) {
      return res
        .status(404)
        .json({ message: "No blood request history forun und" });
    }

    res.status(200).json({ success: true, data: bloodRequests });
  } catch (error) {
    console.error("Error fetching blood history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

patientRouter.post("/patient/cancelRequest", async (req, res) => {
  try {
    const { authToken, requestId } = req.body;

    if (!authToken || !requestId) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const decoded = jwt.verify(authToken, JWT_SECRET);
    const patientId = decoded.id;

    const request = await BloodRequest.findOneAndUpdate(
      { _id: requestId, patientId, status: "active" },
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
});

export default patientRouter;
