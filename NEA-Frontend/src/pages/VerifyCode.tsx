import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function VerifyCode() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    // if no email, redirect back to forgot password
    navigate('/forgot-password');
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      if (!res.ok) throw new Error('Invalid code');
      toast.success('Code verified! Set your new password.');
      navigate('/reset-password', { state: { email } });
    } catch {
      toast.error('Invalid or expired code');
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <Label>Verification Code</Label>
      <Input required value={code} onChange={e => setCode(e.target.value)} />
      <Button type="submit">Verify Code</Button>
    </form>
  );
}
