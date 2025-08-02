import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsData {
  totalStations: number;
  totalPorts: number;
  availableNow: number;
  districtsCovered: number;
}

interface EVChargingStatsProps {
  stats: StatsData;
}

const EVChargingStats: React.FC<EVChargingStatsProps> = ({ stats }) => {
  const statsCards = [
    {
      label: 'Total Stations',
      value: stats.totalStations,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200'
    },
    {
      label: 'Charging Ports',
      value: stats.totalPorts,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      label: 'Available Now',
      value: stats.availableNow,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      label: 'Districts Covered',
      value: stats.districtsCovered,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {statsCards.map((stat, index) => (
        <Card 
          key={stat.label} 
          className={`text-center hover:shadow-lg transition-all duration-300 ${stat.bgColor} ${stat.borderColor} animate-in slide-in-from-bottom-4`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="pt-6">
            <div className={`text-2xl font-bold ${stat.color} animate-pulse`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EVChargingStats;