import React, { useState } from "react";
import PageMeta from "../common/PageMeta";
const EligibilityChecker = () => {
  const [formData, setFormData] = useState({
    weight: "",
    lastDonation: "",
    recentTravel: "",
    medications: "",
    healthCondition: "",
  });

  const [eligibility, setEligibility] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/check-eligibility", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setEligibility(data);
    } catch (error) {
      console.error("Error checking eligibility:", error);
    }
  };

  return (
    <>
     <PageMeta title="EligibilityChecker | RaktConnect" />
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Donor Eligibility Checker
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Weight (kg):</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-gray-700">Last Donation (days ago):</label>
            <input
              type="number"
              name="lastDonation"
              value={formData.lastDonation}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-gray-700">Recent International Travel (days ago):</label>
            <input
              type="number"
              name="recentTravel"
              value={formData.recentTravel}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-gray-700">Current Medications:</label>
            <input
              type="text"
              name="medications"
              value={formData.medications}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-gray-700">Health Conditions:</label>
            <select
              name="healthCondition"
              value={formData.healthCondition}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="">Select Health Condition</option>
              <option value="none">None</option>
              <option value="hypertension">Hypertension</option>
              <option value="diabetes">Diabetes</option>
              <option value="anemia">Anemia</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Check Eligibility
          </button>
        </form>
        {eligibility && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Eligibility Result</h2>
            <p className={`text-lg font-semibold ${eligibility.isEligible ? 'text-green-600' : 'text-red-600'}`}>
              {eligibility.isEligible ? "Eligible to Donate" : "Not Eligible to Donate"}
            </p>
            <p className="text-gray-700 mt-2">{eligibility.message}</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default EligibilityChecker;