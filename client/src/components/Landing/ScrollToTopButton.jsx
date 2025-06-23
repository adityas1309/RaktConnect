import React, { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);    //make button visible after scrolling
  const [scrollProgress, setScrollProgress] = useState(0);//use to fill the circle as per progress

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
      setShowButton(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fillPercentage = 1 - scrollProgress;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full overflow-hidden
        bg-white border border-red-500 flex items-center justify-center
        transition-all duration-300 ease-in-out
        ${showButton ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
        hover:scale-110 hover:shadow-xl hover:border-red-700 cursor-pointer
      `}
    >
      {/* Background Fill */}
      <div
        className="absolute inset-0 z-0 transition-all duration-300"
        style={{
          background: `linear-gradient(to top, red ${fillPercentage * 100}%, transparent ${fillPercentage * 100}%)`,
        }}
      ></div>

      {/* Drop Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 relative z-10 transition-all duration-300 group-hover:scale-110"
        fill={fillPercentage < 0.5 ? '#dc2626' : '#ffffff'}
        viewBox="0 0 24 24"
      >
        <path d="M12 2C8 8 6 11 6 14a6 6 0 0012 0c0-3-2-6-6-12z" />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
