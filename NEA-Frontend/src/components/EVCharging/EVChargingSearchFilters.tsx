import React, { useState } from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EVChargingSearchFiltersProps {
  searchLocation: string;
  setSearchLocation: (value: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (value: string) => void;
  onUseCurrentLocation: () => void;
}

const EVChargingSearchFilters: React.FC<EVChargingSearchFiltersProps> = ({
  searchLocation,
  setSearchLocation,
  selectedDistrict,
  setSelectedDistrict,
  onUseCurrentLocation
}) => {
  const districts = ["Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara", "Chitwan", "Butwal"];
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const handleCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      await onUseCurrentLocation();
    } finally {
      setIsLoadingLocation(false);
    }
  };

  return (
    <Card className="animate-in slide-in-from-top-4 duration-500">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="h-5 w-5 mr-2" />
          Find EV Charging Stations
        </CardTitle>
        <CardDescription>
          Search for electric vehicle charging stations by location or filter by district
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Search Location</label>
            <div className="relative">
              <Input
                placeholder="Enter location, area, or station name"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full pr-10"
              />
              <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Filter by District</label>
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger>
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                {/* Use "all" instead of empty string */}
                <SelectItem value="all">All Districts</SelectItem>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Quick Actions</label>
            <Button 
              onClick={handleCurrentLocation}
              disabled={isLoadingLocation}
              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700"
            >
              <Navigation className="h-4 w-4 mr-2" />
              {isLoadingLocation ? 'Locating...' : 'Use Current Location'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EVChargingSearchFilters;
