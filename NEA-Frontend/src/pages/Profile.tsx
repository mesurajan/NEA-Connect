import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Building, CreditCard, Calendar, Edit2, Save, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Cityville, State 12345',
    accountNumber: 'NEA-2024-001234',
    connectionType: 'Residential',
    tariffPlan: 'Standard Rate',
    avgMonthlyUsage: '350 kWh',
    memberSince: '2020-03-15',
    lastBillAmount: '$89.50',
    nextBillDate: '2024-02-15',
    paymentMethod: '**** **** **** 1234',
    emergencyContact: 'Jane Doe - +1 (555) 987-6543'
  });

  const [editData, setEditData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(profileData);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            </div>
            
            {!isEditing ? (
              <Button onClick={handleEdit} className="flex items-center space-x-2">
                <Edit2 className="h-4 w-4" />
                <span>Edit Profile</span>
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button onClick={handleSave} className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </Button>
                <Button variant="outline" onClick={handleCancel} className="flex items-center space-x-2">
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-2xl">
                    {profileData.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{profileData.fullName}</CardTitle>
                <Badge variant="secondary" className="mt-2">
                  {profileData.connectionType} Customer
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{profileData.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{profileData.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{profileData.accountNumber}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Member since {new Date(profileData.memberSince).getFullYear()}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="fullName"
                      value={editData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded">{profileData.fullName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded">{profileData.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded">{profileData.phone}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  {isEditing ? (
                    <Input
                      id="emergencyContact"
                      value={editData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded">{profileData.emergencyContact}</p>
                  )}
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={editData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded">{profileData.address}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>Account Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Account Number</Label>
                  <p className="p-2 bg-gray-50 rounded font-mono">{profileData.accountNumber}</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Connection Type</Label>
                  <p className="p-2 bg-gray-50 rounded">{profileData.connectionType}</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Tariff Plan</Label>
                  <p className="p-2 bg-gray-50 rounded">{profileData.tariffPlan}</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Average Monthly Usage</Label>
                  <p className="p-2 bg-gray-50 rounded">{profileData.avgMonthlyUsage}</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Member Since</Label>
                  <p className="p-2 bg-gray-50 rounded">{new Date(profileData.memberSince).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>

            {/* Billing Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Billing Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Last Bill Amount</Label>
                  <p className="p-2 bg-gray-50 rounded font-semibold text-green-600">{profileData.lastBillAmount}</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Next Bill Date</Label>
                  <p className="p-2 bg-gray-50 rounded">{new Date(profileData.nextBillDate).toLocaleDateString()}</p>
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label>Payment Method</Label>
                  <p className="p-2 bg-gray-50 rounded">{profileData.paymentMethod}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;