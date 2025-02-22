import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import MainGraph from './charts/MainGraph';

const initialInventory = {
  A: { units: 15, capacity: 40, donors: 8 },
  B: { units: 25, capacity: 40, donors: 12 },
  AB: { units: 5, capacity: 40, donors: 3 },
  O: { units: 35, capacity: 40, donors: 15 },
};

const criticalAlerts = [
  { id: 1, type: 'AB+', level: 'critical', message: 'Only 2 units remaining' },
  { id: 2, type: 'A-', level: 'warning', message: 'Below safety threshold' },
];

const recentDonations = [
  { id: 1, name: 'John Doe', type: 'O+', date: '2024-03-15', units: 2 },
  { id: 2, name: 'Jane Smith', type: 'A+', date: '2024-03-14', units: 1.5 },
];

const HospitalHome = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedBloodType, setSelectedBloodType] = useState('All');
  const [activeAlert, setActiveAlert] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setInventory(prev => Object.entries(prev).reduce((acc, [type, data]) => ({
        ...acc,
        [type]: { 
          ...data, 
          units: Math.max(0, data.units + Math.floor(Math.random() * 3 - 1))
        }
      }), {}));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (units) => {
    if (units < 5) return 'bg-red-500';
    if (units < 15) return 'bg-amber-400';
    return 'bg-emerald-500';
  };

  const BloodInventoryCard = ({ type, data }) => (
    <div className="group p-4 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className={`text-2xl font-bold ${getStatusColor(data.units).replace('bg', 'text')}`}>
            {type}+
          </h3>
          <p className="text-sm text-gray-500">{data.donors} active donors</p>
        </div>
        <span className="text-lg font-semibold">{data.units} Units</span>
      </div>
      <div className="w-full bg-gray-100 h-2 rounded-full">
        <div 
          className={`${getStatusColor(data.units)} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${(data.units / data.capacity) * 100}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-sm text-gray-600">
        <span>{Math.round((data.units / data.capacity) * 100)}% capacity</span>
        <span>{data.capacity - data.units} remaining</span>
      </div>
    </div>
  );


  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      const userType = localStorage.getItem("userType");
      const authToken = localStorage.getItem("authToken");

      if (userType !== "hospital" || !authToken) {
        localStorage.clear()
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5555/verify/hospital", {
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
    <div className="p-6 lg:p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blood Management Dashboard</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Real-time data updates
        </div>
      </header>

      {criticalAlerts.length > 0 && (
        <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-red-500 text-xl">⚠️</span>
            <div>
              <h3 className="font-semibold text-red-700">Critical Alerts</h3>
              <p className="text-sm text-red-600">
                {criticalAlerts.length} blood groups require immediate attention
              </p>
            </div>
          </div>
          <button 
            className="px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 rounded-lg"
            onClick={() => setActiveAlert('alerts')}
          >
            View Details →
          </button>
        </div>
      )}

      <div className="mb-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(inventory).map(([type, data]) => (
          <BloodInventoryCard key={type} type={type} data={data} />
        ))}
      </div>

      <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Blood Analytics
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({timeRange.replace('d', ' day').toUpperCase()})
            </span>
          </h2>
          <div className="flex gap-2">
            <select
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="24h">Last 24h</option>
              <option value="7d">Last 7d</option>
              <option value="30d">Last 30d</option>
            </select>
            <select
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white"
              value={selectedBloodType}
              onChange={(e) => setSelectedBloodType(e.target.value)}
            >
              <option value="All">All Types</option>
              {Object.keys(inventory).map(type => (
                <option key={type} value={type}>{type}+</option>
              ))}
            </select>
          </div>
        </div>
        <div className="p-4 h-fit">
          <MainGraph timeRange={timeRange} bloodType={selectedBloodType} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Shortage Predictions</h3>
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-lg flex items-center gap-4">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-medium text-amber-700">High Risk of O+ Shortage</p>
                <p className="text-sm text-amber-600">
                  Predicted 40% demand increase in next 7 days
                </p>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg flex items-center gap-4">
              <span className="text-2xl">ℹ️</span>
              <div>
                <p className="font-medium text-blue-700">Donor Availability Alert</p>
                <p className="text-sm text-blue-600">
                  12 compatible donors available within 50km radius
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Recent Donations</h3>
          <div className="space-y-3">
            {recentDonations.map(donation => (
              <div key={donation.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{donation.name}</p>
                  <p className="text-sm text-gray-500">{donation.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{donation.units} units</p>
                  <p className="text-sm text-gray-500">{donation.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalHome;