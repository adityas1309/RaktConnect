import React from 'react';
import { motion } from 'framer-motion';
import { FaTint, FaHandHoldingHeart, FaShieldAlt } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
        
          <p className="text-3xl text-gray-600 w-full text-center mt-12 font-semibold" >
            Bridging the gap between blood donors and those in need through technology and community
          </p>
        </motion.div>

        <div className="mb-16">
          
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed text-center">
              To create a reliable, efficient, and transparent platform that connects blood donors with 
              hospitals and patients in need, ensuring timely access to safe blood supplies while 
              promoting a culture of regular blood donation.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="text-red-600 text-4xl mb-4">
              <FaTint />
            </div>
            <h3 className="text-xl font-semibold mb-2">Blood Donation Simplified</h3>
            <p className="text-gray-600">
              Easy-to-use platform connecting donors with verified blood banks and hospitals
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="text-red-600 text-4xl mb-4">
              <FaHandHoldingHeart />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
            <p className="text-gray-600">
              Powered by compassionate donors committed to saving lives
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="text-red-600 text-4xl mb-4">
              <FaShieldAlt />
            </div>
            <h3 className="text-xl font-semibold mb-2">Safe & Verified</h3>
            <p className="text-gray-600">
              Rigorous screening and quality control measures for all donations
            </p>
          </motion.div>
        </div>

        <div className="mt-16 bg-red-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">
            Join Our Life-Saving Community
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Every donation matters. Become part of a network that's saved over 50,000 lives 
            and continues to make a difference daily.
          </p>
          <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors">
            Become a Donor
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;