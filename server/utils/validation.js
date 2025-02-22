import validator from "validator";

const validateSignupData = (req, userType) => {
  if (userType === "patient") {
    const {
      name,
      emailId,
      password,
      phoneNumber,
      age,
    } = req.body;

    if (!name) {
      throw new Error("Name is invalid");
    } else if (!validator.isEmail(emailId)) {
      throw new Error("Email is invalid : " + emailId);
    } else if (!validator.isStrongPassword(password)) {
      throw new Error("Enter a strong password : " + password);
    } else if (!validator.isMobilePhone(phoneNumber, "en-IN")) {
      throw new Error("Phone number is invalid :" + phoneNumber);
    } else if (!age) {
      throw new Error("Enter correct credential");
    }
  }
  if (userType === "donor") {
    const {
      name,
      emailId,
      password,
      phoneNumber,
      bloodType,
      age,
      state,
      district,
    } = req.body;

    if (!name) {
      throw new Error("Name is invalid");
    } else if (!validator.isEmail(emailId)) {
      throw new Error("Email is invalid : " + emailId);
    } else if (!validator.isStrongPassword(password)) {
      throw new Error("Enter a strong password : " + password);
    } else if (!validator.isMobilePhone(phoneNumber, "en-IN")) {
      throw new Error("Phone number is invalid :" + phoneNumber);
    } else if (!bloodType || !age || !state || !district) {
      throw new Error("Enter correct credential");
    }
  }
  if (userType === "hospital") {
    const {
      name,
      emailId,
      password,
      phoneNumber,
      licenseNumber,
      state,
      district,
    } = req.body;

    if (!name) {
      throw new Error("Name is invalid");
    } else if (!validator.isEmail(emailId)) {
      throw new Error("Email is invalid : " + emailId);
    } else if (!validator.isStrongPassword(password)) {
      throw new Error("Enter a strong password : " + password);
    } else if (!validator.isMobilePhone(phoneNumber, "en-IN")) {
      throw new Error("Phone number is invalid :" + phoneNumber);
    } else if (!licenseNumber || !state || !district) {
      throw new Error("Enter correct credential");
    }
  }
};

export default validateSignupData;
