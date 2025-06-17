import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

const predefinedSymptoms = [
  "fever", "cough", "headache", "nausea", "fatigue",
  "sore throat", "vomiting", "diarrhea", "rash", "chills",
  "joint pain", "muscle pain", "loss of taste", "loss of smell",
  "shortness of breath", "dizziness", "chest pain", "abdominal pain",
  "sneezing", "runny nose", "blurred vision", "weight loss",
  "insomnia", "itching", "swollen glands", "constipation", "dry mouth",
  "difficulty swallowing", "skin irritation", "palpitations"
];


function Disease() {
  const [symptomInput, setSymptomInput] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [prediction, setPrediction] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const inputRef = useRef(null);

  const quotes = [
    "Your body hears everything your mind says — stay positive.",
    "Health is not just about what you're eating. It's also about what you're thinking and saying.",
    "A healthy outside starts from the inside.",
    "Don't count the days, make the days count — and stay healthy.",
    "Every symptom is your body's way of whispering — listen closely.",
    "You don’t have to be perfect to be healthy — just consistent.",
    "Take care of your body. It's the only place you have to live."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000); // change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filtered = predefinedSymptoms.filter(
      (symptom) =>
        symptom.toLowerCase().startsWith(symptomInput.toLowerCase()) &&
        !selectedSymptoms.includes(symptom)
    );
    setSuggestions(symptomInput ? filtered : []);
    setHighlightIndex(-1);
  }, [symptomInput, selectedSymptoms]);

  const handleInputChange = (e) => setSymptomInput(e.target.value);

  const handleSuggestionClick = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
      setSymptomInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightIndex >= 0) {
        handleSuggestionClick(suggestions[highlightIndex]);
      } else if (symptomInput.trim() !== '' && !selectedSymptoms.includes(symptomInput.trim())) {
        setSelectedSymptoms([...selectedSymptoms, symptomInput.trim()]);
        setSymptomInput('');
      }
    }
  };

  const removeSymptom = (symptomToRemove) => {
    setSelectedSymptoms(selectedSymptoms.filter(symptom => symptom !== symptomToRemove));
  };

  const handlePredict = async () => {
    try {
      const response = await fetch('https://raktconnect-ai-backend.onrender.com/predict/disease', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: selectedSymptoms }),
      });

      const data = await response.json();
      setPrediction(data.predicted_disease);
      toast.success('Prediction successful! The prediction disease is ' + data.predicted_disease);
    } catch (error) {
      console.error('Error predicting disease:', error);
      toast.error('Failed to predict disease. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-100 to-red-50 px-4 font-sans">
      
      {/* 💬 Motivational Quote */}
      <div className="mb-6 max-w-2xl text-center px-4">
        <p className="text-red-700 text-base italic font-medium bg-red-50 border border-red-100 rounded-lg py-2 px-4 shadow-sm transition-opacity duration-500">
          {quotes[quoteIndex]}
        </p>
      </div>

      {/* 🔍 Disease Predictor Card */}
      <div className="bg-white/70 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-2xl transition-all duration-500">
        <h1 className="text-3xl font-bold text-center text-red-800 mb-6">
          💉 Disease Predictor
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-4">
          {selectedSymptoms.map((symptom, idx) => (
            <span
              key={idx}
              className="bg-gradient-to-r from-red-100 to-red-50 text-red-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm flex items-center animate-fadeIn"
            >
              {symptom}
              <button
                className="ml-2 text-red-400 hover:text-red-600 font-bold"
                onClick={() => removeSymptom(symptom)}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* Input Field */}
        <div className="relative w-full mb-6">
          <input
            type="text"
            ref={inputRef}
            value={symptomInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="e.g. fever, headache..."
            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 shadow-inner"
          />

          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto z-20 animate-fadeIn">
              {suggestions.map((symptom, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 text-sm cursor-pointer ${
                    highlightIndex === index ? 'bg-red-100 text-red-800' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleSuggestionClick(symptom)}
                >
                  {symptom}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Predict Button */}
        <button
          onClick={handlePredict}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-red-400 to-red-300 text-white font-semibold shadow-md hover:from-red-500 hover:to-red-400 transition duration-300"
        >
          ❤️ Predict Disease
        </button>

        {/* Prediction Output */}
        {prediction && (
          <div className="mt-6 text-center text-lg bg-red-100 text-red-700 font-semibold py-3 px-4 rounded-xl shadow-sm animate-fadeIn">
            🧬 Predicted Disease: <span className="text-red-800">{prediction}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Disease;
