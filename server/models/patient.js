import mongoose from "mongoose";
import validator from "validator";

const patientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      minLength: 5,
      maxLength: 50,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid : " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password : " + value);
        }
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      validator(value) {
        if (!validator.isMobilePhone(value, "en-IN")) {
          throw new Error("Phone number is invalid :" + value);
        }
      },
    },
    age: {
      type: Number,
      max: 100,
      required: true,
    },
    medicalCondition: {
      type: String,
      default: "N/A",
      minLength: 0,
      maxLength: 100,
    },
  },
  {
    timestamps: true,
  }
);

const Patient = new mongoose.model("Patient", patientSchema);

export default Patient;
