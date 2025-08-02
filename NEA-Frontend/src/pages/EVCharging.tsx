import React, { useState } from 'react';
import { toast } from 'sonner';
import EVChargingHeader from '@/components/EVCharging/EVChargingHeader';
import EVChargingSearchFilters from '@/components/EVCharging/EVChargingSearchFilters';
import EVChargingStats from '@/components/EVCharging/EVChargingStats';
import EVChargingMap from '@/components/EVCharging/EVChargingMap';
import EVChargingStationList from '@/components/EVCharging/EVChargingStationList';
import { useEVChargingData, type ChargingStation } from '@/hooks/useEVChargingData';

const EVCharging = () => {
  const [searchLocation, setSearchLocation] = useState('');
  
  // Use "all" as default instead of empty string
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null);
  const { stations, stats } = useEVChargingData();

  const filteredStations = stations.filter(station => {
    const matchesSearch = searchLocation === '' || 
      station.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
      station.address.toLowerCase().includes(searchLocation.toLowerCase());

    // Change filter check to 'all'
    const matchesDistrict = selectedDistrict === 'all' || station.district === selectedDistrict;

    return matchesSearch && matchesDistrict;
  });

  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      setSearchLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
      toast.success('Current location detected');
    } catch (error) {
      toast.error('Unable to get your location');
    }
  };

  const handleNavigate = (station: ChargingStation) => {
    const [lat, lng] = station.coordinates.split('° N, ');
    const latitude = lat;
    const longitude = lng.split('° E')[0];
    
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
    window.open(url, '_blank');
    
    toast.success(`Opening directions to ${station.name}`);
  };

  const handleCall = (station: ChargingStation) => {
    window.open(`tel:${station.phone}`);
    toast.info(`Calling ${station.name}`);
  };

  const handleReserve = (station: ChargingStation) => {
    toast.success(`Reservation request sent for ${station.name}`);
  };

  const handleStationSelect = (station: ChargingStation) => {
    setSelectedStation(station);
    toast.info(`Selected ${station.name}`);
  };

  const handleMoreFilters = () => {
    toast.info('Advanced filters coming soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50">
      <EVChargingHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <EVChargingSearchFilters
            searchLocation={searchLocation}
            setSearchLocation={setSearchLocation}
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={setSelectedDistrict}
            onUseCurrentLocation={handleUseCurrentLocation}
          />
        </div>

        <EVChargingStats stats={stats} />

        <div className="mb-8">
          <EVChargingMap 
            stations={filteredStations}
            onStationSelect={handleStationSelect}
          />
        </div>

        <EVChargingStationList
          stations={filteredStations}
          onNavigate={handleNavigate}
          onCall={handleCall}
          onReserve={handleReserve}
          onMoreFilters={handleMoreFilters}
        />
      </div>
    </div>
  );
};

export default EVCharging;
