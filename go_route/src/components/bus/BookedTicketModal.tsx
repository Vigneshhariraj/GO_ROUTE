import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Ticket, MapPin, ArrowRight, Bell } from "lucide-react";
import type { BusData } from "@/types/bus-route";

interface BookedTicketModalProps {
  ticket: {
    bus: BusData;
    seats: string[];
    amount: number;
    travelDate: string;
  };
  onClose: () => void;
  onWakeMeUp?: () => void;
}

const BookedTicketModal = ({
  ticket,
  onClose,
  onWakeMeUp
}: BookedTicketModalProps) => {
  const { bus, seats, amount, travelDate } = ticket;

  return (
    <Dialog open={true} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            <div className="flex gap-2 items-center">
              <Ticket className="h-5 w-5" />
              Bus Ticket - {bus.type}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-accent" />
            <span>{bus.from}</span>
            <ArrowRight className="h-4 w-4 mx-1" />
            <span>{bus.to}</span>
          </div>

          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <div>Date: <Badge variant="outline">{travelDate}</Badge></div>
            <div>Departure: <Badge variant="outline">{bus.departure}</Badge></div>
            <div>Arrival: <Badge variant="outline">{bus.arrival}</Badge></div>
          </div>

          <div className="flex gap-2 text-sm">
            <div>Coach No: <Badge variant="outline">{bus.number}</Badge></div>
          </div>

          <div className="flex gap-2 text-sm">
            <div>Seats: <Badge variant="outline">{seats.join(", ")}</Badge></div>
          </div>

          <div className="text-lg font-bold">
            Paid Amount: ₹{amount}
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 justify-end">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>

          {onWakeMeUp && (
            <Button onClick={onWakeMeUp}>
              <Bell className="h-4 w-4 mr-2" />
              Wake Me Up
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookedTicketModal;
