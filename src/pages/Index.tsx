
import React, { useState } from 'react';
import LogoHeader from '../components/LogoHeader';
import Footer from '../components/Footer';
import AreaLogin from '../components/AreaLogin';
import Dashboard from '../components/Dashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (areaId: string, password: string) => {
    // In a real application, this would validate credentials against a backend
    // For now, we'll accept any non-empty credentials
    if (areaId && password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LogoHeader />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {!isLoggedIn ? (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-government-blue mb-2">
                  Pune Waste Segregation Portal
                </h1>
                <p className="text-gray-600">
                  Manage and monitor waste segregation activities across Pune municipal areas
                </p>
              </div>
              
              <div className="mb-8">
                <img
                  src="https://swachhbharat.mygov.in/sites/default/files/slider_sbm.jpg"
                  alt="Swachh Bharat Initiative"
                  className="w-full rounded-lg shadow-md"
                />
              </div>
              
              <AreaLogin onLogin={handleLogin} />
            </div>
          ) : (
            <Dashboard />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
