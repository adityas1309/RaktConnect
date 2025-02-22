// components/Loader.js
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
    </div>
  );
};

export default Loader;