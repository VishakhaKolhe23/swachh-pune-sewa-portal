
import React from 'react';

const LogoHeader = () => {
  return (
    <div className="w-full bg-white shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto p-4">
        {/* Swachh Bharat Logo */}
        <div className="flex items-center mb-4 md:mb-0">
          <img 
            src="https://swachhbharatmission.gov.in/sbmcms/writereaddata/Images/logo.png" 
            alt="Swachh Bharat Logo" 
            className="h-14 md:h-16"
          />
        </div>
        
        {/* Center Text - Portal Name */}
        <div className="text-center mb-4 md:mb-0">
          <h1 className="text-xl md:text-2xl font-bold text-government-blue">
            Pune Municipal Corporation
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Waste Segregation Portal
          </p>
        </div>

        {/* Pune Municipal Corporation Logo */}
        <div className="flex items-center">
          <img 
            src="https://www.pmc.gov.in/sites/default/files/pmc-logo.png" 
            alt="Pune Municipal Corporation Logo" 
            className="h-14 md:h-16"
          />
        </div>
      </div>
      <div className="government-gradient h-2 w-full"></div>
    </div>
  );
};

export default LogoHeader;
