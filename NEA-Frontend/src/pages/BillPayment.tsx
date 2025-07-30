import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, DollarSign, Building2, Smartphone, ArrowLeft, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';




type Receipt = {
  shortBillId?: string;
};

const BillPayment = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [address, setAddress] = useState('');
  const [billMonth, setBillMonth] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [previousReading, setPreviousReading] = useState('');
  const [currentReading, setCurrentReading] = useState('');
  const [unitsConsumed, setUnitsConsumed] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('esewa');
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  useEffect(() => {
  const prev = parseFloat(previousReading);
  const curr = parseFloat(currentReading);

  if (!isNaN(prev) && !isNaN(curr) && curr >= prev) {
    const consumed = curr - prev;
    setUnitsConsumed(consumed.toFixed(2)); // auto set units
    setBillAmount((consumed * 20).toFixed(2)); // auto set amount (20 Rs/kWh)
  } else {
    setUnitsConsumed('');
    setBillAmount('');
  }
}, [previousReading, currentReading]);




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

  // New function: auto-calculate unitsConsumed and billAmount
  const handleReadingChange = (prev: string, curr: string) => {
    setPreviousReading(prev);
    setCurrentReading(curr);

    const prevNum = parseFloat(prev);
    const currNum = parseFloat(curr);

    if (!isNaN(prevNum) && !isNaN(currNum) && currNum >= prevNum) {
      const consumed = currNum - prevNum;
      setUnitsConsumed(consumed.toString());
      setBillAmount((consumed * 20).toFixed(2));
    } else {
      setUnitsConsumed('');
      setBillAmount('');
    }
  };

  const handlePayment = async () => {
    if (
      !name || !phone || !customerId || !address ||
      !billMonth || !dueDate || !previousReading || !currentReading ||
      !unitsConsumed || !billAmount
    ) {
      toast.error('Please fill in all required fields');
      return;
    }

    const parsedPrev = parseFloat(previousReading);
    const parsedCurr = parseFloat(currentReading);
    const parsedUnits = parseFloat(unitsConsumed);
    const parsedAmount = parseFloat(billAmount);

    if (
      isNaN(parsedPrev) || isNaN(parsedCurr) ||
      isNaN(parsedUnits) || isNaN(parsedAmount)
    ) {
      toast.error('❌ Please enter valid numeric values');
      return;
    }

    const paymentData = {
      name,
      phone,
      userId: customerId,
      address,
      billMonth,
      dueDate,
      previousReading: parsedPrev,
      currentReading: parsedCurr,
      unitsConsumed: parsedUnits,
      amount: parsedAmount,
      paymentMethod,
    };

    localStorage.setItem('pendingPayment', JSON.stringify(paymentData));

    if (paymentMethod === 'esewa') {
      handleEsewaPayment(paymentData);
      return;
    }

    if (paymentMethod === 'khalti') {
      handleKhaltiPayment();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Payment saved successfully!');
        setReceipt(data);
        setPaymentSuccess(true);
      } else {
        toast.error(data.error || 'Failed to save payment');
      }
    } catch (error) {
      console.error(error);
      toast.error('Network error while saving payment');
    } finally {
      setLoading(false);
    }
  };

  type PaymentData = {
    name: string;
    phone: string;
    userId: string;
    address: string;
    billMonth: string;
    dueDate: string;
    previousReading: number;
    currentReading: number;
    unitsConsumed: number;
    amount: number;
    paymentMethod: string;
  };

  const handleEsewaPayment = (paymentData: PaymentData) => {
    if (
      !paymentData.name || !paymentData.phone || !paymentData.userId || !paymentData.address ||
      !paymentData.billMonth || !paymentData.dueDate ||
      isNaN(paymentData.previousReading) || isNaN(paymentData.currentReading) ||
      isNaN(paymentData.unitsConsumed) || isNaN(paymentData.amount)
    ) {
      toast.error('❌ Missing or invalid fields in payment data');
      return;
    }

    console.log('🔍 eSewa Payment Payload:', paymentData);

    const transaction_uuid = `NEA-${Date.now()}`;
    const product_code = 'EPAYTEST';
    const total_amount = paymentData.amount;

    const payload = {
      ...paymentData,
      transaction_uuid,
      total_amount,
      product_code,
    };

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/gateway/verify/esewa/initiate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const data = await res.json();

        if (res.ok && data.su && data.fu && data.signature) {
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = 'https://rc.esewa.com.np/epay/main';
          const fields = {
            amt: Math.round(data.total_amount).toString(),
            psc: '0',
            pdc: '0',
            txAmt: '0',
            tAmt: Math.round(data.total_amount).toString(),
            pid: data.transaction_uuid,
            scd: import.meta.env.VITE_ESEWA_MERCHANT_ID,
            su: data.su,
            fu: data.fu,
          };

          Object.entries(fields).forEach(([key, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value as string;
            form.appendChild(input);
          });

          document.body.appendChild(form);
          form.submit();
        } else {
          toast.error(data?.error || '❌ eSewa initiation failed');
          console.error('eSewa backend response error:', data);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('❌ Network error during eSewa initiation');
      });
  };

  const handleKhaltiPayment = () => {
    const amountInPaisa = parseFloat(billAmount) * 100;
    const returnUrl = 'http://localhost:5173/khalti-payment-success';

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/gateway/khalti/initiate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: amountInPaisa,
        return_url: returnUrl,
        purchase_order_id: `NEA-${Date.now()}`,
        purchase_order_name: 'NEA Bill Payment',
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.payment_url) {
          window.location.href = data.payment_url;
        } else {
          toast.error('Failed to initiate Khalti payment');
        }
      })
      .catch(err => {
        console.error(err);
        toast.error('Khalti initiation error');
      });
  };


