import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import PageMeta from '../common/PageMeta';
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
    <>
    <PageMeta title="Campaigns | RaktConnect" />

    <div
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8"
      style={{
        background: "var(--bg-main)",
        color: "var(--text-main)"
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-4xl font-bold mb-8 mt-12"
          style={{ color: "var(--accent)" }}
        >
          Current Campaigns
        </h1>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {activeCampaigns.map((campaign, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border"
              style={{
                background: "var(--bg-surface)",
                borderColor: "rgba(200,0,0,0.10)"
              }}
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
                
                <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--text-main)" }}>
                  {campaign.title}
                </h3>
                
                <div className="flex items-center mb-2" style={{ color: "var(--text-muted)" }}>
                  <FaCalendarAlt className="mr-2 text-red-500" />
                  <span>{campaign.date}</span>
                </div>
                
                <div className="flex items-center" style={{ color: "var(--text-muted)" }}>
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  <span>{campaign.location}</span>
                </div>
                
                <button
                  className="mt-4 w-full py-2 rounded-lg hover:bg-red-700 transition-colors"
                  style={{
                    background: "var(--accent)",
                    color: "#fff"
                  }}
                >
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div
          className="mt-16 rounded-xl p-8 text-center"
          style={{
            background: "var(--bg-surface)",
            color: "var(--text-main)"
          }}
        >
          <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--accent)" }}>
            Upcoming Events
          </h2>
          <p className="mb-4" style={{ color: "var(--text-muted)" }}>Monthly Community Drive - 3rd March</p>
          <button
            className="mt-4 px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            style={{
              background: "var(--accent)",
              color: "#fff"
            }}
          >
            Get Notified
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Campaigns;