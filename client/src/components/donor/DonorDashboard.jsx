import { useEffect, useState } from "react";

const checkDonorInfo = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) return { error: "No auth token found" };

  const response = await fetch("http://localhost:5555/donor/checkInfo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  return response.json();
};

const updateDonorInfo = async (donorData) => {
  const token = localStorage.getItem("authToken");
  if (!token) return { error: "No auth token found" };

  const response = await fetch("http://localhost:5555/donor/updateInfo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, ...donorData }),
  });

  return response.json();
};

const statesList = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const DonorDashboard = () => {
  const [donor, setDonor] = useState(null);
  const [missingInfo, setMissingInfo] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [formData, setFormData] = useState({
    bloodType: "",
    lastDonationDate: "",
    state: "",
    district: "",
    medicalCondition: "",
  });

  useEffect(() => {
    const fetchDonorInfo = async () => {
      const result = await checkDonorInfo();
      if (result.error) {
        console.error(result.error);
        return;
      }

      if (result.missing) {
        setMissingInfo(true);
      } else {
        setDonor(result.user);
        setFormData({
          bloodType: result.user.bloodType || "",
          lastDonationDate: result.user.lastDonationDate || "",
          state: result.user.state || "",
          district: result.user.district || "",
          medicalCondition: result.user.medicalCondition || "",
        });

        if (result.user.state) getDistricts(result.user.state);
      }
    };

    fetchDonorInfo();
  }, []);

  const getDistricts = async (selectedState) => {
    if (!selectedState) return;

    const url = `https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/district?page=1&state=${encodeURIComponent(
      selectedState
    )}&limit=100`;

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
      console.log("Fetched Districts:", data);

      if (Array.isArray(data)) {
        setDistricts(data);
      } else if (data.districts) {
        setDistricts(data.districts);
      } else {
        setDistricts([]);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
      setDistricts([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "state") {
      getDistricts(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateDonorInfo(formData);
    if (result.success) {
      setMissingInfo(false);
      setDonor(formData);
    } else {
      console.error("Failed to update donor info");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {missingInfo ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-gray-700">
              Complete Your Profile
            </h2>

            <label className="block">
              <span className="text-gray-600">Blood Type:</span>
              <select
                name="bloodType"
                className="mt-1 block w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                value={formData.bloodType}
                onChange={handleChange}
                required
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
            </label>

            <label className="block">
              <span className="text-gray-600">Last Donation Date:</span>
              <input
                type="date"
                name="lastDonationDate"
                value={formData.lastDonationDate}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                required
                className="mt-1 block w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">State:</span>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              >
                <option value="">Select State</option>
                {statesList.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-gray-600">District:</span>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              >
                <option value="">Select District</option>
                {districts.length > 0 ? (
                  districts.map((districtObj, index) => (
                    <option key={index} value={districtObj.district}>
                      {districtObj.district}
                    </option>
                  ))
                ) : (
                  <option value="">No districts found</option>
                )}
              </select>
            </label>

            <label className="block">
              <span className="text-gray-600">Medical Condition:</span>
              <input
                type="text"
                name="medicalCondition"
                value={formData.medicalCondition}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </label>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              Welcome to Donor Dashboard
            </h2>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg shadow">
              <p className="text-gray-700">
                <strong>Blood Type:</strong> {donor?.bloodType}
              </p>
              <p className="text-gray-700">
                <strong>Last Donation Date:</strong> {donor?.lastDonationDate}
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> {donor?.state}, {donor?.district}
              </p>
              <p className="text-gray-700">
                <strong>Medical Condition:</strong>{" "}
                {donor?.medicalCondition || "None"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;
