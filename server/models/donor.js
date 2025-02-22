import mongoose from "mongoose";
import validator from "validator";

const donorSchema = mongoose.Schema(
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
    bloodType: {
      type: String,
      maxLength: 3,
      lowercase: true,
      enum: {
        values: ["a+", "a-", "b+", "b-", "ab+", "ab-", "o+", "o-"],
        message: `{VALUE} is not valid`,
      },
    },
    age: {
      type: Number,
      max: 100,
      required: true,
    },
    state: {
      type: String,
      default: "",
    },
    district: {
      type: String,
      default: "",
    },
    lastDonationDate: {
      type: String,
      default: "",
    },
    medicalCondition: {
      type: String,
      default: "",
      minLength: 0,
      maxLength: 100,
      
    },
  },
  {
    timestamps: true,
  }
);

const Donor = new mongoose.model("Donor", donorSchema);

export default Donor;
