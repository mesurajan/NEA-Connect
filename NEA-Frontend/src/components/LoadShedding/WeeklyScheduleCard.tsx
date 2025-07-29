import React from 'react';
import { Calendar, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { weeklySchedule } from '@/data/loadSheddingData';

export const WeeklyScheduleCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-blue-600" />
          Weekly Load Shedding Schedule
        </CardTitle>
        <CardDescription>
          Planned load shedding schedule for this week (subject to change)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Day</th>
                <th className="text-left py-2 px-4">Time</th>
                <th className="text-left py-2 px-4">Affected Areas</th>
              </tr>
            </thead>
            <tbody>
              {weeklySchedule.map((schedule, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{schedule.day}</td>
                  <td className="py-3 px-4">{schedule.time}</td>
                  <td className="py-3 px-4">
                    {schedule.areas.map((area, i) => (
                      <Badge key={i} variant="outline" className="mr-1 mb-1">
                        {area}
                      </Badge>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Important Notice:</p>
              <p>Load shedding schedules may change based on power generation and demand. 
                 Please check this page regularly for updates or enable notifications for your area.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};