import React from "react";
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
  UserCircle,
  Menu,
  X,
} from "lucide-react";

const BillingNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const tabs = [
    { label: "Dashboard", icon: LayoutDashboard, active: false },
    { label: "Billing & Claims", icon: Receipt, active: true },
    { label: "Users", icon: Users, active: false },
    { label: "Tracking", icon: MapPin, active: false },
    { label: "Log", icon: FileText, active: false },
    { label: "Activity Log", icon: Activity, active: false },
  ];

  return (
    <nav className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-6 shrink-0 sticky top-0 z-50">
      <div className="flex items-center gap-12">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
            O
          </div>
          <span className="font-extrabold text-base text-slate-800 tracking-tighter uppercase italic">
            HEALTHCARE NOTES
          </span>
        </div>

        {/* Main Tabs - Desktop */}
        <div className="hidden lg:flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => alert(`Navigating to ${tab.label} Section...`)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all border ${tab.active
                ? "bg-blue-600 text-white shadow-lg shadow-blue-100 border-blue-600"
                : "text-slate-400 hover:text-slate-600 hover:bg-slate-50 border-transparent"
                }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-slate-500 hover:bg-slate-50 rounded-lg transition-all"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => alert("Global Search Activated...")}
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors border border-slate-100"
        >
          <Search size={16} />
        </button>
        <button 
          onClick={() => alert("Viewing 3 New Billing Notifications...")}
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors relative border border-slate-100"
        >
          <Bell size={16} />
          <span className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 pl-4 border-l border-slate-100 ml-1">
          <div className="text-right flex flex-col justify-center">
            <span className="text-[12px] font-bold text-slate-800 leading-none">
              Sarah Mitchell
            </span>
            <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tight">
              Admin
            </span>
          </div>
          <div 
            onClick={() => alert("Opening User Profile & Settings...")}
            className="relative group/profile cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
              <UserCircle size={20} className="text-slate-400" />
            </div>
          </div>
          <ChevronDown size={14} className="text-slate-400 cursor-pointer" onClick={() => alert("Opening Account Switcher...")} />
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-14 left-0 right-0 bg-white border-b border-slate-100 p-4 z-40 lg:hidden shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                className={`w-full px-4 py-3 text-[14px] font-bold rounded-xl transition-all border flex items-center gap-3 ${tab.active
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100"
                  : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50"
                  }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default BillingNavbar;
