import React, { useState } from 'react';
import { Mail, Bell, ChevronDown, User, LogOut, Edit3, LayoutGrid, ClipboardList, FileText, Pencil } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ resident }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = resident || { name: 'Sarah Mitchell', email: 'sarah.mitchell@oasisnotes.com' };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          {/* Logo & Hamburger */}
          <div className="flex items-center space-x-3">
            <button
              className="md:hidden text-gray-400 hover:text-gray-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
              )}
            </button>
            <Link to="/resident-dashboard" className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold" />
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                HealthCare
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-2">
              <Link
                to="/resident-dashboard"
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-[8px] text-[12px] font-semibold transition-all duration-200 border ${isActive('/resident-dashboard')
                  ? 'bg-[#DEF3FF] text-[#129FED] border-[#90CEF0]'
                  : 'bg-white text-[#6D758F] border-[#E2E8F0] hover:bg-gray-50'
                  }`}
              >
                <LayoutGrid className="w-[12px] h-[12px]" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/resident-dashboard/intake"
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-[8px] text-[12px] font-semibold transition-all duration-200 border ${isActive('/resident-dashboard/intake')
                  ? 'bg-[#DEF3FF] text-[#129FED] border-[#90CEF0]'
                  : 'bg-white text-[#6D758F] border-[#E2E8F0] hover:bg-gray-50'
                  }`}
              >
                <ClipboardList className="w-[12px] h-[12px]" />
                <span>Intake</span>
              </Link>

              <Link
                to="/resident-dashboard/progress-chart"
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-[8px] text-[12px] font-semibold transition-all duration-200 border ${isActive('/resident-dashboard/progress-chart')
                  ? 'bg-[#DEF3FF] text-[#129FED] border-[#90CEF0]'
                  : 'bg-white text-[#6D758F] border-[#E2E8F0] hover:bg-gray-50'
                  }`}
              >
                <FileText className="w-[12px] h-[12px]" />
                <span>Progress Chart</span>
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            <div className="hidden sm:flex items-center space-x-3">
              <button className="text-gray-400 hover:text-gray-500 relative transition-colors">
                <Mail className="w-4.5 h-4.5" />
                <span className="absolute top-0 right-0 block h-1.5 w-1.5 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>
              <button className="text-gray-400 hover:text-gray-500 relative transition-colors">
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-0 right-0 block h-1.5 w-1.5 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 pl-2 sm:pl-5 border-l border-gray-200 relative">
              <div className="text-right hidden sm:block leading-tight">
                <p className="text-[13px] font-semibold text-gray-900">{user.name}</p>
                <p className="text-[11px] text-gray-500">{user.email}</p>
              </div>
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-200 flex items-center justify-center group cursor-pointer relative"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <User className="text-gray-500 w-4 h-4" />
              </div>
              <ChevronDown
                className="w-3.5 h-3.5 text-gray-400 cursor-pointer hidden sm:block"
                onClick={() => setShowDropdown(!showDropdown)}
              />

              {/* User Dropdown */}
              {showDropdown && (
                <div className="absolute right-0 top-12 w-52 bg-white rounded-[8px] shadow-sm border border-[#E2E8F0] py-1.5 z-50">
                  <div className="px-3 py-1.5 border-b border-gray-100 sm:hidden">
                    <p className="text-[13px] font-bold text-gray-900">{user.name}</p>
                    <p className="text-[11px] text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    to="/resident-dashboard/profile"
                    className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowDropdown(false)}
                  >
                    <Pencil className="w-[16px] h-[16px] text-gray-500" /> Edit Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <LogOut className="w-[16px] h-[16px] text-red-500" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-2">
          <Link
            to="/resident-dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center space-x-3 px-3 py-2 rounded-[8px] text-[14px] font-semibold border ${isActive('/resident-dashboard')
              ? 'bg-[#DEF3FF] text-[#129FED] border-[#90CEF0]'
              : 'bg-white text-[#6D758F] border-[#E2E8F0]'
              }`}
          >
            <LayoutGrid className="w-4.5 h-4.5" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/resident-dashboard/intake"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center space-x-3 px-3 py-2 rounded-[8px] text-[14px] font-semibold border ${isActive('/resident-dashboard/intake')
              ? 'bg-[#DEF3FF] text-[#129FED] border-[#90CEF0]'
              : 'bg-white text-[#6D758F] border-[#E2E8F0]'
              } w-full text-left`}
          >
            <ClipboardList className="w-4.5 h-4.5" />
            <span>Intake</span>
          </Link>
          <Link
            to="/resident-dashboard/progress-chart"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center space-x-3 px-3 py-2 rounded-[8px] text-[14px] font-semibold border ${isActive('/resident-dashboard/progress-chart')
              ? 'bg-[#DEF3FF] text-[#129FED] border-[#90CEF0]'
              : 'bg-white text-[#6D758F] border-[#E2E8F0]'
              } w-full text-left`}
          >
            <FileText className="w-4.5 h-4.5" />
            <span>Progress Chart</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
