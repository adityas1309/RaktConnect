import React from "react";
import { motion } from "framer-motion";
import { FaUserPlus, FaHandHoldingHeart, FaAmbulance } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: FaUserPlus,
      title: "Step 1: Sign Up",
      text: "Create your profile as a donor, healthcare provider, or patient in seconds",
      color: "from-red-400 to-red-600",
    },
    {
      icon: FaHandHoldingHeart,
      title: "Step 2: Request or Donate",
      text: "Hospitals post needs, donors schedule donations, AI matches supply",
      color: "from-orange-400 to-orange-600",
    },
    {
      icon: FaAmbulance,
      title: "Step 3: Save a Life",
      text: "Automated logistics ensure timely delivery where it's needed most",
      color: "from-green-400 to-green-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent"
        >
          How It Works
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 relative"
        >
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-green-500/20" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              transition={{ type: "spring", stiffness: 50 }}
              className="relative group"
            >
              {/* Progress connector */}
              {index !== 0 && (
                <div className="hidden md:block absolute top-1/4 -left-12 w-12 h-1 bg-gradient-to-r from-red-500/30 to-orange-500/30" />
              )}

              <div className="relative p-8 bg-gray-800/30 rounded-2xl border border-gray-700/50 backdrop-blur-lg hover:border-red-500/30 transition-all duration-300 h-full">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="mb-6 flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="p-4 bg-gradient-to-br from-red-500 to-red-700 rounded-xl shadow-lg"
                    >
                      <step.icon className="text-3xl text-white" />
                    </motion.div>
                  </div>
                  <h3 className={`text-2xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-4`}>
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    {step.text}
                  </p>
                </div>

                {/* Step number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
};

export default HowItWorks;