import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, ChevronDown, MapPin, AlertTriangle, ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMediaQuery } from "@/hooks/use-media-query";

interface StopDetails {
  name: string;
  arrivalTime: string;
  departureTime: string;
  distance: string;
  isPassed: boolean;
  isNext: boolean;
  platform?: string;
  status?: "on-time" | "delayed" | "cancelled";
}

interface BusTrackingViewProps {
  busName: string;
  busNumber: string;
  fromTo: string;
  currentDate: string;
  stops: StopDetails[];
  onClose: () => void;
}

const BusTrackingView: React.FC<BusTrackingViewProps> = ({
  busName,
  busNumber,
  fromTo,
  currentDate,
  stops,
  onClose,
}) => {
  const isMobile = useIsMobile();
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

  const MobileFrame = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
      <div className="relative w-[340px] h-[680px] bg-gray-900 rounded-[40px] shadow-xl overflow-hidden border-4 border-gray-800">
        <div className="absolute top-0 left-0 right-0 h-6 bg-black rounded-t-[36px] z-20">
          <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full"></div>
        </div>

        <div className="h-full overflow-hidden rounded-[36px] pt-6">
          <div className="h-full bg-background flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto flex flex-col">
              <header className="bg-accent text-white p-4 sticky top-0 z-10">
                <div className="flex justify-between items-center mb-2">
                  <Button variant="ghost" className="text-white p-1 h-auto" onClick={onClose}>
                    <ChevronDown className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" className="text-white p-1 h-auto">
                    <RefreshCw className="h-5 w-5" />
                  </Button>
                </div>
                <h2 className="text-xl font-bold">{currentDate}</h2>
              </header>

              <div className="px-4 py-3 bg-black text-white">
                <h1 className="text-lg font-semibold">{busName}</h1>
                <p className="text-sm opacity-90">{fromTo}</p>
              </div>

              <div className="relative flex-1 overflow-auto">
                {stops.map((stop, index) => (
                  <div key={index} className="flex relative">
                    <div className="w-16 flex flex-col items-center py-4 relative">
                      {index !== 0 && (
                        <div className={`absolute top-0 bottom-0 w-1 left-1/2 transform -translate-x-1/2 ${stop.isPassed ? "bg-accent" : "bg-gray-300"}`}></div>
                      )}
                      <div className="text-xs font-medium">{stop.arrivalTime}</div>
                      <div className={`h-4 w-4 rounded-full my-1 z-10 ${stop.isNext ? "bg-accent border-4 border-blue-200" : stop.isPassed ? "bg-accent" : "bg-gray-300"}`}></div>
                      <div className="text-xs text-red-500">{stop.departureTime !== stop.arrivalTime ? stop.departureTime : ""}</div>
                    </div>

                    <div className={`flex-1 py-4 border-b ${stop.isNext ? "bg-blue-50 dark:bg-blue-950/30" : ""}`}>
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">{stop.name}</div>
                          <div className="text-xs text-muted-foreground">{stop.distance}</div>
                          {stop.platform && (
                            <Badge variant="outline" className="mt-1 text-xs">
                              Platform {stop.platform}
                            </Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{stop.arrivalTime}</div>
                          {stop.status === "delayed" && (
                            <Badge variant="destructive" className="text-xs">
                              <AlertTriangle className="h-3 w-3 mr-1" /> Delayed
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky bottom-0 left-0 right-0 bg-accent text-white p-4 flex justify-between items-center">
              <div className="text-lg font-bold">{busNumber}</div>
              <Button className="bg-white text-accent hover:bg-gray-100">
                View Map <MapPin className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="h-1 w-1/3 bg-gray-700 mx-auto mb-1 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const ResponsiveView = () => (
    <div className="fixed inset-0 bg-background z-50 overflow-auto pb-16">
      <header className="bg-accent text-white p-4 sticky top-0 z-10">
        <div className="flex justify-between items-center mb-2">
          <Button variant="ghost" className="text-white p-1 h-auto" onClick={onClose}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Button variant="ghost" className="text-white p-1 h-auto">
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>
        <h2 className="text-xl font-bold">{currentDate}</h2>
      </header>

      <div className="px-4 py-3 bg-black text-white">
        <h1 className="text-lg font-semibold">{busName}</h1>
        <p className="text-sm opacity-90">{fromTo}</p>
      </div>

      <div className="relative">
        {stops.map((stop, index) => (
          <div key={index} className="flex relative">
            <div className="w-16 flex flex-col items-center py-4 relative">
              {index !== 0 && (
                <div className={`absolute top-0 bottom-0 w-1 left-1/2 transform -translate-x-1/2 ${stop.isPassed ? "bg-accent" : "bg-gray-300"}`}></div>
              )}
              <div className="text-xs font-medium">{stop.arrivalTime}</div>
              <div className={`h-4 w-4 rounded-full my-1 z-10 ${stop.isNext ? "bg-accent border-4 border-blue-200" : stop.isPassed ? "bg-accent" : "bg-gray-300"}`}></div>
              <div className="text-xs text-red-500">{stop.departureTime !== stop.arrivalTime ? stop.departureTime : ""}</div>
            </div>

            <div className={`flex-1 py-4 border-b ${stop.isNext ? "bg-blue-50 dark:bg-blue-950/30" : ""}`}>
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">{stop.name}</div>
                  <div className="text-xs text-muted-foreground">{stop.distance}</div>
                  {stop.platform && (
                    <Badge variant="outline" className="mt-1 text-xs">
                      Platform {stop.platform}
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-medium">{stop.arrivalTime}</div>
                  {stop.status === "delayed" && (
                    <Badge variant="destructive" className="text-xs">
                      <AlertTriangle className="h-3 w-3 mr-1" /> Delayed
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-accent text-white p-4 flex justify-between items-center">
        <div className="text-lg font-bold">{busNumber}</div>
        <Button className="bg-white text-accent hover:bg-gray-100">
          View Map <MapPin className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return isMobile || isTablet ? <MobileFrame /> : <ResponsiveView />;
};

export default BusTrackingView;
