import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const Donations = () => {
  const navigate = useNavigate();
  const [donationHistory, setDonationHistory] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  const authToken = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    const fetchDonationHistory = async () => {
      if (userType !== "donor" || !authToken) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("https://raktconnect-backend.onrender.com/donor/history", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ authToken }),
        });

        const data = await response.json();
        if (data.success) {
          setDonationHistory(data.donations);
          setUpcomingAppointments(data.appointments);
        }
      } catch (error) {
        console.error("Error fetching donation history:", error);
      }
    };

    fetchDonationHistory();
  }, [userType, authToken, navigate]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
      <div className="bg-white p-8 shadow-lg rounded-lg mt-6 border border-gray-300 md:col-span-2">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
          Donation History
        </h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Volume</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {donationHistory.map((donation, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-4">{new Date(donation.date).toLocaleDateString()}</td>
                <td className="p-4">{donation.type}</td>
                <td className="p-4">{donation.volume}ml</td>
                <td className={`p-4 font-semibold flex items-center ${
                  donation.status === "completed" ? "text-green-600" : "text-gray-600"
                }`}>
                  {donation.status === "completed" ? (
                    <FaCheckCircle className="mr-2" />
                  ) : (
                    <FaClock className="mr-2" />
                  )}
                  {donation.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-8 shadow-lg rounded-lg mt-6 border border-gray-300">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
          Upcoming Appointments
        </h3>
        {upcomingAppointments.length === 0 ? (
          <div className="text-center text-gray-600">
            No upcoming appointments
          </div>
        ) : (
          <ul className="space-y-6">
            {upcomingAppointments.map((appointment, index) => (
              <li
                key={index}
                className="border p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="font-medium text-gray-800">
                    {new Date(appointment.date).toLocaleDateString()}
                  </p>
                  <p className="text-blue-600 font-semibold">
                    {appointment.location}
                  </p>
                </div>
                <p className="text-gray-700">
                  <strong>Type:</strong> {appointment.type}
                </p>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-3"
                  onClick={() => navigate(`/donor/appointment/${appointment.id}`)}
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Donations;