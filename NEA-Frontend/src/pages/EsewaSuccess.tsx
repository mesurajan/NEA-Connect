import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Receipt {
  success: boolean;
  payment: {
    name: string;
    userId: string;
    amount: number;
    createdAt: string;
  };
  shortBillId: number;
  error?: string;
}

const EsewaSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  useEffect(() => {
    const pid = searchParams.get('pid'); // pid param from eSewa redirect
    if (!pid) {
      toast.error('Missing transaction ID');
      navigate('/');
      return;
    }

    const verifyPayment = async () => {
      // Also fetch pendingPayment from localStorage to pass full data
      const paymentData = JSON.parse(localStorage.getItem('pendingPayment') || '{}');

      if (!paymentData.transaction_uuid) {
        toast.error('Missing transaction ID in local storage.');
        navigate('/');
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/gateway/verify/esewa`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transaction_uuid: pid,
            ...paymentData,
          }),
        });

        const data: Receipt = await res.json();

        if (res.ok && data.success) {
          toast.success('eSewa Payment Verified!');
          setReceipt(data);
          localStorage.removeItem('pendingPayment');
        } else {
          toast.error(data.error || 'Verification failed!');
          navigate('/');
        }
      } catch (err) {
        console.error('eSewa verification error:', err);
        toast.error('Error verifying payment.');
        navigate('/');
      }
    };

    verifyPayment();
  }, [navigate, searchParams]);

  if (!receipt) return <p className="text-center mt-10">Verifying payment, please wait...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4">
      <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 shadow-lg">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-green-700 mb-2">Payment Successful via eSewa!</h2>
      <p className="text-gray-600 mb-6">Thank you for your payment.</p>

      <Card className="w-full max-w-2xl border border-green-200 shadow-md">
        <CardContent className="pt-6 space-y-2 text-sm md:text-base">
          <p><strong>Name:</strong> {receipt.payment.name}</p>
          <p><strong>Customer ID:</strong> {receipt.payment.userId}</p>
          <p><strong>Amount:</strong> Rs. {receipt.payment.amount}</p>
          <p><strong>Payment Method:</strong> eSewa</p>
          <p><strong>Short Bill ID:</strong> {receipt.shortBillId}</p>
          <p><strong>Verified Date:</strong> {new Date(receipt.payment.createdAt).toLocaleString()}</p>
        </CardContent>
      </Card>

      <Button onClick={() => navigate('/')} className="mt-6 bg-green-600 hover:bg-green-700">
        Back to Home
      </Button>
    </div>
  );
};

export default EsewaSuccess;
