import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import { Input } from "@/components/ui/input";

function RouteBusSearch() {
  const navigate = useNavigate();

  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDate, setTravelDate] = useState("");

  const handleSearch = () => {
    if (fromCity && toCity && travelDate) {
      const query = new URLSearchParams({
        from: fromCity,
        to: toCity,
        date: travelDate,
      }).toString();
      navigate(`/route-bus/preference?${query}`);
    }
  };

  return (
    <div className="go-container max-w-2xl mx-auto pt-10 pb-20 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Book Route Bus</h1>
        <p className="text-muted-foreground">
          Book tickets for interstate and long-distance travel
        </p>
      </div>

      <div className="space-y-4 bg-card p-6 rounded-xl border shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="From city"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="To city"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="relative">
          <CalendarDays className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="date"
            placeholder="Travel date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button
          className="w-full mt-2 flex gap-2 items-center justify-center"
          disabled={!fromCity || !toCity || !travelDate}
          onClick={handleSearch}
        >
          <Ticket className="h-4 w-4" />
          Search Buses
        </Button>
      </div>
    </div>
  );
}

export default RouteBusSearch;
