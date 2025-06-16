import React, { useState } from "react";
import HeroSection from "./HeroSection";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Footer from "./Footer";
import Loader from "./Loader";

const LandingPage = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="font-sans bg-gray-50">
      {!isVideoLoaded && <Loader />}
      <HeroSection onVideoLoaded={() => setIsVideoLoaded(true)} />
      <Features />
      <HowItWorks />
 
    </div>
  );
};

export default LandingPage;