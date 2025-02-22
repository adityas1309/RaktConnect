import mongoose from "mongoose";

const bloodRequestSchema = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Hospital",
    },
    bloodType: {
      type: String,
      required: true,
    },
    units: {
      type: Number,
      required: true,
      max: 100,
    },
    urgencyLevel: {
      type: String,
      required: true,
      lowercase: true,
      enuum: ["low", "medium", "high"],
    },
    requestDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["active", "rejected", "fulfilled", "cancelled"],
      default: "active",
    },
    note: {
      type: String,
      maxLength: 100,
    },
  },
  {
    timeStamps: true,
  }
);

const BloodRequest = new mongoose.model("BloodRequest", bloodRequestSchema);

export default BloodRequest;
