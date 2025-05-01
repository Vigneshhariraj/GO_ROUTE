import { useEffect, useState } from "react";
import axios from '@/lib/axios';
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, RefreshCw, Bus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CityBusBusList } from "./CityBusBusList";
import useUserLocation from '@/hooks/useUserLocation';

type BusInfo = {
  id: number;
  number: string;
  route: string;
  arrivalTime: string;
  nextBus: string;
  crowdLevel: "low" | "medium" | "high";
  cost: string;
  distance: string;
  estimatedTime: string;
};

const CityBus = () => {
  const { t } = useLanguage();
  const { latitude, longitude, error } = useUserLocation();

  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [searchResults, setSearchResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [liveTrackingBus, setLiveTrackingBus] = useState<string | null>(null);
  const [buses, setBuses] = useState<BusInfo[]>([]);

  const handleSearch = () => {
    if (!fromLocation || !toLocation) {
      toast("Please enter both from and to locations");
      return;
    }

    setIsLoading(true);

    axios.get<BusInfo[]>(`http://127.0.0.1:8000/api/citybus/search/`, {
      params: {
        from: fromLocation,
        to: toLocation,
        user_lat: latitude,
        user_lon: longitude,
      },
    })
    .then((response) => {
      const transformedData: BusInfo[] = response.data.map((item: any, index: number) => ({
        id: item.id ?? index,
        number: item.route_number || `Route-${index}`,
        route: item.route_name || "Unnamed Route",
        arrivalTime: item.time_minutes ? `${item.time_minutes} min` : "15 min",
        nextBus: item.next_bus_in_min ? `${item.next_bus_in_min} min` : "5 min",
        crowdLevel: (item.crowd_level?.toLowerCase() as "low" | "medium" | "high") || "medium",
        cost: item.cost ? `₹${item.cost}` : "₹10",
        distance: item.distance_km ? `${item.distance_km} km` : "5 km",
        estimatedTime: item.time_minutes ? `${item.time_minutes} min` : "15 min",
      }));

      setBuses(transformedData);
      setSearchResults(true);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching buses:", error);
      toast.error("Failed to fetch buses. Please try again.");
      setIsLoading(false);
    });
  };

  const handleWakeMeUp = (busNumber: string) => {
    toast.success("Wake Me Up Activated", {
      description: `You'll be notified before ${busNumber} arrives at your stop.`,
    });
  };

  const handleTrackBus = (busNumber: string) => {
    toast.success("Tracking Activated", {
      description: `You are now tracking Bus ${busNumber}.`,
    });
    setLiveTrackingBus(busNumber);
  };

  const getCrowdBadge = (level: string) => {
    switch (level) {
      case "low":
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Low Crowd</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">Medium Crowd</Badge>;
      case "high":
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">High Crowd</Badge>;
      default:
        return null;
    }
  };

  const getCrowdBarColor = (level: string) => {
    switch (level) {
      case "low": return "bg-green-500";
      case "medium": return "bg-orange-500";
      case "high": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getCrowdBarWidth = (level: string) => {
    switch (level) {
      case "low": return "30%";
      case "medium": return "60%";
      case "high": return "90%";
      default: return "0%";
    }
  };

  return (
    <div className="go-container space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">{t("cityBus.title")}</h1>
        <p className="text-muted-foreground">Find and track city buses in real-time</p>

        {latitude && longitude && (
          <div className="mt-2 text-sm text-muted-foreground">
            📍 Your Location: {latitude.toFixed(5)}, {longitude.toFixed(5)}
          </div>
        )}
        {error && (
          <div className="mt-2 text-sm text-red-500">⚠️ Location Error: {error}</div>
        )}
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="from">From Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="from"
                placeholder="Enter your starting point"
                className="pl-9"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to">To Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="to"
                placeholder="Enter your destination"
                className="pl-9"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
              />
            </div>
          </div>

          <Button className="w-full" onClick={handleSearch} disabled={!fromLocation || !toLocation || isLoading}>
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                {t("cityBus.findBuses")}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {searchResults && (
        <>
          <CityBusBusList
            buses={buses}
            fromLocation={fromLocation}
            toLocation={toLocation}
            onWakeMeUp={handleWakeMeUp}
            onTrackBus={handleTrackBus}
            getCrowdBadge={getCrowdBadge}
            getCrowdBarColor={getCrowdBarColor}
            getCrowdBarWidth={getCrowdBarWidth}
            trackButtonLabel="Live Track"
          />
          {liveTrackingBus && (
            <Card className="mt-4 border-2 border-accent">
              <CardContent className="p-4 flex flex-col items-center gap-2">
                <Bus className="h-6 w-6 text-accent mb-1" />
                <h3 className="text-lg font-semibold">Live Tracking: Bus {liveTrackingBus}</h3>
                <p className="text-sm text-muted-foreground">
                  <span className="animate-pulse">The bus is currently approaching your stop. ETA: 2 min.</span><br />
                  Live location updates will appear here.
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default CityBus;
