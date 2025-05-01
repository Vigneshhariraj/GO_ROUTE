
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode, Camera, HelpCircle } from 'lucide-react';

interface QRScannerProps {
  isOpen: boolean;
  isScanning: boolean;
  onOpenChange: (open: boolean) => void;
  onScanComplete: () => void;
  title?: string;
  description?: string;
  isCheckpoint?: boolean;
}

const QRScanner: React.FC<QRScannerProps> = ({
  isOpen,
  isScanning,
  onOpenChange,
  onScanComplete,
  title = "Scan QR Code",
  description = "Position the QR code in the frame to scan",
  isCheckpoint = false
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-center">
          <div className="w-64 h-64 border-2 border-dashed border-accent/50 rounded-lg flex items-center justify-center bg-black/5 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {isScanning ? (
                <div className="animate-pulse">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <path 
                      d="M25,25 L25,35 L35,35 L35,25 L25,25 Z M65,25 L65,35 L75,35 L75,25 L65,25 Z M25,65 L25,75 L35,75 L35,65 L25,65 Z M65,65 L65,75 L75,75 L75,65 L65,65 Z" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      className="text-accent"
                    />
                    <path 
                      d="M25,25 L75,25 M25,75 L75,75 M25,25 L25,75 M75,25 L75,75" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeDasharray="5,5"
                      className="text-accent/50"
                    />
                  </svg>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center px-4">
                  <Camera className="h-12 w-12 text-muted-foreground mb-2" />
                  <div className="text-sm text-muted-foreground">Camera preview would appear here</div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground text-center mb-4">
          {isCheckpoint ? 
            "Scan the checkpoint QR code to confirm you're on the right path" : 
            "Scan the QR code at the terminal entrance to confirm your location"}
        </div>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={onScanComplete}
            disabled={isScanning}
          >
            {isScanning ? "Scanning..." : "Scan"}
          </Button>
        </div>
        
        <div className="flex justify-center mt-2">
          <Button variant="link" size="sm" className="text-xs text-muted-foreground">
            <HelpCircle className="h-3 w-3 mr-1" />
            Can't find the QR? Ask terminal staff
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRScanner;
