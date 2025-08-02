import { useState, useEffect, useMemo } from 'react';

export interface ChargingStation {
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

export interface StatsData {
  totalStations: number;
  totalPorts: number;
  availableNow: number;
  districtsCovered: number;
}

export const useEVChargingData = () => {
  const [stations] = useState<ChargingStation[]>([
    {
      id: 1,
      name: "NEA Charging Hub - Durbar Marg",
      address: "Durbar Marg, Kathmandu",
      district: "Kathmandu",
      coordinates: "27.7172° N, 85.3240° E",
      distance: "1.2 km",
      status: "Available",
      totalPorts: 8,
      availablePorts: 5,
      chargingSpeed: "50 kW DC Fast",
      pricing: "Rs. 25/kWh",
      rating: 4.8,
      amenities: ["24/7 Open", "WiFi", "Restroom", "Cafe"],
      phone: "01-4442233"
    },
    {
      id: 2,
      name: "NEA Quick Charge - Thamel",
      address: "Thamel Road, Kathmandu",
      district: "Kathmandu",
      coordinates: "27.7152° N, 85.3107° E",
      distance: "2.1 km",
      status: "Available",
      totalPorts: 4,
      availablePorts: 2,
      chargingSpeed: "22 kW AC",
      pricing: "Rs. 20/kWh",
      rating: 4.6,
      amenities: ["Covered Parking", "Security", "ATM"],
      phone: "01-4700022"
    },
    {
      id: 3,
      name: "NEA Super Charger - Ring Road",
      address: "Ring Road, Baneshwor",
      district: "Kathmandu",
      coordinates: "27.6915° N, 85.3400° E",
      distance: "3.5 km",
      status: "Busy",
      totalPorts: 12,
      availablePorts: 1,
      chargingSpeed: "150 kW DC Ultra Fast",
      pricing: "Rs. 30/kWh",
      rating: 4.9,
      amenities: ["24/7 Open", "Restaurant", "Shopping Mall", "Car Wash"],
      phone: "01-4466789"
    },
    {
      id: 4,
      name: "NEA Charging Point - Lalitpur",
      address: "Jawalakhel, Lalitpur",
      district: "Lalitpur",
      coordinates: "27.6710° N, 85.3234° E",
      distance: "4.2 km",
      status: "Available",
      totalPorts: 6,
      availablePorts: 4,
      chargingSpeed: "50 kW DC Fast",
      pricing: "Rs. 25/kWh",
      rating: 4.7,
      amenities: ["Covered Parking", "WiFi", "Convenience Store"],
      phone: "01-5432100"
    },
    {
      id: 5,
      name: "NEA Fast Charge - Bhaktapur",
      address: "Bhaktapur Durbar Square",
      district: "Bhaktapur",
      coordinates: "27.6721° N, 85.4278° E",
      distance: "5.8 km",
      status: "Available",
      totalPorts: 6,
      availablePorts: 3,
      chargingSpeed: "50 kW DC Fast",
      pricing: "Rs. 25/kWh",
      rating: 4.5,
      amenities: ["Historic Site", "Tourist Info", "Parking"],
      phone: "01-6610123"
    },
    {
      id: 6,
      name: "NEA Highway Charger - Nagdhunga",
      address: "Tribhuvan Highway, Nagdhunga",
      district: "Kathmandu",
      coordinates: "27.7039° N, 85.2072° E",
      distance: "12.1 km",
      status: "Available",
      totalPorts: 8,
      availablePorts: 6,
      chargingSpeed: "100 kW DC Fast",
      pricing: "Rs. 28/kWh",
      rating: 4.7,
      amenities: ["24/7 Open", "Food Court", "Rest Area", "Fuel Station"],
      phone: "01-4280456"
    }
  ]);

  const stats: StatsData = useMemo(() => {
    const totalStations = stations.length;
    const totalPorts = stations.reduce((sum, station) => sum + station.totalPorts, 0);
    const availableNow = stations.reduce((sum, station) => sum + station.availablePorts, 0);
    const districtsCovered = new Set(stations.map(station => station.district)).size;

    return {
      totalStations,
      totalPorts,
      availableNow,
      districtsCovered
    };
  }, [stations]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random availability changes
      stations.forEach(station => {
        if (Math.random() < 0.1) { // 10% chance of change
          const change = Math.random() < 0.5 ? -1 : 1;
          station.availablePorts = Math.max(0, Math.min(station.totalPorts, station.availablePorts + change));
          
          // Update status based on availability
          if (station.availablePorts === 0) {
            station.status = 'Busy';
          } else if (station.availablePorts > station.totalPorts * 0.5) {
            station.status = 'Available';
          } else {
            station.status = 'Busy';
          }
        }
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [stations]);

  return { stations, stats };
};