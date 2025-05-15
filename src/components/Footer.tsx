
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="government-gradient h-2 w-full"></div>
      <div className="bg-government-blue text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Government Symbol */}
            <div className="flex flex-col items-center md:items-start">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                alt="Government of India Emblem" 
                className="h-16 mb-2"
              />
              <p className="text-sm text-center md:text-left">Government of India</p>
            </div>
            
            {/* Swachh Bharat Mission */}
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg font-semibold mb-2">"Swachh Bharat, Swasth Bharat"</p>
              <p className="text-sm text-center">
                Clean India, Healthy India
              </p>
            </div>
            
            {/* Contact Information */}
            <div className="flex flex-col items-center md:items-end">
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p className="text-sm text-center md:text-right">
                Pune Municipal Corporation<br />
                Shivajinagar, Pune - 411005<br />
                Maharashtra, India
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} Pune Municipal Corporation. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
