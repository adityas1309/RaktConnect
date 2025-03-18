import { useState , useEffect } from "react";
import { useNavigate , Link } from "react-router";
import Swal from "sweetalert2";
import LoginForm from "./LoginForm";


function Auth() {
  const [userType, setUserType] = useState("Patient");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  // Add loading states
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    const loginData = {
      emailId: email, 
      password: password,
    };

    try {
      const response = await fetch("https://raktconnect-backend.onrender.com/login/patient", {
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
          localStorage.clear()
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("userType", data.userType);
        }

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have logged in successfully!",
        }).then(() => {
          navigate('/patient');
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
    } finally {
      setIsLoading(false);
    }
  };

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
      const response = await fetch("https://raktconnect-backend.onrender.com/signup/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed up successfully",
        }).then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 3000); // Reload after 3 seconds (same as the timer)
        });
      } else {
        console.error("Signup failed:", data.message);
        alert("Signup failed: " + data.message);
      }
    } catch (error) {
      console.error("Error during signup :", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleDonorLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const loginData = {
      emailId: email, 
      password: password,
    };

    try {
      const response = await fetch("https://raktconnect-backend.onrender.com/login/donor", {
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
          localStorage.clear()
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("userType", data.userType);
        }
        

       
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have logged in successfully!",
        }).then(() => {
          // Redirect user after login (Modify as needed)
          navigate('/donor');
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleDonorSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const donorData = {
      name: name,
      emailId: email,
      password: password,
      phoneNumber: contact,
      age: age,
    };

    try {
      const response = await fetch("https://raktconnect-backend.onrender.com/signup/donor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donorData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed up successfully",
        }).then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 3000); // Reload after 3 seconds (same as the timer)
        });
      } else {
        console.error("Signup failed:", data.message);
        alert("Signup failed: " + data.message);
      }
    } catch (error) {
      console.error("Error during signup :", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHospitalLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const loginData = {
      emailId: email, 
      password: password,
    };

    try {
      const response = await fetch("https://raktconnect-backend.onrender.com/login/hospital", {
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
          localStorage.clear()
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("userType", data.userType);
        }

       
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have logged in successfully!",
        }).then(() => {
          // Redirect user after login (Modify as needed)
          navigate('/hospital');
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleHospitalSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
      const response = await fetch("https://raktconnect-backend.onrender.com/signup/hospital", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hospitalData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed up successfully",
        }).then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 3000); // Reload after 3 seconds (same as the timer)
        });
      } else {
        console.error("Signup failed:", data.message);
        alert("Signup failed: " + data.message);
      }
    } catch (error) {
      console.error("Error during signup :", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Logo or App Name */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">RaktConnect</h1>
          <p className="text-gray-600">Connect with blood donors and save lives</p>
        </div>

        {/* User Type Selection */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={() => {
              setUserType("Patient");
              setIsSignup(false);
            }}
            className={`relative overflow-hidden w-full sm:w-40 px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300
              ${
                userType === "Patient"
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-200 shadow-lg transform hover:-translate-y-1"
                : "bg-white/80 backdrop-blur-sm text-blue-600 hover:bg-white/90"
              }`}
          >
            <span className="relative z-10">Patient</span>
          </button>

          <button
            onClick={() => {
              setUserType("Donor");
              setIsSignup(false);
            }}
            className={`relative overflow-hidden w-full sm:w-40 px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300
              ${
                userType === "Donor"
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-200 shadow-lg transform hover:-translate-y-1"
                : "bg-white/80 backdrop-blur-sm text-green-600 hover:bg-white/90"
              }`}
          >
            <span className="relative z-10">Donor</span>
          </button>

          <button
            onClick={() => {
              setUserType("Hospital");
              setIsSignup(false);
            }}
            className={`relative overflow-hidden w-full sm:w-40 px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300
              ${
                userType === "Hospital"
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-purple-200 shadow-lg transform hover:-translate-y-1"
                : "bg-white/80 backdrop-blur-sm text-purple-600 hover:bg-white/90"
              }`}
          >
            <span className="relative z-10">Hospital</span>
          </button>
        </div>

        {/* Main Content Container */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side */}
            <div className="w-full lg:w-1/2 p-8">
              {userType === "Patient" && !isSignup && (
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
                  isLoading={isLoading}
                />
              )}

              {userType === "Patient" && isSignup && (
                <div className="h-full flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-blue-800 mb-4">
                      Already have an account?
                    </h2>
                    <p className="text-blue-600 mb-8">
                      Login to your account to manage your blood donation requests
                      and appointments.
                    </p>
                    <button
                      onClick={() => setIsSignup(false)}
                      className="bg-white/90 backdrop-blur-sm text-blue-600 font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      Login Now
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
                  isLoading={isLoading}
                />
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
                  isLoading={isLoading}
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

            {/* Right Side */}
            <div className="w-full lg:w-1/2 p-8 bg-gradient-to-br from-gray-50/50 to-gray-100/50">
              {userType === "Patient" && !isSignup && (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center max-w-md">
                    <div className="mb-6">
                      <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        New to RaktConnect?
                      </h2>
                      <p className="text-gray-600 mb-8">
                        Join our community to access blood donation services and connect with donors quickly.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setUserType("Patient");
                        setIsSignup(true);
                      }}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              )}

              {userType === "Patient" && isSignup && (
                <div className="overflow-y-auto max-h-[80vh]">
                  <form
                    onSubmit={handlePatientSignup}
                    className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg max-w-md mx-auto"
                  >
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                      Create Patient Account
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full p-3 bg-white/90 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Age
                          </label>
                          <input
                            type="number"
                            placeholder="Your age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                            className="w-full p-3 bg-white/90 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium mb-2">
                            Contact
                          </label>
                          <input
                            type="tel"
                            placeholder="Phone number"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                            className="w-full p-3 bg-white/90 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full p-3 bg-white/90 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        />
                      </div>

                      <div className="relative">
                        <label className="block text-gray-700 font-medium mb-2">
                          Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full p-3 bg-white/90 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-[38px]"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <img
                            src={showPassword ? "/eye-open.png" : "/eye-closed.png"}
                            alt="Toggle Password"
                            className="w-6 h-6 opacity-50 hover:opacity-75 transition-opacity"
                          />
                        </button>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Medical Condition (if any)
                        </label>
                        <textarea
                          placeholder="Describe any medical conditions"
                          value={medicalCondition}
                          onChange={(e) => setMedicalCondition(e.target.value)}
                          className="w-full p-3 bg-white/90 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 h-24 resize-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full mt-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        "Create Account"
                      )}
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

                    <div className="mb-6 relative">
                      <label className="block text-gray-700 font-medium">
                        Set Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
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
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg cursor-pointer flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Registering...</span>
                        </>
                      ) : (
                        "Register"
                      )}
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

                    <div className="mb-6 relative">
                      <label className="block text-gray-700 font-medium">
                        Set Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
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
                    </div>

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

                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium">
                        District
                      </label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        required
                        className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        disabled={!districts.length}
                      >
                        <option value="">Select District</option>
                        {districts.map((district, index) => (
                          <option key={index} value={district.district}>
                            {district.district}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg cursor-pointer flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Registering...</span>
                        </>
                      ) : (
                        "Register"
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;