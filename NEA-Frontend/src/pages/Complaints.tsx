import axios from 'axios';
import React, { useState } from 'react';

import { api } from '../lib/api';
import { Link } from 'react-router-dom';
import { MessageSquare, Plus, Upload, Search, Clock, CheckCircle, AlertTriangle, Zap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const Complaints = () => {
  const [activeTab, setActiveTab] = useState('register');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    customerId: '',
    category: '',
    description: '',
    priority: 'medium'
  });
  const [trackingId, setTrackingId] = useState('');
  const [file, setFile] = useState(null);

interface ComplaintDetails {
  trackingId: string;
  name: string;
  phone: string;
  email?: string;
  category: string;
  description: string;
  priority: string;
  status: string;
  assignedTo?: string | null;
  createdAt: string;
  updatedAt: string;
}

const [complaintDetails, setComplaintDetails] = useState<ComplaintDetails | null>(null);



  const handleFileChange = (e) => {
  setFile(e.target.files[0]); // Store the selected file
};

  const mockComplaints = [
    {
      id: 'NEA-2024-001',
      category: 'Power Outage',
      description: 'Frequent power cuts in Baneshwor area',
      status: 'In Progress',
      priority: 'High',
      date: '2024-01-15',
      assignedTo: 'Technical Team A'
    },
    {
      id: 'NEA-2024-002',
      category: 'Billing Issue',
      description: 'Incorrect meter reading in December bill',
      status: 'Resolved',
      priority: 'Medium',
      date: '2024-01-10',
      assignedTo: 'Billing Department'
    },
    {
    id: 'NEA-2024-003',
    category: 'Meter Problem',
    description: 'Meter malfunction in the Lalitpur area',
    status: 'Pending',
    priority: 'High',
    date: '2024-01-12',
    assignedTo: 'Metering Team'
  },
  {
    id: 'NEA-2024-004',
    category: 'Voltage Fluctuation',
    description: 'Voltage fluctuations causing appliance damage in Kathmandu',
    status: 'In Progress',
    priority: 'Urgent',
    date: '2024-01-13',
    assignedTo: 'Technical Team B'
  },
  {
    id: 'NEA-2024-005',
    category: 'New Connection',
    description: 'Request for new electricity connection in Bhaktapur',
    status: 'Resolved',
    priority: 'Medium',
    date: '2024-01-09',
    assignedTo: 'Connection Team'
  }
  ];

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.phone || !formData.category || !formData.description) {
    toast.error('Please fill in all required fields');
    return;
  }

  const form = new FormData();

