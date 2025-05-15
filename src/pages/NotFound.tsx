
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import LogoHeader from "../components/LogoHeader";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <LogoHeader />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center p-6">
          <h1 className="text-6xl font-bold text-government-primary mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
          <p className="text-gray-500 mb-8">
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>
          <Button asChild className="bg-government-secondary hover:bg-government-secondary/90">
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
