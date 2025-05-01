
export interface BusData {
  id: number;
  number: string;
  type: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  available: number;
  totalSeats: number;
  amenities: string[];
  rating: number;
  womensOnly: boolean;
}

export interface StopDetails {
  name: string;
  arrivalTime: string;
  departureTime: string;
  distance: string;
  isPassed: boolean;
  isNext: boolean;
  platform?: string;
  status?: "delayed" | "on-time" | "cancelled";
}

export const busStops: StopDetails[] = [
  {
    name: "Bengaluru Central",
    arrivalTime: "21:00",
    departureTime: "21:00",
    distance: "0 km",
    isPassed: true,
    isNext: false,
    platform: "1"
  },
  {
    name: "Electronic City",
    arrivalTime: "21:30",
    departureTime: "21:35",
    distance: "18 km",
    isPassed: true,
    isNext: false
  },
  {
    name: "Hosur",
    arrivalTime: "22:15",
    departureTime: "22:20",
    distance: "40 km",
    isPassed: false,
    isNext: true
  },
  {
    name: "Krishnagiri",
    arrivalTime: "23:00",
    departureTime: "23:10",
    distance: "95 km",
    isPassed: false,
    isNext: false
  },
  {
    name: "Vellore",
    arrivalTime: "01:30",
    departureTime: "01:40",
    distance: "180 km",
    isPassed: false,
    isNext: false,
    status: "delayed" as const
  },
  {
    name: "Sriperumbudur",
    arrivalTime: "03:45",
    departureTime: "03:50",
    distance: "250 km",
    isPassed: false,
    isNext: false
  },
  {
    name: "Chennai Central",
    arrivalTime: "05:30",
    departureTime: "05:30",
    distance: "345 km",
    isPassed: false,
    isNext: false,
    platform: "3A"
  }
];

export const mockBuses: BusData[] = [
  {
    id: 1,
    number: "VLV123",
    type: "Volvo A/C Sleeper",
    from: "Bengaluru",
    to: "Chennai",
    departure: "21:00",
    arrival: "05:30",
    duration: "8h 30m",
    price: 1200,
    available: 23,
    totalSeats: 40,
    amenities: ["wifi", "usb", "water", "blanket"],
    rating: 4.5,
    womensOnly: false
  },
  {
    id: 2,
    number: "MRC456",
    type: "Mercedes Non-A/C Seater",
    from: "Bengaluru",
    to: "Chennai",
    departure: "22:15",
    arrival: "07:00",
    duration: "8h 45m",
    price: 850,
    available: 0,
    totalSeats: 35,
    amenities: ["water"],
    rating: 4.1,
    womensOnly: false
  },
  {
    id: 3,
    number: "TTA789",
    type: "TATA A/C Sleeper",
    from: "Bengaluru",
    to: "Chennai",
    departure: "23:00",
    arrival: "06:30",
    duration: "7h 30m",
    price: 999,
    available: 5,
    totalSeats: 30,
    amenities: ["wifi", "usb", "water", "blanket", "coffee"],
    rating: 4.7,
    womensOnly: true
  }
];
