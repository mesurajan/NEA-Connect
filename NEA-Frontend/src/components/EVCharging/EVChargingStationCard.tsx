import React from 'react';
import { MapPin, Navigation, Phone, Clock, Star, Battery, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

interface EVChargingStationCardProps {
  station: ChargingStation;
  onNavigate: (station: ChargingStation) => void;
  onCall: (station: ChargingStation) => void;
  onReserve: (station: ChargingStation) => void;
}

const EVChargingStationCard: React.FC<EVChargingStationCardProps> = ({
  station,
  onNavigate,
  onCall,
  onReserve
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800 border-green-200';
      case 'Busy': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Offline': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAvailabilityColor = () => {
    const ratio = station.availablePorts / station.totalPorts;
    if (ratio > 0.5) return 'text-green-600';
    if (ratio > 0.2) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-in slide-in-from-bottom-4">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Station Info */}
          <div className="md:col-span-2">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1 hover:text-teal-600 transition-colors">
                  {station.name}
                </h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {station.address}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>📍 {station.coordinates}</span>
                  <span>📏 {station.distance}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    {station.rating}
                  </div>
                </div>
              </div>
              <Badge className={`${getStatusColor(station.status)} animate-pulse`}>
                {station.status}
              </Badge>
            </div>

            {/* Charging Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg border border-teal-200 hover:shadow-md transition-shadow">
                <Battery className="h-5 w-5 mx-auto mb-1 text-teal-600" />
                <div className="text-sm font-medium">{station.chargingSpeed}</div>
                <div className="text-xs text-gray-500">Charging Speed</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-shadow">
                <Zap className={`h-5 w-5 mx-auto mb-1 ${getAvailabilityColor()}`} />
                <div className={`text-sm font-medium ${getAvailabilityColor()}`}>
                  {station.availablePorts}/{station.totalPorts}
                </div>
                <div className="text-xs text-gray-500">Available Ports</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
                <Clock className="h-5 w-5 mx-auto mb-1 text-green-600" />
                <div className="text-sm font-medium">{station.pricing}</div>
                <div className="text-xs text-gray-500">Price</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 hover:shadow-md transition-shadow">
                <Phone className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                <div className="text-sm font-medium">{station.phone}</div>
                <div className="text-xs text-gray-500">Contact</div>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Amenities</h4>
              <div className="flex flex-wrap gap-1">
                {station.amenities.map((amenity, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs hover:bg-gray-200 transition-colors"
                  >
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 transform hover:scale-105 transition-all"
              onClick={() => onNavigate(station)}
            >
              <Navigation className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
            <Button 
              variant="outline" 
              className="w-full hover:bg-gray-50 transform hover:scale-105 transition-all"
              onClick={() => onCall(station)}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Station
            </Button>
            <Button 
              variant="outline" 
              className="w-full hover:bg-gray-50 transform hover:scale-105 transition-all"
              onClick={() => onReserve(station)}
              disabled={station.availablePorts === 0}
            >
              <Clock className="h-4 w-4 mr-2" />
              {station.availablePorts === 0 ? 'Fully Booked' : 'Reserve Spot'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EVChargingStationCard;