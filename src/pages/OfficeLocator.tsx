import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Navigation, Search, Zap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const OfficeLocator = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const districts = [
    'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Biratnagar', 
    'Butwal', 'Dharan', 'Janakpur', 'Nepalgunj', 'Chitwan', 'Birgunj',
    'Dhangadhi', 'Mahendranagar', 'Tulsipur', 'Gorkha'
  ];

  const offices = [
    {
      name: 'NEA Central Office',
      district: 'Kathmandu',
      address: 'Durbar Marg, Kathmandu-1',
      phone: '01-4414314',
      email: 'info@nea.org.np',
      type: 'Head Office',
      services: ['Bill Payment', 'New Connection', 'Complaints', 'Technical Support'],
      workingHours: '10:00 AM - 5:00 PM',
      coordinates: { lat: 27.7103, lng: 85.3222 }
    },
    {
      name: 'NEA Baneshwor Office',
      district: 'Kathmandu',
      address: 'Baneshwor, Kathmandu-10',
      phone: '01-4478290',
      email: 'baneshwor@nea.org.np',
      type: 'Branch Office',
      services: ['Bill Payment', 'Meter Reading', 'Complaints'],
      workingHours: '10:00 AM - 4:00 PM',
      coordinates: { lat: 27.6951, lng: 85.3378 }
    },
    {
      name: 'NEA Patan Office',
      district: 'Lalitpur',
      address: 'Patan Dhoka, Lalitpur',
      phone: '01-5521452',
      email: 'patan@nea.org.np',
      type: 'Branch Office',
      services: ['Bill Payment', 'New Connection', 'Technical Support'],
      workingHours: '10:00 AM - 4:00 PM',
      coordinates: { lat: 27.6734, lng: 85.3250 }
    },
    {
      name: 'NEA Bhaktapur Office',
      district: 'Bhaktapur',
      address: 'Durbar Square, Bhaktapur',
      phone: '01-6610348',
      email: 'bhaktapur@nea.org.np',
      type: 'Branch Office',
      services: ['Bill Payment', 'Complaints', 'Meter Reading'],
      workingHours: '10:00 AM - 4:00 PM',
      coordinates: { lat: 27.6722, lng: 85.4276 }
    },
    {
      name: 'NEA Pokhara Office',
      district: 'Pokhara',
      address: 'Mahendrapul, Pokhara-17',
      phone: '061-460814',
      email: 'pokhara@nea.org.np',
      type: 'Regional Office',
      services: ['Bill Payment', 'New Connection', 'Complaints', 'Technical Support'],
      workingHours: '10:00 AM - 5:00 PM',
      coordinates: { lat: 28.2096, lng: 83.9856 }
    },
    {
      name: 'NEA Biratnagar Office',
      district: 'Biratnagar',
      address: 'Main Road, Biratnagar-1',
      phone: '021-525314',
      email: 'biratnagar@nea.org.np',
      type: 'Regional Office',
      services: ['Bill Payment', 'New Connection', 'Technical Support'],
      workingHours: '10:00 AM - 5:00 PM',
      coordinates: { lat: 26.4569, lng: 87.2773 }
    }
  ];

  const filteredOffices = offices.filter(office => {
    const matchesDistrict = selectedDistrict === "All" || office.district === selectedDistrict;
    const matchesSearch = !searchTerm || 
      office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.district.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDistrict && matchesSearch;
  });

  const getOfficeColor = (type) => {
    switch(type) {
      case 'Head Office': return 'bg-red-600';
      case 'Regional Office': return 'bg-blue-600';
      case 'Branch Office': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-red-600 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">NEA Connect</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">NEA Office Locator</h2>
          <p className="text-lg text-gray-600">
            Find Nepal Electricity Authority offices near you
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2 text-blue-600" />
              Find NEA Office
            </CardTitle>
            <CardDescription>
              Search by district, office name, or address
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <Input
                  placeholder="Search by name, address, or district..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by District</label>
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger>
                    <SelectValue placeholder="All districts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Districts</SelectItem>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <strong>{filteredOffices.length}</strong> office{filteredOffices.length !== 1 ? 's' : ''} 
            {selectedDistrict && ` in ${selectedDistrict}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Office List */}
        <div className="grid gap-6">
          {filteredOffices.map((office, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{office.name}</CardTitle>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{office.address}</span>
                    </div>
                  </div>
                  <Badge className={`${getOfficeColor(office.type)} text-white`}>
                    {office.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-sm">
                        <strong>Phone:</strong> {office.phone}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-sm">
                        <strong>Hours:</strong> {office.workingHours}
                      </span>
                    </div>
                    <div className="text-sm">
                      <strong>Email:</strong> {office.email}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Available Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {office.services.map((service, serviceIndex) => (
                        <Badge key={serviceIndex} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`https://maps.google.com/?q=${office.coordinates.lat},${office.coordinates.lng}`, '_blank')}
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    Get Directions
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`tel:${office.phone}`, '_self')}
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Call Office
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOffices.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No offices found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or check back later.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Emergency Contact */}
        <Card className="mt-8 bg-gradient-to-r from-red-600 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="text-white">Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">24/7 Helpline</h4>
                <p className="text-lg font-bold">1660-01-10001</p>
                <p className="text-sm opacity-90">For power outages and emergencies</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Customer Service</h4>
                <p className="text-lg font-bold">01-4414314</p>
                <p className="text-sm opacity-90">For general inquiries (10 AM - 5 PM)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OfficeLocator;