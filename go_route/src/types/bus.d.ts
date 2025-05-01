
declare type StopDetails = {
  name: string;
  arrivalTime: string;
  departureTime: string;
  distance: string;
  isPassed: boolean;
  isNext: boolean;
  platform?: string;
  status?: "delayed" | "on-time" | "cancelled";
};

declare type BusSearchResult = {
  id: string;
  name: string;
  departureTime: string;
  arrivalTime: string;
  price: string;
  duration: string;
  seatsAvailable: number;
  amenities: string[];
};

declare type BookingInfo = {
  busId: string;
  busName: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  from: string;
  to: string;
  seatNumbers: string[];
  price: number;
  passengers: number;
};
