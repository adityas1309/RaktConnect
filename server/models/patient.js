import mongoose from "mongoose";
import validator from "validator";

const patientSchema = mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
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
        validator: function (value) {
          return validator.isMobilePhone(value, "en-IN");
        },
        message: (props) => `Phone number is invalid: ${props.value}`,
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

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
