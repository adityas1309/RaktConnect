import { Router } from "express";
import BloodRequest from "../models/bloodRequest.js";
import Hospital from "../models/hospital.js";
import jwt from "jsonwebtoken";

const hospitalRouter = Router();

hospitalRouter.post("/api/bloodRequests", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hospital = await Hospital.findById(decoded.id);

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
    res.status(401).json({ message: "Invalid token" });
  }
});

hospitalRouter.put("/api/bloodRequests/:id/status", async (req, res) => {
  const { token, status } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hospital = await Hospital.findById(decoded.id);

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const request = await BloodRequest.findOneAndUpdate(
      { _id: req.params.id, hospitalId: hospital._id },
      { status: status },
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
});

export default hospitalRouter;
