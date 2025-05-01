
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar, Map, Ticket } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface SearchStepProps {
  fromCity: string;
  toCity: string;
  travelDate: string;
  busNumber: string;
  onFromCityChange: (value: string) => void;
  onToCityChange: (value: string) => void;
  onTravelDateChange: (value: string) => void;
  onBusNumberChange: (value: string) => void;
  onSearch: () => void;
}

export const SearchStep = ({
  fromCity,
  toCity,
  travelDate,
  busNumber,
  onFromCityChange,
  onToCityChange,
  onTravelDateChange,
  onBusNumberChange,
  onSearch
}: SearchStepProps) => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from">{t("routeBus.from")}</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="from"
                  placeholder="From city"
                  className="pl-9"
                  value={fromCity}
                  onChange={(e) => onFromCityChange(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="to">{t("routeBus.to")}</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="to"
                  placeholder="To city"
                  className="pl-9"
                  value={toCity}
                  onChange={(e) => onToCityChange(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="busNo">Bus #</Label>
              <div className="relative">
                <Ticket className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="busNo"
                  placeholder="Bus No. (optional)"
                  className="pl-9"
                  value={busNumber}
                  onChange={(e) => onBusNumberChange(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">{t("routeBus.date")}</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="date"
                type="date"
                placeholder="Travel date"
                className="pl-9"
                value={travelDate}
                onChange={(e) => onTravelDateChange(e.target.value)}
              />
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={onSearch}
            disabled={!fromCity || !toCity || !travelDate}
          >
            <Map className="mr-2 h-4 w-4" />
            {t("routeBus.search")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
