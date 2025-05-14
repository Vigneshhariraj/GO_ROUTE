import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Link } from "react-router-dom";
import {
  Bus, MapPin, MessageSquare, Phone,
  Navigation, Radio, Clock, Star, Calendar, User
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FloatingChatButton from "@/components/FloatingChatButton";
import { Badge } from "@/components/ui/badge";


type NavigationData = {
  message: string;
  suggestions: string[];
};

const Home = () => {
  const { t } = useLanguage();
  const [navigationData, setNavigationData] = useState<NavigationData | null>({
    message: "Welcome to GoRoute!",
    suggestions: [
      "Explore city buses using the 'City Bus' feature.",
      "Track your route buses and book tickets.",
      "Use 'Wake Me Up' to get notified before your stop."
    ],
  });

  useEffect(() => {
    axios.get<NavigationData>("http://127.0.0.1:8000/api/navigation/")
      .then((response) => setNavigationData(response.data))
      .catch(() => {
        console.warn("Navigation API failed. Using defaults.");
      });
  }, []);

  const mainFeatures = [
    {
      icon: <Bus size={24} className="text-goroute-blue" />,
      title: "Route Bus",
      description: "Book tickets for long-distance travel",
      link: "/route-bus",
      color: "bg-blue-50",
    },
    {
      icon: <MapPin size={24} className="text-goroute-green" />,
      title: "City Bus",
      description: "Track city buses in real-time",
      link: "/city-bus",
      color: "bg-green-50",
    },
    {
      icon: <Navigation size={24} className="text-accent" />,
      title: "Indoor Navigation",
      description: "Navigate inside bus & metro stations",
      link: "/indoor-navigation",
      color: "bg-purple-50",
    },
    {
      icon: <Radio size={24} className="text-goroute-orange" />,
      title: "Multi-Modal Journey",
      description: "Plan trips using multiple transports",
      link: "/multi-modal",
      color: "bg-yellow-50",
    },
    {
      icon: <MessageSquare size={24} className="text-goroute-orange" />,
      title: "Chatbot",
      description: "Get instant assistance",
      link: "/chatbot",
      color: "bg-orange-50",
    },
    {
      icon: <Phone size={24} className="text-goroute-red" />,
      title: "SOS",
      description: "Emergency contact & support",
      link: "/sos",
      color: "bg-red-50",
    },
  ];

  return (
    <div className="go-container space-y-10 pb-24">
      <div className="text-center space-y-2">
        <p className="text-muted-foreground text-lg">
          Your one-stop solution for public transport in India
        </p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mainFeatures.map((feature, index) => (
          <Link to={feature.link} key={index}>
            <Card className={`go-card-hover ${feature.color}`}>
              <CardContent className="flex items-center gap-4 p-4">
                {feature.icon}
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">⭐ Saved Routes</h2>
          <Link to="/saved" className="text-sm text-blue-600 hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[1, 2, 3].map((_, i) => (
            <Card key={i} className="p-4 space-y-1">
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-100 text-blue-800">Daily Route</Badge>
                <Star size={14} className="text-yellow-500" />
              </div>
              <p className="text-sm font-medium">Koramangala → Electronic City</p>
              <p className="text-xs text-muted-foreground">Bus: 500C • ~35 mins</p>
            </Card>
          ))}
        </div>
      </div>

     
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">🗓️ Booking History</h2>
          <Link to="/history" className="text-sm text-blue-600 hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {[
            { from: "Bangalore", to: "Mysore", fare: "₹450", bus: "KSRTC Volvo", tag: "3 days ago" },
            { from: "Chennai", to: "Pondicherry", fare: "₹310", bus: "TNSTC Express", tag: "1 week ago" },
            { from: "Delhi", to: "Agra", fare: "₹600", bus: "Jan Rath", tag: "2 weeks ago" },
            { from: "Hyderabad", to: "Warangal", fare: "₹390", bus: "TSRTC Garuda", tag: "1 month ago" },
          ].map((item, i) => (
            <Card key={i} className="p-4 space-y-1">
              <div className="text-sm font-medium">{item.from} → {item.to}</div>
              <p className="text-xs text-muted-foreground">{item.bus}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Seat: C{i + 1}</span>
                <span>{item.fare}</span>
              </div>
              <p className="text-xs text-green-600">Completed • {item.tag}</p>
            </Card>
          ))}
        </div>
      </div>

      
      <div>
        <h2 className="text-lg font-semibold mb-2">🙋 What Users Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              name: "Priya Sharma",
              city: "Mumbai",
              review: "The bus tracking is so accurate! Makes my daily commute stress-free.",
            },
            {
              name: "Rahul Verma",
              city: "Delhi",
              review: "Love the multi-language support. Finally an app that works in Hindi too!",
            },
            {
              name: "Lakshmi Narayanan",
              city: "Chennai",
              review: "The SOS feature helped me during a late night journey. Highly recommended!",
            }
          ].map((user, i) => (
            <Card key={i} className="p-4 space-y-1">
              <div className="flex items-center gap-2 text-sm font-medium">
                <User size={16} />
                {user.name}
              </div>
              <p className="text-xs text-muted-foreground">{user.city}</p>
              <p className="text-sm mt-1">{user.review}</p>
            </Card>
          ))}
        </div>
      </div>

      <FloatingChatButton />
    </div>
  );
};

export default Home;
