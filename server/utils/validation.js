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
      throw new Error(emailId+" is invalid Email ");
    } else if (!validator.isStrongPassword(password)) {
      throw new Error("Password must be strong <br>  (A-Z, a-z, 0-9, symbol)");
    } else if (!validator.isMobilePhone(phoneNumber, "en-IN")) {
      throw new Error( phoneNumber+" is invalid Phone number");
    } else if (!age) {
      throw new Error("Enter correct Age");
    }
  }
  if (userType === "donor") {
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
      throw new Error(emailId+" is invalid Email ");
    } else if (!validator.isStrongPassword(password)) {
      throw new Error("Password must be strong <br>  (A-Z, sa-z, 0-9, symbol)");
    } else if (!validator.isMobilePhone(phoneNumber, "en-IN")) {
      throw new Error( phoneNumber+" is invalid Phone number");
    } else if (!age) {
      throw new Error("Enter correct Age");
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
      throw new Error(emailId+" is invalid Email ");
    } else if (!validator.isStrongPassword(password)) {
      throw new Error("Password must be strong <br>  A-Z, a-z, 0-9, symbol)");
    } else if (!validator.isMobilePhone(phoneNumber, "en-IN")) {
      throw new Error( phoneNumber+" is invalid Phone number");
    } else if (!age) {
      throw new Error("Enter correct Age");
    }
  }
};

export default validateSignupData;
