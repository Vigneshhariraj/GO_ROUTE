import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  AlertTriangle, MapPin, Phone, Share, Shield, ArrowLeft,
  Bell, User, Clock, CheckCircle, XCircle, Users, Ambulance,
  Activity, ShieldAlert
} from "lucide-react";
import useUserLocation from "@/hooks/useUserLocation"; // ✅ Import GPS Hook

const SOS = () => {
  const navigate = useNavigate();
  const { latitude, longitude, error } = useUserLocation(); // ✅ Use GPS Hook

  const [countdown, setCountdown] = useState<number | null>(null);
  const [sosActivated, setSosActivated] = useState(false);

  const [emergencyContact, setEmergencyContact] = useState({
    name: "Priya Sharma",
    relationship: "Wife",
    phone: "+91 98765 12345"
  });

  const emergencyNumbers = [
    { name: "Police", number: "100", icon: <ShieldAlert className="h-4 w-4" /> },
    { name: "Ambulance", number: "108", icon: <Ambulance className="h-4 w-4" /> },
    { name: "Fire Engine", number: "101", icon: <Activity className="h-4 w-4" /> },
    { name: "Women's Helpline", number: "1091", icon: <Users className="h-4 w-4" /> },
    { name: "GoRoute Helpline", number: "1800-123-4567", icon: <Phone className="h-4 w-4" /> }
  ];

  const startCountdown = () => {
    setCountdown(10);
    toast.warning("SOS will be activated in 10 seconds", {
      description: "Tap Cancel to stop the countdown",
      duration: 10000
    });
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setSosActivated(true);
      setCountdown(null);
      toast.error("SOS Activated", {
        description: "Emergency contacts have been notified"
      });
    }
  }, [countdown]);

  const cancelSOS = () => {
    setCountdown(null);
    toast.success("SOS Cancelled", {
      description: "Emergency alert has been cancelled"
    });
  };

  const deactivateSOS = () => {
    setSosActivated(false);
    toast.success("SOS Deactivated", {
      description: "Emergency mode has been turned off"
    });
  };

  const callEmergencyContact = () => {
    toast.info(`Calling ${emergencyContact.name}...`);
  };

  const notifyHelpline = () => {
    toast.info("GoRoute helpline has been notified");
  };

  const shareLocation = () => {
    if (latitude && longitude) {
      toast.success("Location Shared", {
        description: `Latitude: ${latitude.toFixed(5)}, Longitude: ${longitude.toFixed(5)}`
      });
    } else {
      toast.error("Location unavailable");
    }
  };

  const shareLocationWithGuardian = () => {
    if (latitude && longitude) {
      toast.success("Location shared with guardian", {
        description: `Latitude: ${latitude.toFixed(5)}, Longitude: ${longitude.toFixed(5)}`
      });
    } else {
      toast.error("Location unavailable");
    }
  };

  const callEmergencyNumber = (name: string, number: string) => {
    toast.info(`Calling ${name} at ${number}`);
  };

  return (
    <div className="go-container pb-10">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold ml-2">Emergency SOS</h1>
      </div>

      {/* ✅ Live Location */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-red-500 mt-1" />
            <div>
              <h3 className="font-medium">Your Current Location</h3>
              {latitude && longitude ? (
                <p className="text-sm text-muted-foreground">
                  📍 {latitude.toFixed(5)}, {longitude.toFixed(5)}
                </p>
              ) : error ? (
                <p className="text-sm text-red-500">Location error: {error}</p>
              ) : (
                <p className="text-sm text-muted-foreground">Locating...</p>
              )}
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-3 w-full"
            onClick={shareLocationWithGuardian}
          >
            <Share className="mr-2 h-4 w-4" />
            Share Location with Guardian
          </Button>
        </CardContent>
      </Card>

      {/* SOS Card */}
      <Card className={sosActivated ? "bg-red-50 dark:bg-red-950/20 border-red-300 mb-6" : "mb-6"}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            {sosActivated ? "SOS Activated" : "Emergency SOS"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sosActivated ? (
            <div className="space-y-4">
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-md text-red-800 dark:text-red-200">
                <p className="text-sm font-medium">Emergency mode is active</p>
                <p className="text-xs mt-1">
                  Your emergency contacts have been notified with your live location
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="bg-white dark:bg-gray-950" onClick={callEmergencyContact}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Contact
                </Button>
                <Button variant="outline" className="bg-white dark:bg-gray-950" onClick={notifyHelpline}>
                  <Bell className="mr-2 h-4 w-4" />
                  Notify Helpline
                </Button>
              </div>

              <Button className="w-full" onClick={shareLocation}>
                <Share className="mr-2 h-4 w-4" />
                Share Live Location
              </Button>

              <Button variant="destructive" className="w-full" onClick={deactivateSOS}>
                <XCircle className="mr-2 h-4 w-4" />
                Deactivate SOS
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Activating SOS will immediately notify your emergency contacts with your current location.
              </p>

              {countdown !== null ? (
                <div className="text-center py-2">
                  <div className="text-3xl font-bold text-red-600">{countdown}</div>
                  <p className="text-sm text-red-600">Seconds until SOS activation</p>

                  <Button variant="destructive" className="mt-4 w-full" onClick={cancelSOS}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button className="w-full bg-red-600 hover:bg-red-700" size="lg" onClick={startCountdown}>
                  <Shield className="mr-2 h-5 w-5" />
                  Activate SOS
                </Button>
              )}

              <div className="text-xs text-center text-muted-foreground">
                Press the button above in case of emergency
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emergency Contact Section */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4" />
            Emergency Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{emergencyContact.name}</h3>
              <Badge variant="outline" className="mt-1">{emergencyContact.relationship}</Badge>
            </div>
            <Button variant="outline" size="sm" className="gap-1" onClick={() => navigate("/profile")}>
              Edit <ArrowLeft className="h-3 w-3 rotate-180" />
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{emergencyContact.phone}</span>
            </div>
            <Button size="sm" onClick={callEmergencyContact}>
              Call Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Numbers Section */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Emergency Numbers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {emergencyNumbers.map((emergency, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {emergency.icon}
                <span>{emergency.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{emergency.number}</span>
                <Button size="sm" onClick={() => callEmergencyNumber(emergency.name, emergency.number)}>
                  Call
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SOS;
