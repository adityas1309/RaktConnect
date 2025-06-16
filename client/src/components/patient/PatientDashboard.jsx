import React, { useState, useEffect } from "react";
import { useNavigate , Link} from "react-router";
import BASE_URL from "../../apiConfig";
import { toast } from "react-toastify";



const PatientDashboard = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [requestData, setRequestData] = useState({
    units: "",
    urgency: "low",
    date: "",
    note: "",
  });
  const [districts, setDistricts] = useState([]);

  const [selectedHospital, setSelectedHospital] = useState(null);

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

  const fetchHospitals = async () => {
    if (!state || !district || !bloodType) {
      toast.warn("Please select state, district, and blood type");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${BASE_URL}/api/getHospitals?district=${encodeURIComponent(
          district
        )}&bloodType=${encodeURIComponent(bloodType)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch hospital data");
      }

      const data = await response.json();
      setHospitals(data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      setError("Error fetching hospital data. Please try again later.");
      setHospitals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestBlood = (hospital) => {
    setSelectedHospital(hospital);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRequestData({ units: "", urgency: "", date: "", note: "" });
  };

  const isFormValid =
    requestData.units && requestData.urgency && requestData.date;

  const handleSubmitRequest = async () => {
    if (!isFormValid) return;

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setNotification("User not authenticated!");
      return;
    }

    if (!selectedHospital) {
      setNotification("Please select a hospital.");
      return;
    }

    const requestBody = {
      hospitalId: selectedHospital._id,
      units: requestData.units,
      bloodType: bloodType,
      urgencyLevel: requestData.urgency,
      requestDate: requestData.date,
      note: requestData.note,
      token:authToken,
    };

    try {
      const response = await fetch(`${BASE_URL}/patient/bloodRequests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody, authToken),
      });

      if (response.ok) {
        handleCloseModal();
        setNotification("Blood request sent successfully!");
        setTimeout(() => setNotification(""), 3000);
      } else {
        setNotification("Failed to send request. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification("An error occurred. Please try again.");
    }
  };

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      const userType = localStorage.getItem("userType");
      const authToken = localStorage.getItem("authToken");

      if (userType !== "patient" || !authToken) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/verify/patient`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: authToken }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Authentication failed");
        }

        setIsAuthenticating(false);
      } catch (error) {
        console.error("Authentication error:", error);
        localStorage.clear();
        navigate("/login");
      }
    };

    authenticateUser();
  }, [navigate]);

  if (isAuthenticating) {
    return (
      <div className="text-center text-gray-600">
        Verifying authentication...
      </div>
    );
  }

  return (
    <div className="p-8 mx-auto bg-white rounded-lg border border-gray-200 relative">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">
        Patient Dashboard
      </h2>
      <div className="md:grid  md:grid-cols-2 lg:grid-cols-3 gap-6 block">
        <div className="flex flex-col md:flex-row md:space-x-6 w-full col-start-1 col-end-3 gap-2 md:gap-0">
          {/* State Selection */}
          <div className="md:w-1/3">
            <label className="block text-gray-700 font-medium">State</label>
            <select
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                fetchDistricts(e.target.value);
              }}
              required
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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

          {/* District Selection */}
          <div className="md:w-1/3">
            <label className="block text-gray-700 font-medium">District</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select District</option>
              {districts.map((district, index) => (
                <option key={index} value={district.district}>
                  {district.district}
                </option>
              ))}
            </select>
          </div>

          {/* Blood Type Selection */}
          <div className="md:w-1/3">
            <label className="block font-semibold text-gray-700">
              Select Blood Type:
            </label>
            <select
              className="border border-gray-300 p-3 w-full mt-1 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
            >
              <option value="">Select Blood Type</option>
              <option value="A_positive">A+</option>
              <option value="A_negative">A-</option>
              <option value="B_positive">B+</option>
              <option value="B_negative">B-</option>
              <option value="AB_positive">AB+</option>
              <option value="AB_negative">AB-</option>
              <option value="O_positive">O+</option>
              <option value="O_negative">O-</option>
            </select>
          </div>
        </div>

        <button
          className="mt-6 p-2.5 md:px-6 md:w-fit w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          onClick={fetchHospitals}
        >
          Search Hospitals
        </button>
      </div>

      {loading && <p className="mt-6 text-gray-600 text-center">Loading...</p>}
      {error && <p className="mt-6 text-red-500 text-center">{error}</p>}

      {hospitals.length > 0 && (
        <div className="mt-8">
          <h3 className="text-3xl font-semibold mb-4 text-gray-800 text-center">
            Available Hospitals
          </h3>
          <ul className="grid grid-cols-3 gap-6">
            {hospitals.map((hospital) => (
              <li
                key={hospital.id}
                className="border border-gray-300 p-6 rounded-lg shadow-md bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <p className="font-bold text-2xl text-gray-800">
                    {hospital.name}
                  </p>
                  <p className="text-gray-600">{hospital.address}</p>
                  <p className="text-gray-600">Phone: {hospital.phoneNumber}</p>

                  {/* Blood Inventory Section */}
                  <p className="text-gray-800 font-semibold mt-2">
                    Available Blood Inventory:
                  </p>
                  <ul className=" text-gray-600">
                    {hospital.bloodInventory &&
                      Object.entries(hospital.bloodInventory)
                        .filter(([type]) => type === bloodType)
                        .map(
                          ([bloodType, units]) =>
                            units > 0 && (
                              <li key={bloodType} className="mt-1">
                                <span className="font-semibold">
                                  {bloodType
                                    .replace("_positive", "+")
                                    .replace("_negative", "-")}
                                </span>
                                : {units} units
                              </li>
                            )
                        )}
                  </ul>
                </div>

                <button
                  className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition cursor-pointer"
                  onClick={() => handleRequestBlood(hospital)}
                >
                  Request Blood
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-lg bg-black/15 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[450px] shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Request Blood</h2>

            <label className="block text-gray-700">Units Required:</label>
            <input
              type="number"
              className="border border-gray-300 p-2 w-full rounded-lg mb-3"
              value={requestData.units}
              onChange={(e) =>
                setRequestData({ ...requestData, units: e.target.value })
              }
            />

            <label className="block text-gray-700">Urgency Level:</label>
            <select
              className="border border-gray-300 p-2 w-full rounded-lg mb-3"
              value={requestData.urgency}
              onChange={(e) =>
                setRequestData({ ...requestData, urgency: e.target.value })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <label className="block text-gray-700">Request Date:</label>
            <input
              type="date"
              className="border border-gray-300 p-2 w-full rounded-lg mb-3"
              value={requestData.date}
              min={new Date().toISOString().split("T")[0]} // Set min date to today
              onChange={(e) =>
                setRequestData({ ...requestData, date: e.target.value })
              }
            />

            <label className="block text-gray-700">Note:</label>
            <textarea
              className="border border-gray-300 p-2 w-full rounded-lg mb-3 h-24 resize-none"
              value={requestData.note}
              onChange={(e) =>
                setRequestData({ ...requestData, note: e.target.value })
              }
            ></textarea>

            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer transition hover:bg-red-600"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-white transition ${
                  isFormValid
                    ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={handleSubmitRequest}
                disabled={!isFormValid}
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      {notification && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-center absolute z-10 top-0 right-3">
          {notification}
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
