import React, { useState, useEffect } from 'react';
import DonationHistory from './DonationHistory';
import HospitalMatchCard from './HospitalMatchCard';
import BloodTypeSelector from './BloodTypeSelector';
import { useNavigate } from 'react-router';

const DonorHome = () => {
  const [donorInfo, setDonorInfo] = useState({
    registered: false,
    bloodGroup: '',
    lastDonation: null,
    contact: '',
    medicalHistory: ''
  });

  const [hospitalMatches, setHospitalMatches] = useState([]);
  const [showRegistration, setShowRegistration] = useState(true);
  const [regionalDemand, setRegionalDemand] = useState({});

  // Mock regional demand data
  useEffect(() => {
    // This would typically come from an API
    const mockDemand = {
      'O+': { demand: 'High', needed: 45 },
      'A+': { demand: 'Medium', needed: 25 },
      'B+': { demand: 'Low', needed: 15 },
      'AB+': { demand: 'Critical', needed: 5 }
    };
    setRegionalDemand(mockDemand);
  }, []);

  // Calculate next eligible donation date
  const calculateNextDonation = () => {
    if (!donorInfo.lastDonation) return null;
    const lastDate = new Date(donorInfo.lastDonation);
    const nextDate = new Date(lastDate.setMonth(lastDate.getMonth() + 3));
    return nextDate.toISOString().split('T')[0];
  };

  // Handle donor registration
  const handleRegistration = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const donorData = {
      registered: true,
      bloodGroup: formData.get('bloodGroup'),
      lastDonation: formData.get('lastDonation'),
      contact: formData.get('contact'),
      medicalHistory: formData.get('medicalHistory')
    };
    setDonorInfo(donorData);
    setShowRegistration(false);
  };

  // Get AI recommendations
  const getAIRecommendation = () => {
    if (!donorInfo.bloodGroup) return 'Complete registration for personalized recommendations';
    
    const nextDate = calculateNextDonation();
    const demandStatus = regionalDemand[donorInfo.bloodGroup]?.demand || 'Medium';
    
    return {
      nextDonation: nextDate,
      recommendation: `High regional demand (${demandStatus}) - Your donation is particularly needed now!`,
      urgency: demandStatus === 'Critical' ? 'Immediate' : 'Recommended'
    };
  };

  const aiRecommendation = getAIRecommendation();

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      const userType = localStorage.getItem("userType");
      const authToken = localStorage.getItem("authToken");

      if (userType !== "donor" || !authToken) {
        localStorage.clear()
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5555/verify/donor", {
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
        localStorage.clear()
        navigate("/login");
      }
    };

    authenticateUser();
  }, [navigate]);

  if (isAuthenticating) {
    return <div className="text-center text-gray-600">Verifying authentication...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Donor Dashboard</h2>

      {showRegistration && (
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Donor Registration</h3>
          <form onSubmit={handleRegistration} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Group</label>
              <BloodTypeSelector 
                value={donorInfo.bloodGroup}
                onChange={(e) => setDonorInfo({...donorInfo, bloodGroup: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Last Donation Date</label>
              <input
                type="date"
                name="lastDonation"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Information</label>
              <input
                type="tel"
                name="contact"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="+1 234 567 890"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Medical History</label>
              <textarea
                name="medicalHistory"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                rows="3"
                placeholder="Any relevant medical information..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
            >
              Complete Registration
            </button>
          </form>
        </div>
      )}

      {donorInfo.registered && (
        <>
          {/* AI Recommendations Section */}
          <div className="mb-8 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <span className="text-2xl">🩸</span>
              </div>
              <h3 className="text-xl font-semibold">Donation Intelligence</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="font-medium text-gray-700">Next Recommended Donation</p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  {aiRecommendation.nextDonation || 'Not available'}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {aiRecommendation.recommendation}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="font-medium text-gray-700">Regional Demand for {donorInfo.bloodGroup}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className={`text-xl ${
                    regionalDemand[donorInfo.bloodGroup]?.demand === 'Critical' ? 'text-red-600' :
                    regionalDemand[donorInfo.bloodGroup]?.demand === 'High' ? 'text-orange-600' :
                    'text-green-600'
                  }`}>
                    {regionalDemand[donorInfo.bloodGroup]?.demand || 'N/A'}
                  </span>
                  <p className="text-gray-600">
                    {regionalDemand[donorInfo.bloodGroup]?.needed || 0} units needed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-Time Hospital Matching */}
          <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Hospital Matches Needing Your Blood Type</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {hospitalMatches.map((hospital) => (
                <HospitalMatchCard 
                  key={hospital.id}
                  name={hospital.name}
                  distance={hospital.distance}
                  urgency={hospital.urgency}
                  needed={hospital.needed}
                />
              ))}
            </div>
            {hospitalMatches.length === 0 && (
              <p className="text-gray-500 text-center py-4">No current matches - check back later!</p>
            )}
          </div>

          {/* Donation History & Tracking */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Donation History</h3>
            <DonationHistory bloodType={donorInfo.bloodGroup} />
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                Eligibility Status: {calculateNextDonation() ? 
                `Next donation available after ${calculateNextDonation()}` : 
                'Ready to donate!'}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DonorHome;