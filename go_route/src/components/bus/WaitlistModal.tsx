import { useState } from "react";
import axios from '@/lib/axios';
import { toast } from "sonner";
import { Clock, CheckCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { BusData } from "@/types/bus-route";

interface WaitlistModalProps {
  bus: BusData;
  onClose: () => void;
}

const WaitlistModal = ({ bus, onClose }: WaitlistModalProps) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post("/api/waitlist/", { // ✅ Use proxy URL
        email,
        phone,
        bus_number: bus.number,
        from: bus.from,
        to: bus.to,
      });

      setIsSuccess(true);
      toast.success("You've been added to the waitlist!");

      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setEmail("");
        setPhone("");
      }, 1500);
    } catch (error) {
      console.error("Error joining waitlist:", error);
      toast.error("Failed to join the waitlist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="sm:max-w-md">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>Join the Waitlist</DialogTitle>
              <DialogDescription>
                We'll notify you when a seat becomes available for{" "}
                {bus.number} ({bus.from} → {bus.to}).
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <DialogFooter className="mt-6">
                <Button variant="outline" type="button" onClick={onClose}>
                  <X className="mr-2 h-4 w-4" /> Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>Join Waitlist</>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 animate-pulse" />
            <h3 className="text-xl font-semibold text-center">
              Added to Waitlist!
            </h3>
            <p className="text-sm text-center text-muted-foreground">
              We'll notify you as soon as a seat becomes available.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
