import React from 'react';
import { Search, Bell, Settings, LogOut, User, ChevronDown, LayoutGrid, Mail } from 'lucide-react';

const Navbar = ({ activeTab, onTabChange }) => {
  const tabs = ['Dashboard', 'Billing & Claims', 'Users', 'Tracking', 'Log', 'Activity Log'];

  return (
    <nav className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-50 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-4 lg:gap-8 shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onTabChange('Dashboard')}>
          <div className="w-9 h-9 bg-gradient-to-tr from-[#0088FF] to-[#20D5FE] rounded-full flex items-center justify-center shadow-sm">
             <div className="w-5 h-5 border-2 border-white/40 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
             </div>
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-800 uppercase hidden sm:block">OASIS NOTES</span>
        </div>

        {/* Main Navigation */}
        <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {tabs.map((item) => (
            <button
              key={item}
              onClick={() => onTabChange(item)}
              className={`px-4 py-2.5 text-[13px] font-bold rounded-[10px] transition-all border whitespace-nowrap ${
                activeTab === item 
                  ? 'bg-[#DEF3FF] text-[#129FED] border-[#90CEF0] shadow-sm' 
                  : 'text-slate-400 bg-white border-transparent hover:bg-gray-50 hover:text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                {activeTab === item && (
                   <div className="w-4 h-4 bg-[#129FED]/10 rounded-sm flex items-center justify-center">
                     <LayoutGrid size={12} className="text-[#129FED]" />
                   </div>
                )}
                {item}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:bg-gray-50 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm" />
          </button>
        </div>

        <div className="h-8 w-px bg-gray-100 mx-1 hidden sm:block" />

        <div className="flex items-center gap-3 pl-2 group cursor-pointer relative">
          <div className="text-right hidden xl:block">
            <p className="text-[14px] font-bold text-slate-900 leading-none">Sarah Mitchell</p>
            <p className="text-[11px] text-slate-500 mt-1 uppercase font-bold tracking-tighter">Admin Dashboard</p>
          </div>
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 overflow-hidden relative border border-gray-100">
            <User size={24} />
          </div>
          <ChevronDown size={16} className="text-slate-400 hidden sm:block" />
          
          {/* Dropdown Simulation */}
          <div className="absolute top-14 right-0 w-52 bg-white border border-[#E2E8F0] rounded-[10px] shadow-sm py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all transform scale-95 group-hover:scale-100 z-50">
             <button className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-bold text-slate-700 hover:bg-gray-50">
               <Settings size={16} className="text-[#129FED]" /> Edit Profile Details
             </button>
             <button className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-bold text-red-600 hover:bg-red-50">
               <LogOut size={16} /> Logout
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
