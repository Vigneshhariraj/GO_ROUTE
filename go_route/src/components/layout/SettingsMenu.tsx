
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Moon,
  Sun,
  Bell,
  Globe,
  Info,
  Mail,
  Phone,
  MessageSquare,
  LogOut,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from "@/hooks/useLanguage";

interface SettingsMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsMenu = ({ open, onOpenChange }: SettingsMenuProps) => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  
  const [notificationSettings, setNotificationSettings] = useState({
    busArrival: true,
    seatAvailability: true,
    bookingConfirmations: true,
    promotional: false,
  });
  
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  
  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  const handleNotificationChange = (key: string, checked: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: checked,
    }));
  };
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };
  
  const handleLogout = () => {
    onOpenChange(false);
    navigate("/login");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Settings</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="appearance" className="mt-4">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="help">Help & Support</TabsTrigger>
            </TabsList>
            
            
            <TabsContent value="appearance" className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                  </div>
                  <Switch 
                    id="dark-mode" 
                    checked={theme === "dark"}
                    onCheckedChange={handleThemeToggle}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className={`aspect-video rounded-md border ${theme === "light" ? "border-accent" : "border-muted"} overflow-hidden cursor-pointer`} onClick={() => setTheme("light")}>
                    <div className="bg-background h-1/2 border-b border-muted flex items-center justify-center">
                      <span className="text-xs text-foreground">Light</span>
                    </div>
                    <div className="bg-white h-1/2 flex items-center justify-center">
                      <span className="text-xs text-black">Preview</span>
                    </div>
                  </div>
                  
                  <div className={`aspect-video rounded-md border ${theme === "dark" ? "border-accent" : "border-muted"} overflow-hidden cursor-pointer`} onClick={() => setTheme("dark")}>
                    <div className="bg-black h-1/2 border-b border-gray-800 flex items-center justify-center">
                      <span className="text-xs text-white">Dark</span>
                    </div>
                    <div className="bg-gray-900 h-1/2 flex items-center justify-center">
                      <span className="text-xs text-gray-200">Preview</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Globe className="h-5 w-5" />
                  <h3 className="font-medium">Select Language</h3>
                </div>
                
                <RadioGroup value={language} onValueChange={handleLanguageChange} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="en" id="en" />
                    <Label htmlFor="en">English (Default)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ta" id="ta" />
                    <Label htmlFor="ta">தமிழ் (Tamil)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hi" id="hi" />
                    <Label htmlFor="hi">हिंदी (Hindi)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="te" id="te" disabled />
                    <Label htmlFor="te" className="text-muted-foreground">తెలుగు (Telugu) - Coming Soon</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kn" id="kn" disabled />
                    <Label htmlFor="kn" className="text-muted-foreground">ಕನ್ನಡ (Kannada) - Coming Soon</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ml" id="ml" disabled />
                    <Label htmlFor="ml" className="text-muted-foreground">മലയാളം (Malayalam) - Coming Soon</Label>
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>
            
            <TabsContent value="preferences" className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Bell className="h-5 w-5" />
                  <h3 className="font-medium">Notification Settings</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="bus-arrival" 
                      checked={notificationSettings.busArrival}
                      onCheckedChange={(checked) => 
                        handleNotificationChange("busArrival", checked as boolean)
                      }
                    />
                    <Label htmlFor="bus-arrival">Bus Arrival Alerts</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="seat-availability" 
                      checked={notificationSettings.seatAvailability}
                      onCheckedChange={(checked) => 
                        handleNotificationChange("seatAvailability", checked as boolean)
                      }
                    />
                    <Label htmlFor="seat-availability">Seat Availability Updates</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="booking-confirmations" 
                      checked={notificationSettings.bookingConfirmations}
                      onCheckedChange={(checked) => 
                        handleNotificationChange("bookingConfirmations", checked as boolean)
                      }
                    />
                    <Label htmlFor="booking-confirmations">Booking Confirmations</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="promotional" 
                      checked={notificationSettings.promotional}
                      onCheckedChange={(checked) => 
                        handleNotificationChange("promotional", checked as boolean)
                      }
                    />
                    <Label htmlFor="promotional">Promotional Updates</Label>
                  </div>
                </div>
                
                <Button className="w-full mt-2">Save Preferences</Button>
              </div>
              
              {/* Emergency Contact / SOS */}
              <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                <div className="flex items-center space-x-3 mb-1">
                  <ShieldAlert className="h-5 w-5 text-destructive" />
                  <h3 className="font-medium">Emergency Contact / SOS</h3>
                </div>
                
                <p className="text-sm text-muted-foreground">Configure emergency contacts and quick access to SOS features</p>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    onOpenChange(false);
                    navigate("/sos");
                  }}
                >
                  Manage Emergency Settings
                </Button>
              </div>
              
              {/* Logout */}
              <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                <div className="flex items-center space-x-3 mb-1">
                  <LogOut className="h-5 w-5 text-destructive" />
                  <h3 className="font-medium text-destructive">Logout</h3>
                </div>
                
                <p className="text-sm text-muted-foreground">Sign out from your account</p>
                
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={() => setLogoutDialogOpen(true)}
                >
                  Logout
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="help" className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                <div className="flex items-center space-x-3 mb-1">
                  <Info className="h-5 w-5" />
                  <h3 className="font-medium">How GoRoute Works</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="bg-accent/20 p-1.5 rounded-full mt-0.5">
                      <HelpCircle className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Multi-modal journey planner</p>
                      <p className="text-xs text-muted-foreground">Plan journeys using multiple modes of transport</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="bg-accent/20 p-1.5 rounded-full mt-0.5">
                      <HelpCircle className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Track buses live</p>
                      <p className="text-xs text-muted-foreground">See real-time locations of buses on the map</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="bg-accent/20 p-1.5 rounded-full mt-0.5">
                      <HelpCircle className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Indoor navigation in terminals</p>
                      <p className="text-xs text-muted-foreground">Find your way inside bus terminals</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="bg-accent/20 p-1.5 rounded-full mt-0.5">
                      <HelpCircle className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Book route or city bus tickets</p>
                      <p className="text-xs text-muted-foreground">Reserve seats in advance</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="bg-accent/20 p-1.5 rounded-full mt-0.5">
                      <HelpCircle className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Smart "Wake Me Up" alerts</p>
                      <p className="text-xs text-muted-foreground">Get notified before your stop arrives</p>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Watch Demo Video
                </Button>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                <div className="flex items-center space-x-3 mb-1">
                  <Phone className="h-5 w-5" />
                  <h3 className="font-medium">Contact Support</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">Email: support@goroute.in</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">Call: +91 98765 43210</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">Chat with Assistant</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      onOpenChange(false);
                      navigate("/chatbot");
                    }}
                  >
                    Open Chatbot
                  </Button>
                  <Button>Submit a Query</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      {logoutDialogOpen && (
        <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <LogOut className="h-5 w-5 text-destructive" />
                Are you sure you want to log out?
              </DialogTitle>
            </DialogHeader>
            
            <p className="text-sm text-muted-foreground mt-2">
              ⚠️ You will need to re-login with OTP
            </p>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setLogoutDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default SettingsMenu;
