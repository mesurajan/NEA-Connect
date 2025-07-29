import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PaymentData {
  name: string;
  userId: string;
  amount: number;
  createdAt: string;
}

interface Receipt {
  success: boolean;
  payment: PaymentData;
  shortBillId: number;
  error?: string;
}

const KhaltiSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  useEffect(() => {
    const verifyKhalti = async () => {
      const pidx = searchParams.get('pidx');
      const paymentData = JSON.parse(localStorage.getItem('pendingPayment') || '{}');

      if (!pidx) {
        toast.error('Payment ID (pidx) missing in URL');
        navigate('/');
        return;
      }

      if (!paymentData || Object.keys(paymentData).length === 0) {
        toast.error('No payment data found locally. Please try again.');
        navigate('/');
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payments/verify/khalti`, { 

          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pidx, ...paymentData }),
        });

        const data: Receipt = await res.json();

        if (res.ok && data.success) {
          toast.success('Khalti Payment Verified!');
          setReceipt(data);
          localStorage.removeItem('pendingPayment');
        } else {
          toast.error(data.error || 'Verification failed!');
          navigate('/');
        }
      } catch (err) {
        console.error('Error during Khalti verification:', err);
        toast.error('Something went wrong!');
        navigate('/');
      }
    };

    verifyKhalti();
  }, [navigate, searchParams]);

  if (!receipt) return <p className="text-center mt-10">Verifying your payment, please wait...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50">
      <div className="flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6 shadow-lg">
        <CheckCircle className="h-10 w-10 text-purple-600" />
      </div>
      <h2 className="text-2xl font-bold text-purple-700 mb-2">Payment Successful via Khalti!</h2>
      <p className="text-gray-600 mb-6">Thank you for your payment.</p>

      <Card className="w-full max-w-2xl border border-purple-200 shadow-md">
        <CardContent className="pt-6 space-y-2 text-sm md:text-base">
          <p><strong>Name:</strong> {receipt.payment.name}</p>
          <p><strong>Customer ID:</strong> {receipt.payment.userId}</p>
          <p><strong>Amount:</strong> Rs. {receipt.payment.amount}</p>
          <p><strong>Payment Method:</strong> Khalti</p>
          <p><strong>Short Bill ID:</strong> {receipt.shortBillId}</p>
          <p><strong>Verified Date:</strong> {new Date(receipt.payment.createdAt).toLocaleString()}</p>
        </CardContent>
      </Card>

      <Button onClick={() => navigate('/')} className="mt-6 bg-purple-600 hover:bg-purple-700">
        Back to Home
      </Button>
    </div>
  );
};

export default KhaltiSuccess;
