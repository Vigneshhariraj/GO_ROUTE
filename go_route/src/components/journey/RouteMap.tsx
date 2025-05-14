
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface RouteMapProps {
  from: string;
  to: string;
  segments?: {
    type: string;
    name: string;
    from: string;
    to: string;
    fromCoords?: [number, number];
    toCoords?: [number, number];
    duration: number;
    departureTime?: string;
    arrivalTime?: string;
    stops?: string[];
    fare: number;
  }[];
}

const RouteMap: React.FC<RouteMapProps> = ({ from, to, segments }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const fromCoords: [number, number] = [77.5946, 12.9716];
  const toCoords: [number, number] = [77.7085, 13.1986]; 

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      
      const mockMap = document.createElement('div');
      mockMap.style.width = '100%';
      mockMap.style.height = '100%';
      mockMap.style.background = '#e5e7eb';
      mockMap.style.display = 'flex';
      mockMap.style.alignItems = 'center';
      mockMap.style.justifyContent = 'center';
      mockMap.style.borderRadius = '0.5rem';
      mockMap.style.position = 'relative';
      mockMap.style.overflow = 'hidden';

      
      const fromMarker = document.createElement('div');
      fromMarker.style.position = 'absolute';
      fromMarker.style.left = '30%';
      fromMarker.style.top = '50%';
      fromMarker.style.width = '12px';
      fromMarker.style.height = '12px';
      fromMarker.style.background = '#4ade80';
      fromMarker.style.borderRadius = '50%';
      fromMarker.style.border = '2px solid white';
      
      const toMarker = document.createElement('div');
      toMarker.style.position = 'absolute';
      toMarker.style.right = '30%';
      toMarker.style.top = '50%';
      toMarker.style.width = '12px';
      toMarker.style.height = '12px';
      toMarker.style.background = '#f43f5e';
      toMarker.style.borderRadius = '50%';
      toMarker.style.border = '2px solid white';
      
     
      const line = document.createElement('div');
      line.style.position = 'absolute';
      line.style.left = '30%';
      line.style.top = '50%';
      line.style.width = '40%';
      line.style.height = '2px';
      line.style.background = '#3b82f6';
      
     
      const info = document.createElement('div');
      info.innerText = 'Map View: ' + from + ' to ' + to;
      info.style.textAlign = 'center';
      info.style.color = '#374151';
      info.style.fontWeight = 'bold';
      
      mockMap.appendChild(line);
      mockMap.appendChild(fromMarker);
      mockMap.appendChild(toMarker);
      mockMap.appendChild(info);
      
      
      if (mapContainer.current) {
        mapContainer.current.innerHTML = '';
        mapContainer.current.appendChild(mockMap);
      }

      return () => {
        if (mapContainer.current) {
          mapContainer.current.innerHTML = '';
        }
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      if (mapContainer.current) {
        mapContainer.current.innerHTML = '<div style="padding: 1rem; text-align: center;">Failed to load map</div>';
      }
    }
  }, [from, to, segments]);

  return (
    <div ref={mapContainer} className="w-full h-full rounded-md overflow-hidden" />
  );
};

export default RouteMap;
