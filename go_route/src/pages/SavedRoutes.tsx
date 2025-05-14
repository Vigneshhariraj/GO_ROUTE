import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Star, Navigation, Bus, Train, MapPin, Clock, Bell,
  ArrowRight, AlertTriangle, Info, Trash2, Calendar, Heart, HeartOff, Route, Map
} from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const SavedRoutes = () => {
  
  const [savedRoutes, setSavedRoutes] = useState([
    {
      id: 1,
      type: "bus",
      name: "Home to Office",
      from: "Indiranagar",
      to: "Whitefield",
      via: "Old Airport Road",
      time: "Daily, 8:30 AM",
      isFavorite: true,
      hasAlerts: true,
      lastUsed: "Today",
      path: [
        { name: "Indiranagar Bus Stop", time: "8:30 AM" },
        { name: "Domlur", time: "8:42 AM" },
        { name: "HAL", time: "8:55 AM" },
        { name: "Marathahalli", time: "9:10 AM" },
        { name: "Kundalahalli", time: "9:25 AM" },
        { name: "Whitefield", time: "9:40 AM" }
      ]
    },
    {
      id: 2,
      type: "train",
      name: "City to Airport",
      from: "MG Road",
      to: "Kempegowda International Airport",
      via: "Metro Purple Line",
      time: "Weekends",
      isFavorite: false,
      hasAlerts: true,
      lastUsed: "Yesterday",
      path: [
        { name: "MG Road Metro", time: "10:00 AM" },
        { name: "Trinity", time: "10:05 AM" },
        { name: "Halasuru", time: "10:10 AM" },
        { name: "Indiranagar Metro", time: "10:15 AM" },
        { name: "Airport Bus Terminal", time: "10:30 AM" },
        { name: "Airport", time: "11:00 AM" }
      ]
    },
    {
      id: 3,
      type: "multi",
      name: "Shopping Trip",
      from: "JP Nagar",
      to: "Commercial Street",
      via: "Bus + Metro",
      time: "Occasional",
      isFavorite: false,
      hasAlerts: false,
      lastUsed: "Last week",
      path: [
        { name: "JP Nagar Bus Stop", time: "11:00 AM" },
        { name: "Jayanagar", time: "11:15 AM" },
        { name: "Lalbagh", time: "11:25 AM" },
        { name: "MG Road Metro", time: "11:40 AM" },
        { name: "Commercial Street", time: "12:00 PM" }
      ]
    }
  ]);
  
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [showRouteDetails, setShowRouteDetails] = useState(false);
  
  const handleToggleFavorite = (id: number) => {
    setSavedRoutes(routes => 
      routes.map(route => 
        route.id === id ? { ...route, isFavorite: !route.isFavorite } : route
      )
    );
    
    toast.success("Route favorite status updated");
  };
  
  const handleToggleAlerts = (id: number) => {
    setSavedRoutes(routes => 
      routes.map(route => 
        route.id === id ? { ...route, hasAlerts: !route.hasAlerts } : route
      )
    );
    
    toast.success("Route alerts updated");
  };
  
  const handleDeleteRoute = (id: number) => {
    setSavedRoutes(routes => routes.filter(route => route.id !== id));
    
    toast.success("Route removed from saved routes");
  };
  
  const handleAddRoute = () => {
    // In a real app, this would navigate to a form or trigger a modal
    toast.success("Route added to saved routes");
  };
  
  const handleViewRoute = (route: any) => {
    setSelectedRoute(route);
    setShowRouteDetails(true);
  };
  
  const getRouteIcon = (type: string) => {
    switch (type) {
      case "bus":
        return <Bus className="h-5 w-5 text-accent" />;
      case "train":
        return <Train className="h-5 w-5 text-violet-500" />;
      case "multi":
        return <Navigation className="h-5 w-5 text-orange-500" />;
      default:
        return <Navigation className="h-5 w-5 text-accent" />;
    }
  };
  
  const getRouteTypeBadge = (type: string) => {
    switch (type) {
      case "bus":
        return <Badge variant="outline" className="bg-accent/10 text-accent">Bus</Badge>;
      case "train":
        return <Badge variant="outline" className="bg-violet-100 text-violet-600 border-violet-200">Train</Badge>;
      case "multi":
        return <Badge variant="outline" className="bg-orange-100 text-orange-600 border-orange-200">Multi-modal</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="go-container space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Saved Routes</h1>
        <Button size="sm" onClick={handleAddRoute}>
          <Star className="mr-2 h-4 w-4" /> Save New
        </Button>
      </div>
      
      {savedRoutes.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No saved routes</h3>
            <p className="text-muted-foreground mt-2">
              Save your frequent routes for quick access
            </p>
            <Button className="mt-4" onClick={handleAddRoute}>
              <Star className="mr-2 h-4 w-4" /> Save a Route
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {savedRoutes.map((route) => (
            <Card
              key={route.id}
              className={`overflow-hidden transition-colors ${
                route.isFavorite 
                  ? "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/10 dark:to-orange-950/10 border-yellow-200 dark:border-yellow-800" 
                  : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    {getRouteIcon(route.type)}
                    <div>
                      <h3 className="font-medium">{route.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" /> 
                        <span>{route.from}</span>
                        <ArrowRight className="h-3 w-3 mx-1" />
                        <span>{route.to}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {getRouteTypeBadge(route.type)}
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" /> {route.time}
                        </Badge>
                        <Badge variant="outline" className="text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" /> {route.lastUsed}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-2 h-auto"
                      onClick={() => handleToggleFavorite(route.id)}
                    >
                      {route.isFavorite ? (
                        <Heart className="h-5 w-5 text-red-500" />
                      ) : (
                        <HeartOff className="h-5 w-5 text-muted-foreground" />
                      )}
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Alerts</span>
                      <Switch
                        checked={route.hasAlerts}
                        onCheckedChange={() => handleToggleAlerts(route.id)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => handleDeleteRoute(route.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewRoute(route)}
                    >
                      <Route className="mr-2 h-4 w-4" />
                      View Route
                    </Button>
                    <Button size="sm">
                      Use Route
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <Card>
        <CardContent className="p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />
          <div>
            <h3 className="font-medium">Route Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Your saved routes will automatically update with real-time traffic 
              information and service disruptions. Enable alerts to receive notifications.
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Route Details Dialog */}
      <Dialog open={showRouteDetails} onOpenChange={setShowRouteDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedRoute && getRouteIcon(selectedRoute.type)}
              {selectedRoute?.name} Route
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 overflow-y-auto max-h-80">
            {/* Route Map Preview (placeholder) */}
            <Card className="bg-muted/20 p-4 flex items-center justify-center h-40">
              <div className="text-center">
                <Map className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Route Map Preview</p>
              </div>
            </Card>
            {/* Route Points */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Full Journey Path</h3>
              <div className="space-y-2">
                {selectedRoute?.path.map((point: any, index: number) => (
                  <div key={index} className="relative pl-6">
                    {index < (selectedRoute?.path.length - 1) && (
                      <div className="absolute left-[9px] top-6 w-[2px] h-[calc(100%-24px)] bg-muted-foreground/30"></div>
                    )}
                    <div className="flex items-center gap-3">
                      <div className={`rounded-full w-5 h-5 flex items-center justify-center 
                        ${index === 0 ? 'bg-green-100 text-green-600' : 
                          index === selectedRoute?.path.length - 1 ? 'bg-red-100 text-red-600' : 
                          'bg-blue-100 text-blue-600'}`}>
                        <span className="text-xs font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{point.name}</p>
                        <p className="text-xs text-muted-foreground">{point.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SavedRoutes;
