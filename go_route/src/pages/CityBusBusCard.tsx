
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Users, Clock, RefreshCw } from "lucide-react";

interface CityBusBusCardProps {
  bus: {
    id: number;
    number: string;
    route: string;
    arrivalTime: string;
    nextBus: string;
    crowdLevel: string;
    cost: string;
    distance: string;
    estimatedTime: string;
  };
  onWakeMeUp: (busNumber: string) => void;
  onTrackBus: (busNumber: string) => void;
  getCrowdBadge: (level: string) => React.ReactNode;
  getCrowdBarColor: (level: string) => string;
  getCrowdBarWidth: (level: string) => string;
}

export function CityBusBusCard({
  bus,
  onWakeMeUp,
  onTrackBus,
  getCrowdBadge,
  getCrowdBarColor,
  getCrowdBarWidth,
}: CityBusBusCardProps) {
  return (
    <Card 
      className={`go-card-hover overflow-hidden ${
        bus.crowdLevel === "low" 
          ? "border-green-200 bg-green-50/30 dark:bg-green-950/10" 
          : bus.crowdLevel === "medium" 
          ? "border-orange-200 bg-orange-50/30 dark:bg-orange-950/10" 
          : "border-red-200 bg-red-50/30 dark:bg-red-950/10"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-2 py-1 bg-accent text-white">
                {bus.number}
              </Badge>
              <h3 className="font-medium">{bus.route}</h3>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Cost:</span>
                <div className="font-medium">{bus.cost}</div>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Distance:</span>
                <div className="font-medium">{bus.distance}</div>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Time:</span>
                <div className="font-medium">{bus.estimatedTime}</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Next: {bus.nextBus}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-lg font-semibold text-green-600">
              <Clock className="h-4 w-4" />
              {bus.arrivalTime}
            </div>
            {getCrowdBadge(bus.crowdLevel)}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="h-2 bg-muted rounded-full w-32 overflow-hidden">
              <div 
                className={`h-full rounded-full ${getCrowdBarColor(bus.crowdLevel)}`}
                style={{ width: getCrowdBarWidth(bus.crowdLevel) }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{bus.crowdLevel} crowd</span>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor={`wake-me-${bus.id}`} className="text-sm">
              Wake Me Up
            </label>
            <Switch
              id={`wake-me-${bus.id}`}
              onCheckedChange={() => onWakeMeUp(bus.number)}
            />
            <Button 
              size="sm" 
              variant="outline" 
              className="ml-2"
              onClick={() => onTrackBus(bus.number)}
            >
              Track
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
