import { useState, useEffect } from "react";
import {
  FaUser,
  FaHeartbeat,
  FaPhoneAlt,
  FaEnvelope,
  FaNotesMedical,
  FaAngleDoubleUp,
} from "react-icons/fa";

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        if (userType !== "patient" || !token) {
          localStorage.clear();
          navigate("/login");
          return;
        }
        const response = await fetch("https://raktconnect-backend.onrender.com/verify/patient", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch patient data");
        }

        const data = await response.json();
        console.log(data);
        setPatient(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="w-full p-6 bg-white rounded-lg shadow-md animate-pulse">
          <div className="h-6 w-1/3 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-3">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                  <div className="h-5 w-2/3 bg-gray-300 rounded"></div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      
      
      <div className="w-full mx-auto bg-white p-8 shadow-lg rounded-lg space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800 border-b-2 pb-4 mb-6">
          Personal Information
        </h3>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <FaUser className="text-gray-600 text-xl" />
            <p className="text-lg text-gray-700">
              <strong>Name:</strong> {patient?.name}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <FaAngleDoubleUp className="text-gray-600 text-xl" />
            <p className="text-lg text-gray-700">
              <strong>Age:</strong> {patient?.age}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <FaHeartbeat className="text-gray-600 text-xl" />
            <p className="text-lg text-gray-700">
              <strong>Blood Type:</strong> {patient?.bloodType?.toUpperCase()}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <FaPhoneAlt className="text-gray-600 text-xl" />
            <p className="text-lg text-gray-700">
              <strong>Contact:</strong> {patient?.phoneNumber}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-gray-600 text-xl" />
            <p className="text-lg text-gray-700">
              <strong>Email:</strong> {patient?.emailId}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <FaNotesMedical className="text-gray-600 text-xl" />
            <p className="text-lg text-gray-700">
              <strong>Medical Condition:</strong> {patient?.medicalCondition}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
