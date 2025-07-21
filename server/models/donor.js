import mongoose from "mongoose";
import validator from "validator";

const donorSchema = mongoose.Schema(
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
    bloodType: {
      type: String,
      lowercase: true,
      enum: {
        values: ["a+", "a-", "b+", "b-", "ab+", "ab-", "o+", "o-"],
        message: `{VALUE} is not a valid blood type`,
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

const Donor = mongoose.model("Donor", donorSchema);
export default Donor;
