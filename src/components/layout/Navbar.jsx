import React from 'react';
import { Search, Bell, Settings, LogOut, User, ChevronDown } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-teal-400 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full opacity-80" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">OASIS NOTES</span>
        </div>

        {/* Main Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {['Dashboard', 'Billing & Claims', 'Users', 'Tracking', 'Log', 'Activity Log'].map((item, idx) => (
            <button
              key={item}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                idx === 0 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-slate-500 hover:bg-gray-50 hover:text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                {idx === 0 && <div className="w-4 h-4 border-2 border-blue-600 rounded-sm" />}
                {item}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:bg-gray-50 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
        </div>

        <div className="h-8 w-px bg-gray-200 mx-2" />

        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">Sarah Mitchell</p>
            <p className="text-xs text-slate-500">sarah.mitchell@oasisnotes.com</p>
          </div>
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 overflow-hidden relative border border-gray-200">
            <User size={24} />
          </div>
          <ChevronDown size={16} className="text-slate-400" />
          
          {/* Dropdown Simulation */}
          <div className="absolute top-14 right-6 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all transform scale-95 group-hover:scale-100">
             <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-gray-50">
               <Settings size={16} /> Edit Profile Details
             </button>
             <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
               <LogOut size={16} /> Logout
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
