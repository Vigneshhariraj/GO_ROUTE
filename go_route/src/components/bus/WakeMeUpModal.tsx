import { useState } from "react";
import axios from "@/lib/axios";
import { toast } from "sonner";
import { Bell, BellOff, Clock, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { BusData } from "@/types/bus-route";

interface WakeMeUpModalProps {
  bus: BusData;
  onClose: () => void;
}

const WakeMeUpModal = ({ bus, onClose }: WakeMeUpModalProps) => {
  const [minutesBefore, setMinutesBefore] = useState<number>(5);
  const [notifyNearDestination, setNotifyNearDestination] = useState<boolean>(true);
  const [notifyOnArrival, setNotifyOnArrival] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!bus) return;
    setIsSubmitting(true);

    try {
      await axios.post("/api/routebus/wake-me-up/", { 
        bus_number: bus.number,
        destination: bus.to,
        arrival_time: bus.arrival,
        minutes_before: minutesBefore,
        notify_near_destination: notifyNearDestination,
        notify_on_arrival: notifyOnArrival,
      });

      toast.success("Wake Me Up alert set successfully!", {
        description: `You'll be notified ${minutesBefore} minutes before reaching ${bus.to}.`,
      });
      onClose();
    } catch (error: any) {
      console.error("Error setting Wake Me Up:", error);
      toast.error("Failed to set Wake Me Up alert. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(v) => { if (!v) onClose(); }} modal={true}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Wake Me Up Alert</DialogTitle>
          <DialogDescription>
            Set up alerts for bus {bus.number} to {bus.to}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Minutes before arrival */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Minutes Before Arrival</Label>
                <p className="text-sm text-muted-foreground">
                  Alert me {minutesBefore} minutes before reaching my stop
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">{minutesBefore}</span>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <Slider
              value={[minutesBefore]}
              onValueChange={(value) => setMinutesBefore(value[0])}
              min={2}
              max={15}
              step={1}
              className="mt-2"
            />
          </div>

          {/* Notification options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notify Near Destination</Label>
                <p className="text-sm text-muted-foreground">
                  Alert when approaching destination
                </p>
              </div>
              <Switch
                checked={notifyNearDestination}
                onCheckedChange={setNotifyNearDestination}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notify On Arrival</Label>
                <p className="text-sm text-muted-foreground">
                  Alert when the bus arrives at the destination
                </p>
              </div>
              <Switch
                checked={notifyOnArrival}
                onCheckedChange={setNotifyOnArrival}
              />
            </div>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md flex items-start space-x-2 text-yellow-800 dark:text-yellow-200">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm">
              Make sure your device volume is turned up to hear alerts.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            <BellOff className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" /> Setting...
              </>
            ) : (
              <>
                <Bell className="mr-2 h-4 w-4" /> Set Alert
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WakeMeUpModal;
