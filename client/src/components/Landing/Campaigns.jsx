import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Campaigns = () => {
  const activeCampaigns = [
    { 
      title: "Summer Blood Drive", 
      date: "March 3rd, 2025", 
      location: "City Convention Center",
      type: "Blood Drive"
    },
    { 
      title: "Emergency O-Need", 
      date: "Ongoing", 
      location: "All Donation Centers",
      type: "Urgent Request"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-red-600 mb-8 mt-12">Current Campaigns</h1>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {activeCampaigns.map((campaign, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    campaign.type === "Urgent Request" 
                      ? "bg-red-100 text-red-700" 
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {campaign.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {campaign.title}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <FaCalendarAlt className="mr-2 text-red-500" />
                  <span>{campaign.date}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  <span>{campaign.location}</span>
                </div>
                
                <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-red-100 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">Upcoming Events</h2>
          <p className="text-gray-600">Monthly Community Drive - 3rd March</p>
          <button className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
            Get Notified
          </button>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;