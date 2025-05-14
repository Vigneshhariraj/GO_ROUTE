import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Search, Clock } from 'lucide-react';
import { toast } from 'sonner';
import useUserLocation from '@/hooks/useUserLocation';
import axiosInstance from '@/lib/axios';

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
  label: string; 
  legs: JourneyLeg[];
}

interface JourneyResponse {
  journeys: Journey[];
}

const MultiModalJourney = () => {
  const navigate = useNavigate();
  const { latitude, longitude, error } = useUserLocation();

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const recentSearches = [
    { from: 'Indiranagar', to: 'Whitefield', time: '2 hours ago' },
    { from: 'MG Road', to: 'Electronic City', time: 'Yesterday' },
    { from: 'Koramangala', to: 'Airport', time: '3 days ago' },
  ];

  const handleSearch = async () => {
    if (!from || !to) {
      toast.error('Please enter both source and destination');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post<JourneyResponse>('/journey/', {
        from,
        to
      });

      
      navigate('/multi-modal-results', { state: { journeys: response.data.journeys, from, to } });
    } catch (err) {
      console.error(err);
      toast.error('Error fetching journey data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecentSearch = (recent: { from: string; to: string }) => {
    setFrom(recent.from);
    setTo(recent.to);
  };

  return (
    <div className="go-container space-y-6 pb-16">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Multi-Modal Journey</h1>
        <p className="text-muted-foreground">Plan your journey using different modes of transport</p>

        {latitude && longitude && (
          <div className="mt-2 text-sm text-muted-foreground">
            📍 Your Location: {latitude.toFixed(5)}, {longitude.toFixed(5)}
          </div>
        )}
        {error && (
          <div className="mt-2 text-sm text-red-500">
            ⚠️ Location Error: {error}
          </div>
        )}
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="from" className="text-sm font-medium">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="from"
                  placeholder="Enter starting point"
                  className="pl-9"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="to" className="text-sm font-medium">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="to"
                  placeholder="Enter destination"
                  className="pl-9"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? 'Searching...' : <><Search className="mr-2 h-4 w-4" /> Search Routes</>}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Recent Searches</h2>
        {recentSearches.map((recent, index) => (
          <Card key={index} className="cursor-pointer hover:bg-accent/10 transition-colors"
            onClick={() => handleRecentSearch(recent)}>
            <CardContent className="p-3 flex items-center justify-between">
              <div>
                <p className="font-medium">{recent.from} → {recent.to}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Clock className="h-3 w-3" />
                  <span>{recent.time}</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-muted/50">Tap to use</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MultiModalJourney;
