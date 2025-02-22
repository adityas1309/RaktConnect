import React, { useState, useEffect } from 'react';
import DonationHistory from './DonationHistory';
import HospitalMatchCard from './HospitalMatchCard';
import BloodTypeSelector from './BloodTypeSelector';
import { useNavigate } from 'react-router';

const DonorHome = () => {
  const [donorInfo, setDonorInfo] = useState(null);
  const [missingFields, setMissingFields] = useState([]);
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    medicalCondition: '',
    bloodType: '',
  });
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      const userType = localStorage.getItem("userType");
      const authToken = localStorage.getItem("authToken");

      if (userType !== "donor" || !authToken) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5555/donor/details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: authToken }),
        });
        
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch details");
        
        setDonorInfo(data);
        checkMissingFields(data);
      } catch (error) {
        console.error("Authentication error:", error);
        localStorage.clear();
        navigate("/login");
      }
    };

    authenticateUser();
  }, [navigate]);

  const checkMissingFields = (data) => {
    const requiredFields = ['state', 'district', 'medicalCondition', 'bloodType'];
    const missing = requiredFields.filter(field => !data[field]);
    setMissingFields(missing);
    setIsAuthenticating(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");
    
    try {
      const response = await fetch("http://localhost:5555/donor/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token: authToken }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Update failed");
      
      setDonorInfo(data);
      setMissingFields([]);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  if (isAuthenticating) {
    return <div className="text-center text-gray-600">Verifying authentication...</div>;
  }

  if (missingFields.length > 0) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold mb-8">Complete Your Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {missingFields.includes('state') && (
            <div>
              <label className="block text-sm font-medium">State</label>
              <input type="text" required className="w-full p-2 border" onChange={(e) => setFormData({...formData, state: e.target.value})} />
            </div>
          )}
          {missingFields.includes('district') && (
            <div>
              <label className="block text-sm font-medium">District</label>
              <input type="text" required className="w-full p-2 border" onChange={(e) => setFormData({...formData, district: e.target.value})} />
            </div>
          )}
          {missingFields.includes('medicalCondition') && (
            <div>
              <label className="block text-sm font-medium">Medical Condition</label>
              <input type="text" required className="w-full p-2 border" onChange={(e) => setFormData({...formData, medicalCondition: e.target.value})} />
            </div>
          )}
          {missingFields.includes('bloodType') && (
            <div>
              <label className="block text-sm font-medium">Blood Type</label>
              <BloodTypeSelector value={formData.bloodType} onChange={(e) => setFormData({...formData, bloodType: e.target.value})} />
            </div>
          )}
          <button type="submit" className="w-full bg-red-600 text-white py-2">Update Details</button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8">Donor Dashboard</h2>
      {/* Add the rest of your donor dashboard UI here */}
    </div>
  );
};

export default DonorHome;
