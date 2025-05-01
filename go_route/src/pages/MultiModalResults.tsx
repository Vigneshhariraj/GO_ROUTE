import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, DollarSign, Star } from 'lucide-react';
import { toast } from 'sonner';

interface JourneyLeg {
  from: string;
  to: string;
  mode: string;
  route: string;
  start_time: string;
  end_time: string;
  duration_mins: number;
  fare: number;
}

interface Journey {
  label: string; // "Best Route", "Suggested Journey"
  legs: JourneyLeg[];
}

interface JourneyGroup {
  label: string;
  legs: JourneyLeg[];
}


const MultiModalResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { journeys = [], from = '', to = '' } = location.state || {};

  const handleStartJourney = (journey: Journey) => {
    toast.success("Starting journey...");
    // You can add navigation if needed
  };

  const handleSaveRoute = (journey: Journey) => {
    toast.success("Route saved successfully");
  };

  const handleBack = () => {
    navigate('/multi-modal');
  };

  return (
    <div className="go-container space-y-6 pb-16">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Journey Results</h1>
          <p className="text-muted-foreground">From {from} to {to}</p>
        </div>
      </div>

      {journeys.length === 0 ? (
        <div className="text-center text-muted-foreground">No routes found for this journey.</div>
      ) : (
        <div className="space-y-6">
          {journeys.map((journey, index) => (
            <Card key={index} className="overflow-hidden border-2 hover:shadow-md transition-all duration-200 relative">
              {journey.label === 'Best Route' && (
                <div className="absolute top-0 right-0">
                  <Badge variant="outline" className="m-2 bg-green-100 text-green-700 border-green-200">
                    Best Route
                  </Badge>
                </div>
              )}
              {journey.label === 'Suggested Journey' && (
                <div className="absolute top-0 right-0">
                  <Badge variant="outline" className="m-2 bg-blue-100 text-blue-700 border-blue-200">
                    Suggested
                  </Badge>
                </div>
              )}

              <CardContent className="p-0">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{from} to {to}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {/* Total duration from legs */}
                          {journey.legs.reduce((sum, l) => sum + l.duration_mins, 0)} min
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          ₹{journey.legs.reduce((sum, l) => sum + l.fare, 0)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Today
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleSaveRoute(journey)}>
                        <Star className="h-4 w-4" />
                        Save
                      </Button>
                      <Button size="sm" onClick={() => handleStartJourney(journey)}>
                        Start Journey
                      </Button>
                    </div>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mode</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Fare</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {journey.legs.map((leg, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{leg.mode}</TableCell>
                        <TableCell>{leg.from} → {leg.to}</TableCell>
                        <TableCell>{leg.duration_mins} min</TableCell>
                        <TableCell>
                          <div className="text-xs">
                            <div>{leg.start_time}</div>
                            <div>{leg.end_time}</div>
                          </div>
                        </TableCell>
                        <TableCell>₹{leg.fare}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiModalResults;
