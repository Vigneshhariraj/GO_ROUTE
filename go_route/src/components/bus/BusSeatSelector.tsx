import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Check, MapPin, Clock, Info } from "lucide-react";
import instance from "@/lib/axios";
import { BusData } from "@/types/bus-route";

export type SeatType = "available" | "selected" | "occupied" | "reserved" | "ladies";

interface SeatData {
  id: string;
  type: SeatType;
  price: number;
}

interface SeatProps extends SeatData {
  onClick: (id: string) => void;
}

interface BusSeatSelectorProps {
  bus: BusData;
  onClose: () => void;
  onSeatsBooked: (bus: BusData, seats: string[], amount: number) => void;
}

const Seat = ({ id, type, price, onClick }: SeatProps) => {
  const isSelectable = type === "available" || type === "selected";

  const getStyles = () => {
    switch (type) {
      case "available":
        return "bg-white border-2 border-gray-300 hover:bg-gray-100 cursor-pointer";
      case "selected":
        return "bg-accent text-white border-2 border-accent cursor-pointer";
      case "occupied":
        return "bg-gray-300 border-2 border-gray-300 opacity-70 cursor-not-allowed";
      case "reserved":
        return "bg-amber-100 border-2 border-amber-300 opacity-70 cursor-not-allowed";
      case "ladies":
        return "bg-pink-100 border-2 border-pink-300 opacity-70 cursor-not-allowed";
    }
  };

  return (
    <div
      className={`h-12 w-12 rounded-lg flex items-center justify-center flex-col ${getStyles()}`}
      onClick={() => isSelectable && onClick(id)}
    >
      <span className="text-xs font-semibold">{id}</span>
      {type === "available" && <span className="text-xs">₹{price}</span>}
      {type === "selected" && <Check className="h-4 w-4" />}
    </div>
  );
};

// ✅ FIXED: TypeScript now knows what props this component accepts
const BusSeatSelector: React.FC<BusSeatSelectorProps> = ({ bus, onClose, onSeatsBooked }) => {
  const [seats, setSeats] = useState<SeatData[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await instance.get(`/routebus/${bus.id}/seats/`);
        const fetchedSeats = (response.data as any[]).map((seat) => ({
          id: seat.seat_number,
          type: seat.status as SeatType,
          price: seat.price,
        })) as SeatData[];
        setSeats(fetchedSeats);
      } catch (error) {
        console.error("Error fetching seats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [bus.id]);

  const handleSeatClick = (id: string) => {
    const newSeats = [...seats];
    const seatIndex = newSeats.findIndex((seat) => seat.id === id);

    if (seatIndex !== -1) {
      const seat = newSeats[seatIndex];
      if (seat.type === "available") {
        newSeats[seatIndex].type = "selected";
        setSelectedSeats([...selectedSeats, id]);
      } else if (seat.type === "selected") {
        newSeats[seatIndex].type = "available";
        setSelectedSeats(selectedSeats.filter((seatId) => seatId !== id));
      }
      setSeats(newSeats);
    }
  };

  const getTotalPrice = () => {
    return seats
      .filter((seat) => selectedSeats.includes(seat.id))
      .reduce((total, seat) => total + seat.price, 0);
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) return;
    onSeatsBooked(bus, selectedSeats, getTotalPrice());
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Your Seats</DialogTitle>
        </DialogHeader>

        <div className="py-2 space-y-3">
          <div className="bg-muted/50 p-3 rounded-lg space-y-2">
            <h3 className="font-semibold">{bus.number}</h3>
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>
                  {bus.from} → {bus.to}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{bus.duration}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Departure: {bus.departure}</span>
              <span>Arrival: {bus.arrival}</span>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto py-2">
            <Badge variant="outline">Available</Badge>
            <Badge variant="outline">Selected</Badge>
            <Badge variant="outline">Occupied</Badge>
            <Badge variant="outline">Ladies</Badge>
          </div>
        </div>

        <ScrollArea className="flex-1 p-1">
          <div className="relative pb-6">
            <div className="w-full flex justify-center mb-6">
              <div className="w-32 h-12 bg-gray-200 rounded-t-3xl flex items-center justify-center border-2 border-gray-300">
                <span className="text-sm font-medium">Driver</span>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-32 text-muted-foreground">
                Loading seats...
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 px-6">
                {seats.map((seat) => (
                  <Seat
                    key={seat.id}
                    id={seat.id}
                    type={seat.type}
                    price={seat.price}
                    onClick={handleSeatClick}
                  />
                ))}
              </div>
            )}

            <div className="absolute -right-2 top-1/3 w-6 h-12 bg-gray-200 border-2 border-gray-300 flex items-center justify-center text-xs">
              <span className="transform -rotate-90">Door</span>
            </div>
          </div>
        </ScrollArea>

        <div className="border-t pt-4">
          {selectedSeats.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">Selected Seats:</span>
                  <div className="font-medium">{selectedSeats.join(", ")}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Total Amount:</span>
                  <div className="font-bold text-lg">₹{getTotalPrice()}</div>
                </div>
              </div>
              <Button className="w-full" onClick={handleProceed}>
                Proceed to Payment
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-muted-foreground p-2">
              <Info className="h-4 w-4" />
              <span>Please select at least one seat to continue</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BusSeatSelector;
