
import { useEffect, useState } from "react";

const checkDonorInfo = async (emailId) => {
  const response = await fetch("http://localhost:5555/donor/checkInfo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ emailId }),
  });
  return response.json();
};

const updateDonorInfo = async (donorData) => {
  const response = await fetch("http://localhost:5555/donor/updateInfo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(donorData),
  });
  return response.json();
};

const DonorDashboard = ({ emailId }) => {
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
      const result = await checkDonorInfo(emailId);
      if (result.missing) {
        setMissingInfo(true);
      } else {
        setDonor(result.donor);
      }
    };
    fetchDonorInfo();
  }, [emailId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDonorInfo({ emailId, ...formData });
    setMissingInfo(false);
    setDonor(formData);
  };

  return (
    <div>
      {missingInfo ? (
        <form onSubmit={handleSubmit}>
          <label>
            Blood Type:{" "}
            <input
              type="text"
              name="bloodType"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Donation Date:{" "}
            <input
              type="date"
              name="lastDonationDate"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            State:{" "}
            <input type="text" name="state" onChange={handleChange} required />
          </label>
          <label>
            District:{" "}
            <input
              type="text"
              name="district"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Medical Condition:{" "}
            <input
              type="text"
              name="medicalCondition"
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
