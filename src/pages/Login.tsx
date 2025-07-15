
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      localStorage.setItem('user', JSON.stringify({ token: data.token }));
      toast.success('✅ Login successful');
      navigate('/');
    } catch (err: any) {
      toast.error(err.message || '❌ Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login to NEA Connect</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium">Email:</label>
        <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />

        <label className="block text-sm font-medium">Password:</label>
        <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />

        <Button type="submit" className="w-full">Login</Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/register')}>
          Register
        </span>
      </p>
    </div>
  );
};

export default Login;
