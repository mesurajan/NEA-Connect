import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap } from 'lucide-react';

const serviceOptions = [
  'Bill Inquiry',
  'Bill Payment',
  'Complaints',
  'Load Shedding Info',
  'New Connection',
  'Office Experience',
  'Other',
];

const Support = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    rating: '',
    message: '',
    suggestion: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to send feedback');
      toast.success('Thank you for your feedback!');
      setForm({ name: '', email: '', service: '', rating: '', message: '', suggestion: '' });
    } catch (err) {
      toast.error('Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
      {/* Header with Back & Logo */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600 mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Link
                to="/"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-red-600 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">NEA Connect</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Feedback Form */}
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-2xl">
        <h2 className="text-4xl font-extrabold mb-8 text-blue-700 text-center tracking-tight">
          We Value Your Feedback 💬
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-gray-700 font-medium">
              Full Name
            </Label>
            <Input
              name="name"
              id="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email Address
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="service" className="text-gray-700 font-medium">
              Service Category
            </Label>
            <select
              name="service"
              id="service"
              value={form.service}
              onChange={handleChange}
              required
              className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Select a service --</option>
              {serviceOptions.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="rating" className="text-gray-700 font-medium">
              Rating (1 to 10)
            </Label>
            <Input
              type="number"
              name="rating"
              id="rating"
              min="1"
              max="10"
              placeholder="Rate your experience"
              value={form.rating}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-gray-700 font-medium">
              What went well?
            </Label>
            <Textarea
              name="message"
              id="message"
              rows={4}
              placeholder="Tell us what you liked..."
              value={form.message}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="suggestion" className="text-gray-700 font-medium">
              Any Suggestions or Issues?
            </Label>
            <Textarea
              name="suggestion"
              id="suggestion"
              rows={3}
              placeholder="Let us know how we can improve..."
              value={form.suggestion}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-md text-lg font-semibold transition duration-200"
          >
            🚀 Submit Feedback
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Support;
