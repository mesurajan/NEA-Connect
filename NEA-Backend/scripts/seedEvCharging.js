require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');

// Adjust the path to your model based on your folder structure
const EvChargingStation = require(path.join(__dirname, '..', 'models', 'EvChargingStation'));

const stations = [

    //to add new data :node Scripts/seedEvCharging.js
  {
    name: "NEA Charging Hub - Durbar Marg",
    address: "Durbar Marg, Kathmandu",
    district: "Kathmandu",
    coordinates: "27.7172° N, 85.3240° E",
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
    name: "NEA Quick Charge - Thamel",
    address: "Thamel Road, Kathmandu",
    district: "Kathmandu",
    coordinates: "27.7152° N, 85.3107° E",
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
    name: "NEA Super Charger - Ring Road",
    address: "Ring Road, Baneshwor",
    district: "Kathmandu",
    coordinates: "27.6915° N, 85.3400° E",
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
    name: "NEA Charging Point - Lalitpur",
    address: "Jawalakhel, Lalitpur",
    district: "Lalitpur",
    coordinates: "27.6710° N, 85.3234° E",
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
    name: "NEA Fast Charge - Bhaktapur",
    address: "Bhaktapur Durbar Square",
    district: "Bhaktapur",
    coordinates: "27.6721° N, 85.4278° E",
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
    name: "NEA Highway Charger - Nagdhunga",
    address: "Tribhuvan Highway, Nagdhunga",
    district: "Kathmandu",
    coordinates: "27.7039° N, 85.2072° E",
    status: "Available",
    totalPorts: 8,
    availablePorts: 6,
    chargingSpeed: "100 kW DC Fast",
    pricing: "Rs. 28/kWh",
    rating: 4.7,
    amenities: ["24/7 Open", "Food Court", "Rest Area", "Fuel Station"],
    phone: "01-4280456"
  }
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB for seeding...');
  await EvChargingStation.deleteMany({}); // Clear existing data
  await EvChargingStation.insertMany(stations);
  console.log('Seeding completed.');
  mongoose.disconnect();
})
.catch(err => {
  console.error('Seeding error:', err);
});
