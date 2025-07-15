import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectItem } from '@/components/ui/select';
import { toast } from 'sonner';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/feedback', {
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
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">We Value Your Feedback</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input name="name" id="name" placeholder="Enter your name" value={form.name} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input type="email" name="email" id="email" placeholder="Enter your email" value={form.email} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="service">Service Category</Label>
          <select
            name="service"
            id="service"
            value={form.service}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-sm"
            required
          >
            <option value="">-- Select a service --</option>
            {serviceOptions.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="rating">Rating (1 to 10)</Label>
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
          />
        </div>

        <div>
          <Label htmlFor="message">What went well?</Label>
          <Textarea
            name="message"
            id="message"
            rows={4}
            placeholder="Tell us what you liked..."
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="suggestion">Any Suggestions or Issues?</Label>
          <Textarea
            name="suggestion"
            id="suggestion"
            rows={3}
            placeholder="Let us know how we can improve..."
            value={form.suggestion}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Submit Feedback
        </Button>
      </form>
    </div>
  );
};

export default Support;
