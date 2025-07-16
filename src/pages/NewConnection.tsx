


import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { 
  Zap, 
  ArrowLeft, 
  Home, 
  FileText, 
  User, 
  MapPin,
  Phone,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';



const NewConnection = () => {

  const [formData, setFormData] = useState({
  fullName: '',
  citizenshipNo: '',
  phone: '',
  email: '',
  propertyAddress: '',
  district: '',
  municipality: '',
  wardNo: '',
  connectionType: '',
  loadDemand: '',
  additionalInfo: ''
  });

  const [files, setFiles] = useState({
  citizenship: null,
  landCertificate: null,
  constructionPermit: null,
  sitePlan: null
  });

  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);



 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const form = new FormData();
  Object.entries(formData).forEach(([key, value]) => form.append(key, value));
  Object.entries(files).forEach(([key, file]) => file && form.append(key, file));

  try {
    const response = await fetch('http://localhost:5000/api/connections', {
      method: 'POST',
      body: form,
    });

    if (response.ok) {
      setSubmissionStatus('success');

      // ✅ Clear the form fields
      setFormData({
        fullName: '',
        citizenshipNo: '',
        phone: '',
        email: '',
        propertyAddress: '',
        district: '',
        municipality: '',
        wardNo: '',
        connectionType: '',
        loadDemand: '',
        additionalInfo: ''
      });

      setFiles({
        citizenship: null,
        landCertificate: null,
        constructionPermit: null,
        sitePlan: null
      });

      setTimeout(() => setSubmissionStatus(null), 4000);
    } else {
      setSubmissionStatus('error');
      setTimeout(() => setSubmissionStatus(null), 4000);
    }
  } catch (err) {
    console.error(err);
    setSubmissionStatus('error');
    setTimeout(() => setSubmissionStatus(null), 4000);
  }
};



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { id, files: selectedFiles } = e.target;
  if (selectedFiles && selectedFiles.length > 0) {
    setFiles(prev => ({ ...prev, [id]: selectedFiles[0] }));
   }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-red-600 p-2 rounded-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">NEA Connect</h1>
                <p className="text-sm text-gray-600">New Connection Request</p>
              </div>
            </div>
            <nav className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Home
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">New Electricity Connection Request</h2>
          <p className="text-lg text-gray-600">
            Apply for a new electricity connection for your residential or commercial property
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Information Cards */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Required Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Citizenship/Passport copy</li>
                  <li>• Land ownership certificate</li>
                  <li>• House construction permit</li>
                  <li>• Site plan/map</li>
                  <li>• Passport size photos (2)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Home className="h-5 w-5 mr-2 text-orange-600" />
                  Connection Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">Residential</p>
                    <p className="text-gray-600">Up to 15 KW capacity</p>
                  </div>
                  <div>
                    <p className="font-medium">Commercial</p>
                    <p className="text-gray-600">15 KW and above</p>
                  </div>
                  <div>
                    <p className="font-medium">Industrial</p>
                    <p className="text-gray-600">Custom capacity</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Application Form</CardTitle>
                <CardDescription>
                  Fill out all required fields to submit your new connection request
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2 text-blue-600" />
                      Personal Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input id="fullName" name="fullName" type="text" required value={formData.fullName} onChange={handleInputChange}/>

                      </div>
                      <div>
                        <Label htmlFor="citizenshipNo">Citizenship No. *</Label>
                        <Input id="citizenshipNo" type="text" required value={formData.citizenshipNo} onChange={handleInputChange}/>
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" type="tel" required value={formData.phone} onChange={handleInputChange}/>
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" required value={formData.email} onChange={handleInputChange}/>
                      </div>
                    </div>
                  </div>

                  {/* Property Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-green-600" />
                      Property Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="propertyAddress">Property Address *</Label>
                        <Textarea id="propertyAddress" name="propertyAddress" rows={3} required value={formData.propertyAddress} onChange={handleInputChange}/>

                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="district">District *</Label>
                          <Input id="district" type="text" required value={formData.district} onChange={handleInputChange}/>
                        </div>
                        <div>
                          <Label htmlFor="municipality">Municipality/VDC *</Label>
                          <Input id="municipality" type="text" required value={formData.municipality} onChange={handleInputChange}/>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="wardNo">Ward No. *</Label>
                          <Input id="wardNo" type="number" required value={formData.wardNo} onChange={handleInputChange}/>
                        </div>
                        <div>
                          <Label htmlFor="connectionType">Connection Type *</Label>
                          <select  id="connectionType" value={formData.connectionType}onChange={handleInputChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required >
                            <option value="">Select type</option>
                            <option value="residential">Residential</option>
                            <option value="commercial">Commercial</option>
                            <option value="industrial">Industrial</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="loadDemand">Load Demand (KW) *</Label>
                          <Input id="loadDemand" type="number" step="0.1" required value={formData.loadDemand} onChange={handleInputChange}/>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Document Upload */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Upload className="h-5 w-5 mr-2 text-purple-600" />
                      Document Upload
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="citizenship">Citizenship Copy *</Label>
                        <Input id="citizenship" type="file" accept=".pdf,.jpg,.jpeg,.png" required onChange={handleFileChange}/>
                      </div>
                      <div>
                        <Label htmlFor="landCertificate">Land Ownership Certificate *</Label>
                        <Input id="landCertificate" type="file" accept=".pdf,.jpg,.jpeg,.png" required onChange={handleFileChange}/>
                      </div>
                      <div>
                        <Label htmlFor="constructionPermit">Construction Permit</Label>
                        <Input id="constructionPermit" type="file" accept=".pdf,.jpg,.jpeg,.png" required onChange={handleFileChange}/>
                      </div>
                      <div>
                        <Label htmlFor="sitePlan">Site Plan/Map</Label>
                        <Input id="sitePlan" type="file" accept=".pdf,.jpg,.jpeg,.png" required onChange={handleFileChange}/>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <Label htmlFor="additionalInfo">Additional Information</Label>
                    <Textarea 
                      id="additionalInfo" 
                      rows={3} required value={formData.additionalInfo} onChange={handleInputChange}
                      placeholder="Any additional details or special requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" asChild>
                      <Link to="/">Cancel</Link>
                    </Button>
                    <Button type="submit" className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700">
                      Submit Application
                    </Button>
                  </div>

{submissionStatus === 'success' && (
  <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 rounded-md bg-white p-4 shadow-lg border-l-4 border-green-500">
    <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    <span className="text-sm font-medium text-gray-800">Your connection request was submitted successfully!</span>
  </div>
)}

{submissionStatus === 'error' && (
  <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 rounded-md bg-white p-4 shadow-lg border-l-4 border-red-500">
    <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
    <span className="text-sm font-medium text-gray-800">Submission failed. Please try again.</span>
  </div>
)}

                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Information Footer */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <Phone className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-2">
                For assistance with your application or any questions, contact our customer service:
              </p>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Phone: 1660-01-10001</p>
                <p>Email: newconnection@nea.org.np</p>
                <p>Office Hours: Sunday - Friday, 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewConnection;