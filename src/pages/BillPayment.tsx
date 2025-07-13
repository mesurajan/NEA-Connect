import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, DollarSign, Building2, Smartphone, ArrowLeft, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

const BillPayment = () => {
  const [customerId, setCustomerId] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('esewa');
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const paymentMethods = [
    {
      id: 'esewa',
      name: 'eSewa',
      icon: Smartphone,
      description: 'Pay with your eSewa wallet',
      color: 'bg-green-600'
    },
    {
      id: 'khalti',
      name: 'Khalti',
      icon: CreditCard,
      description: 'Pay with Khalti digital wallet',
      color: 'bg-purple-600'
    },
    {
      id: 'banking',
      name: 'Online Banking',
      icon: Building2,
      description: 'Connect bank, NIC Asia, Himalayan Bank',
      color: 'bg-blue-600'
    }
  ];
const handlePayment = async () => {
  if (!customerId.trim() || !billAmount.trim()) {
    toast.error('Please fill in all required fields');
    return;
  }

  if (parseFloat(billAmount) <= 0) {
    toast.error('Please enter a valid amount');
    return;
  }

  setLoading(true);

  try {
    const response = await fetch('http://localhost:5000/api/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: customerId, // assuming customerId is MongoDB _id
        billId: '64a12345...', // if applicable (optional)
        amount: parseFloat(billAmount),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setPaymentSuccess(true);
      toast.success('Payment processed and saved!');
    } else {
      console.error('❌ Backend Error:', data);
      toast.error(`Failed to save payment: ${data.error}`);
    }
  } catch (error) {
    console.error('❌ Network Error:', error);
    toast.error('Network error while processing payment');
  }

  setLoading(false);
};

  
  if (paymentSuccess) {
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

        <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Your electricity bill payment has been processed successfully.
            </p>
            
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm"><strong>Customer ID:</strong> {customerId}</p>
                  <p className="text-sm"><strong>Amount Paid:</strong> Rs. {billAmount}</p>
                  <p className="text-sm"><strong>Payment Method:</strong> {paymentMethods.find(m => m.id === paymentMethod)?.name}</p>
                  <p className="text-sm"><strong>Transaction ID:</strong> TXN{Date.now()}</p>
                  <p className="text-sm"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-4">
              <Link to="/">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Back to Home
                </Button>
              </Link>
              <Link to="/bill-inquiry">
                <Button variant="outline">
                  View Bill Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pay Your Electricity Bill</h2>
          <p className="text-lg text-gray-600">
            Quick and secure online payment for your electricity bills
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bill Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                Bill Information
              </CardTitle>
              <CardDescription>
                Enter your customer ID and bill amount to proceed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="customerId">Customer ID</Label>
                <Input
                  id="customerId"
                  placeholder="Enter your Customer ID"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="billAmount">Bill Amount (Rs.)</Label>
                <Input
                  id="billAmount"
                  type="number"
                  placeholder="Enter bill amount"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                Payment Method
              </CardTitle>
              <CardDescription>
                Choose your preferred payment method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div className={`p-2 rounded ${method.color}`}>
                        <method.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor={method.id} className="font-medium cursor-pointer">
                          {method.name}
                        </Label>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Payment Button */}
        <div className="mt-8 text-center">
          <Button 
            onClick={handlePayment}
            disabled={loading}
            size="lg"
            className="bg-green-600 hover:bg-green-700 px-8"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing Payment...
              </>
            ) : (
              <>
                <DollarSign className="h-5 w-5 mr-2" />
                Pay Now
              </>
            )}
          </Button>
        </div>

        {/* Security Notice */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="text-center">
              <h4 className="font-semibold mb-2 text-gray-800">Secure Payment</h4>
              <p className="text-sm text-gray-600">
                Your payment information is encrypted and secure. All transactions are processed through 
                certified payment gateways with bank-level security.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillPayment;
