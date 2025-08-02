import React from 'react';
import { Filter, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import EVChargingStationCard from './EVChargingStationCard';

interface ChargingStation {
  id: number;
  name: string;
  address: string;
  district: string;
  coordinates: string;
  distance: string;
  status: string;
  totalPorts: number;
  availablePorts: number;
  chargingSpeed: string;
  pricing: string;
  rating: number;
  amenities: string[];
  phone: string;
}

interface EVChargingStationListProps {
  stations: ChargingStation[];
  onNavigate: (station: ChargingStation) => void;
  onCall: (station: ChargingStation) => void;
  onReserve: (station: ChargingStation) => void;
  onMoreFilters: () => void;
}

const EVChargingStationList: React.FC<EVChargingStationListProps> = ({
  stations,
  onNavigate,
  onCall,
  onReserve,
  onMoreFilters
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Charging Stations ({stations.length})
        </h2>
        <Button variant="outline" size="sm" onClick={onMoreFilters}>
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      <div className="grid gap-6">
        {stations.map((station, index) => (
          <div
            key={station.id}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <EVChargingStationCard
              station={station}
              onNavigate={onNavigate}
              onCall={onCall}
              onReserve={onReserve}
            />
          </div>
        ))}
      </div>

      {stations.length === 0 && (
        <Card className="animate-in fade-in-50 duration-500">
          <CardContent className="text-center py-12">
            <Car className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No charging stations found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or check back later for new stations.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EVChargingStationList;