import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Download, Calendar, DollarSign, Zap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const BillInquiry = () => {
  const [customerId, setCustomerId] = useState('');
  const [billData, setBillData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shortBillId, setShortBillId] = useState('');
  const [trackData, setTrackData] = useState(null);
  const [trackLoading, setTrackLoading] = useState(false);

  const handleBillSearch = async () => {
    if (!customerId) {
      toast.error('Please enter a Customer ID');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bills/search?userId=${encodeURIComponent(customerId)}`);
      if (!response.ok) throw new Error('Bill not found');
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setBillData(data[0]);
        toast.success('Bill details retrieved successfully');
      } else {
        setBillData(null);
        toast.error('No bill found for this Customer ID');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to retrieve bill details');
      setBillData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackSearch = async () => {
    if (!shortBillId.trim()) {
      toast.error('Please enter a Short Bill ID');
      return;
    }

    setTrackLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bills/short/${shortBillId}`);
      const data = await response.json();
      if (!response.ok) {
        toast.error(data?.error || 'Invalid Short Bill ID');
        setTrackData(null);
        return;
      }
      setTrackData(data);
      toast.success('Bill found!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch bill');
      setTrackData(null);
    } finally {
      setTrackLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
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

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Bill Inquiry</h2>
          <p className="text-lg text-gray-600">Enter your Customer ID to view your electricity bill details</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Search Your Bill
            </CardTitle>
            <CardDescription>
              Your Customer ID can be found on your previous electricity bill
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="customerId">Customer ID</Label>
                <Input
                  id="customerId"
                  placeholder="Enter your Customer ID (e.g., 123456789)"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleBillSearch} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Search Bill
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <div className="flex-1">
                <Label htmlFor="shortBillId">Short Bill ID</Label>
                <Input
                  id="shortBillId"
                  placeholder="Enter your Short Bill ID"
                  value={shortBillId}
                  onChange={(e) => setShortBillId(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleTrackSearch} disabled={trackLoading} className="bg-purple-600 hover:bg-purple-700">
                  {trackLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Tracking...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Track Payment
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bill Details */}
        {billData && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-green-600">Bill Details Found</CardTitle>
              <CardDescription>Bill information for Customer ID: {billData.uid}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Same UI block */}
              {/* ... existing billData UI ... */}
            </CardContent>
          </Card>
        )}

        {/* Track Payment Details */}
        {trackData && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-purple-600">Tracked Bill Found</CardTitle>
              <CardDescription>Tracked info for Short Bill ID: {shortBillId}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">Customer Information</h4>
                    <p className="text-sm"><strong>Name:</strong> {trackData.customerName}</p>
                    <p className="text-sm"><strong>Address:</strong> {trackData.address}</p>
                    <p className="text-sm"><strong>Customer ID:</strong> {trackData.userId}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Billing Period</h4>
                    <p className="text-sm"><strong>Bill Month:</strong> {trackData.billMonth}</p>
                    <p className="text-sm"><strong>Due Date:</strong> {trackData.dueDate}</p>
                    <p className="text-sm">
                      <strong>Status:</strong> 
                      <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                        trackData.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>{trackData.status}</span>
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">Usage Details</h4>
                    <p className="text-sm"><strong>Previous Reading:</strong> {trackData.previousReading} kWh</p>
                    <p className="text-sm"><strong>Current Reading:</strong> {trackData.currentReading} kWh</p>
                    <p className="text-sm"><strong>Units Consumed:</strong> {trackData.unitsConsumed} kWh</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Bill Amount</h4>
                    <p className="text-sm"><strong>Energy Charge:</strong> Rs. {trackData.energyCharge}</p>
                    <p className="text-sm"><strong>Service Charge:</strong> Rs. {trackData.serviceCharge}</p>
                    <p className="text-lg font-bold text-purple-600 mt-2"><strong>Total Amount: Rs. {trackData.billAmount}</strong></p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Pay Now
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Bill
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Payment History
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold mb-2">Where to find Customer ID?</h5>
                <p className="text-sm text-gray-600">
                  Your Customer ID is printed on your electricity bill, usually at the top right corner.
                </p>
              </div>
              <div>
                <h5 className="font-semibold mb-2">Bill not showing?</h5>
                <p className="text-sm text-gray-600">
                  Please verify your Customer ID or contact our support team at 1660-01-10001.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillInquiry;
