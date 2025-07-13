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

  const handleBillSearch = async () => {
    if (!customerId) {
      toast.error('Please enter a Customer ID');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/bills/search?userId=${encodeURIComponent(customerId)}`);
      if (!response.ok) {
        throw new Error('Bill not found');
      }
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setBillData(data[0]); // Show the first bill found
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

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Bill Inquiry</h2>
          <p className="text-lg text-gray-600">
            Enter your Customer ID to view your electricity bill details
          </p>
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
                <Button 
                  onClick={handleBillSearch}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
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
          </CardContent>
        </Card>

        {/* Bill Details */}
        {billData && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-green-600">Bill Details Found</CardTitle>
              <CardDescription>
                Bill information for Customer ID: {billData.customerId}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">Customer Information</h4>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm"><strong>Name:</strong> {billData.customerName}</p>
                      <p className="text-sm"><strong>Address:</strong> {billData.address}</p>
                      <p className="text-sm"><strong>Customer ID:</strong> {billData.customerId}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700">Billing Period</h4>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm"><strong>Bill Month:</strong> {billData.billMonth}</p>
                      <p className="text-sm"><strong>Due Date:</strong> {billData.dueDate}</p>
                      <p className="text-sm">
                        <strong>Status:</strong> 
                        <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                          billData.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {billData.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700">Usage Details</h4>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm"><strong>Previous Reading:</strong> {billData.previousReading} kWh</p>
                      <p className="text-sm"><strong>Current Reading:</strong> {billData.currentReading} kWh</p>
                      <p className="text-sm"><strong>Units Consumed:</strong> {billData.unitsConsumed} kWh</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700">Bill Amount</h4>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm"><strong>Energy Charge:</strong> Rs. {billData.energyCharge}</p>
                      <p className="text-sm"><strong>Service Charge:</strong> Rs. {billData.serviceCharge}</p>
                      <div className="border-t pt-2">
                        <p className="text-lg font-bold text-blue-600">
                          <strong>Total Amount: Rs. {billData.billAmount}</strong>
                        </p>
                      </div>
                    </div>
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