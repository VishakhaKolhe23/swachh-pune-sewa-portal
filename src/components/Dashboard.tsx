
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, HelpCircle, ListTodo, MapPin, PieChart } from "lucide-react";

// Area type definition
interface Area {
  id: string;
  name: string;
  wasteData: {
    wet: number;
    dry: number;
    hazardous: number;
    recycled: number;
  };
}

// Mock data for areas
const MOCK_AREAS: Area[] = [
  {
    id: "area001",
    name: "Shivajinagar",
    wasteData: { wet: 35, dry: 30, hazardous: 5, recycled: 30 }
  },
  {
    id: "area002",
    name: "Kothrud",
    wasteData: { wet: 40, dry: 25, hazardous: 10, recycled: 25 }
  },
  {
    id: "area003",
    name: "Aundh",
    wasteData: { wet: 30, dry: 35, hazardous: 5, recycled: 30 }
  }
];

const Dashboard = () => {
  const [areas, setAreas] = useState<Area[]>(MOCK_AREAS);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [newAreaName, setNewAreaName] = useState("");
  const { toast } = useToast();

  // Function to add a new area
  const handleAddArea = () => {
    if (!newAreaName.trim()) {
      toast({
        title: "Error",
        description: "Please enter an area name",
        variant: "destructive"
      });
      return;
    }

    const newArea: Area = {
      id: `area${Math.floor(Math.random() * 1000)}`,
      name: newAreaName,
      wasteData: {
        wet: 25,
        dry: 25,
        hazardous: 25,
        recycled: 25
      }
    };

    setAreas([...areas, newArea]);
    setNewAreaName("");
    
    toast({
      title: "Success",
      description: `Area "${newAreaName}" has been added successfully`,
    });
  };

  // Function to select an area
  const handleSelectArea = (area: Area) => {
    setSelectedArea(area);
  };

  // Function to create a survey response
  const handleSubmitSurvey = () => {
    toast({
      title: "Survey Submitted",
      description: "Thank you for your feedback! You've earned 50 reward points.",
    });
  };

  // Function to submit a support request
  const handleSubmitSupport = () => {
    toast({
      title: "Support Request Received",
      description: "We will get back to you within 24 hours.",
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Tabs defaultValue="areas" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="areas" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Areas</span>
          </TabsTrigger>
          <TabsTrigger value="statistics" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span>Statistics</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            <span>Support</span>
          </TabsTrigger>
          <TabsTrigger value="survey" className="flex items-center gap-2">
            <ListTodo className="h-4 w-4" />
            <span>Survey</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="areas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Areas</CardTitle>
              <CardDescription>View existing areas or add a new one</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {areas.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {areas.map(area => (
                      <Card
                        key={area.id}
                        className={`cursor-pointer hover:border-government-primary transition-colors ${
                          selectedArea?.id === area.id ? 'border-government-primary' : ''
                        }`}
                        onClick={() => handleSelectArea(area)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{area.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-500">ID: {area.id}</p>
                          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                            <div>Wet: {area.wasteData.wet}%</div>
                            <div>Dry: {area.wasteData.dry}%</div>
                            <div>Hazardous: {area.wasteData.hazardous}%</div>
                            <div>Recycled: {area.wasteData.recycled}%</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No areas found. Add your first area below.</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Input
                    placeholder="Enter new area name"
                    value={newAreaName}
                    onChange={(e) => setNewAreaName(e.target.value)}
                  />
                  <Button 
                    onClick={handleAddArea}
                    className="bg-government-secondary hover:bg-government-secondary/90"
                  >
                    Add Area
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {selectedArea && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedArea.name} - Waste Segregation</CardTitle>
                <CardDescription>Current waste segregation statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium">Wet Waste</h3>
                      <div className="h-4 w-full bg-gray-200 rounded-full mt-2">
                        <div
                          className="h-4 bg-green-500 rounded-full"
                          style={{ width: `${selectedArea.wasteData.wet}%` }}
                        ></div>
                      </div>
                      <p className="text-sm mt-1">{selectedArea.wasteData.wet}%</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Dry Waste</h3>
                      <div className="h-4 w-full bg-gray-200 rounded-full mt-2">
                        <div
                          className="h-4 bg-yellow-500 rounded-full"
                          style={{ width: `${selectedArea.wasteData.dry}%` }}
                        ></div>
                      </div>
                      <p className="text-sm mt-1">{selectedArea.wasteData.dry}%</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Hazardous Waste</h3>
                      <div className="h-4 w-full bg-gray-200 rounded-full mt-2">
                        <div
                          className="h-4 bg-red-500 rounded-full"
                          style={{ width: `${selectedArea.wasteData.hazardous}%` }}
                        ></div>
                      </div>
                      <p className="text-sm mt-1">{selectedArea.wasteData.hazardous}%</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Recycled Waste</h3>
                      <div className="h-4 w-full bg-gray-200 rounded-full mt-2">
                        <div
                          className="h-4 bg-blue-500 rounded-full"
                          style={{ width: `${selectedArea.wasteData.recycled}%` }}
                        ></div>
                      </div>
                      <p className="text-sm mt-1">{selectedArea.wasteData.recycled}%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="statistics">
          <Card>
            <CardHeader>
              <CardTitle>Overall Waste Statistics</CardTitle>
              <CardDescription>City-wide waste segregation performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium text-lg mb-4">Waste Type Distribution</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Wet Waste</span>
                          <span>35%</span>
                        </div>
                        <div className="h-3 w-full bg-gray-200 rounded-full">
                          <div className="h-3 bg-green-500 rounded-full" style={{ width: "35%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Dry Waste</span>
                          <span>30%</span>
                        </div>
                        <div className="h-3 w-full bg-gray-200 rounded-full">
                          <div className="h-3 bg-yellow-500 rounded-full" style={{ width: "30%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Hazardous Waste</span>
                          <span>5%</span>
                        </div>
                        <div className="h-3 w-full bg-gray-200 rounded-full">
                          <div className="h-3 bg-red-500 rounded-full" style={{ width: "5%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Recycled Waste</span>
                          <span>30%</span>
                        </div>
                        <div className="h-3 w-full bg-gray-200 rounded-full">
                          <div className="h-3 bg-blue-500 rounded-full" style={{ width: "30%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-4">Monthly Progress</h3>
                    <div className="p-4 bg-gray-50 rounded-lg border">
                      <p className="text-center text-gray-500 py-12">
                        Interactive chart will be available in the next version
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">25%</CardTitle>
                      <CardDescription>Improvement in segregation</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">15 tons</CardTitle>
                      <CardDescription>Waste processed daily</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">85%</CardTitle>
                      <CardDescription>Citizen participation</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support">
          <Card>
            <CardHeader>
              <CardTitle>Customer Support</CardTitle>
              <CardDescription>Get help with waste segregation or report issues</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="issue" className="text-sm font-medium">
                    Issue Type
                  </label>
                  <select
                    id="issue"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="">Select an issue type</option>
                    <option value="collection">Waste Collection</option>
                    <option value="segregation">Segregation Guidance</option>
                    <option value="technical">Technical Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    placeholder="Describe your issue in detail"
                  ></textarea>
                </div>
                <Button 
                  type="button" 
                  onClick={handleSubmitSupport}
                  className="bg-government-secondary hover:bg-government-secondary/90"
                >
                  Submit Request
                </Button>
              </form>
              
              <div className="mt-8 border-t pt-6">
                <h3 className="font-medium text-lg mb-4">Emergency Contacts</h3>
                <div className="space-y-2">
                  <p><strong>Helpline:</strong> 1800-123-4567</p>
                  <p><strong>Email:</strong> waste.support@punecorp.gov.in</p>
                  <p><strong>Hours:</strong> Monday to Saturday, 9 AM to 6 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="survey">
          <Card>
            <CardHeader>
              <CardTitle>Waste Segregation Survey</CardTitle>
              <CardDescription>
                Complete this survey to help us improve and earn reward points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">1. How often do you segregate waste at home?</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="radio" id="q1-a" name="q1" className="mr-2" />
                      <label htmlFor="q1-a">Always</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="q1-b" name="q1" className="mr-2" />
                      <label htmlFor="q1-b">Most of the time</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="q1-c" name="q1" className="mr-2" />
                      <label htmlFor="q1-c">Sometimes</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="q1-d" name="q1" className="mr-2" />
                      <label htmlFor="q1-d">Rarely</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="q1-e" name="q1" className="mr-2" />
                      <label htmlFor="q1-e">Never</label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">2. What challenges do you face with waste segregation?</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="q2-a" name="q2-a" className="mr-2" />
                      <label htmlFor="q2-a">Lack of space for multiple bins</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="q2-b" name="q2-b" className="mr-2" />
                      <label htmlFor="q2-b">Confusion about what goes where</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="q2-c" name="q2-c" className="mr-2" />
                      <label htmlFor="q2-c">Irregular collection schedule</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="q2-d" name="q2-d" className="mr-2" />
                      <label htmlFor="q2-d">Time-consuming process</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="q2-e" name="q2-e" className="mr-2" />
                      <label htmlFor="q2-e">Other</label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">3. How satisfied are you with the current waste collection system?</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="radio" id="q3-a" name="q3" className="mr-2" />
                      <label htmlFor="q3-a">Very satisfied</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="q3-b" name="q3" className="mr-2" />
                      <label htmlFor="q3-b">Satisfied</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="q3-c" name="q3" className="mr-2" />
                      <label htmlFor="q3-c">Neutral</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="q3-d" name="q3" className="mr-2" />
                      <label htmlFor="q3-d">Dissatisfied</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="q3-e" name="q3" className="mr-2" />
                      <label htmlFor="q3-e">Very dissatisfied</label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="suggestions" className="font-medium">
                    4. Do you have any suggestions to improve waste management in your area?
                  </label>
                  <textarea
                    id="suggestions"
                    rows={3}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    placeholder="Enter your suggestions here"
                  ></textarea>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 text-government-secondary mb-4">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Earn 50 reward points by submitting this survey!</span>
                  </div>
                  <Button 
                    type="button" 
                    onClick={handleSubmitSurvey}
                    className="bg-government-secondary hover:bg-government-secondary/90"
                  >
                    Submit Survey
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