if (paymentSuccess) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-red-600 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">NEA Connect</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 shadow-lg">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-green-700 mb-2">
            Payment Successful!
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Your electricity bill payment has been processed successfully.
            <br />
            <span className="text-base text-gray-500">
              Thank you for using NEA Connect.
            </span>
          </p>

          {/* ✅ Updated Section – Matching Inquiry Layout */}
          <Card className="mb-6 border-2 border-green-200 shadow-md">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left text-sm md:text-base">
                {/* Left Column – Customer Information */}
                <div className="space-y-2">
                  <p><strong>Name:</strong> {name}</p>
                  <p><strong>Phone:</strong> {phone}</p>
                  <p><strong>Address:</strong> {address}</p>
                  <p><strong>Customer ID:</strong> {customerId}</p>
                  <p><strong>Short Bill ID:</strong> {receipt?.shortBillId || 'N/A'}</p>
                </div>

                {/* Right Column – Usage & Billing */}
                <div className="space-y-2">
                  <p><strong>Bill Month:</strong> {billMonth}</p>
                  <p><strong>Due Date:</strong> {dueDate}</p>
                  <p><strong>Status:</strong> Paid</p>
                  <p><strong>Previous Reading:</strong> {previousReading} kWh</p>
                  <p><strong>Current Reading:</strong> {currentReading} kWh</p>
                  <p><strong>Units Consumed:</strong> {unitsConsumed} kWh</p>
                  <p><strong>Energy Charge:</strong> Rs. {billAmount}</p>
                  <p><strong>Service Charge:</strong> Rs. 0</p>
                  <p><strong>Total Amount:</strong> Rs. {billAmount}</p>
                  <p><strong>Payment Method:</strong> {paymentMethods.find(m => m.id === paymentMethod)?.name}</p>
                  <p><strong>Transaction ID:</strong> TXN{Date.now()}</p>
                  <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <Link to="/">
              <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 text-base font-semibold">
                Back to Home
              </Button>
            </Link>
            <Link to="/bill-inquiry">
              <Button variant="outline" className="px-6 py-2 text-base font-semibold">
                View Bill Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

  // (Keep your existing payment form rendering code here...)
 // Main payment form (when paymentSuccess is false)
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
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Pay Your Electricity Bill</CardTitle>
            <CardDescription>Fill in the details below to pay your bill</CardDescription>
          </CardHeader>
        <CardContent className="space-y-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        placeholder="Enter your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mt-1"
      />
    </div>
    <div>
      <Label htmlFor="phone">Phone</Label>
      <Input
        id="phone"
        placeholder="Enter your Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="mt-1"
      />
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      <Label htmlFor="address">Address</Label>
      <Input
        id="address"
        placeholder="Enter your Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="mt-1"
      />
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <Label htmlFor="billMonth">Bill Month</Label>
      <Input
        id="billMonth"
        placeholder="Enter Bill Month (e.g., July 2025)"
        value={billMonth}
        onChange={(e) => setBillMonth(e.target.value)}
        className="mt-1"
      />
    </div>
    <div>
      <Label htmlFor="dueDate">Due Date</Label>
      <Input
        id="dueDate"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="mt-1"
      />
    </div>
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div>
      <Label htmlFor="previousReading">Previous Reading (kWh)</Label>
      <Input
        id="previousReading"
        type="number"
        placeholder="Previous Reading"
        value={previousReading}
        onChange={(e) => setPreviousReading(e.target.value)}
        className="mt-1"
      />
    </div>
    <div>
      <Label htmlFor="currentReading">Current Reading (kWh)</Label>
      <Input
        id="currentReading"
        type="number"
        placeholder="Current Reading"
        value={currentReading}
        onChange={(e) => setCurrentReading(e.target.value)}
        className="mt-1"
      />
    </div>
  </div>

  <div>
      <Label htmlFor="unitsConsumed">Electricity Consumed (kWh)</Label>
  <Input
    id="unitsConsumed"
    type="number"
    placeholder="Auto-calculated"
    value={unitsConsumed}
    readOnly
    className="mt-1 bg-gray-100"
  />

  </div>
  <div>
  <Label htmlFor="billAmount">Bill Amount (Rs.)</Label>
  <Input
    id="billAmount"
    type="number"
    placeholder="Auto-calculated"
    value={billAmount}
    readOnly
    className="mt-1 bg-gray-100"
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



