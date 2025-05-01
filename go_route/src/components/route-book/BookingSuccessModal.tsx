import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface BookingSuccessModalProps {
  open: boolean;
  onClose: () => void;
  onViewTicket: () => void;
}

export const BookingSuccessModal = ({
  open,
  onClose,
  onViewTicket
}: BookingSuccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="text-center">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center justify-center space-y-2">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <span>Booking Confirmed!</span>
          </DialogTitle>
        </DialogHeader>

        <div className="my-4 text-muted-foreground">
          Your bus ticket has been successfully booked.
        </div>

        <DialogFooter className="flex flex-col gap-2">
          <Button className="w-full" onClick={onViewTicket}>
            View Ticket
          </Button>
          <Button variant="outline" className="w-full" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
