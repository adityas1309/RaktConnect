import { useEffect, useState } from "react";

const checkDonorInfo = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) return { error: "No auth token found" };

  const response = await fetch("http://localhost:5555/donor/checkInfo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token:token }),
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

const DonorDashboard = () => {
  const [donor, setDonor] = useState(null);
  const [missingInfo, setMissingInfo] = useState(false);
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
      }
    };
    fetchDonorInfo();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    <div>
      {missingInfo ? (
        <form onSubmit={handleSubmit}>
          <label>
            Blood Type:
            <input
              type="text"
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Donation Date:
            <input
              type="date"
              name="lastDonationDate"
              value={formData.lastDonationDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            State:
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            District:
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Medical Condition:
            <input
              type="text"
              name="medicalCondition"
              value={formData.medicalCondition}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h2>Welcome to Donor Dashboard</h2>
          <p>Blood Type: {donor?.bloodType}</p>
          <p>Last Donation Date: {donor?.lastDonationDate}</p>
          <p>
            Location: {donor?.state}, {donor?.district}
          </p>
          <p>Medical Condition: {donor?.medicalCondition || "None"}</p>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;
