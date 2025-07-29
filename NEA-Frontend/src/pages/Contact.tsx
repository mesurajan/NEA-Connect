import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Zap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';



const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });
const [loading, setLoading] = useState(false);
const [successMessage, setSuccessMessage] = useState('');


 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.message) {
    toast.error('Please fill in all required fields');
    return;
  }
setLoading(true);
setSuccessMessage('');

  try {
   const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast.success('Your message has been sent successfully!');
      setSuccessMessage('Your message has been sent! We’ll get back to you shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: ''
      });
      setTimeout(() => setSuccessMessage(''), 5000);
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  } catch (error) {
    toast.error('Failed to send message. Check your internet or try again later.');
  }finally {
    setLoading(false); 
  }
};


  const contactInfo = [
    {
      icon: Phone,
      title: '24/7 Helpline',
      details: '1660-01-10001',
      description: 'Emergency support and power outage reports'
    },
    {
      icon: Phone,
      title: 'Customer Service',
      details: '01-4414314',
      description: 'General inquiries and support'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@nea.org.np',
      description: 'Send us your questions and feedback'
    },
    {
      icon: MapPin,
      title: 'Head Office',
      details: 'Durbar Marg, Kathmandu',
      description: 'Nepal Electricity Authority'
    }
  ];

  const departments = [
    {
      name: 'Customer Service',
      phone: '01-4414314',
      email: 'customer@nea.org.np',
      description: 'General inquiries, bill payments, and account issues'
    },
    {
      name: 'Technical Support',
      phone: '01-4414315',
      email: 'technical@nea.org.np',
      description: 'Power outages, meter issues, and technical problems'
    },
    {
      name: 'New Connections',
      phone: '01-4414316',
      email: 'connections@nea.org.np',
      description: 'New electricity connections and load extensions'
    },
    {
      name: 'Billing Department',
      phone: '01-4414317',
      email: 'billing@nea.org.np',
      description: 'Billing disputes and payment issues'
    }
  ];

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

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600">
            Get in touch with Nepal Electricity Authority for support and inquiries
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {contactInfo.map((info, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                <p className="text-blue-600 font-medium mb-2">{info.details}</p>
                <p className="text-sm text-gray-600">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                Send us a Message
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              {successMessage && (
    <div className="mb-4 p-4 rounded-md bg-green-100 text-green-800 border border-green-300 text-sm">
      {successMessage}
    </div>
  )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="billing">Billing Issue</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="new-connection">New Connection</SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="Brief subject of your message"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Please describe your inquiry or issue in detail..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4 mr-2" />
                 {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Department Contacts */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Contacts</CardTitle>
                <CardDescription>
                  Reach out to specific departments for faster assistance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <h4 className="font-semibold text-lg">{dept.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{dept.description}</p>
                      <div className="flex flex-col space-y-1 text-sm">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-blue-600" />
                          <span>{dept.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-blue-600" />
                          <span>{dept.email}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-green-600" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 3:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium text-red-600">Closed</span>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Emergency Helpline (1660-01-10001)</strong> is available 24/7 for power outages and urgent issues.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">How do I report a power outage?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Call our 24/7 helpline at 1660-01-10001 or visit the Load Shedding Updates page to report outages.
                </p>
                
                <h4 className="font-semibold mb-2">Where can I pay my electricity bill?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  You can pay online through our Bill Inquiry system, at any NEA office, or authorized payment centers.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">How do I apply for a new connection?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Contact our New Connections department at 01-4414316 or visit your nearest NEA office with required documents.
                </p>
                
                <h4 className="font-semibold mb-2">What should I do if my meter is faulty?</h4>
                <p className="text-sm text-gray-600">
                  Report meter issues to our Technical Support at 01-4414315 or register a complaint through our portal.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
