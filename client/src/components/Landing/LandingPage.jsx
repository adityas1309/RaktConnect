import React, { useState } from "react";
import Footer from "./footer";
import HeroSection from "./HeroSection";

const LandingPage = () => {
  return (
    <div className="font-sans bg-gray-50">
      <HeroSection />
      <Footer />
    </div>
  )
}

export default LandingPage