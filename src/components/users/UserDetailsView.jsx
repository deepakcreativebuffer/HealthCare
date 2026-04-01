import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Mail,
  Shield,
  User,
  Clock,
  MapPin,
  Settings,
  Save,
  LogOut,
  Activity,
  Lock,
  AlertTriangle,
  Trash2,
  UserCheck,
  Smartphone,
  Globe,
  ShieldCheck,
  History,
  LogIn,
  Monitor,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

const UserDetailsView = ({ user, onBack, onUpdate, onDelete }) => {
  const [activeTab, setActiveTab] = useState("Activity");
  const [formData, setFormData] = useState({ ...user });

  if (!user) return null;

  const tabs = ["Activity", "Permissions", "Sessions", "Settings"];

  const activities = [
    {
      id: 1,
      type: "Login",
      message: "Successfully logged in via Chrome / Mac OS",
      time: "2 hrs ago",
      icon: LogIn,
      color: "blue",
    },
    {
      id: 2,
      type: "Update",
      message: "Updated billing code format in settings",
      time: "1 day ago",
      icon: Settings,
      color: "orange",
    },
    {
      id: 3,
      type: "Claim",
      message: "Verified claim ID CLM-0123 for payment",
      time: "3 days ago",
      icon: ShieldCheck,
      color: "green",
    },
  ];

  const sessions = [
    {
      id: 1,
      device: "Chrome / Mac OS X 10.15",
      ip: "192.168.1.1",
      location: "Austin, TX",
      status: "Current",
      icon: Monitor,
    },
    {
      id: 2,
      device: "iPhone 13 Pro Max App",
      ip: "45.12.33.10",
      location: "Austin, TX",
      status: "Logged Out",
      icon: Smartphone,
    },
  ];

  const permissions = [
    {
      id: 1,
      name: "Billing Access",
      desc: "Can manage and submit claims",
      status: true,
    },
    {
      id: 2,
      name: "Reports View",
      desc: "Can view revenue reports and trends",
      status: true,
    },
    {
      id: 3,
      name: "User Admin",
      desc: "Can add or remove system users",
      status: false,
    },
    {
      id: 4,
      name: "Provider Records",
      desc: "Can manage provider NPI/POS info",
      status: true,
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Header / Navigation */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <button
            onClick={onBack}
            className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:border-slate-800 transition-all shadow-sm hover:shadow-md"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-[24px] bg-[#E3F2FD] border border-[#129FED]/20 flex items-center justify-center text-[#129FED] text-2xl font-black shadow-inner">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase">
                {user.name}
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#E3F2FD] text-[#129FED] rounded-full text-[10px] font-black uppercase tracking-widest border border-[#129FED]/10 italic">
                  <Shield size={12} /> {user.role}
                </div>
                <span className="text-[12px] font-black text-slate-300 uppercase tracking-widest ml-1">
                  {user.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onDelete(user)}
            className="px-6 py-3.5 bg-red-50 text-red-600 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all shadow-sm flex items-center gap-2 border border-red-100"
          >
            <Trash2 size={16} /> Terminate Access
          </button>
          <button className="px-10 py-4 bg-[#129FED] text-white rounded-xl text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_16px_32px_-8px_rgba(18,159,237,0.45)] hover:bg-[#129FED]/90 transition-all flex items-center gap-2 shadow-blue-100">
            <Save size={18} /> Update Profile
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-12 gap-10">
        {/* Left Col - Brief Profile and Stats */}
        <div className="col-span-12 lg:col-span-4 space-y-10">
          <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
            <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 italic">
              Quick Overview
            </h4>

            <div className="space-y-6">
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-[#129FED]/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#129FED] transition-all">
                    <UserCheck size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                      Status
                    </p>
                    <p className="text-[14px] font-black text-slate-800 tracking-tight mt-1">
                      {user.status}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-slate-300 group-hover:text-[#129FED] transition-all"
                />
              </div>

              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-[#129FED]/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#129FED] transition-all">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                      Joined On
                    </p>
                    <p className="text-[14px] font-black text-slate-800 tracking-tight mt-1">
                      {user.joinDate || "Jan 15, 2024"}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-slate-300 group-hover:text-[#129FED] transition-all"
                />
              </div>
            </div>

            <div className="mt-10 p-6 bg-amber-50 rounded-3xl border border-amber-100/50 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-amber-500 shadow-sm shrink-0 mt-1">
                <AlertTriangle size={20} />
              </div>
              <p className="text-[11px] font-bold text-amber-700 leading-relaxed uppercase tracking-tighter italic">
                User has full administrative <br /> privileges and can modify{" "}
                <br /> billing records without approval.
              </p>
            </div>
          </div>
        </div>

        {/* Right Col - Tabbed Content */}
        <div className="col-span-12 lg:col-span-8 flex flex-col space-y-8">
          {/* Tab Switcher */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 w-full max-w-lg rounded-[24px] border border-slate-200 border-dashed">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3.5 rounded-[20px] text-[11px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === tab ? "bg-white text-slate-800 shadow-xl" : "text-slate-400 hover:text-slate-600"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Area Content */}
          <div className="bg-white rounded-[48px] border border-slate-100 p-10 flex-1 shadow-sm">
            {activeTab === "Activity" && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                  <h5 className="text-[14px] font-black text-slate-800 uppercase tracking-[0.3em] italic">
                    Timeline Activity
                  </h5>
                  <button className="flex items-center gap-2 text-[11px] font-black text-[#129FED] uppercase tracking-widest hover:underline italic">
                    <History size={14} /> Full Log
                  </button>
                </div>

                <div className="space-y-8">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex gap-6 relative group"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 rounded-[18px] bg-white border-2 border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform ${
                            activity.color === "blue"
                              ? "text-blue-500 border-blue-100"
                              : activity.color === "orange"
                                ? "text-orange-500 border-orange-100"
                                : "text-green-500 border-green-100"
                          }`}
                        >
                          <activity.icon size={20} strokeWidth={2.5} />
                        </div>
                        <div className="w-[3px] h-full bg-slate-50 mt-2 rounded-full" />
                      </div>
                      <div className="pb-8">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {activity.time}
                        </p>
                        <h6 className="text-[16px] font-black text-slate-800 tracking-tight mt-1 group-hover:text-[#129FED] transition-colors">
                          {activity.type}
                        </h6>
                        <p className="text-[13px] font-bold text-slate-500 mt-1 leading-relaxed">
                          {activity.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Sessions" && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h5 className="text-[14px] font-black text-slate-800 uppercase tracking-[0.3em] italic">
                  Active Login Sessions
                </h5>
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-6 rounded-[32px] bg-slate-50 border border-slate-100 flex items-center justify-between group hover:border-[#129FED]/30 transition-all"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-[20px] bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#129FED] transition-all shadow-sm">
                          <session.icon size={28} />
                        </div>
                        <div>
                          <h6 className="text-[15px] font-black text-slate-800 tracking-tight leading-none italic">
                            {session.device}
                          </h6>
                          <p className="text-[11px] font-black text-slate-400 mt-2 uppercase tracking-widest">
                            {session.location} • {session.ip}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border ${session.status === "Current" ? "bg-green-50 text-green-600 border-green-200" : "bg-slate-200/50 text-slate-400 border-slate-300"}`}
                      >
                        {session.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Permissions" && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h5 className="text-[14px] font-black text-slate-800 uppercase tracking-[0.3em] italic">
                  Permission Sets & Access
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {permissions.map((perm) => (
                    <div
                      key={perm.id}
                      className="p-6 rounded-[32px] bg-slate-50 border border-slate-100 flex flex-col gap-4 group hover:border-[#129FED]/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-black text-slate-800 tracking-tight uppercase italic">
                          {perm.name}
                        </span>
                        <div
                          className={`w-12 h-6 rounded-full relative transition-all cursor-pointer ${perm.status ? "bg-[#129FED]" : "bg-slate-300"}`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${perm.status ? "right-1" : "left-1"}`}
                          />
                        </div>
                      </div>
                      <p className="text-[11px] font-bold text-slate-400 leading-tight uppercase tracking-tighter">
                        {perm.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-2 border-dashed border-slate-200 rounded-[32px] flex items-center justify-center gap-3 text-slate-400 hover:text-[#129FED] hover:border-[#129FED]/40 transition-all cursor-pointer">
                  <Lock size={18} />
                  <span className="text-[11px] font-black uppercase tracking-[0.3em]">
                    Request Advanced Permissions
                  </span>
                </div>
              </div>
            )}

            {activeTab === "Settings" && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h5 className="text-[14px] font-black text-slate-800 uppercase tracking-[0.3em] italic">
                  System Account Settings
                </h5>
                <div className="space-y-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Assigned Department
                    </label>
                    <select className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-[20px] text-[13px] font-black text-slate-800 outline-none uppercase italic border-dashed">
                      <option>Clinical Services</option>
                      <option>Billing & Finance</option>
                      <option>Resident Care</option>
                    </select>
                  </div>
                  <div className="p-6 bg-red-50 border border-red-100 rounded-[32px] flex items-center justify-between group cursor-pointer hover:bg-red-100 transition-all animate-pulse">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-red-500 shadow-sm shrink-0">
                        <Lock size={20} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-black text-red-800 uppercase tracking-widest leading-none">
                          Lock System Account
                        </p>
                        <p className="text-[11px] font-medium text-red-600/80">
                          Immediately restrict all API access and login
                          sessions.
                        </p>
                      </div>
                    </div>
                    <MoreHorizontal className="text-red-400" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsView;
