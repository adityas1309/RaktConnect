import mongoose from "mongoose";
import validator from "validator";

const hospitalSchema = mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      minLength: 4,
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
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator(value) {
          return validator.isMobilePhone(value, "en-IN");
        },
        message: (props) => `Phone number is invalid: ${props.value}`,
      },
    },
    licenseNumber: {
      type: String,
      maxLength: 30,
      required: true,
    },
    state: {
      type: String,
      minLength: 1,
      maxLength: 50,
      required: true,
    },
    district: {
      type: String,
      minLength: 1,
      maxLength: 50,
      required: true,
    },
    bloodInventory: {
      A_positive: { type: Number, default: 0 },
      A_negative: { type: Number, default: 0 },
      B_positive: { type: Number, default: 0 },
      B_negative: { type: Number, default: 0 },
      AB_positive: { type: Number, default: 0 },
      AB_negative: { type: Number, default: 0 },
      O_positive: { type: Number, default: 0 },
      O_negative: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);
export default Hospital;
