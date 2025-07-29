
// pages/Logout.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 🔐 Clear token from localStorage
    localStorage.removeItem('user');

    // ✅ Redirect to login
    navigate('/login');
  }, [navigate]);

  return null; // No UI needed
};

export default Logout;
