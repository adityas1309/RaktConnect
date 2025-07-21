// import { Router } from "express";
// import jwt from "jsonwebtoken";
// import Patient from "../models/patient.js";
// import Donor from "../models/donor.js";
// import validateSignupData from "../utils/validation.js";
// import bcrypt from "bcrypt";
// import Hospital from "../models/hospital.js";
// const authRouter = Router();
// const JWT_SECRET = process.env.JWT_SECRET;

// authRouter.post("/signup/:userType", async (req, res) => {
//   try {
//     const userType = req?.params?.userType;

//     if (userType === "patient") {
//       const {
//         name,
//         emailId,
//         password,
//         phoneNumber,
//         age,
//         medicalCondition,
//       } = req.body;

//       validateSignupData(req, userType);

//       // encrypt password
//       const passwordHash = await bcrypt.hash(password, 10);

//       const patient = new Patient({
//         name,
//         emailId,
//         password: passwordHash,
//         phoneNumber,
//         age,
//         medicalCondition,
//       });

//       await patient.save();
//     } else if (userType === "donor") {
//       const {
//         name,
//         emailId,
//         password,
//         phoneNumber,
//         age,
//         bloodType,
//         state,
//         district,
//       } = req.body;

//       validateSignupData(req, userType);

//       // encrypt password
//       const passwordHash = await bcrypt.hash(password, 10);

//       const donor = new Donor({
//         name,
//         emailId,
//         password: passwordHash,
//         phoneNumber,
//         age,
//       });

//       await donor.save();
//     } else if (userType === "hospital") {
//       const {
//         name,
//         emailId,
//         password,
//         phoneNumber,
//         licenseNumber,
//         state,
//         district,
//       } = req.body;

//       validateSignupData(req, userType);

//       // encrypt password
//       const passwordHash = await bcrypt.hash(password, 10);

//       // creating a new instance of the User model
//       const hospital = new Hospital({
//         name,
//         emailId,
//         password: passwordHash,
//         phoneNumber,
//         licenseNumber,
//         state,
//         district,
//       });

//       await hospital.save();
//     }

//     res.status(201).json({ message: "Signup successful!" });
//   } catch (err) {
//     res.status(500).json({ message: err.message || "error during signup"  });
//     console.log(err);
//   }
// });

// authRouter.post("/login/:userType", async (req, res) => {
//   try {
//     const userType = req?.params?.userType;
//     const { emailId, password } = req.body;

//     let user;

//     if (userType === "patient") {
//       user = await Patient.findOne({ emailId });
//     } else if (userType === "donor") {
//       user = await Donor.findOne({ emailId });
//     } else if (userType === "hospital") {
//       user = await Hospital.findOne({ emailId });
//     } else {
//       return res.status(400).json({ message: "Invalid user type" });
//     }

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ id: user._id, userType }, `${JWT_SECRET}`, {
//       expiresIn: "7d",
//     });

//     res.status(200).json({ message: "Login successful", token, userType });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// authRouter.post("/verify/:userType", async (req, res) => {
//   const { userType } = req.params;
//   const { token } = req.body;

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, `${JWT_SECRET}`);

//     let user;

//     if (userType === "patient") {
//       user = await Patient.findById(decoded.id).select("-password");
//     } else if (userType === "donor") {
//       user = await Donor.findById(decoded.id).select("-password");
//     } else if (userType === "hospital") {
//       user = await Hospital.findById(decoded.id).select("-password");
//     } else {
//       console.log("Invalid user type received:", userType);
//       return res.status(400).json({ message: "Invalid user type" });
//     }

//     if (!user) {
//       console.log("User not found for ID:", decoded.id);
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ message: "Token verified", user });
//   } catch (error) {
//     console.error("Token verification error:", error);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// });

// export default authRouter;

import { Router } from "express";
import jwt from "jsonwebtoken";
import Patient from "../models/patient.js";
import Donor from "../models/donor.js";
import Hospital from "../models/hospital.js";
import validateSignupData from "../utils/validation.js";
import bcrypt from "bcrypt";

const authRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET;

// ⛔️ Keep in mind: Clerk manages signup/login, so this signup/login may become obsolete when Clerk is used fully

// 🔐 Signup
authRouter.post("/signup/:userType", async (req, res) => {
  try {
    const userType = req.params.userType;

    validateSignupData(req, userType);

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    if (userType === "patient") {
      const patient = new Patient({ ...req.body, password: passwordHash });
      await patient.save();
    } else if (userType === "donor") {
      const donor = new Donor({ ...req.body, password: passwordHash });
      await donor.save();
    } else if (userType === "hospital") {
      const hospital = new Hospital({ ...req.body, password: passwordHash });
      await hospital.save();
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }

    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Error during signup" });
  }
});

// 🔐 Login
authRouter.post("/login/:userType", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const userType = req.params.userType;

    let user;

    if (userType === "patient") {
      user = await Patient.findOne({ emailId });
    } else if (userType === "donor") {
      user = await Donor.findOne({ emailId });
    } else if (userType === "hospital") {
      user = await Hospital.findOne({ emailId });
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, userType }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Login successful", token, userType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Middleware to extract token from Authorization header
const extractUserFromToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    req.userType = decoded.userType;
    next();
  } catch (err) {
    console.error("JWT error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// 🔍 Verify user route (Clerk compatible)
authRouter.get("/verify/:userType", extractUserFromToken, async (req, res) => {
  try {
    const { userType } = req.params;

    if (userType !== req.userType) {
      return res.status(400).json({ message: "User type mismatch" });
    }

    let user;

    if (userType === "patient") {
      user = await Patient.findById(req.userId).select("-password");
    } else if (userType === "donor") {
      user = await Donor.findById(req.userId).select("-password");
    } else if (userType === "hospital") {
      user = await Hospital.findById(req.userId).select("-password");
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Token verified", user });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(500).json({ message: "Internal error" });
  }
});

export default authRouter;
