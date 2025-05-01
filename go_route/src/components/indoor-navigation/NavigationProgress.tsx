
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QrCode, Check } from 'lucide-react';
import type { StopDetails } from '@/types/bus-route';
import NavigationMap from './NavigationMap';

interface NavigationProgressProps {
  currentCheckpoint: string;
  navigationProgress: number;
  onScanCheckpoint: () => void;
  onComplete: () => void;
  stops: StopDetails[];
}

const NavigationProgress: React.FC<NavigationProgressProps> = ({
  currentCheckpoint,
  navigationProgress,
  onScanCheckpoint,
  onComplete,
  stops
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-0">
        <NavigationMap 
          currentCheckpoint={currentCheckpoint}
          navigationProgress={navigationProgress}
          stops={stops}
        />
        
        <div className="p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm">{navigationProgress}%</span>
          </div>
          <Progress value={navigationProgress} className="mb-2" />
          
          <div className="flex gap-2">
            {navigationProgress < 99 ? (
              <>
                <Button variant="outline" className="flex-1" onClick={onScanCheckpoint}>
                  <QrCode className="h-4 w-4 mr-2" />
                  Scan Checkpoint
                </Button>
                <Button 
                  className="flex-1 bg-accent hover:bg-accent/90" 
                  onClick={onComplete}
                >
                  Skip to End
                </Button>
              </>
            ) : (
              <Button 
                className="w-full bg-green-600 hover:bg-green-700" 
                onClick={onComplete}
              >
                <Check className="h-4 w-4 mr-2" />
                Complete Navigation
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NavigationProgress;
