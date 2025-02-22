import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const API_URL = "http://localhost:8000/predict_blood_demand"; 

const BloodDemandChart = () => {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setPredictions(data.predictions || []);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching predictions:", error);
        setError("Failed to load predictions");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading predictions...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">Blood Demand Forecast</h3>
      {predictions.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={predictions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="ds" 
              tickFormatter={(tick) => new Date(tick).toLocaleDateString()} 
            />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="yhat" stroke="#E53E3E" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500">No prediction data available</p>
      )}
    </div>
  );
};

export default BloodDemandChart;
