import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import Swal from "sweetalert2";
import LoginForm from "./LoginForm";
import BASE_URL from "../../apiConfig";
import { toast } from "react-toastify";
import PageMeta from "../common/PageMeta";
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
    <>
    <PageMeta title="RaktConnect" />
    <div className="w-[100%] h-fit min-h-screen flex justify-evenly items-center flex-col justify-self-center bg-calm/10">
      <div className="flex flex-row items-center justify-evenly h-fit gap-2.5">
        <button
          onClick={() => {
            setUserType("Patient");
            setIsSignup(false);
          }}
          className={`font-semibold rounded-lg cursor-pointer text-xl py-3 px-6 transition-all
            ${
              userType === "Patient"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border-2 border-blue-500 hover:bg-blue-100"
            }`}
        >
          Patient
        </button>

        <button
          onClick={() => {
            setUserType("Donor");
            setIsSignup(false);
          }}
          className={`font-semibold rounded-lg cursor-pointer text-xl py-3 px-6 transition-all
            ${
              userType === "Donor"
                ? "bg-green-600 text-white"
                : "bg-white text-green-600 border-2 border-green-500 hover:bg-green-100"
            }`}
        >
          Donor
        </button>

        <button
          onClick={() => {
            setUserType("Hospital");
            setIsSignup(false);
          }}
          className={`font-semibold rounded-lg cursor-pointer text-xl py-3 px-6 transition-all
            ${
              userType === "Hospital"
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600 border-2 border-purple-500 hover:bg-purple-100"
            }`}
        >
          Hospital
        </button>
      </div>

      <div className="w-[80vw] flex flex-col justify-center items-center border-2 my-[50px] border-black lg:h-[80vh] rounded-lg lg:flex-row lg:my-0">
        <div className="w-full h-full flex flex-col">
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
            />
          )}

          {userType === "Patient" && isSignup && (
            <div className="bg-calm/50 flex items-center justify-center h-full">
              <div className="bg-blue-100 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold text-blue-700 mb-4">
                  Already have an account?
                </h2>
                <p className="text-blue-700 mb-6">
                  Login to your account to manage your blood donation requests
                  and appointments.
                </p>
                <button
                  onClick={() => setIsSignup(false)}
                  className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-full w-full shadow-md hover:bg-gray-100 cursor-pointer"
                >
                  Login
                </button>
              </div>
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
            />
          )}

          {userType === "Donor" && isSignup && (
            <div className="bg-green-900/50 flex items-center justify-center h-full">
              <div className="bg-green-100 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold text-green-700 mb-4">
                  Already have an account?
                </h2>
                <p className="text-green-700 mb-6">
                  Login to your account to manage your blood donation requests
                  and appointments.
                </p>
                <button
                  onClick={() => setIsSignup(false)}
                  className="bg-white text-green-600 font-semibold py-2 px-4 rounded-full w-full shadow-md hover:bg-gray-100 cursor-pointer"
                >
                  Login
                </button>
              </div>
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
            />
          )}

          {userType === "Hospital" && isSignup && (
            <div className="bg-purple-900/50 flex items-center justify-center h-full">
              <div className="bg-purple-100 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold text-purple-700 mb-4">
                  Already have an account?
                </h2>
                <p className="text-purple-700 mb-6">
                  Login to your account to access blood donation management
                  tools.
                </p>
                <button
                  onClick={() => setIsSignup(false)}
                  className="bg-white text-purple-600 font-semibold py-2 px-4 rounded-full w-full shadow-md hover:bg-gray-100 cursor-pointer"
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-full h-full flex flex-col">
          {userType === "Patient" && isSignup === false && (
            <div className="bg-calm/50 flex items-center justify-center h-full">
              <div className="bg-blue-100 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold text-blue-700 mb-4">
                  New Patient?
                </h2>
                <p className="text-blue-700 mb-6">
                  Sign up now to access our blood donation services and find
                  donors quickly.
                </p>
                <button
                  onClick={() => {
                    setUserType("Patient");
                    setIsSignup(true);
                  }}
                  className="bg-white text-blue-700 font-semibold py-2 px-4 rounded-full w-full hover:bg-gray-100 cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}

          {userType === "Patient" && isSignup && (
            <div className="flex justify-center bg-calm/5 h-full overflow-y-scroll">
              <form
                onSubmit={handlePatientSignup}
                className="bg-white p-8 rounded-lg shadow-md w-[400px] h-fit"
              >
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                  Patient Registration
                </h2>

                {/* Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Age */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Age</label>
                  <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Contact */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">
                    Contact
                  </label>
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Password */}
                <div className="mb-6 relative">
                  <label className="block text-gray-700 font-medium">Set Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    required
                    className={`w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      Object.values(passwordChecks).every((v) => v)
                        ? "focus:ring-green-400"
                        : "focus:ring-purple-400"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img
                      src={showPassword ? "/eye-open.png" : "/eye-closed.png"}
                      alt="Toggle Password"
                      className="w-6 h-6 invert-50 cursor-pointer"
                    />
                  </button>

                  {/* Password rule indicators */}
                  <div className="mt-2 text-sm text-gray-700 space-y-1">
                    <p className={passwordChecks.length ? "text-green-600" : "text-red-500"}>
                      {passwordChecks.length ? "✔" : "✘"} At least 8 characters
                    </p>
                    <p className={passwordChecks.upper ? "text-green-600" : "text-red-500"}>
                      {passwordChecks.upper ? "✔" : "✘"} At least one uppercase letter
                    </p>
                    <p className={passwordChecks.lower ? "text-green-600" : "text-red-500"}>
                      {passwordChecks.lower ? "✔" : "✘"} At least one lowercase letter
                    </p>
                    <p className={passwordChecks.number ? "text-green-600" : "text-red-500"}>
                      {passwordChecks.number ? "✔" : "✘"} At least one number
                    </p>
                    <p className={passwordChecks.symbol ? "text-green-600" : "text-red-500"}>
                      {passwordChecks.symbol ? "✔" : "✘"} At least one special character
                    </p>
                  </div>
                </div>


                {/* Medical Condition */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">
                    Medical Condition
                  </label>
                  <input
                    type="text"
                    placeholder="Medical Condition (if any)"
                    value={medicalCondition}
                    onChange={(e) => setMedicalCondition(e.target.value)}
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg cursor-pointer"
                >
                  Register
                </button>
              </form>
            </div>
          )}

          {userType === "Donor" && isSignup === false && (
            <div className="bg-green-900/50 flex items-center justify-center h-full">
              <div className="bg-green-100 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold text-green-700 mb-4">
                  New Donor?
                </h2>
                <p className="text-green-700 mb-6">
                  Sign up now to start saving lives through blood donation.
                </p>
                <button
                  onClick={() => {
                    setUserType("Donor");
                    setIsSignup(true);
                  }}
                  className="bg-white text-green-700 font-semibold py-2 px-4 rounded-full w-full hover:bg-gray-100 cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}

          {userType === "Donor" && isSignup && (
            <div className="flex justify-center bg-green-900/5 h-full overflow-y-scroll">
              <form
                onSubmit={handleDonorSignup}
                className="bg-white p-8 rounded-lg shadow-md w-[400px] h-fit"
              >
                <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
                  Donor Registration
                </h2>

                {/* Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                {/* Age */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Age</label>
                  <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                {/* Contact */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">
                    Contact
                  </label>
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>

                {/* Password */}
                <div className="mb-6 relative">
                  <label className="block text-gray-700 font-medium">Set Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    required
                    className={`w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      Object.values(passwordChecks).every((v) => v)
                        ? "focus:ring-green-400"
                        : "focus:ring-purple-400"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img
                      src={showPassword ? "/eye-open.png" : "/eye-closed.png"}
                      alt="Toggle Password"
                      className="w-6 h-6 invert-50 cursor-pointer"
                    />
                  </button>

                  {/* Password rule indicators */}
                  <div className="mt-2 text-sm text-gray-700 space-y-1">
                    <p className={passwordChecks.length ? "text-green-600" : "text-red-500"}>
                      {passwordChecks.length ? "✔" : "✘"} At least 8 characters
                    </p>
                    <p className={passwordChecks.upper ? "text-green-600" : "text-red-500"}>
                      {passwordChecks.upper ? "✔" : "✘"} At least one uppercase letter
                    </p>
                    <p className={passwordChecks.lower ? "text-green-600" : "text-red-500"}>
                      {passwordChecks.lower ? "✔" : "✘"} At least one lowercase letter
                    </p>
                    <p className={passwordChecks.number ? "text-green-600" : "text-red-500"}>
                      {passwordChecks.number ? "✔" : "✘"} At least one number
                    </p>
                    <p className={passwordChecks.symbol ? "text-green-600" : "text-red-500"}>
                      {passwordChecks.symbol ? "✔" : "✘"} At least one special character
                    </p>
                  </div>
                </div>


                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg cursor-pointer"
                >
                  Register
                </button>
              </form>
            </div>
          )}

          {userType === "Hospital" && isSignup === false && (
            <div className="bg-purple-900/50 flex items-center justify-center h-full">
              <div className="bg-purple-100 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold text-purple-700 mb-4">
                  New Hospital ?
                </h2>
                <p className="text-purple-700 mb-6">
                  Sign up now to manage blood donations and requests
                  efficiently.
                </p>
                <button
                  onClick={() => {
                    setUserType("Hospital");
                    setIsSignup(true);
                  }}
                  className="bg-white text-purple-700 font-semibold py-2 px-4 rounded-full w-full hover:bg-gray-100 cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}

          {userType === "Hospital" && isSignup && (
            <div className="flex justify-center bg-purple-800/5 h-full overflow-y-scroll ">
              <form
                onSubmit={handleHospitalSignup}
                className="bg-white p-8 rounded-lg shadow-md h-fit w-full"
              >
                <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
                  Hospital Registration
                </h2>

                {/* Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                {/* License */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">
                    License Number
                  </label>
                  <input
                    type="text"
                    placeholder="License"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                    required
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                {/* Contact */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">
                    Contact
                  </label>
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                {/* Password */}
                <div className="mb-6 relative">
                  <label className="block text-gray-700 font-medium">Set Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    required
                    className={`w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      Object.values(passwordChecks).every((v) => v)
                        ? "focus:ring-green-400"
                        : "focus:ring-purple-400"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img
                      src={showPassword ? "/eye-open.png" : "/eye-closed.png"}
                      alt="Toggle Password"
                      className="w-6 h-6 invert-50 cursor-pointer"
                    />
                  </button>

                  {/* Password rule indicators */}
                  <div className="mt-2 text-sm text-gray-700 space-y-1">
                    <p className={passwordChecks.length ? "text-green-600" : "text-red-500"}>
                      {passwordChecks.length ? "✔" : "✘"} At least 8 characters
                    </p>
                    <p className={passwordChecks.upper ? "text-green-600" : "text-red-500"}>
                      {passwordChecks.upper ? "✔" : "✘"} At least one uppercase letter
                    </p>
                    <p className={passwordChecks.lower ? "text-green-600" : "text-red-500"}>
                      {passwordChecks.lower ? "✔" : "✘"} At least one lowercase letter
                    </p>
                    <p className={passwordChecks.number ? "text-green-600" : "text-red-500"}>
                      {passwordChecks.number ? "✔" : "✘"} At least one number
                    </p>
                    <p className={passwordChecks.symbol ? "text-green-600" : "text-red-500"}>
                      {passwordChecks.symbol ? "✔" : "✘"} At least one special character
                    </p>
                  </div>
                </div>


                {/* State */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">
                    State
                  </label>
                  <select
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      fetchDistricts(e.target.value);
                    }}
                    required
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
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
                    <option value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli and Daman and Diu">
                      Dadra and Nagar Haveli and Daman and Diu
                    </option>
                    <option value="Delhi">Delhi</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
                  </select>
                </div>

                {/* District */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">
                    District
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                    className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    disabled={!districts.length} // Disable if no districts are available
                  >
                    <option value="">Select District</option>
                    {districts.map((district, index) => (
                      <option key={index} value={district.district}>
                        {district.district}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg cursor-pointer"
                >
                  Register
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default Auth;
