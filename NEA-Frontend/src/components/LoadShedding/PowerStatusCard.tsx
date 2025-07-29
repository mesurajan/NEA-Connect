import React from 'react';
import { Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PowerStatusCardProps {
  selectedArea: string;
  selectedDistrict: string;
}

export const PowerStatusCard = ({ selectedArea, selectedDistrict }: PowerStatusCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-green-600">
          <Zap className="h-5 w-5 mr-2" />
          Current Power Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-green-600 mb-2">Power Available</h3>
          <p className="text-gray-600">
            {selectedArea && selectedDistrict 
              ? `${selectedArea}, ${selectedDistrict} has power supply`
              : 'Most areas currently have power supply'
            }
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: 2 minutes ago</p>
        </div>
      </CardContent>
    </Card>
  );
};