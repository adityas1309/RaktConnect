import React from "react";
import { motion } from "framer-motion";
import { FaHandHoldingHeart, FaHospitalAlt, FaUserFriends } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: FaHandHoldingHeart,
      title: "Easy Blood Donations",
      text: "Find the nearest donation center and schedule a donation in minutes.",
    },
    {
      icon: FaHospitalAlt,
      title: "Hospital Support",
      text: "Real-time blood inventory tracking and AI-powered shortage forecasting.",
    },
    {
      icon: FaUserFriends,
      title: "Community Impact",
      text: "Join a lifesaving network where every donation creates ripples of hope.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-black bg-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-full h-full bg-[url('/graph-paper.svg')] pattern-bg" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent"
        >
          Why Choose RaktConnect?
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative p-8 bg-gray-800/30 rounded-2xl border border-gray-700/50 backdrop-blur-lg hover:border-red-500/30 transition-all duration-300"
              >
                {/* Animated glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-gradient-to-br from-red-500 to-red-700 rounded-xl shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300">
                      <Icon className="text-3xl text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-100 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      
    </section>
  );
};

export default Features;