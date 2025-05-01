
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowUp, Scan, Map, MapPin, RotateCcw, AlertTriangle } from 'lucide-react';

interface ARNavigationViewProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentDirection: string;
  onScanQR: () => void;
  onViewMap: () => void;
  isOffRoute: boolean;
  onRecalculate: () => void;
  fromLocation: string;
  toLocation: string;
}

const ARNavigationView: React.FC<ARNavigationViewProps> = ({
  isOpen,
  onOpenChange,
  currentDirection,
  onScanQR,
  onViewMap,
  isOffRoute,
  onRecalculate,
  fromLocation,
  toLocation
}) => {
  // Image source will be loaded from the public directory
  const arBackgroundImage = "/lovable-uploads/4794c76d-76a5-4f14-8b19-f2e1488680b9.png";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full w-full h-[85vh] p-0 mx-0 sm:mx-0 rounded-lg overflow-hidden">
        <div className="relative h-full w-full">
          {/* Background image - the corridor/hallway */}
          <img 
            src={arBackgroundImage} 
            alt="Terminal Corridor" 
            className="w-full h-full object-cover"
          />
          
          {/* Top navigation bar */}
          <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-green-300" />
              <span>{fromLocation}</span>
              <ArrowUp className="h-5 w-5 rotate-90" />
              <span>{toLocation}</span>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="text-white border-white hover:bg-blue-700"
                onClick={onViewMap}
              >
                <Map className="h-4 w-4 mr-1" />
                Map
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-white border-white hover:bg-blue-700"
                onClick={onScanQR}
              >
                <Scan className="h-4 w-4 mr-1" />
                QR
              </Button>
            </div>
          </div>

          {/* Error popup if off route */}
          {isOffRoute && (
            <div className="absolute top-24 right-5 bg-white p-4 rounded-lg shadow-lg w-48">
              <div className="flex items-start mb-2">
                <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Oops! You're off route</p>
                  <p className="text-sm text-muted-foreground">Need a new path?</p>
                </div>
              </div>
              <Button 
                size="sm" 
                className="w-full" 
                onClick={onRecalculate}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Recalculate
              </Button>
            </div>
          )}

          {/* Direction indicator arrow - only shown when not off route */}
          {!isOffRoute && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ArrowUp className="h-32 w-32 text-blue-500 filter drop-shadow-lg" />
            </div>
          )}

          {/* Bottom instruction bar */}
          <div className="absolute bottom-10 left-5 right-5">
            <div className="bg-black/70 text-white p-4 rounded-lg text-center">
              <p className="text-xl font-medium">{currentDirection}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ARNavigationView;
