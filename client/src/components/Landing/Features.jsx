import React from "react";
import { motion } from "framer-motion";
import { Heart, Building2, Users } from "lucide-react";
import PageMeta from "../common/PageMeta";
const Features = () => {
  const features = [
    {
      icon: Heart,
      title: "Easy Blood Donations",
      text: "Find the nearest donation center and schedule a donation in minutes.",
    },
    {
      icon: Building2,
      title: "Hospital Support",
      text: "Real-time blood inventory tracking and AI-powered shortage forecasting.",
    },
    {
      icon: Users,
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <>
    <PageMeta title="Features | RaktConnect" />

    <section className="relative py-20 overflow-hidden bg-gray-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-full h-full bg-gradient-to-br from-red-100 to-red-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300">
       
       <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.8,
            ease: "easeOut"
          }
        }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        viewport={{ once: true, margin: "-100px" }}
        className="
          text-6xl md:text-6xl 
          font-bold text-center mb-25
          bg-gradient-to-r from-red-400 to-red-600 
          bg-clip-text text-transparent 
          hover:from-red-600 hover:to-red-700
          transition-all duration-300 cursor-pointer
        "
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
                whileHover={{ 
                  scale: 1.15,
                  
                }}
                className="group relative p-8 bg-white/80 rounded-2xl border border-gray-200/70 backdrop-blur-lg shadow-lg hover:shadow-2xl hover:shadow-red-100/50 hover:border-red-500/80 transition-all duration-300 transform-gpu perspective-1000 hover:-translate-y-2"
                style={{
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Animated glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-100/60 via-red-50/40 to-pink-50/30 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-red-400/20 via-red-500/20 to-red-600/20 blur-sm" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 transform rotate-12" />
                </div>
                
                <div className="relative z-10">
                  <div className="mb-6 flex justify-center">
                    <motion.div 
                      className="p-4 bg-gradient-to-br from-red-500 to-red-700 rounded-xl shadow-lg transform transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-red-300/40"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        boxShadow: "0 20px 25px -5px rgba(239, 68, 68, 0.3), 0 10px 10px -5px rgba(239, 68, 68, 0.2)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="text-3xl text-white group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>
                  </div>
                  <motion.h3 
                    className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-red-600 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    className="text-lg text-gray-700 leading-relaxed group-hover:text-gray-700 transition-colors duration-500"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    {feature.text}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default Features;