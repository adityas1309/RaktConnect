import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import Swal from "sweetalert2";
import LoginForm from "./LoginForm";
import BASE_URL from "../../apiConfig";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function Auth() {
  const [userType, setUserType] = useState("Patient");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const userType = localStorage.getItem("userType");

    if (authToken && userType) {
      navigate(`/${userType}`);
    }
  }, [navigate]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [state, setState] = useState("");
  const [license, setLicense] = useState("");
  const [district, setDistrict] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [districts, setDistricts] = useState([]);

  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    symbol: false,
  });

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordChecks({
      length: value.length >= 8,
      upper: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      symbol: /[^A-Za-z0-9]/.test(value),
    });
  };

  const fetchDistricts = async (selectedState) => {
    if (!selectedState) return;

    const url = `https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/district?page=1&state=${encodeURIComponent(
      selectedState
    )}&limit=100000`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f52750023dmshe3f6d17241873e7p101b5ajsna0eb45d88394",
        "x-rapidapi-host":
          "india-pincode-with-latitude-and-longitude.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setDistricts(data);
      setDistrict("");
    } catch (error) {
      console.error("Error fetching districts:", error);
      setDistricts([]);
    }
  };

  const handlePatientLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      emailId: email,
      password: password,
    };

    try {
      const response = await fetch(`${BASE_URL}/login/patient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);

        if (data.token) {
          localStorage.clear();
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("userType", data.userType);
        }

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have logged in successfully!",
        }).then(() => {
          navigate("/patient");
        });
      } else {
        console.error("Login failed:", data.message);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.message || "Invalid credentials",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again later.",
      });
    }
  };

  // global toast property prevent from DRY

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handlePatientSignup = async (e) => {
    e.preventDefault();

    const patientData = {
      name: name,
      emailId: email,
      password: password,
      phoneNumber: contact,
      age: age,
      medicalCondition: medicalCondition,
    };

    try {
      const response = await fetch(`${BASE_URL}/signup/patient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);

        Toast.fire({
          icon: "success",
          html: "<strong>Signup successful</strong>",
          timer: 2000,
        });

        setTimeout(async () => {
            Toast.fire({
            icon: "info",
            html: "<strong>Redirecting...</strong>",
            timer: 2000,
          });
          window.location.reload();
        }, 3000);
      } else {
        console.error("Signup failed:", data.message);
        Toast.fire({
          icon: "error",
          html: `<strong style="font-weight:bold;">${data.message}</strong>`,
        });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      Toast.fire({
        icon: "error",
        html: `<strong style="font-weight:bold;">${
          error.message || "Something went wrong."
        }</strong>`,
      });
    }
  };

  const handleDonorLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      emailId: email,
      password: password,
    };

    try {
      const response = await fetch(`${BASE_URL}/login/donor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);

        if (data.token) {
          localStorage.clear();
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("userType", data.userType);
        }

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have logged in successfully!",
        }).then(() => {
          // Redirect user after login (Modify as needed)
          navigate("/donor");
        });
      } else {
        console.error("Login failed:", data.message);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.message || "Invalid credentials",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again later.",
      });
    }
  };

  const handleDonorSignup = async (e) => {
    e.preventDefault();

    const donorData = {
      name: name,
      emailId: email,
      password: password,
      phoneNumber: contact,
      age: age,
    };

    try {
      const response = await fetch(`${BASE_URL}/signup/donor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donorData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);

        Toast.fire({
          icon: "success",
          html: "<strong>Signup successful</strong>",
          timer: 2000,
        });
        Toast.fire({
          icon: "success",
          title: "Signed up successfully",
        });
        setTimeout(async () => {
          Toast.fire({
            icon: "info",
            html: "<strong>Redirecting...</strong>",
            timer: 2000,
          });
          window.location.reload();
        }, 3000);
      } else {
        console.error("Signup failed:", data.message);
        Toast.fire({
          icon: "error",
          html: `<strong style="font-weight:bold;">${data.message}</strong>`,
        });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      Toast.fire({
        icon: "error",
        html: `<strong style="font-weight:bold;">${
          error.message || "Something went wrong."
        }</strong>`,
      });
    }
  };

  const handleHospitalLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      emailId: email,
      password: password,
    };

    try {
      const response = await fetch(`${BASE_URL}/login/hospital`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);

        if (data.token) {
          localStorage.clear();
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("userType", data.userType);
        }

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have logged in successfully!",
        }).then(() => {
          // Redirect user after login (Modify as needed)
          navigate("/hospital");
        });
      } else {
        console.error("Login failed:", data.message);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.message || "Invalid credentials",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again later.",
      });
    }
  };

  const handleHospitalSignup = async (e) => {
    e.preventDefault();

    const hospitalData = {
      name: name,
      emailId: email,
      password: password,
      phoneNumber: contact,
      licenseNumber: license,
      state: state,
      district: district,
    };

    try {
      const response = await fetch(`${BASE_URL}/signup/hospital`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hospitalData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);

        Toast.fire({
          icon: "success",
          html: "<strong>Signup successful</strong>",
          timer: 2000,
        });
        Toast.fire({
          icon: "success",
          title: "Signed up successfully",
        });
        setTimeout(async () => {
          Toast.fire({
            icon: "info",
            html: "<strong>Redirecting...</strong>",
            timer: 2000,
          });
          window.location.reload();
        }, 3000);
      } else {
        console.error("Signup failed:", data.message);
        Toast.fire({
          icon: "error",
          html: `<strong style="font-weight:bold;">${data.message}</strong>`,
        });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      Toast.fire({
        icon: "error",
        html: `<strong style="font-weight:bold;">${
          error.message || "Something went wrong."
        }</strong>`,
      });
    }
  };
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col justify-center items-center bg-gradient-to-b from-red-100 to-red-200 w-32 py-8 gap-8 shadow-lg">
        <button
          onClick={() => { setUserType("Patient"); setIsSignup(false); }}
          className={`transition-all duration-300 w-24 h-20 rounded-2xl flex flex-col items-center justify-center text-lg font-bold shadow-md border-2 gap-1 ${userType === "Patient" ? "bg-blue-100 text-blue-700 border-blue-400 scale-105" : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"}`}
          aria-label="Patient"
        >
          <svg className="w-7 h-7 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          Patient
        </button>
        <button
          onClick={() => { setUserType("Donor"); setIsSignup(false); }}
          className={`transition-all duration-300 w-24 h-20 rounded-2xl flex flex-col items-center justify-center text-lg font-bold shadow-md border-2 gap-1 ${userType === "Donor" ? "bg-green-100 text-green-700 border-green-400 scale-105" : "bg-white text-green-600 border-green-200 hover:bg-green-50"}`}
          aria-label="Donor"
        >
          <svg className="w-7 h-7 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
          Donor
        </button>
        <button
          onClick={() => { setUserType("Hospital"); setIsSignup(false); }}
          className={`transition-all duration-300 w-24 h-20 rounded-2xl flex flex-col items-center justify-center text-lg font-bold shadow-md border-2 gap-1 ${userType === "Hospital" ? "bg-purple-100 text-purple-700 border-purple-400 scale-105" : "bg-white text-purple-600 border-purple-200 hover:bg-purple-50"}`}
          aria-label="Hospital"
        >
          <svg className="w-7 h-7 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21V7a2 2 0 012-2h14a2 2 0 012 2v14M16 3v4M8 3v4M4 11h16" /></svg>
          Hospital
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        {userType === "Patient" && isSignup === false && (
          <LoginForm
            title="Patient Login"
            color="blue"
            submit={handlePatientLogin}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onSignUpClick={() => setIsSignup(true)}
            fullPage
          />
        )}

        {userType === "Patient" && isSignup && (
          <div className="w-full h-full flex items-center justify-center min-h-screen bg-gradient-to-br from-red-500 via-rose-400 to-pink-300">
            <motion.form
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              onSubmit={handlePatientSignup}
              className="w-full max-w-lg flex flex-col gap-6 px-6 py-12 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl"
              style={{ boxShadow: "0 8px 32px 0 rgba(255, 0, 0, 0.10)" }}
            >
              <h2 className="text-4xl font-extrabold text-blue-700 mb-1 tracking-tight text-left">Patient Registration</h2>
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Name</label>
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 focus:bg-white transition-all duration-300 text-black" />
              </div>
              {/* Age */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Age</label>
                <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 focus:bg-white transition-all duration-300 text-black" />
              </div>
              {/* Contact */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Contact</label>
                <input type="tel" placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} required className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 focus:bg-white transition-all duration-300 text-black" />
              </div>
              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 focus:bg-white transition-all duration-300 text-black" />
              </div>
              {/* Password */}
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-1">Set Password</label>
                <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => handlePasswordChange(e.target.value)} required className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 focus:bg-white transition-all duration-300 text-black" />
                <button type="button" className="absolute right-4 top-10" onClick={() => setShowPassword(!showPassword)}>
                  <img src={showPassword ? "/eye-open.png" : "/eye-closed.png"} alt="Toggle Password" className="w-6 h-6 opacity-70 cursor-pointer" />
                </button>
              </div>
              {/* Password rule indicators */}
              <div className="mt-2 text-sm text-gray-700 space-y-1">
                <p className={passwordChecks.length ? "text-green-600" : "text-red-500"}>{passwordChecks.length ? "✔" : "✘"} At least 8 characters</p>
                <p className={passwordChecks.upper ? "text-green-600" : "text-red-500"}>{passwordChecks.upper ? "✔" : "✘"} At least one uppercase letter</p>
                <p className={passwordChecks.lower ? "text-green-600" : "text-red-500"}>{passwordChecks.lower ? "✔" : "✘"} At least one lowercase letter</p>
                <p className={passwordChecks.number ? "text-green-600" : "text-red-500"}>{passwordChecks.number ? "✔" : "✘"} At least one number</p>
                <p className={passwordChecks.symbol ? "text-green-600" : "text-red-500"}>{passwordChecks.symbol ? "✔" : "✘"} At least one special character</p>
              </div>
              {/* Medical Condition */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Medical Condition</label>
                <input type="text" placeholder="Medical Condition (if any)" value={medicalCondition} onChange={(e) => setMedicalCondition(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 focus:bg-white transition-all duration-300 text-black" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-semibold py-3 rounded-xl transition-all text-lg tracking-wide shadow-md mt-4">Register</button>
            </motion.form>
          </div>
        )}

        {userType === "Donor" && isSignup === false && (
          <LoginForm
            title="Donor Login"
            color="green"
            submit={handleDonorLogin}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onSignUpClick={() => setIsSignup(true)}
            fullPage
          />
        )}

        {userType === "Donor" && isSignup && (
          <div className="w-full h-full flex items-center justify-center min-h-screen bg-gradient-to-br from-red-500 via-rose-400 to-pink-300">
            <motion.form
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              onSubmit={handleDonorSignup}
              className="w-full max-w-lg flex flex-col gap-6 px-6 py-12 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl"
              style={{ boxShadow: "0 8px 32px 0 rgba(255, 0, 0, 0.10)" }}
            >
              <h2 className="text-4xl font-extrabold text-green-700 mb-1 tracking-tight text-left">Donor Registration</h2>
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Name</label>
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 focus:bg-white transition-all duration-300 text-black" />
              </div>
              {/* Age */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Age</label>
                <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 focus:bg-white transition-all duration-300 text-black" />
              </div>
              {/* Contact */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Contact</label>
                <input type="tel" placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} required className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 focus:bg-white transition-all duration-300 text-black" />
              </div>
              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 focus:bg-white transition-all duration-300 text-black" />
              </div>
              {/* Password */}
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-1">Set Password</label>
                <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => handlePasswordChange(e.target.value)} required className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 focus:bg-white transition-all duration-300 text-black" />
                <button type="button" className="absolute right-4 top-10" onClick={() => setShowPassword(!showPassword)}>
                  <img src={showPassword ? "/eye-open.png" : "/eye-closed.png"} alt="Toggle Password" className="w-6 h-6 opacity-70 cursor-pointer" />
                </button>
              </div>
              {/* Password rule indicators */}
              <div className="mt-2 text-sm text-gray-700 space-y-1">
                <p className={passwordChecks.length ? "text-green-600" : "text-red-500"}>{passwordChecks.length ? "✔" : "✘"} At least 8 characters</p>
                <p className={passwordChecks.upper ? "text-green-600" : "text-red-500"}>{passwordChecks.upper ? "✔" : "✘"} At least one uppercase letter</p>
                <p className={passwordChecks.lower ? "text-green-600" : "text-red-500"}>{passwordChecks.lower ? "✔" : "✘"} At least one lowercase letter</p>
                <p className={passwordChecks.number ? "text-green-600" : "text-red-500"}>{passwordChecks.number ? "✔" : "✘"} At least one number</p>
                <p className={passwordChecks.symbol ? "text-green-600" : "text-red-500"}>{passwordChecks.symbol ? "✔" : "✘"} At least one special character</p>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-green-600 to-teal-400 hover:from-green-700 hover:to-teal-500 text-white font-semibold py-3 rounded-xl transition-all text-lg tracking-wide shadow-md mt-4">Register</button>
            </motion.form>
          </div>
        )}

        {userType === "Hospital" && isSignup === false && (
          <LoginForm
            title="Hospital Login"
            color="purple"
            submit={handleHospitalLogin}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onSignUpClick={() => setIsSignup(true)}
            fullPage
          />
        )}

        {userType === "Hospital" && isSignup && (
          <div className="w-full h-full flex items-center justify-center min-h-screen bg-gradient-to-br from-red-500 via-rose-400 to-pink-300">
            <motion.form
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              onSubmit={handleHospitalSignup}
              className="w-full max-w-lg flex flex-col gap-6 px-6 py-12 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl"
              style={{ boxShadow: "0 8px 32px 0 rgba(255, 0, 0, 0.10)" }}
            >
              <h2 className="text-4xl font-extrabold text-purple-700 mb-1 tracking-tight text-left">Hospital Registration</h2>
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Name</label>
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 focus:bg-white transition-all duration-300 text-black" />
              </div>
              {/* License */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">License Number</label>
                <input type="text" placeholder="License" value={license} onChange={(e) => setLicense(e.target.value)} required className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 focus:bg-white transition-all duration-300 text-black" />
              </div>
              {/* Contact */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Contact</label>
                <input type="tel" placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} required className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 focus:bg-white transition-all duration-300 text-black" />
              </div>
              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 focus:bg-white transition-all duration-300 text-black" />
              </div>
              {/* Password */}
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-1">Set Password</label>
                <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => handlePasswordChange(e.target.value)} required className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 focus:bg-white transition-all duration-300 text-black" />
                <button type="button" className="absolute right-4 top-10" onClick={() => setShowPassword(!showPassword)}>
                  <img src={showPassword ? "/eye-open.png" : "/eye-closed.png"} alt="Toggle Password" className="w-6 h-6 opacity-70 cursor-pointer" />
                </button>
              </div>
              {/* Password rule indicators */}
              <div className="mt-2 text-sm text-gray-700 space-y-1">
                <p className={passwordChecks.length ? "text-green-600" : "text-red-500"}>{passwordChecks.length ? "✔" : "✘"} At least 8 characters</p>
                <p className={passwordChecks.upper ? "text-green-600" : "text-red-500"}>{passwordChecks.upper ? "✔" : "✘"} At least one uppercase letter</p>
                <p className={passwordChecks.lower ? "text-green-600" : "text-red-500"}>{passwordChecks.lower ? "✔" : "✘"} At least one lowercase letter</p>
                <p className={passwordChecks.number ? "text-green-600" : "text-red-500"}>{passwordChecks.number ? "✔" : "✘"} At least one number</p>
                <p className={passwordChecks.symbol ? "text-green-600" : "text-red-500"}>{passwordChecks.symbol ? "✔" : "✘"} At least one special character</p>
              </div>
              {/* State */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">State</label>
                <select
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    fetchDistricts(e.target.value);
                  }}
                  required
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 focus:bg-white transition-all duration-300 text-black"
                >
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                </select>
              </div>
              {/* District */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 focus:bg-white transition-all duration-300 text-black"
                  disabled={!districts.length}
                >
                  <option value="">Select District</option>
                  {districts.map((district, index) => (
                    <option key={index} value={district.district}>{district.district}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-400 hover:from-purple-700 hover:to-indigo-500 text-white font-semibold py-3 rounded-xl transition-all text-lg tracking-wide shadow-md mt-4">Register</button>
            </motion.form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Auth;
