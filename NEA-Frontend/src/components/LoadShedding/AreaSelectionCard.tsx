import React from 'react';
import { MapPin, Bell } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { districts, areas } from '@/data/loadSheddingData';

interface AreaSelectionCardProps {
  selectedDistrict: string;
  selectedArea: string;
  onDistrictChange: (district: string) => void;
  onAreaChange: (area: string) => void;
}

export const AreaSelectionCard = ({
  selectedDistrict,
  selectedArea,
  onDistrictChange,
  onAreaChange
}: AreaSelectionCardProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-blue-600" />
          Select Your Area
        </CardTitle>
        <CardDescription>
          Choose your district and area to get personalized load shedding information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
            <Select value={selectedDistrict} onValueChange={onDistrictChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>{district}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
            <Select 
              value={selectedArea} 
              onValueChange={onAreaChange}
              disabled={!selectedDistrict}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent>
                {selectedDistrict && areas[selectedDistrict] && areas[selectedDistrict].map((area) => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {selectedDistrict && selectedArea && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <Bell className="h-4 w-4 inline mr-1" />
              You will receive notifications for load shedding updates in {selectedArea}, {selectedDistrict}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};