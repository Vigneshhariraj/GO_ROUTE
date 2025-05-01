import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Bus, Car, Navigation, Train } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RouteDetailsProps {
  segments: Array<{
    mode: string;
    description: string;
    fare: number;
    time: number;
    color: string;
  }>;
  totalFare: number;
  totalTime: number;
  onStartJourney: () => void;
}

const RouteDetails: React.FC<RouteDetailsProps> = ({
  segments,
  totalFare,
  totalTime,
  onStartJourney,
}) => {
  const getIcon = (mode: string) => {
    switch (mode) {
      case "walk":
        return <User size={16} className="text-gray-500" />;
      case "bus":
        return <Bus size={16} className="text-gray-500" />;
      case "auto":
        return <Car size={16} className="text-gray-500" />;
      case "metro":
        return <Train size={16} className="text-gray-500" />;
      default:
        return <Navigation size={16} className="text-gray-500" />;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6 space-y-4">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge className={segment.color}>
                {getIcon(segment.mode)}
                <span className="ml-1 capitalize">{segment.mode}</span>
              </Badge>
              <span className="text-sm text-muted-foreground">
                {segment.description}
              </span>
            </div>
            <div className="text-sm font-medium">₹{segment.fare}</div>
          </div>
        ))}

        <div className="pt-4 border-t">
          <div className="flex justify-between mb-4">
            <div className="text-sm text-muted-foreground">Total Fare:</div>
            <div className="font-semibold">₹{totalFare}</div>
          </div>
          <div className="flex justify-between mb-6">
            <div className="text-sm text-muted-foreground">Total Time:</div>
            <div className="font-semibold">{totalTime} mins</div>
          </div>

          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            onClick={onStartJourney}
          >
            <Navigation className="mr-2 h-4 w-4" />
            Start Journey
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteDetails;
