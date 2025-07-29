import React from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { currentOutages } from '@/data/loadSheddingData';

export const CurrentOutagesCard = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-orange-600" />
          Current Outages & Schedules
        </CardTitle>
        <CardDescription>
          Real-time information about ongoing and upcoming power outages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentOutages.map((outage, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-lg">{outage.area}</h4>
                  <p className="text-sm text-gray-600">{outage.startTime} - {outage.endTime} ({outage.duration})</p>
                </div>
                <Badge 
                  variant={outage.status === 'ongoing' ? 'destructive' : 
                           outage.status === 'scheduled' ? 'secondary' : 'default'}
                >
                  {outage.status === 'ongoing' ? 'Ongoing' : 
                   outage.status === 'scheduled' ? 'Scheduled' : 'Resolved'}
                </Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Reason:</strong> {outage.reason}
                </div>
                <div>
                  <strong>Affected Customers:</strong> {outage.affectedCustomers}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};