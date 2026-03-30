import React, { useState } from 'react';
import { Mail, Bell, ChevronDown, User, LogOut, Edit3, LayoutGrid, ClipboardList, FileText } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { mockUser } from '../data/mockData';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Hamburger */}
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden text-gray-400 hover:text-gray-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              )}
            </button>
            <Link to="/resident-dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                HealthCare
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/resident-dashboard"
                className={`flex items-center space-x-2 px-4 py-2 rounded-[10px] text-[14px] font-semibold transition-all duration-200 border ${isActive('/resident-dashboard')
                  ? 'bg-[#DEF3FF] text-[#129FED] border-[#90CEF0]'
                  : 'bg-white text-[#6D758F] border-[#E2E8F0] hover:bg-gray-50'
                  }`}
              >
                <LayoutGrid className="w-[14px] h-[14px]" />
                <span>Dashboard</span>
              </Link>

              <button
                className="flex items-center space-x-2 px-4 py-2 rounded-[10px] text-[14px] font-semibold transition-all duration-200 border bg-white text-[#6D758F] border-[#E2E8F0] hover:bg-gray-50"
              >
                <ClipboardList className="w-[14px] h-[14px]" />
                <span>Intake</span>
              </button>

              <button
                className="flex items-center space-x-2 px-4 py-2 rounded-[10px] text-[14px] font-semibold transition-all duration-200 border bg-white text-[#6D758F] border-[#E2E8F0] hover:bg-gray-50"
              >
                <FileText className="w-[14px] h-[14px]" />
                <span>Progress Chart</span>
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="hidden sm:flex items-center space-x-4">
              <button className="text-gray-400 hover:text-gray-500 relative transition-colors">
                <Mail className="w-5 h-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>
              <button className="text-gray-400 hover:text-gray-500 relative transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-6 border-l border-gray-200 relative">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">Sarah Mitchell</p>
                <p className="text-xs text-gray-500">sarah.mitchell@oasisnotes.com</p>
              </div>
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center group cursor-pointer relative"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <User className="text-gray-500 w-5 h-5" />
              </div>
              <ChevronDown
                className="w-4 h-4 text-gray-400 cursor-pointer hidden sm:block"
                onClick={() => setShowDropdown(!showDropdown)}
              />

              {/* User Dropdown */}
              {showDropdown && (
                <div className="absolute right-0 top-14 w-56 bg-white rounded-[10px] shadow-sm border border-[#E2E8F0] py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 sm:hidden">
                    <p className="text-sm font-bold text-gray-900">Sarah Mitchell</p>
                    <p className="text-xs text-gray-500">sarah.mitchell@oasisnotes.com</p>
                  </div>
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

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <Link
            to="/resident-dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-[10px] text-[15px] font-semibold border ${isActive('/resident-dashboard')
              ? 'bg-[#DEF3FF] text-[#129FED] border-[#90CEF0]'
              : 'bg-white text-[#6D758F] border-[#E2E8F0]'
              }`}
          >
            <LayoutGrid className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <button className="flex items-center space-x-3 px-4 py-3 rounded-[10px] text-[15px] font-semibold border border-[#E2E8F0] bg-white text-[#6D758F] w-full text-left">
            <ClipboardList className="w-5 h-5" />
            <span>Intake</span>
          </button>
          <button className="flex items-center space-x-3 px-4 py-3 rounded-[10px] text-[15px] font-semibold border border-[#E2E8F0] bg-white text-[#6D758F] w-full text-left">
            <FileText className="w-5 h-5" />
            <span>Progress Chart</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
