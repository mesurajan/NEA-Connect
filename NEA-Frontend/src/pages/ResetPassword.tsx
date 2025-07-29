import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    navigate('/forgot-password');
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });
      if (!res.ok) throw new Error('Reset failed');
      toast.success('Password reset successful! Please login.');
      navigate('/login');
    } catch {
      toast.error('Failed to reset password');
    }
  };

  return (
    <form onSubmit={handleReset} className="max-w-md mx-auto p-4 space-y-4">
      <Label>New Password</Label>
      <Input
        type="password"
        required
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
      />
      <Label>Confirm Password</Label>
      <Input
        type="password"
        required
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <Button type="submit" className="w-full">Reset Password</Button>
    </form>
  );
}
