import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const QuickStatsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
          Quick Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Areas with Power</span>
            <span className="font-semibold text-green-600">87%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Scheduled Outages Today</span>
            <span className="font-semibold text-orange-600">3</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Emergency Outages</span>
            <span className="font-semibold text-red-600">1</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Avg. Outage Duration</span>
            <span className="font-semibold">2.5 hours</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};