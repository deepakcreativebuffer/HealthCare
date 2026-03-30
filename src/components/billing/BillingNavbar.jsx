import React from 'react';
import { 
  Bell, 
  Search, 
  ChevronDown, 
  LayoutDashboard, 
  Receipt, 
  Users, 
  MapPin, 
  FileText, 
  Activity,
  UserCircle
} from 'lucide-react';

const BillingNavbar = () => {
  const tabs = [
    { label: 'Dashboard', icon: LayoutDashboard, active: false },
    { label: 'Billing & Claims', icon: Receipt, active: true },
    { label: 'Users', icon: Users, active: false },
    { label: 'Tracking', icon: MapPin, active: false },
    { label: 'Log', icon: FileText, active: false },
    { label: 'Activity Log', icon: Activity, active: false },
  ];

  return (
    <nav className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 shrink-0 sticky top-0 z-50">
      <div className="flex items-center gap-12">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
            O
          </div>
          <span className="font-extrabold text-lg text-slate-800 tracking-tighter">OASIS NOTES</span>
        </div>

        {/* Main Tabs */}
        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                tab.active 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 border-blue-600' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50 border-transparent'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors border border-slate-100">
          <Search size={20} />
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors relative border border-slate-100">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        
        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-100 ml-2">
          <div className="text-right flex flex-col justify-center">
            <span className="text-sm font-bold text-slate-800 leading-none">Sarah Mitchell</span>
            <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">sarah.mitchell@oasisnotes.com</span>
          </div>
          <div className="relative group/profile cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
               <UserCircle size={28} className="text-slate-400" />
            </div>
          </div>
          <ChevronDown size={16} className="text-slate-400" />
        </div>
      </div>
    </nav>
  );
};

export default BillingNavbar;
