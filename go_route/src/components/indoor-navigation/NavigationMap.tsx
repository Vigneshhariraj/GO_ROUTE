
import React from 'react';
import { MapPin, Navigation, Circle, ChevronRight } from 'lucide-react';
import type { StopDetails } from '@/types/bus-route';

interface NavigationMapProps {
  currentCheckpoint: string;
  navigationProgress: number;
  stops: StopDetails[];
}

const NavigationMap: React.FC<NavigationMapProps> = ({
  currentCheckpoint,
  navigationProgress,
  stops
}) => {
  return (
    <div className="relative w-full h-[60vh] bg-accent/5 rounded-lg overflow-hidden border">
      {/* Map Grid Background */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Navigation Path */}
      <div className="absolute inset-0 p-6">
        <div className="relative h-full">
          {/* Path Line */}
          <div className="absolute left-4 top-4 bottom-4 w-1 bg-accent/20" />
          
          {/* Progress Line */}
          <div 
            className="absolute left-4 top-4 w-1 bg-accent transition-all duration-500"
            style={{ height: `${navigationProgress}%` }}
          />

          {/* Stops/Checkpoints */}
          {stops.map((stop, index) => {
            const isActive = stop.name === currentCheckpoint;
            const isPast = stop.isPassed || navigationProgress > (index / (stops.length - 1)) * 100;

            return (
              <div 
                key={stop.name}
                className="absolute left-0 flex items-center gap-3"
                style={{ 
                  top: `${(index / (stops.length - 1)) * 100}%`,
                  transform: 'translateY(-50%)'
                }}
              >
                <div className={`
                  w-9 h-9 rounded-full flex items-center justify-center
                  ${isActive ? 'bg-accent text-white' : 
                    isPast ? 'bg-accent/20 text-accent' : 
                    'bg-muted text-muted-foreground'}
                `}>
                  {isActive ? (
                    <Navigation className="h-5 w-5" />
                  ) : isPast ? (
                    <Circle className="h-5 w-5 fill-current" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </div>

                <div className={`
                  flex flex-col
                  ${isActive ? 'text-accent' : 
                    isPast ? 'text-muted-foreground' : 
                    'text-muted-foreground/60'}
                `}>
                  <span className="font-medium">{stop.name}</span>
                  <span className="text-sm">{stop.platform ? `Platform ${stop.platform}` : 'Checkpoint'}</span>
                  {stop.status && (
                    <span className={`
                      text-xs px-2 py-0.5 rounded-full w-fit mt-1
                      ${stop.status === 'delayed' ? 'bg-red-100 text-red-600' : 
                        stop.status === 'on-time' ? 'bg-green-100 text-green-600' : 
                        'bg-yellow-100 text-yellow-600'}
                    `}>
                      {stop.status.charAt(0).toUpperCase() + stop.status.slice(1)}
                    </span>
                  )}
                </div>

                {isActive && (
                  <ChevronRight className="h-5 w-5 text-accent animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavigationMap;
