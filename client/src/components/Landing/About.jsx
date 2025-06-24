import React from 'react';
import { motion } from 'framer-motion';
import { FaTint, FaHandHoldingHeart, FaShieldAlt, FaMapMarkerAlt, FaUsers, FaHeartbeat } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PageMeta from '../common/PageMeta';
const About = () => {
  const navigate = useNavigate();
  return (
    <>
    <PageMeta title="About | RaktConnect" />

    <div
      className="min-h-screen py-30 px-4 sm:px-6 lg:px-8"
      style={{
        background: "var(--bg-main)",
        color: "var(--text-main)"
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="bg-gradient-to-r from-red-500 to-red-700 text-white text-md font-semibold px-9 py-4 rounded-full inline-block mb-8 shadow-lg shadow-red-300 border border-white"
          >
            Life-Saving Community
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent py-10 bg-gradient-to-r from-red-600 to-red-800 border-gray-300 border-y-2 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Connecting Compassionate Donors with Those in Need
          </motion.h1>
          
          <motion.p
            className="text-2xl max-w-3xl mx-auto bg-clip-text text-transparent bg-gray-700"
            
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
            className="rounded-2xl p-6 bg-red-50 border-2 border-red-300 hover:border-2 hover:border-red-500 hover:bg- text-center shadow-xl  hover:scale-110 transition-all duration-300 hover:shadow-red-200 "
            
          >
            <div className="text-4xl font-bold" style={{ color: "var(--accent)" }}>50K+</div>
            <div className="mt-2 text-gray-700 text-xl font-medium" >Lives Saved</div>
          </div>
          
          <div
            className="rounded-2xl p-6 bg-red-50 border-2 border-red-300 hover:border-2 hover:border-red-500 hover:bg- text-center shadow-xl  hover:scale-110 transition-all duration-300 hover:shadow-red-200"
         
          >
            <div className="text-4xl font-bold" style={{ color: "var(--accent)" }}>120K+</div>
            <div className="mt-2 text-gray-700 text-xl font-medium">Donors</div>
          </div>
          
          <div
            className="rounded-2xl p-6 bg-red-50 border-2 border-red-300 hover:border-2 hover:border-red-500 hover:bg- text-center shadow-xl  hover:scale-110 transition-all duration-300 hover:shadow-red-200"
           
          >
            <div className="text-4xl font-bold" style={{ color: "var(--accent)" }}>500+</div>
            <div className="mt-2 text-gray-700 text-xl font-medium">Hospitals</div>
          </div>
          
          <div
            className="rounded-2xl p-6 bg-red-50 border-2 border-red-300 hover:border-2 hover:border-red-500 hover:bg- text-center shadow-xl  hover:scale-110 transition-all duration-300 hover:shadow-red-200"
          
          >
            <div className="text-4xl font-bold" style={{ color: "var(--accent)" }}>98%</div>
            <div className="mt-2 text-gray-700 text-xl font-medium">Success Rate</div>
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
            className="relative  border-2 border-red-300 bg-gradient-to-r from-red-500 to-red-500 rounded-3xl shadow-2xl shadow-red-300 overflow-hidden p-10"
           
            
          >
          
              <h2 className="text-5xl md:text-4xl font-bold  text-white mb-6 text-center">Our Mission</h2>
              <p className="text-xl text-white leading-snug text-center max-w-4xl mx-auto ">
                To create a reliable, efficient, and transparent platform that connects blood donors with 
                hospitals and patients in need, ensuring timely access to safe blood supplies while 
                promoting a culture of regular blood donation.
              </p>
           
          </div>
        </motion.div>

        {/* Features Section */}
        <div className="mb-20">
          <motion.h2 
            className="text-5xl font-bold text-center mb-16"
            
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Why Choose Our Platform
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
            
              className=" hover:scale-105 transition-all duration-300 hover:border hover:border-white hover:bg-red-200 p-8 rounded-3xl shadow-xl border-2 border-red-500  flex flex-col items-center text-center"
             
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <FaTint className="text-red-600 text-3xl" />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-gray-900" >Simplified Donation</h3>
              <p className='hover:text-black text-gray-700 text-lg'>
                Intuitive platform connecting donors with verified blood banks and hospitals
              </p>
            </motion.div>

            <motion.div 
             
              className="hover:scale-105 transition-all duration-300 hover:border hover:border-white hover:bg-red-200 p-8 rounded-3xl shadow-xl border-2 border-red-500  flex flex-col items-center text-center"
             
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <FaHandHoldingHeart className="text-pink-600 text-3xl" />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-gray-900" >Community Driven</h3>
              <p className='hover:text-black text-gray-700 text-lg'>
                Powered by compassionate donors committed to saving lives daily
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, y: -10 }}
              className="hover:scale-105 transition-all duration-300 hover:border hover:border-white hover:bg-red-200 p-8 rounded-3xl shadow-xl border-2 border-red-500  flex flex-col items-center text-center"
             
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <FaShieldAlt className="text-blue-600 text-3xl" />
              </div>
             <h3 className="text-3xl font-bold mb-3 text-gray-900" >Safe & Verified</h3>
              <p className='hover:text-black text-gray-700 text-lg'>
                Rigorous screening and quality control for all donations
              </p>
            </motion.div>

            <motion.div 

              className="hover:scale-105 transition-all duration-300 hover:border hover:border-white hover:bg-red-200 p-8 rounded-3xl shadow-xl border-2 border-red-500  flex flex-col items-center text-center"
             
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
            >
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <FaMapMarkerAlt className="text-purple-600 text-3xl" />
              </div>
             <h3 className="text-3xl font-bold mb-3 text-gray-900" >Location Tracking</h3>
              <p className='hover:text-black text-gray-700 text-lg'>
                Find the nearest donation centers with real-time availability
              </p>
            </motion.div>

            <motion.div 
              
              className="hover:scale-105 transition-all duration-300 hover:border hover:border-white hover:bg-red-200 p-8 rounded-3xl shadow-xl border-2 border-red-500  flex flex-col items-center text-center"
             
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0 }}
            >
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <FaUsers className="text-green-600 text-3xl" />
              </div>
               <h3 className="text-3xl font-bold mb-3 text-gray-900" >Donor Network</h3>
               <p className='hover:text-black text-gray-700 text-lg'>
                Connect with other donors and organize community drives
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, y: -10 }}
              className="hover:scale-105 transition-all duration-300 hover:border hover:border-white hover:bg-red-200 p-8 rounded-3xl shadow-xl border-2 border-red-500  flex flex-col items-center text-center"
             
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 }}
            >
              <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <FaHeartbeat className="text-amber-600 text-3xl" />
              </div>
               <h3 className="text-3xl font-bold mb-3 text-gray-900" >Health Tracking</h3>
               <p className='hover:text-black text-gray-700 text-lg'>
                Monitor your donation history and health impact
              </p>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="mt-16 rounded-3xl p-10 text-center shadow-2xl shadow-red-200 bg-red-500 "
         
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-white">
            Join Our Life-Saving Community
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-white">
            Every donation matters. Become part of a network that's saved thousands of lives 
            and continues to make a difference daily.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button 
              className="bg-white cursor-pointer text-red-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-200 text-xl transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
            >
              Become a Donor
            </motion.button>
            <motion.button 
              className="bg-transparent border-2 cursor-pointer border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 text-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/banks")}
            >
              Find a Donation Center
            </motion.button>
          </div>
          <div className="mt-8 text-white/80 text-lg">
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
          <h2 className="text-7xl py-20 border-y-4 border-red-400 font-bold text-center mb-12 ">Donor Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="rounded-3xl p-8 shadow-lg"
              style={{
                background: "var(--bg-surface)",
                color: "var(--text-main)"
              }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-gray-200 border-2 border-red-200 rounded-xl w-16 h-16" />
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
                <div className="bg-gray-200 border-2 border-red-200 rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <h4 className="font-bold" style={{ color: "var(--text-main)" }}>Michael Chen</h4>
                   <p className='hover:text-black text-gray-700 text-lg'>Blood recipient</p>
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
                <div className="bg-gray-200 border-2 border-red-200 rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <h4 className="font-bold" style={{ color: "var(--text-main)" }}>Dr. Anika Patel</h4>
                   <p className='hover:text-black text-gray-700 text-lg'>Hospital Administrator</p>
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
    </>
  );
};

export default About;