import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Settings } from 'lucide-react';

interface ChargingStation {
  id: number;
  name: string;
  address: string;
  coordinates: string;
  status: string;
  availablePorts: number;
  totalPorts: number;
}

interface EVChargingMapProps {
  stations: ChargingStation[];
  onStationSelect: (station: ChargingStation) => void;
}

const EVChargingMap: React.FC<EVChargingMapProps> = ({ stations, onStationSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [85.3240, 27.7172], // Kathmandu coordinates
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add markers for charging stations
    stations.forEach((station) => {
      const [lng, lat] = station.coordinates.split('° N, ')[1].split('° E')[0] && station.coordinates.split('° N, ')[0] 
        ? [
            parseFloat(station.coordinates.split('° N, ')[1].split('° E')[0]),
            parseFloat(station.coordinates.split('° N, ')[0])
          ]
        : [85.3240, 27.7172]; // Default to Kathmandu if parsing fails

      const statusColor = station.status === 'Available' ? '#10b981' : 
                         station.status === 'Busy' ? '#f59e0b' : '#ef4444';

      // Create custom marker
      const markerDiv = document.createElement('div');
      markerDiv.className = 'custom-marker';
      markerDiv.style.cssText = `
        width: 30px;
        height: 30px;
        background-color: ${statusColor};
        border: 3px solid white;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      `;
      
      const innerDiv = document.createElement('div');
      innerDiv.style.cssText = `
        width: 12px;
        height: 12px;
        background-color: white;
        border-radius: 50%;
      `;
      markerDiv.appendChild(innerDiv);

      const marker = new mapboxgl.Marker(markerDiv)
        .setLngLat([lng, lat])
        .addTo(map.current!);

      // Add popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-3">
            <h3 class="font-semibold text-sm">${station.name}</h3>
            <p class="text-xs text-gray-600 mb-2">${station.address}</p>
            <div class="flex justify-between text-xs">
              <span class="px-2 py-1 rounded ${station.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">${station.status}</span>
              <span>${station.availablePorts}/${station.totalPorts} ports</span>
            </div>
          </div>
        `);

      markerDiv.addEventListener('click', () => {
        onStationSelect(station);
      });

      marker.setPopup(popup);
    });

    setShowTokenInput(false);
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Interactive Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Please enter your Mapbox public token to display the interactive map.
            </p>
            <p className="text-xs text-gray-500">
              Get your token from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mapbox.com</a>
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter Mapbox public token"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                type="password"
              />
              <Button onClick={initializeMap} disabled={!mapboxToken}>
                <Settings className="h-4 w-4 mr-2" />
                Load Map
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          Interactive Map
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div ref={mapContainer} className="w-full h-96 rounded-b-lg" />
      </CardContent>
    </Card>
  );
};

export default EVChargingMap;