
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircleCheck, Bell, Navigation, Check } from 'lucide-react';
import { toast } from "sonner";

interface NavigationCompleteProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  busInfo: {
    number: string;
    destination: string;
    time: string;
  } | null;
  onReset: () => void;
}

const NavigationComplete: React.FC<NavigationCompleteProps> = ({
  isOpen,
  onOpenChange,
  busInfo,
  onReset
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CircleCheck className="h-5 w-5 text-green-600" />
            You've Arrived!
          </DialogTitle>
          <DialogDescription>
            You've successfully reached your destination
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-4 bg-accent/5 rounded-lg mb-4">
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Bus Number</span>
              <span className="font-medium">{busInfo?.number}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Destination</span>
              <span className="font-medium">{busInfo?.destination}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Departure</span>
              <span className="font-medium">{busInfo?.time}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => {
              onOpenChange(false);
              toast.success("We'll alert you before your bus arrives");
            }}
          >
            <Bell className="h-4 w-4 mr-2" />
            Wake Me Up Before Bus Arrives
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => {
              onOpenChange(false);
              onReset();
              toast("Starting a new navigation session");
            }}
          >
            <Navigation className="h-4 w-4 mr-2" />
            Start New Navigation
          </Button>
          
          <Button 
            className="w-full" 
            onClick={() => {
              onOpenChange(false);
              onReset();
              toast("Have a safe journey!");
            }}
          >
            <Check className="h-4 w-4 mr-2" />
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NavigationComplete;
