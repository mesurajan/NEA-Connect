// AdminSidebar.tsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home, UserPlus, CreditCard, MapPin, Search, Zap, MessageSquare, Phone, LifeBuoy, LogOut
} from 'lucide-react';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear stored user info
    navigate('/login');              // Redirect to login page
  };

  const navItems = [
    { name: 'New Connection', path: '/new-connection', icon: <UserPlus size={18} /> },
    { name: 'Pay Bill Online', path: '/bill-payment', icon: <CreditCard size={18} /> },
    { name: 'Office Locator', path: '/office-locator', icon: <MapPin size={18} /> },
    { name: 'Bill Inquiry', path: '/bill-inquiry', icon: <Search size={18} /> },
    { name: 'Load Shedding', path: '/load-shedding', icon: <Zap size={18} /> },
    { name: 'Register Complaint', path: '/complaints', icon: <MessageSquare size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={18} /> },
    { name: 'Support', path: '/support', icon: <LifeBuoy size={18} /> },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        NEA Admin
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700 transition"
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center space-x-3 p-3 bg-red-600 hover:bg-red-700 transition m-4 rounded"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default AdminSidebar;
