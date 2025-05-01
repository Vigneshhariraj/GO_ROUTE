
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import RouteMap from "@/components/journey/RouteMap";
import RouteDetails from "@/components/journey/RouteDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const RouteOverview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const routeData = location.state?.routeData;

  const handleBack = () => {
    navigate(-1);
  };

  const handleShare = () => {
    toast({
      title: "Success",
      description: "Route shared successfully",
    });
  };

  const handleSave = () => {
    toast({
      title: "Success",
      description: "Route saved to favorites",
    });
  };

  if (!routeData) {
    return (
      <div className="go-container py-6">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">No route selected</h1>
        </div>
        <p className="text-muted-foreground">Please select a route from the journey planner.</p>
      </div>
    );
  }

  return (
    <div className="go-container space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold mb-1">Route Overview</h1>
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground text-sm">{routeData.from} to {routeData.to}</p>
              {routeData.isBest && (
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                  Best Route
                </Badge>
              )}
              {routeData.isSuggested && (
                <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                  Suggested
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleSave}>
            <Star className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="w-full h-[300px] overflow-hidden">
        <RouteMap from={routeData.from} to={routeData.to} segments={routeData.segments} />
      </Card>

      <RouteDetails 
        segments={routeData.segments}
        totalFare={routeData.totalFare}
        totalTime={routeData.totalTime}
        onStartJourney={routeData.onStartJourney}
      />
    </div>
  );
};

export default RouteOverview;
