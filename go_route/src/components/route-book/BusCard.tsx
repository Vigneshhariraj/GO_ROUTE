
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Wifi, Coffee, Users, Star, Bell, Route
} from "lucide-react";
import type { BusData } from "@/types/bus-route";
import React from "react";

interface BusCardProps {
  bus: BusData;
  onBookNow: (bus: BusData) => void;
  onJoinWaitlist: (bus: BusData) => void;
  onWakeMeUp?: (bus: BusData) => void; // left for backward compat
  extraAction?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
}

export const BusCard = ({
  bus,
  onBookNow,
  onJoinWaitlist,
  extraAction
}: BusCardProps) => {
  return (
    <Card className={`go-card-hover overflow-hidden ${bus.womensOnly ? 'border-pink-300 bg-pink-50/30 dark:bg-pink-950/10' : ''}`}>
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{bus.type}</h3>
              <div className="text-sm text-muted-foreground">
                Bus number: {bus.number}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">₹{bus.price}</div>
              <div className="text-sm text-muted-foreground">
                per person
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <div>
              <div className="text-lg font-semibold">{bus.departure}</div>
              <div className="text-sm text-muted-foreground">{bus.from}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-sm text-muted-foreground">{bus.duration}</div>
              <div className="h-[2px] w-16 bg-muted my-1"></div>
              <div className="text-xs text-muted-foreground">Direct</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">{bus.arrival}</div>
              <div className="text-sm text-muted-foreground">{bus.to}</div>
            </div>
          </div>

          <div className="flex items-center mt-4 gap-2">
            {bus.amenities.includes("wifi") && (
              <Wifi className="h-4 w-4 text-accent" aria-label="Wi-Fi" />
            )}
            {bus.amenities.includes("usb") && (
              <div className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">USB</div>
            )}
            {bus.amenities.includes("coffee") && (
              <Coffee className="h-4 w-4 text-accent" aria-label="Refreshments" />
            )}
            {bus.womensOnly && (
              <Badge variant="outline" className="bg-pink-50 text-pink-600 border-pink-200">
                Women's Special
              </Badge>
            )}
          </div>
        </div>

        <Separator />

        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-sm">
                {bus.available}/{bus.totalSeats} seats
              </span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm">{bus.rating}</span>
            </div>
          </div>

          <div className="flex gap-2">
            {extraAction && (
              <Button variant="outline" size="sm" onClick={extraAction.onClick} title={extraAction.label}>
                {extraAction.icon}
                {extraAction.label}
              </Button>
            )}

            {bus.available > 0 ? (
              <Button size="sm" onClick={() => onBookNow(bus)}>
                Book Now
              </Button>
            ) : (
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => onJoinWaitlist(bus)}
              >
                Join Waitlist
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
