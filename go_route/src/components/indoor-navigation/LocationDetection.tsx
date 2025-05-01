
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Locate, Check, Bus, ArrowRight } from 'lucide-react';
import { toast } from "sonner";

interface LocationDetectionProps {
  detectedLocation: string;
  busInfo: {
    number: string;
    destination: string;
    time: string;
  } | null;
  destinationBay: string;
  onChangeLocation: () => void;
  onStartNavigation: () => void;
}

const LocationDetection: React.FC<LocationDetectionProps> = ({
  detectedLocation,
  busInfo,
  destinationBay,
  onChangeLocation,
  onStartNavigation
}) => {
  return (
    <Card className="bg-accent/10 border-accent/20 mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="p-3 bg-accent/20 rounded-full mr-3">
              <MapPin className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-medium">Current Location</h3>
              <p className="text-sm text-muted-foreground">Auto-detected based on device</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onChangeLocation}>
            Change
          </Button>
        </div>
        
        <div className="bg-background/80 border rounded-lg p-4">
          <div className="flex items-center">
            <Locate className="h-4 w-4 text-accent mr-2" />
            <span className="font-medium">{detectedLocation}</span>
          </div>
        </div>
        
        {busInfo && (
          <div className="mt-6 bg-accent/5 border border-accent/10 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-green-100 rounded-full mr-2">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <h3 className="font-medium">Bus Booking Detected</h3>
            </div>
            
            <div className="text-sm mb-3">
              Your bus departs from this terminal. Need help getting to your bus bay?
            </div>
            
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Bus Number</span>
                <span className="font-medium">{busInfo.number}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Destination</span>
                <span className="font-medium">{busInfo.destination}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Departure Time</span>
                <span className="font-medium">{busInfo.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Departure Bay</span>
                <span className="font-medium">{destinationBay}</span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1" onClick={() => toast("Enjoy your journey!")}>
                No, I know the way
              </Button>
              <Button 
                className="flex-1 bg-accent hover:bg-accent/90" 
                onClick={onStartNavigation}
              >
                Yes, guide me
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationDetection;
