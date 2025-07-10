import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  FileText, 
  MessageSquare, 
  MapPin, 
  Phone, 
  Clock,
  Search,
  AlertTriangle,
  CheckCircle,
  Users,
  Plus,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();

  const handleQuickBillCheck = () => {
    navigate('/bill-inquiry');
  };

  const handleReportIssue = () => {
    navigate('/complaints');
  };

  const services = [
    {
      title: "Pay Bill Online",
      description: "Pay your electricity bill using eSewa, Khalti or bank transfer",
      icon: DollarSign,
      color: "bg-green-600",
      href: "/bill-payment"
    },
    {
      title: "Bill Inquiry",
      description: "Check your electricity bill using Customer ID",
      icon: FileText,
      color: "bg-blue-600",
      href: "/bill-inquiry"
    },
    {
      title: "Register Complaint",
      description: "Submit and track your complaints with status updates",
      icon: MessageSquare,
      color: "bg-red-600",
      href: "/complaints"
    },
    {
      title: "Load Shedding Updates",
      description: "Get real-time outage information for your area",
      icon: Clock,
      color: "bg-orange-600",
      href: "/load-shedding"
    },
    {
      title: "Office Locator",
      description: "Find NEA offices by district and location",
      icon: MapPin,
      color: "bg-green-600",
      href: "/office-locator"
    },
    {
      title: "New Connection Request",
      description: "Apply for new electricity connection to your property",
      icon: Plus,
      color: "bg-purple-600",
      href: "/new-connection"
    }
  ];

  const stats = [
    { label: "Active Customers", value: "2.5M+", icon: Users },
    { label: "Districts Served", value: "77", icon: MapPin },
    { label: "Complaints Resolved", value: "15K+", icon: CheckCircle },
    { label: "Uptime", value: "99.2%", icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-red-600 p-2 rounded-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">NEA Connect</h1>
                <p className="text-sm text-gray-600">Nepal Electricity Authority Portal</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Dashboard</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</Link>
              <Button className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700">
                <Phone className="h-4 w-4 mr-2" />
                Support
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
                NEA Connect
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Your one-stop digital portal for all Nepal Electricity Authority services. 
              Access bills, register complaints, check load-shedding schedules, and more.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={handleQuickBillCheck}>
                <Search className="h-5 w-5 mr-2" />
                Quick Bill Check
              </Button>
              <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50" onClick={handleReportIssue}>
                <AlertTriangle className="h-5 w-5 mr-2" />
                Report Issue
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h3>
            <p className="text-lg text-gray-600">
              Access all essential NEA services through our digital platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-shadow duration-300 border-0 bg-white h-full flex flex-col">
                <CardHeader className="text-center pb-2 flex-shrink-0">
                  <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                  <CardDescription className="text-center text-gray-600 mb-4 flex-1">
                    {service.description}
                  </CardDescription>
                  <Link to={service.href} className="block">
                    <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                      Access Service
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-red-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h3>
            <p className="text-xl mb-8 opacity-90">
              Our support team is available 24/7 to help you with any electricity-related issues
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                <Phone className="h-5 w-5 mr-2" />
                Call Support: 1660-01-10001
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <MessageSquare className="h-5 w-5 mr-2" />
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-red-600 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">NEA Connect</h4>
                  <p className="text-sm text-gray-400">Digital Services Portal</p>
                </div>
              </div>
              <p className="text-gray-400">
                Empowering Nepal through reliable electricity services and digital innovation.
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/bill-inquiry" className="hover:text-white">Bill Inquiry</Link></li>
                <li><Link to="/complaints" className="hover:text-white">Complaints</Link></li>
                <li><Link to="/load-shedding" className="hover:text-white">Load Shedding</Link></li>
                <li><Link to="/office-locator" className="hover:text-white">Office Locator</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Contact Info</h5>
              <div className="space-y-2 text-gray-400">
                <p>Phone: 1660-01-10001</p>
                <p>Email: info@nea.org.np</p>
                <p>Address: Kathmandu, Nepal</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Nepal Electricity Authority. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
