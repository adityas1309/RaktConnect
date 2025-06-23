import { useState, useEffect } from "react";
import { FaUser, FaTint, FaCalendarAlt, FaNotesMedical } from "react-icons/fa";
import BASE_URL from "../../apiConfig";
import PageMeta from "../common/PageMeta";
const DonorProfile = () => {
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${BASE_URL}/verify/donor`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        setDonor(data.user);
      } catch (error) {
        console.error("Error fetching donor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonorData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="w-full p-6 bg-white rounded-lg shadow-md animate-pulse">
          <div className="h-6 w-1/3 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-3">
            {Array(4)
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
    <>
     <PageMeta title="DonorProfile | RaktConnect" />
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="w-full mx-auto bg-white p-8 shadow-lg rounded-lg space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800 border-b-2 pb-4 mb-6">
          Donor Profile
        </h3>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <FaUser className="text-gray-600 text-xl" />
            <p className="text-lg text-gray-700">
              <strong>Name:</strong> {donor?.name}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <FaTint className="text-gray-600 text-xl" />
            <p className="text-lg text-gray-700">
              <strong>Blood Type:</strong> {donor?.bloodType?.toUpperCase()}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <FaCalendarAlt className="text-gray-600 text-xl" />
            <p className="text-lg text-gray-700">
              <strong>Last Donation:</strong>{" "}
              {donor?.lastDonationDate || "Never donated"}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <FaNotesMedical className="text-gray-600 text-xl" />
            <p className="text-lg text-gray-700">
              <strong>Total Donations:</strong> {donor?.totalDonations}
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default DonorProfile;