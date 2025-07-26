
import { useClerk } from "@clerk/clerk-react";
import { useEffect } from "react";
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


const Auth = () => {
  const { redirectToSignUp } = useClerk();

  const handleLogin = (role) => {
    const lowercaseRole = role.toLowerCase();
    localStorage.setItem("selectedUserType", lowercaseRole);
    redirectToSignUp({
      redirectUrl: `/complete-profile?role=${lowercaseRole}`,
    });
  };

  useEffect(() => {
    document.title = "Login / Sign Up - RaktConnect";
  }, []);

  const roles = [
    { label: "🧍 Patient", value: "patient", color: "blue" },
    { label: "🩸 Donor", value: "donor", color: "green" },
    { label: "🏥 Hospital", value: "hospital", color: "purple" },
  ];

  return (

    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-red-50 to-blue-50 px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          Welcome to RaktConnect
        </h2>
        <p className="text-lg text-gray-600">
          Please select your role to continue
        </p>
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

      <div className="grid sm:grid-cols-3 gap-8 w-full max-w-4xl">
        {roles.map((role) => (
          <div
            key={role.value}
            className={`cursor-pointer rounded-xl p-6 shadow-lg border border-gray-200 bg-white hover:scale-105 transition-transform duration-300 hover:shadow-xl hover:border-${role.color}-500`}
            onClick={() => handleLogin(role.value)}>
            <div
              className={`text-5xl mb-4 text-${role.color}-600 flex justify-center`}>
              {role.label.split(" ")[0]}
            </div>
            <h3 className="text-center text-xl font-semibold text-gray-800">
              {role.label.split(" ")[1]}
            </h3>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Auth;
