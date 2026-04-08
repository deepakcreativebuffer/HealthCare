import React from "react";
import {
  Search,
  Bell,
  Settings,
  LogOut,
  User,
  ChevronDown,
  LayoutGrid,
  Mail,
  ReceiptText,
  Users,
  MapPin,
  FileText,
  History,
  UserPlus,
  Pencil,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ activeTab, onTabChange }) => {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const navigate = useNavigate();
  const dropdownRef = React.useRef(null);

  const navItems = [
    { name: "Dashboard", icon: LayoutGrid },
    { name: "Billing & Claims", icon: ReceiptText },
    { name: "Users", icon: Users },
    { name: "Tracking", icon: MapPin },
    { name: "Log", icon: FileText },
    { name: "Activity Log", icon: History },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userStr = localStorage.getItem("user");
  const user = userStr
    ? JSON.parse(userStr)
    : { name: "Sarah Mitchell", email: "sarah.mitchell@healthcare.com" };

  return (
    <nav className="bg-white border-b border-gray-100 px-4 sm:px-6 py-1.5 flex items-center justify-between">
      <div className="flex items-center gap-4 lg:gap-8 shrink-0">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onTabChange("Dashboard")}
        >
          <Link to="/" className="flex items-center space-x-2 justify-center">
            {/* <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold" />
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                HealthCare
              </span> */}
            <img src="logo.svg" className="h-12" alt="Logo" />
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="hidden lg:flex items-center gap-2 overflow-x-auto no-scrollbar max-w-[40vw] xl:max-w-none">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => onTabChange(item.name)}
              className={`px-3 py-1 text-[13px] font-medium rounded-[10px] transition-all border whitespace-nowrap flex items-center gap-2 ${activeTab === item.name
                ? "bg-[#E3F2FD] text-[#129FED] border-[#129FED] shadow-xs"
                : "bg-white text-slate-500 border-[#E2E8F0] hover:bg-slate-50"
                }`}
            >
              <item.icon
                size={14}
                className={
                  activeTab === item.name ? "text-[#129FED]" : "text-slate-500"
                }
                strokeWidth={2}
              />
              {item.name}
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

        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-slate-50/80 p-1.5 rounded-lg transition-all"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="text-right hidden xl:block">
              <p className="text-[14px] font-bold text-[#334155] leading-none uppercase tracking-tight">
                {user.name}
              </p>
              <p className="text-[12px] text-slate-500 mt-1 font-medium lowercase italic">
                {user.email}
              </p>
            </div>
            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 overflow-hidden relative border border-slate-100 shadow-sm">
              <User
                size={24}
                fill="currentColor"
                className="text-slate-400 mt-2"
              />
            </div>
            <ChevronDown
              size={14}
              className={`text-slate-400 hidden sm:block transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
            />
          </div>

          {/* Actual Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute top-14 right-0 w-52 bg-white border border-[#E2E8F0] rounded-[12px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-[14px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                <Pencil size={18} className="text-slate-500" /> Edit Profile
                Details
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-[14px] font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={18} className="text-red-500" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
