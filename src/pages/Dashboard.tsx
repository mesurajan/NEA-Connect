import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { 
  Users, Zap, Clock, CheckCircle, AlertTriangle, TrendingUp, 
  FileText, MessageSquare, MapPin, ArrowLeft, Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const stats = [
    { 
      title: 'Total Customers', 
      value: '2,547,892', 
      change: '+2.3%', 
      icon: Users, 
      color: 'text-blue-600' 
    },
    { 
      title: 'Active Connections', 
      value: '2,489,156', 
      change: '+1.8%', 
      icon: Zap, 
      color: 'text-green-600' 
    },
    { 
      title: 'Pending Complaints', 
      value: '1,247', 
      change: '-5.2%', 
      icon: MessageSquare, 
      color: 'text-orange-600' 
    },
    { 
      title: 'System Uptime', 
      value: '99.2%', 
      change: '+0.1%', 
      icon: Activity, 
      color: 'text-green-600' 
    }
  ];

  const monthlyBills = [
    { month: 'Jan', amount: 2850000, bills: 2400000 },
    { month: 'Feb', amount: 2920000, bills: 2450000 },
    { month: 'Mar', amount: 3100000, bills: 2500000 },
    { month: 'Apr', amount: 3250000, bills: 2520000 },
    { month: 'May', amount: 3400000, bills: 2540000 },
    { month: 'Jun', amount: 3150000, bills: 2547000 }
  ];

  const complaintsByCategory = [
    { name: 'Power Outages', value: 45, color: '#ef4444' },
    { name: 'Billing Issues', value: 30, color: '#f59e0b' },
    { name: 'Meter Problems', value: 15, color: '#3b82f6' },
    { name: 'New Connections', value: 8, color: '#10b981' },
    { name: 'Others', value: 2, color: '#6b7280' }
  ];

  const districtData = [
    { district: 'Kathmandu', customers: 485000, consumption: 1250 },
    { district: 'Lalitpur', customers: 285000, consumption: 890 },
    { district: 'Bhaktapur', customers: 165000, consumption: 520 },
    { district: 'Pokhara', customers: 225000, consumption: 680 },
    { district: 'Biratnagar', customers: 180000, consumption: 580 },
    { district: 'Butwal', customers: 145000, consumption: 450 }
  ];

  const recentActivity = [
    { id: 1, type: 'complaint', message: 'New complaint registered in Baneshwor area', time: '2 min ago' },
    { id: 2, type: 'payment', message: '15,247 bills paid online today', time: '5 min ago' },
    { id: 3, type: 'outage', message: 'Power restored in Thamel area', time: '12 min ago' },
    { id: 4, type: 'connection', message: '23 new connections approved', time: '15 min ago' },
    { id: 5, type: 'maintenance', message: 'Scheduled maintenance completed in Patan', time: '1 hour ago' }
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
                <p className="text-sm text-gray-600">Public Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Public Dashboard</h2>
          <p className="text-lg text-gray-600">
            Real-time insights into NEA's operations and service delivery
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Bills Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Monthly Bills Overview
              </CardTitle>
              <CardDescription>
                Bills generated and collection amounts over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyBills}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'amount' ? `Rs. ${value.toLocaleString()}` : value.toLocaleString(),
                      name === 'amount' ? 'Collection Amount' : 'Bills Generated'
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="bills" fill="#3b82f6" name="Bills Generated" />
                  <Bar dataKey="amount" fill="#ef4444" name="Collection Amount" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Complaints by Category */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-orange-600" />
                Complaints by Category
              </CardTitle>
              <CardDescription>
                Distribution of complaints received this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={complaintsByCategory}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {complaintsByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* District-wise Data */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-green-600" />
              District-wise Customer Distribution
            </CardTitle>
            <CardDescription>
              Number of customers and power consumption by major districts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={districtData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="customers" fill="#3b82f6" name="Customers" />
                <Bar yAxisId="right" dataKey="consumption" fill="#ef4444" name="Consumption (MW)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-600" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest updates and system activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                    <div className="flex-shrink-0">
                      {activity.type === 'complaint' && <MessageSquare className="h-5 w-5 text-orange-600" />}
                      {activity.type === 'payment' && <FileText className="h-5 w-5 text-green-600" />}
                      {activity.type === 'outage' && <Zap className="h-5 w-5 text-red-600" />}
                      {activity.type === 'connection' && <Users className="h-5 w-5 text-blue-600" />}
                      {activity.type === 'maintenance' && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Bills Paid Online</span>
                  <Badge variant="outline" className="text-green-600">15,247</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">New Complaints</span>
                  <Badge variant="outline" className="text-orange-600">23</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Complaints Resolved</span>
                  <Badge variant="outline" className="text-green-600">45</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Areas Affected</span>
                  <Badge variant="outline" className="text-red-600">2</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">System Load</span>
                  <Badge variant="outline" className="text-blue-600">1,245 MW</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Available Capacity</span>
                  <Badge variant="outline" className="text-green-600">1,850 MW</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Status */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Service Status</CardTitle>
            <CardDescription>
              Current status of all NEA Connect services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-800">Bill Inquiry - Operational</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-800">Complaints - Operational</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-800">Load Shedding - Operational</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-800">Office Locator - Operational</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
