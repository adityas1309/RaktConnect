import mongoose from "mongoose";

const bloodDonationSchema = mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Donor",
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
    unitsDonated: {
      type: Number,
      required: true,
      max: 100,
    },
    donationDate: {
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
  },
  {
    timeStamps: true,
  }
);

const BloodDonation = new mongoose.model("BloodDonation", bloodDonationSchema);

export default BloodDonation;
