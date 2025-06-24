import { useEffect, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import BASE_URL from "../../apiConfig";
import PageMeta from "../common/PageMeta";
const checkDonorInfo = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) return { error: "No auth token found" };

  const response = await fetch(`${BASE_URL}/donor/checkInfo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  return response.json();
};

const updateDonorInfo = async (donorData) => {
  const token = localStorage.getItem("authToken");
  if (!token) return { error: "No auth token found" };

  const response = await fetch(`${BASE_URL}/donor/updateInfo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, ...donorData }),
  });

  return response.json();
};

const statesList = [
  { value: "35", label: "Andaman and Nicobar Islands" },
  { value: "28", label: "Andhra Pradesh" },
  { value: "12", label: "Arunachal Pradesh" },
  { value: "18", label: "Assam" },
  { value: "10", label: "Bihar" },
  { value: "94", label: "Chandigarh" },
  { value: "22", label: "Chhattisgarh" },
  { value: "25", label: "Dadra And Nagar Haveli And Daman And Diu" },
  { value: "97", label: "Delhi" },
  { value: "30", label: "Goa" },
  { value: "24", label: "Gujarat" },
  { value: "96", label: "Haryana" },
  { value: "92", label: "Himachal Pradesh" },
  { value: "91", label: "Jammu and Kashmir" },
  { value: "20", label: "Jharkhand" },
  { value: "29", label: "Karnataka" },
  { value: "32", label: "Kerala" },
  { value: "37", label: "Ladakh" },
  { value: "31", label: "Lakshadweep" },
  { value: "23", label: "Madhya Pradesh" },
  { value: "27", label: "Maharashtra" },
  { value: "14", label: "Manipur" },
  { value: "17", label: "Meghalaya" },
  { value: "15", label: "Mizoram" },
  { value: "13", label: "Nagaland" },
  { value: "21", label: "Odisha" },
  { value: "34", label: "Puducherry" },
  { value: "93", label: "Punjab" },
  { value: "98", label: "Rajasthan" },
  { value: "11", label: "Sikkim" },
  { value: "33", label: "Tamil Nadu" },
  { value: "36", label: "Telangana" },
  { value: "16", label: "Tripura" },
  { value: "95", label: "Uttarakhand" },
  { value: "99", label: "Uttar Pradesh" },
  { value: "19", label: "West Bengal" },
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
  const [bloodBanks, setBloodBanks] = useState([]);

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

        if (result.user.state) {
          getDistricts(result.user.state);
        }
      }
    };

    fetchDonorInfo();
  }, []);

  useEffect(() => {
    if (formData.district) {
      getBloodBanks();
    }
  }, [districts, formData.district]);

  const getDistricts = async (selectedState) => {
    if (!selectedState) return;

    const state = statesList.find((s) => s.label === selectedState);
    if (!state) return;

    const url = `https://eraktkosh.mohfw.gov.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETDISTRICTLIST&abfhttf=%5Cu0057%5Cu0031%5Cu0030%5Cu003d&selectedStateCode=${state.value}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Fetched Districts:", data);

      if (data.records && Array.isArray(data.records)) {
        setDistricts(
          data.records.map((record) => ({
            district: record.id,
            value: record.value,
          }))
        );
      } else {
        setDistricts([]);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
      setDistricts([]);
    }
  };

  const getBloodBanks = async () => {
    const state = statesList.find((s) => s.label === formData.state);
    const selectedDistrict = districts.find(
      (district) => district.district === formData.district
    );

    if (!state || !selectedDistrict) return;

    const url = `https://eraktkosh.mohfw.gov.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETNEARBYBLOODBANK&stateCode=${state.value}&districtCode=${selectedDistrict.value}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Fetched Blood Banks:", data);

      if (data.data && Array.isArray(data.data)) {
        const bloodBankList = data.data.map((entry) => ({
          id: entry[0],
          name: entry[1],
          address: entry[2],
          contact: entry[3],
          email: entry[4],
          type: entry[5],
          links: entry[6],
        }));
        setBloodBanks(bloodBankList);
      } else {
        setBloodBanks([]);
      }
    } catch (error) {
      console.error("Error fetching blood banks:", error.message);
      setBloodBanks([]);
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
    <>
    <PageMeta title="DonorDashboard | RaktConnect" />


    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full  bg-white shadow-lg rounded-lg p-6">
        {missingInfo ? (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
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
                  <option key={state.value} value={state.label}>
                    {state.label}
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
          <div className="min-h-screen bg-red-50 py-12 px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                <span className="text-red-600">Nearby</span> Blood Banks
              </h2>

              {bloodBanks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bloodBanks.map((bank, index) => (
                    (bank.contact || bank.email) ? (
                      <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden "
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold text-gray-900 truncate">
                            {bank.name || "Unnamed Blood Bank"}
                          </h3>
                          <div
                            className="w-2 h-2 rounded-full bg-green-500"
                            title="Open"
                          ></div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-start space-x-3 h-[13vh] overflow-scroll">
                            <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                            <p className="text-gray-600">
                              {bank.address || "No address available"}
                            </p>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-red-500 flex-shrink-0" />
                            {bank.email ? (
                              <a
                                href={`mailto:${bank.email}`}
                                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                              >
                                {bank.email}
                              </a>
                            ) : (
                              <span className="text-gray-500">
                                No email available
                              </span>
                            )}
                          </div>

                          <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-red-500 flex-shrink-0" />
                            <p className="text-gray-600">
                              {bank.contact || "No contact available"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="px-6 py-4 bg-gray-50 border-t">
                        <button className=" cursor-pointer w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium">
                          Book Appointment
                        </button>
                      </div>
                    </div>
                    ) : null
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <p className="text-gray-600 text-lg">
                    No blood banks found in your area
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
    
    </>
  );
};

export default DonorDashboard;
