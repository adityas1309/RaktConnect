import React, { useState } from "react";

const HaemoglobinPredictor = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    dietary_habits: "",
    medical_history: "",
    previous_haemoglobin: "",
  });

  const [prediction, setPrediction] = useState(null);

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
      const response = await fetch(
        "https://raktconnect-ai-backend.onrender.com/predict/haemoglobin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error("Error predicting haemoglobin:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Haemoglobin Level Predictor
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-gray-700">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
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
            <label className="block text-gray-700">Height (cm):</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-gray-700">Dietary Habits:</label>
            <select
              name="dietary_habits"
              value={formData.dietary_habits}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="">Select Dietary Habit</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Medical History:</label>
            <select
              name="medical_history"
              value={formData.medical_history}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="">Select Medical History</option>
              <option value="none">None</option>
              <option value="diabetes">Diabetes</option>
              <option value="hypertension">Hypertension</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">
              Previous Haemoglobin Level:
            </label>
            <input
              type="number"
              name="previous_haemoglobin"
              value={formData.previous_haemoglobin}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Predict Haemoglobin Level
          </button>
        </form>
        {prediction && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Prediction Result</h2>
            <p className="text-gray-700">
              Predicted Haemoglobin Level: {prediction.predicted_haemoglobin}
            </p>
            <p className="text-gray-700">Advice: {prediction.advice}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HaemoglobinPredictor;
