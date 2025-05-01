import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "@/lib/axios";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus, Star } from "lucide-react";
import type { BusData } from "@/types/bus-route";
import BusSeatSelector from "@/components/bus/BusSeatSelector";
import TicketConfirmationModal from "@/components/bus/TicketConfirmationModal";

function BusType() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get("from") || "";
  const to = queryParams.get("to") || "";
  const date = queryParams.get("date") || "";
  const preference = queryParams.get("preference") || "general";

  const [busType, setBusType] = useState<"all" | "ac" | "sleeper">("all");
  const [buses, setBuses] = useState<BusData[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedBus, setSelectedBus] = useState<BusData | null>(null);
  const [ticketDetails, setTicketDetails] = useState<{
    bus: BusData;
    seats: string[];
    amount: number;
  } | null>(null);

  useEffect(() => {
    if (!from || !to || !date || !preference) {
      navigate("/route-bus");
    }
  }, [from, to, date, preference, navigate]);

  useEffect(() => {
    const fetchBuses = async () => {
      setLoading(true);
      try {
        const params: any = { from, to };
        if (preference === "women") {
          params.women_only = true;
        }
        if (busType !== "all") {
          params.bus_type = busType;
        }

        const response = await axios.get<BusData[]>("/routebus/search/", { params });
        setBuses(response.data);
      } catch (error) {
        console.error("Error fetching buses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, [from, to, preference, busType]);

  return (
    <div className="go-container max-w-5xl mx-auto pt-10 pb-20 space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold">Available Buses</h1>
        <p className="text-muted-foreground text-sm">
          {from} ➔ {to} on {date} | Preference: {preference}
        </p>
      </div>

      <Tabs defaultValue="all" value={busType} onValueChange={(val) => setBusType(val as any)}>
        <TabsList>
          <TabsTrigger value="all">All Buses</TabsTrigger>
          <TabsTrigger value="ac">AC Buses</TabsTrigger>
          <TabsTrigger value="sleeper">Sleepers</TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <p>Loading buses...</p>
      ) : buses.length === 0 ? (
        <p className="text-muted-foreground">No buses found for this filter.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {buses.map((bus) => {
            const amenitiesArray =
              Array.isArray(bus.amenities)
                ? bus.amenities
                : typeof bus.amenities === "string"
                ? (bus.amenities as string).split(",").map((a) => a.trim().toLowerCase())

                : [];

            return (
              <Card
                key={bus.id}
                className="border rounded-xl shadow-sm p-5 hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="text-xl font-semibold">{bus.number}</div>
                  <div className="text-sm text-muted-foreground">
                    {bus.from} ➔ {bus.to}
                  </div>

                  <div className="flex justify-between text-sm pt-3">
                    <div>
                      <div>Departure: {bus.departure}</div>
                      <div>Arrival: {bus.arrival}</div>
                    </div>
                    <div className="text-right">
                      <div>Duration: {bus.duration}</div>
                      <div className="text-green-600 font-medium">₹{bus.price}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm pt-3">
                    <div className="flex items-center gap-2">
                      <Bus className="h-4 w-4" />
                      {bus.available} Seats Available
                    </div>
                    <Badge variant="outline" className="text-xs">
                      <Star className="h-3 w-3 inline mr-1 text-yellow-500" />
                      {bus.rating}
                    </Badge>
                  </div>

                  {amenitiesArray.length > 0 && (
                    <div className="flex gap-3 text-muted-foreground text-xs pt-3 flex-wrap">
                      {amenitiesArray.includes("wifi") && (
                        <span className="flex items-center gap-1">📶 Wi-Fi</span>
                      )}
                      {amenitiesArray.includes("usb") && (
                        <span className="flex items-center gap-1">🔌 USB</span>
                      )}
                      {amenitiesArray.includes("ac") ||
                      amenitiesArray.some((a) => a.includes("ac")) ? (
                        <span className="flex items-center gap-1">❄ AC</span>
                      ) : null}
                    </div>
                  )}
                </div>

                <Button
                  size="sm"
                  className="mt-6 w-full"
                  onClick={() => setSelectedBus(bus)}
                >
                  View Details
                </Button>
              </Card>
            );
          })}
        </div>
      )}

      {selectedBus && (
        <BusSeatSelector
          bus={selectedBus}
          onClose={() => setSelectedBus(null)}
          onSeatsBooked={(bus, seats, amount) => {
            setTicketDetails({ bus, seats, amount });
            setSelectedBus(null);
          }}
        />
      )}

      {ticketDetails && (
        <TicketConfirmationModal
          ticket={ticketDetails}
          onClose={() => setTicketDetails(null)}
        />
      )}
    </div>
  );
}

export default BusType;
