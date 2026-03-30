import React, { useState } from 'react';
import { Mail, Bell, ChevronDown, User, LogOut, Edit3 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { mockUser } from '../data/mockData';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Tabs */}
          <div className="flex items-center space-x-8">
            <Link to="/resident-dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                OASIS NOTES
              </span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link 
                to="/resident-dashboard" 
                className="px-4 py-2 rounded-lg bg-action-blue/10 text-action-blue font-medium flex items-center space-x-2"
              >
                <span>Dashboard</span>
              </Link>
              <button className="px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-50 font-medium flex items-center space-x-2 transition-colors">
                <span>Intake</span>
              </button>
              <button className="px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-50 font-medium flex items-center space-x-2 transition-colors">
                <span>Progress Chart</span>
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-gray-500 relative transition-colors">
                <Mail className="w-5 h-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>
              <button className="text-gray-400 hover:text-gray-500 relative transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>
            </div>
            
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200 relative">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">Sarah Mitchell</p>
                <p className="text-xs text-gray-500">sarah.mitchell@oasisnotes.com</p>
              </div>
              <div 
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center group cursor-pointer relative"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <User className="text-gray-500" />
              </div>
              <ChevronDown 
                className="w-4 h-4 text-gray-400 cursor-pointer" 
                onClick={() => setShowDropdown(!showDropdown)}
              />

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute right-0 top-14 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  <Link 
                    to="/resident-dashboard/profile"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowDropdown(false)}
                  >
                    <Edit3 className="w-4 h-4" /> Edit Profile Details
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
