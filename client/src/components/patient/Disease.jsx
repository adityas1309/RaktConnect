import React, { useState } from 'react';


function Disease() {
  const [symptoms, setSymptoms] = useState('');
  const [prediction, setPrediction] = useState('');

  const handlePredict = async () => {
    try {
      // Split symptoms by comma and trim whitespace
      const symptomList = symptoms.split(',').map(symptom => symptom.trim());

      const response = await fetch('https://raktconnect-ai-backend.onrender.com/predict/disease', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: symptomList }),
      });

      const data = await response.json();
      setPrediction(data.predicted_disease);
    } catch (error) {
      console.error('Error predicting disease:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Disease Predictor</h1>
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Enter your symptoms, separated by commas"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handlePredict}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Predict
        </button>
        {prediction && (
          <p className="mt-4 text-lg text-center">Predicted Disease: {prediction}</p>
        )}
      </div>
    </div>
  );
}

export default Disease;
