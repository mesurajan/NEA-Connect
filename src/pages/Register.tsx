
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    citizenship: ''
  });

  const [photo, setPhoto] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', `${form.firstName} ${form.lastName}`);
    formData.append('email', form.email);
    formData.append('password', form.password);
    formData.append('citizenship', form.citizenship);
    formData.append('address', form.address);
    formData.append('phone', form.phone);
    if (photo) formData.append('photo', photo); // storing document as 'photo' key for backend consistency

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error('Registration failed');

      toast.success('✅ Registered successfully!');
      navigate('/login');
    } catch (err) {
      toast.error('❌ Registration error. Try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* First Name + Last Name */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">First Name</label>
            <Input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Last Name</label>
            <Input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required />
          </div>
        </div>

        {/* Phone + Citizenship */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">Phone Number</label>
            <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Citizenship Number</label>
            <Input name="citizenship" value={form.citizenship} onChange={handleChange} placeholder="Citizenship No" required />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium">Address</label>
          <Input name="address" value={form.address} onChange={handleChange} placeholder="Address" required />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Gmail</label>
          <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="example@gmail.com" required />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium">Password</label>
          <Input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
        </div>

        {/* Upload Document */}
        <div>
          <label className="block text-sm font-medium">Upload Citizenship Document</label>
          <Input type="file" accept="image/*,.pdf" onChange={handlePhotoChange} required />
        </div>

        <Button type="submit" className="w-full">Register</Button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/login')}>
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;
