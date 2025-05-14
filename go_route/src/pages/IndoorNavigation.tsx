import { useEffect, useState } from "react";
import axios from '@/lib/axios';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MapPin, Compass, LocateFixed } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface IndoorLocation {
  id: number;
  name: string;
  description: string;
  floor: string;
  estimatedTime: string;
}

const IndoorNavigation = () => {
  const { t } = useLanguage();
  const [locations, setLocations] = useState<IndoorLocation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<IndoorLocation | null>(null);


  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const res = await axios.get<IndoorLocation[]>("http://127.0.0.1:8000/api/indoor-locations/");
        setLocations(res.data);
        toast.success("Indoor locations loaded!");
      } catch (err) {
        console.error(err);
        setError("Failed to load indoor navigation data.");
        toast.error("Failed to load indoor navigation data.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationClick = (location: IndoorLocation) => {
    setSelectedLocation(location);
  };

  return (
    <div className="go-container space-y-6 pb-16">
      <h1 className="text-2xl font-bold">{t("indoorNavigation.title")}</h1>

      {loading && (
        <div className="text-center py-6 text-muted-foreground">
          Loading indoor locations...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 py-6">
          {error}
        </div>
      )}

      {!loading && !error && locations.length === 0 && (
        <div className="text-center text-muted-foreground py-6">
          No indoor locations found.
        </div>
      )}

      {!loading && locations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {locations.map((location) => (
            <Card 
              key={location.id} 
              className="cursor-pointer hover:shadow-md transition"
              onClick={() => handleLocationClick(location)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <MapPin className="text-accent h-6 w-6" />
                  <div className="space-y-1">
                    <h2 className="text-lg font-semibold">{location.name}</h2>
                    <p className="text-sm text-muted-foreground">{location.description}</p>
                    <p className="text-xs text-muted-foreground">Floor: {location.floor}</p>
                    <p className="text-xs text-muted-foreground">ETA: {location.estimatedTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedLocation && (
        <Card className="border-2 border-accent mt-6">
          <CardContent className="p-6 flex flex-col items-center space-y-4">
            <LocateFixed className="text-accent h-8 w-8" />
            <h2 className="text-xl font-bold">{selectedLocation.name}</h2>
            <p className="text-muted-foreground">{selectedLocation.description}</p>
            <div className="text-sm text-muted-foreground">
              <div>Floor: {selectedLocation.floor}</div>
              <div>ETA: {selectedLocation.estimatedTime}</div>
            </div>
            <Button className="mt-4" onClick={() => setSelectedLocation(null)}>
              <Compass className="h-4 w-4 mr-2" /> Back to List
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IndoorNavigation;
