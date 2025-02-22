import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqs = [
    { 
      question: "Who can donate blood?",
      answer: "Generally healthy adults between 18-65 years, weighing at least 50kg"
    },
    {
      question: "How often can I donate?",
      answer: "Every 56 days for whole blood donations"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-red-600 mb-12 text-center mt-12">FAQs</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg bg-white shadow-sm">
              <button
                className="w-full p-4 text-left flex justify-between items-center"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {activeIndex === index && (
                <div className="p-4 pt-0 text-gray-600 border-t">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-red-50 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-700 mb-4">Still have questions?</h2>
          <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;