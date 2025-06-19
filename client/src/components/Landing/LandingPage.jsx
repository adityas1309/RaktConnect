import React, { useState } from "react";
import HeroSection from "./HeroSection";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Footer from "./Footer";
import Loader from "./Loader";

const LandingPage = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div
      className="font-sans"
      style={{ background: "var(--bg-main)", color: "var(--text-main)" }}
    >
      {!isVideoLoaded && <Loader />}
      <HeroSection onVideoLoaded={() => setIsVideoLoaded(true)} />
      <Features />
      <HowItWorks />
      {/* Uncomment the following if you want the footer on the landing page */}
      {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;