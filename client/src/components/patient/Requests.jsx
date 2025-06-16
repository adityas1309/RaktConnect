import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
} from "react-icons/fa";
import BASE_URL from "../../apiConfig";
import { toast } from "react-toastify";

const Requests = () => {
  const navigate = useNavigate();
  const [requestHistory, setRequestHistory] = useState([]);
  const [activeRequests, setActiveRequests] = useState([]);

  const authToken = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    const fetchBloodHistory = async () => {
      if (userType !== "patient" || !authToken) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `${BASE_URL}/patient/requestHistory`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ authToken }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blood history");
        }

        const data = await response.json();
        console.log("Blood History:", data);

        if (data.success && Array.isArray(data.data)) {
          const newRequestHistory = [];
          const newActiveRequests = [];

          data.data.forEach((request) => {
            const formattedData = {
              _id: request._id, 
              bloodType: request.bloodType,
              units: request.units,
              urgency: request.urgencyLevel,
              requestDate: new Date(request.requestDate).toDateString(),
              status: request.status,
            };

            newRequestHistory.push(formattedData);

            if (request.status === "active") {
              newActiveRequests.push(formattedData);
            }
          });

          setRequestHistory(newRequestHistory);
          setActiveRequests(newActiveRequests);
        }
      } catch (error) {
        console.error("Error fetching blood history:", error.message);
      }
    };

    fetchBloodHistory();
  }, [userType, authToken, navigate]);

  const cancelRequest = async (requestId) => {
    try {
      const authToken = localStorage.getItem("authToken");

      const response = await fetch(`${BASE_URL}/patient/cancelRequest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authToken, requestId }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Request cancelled successfully");
        setActiveRequests((prev) =>
          prev.filter((req) => req._id !== requestId)
        );
        setRequestHistory((prev) =>
          prev.map((req) =>
            req._id === requestId ? { ...req, status: "cancelled" } : req
          )
        );
      } else {
        toast.error(result.message || "Failed to cancel request");
      }
    } catch (error) {
      toast.error("Failed to cancel request");
      console.error("Error cancelling request:", error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
      {/* Request History Section */}
      <div className="bg-white p-8 shadow-lg rounded-lg mt-6 border border-gray-300 md:col-span-2">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
          Blood Request History
        </h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Blood Type</th>
              <th className="p-4 text-left">Units</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {requestHistory.map((request, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-4">{request.requestDate}</td>
                <td className="p-4">{request.bloodType}</td>
                <td className="p-4">{request.units}</td>
                <td
                  className={`p-4 font-semibold flex items-center ${
                    request.status === "fulfilled"
                      ? "text-green-600"
                      : request.status === "active"
                      ? "text-yellow-500"
                      : request.status === "accepted"
                      ? "text-blue-600"
                      : "text-red-600"
                  }`}
                >
                  {request.status === "fulfilled" && (
                    <FaCheckCircle className="mr-2" />
                  )}
                  {request.status === "active" && (
                    <FaExclamationCircle className="mr-2" />
                  )}
                  {request.status === "rejected" && (
                    <FaTimesCircle className="mr-2" />
                  )}
                  {request.status === "cancelled" && (
                    <FaTimesCircle className="mr-2" />
                  )}
                  {request.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Active Requests Section */}
      <div className="bg-white p-8 shadow-lg rounded-lg mt-6 border border-gray-300">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
          Active Blood Requests
        </h3>
        {activeRequests.length === 0 ? (
          <div className="text-center text-gray-600">
            No active requests at the moment.
          </div>
        ) : (
          <ul className="space-y-6">
            {activeRequests.map((request, index) => (
              <li
                key={index}
                className="border p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="font-medium text-gray-800">
                    <strong>Blood Type:</strong> {request.bloodType}
                  </p>
                  <p
                    className={`font-semibold ${
                      request.urgency === "High"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {request.urgency}
                  </p>
                </div>
                <p className="text-gray-700">
                  <strong>Units Required:</strong> {request.units}
                </p>
                <p className="text-gray-700">
                  <strong>Requested For:</strong> {request.requestDate}
                </p>
                <button
                  onClick={() => cancelRequest(request._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition mt-3"
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Requests;
