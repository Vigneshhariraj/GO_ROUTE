import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Bus, MapPin, CalendarCheck } from "lucide-react";
import { BusData } from "@/types/bus-route";

interface TicketConfirmationModalProps {
  ticket: {
    bus: BusData;
    seats: string[];
    amount: number;
  };
  onClose: () => void;
}

const TicketConfirmationModal: React.FC<TicketConfirmationModalProps> = ({ ticket, onClose }) => {
  const { bus, seats, amount } = ticket;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md space-y-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-6 w-6" />
            Ticket Confirmed!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Bus className="h-5 w-5 text-muted-foreground" />
            {bus.number}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {bus.from} → {bus.to}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Seats: {seats.join(", ")}</Badge>
            <Badge variant="outline" className="text-green-700 border-green-400">
              ₹{amount} Paid
            </Badge>
          </div>
        </div>

        <div className="pt-4">
          <Button className="w-full" onClick={onClose}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketConfirmationModal;
