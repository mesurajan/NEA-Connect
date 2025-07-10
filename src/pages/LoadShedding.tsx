import React, { useState } from 'react';
import { LoadSheddingHeader } from '@/components/LoadShedding/LoadSheddingHeader';
import { AreaSelectionCard } from '@/components/LoadShedding/AreaSelectionCard';
import { PowerStatusCard } from '@/components/LoadShedding/PowerStatusCard';
import { QuickStatsCard } from '@/components/LoadShedding/QuickStatsCard';
import { CurrentOutagesCard } from '@/components/LoadShedding/CurrentOutagesCard';
import { WeeklyScheduleCard } from '@/components/LoadShedding/WeeklyScheduleCard';

const LoadShedding = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
      <LoadSheddingHeader />

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Load Shedding Updates</h2>
          <p className="text-lg text-gray-600">
            Stay informed about planned outages and real-time power status in your area
          </p>
        </div>

        <AreaSelectionCard
          selectedDistrict={selectedDistrict}
          selectedArea={selectedArea}
          onDistrictChange={setSelectedDistrict}
          onAreaChange={setSelectedArea}
        />

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <PowerStatusCard 
            selectedArea={selectedArea} 
            selectedDistrict={selectedDistrict} 
          />
          <QuickStatsCard />
        </div>

        <CurrentOutagesCard />

        <WeeklyScheduleCard />
      </div>
    </div>
  );
};

export default LoadShedding;