import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const ResidentLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ResidentLayout;
