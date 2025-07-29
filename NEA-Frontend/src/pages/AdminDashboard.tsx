import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  UserPlus,
  CreditCard,
  MapPin,
  Search,
  Zap,
  MessageSquare,
  Phone,
  LifeBuoy,
  LogOut,
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const menu = [
    { key: 'new-connection', label: 'New Connection', route: '/new-connection', icon: UserPlus },
    { key: 'bill-payment', label: 'Pay Bill Online', route: '/bill-payment', icon: CreditCard },
    { key: 'office-locator', label: 'Office Locator', route: '/office-locator', icon: MapPin },
    { key: 'bill-inquiry', label: 'Bill Inquiry', route: '/bill-inquiry', icon: Search },
    { key: 'load-shedding', label: 'Load Shedding', route: '/load-shedding', icon: Zap },
    { key: 'complaints', label: 'Register Complaint', route: '/complaints', icon: MessageSquare },
    { key: 'contact', label: 'Contact', route: '/contact', icon: Phone },
    { key: 'support', label: 'Support', route: '/support', icon: LifeBuoy },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">NEA Admin Panel</h2>
        <ul className="flex flex-col space-y-3">
          {menu.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => navigate(item.route)}
                className="flex items-center space-x-3 py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <Button
            variant="destructive"
            className="w-full flex items-center justify-center space-x-2"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </nav>

      {/* Main content area */}
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-4xl font-bold mb-4">Welcome, Admin!</h1>
        <p>This is your dashboard home. Use the sidebar to navigate between features.</p>
      </main>
    </div>
  );
};

export default AdminDashboard;
