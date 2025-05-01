import { useEffect, useState } from "react";

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

const useUserLocation = () => {
  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({ ...prev, error: "Geolocation not supported by browser" }));
      return;
    }

    const watcher = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => {
        setLocation(prev => ({ ...prev, error: error.message }));
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return location;
};

export default useUserLocation;
