import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { api } from '../../data/api';
import { Loader2 } from 'lucide-react';

const ResidentLayout = () => {
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    api.getResidentData(user?.id).then(data => {
      setResident(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar resident={resident} />
      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet context={{ resident }} />
      </main>
    </div>
  );
};

export default ResidentLayout;
