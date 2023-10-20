import React from 'react';

const AnimatedReceiptWaitingIndicator = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="loader ease-linear rounded-full border-t-4 border-gray-200 h-12 w-12 mb-4 animate-spin"></div>
      <p className="text-white">Generating Receipt...</p>
    </div>
  );
};

export default AnimatedReceiptWaitingIndicator;