const userId = localStorage.getItem('userId'); 
if (userId && userId !== 'null') {
    form.append('userId', userId); // Append only if valid
  }// assuming it's stored during login


  form.append('name', formData.name);
  form.append('phone', formData.phone);
  form.append('email', formData.email);
  form.append('customerId', formData.customerId);
  form.append('category', formData.category);
  form.append('description', formData.description);
  form.append('priority', formData.priority);

  if (file) {
    form.append('attachment', file);  // Append file if available
  }

  try {const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/complaints`, form, {
    
      headers: {
        'Content-Type': 'multipart/form-data', // Required to send files
      },
    });
    toast.success('Complaint registered successfully!');
    // Reset form and file input
    setFormData({
      name: '',
      phone: '',
      email: '',
      customerId: '',
      category: '',
      description: '',
      priority: 'medium'
    });
    setFile(null);
  } catch (error) {
    toast.error('Failed to submit complaint');
  }
};

const handleTrackComplaint = async () => {
  if (!trackingId.trim()) {
    toast.error('Please enter a tracking ID');
    return;
  }

  try {
   const response = await axios.get<ComplaintDetails>(`${import.meta.env.VITE_BACKEND_URL}/api/complaints/${trackingId}`);

    
    if (response.status === 200) {
      // Display the complaint status or other details based on your API response
      toast.success('Complaint details found!');
      setComplaintDetails(response.data);
      // Update your UI to show the complaint details here
    } else {
      toast.error('No complaint found with the given ID');
    }
  } catch (error) {
    toast.error('No complaint found with the given ID');
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Complaint Management</h2>
          <p className="text-lg text-gray-600">
            Register new complaints or track existing ones
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('register')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'register'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Plus className="h-4 w-4 inline mr-2" />
              Register Complaint
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'track'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Search className="h-4 w-4 inline mr-2" />
              Track Complaint
            </button>
          </div>
        </div>

        {/* Register Complaint Tab */}
        {activeTab === 'register' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                Register New Complaint
              </CardTitle>
              <CardDescription>
                Fill out the form below to register your complaint. We'll provide you with a tracking ID.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerId">Customer ID</Label>
                    <Input
                      id="customerId"
                      value={formData.customerId}
                      onChange={(e) => setFormData({...formData, customerId: e.target.value})}
                      placeholder="Enter your Customer ID"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="category">Complaint Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select complaint category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="power-outage">Power Outage</SelectItem>
                        <SelectItem value="billing-issue">Billing Issue</SelectItem>
                        <SelectItem value="meter-problem">Meter Problem</SelectItem>
                        <SelectItem value="voltage-fluctuation">Voltage Fluctuation</SelectItem>
                        <SelectItem value="connection-issue">New Connection</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Complaint Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe your complaint in detail..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="attachment">Attach Image (Optional)</Label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*"onChange={handleFileChange} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      {/* ✅ Show file name after selection */}
      {file && (
        <p className="mt-2 text-sm text-green-600 font-medium">
          Selected file: {file.name}
        </p>
      )}

                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Register Complaint
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Track Complaint Tab */}
        {activeTab === 'track' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2 text-blue-600" />
                  Track Your Complaint
                </CardTitle>
                <CardDescription>
                  Enter your tracking ID to check the status of your complaint
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="trackingId">Tracking ID</Label>
                    <Input
                      id="trackingId"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      placeholder="Enter your tracking ID (e.g., NEA-2024-001)"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleTrackComplaint} className="bg-blue-600 hover:bg-blue-700">
                      <Search className="h-4 w-4 mr-2" />
                      Track
                    </Button>
                  </div>  
                </div>
              </CardContent>
            </Card>

            {complaintDetails && (
  <div className="mt-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Complaint Details</CardTitle>
      </CardHeader>
      <CardContent>
       <div className="grid md:grid-cols-2 gap-4 text-gray-700 text-sm">
  <div>
    <strong className="text-gray-900">Name:</strong> {complaintDetails.name}
  </div>
  <div>
    <strong className="text-gray-900">Phone:</strong> {complaintDetails.phone}
  </div>
  {complaintDetails.email && (
    <div>
      <strong className="text-gray-900">Email:</strong> {complaintDetails.email}
    </div>
  )}
  <div>
    <strong className="text-gray-900">Tracking ID:</strong> {complaintDetails.trackingId}
  </div>
  <div>
    <strong className="text-gray-900">Category:</strong> {complaintDetails.category}
  </div>
  <div>
    <strong className="text-gray-900">Priority:</strong>{' '}
    <span
      className={`font-medium ${
        complaintDetails.priority === 'high'
          ? 'text-red-600'
          : complaintDetails.priority === 'medium'
          ? 'text-yellow-600'
          : 'text-green-600'
      }`}
    >
      {complaintDetails.priority}
    </span>
  </div>
  <div className="col-span-2">
    <strong className="text-gray-900">Description:</strong> {complaintDetails.description}
  </div>
  <div>
    <strong className="text-gray-900">Status:</strong>{' '}
    <span
      className={`font-medium ${
        complaintDetails.status === 'Resolved'
          ? 'text-green-600'
          : complaintDetails.status === 'Pending'
          ? 'text-yellow-600'
          : 'text-blue-600'
      }`}
    >
      {complaintDetails.status}
    </span>
  </div>
  <div>
    <strong className="text-gray-900">Assigned To:</strong> {complaintDetails.assignedTo || 'Not Assigned'}
  </div>
  <div>
    <strong className="text-gray-900">Created At:</strong>{' '}
    {new Date(complaintDetails.createdAt).toLocaleString()}
  </div>
  <div>
    <strong className="text-gray-900">Updated At:</strong>{' '}
    {new Date(complaintDetails.updatedAt).toLocaleString()}
  </div>
</div>

      </CardContent>
    </Card>
  </div>
)}


            


            {/* Sample Complaint Status */}
            <div className="grid gap-4">
              {mockComplaints.map((complaint) => (
                <Card key={complaint.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{complaint.id}</CardTitle>
                        <CardDescription>{complaint.category}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        {complaint.status === 'Resolved' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : complaint.status === 'In Progress' ? (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          complaint.status === 'Resolved' 
                            ? 'bg-green-100 text-green-800'
                            : complaint.status === 'In Progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {complaint.status}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{complaint.description}</p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <strong>Priority:</strong> <span className={`${
                          complaint.priority === 'High' ? 'text-red-600' : 
                          complaint.priority === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                        }`}>{complaint.priority}</span>
                      </div>
                      <div>
                        <strong>Date:</strong> {complaint.date}
                      </div>
                      <div>
                        <strong>Assigned to:</strong> {complaint.assignedTo}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Complaints;