import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { CityBusBusCard } from "./CityBusBusCard";

interface CityBusBusListProps {
  buses: {
    id: number;
    number: string;
    route: string;
    arrivalTime: string;
    nextBus: string;
    crowdLevel: string;
    cost: string;
    distance: string;
    estimatedTime: string;
  }[];
  fromLocation: string;
  toLocation: string;
  onWakeMeUp: (busNumber: string) => void;
  onTrackBus: (busNumber: string) => void;
  getCrowdBadge: (level: string) => React.ReactNode;
  getCrowdBarColor: (level: string) => string;
  getCrowdBarWidth: (level: string) => string;
  trackButtonLabel: string; 
}

export function CityBusBusList({
  buses,
  fromLocation,
  toLocation,
  onWakeMeUp,
  onTrackBus,
  getCrowdBadge,
  getCrowdBarColor,
  getCrowdBarWidth,
  trackButtonLabel, 
}: CityBusBusListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Buses from {fromLocation} to {toLocation}
        </h2>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <RefreshCw className="mr-2 h-4 w-4" />
          {trackButtonLabel} 
        </Button>
      </div>
      {buses.map((bus) => (
        <CityBusBusCard
          key={bus.id}
          bus={bus}
          onWakeMeUp={onWakeMeUp}
          onTrackBus={onTrackBus}
          getCrowdBadge={getCrowdBadge}
          getCrowdBarColor={getCrowdBarColor}
          getCrowdBarWidth={getCrowdBarWidth}
        />
      ))}
    </div>
  );
}
