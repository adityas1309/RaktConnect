import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Heart, Truck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Step 1: Sign Up",
      text: "Create your profile as a donor, healthcare provider, or patient in seconds",
      color: "from-red-400 to-red-600",
      bgGradient: "from-red-100 to-red-200",
      shadowColor: "shadow-red-200/80",
      hoverBorder: "hover:border-red-600/80",
      iconBg: "from-red-500 to-red-600",
    },
    {
      icon: Heart,
      title: "Step 2: Request or Donate",
      text: "Hospitals post needs, donors schedule donations, AI matches supply",
      color: "from-orange-400 to-orange-600",
      bgGradient: "from-orange-100 to-orange-200",
      shadowColor: "shadow-orange-200/60",
      hoverBorder: "hover:border-orange-600/80",
      iconBg: "from-orange-500 to-orange-600",
    },
    {
      icon: Truck,
      title: "Step 3: Save a Life",
      text: "Automated logistics ensure timely delivery where it's needed most",
      color: "from-amber-500 to-amber-600",
      bgGradient: "from-amber-100 to-amber-200",
      shadowColor: "shadow-amber-200/60",
      hoverBorder: "hover:border-amber-600/80",
      iconBg: "from-amber-500 to-amber-600",
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
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.8 
      }
    },
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    }
  };

  return (
    <section className="relative pt-10 pb-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 
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
    transition-all duration-300
  "
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
          {/* Animated connecting path */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-2">
            <svg className="w-full h-full" viewBox="0 0 800 8" fill="none">
              <motion.path
                d="M50 4 Q400 -20 750 4"
                stroke="url(#pathGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                variants={pathVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#f97316" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,

            
                  z: 25
                }}
                className="relative group cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`relative p-8 bg-white/90 rounded-3xl border-2 border-gray-200/50 backdrop-blur-xl shadow-xl ${step.shadowColor} ${step.hoverBorder} transition-all duration-300  h-full transform-gpu `}>
                  
                  {/* Multi-layered glow effects */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.bgGradient} opacity-0 group-hover:opacity-60 transition-all duration-500`} />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Animated border shimmer */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 transform rotate-12" />
                  </div>

                  {/* Floating particles effect */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + (i % 2) * 40}%`,
                        }}
                        animate={{
                          y: [-10, -30, -10],
                          opacity: [0, 1, 0],
                          scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10">
                    <div className="mb-8 flex justify-center">
                      <motion.div
                      
                        className={`p-6 bg-gradient-to-br ${step.iconBg} rounded-2xl shadow-2xl  transition-all duration-300 hover:scale-105`}
                        
                      >
                        <Icon className="text-4xl text-white  transition-transform duration-200" />
                      </motion.div>
                    </div>

                    <motion.h3 
                      className={`text-2xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-4 `}
                      
                    >
                      {step.title}
                    </motion.h3>

                    <motion.p 
                      className="text-lg text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                   
                    >
                      {step.text}
                    </motion.p>
                  </div>

                  {/* Enhanced step number with pulsing animation */}
                  <motion.div 
                    className={`absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br ${step.iconBg} rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl`}
                    whileHover={{ 
                      scale: 1.10,
                      rotate: 360,
                      
                    }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(239, 68, 68, 0.4)",
                        "0 0 0 20px rgba(239, 68, 68, 0)",
                      ],
                    }}
                    transition={{
                      boxShadow: {
                        duration: 5,
                        repeat: Infinity,
                      },
                      scale: { duration: 0.9 },
                      rotate: { duration: 0.5 }
                    }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Progress indicator dots */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i <= index ? 'bg-red-600' : 'bg-gray-500'
                        }`}
                        animate={i <= index ? {
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5],
                        } : {}}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;