import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import PageMeta from "../common/PageMeta";
const HeroSection = ({ onVideoLoaded }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => {
        onVideoLoaded();
      };

      video.addEventListener("canplay", handleCanPlay);
      
      // Check if video is already ready
      if (video.readyState >= 4) { 
        onVideoLoaded();
      }

      return () => {
        video.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, [onVideoLoaded]);

  return (
    <>
    <PageMeta title="HeroSection | RaktConnect" />

    <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Video Background with overlay */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        >
          <source src="/vid1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-6xl px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
            Save Lives,
          </span>
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-gray-100 font-bold"
          >
            One Donation at a Time
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Bridging the gap between compassionate donors and life-saving needs.
          Join our network to make blood availability instant and effortless.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            to="/login"
            className="bg-red-700  hover:shadow-red-950 hover:bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-110 shadow-xs"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="border-2 border-red-500 text-red-100 hover:bg-red-500/40 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-110"
          >
            Learn More
          </Link>
        </motion.div>

        {/* Animated pulse circle */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 w-64 h-64 border-4 border-red-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>

      {/* Scrolling indicator */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-gray-200 text-sm mb-2">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-red-500 rounded-full">
          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mx-auto" />
        </div>
      </motion.div>
    </section>
    </>
  );
};

export default HeroSection;