
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface AreaLoginProps {
  onLogin: (areaId: string, password: string) => void;
}

const AreaLogin: React.FC<AreaLoginProps> = ({ onLogin }) => {
  const [areaId, setAreaId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!areaId.trim() || !password.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter both Area ID and Password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      onLogin(areaId, password);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-government-primary border-t-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Area Login</CardTitle>
          <CardDescription className="text-center">
            Enter your area credentials to access the waste segregation portal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="areaId" className="text-sm font-medium">
                  Area ID
                </label>
                <Input
                  id="areaId"
                  placeholder="Enter your area ID"
                  value={areaId}
                  onChange={(e) => setAreaId(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-government-secondary hover:bg-government-secondary/90"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-500">
            <span>Don't have an area account? </span>
            <a href="#" className="text-government-blue hover:underline">
              Contact administrator
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AreaLogin;
