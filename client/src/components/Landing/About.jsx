import React from 'react';
import { motion } from 'framer-motion';
import { FaTint, FaHandHoldingHeart, FaShieldAlt, FaMapMarkerAlt, FaUsers, FaHeartbeat } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen py-30 px-4 sm:px-6 lg:px-8"
      style={{
        background: "var(--bg-main)",
        color: "var(--text-main)"
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-semibold px-6 py-2 rounded-full inline-block mb-8 shadow-lg"
          >
            Life-Saving Community
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-700 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Connecting Compassionate Donors with Those in Need
          </motion.h1>
          
          <motion.p
            className="text-xl max-w-3xl mx-auto"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Leveraging technology to ensure timely access to safe blood supplies while promoting a culture of regular donation
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div
            className="rounded-2xl p-6 text-center shadow-xl border"
            style={{
              background: "var(--bg-surface)",
              borderColor: "rgba(200,0,0,0.08)",
              color: "var(--text-main)"
            }}
          >
            <div className="text-4xl font-bold" style={{ color: "var(--accent)" }}>50K+</div>
            <div className="mt-2" style={{ color: "var(--text-muted)" }}>Lives Saved</div>
          </div>
          
          <div
            className="rounded-2xl p-6 text-center shadow-xl border"
            style={{
              background: "var(--bg-surface)",
              borderColor: "rgba(200,0,0,0.08)",
              color: "var(--text-main)"
            }}
          >
            <div className="text-4xl font-bold" style={{ color: "var(--accent)" }}>120K+</div>
            <div className="mt-2" style={{ color: "var(--text-muted)" }}>Donors</div>
          </div>
          
          <div
            className="rounded-2xl p-6 text-center shadow-xl border"
            style={{
              background: "var(--bg-surface)",
              borderColor: "rgba(200,0,0,0.08)",
              color: "var(--text-main)"
            }}
          >
            <div className="text-4xl font-bold" style={{ color: "var(--accent)" }}>500+</div>
            <div className="mt-2" style={{ color: "var(--text-muted)" }}>Hospitals</div>
          </div>
          
          <div
            className="rounded-2xl p-6 text-center shadow-xl border"
            style={{
              background: "var(--bg-surface)",
              borderColor: "rgba(200,0,0,0.08)",
              color: "var(--text-main)"
            }}
          >
            <div className="text-4xl font-bold" style={{ color: "var(--accent)" }}>98%</div>
            <div className="mt-2" style={{ color: "var(--text-muted)" }}>Success Rate</div>
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div
            className="relative bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl shadow-2xl overflow-hidden"
            style={{
              background: "linear-gradient(to right, #ef4444, #ec4899)"
            }}
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-20"></div>
            <div className="relative z-10 p-10 md:p-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Our Mission</h2>
              <p className="text-xl text-white leading-relaxed text-center max-w-4xl mx-auto">
                To create a reliable, efficient, and transparent platform that connects blood donors with 
                hospitals and patients in need, ensuring timely access to safe blood supplies while 
                promoting a culture of regular blood donation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <div className="mb-20">
          <motion.h2 
            className="text-3xl font-bold text-center mb-16"
            style={{ color: "var(--text-main)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Why Choose Our Platform
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.05, y: -10 }}
              className="p-8 rounded-3xl shadow-xl border flex flex-col items-center text-center"
              style={{
                background: "var(--bg-surface)",
                borderColor: "rgba(200,0,0,0.08)",
                color: "var(--text-main)"
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <FaTint className="text-red-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-main)" }}>Simplified Donation</h3>
              <p style={{ color: "var(--text-muted)" }}>
                Intuitive platform connecting donors with verified blood banks and hospitals
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, y: -10 }}
              className="p-8 rounded-3xl shadow-xl border flex flex-col items-center text-center"
              style={{
                background: "var(--bg-surface)",
                borderColor: "rgba(200,0,0,0.08)",
                color: "var(--text-main)"
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <FaHandHoldingHeart className="text-pink-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-main)" }}>Community Driven</h3>
              <p style={{ color: "var(--text-muted)" }}>
                Powered by compassionate donors committed to saving lives daily
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, y: -10 }}
              className="p-8 rounded-3xl shadow-xl border flex flex-col items-center text-center"
              style={{
                background: "var(--bg-surface)",
                borderColor: "rgba(200,0,0,0.08)",
                color: "var(--text-main)"
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <FaShieldAlt className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-main)" }}>Safe & Verified</h3>
              <p style={{ color: "var(--text-muted)" }}>
                Rigorous screening and quality control for all donations
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, y: -10 }}
              className="p-8 rounded-3xl shadow-xl border flex flex-col items-center text-center"
              style={{
                background: "var(--bg-surface)",
                borderColor: "rgba(200,0,0,0.08)",
                color: "var(--text-main)"
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
            >
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <FaMapMarkerAlt className="text-purple-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-main)" }}>Location Tracking</h3>
              <p style={{ color: "var(--text-muted)" }}>
                Find the nearest donation centers with real-time availability
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, y: -10 }}
              className="p-8 rounded-3xl shadow-xl border flex flex-col items-center text-center"
              style={{
                background: "var(--bg-surface)",
                borderColor: "rgba(200,0,0,0.08)",
                color: "var(--text-main)"
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0 }}
            >
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <FaUsers className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-main)" }}>Donor Network</h3>
              <p style={{ color: "var(--text-muted)" }}>
                Connect with other donors and organize community drives
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, y: -10 }}
              className="p-8 rounded-3xl shadow-xl border flex flex-col items-center text-center"
              style={{
                background: "var(--bg-surface)",
                borderColor: "rgba(200,0,0,0.08)",
                color: "var(--text-main)"
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 }}
            >
              <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <FaHeartbeat className="text-amber-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-main)" }}>Health Tracking</h3>
              <p style={{ color: "var(--text-muted)" }}>
                Monitor your donation history and health impact
              </p>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="mt-16 rounded-3xl p-10 text-center shadow-2xl"
          style={{
            background: "linear-gradient(to right, #ef4444, #ec4899)",
            color: "#fff"
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4 }}
        >
          <h2 className="text-3xl font-bold mb-6">
            Join Our Life-Saving Community
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Every donation matters. Become part of a network that's saved thousands of lives 
            and continues to make a difference daily.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button 
              className="bg-white text-red-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
            >
              Become a Donor
            </motion.button>
            <motion.button 
              className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/banks")}
            >
              Find a Donation Center
            </motion.button>
          </div>
          <div className="mt-8 text-white/80">
            <p>Already a member? <a href="/login" className="text-white font-semibold underline">Sign in</a></p>
          </div>
        </motion.div>

        {/* Testimonial Section */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "var(--text-main)" }}>Donor Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="rounded-3xl p-8 shadow-lg"
              style={{
                background: "var(--bg-surface)",
                color: "var(--text-main)"
              }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <h4 className="font-bold" style={{ color: "var(--text-main)" }}>Sarah Johnson</h4>
                  <p className="" style={{ color: "var(--text-muted)" }}>Regular donor for 5 years</p>
                </div>
              </div>
              <p className="italic" style={{ color: "var(--text-main)" }}>
                "This platform made it so easy to find where my blood type was needed most. 
                I've donated 12 times through this app and saved multiple lives!"
              </p>
            </div>
            
            <div
              className="rounded-3xl p-8 shadow-lg"
              style={{
                background: "var(--bg-surface)",
                color: "var(--text-main)"
              }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <h4 className="font-bold" style={{ color: "var(--text-main)" }}>Michael Chen</h4>
                  <p style={{ color: "var(--text-muted)" }}>Blood recipient</p>
                </div>
              </div>
              <p className="italic" style={{ color: "var(--text-main)" }}>
                "When I needed an emergency transfusion, this network found a matching donor 
                in just 2 hours. I owe my life to this incredible community."
              </p>
            </div>
            
            <div
              className="rounded-3xl p-8 shadow-lg"
              style={{
                background: "var(--bg-surface)",
                color: "var(--text-main)"
              }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <h4 className="font-bold" style={{ color: "var(--text-main)" }}>Dr. Anika Patel</h4>
                  <p style={{ color: "var(--text-muted)" }}>Hospital Administrator</p>
                </div>
              </div>
              <p className="italic" style={{ color: "var(--text-main)" }}>
                "Our hospital has reduced blood shortage emergencies by 75% since joining 
                this platform. The real-time donor matching is revolutionary."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;