import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import PageMeta from '../common/PageMeta';

const Campaigns = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const activeCampaigns = [
    {
      title: "Summer Blood Drive",
      date: "March 3rd, 2025",
      location: "City Convention Center",
      type: "Blood Drive",
      details: `
        Our annual Summer Blood Drive is back! With rising hospital needs, we’re calling on all donors to step forward.
        🩸 Free health screening and refreshments.
        🎁 Gift kits for all participants.
        📅 Walk-ins welcome between 9 AM to 5 PM.
      `
    },
    {
      title: "Emergency O-Need",
      date: "Ongoing",
      location: "All Donation Centers",
      type: "Urgent Request",
      details: `
        Due to a recent emergency, our O-negative supply is critically low. If you're O- and eligible, please donate now.
        🛑 No prior appointment needed.
        🕒 Open late till 8 PM this week.
        🆘 Your donation can save trauma and surgery patients today.
      `
    },
    {
      title: "College Camp Blood Connect",
      date: "July 10th, 2025",
      location: "XYZ University",
      type: "Blood Drive",
      details: `
        Join students from across the state to donate and raise awareness.
        🎤 Guest speaker: Dr. Mehta on youth health.
        📚 Awareness booths and poster displays.
        📜 Participation certificates available.
      `
    },
    {
      title: "Community Awareness Week",
      date: "Aug 15–20, 2025",
      location: "Multiple locations",
      type: "Awareness Event",
      details: `
        A city-wide movement to educate citizens on the importance of regular blood donation.
        🏥 Includes talks from doctors, live donor stories, and Q&A sessions.
        📍 Locations include malls, schools, and colleges.
      `
    },
    {
      title: "Corporate Blood Drive Marathon",
      date: "September 5th, 2025",
      location: "TechHub Tower, Sector 45",
      type: "Corporate Drive",
      details: `
        A joint initiative with 30+ companies to donate blood for city hospitals.
        🧑‍💼 Open to all employees and their families.
        ☕ Free coffee and snack counters.
        🧬 Live donor health tracking dashboard.
      `
    },
    {
      title: "Red Ribbon Walkathon & Camp",
      date: "October 2nd, 2025",
      location: "Greenfield Park",
      type: "Fundraiser & Camp",
      details: `
        Walk for awareness followed by a blood donation camp.
        🏃‍♂️ 5K Walkathon registration starts at 6:30 AM.
        🎵 Live music and breakfast post-walk.
        🩸 Blood collection begins at 9 AM.
      `
    },
    {
      title: "Festival of Life - Diwali Drive",
      date: "October 28th, 2025",
      location: "All Partner Clinics",
      type: "Seasonal Campaign",
      details: `
        Celebrate Diwali by giving the gift of life.
        🪔 Decorated festive stations with Diwali sweets.
        🎁 Surprise gifts for first 100 donors.
        🕯️ Clinics open extended hours till 9 PM.
      `
    },
    {
      title: "Women for Life – Blood Drive",
      date: "November 14th, 2025",
      location: "Women's Health Pavilion",
      type: "Special Campaign",
      details: `
        An all-women donor drive promoting female health & empowerment.
        👩‍⚕️ Gynaecologist consultation booths.
        🌸 Health gift packs for women donors.
        🩸 Men are welcome too — donate in support!
      `
    }
  ];

  return (
    <>
      <PageMeta title="Campaigns | RaktConnect" />

      {/* Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full p-8 relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-2xl"
              onClick={() => setSelectedCampaign(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-3 text-red-700">{selectedCampaign.title}</h2>
            <p className="text-sm mb-2 text-gray-600 flex items-center">
              <FaCalendarAlt className="inline mr-2 text-red-500" /> {selectedCampaign.date}
            </p>
            <p className="text-sm mb-4 text-gray-600 flex items-center">
              <FaMapMarkerAlt className="inline mr-2 text-red-500" /> {selectedCampaign.location}
            </p>
            <div className="whitespace-pre-line text-gray-800 leading-relaxed text-[1.05rem]">
              {selectedCampaign.details}
            </div>
          </div>
        </div>
      )}

      {/* Page */}
      <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8" style={{ background: "var(--bg-main)", color: "var(--text-main)" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 mt-12" style={{ color: "var(--accent)" }}>
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
                <div className="p-6 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${campaign.type === "Urgent Request"
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
                  </div>

                  <button
                    onClick={() => setSelectedCampaign(campaign)}
                    className="mt-4 w-full py-2 rounded-lg hover:bg-red-700 transition-colors"
                    style={{ background: "var(--accent)", color: "#fff" }}
                  >
                    Learn More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Upcoming Events */}
          <div className="mt-16 rounded-xl p-8 text-center" style={{ background: "var(--bg-surface)", color: "var(--text-main)" }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--accent)" }}>
              Upcoming Events
            </h2>
            <p className="mb-4" style={{ color: "var(--text-muted)" }}>Monthly Community Drive - 3rd March</p>
            <button
              className="mt-4 px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
              style={{ background: "var(--accent)", color: "#fff" }}
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
