import { useState } from "react";
import axios from '@/lib/axios';
import { useLanguage } from "@/hooks/useLanguage";
import { SearchStep } from "@/components/route-book/SearchStep";
import { GenderPreferenceStep } from "@/components/route-book/GenderPreferenceStep";
import { BusListStep } from "@/components/route-book/BusListStep";
import { toast } from "sonner";
import type { BusData } from "@/types/bus-route";
import { busStops } from "@/types/bus-route";
import WaitlistModal from "@/components/bus/WaitlistModal";
import WakeMeUpModal from "@/components/bus/WakeMeUpModal";
import BusTrackingView from "@/components/bus/BusTrackingView";
import BusSeatSelector from "@/components/bus/BusSeatSelector";
import BookedTicketModal from "@/components/bus/BookedTicketModal";
import { BookingSuccessModal } from "@/components/route-book/BookingSuccessModal"; // ✅ Import BookingSuccessModal

const RouteBook = () => {
  const { t } = useLanguage();

  const [step, setStep] = useState(1);
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [genderPreference, setGenderPreference] = useState<string | null>(null);
  const [selectedBus, setSelectedBus] = useState<BusData | null>(null);
  const [buses, setBuses] = useState<BusData[]>([]);

  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [showWakeMeUpModal, setShowWakeMeUpModal] = useState(false);
  const [showTrackingView, setShowTrackingView] = useState(false);
  const [wakeMeUpBus, setWakeMeUpBus] = useState<BusData | null>(null);

  const [showSeatSelector, setShowSeatSelector] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false); // ✅ New
  const [bookedTicket, setBookedTicket] = useState<{
    bus: BusData;
    seats: string[];
    amount: number;
    travelDate: string;
  } | null>(null);

  const handleSearch = () => {
    if (!fromCity || !toCity || !travelDate) return;
    setStep(2);
  };

  const handleGenderSubmit = () => {
    if (!genderPreference) {
      toast("Gender preference is required for your safety and comfort.");
      return;
    }

    axios.get<BusData[]>(`/api/buses/available`, {
      params: { from: fromCity, to: toCity, date: travelDate, gender: genderPreference }
    })
      .then((response) => {
        setBuses(response.data);
        setStep(3);
        toast.success("Buses fetched successfully!");
      })
      .catch((error) => {
        console.error("Error fetching buses:", error);
        toast.error("Failed to fetch available buses.");
      });
  };

  const handleBookNow = (bus: BusData) => {
    setSelectedBus(bus);
    setShowSeatSelector(true);
  };

  const handleJoinWaitlist = (bus: BusData) => {
    setSelectedBus(bus);
    setShowWaitlistModal(true);
  };

  const handleWakeMeUp = (bus: BusData) => {
    setWakeMeUpBus(bus);
    setShowWakeMeUpModal(true);
  };

  const handleViewRoute = (bus: BusData) => {
    setSelectedBus(bus);
    setShowTrackingView(true);
  };

  const handleCloseTracking = () => setShowTrackingView(false);

  const handleSeatsBooked = (bus: BusData, seats: string[], amount: number) => {
    setShowSeatSelector(false);
    setBookedTicket({ bus, seats, amount, travelDate });
    setShowBookingSuccess(true); // ✅ Show BookingSuccessModal first
    toast.success("Booking confirmed!");
  };

  const handleCloseTicket = () => setBookedTicket(null);

  return (
    <div className="go-container space-y-6 pb-10">
      <div>
        <h1 className="text-2xl font-bold mb-2">{t("routeBus.title")}</h1>
        <p className="text-muted-foreground">
          Book tickets for interstate and long-distance travel
        </p>
      </div>

      {/* Multi-Step Flow */}
      {step === 1 && (
        <SearchStep
          fromCity={fromCity}
          toCity={toCity}
          travelDate={travelDate}
          busNumber={busNumber}
          onFromCityChange={setFromCity}
          onToCityChange={setToCity}
          onTravelDateChange={setTravelDate}
          onBusNumberChange={setBusNumber}
          onSearch={handleSearch}
        />
      )}

      {step === 2 && (
        <GenderPreferenceStep
          genderPreference={genderPreference}
          onGenderPreferenceChange={setGenderPreference}
          onSubmit={handleGenderSubmit}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <BusListStep
          buses={buses}
          fromCity={fromCity}
          toCity={toCity}
          travelDate={travelDate}
          genderPreference={genderPreference ?? ""}
          onBookNow={handleBookNow}
          onJoinWaitlist={handleJoinWaitlist}
          onViewRoute={handleViewRoute}
          onBack={() => setStep(2)}
        />
      )}

      {/* Seat Selector */}
      {showSeatSelector && selectedBus && (
        <BusSeatSelector
          bus={selectedBus}
          onClose={() => setShowSeatSelector(false)}
          onSeatsBooked={handleSeatsBooked}
        />
      )}

      {/* Booking Success Modal */}
      {showBookingSuccess && (
  <BookingSuccessModal
    open={showBookingSuccess} // ✅ Pass open
    onClose={() => setShowBookingSuccess(false)}
    onViewTicket={() => {
      setShowBookingSuccess(false);
      if (bookedTicket) {
        // Open Ticket modal after success
      }
    }}
  />
)}


      {/* Booked Ticket */}
      {bookedTicket && !showBookingSuccess && (
        <BookedTicketModal
          ticket={bookedTicket}
          onClose={handleCloseTicket}
          onWakeMeUp={() => {
            if (bookedTicket.bus) {
              setWakeMeUpBus(bookedTicket.bus);
              setShowWakeMeUpModal(true);
            }
          }}
        />
      )}

      {/* Waitlist Modal */}
      {showWaitlistModal && selectedBus && (
        <WaitlistModal
          bus={selectedBus}
          onClose={() => setShowWaitlistModal(false)}
        />
      )}

      {/* Wake Me Up Modal */}
      {showWakeMeUpModal && wakeMeUpBus && (
        <WakeMeUpModal
          bus={wakeMeUpBus}
          onClose={() => setShowWakeMeUpModal(false)}
        />
      )}

      {/* Bus Tracking View */}
      {showTrackingView && selectedBus && (
        <BusTrackingView
          busName={selectedBus.type}
          busNumber={selectedBus.number}
          fromTo={`${selectedBus.from} → ${selectedBus.to}`}
          currentDate={travelDate}
          stops={busStops}
          onClose={handleCloseTracking}
        />
      )}
    </div>
  );
};

export default RouteBook;
