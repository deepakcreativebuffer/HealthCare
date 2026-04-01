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
    <div className="space-y-4 animate-in fade-in duration-500 pb-10 antialiased">
      {/* Header / Navigation */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:border-slate-800 transition-all shadow-sm group"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#E3F2FD] border border-blue-600/10 flex items-center justify-center text-blue-600 text-xl font-bold shadow-sm">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-[20px] font-black text-slate-800 tracking-tight leading-none uppercase">
                {user.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-[#129FED] rounded-md text-[9px] font-bold uppercase tracking-widest border border-blue-100">
                  <Shield size={10} /> {user.role}
                </div>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest ml-1">
                  {user.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onDelete(user)}
            className="h-9 px-4 bg-white text-red-500 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-red-50 transition-all flex items-center gap-2 border border-red-100"
          >
            <Trash2 size={14} /> Terminate Access
          </button>
          <button className="h-9 px-6 bg-[#129FED] text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#0089d8] transition-all flex items-center gap-2 shadow-sm shadow-blue-100">
            <Save size={14} /> Update Profile
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Col - Brief Profile and Stats */}
        <div className="col-span-12 md:col-span-4 space-y-4">
          <div className="bg-white rounded-lg border border-slate-100 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
              Account Snapshot
            </h4>

            <div className="space-y-3">
              <div className="p-3.5 rounded-lg bg-slate-50/50 border border-slate-100 flex items-center justify-between group transition-all hover:bg-white hover:border-[#129FED]/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#129FED] transition-all">
                    <UserCheck size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                      Current Status
                    </p>
                    <p className="text-[13px] font-bold text-slate-700 tracking-tight mt-1">
                      {user.status}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={14}
                  className="text-slate-200 group-hover:text-[#129FED] transition-all"
                />
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50/50 border border-slate-100 flex items-center justify-between group transition-all hover:bg-white hover:border-[#129FED]/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#129FED] transition-all">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                      Joined Date
                    </p>
                    <p className="text-[13px] font-bold text-slate-700 tracking-tight mt-1">
                      {user.joinDate || "Jan 15, 2024"}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={14}
                  className="text-slate-200 group-hover:text-[#129FED] transition-all"
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100 flex gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-amber-500 shadow-sm shrink-0">
                <AlertTriangle size={16} />
              </div>
              <p className="text-[10px] font-bold text-amber-700 leading-relaxed uppercase tracking-tighter">
                Administrative privileges enabled. Account can modify billing without secondary approval.
              </p>
            </div>
          </div>
        </div>

        {/* Right Col - Tabbed Content */}
        <div className="col-span-12 md:col-span-8 flex flex-col space-y-4">
          {/* Tab Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-50 w-full max-w-sm rounded-lg border border-slate-100">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === tab ? "bg-white text-slate-800 shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Area Content */}
          <div className="bg-white rounded-lg border border-slate-100 p-6 flex-1 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
            {activeTab === "Activity" && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center justify-between px-1">
                  <h5 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">
                    Real-time Activity Log
                  </h5>
                  <button className="flex items-center gap-1.5 text-[10px] font-bold text-[#129FED] uppercase tracking-widest hover:underline">
                    <History size={12} /> Full Log
                  </button>
                </div>

                <div className="space-y-6">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex gap-4 relative group"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-9 h-9 rounded-lg bg-white border border-slate-100 flex items-center justify-center group-hover:shadow-sm transition-all ${
                            activity.color === "blue"
                              ? "text-blue-500"
                              : activity.color === "orange"
                                ? "text-orange-500"
                                : "text-green-500"
                          }`}
                        >
                          <activity.icon size={16} strokeWidth={2.5} />
                        </div>
                        <div className="w-px h-full bg-slate-50 mt-1" />
                      </div>
                      <div className="pb-4">
                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest leading-none">
                          {activity.time}
                        </p>
                        <h6 className="text-[14px] font-bold text-slate-700 tracking-tight mt-1 group-hover:text-[#129FED] transition-colors leading-none">
                          {activity.type}
                        </h6>
                        <p className="text-[11px] font-medium text-slate-500 mt-1 leading-relaxed">
                          {activity.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Sessions" && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h5 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">
                  Login History
                </h5>
                <div className="space-y-3">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-4 rounded-lg bg-slate-50/50 border border-slate-100 flex items-center justify-between group hover:bg-white hover:border-[#129FED]/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-[#129FED] transition-all shadow-sm">
                          <session.icon size={20} />
                        </div>
                        <div>
                          <h6 className="text-[13px] font-bold text-slate-700 tracking-tight leading-none uppercase">
                            {session.device}
                          </h6>
                          <p className="text-[10px] font-bold text-slate-300 mt-1 uppercase tracking-widest">
                            {session.location} • {session.ip}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest border ${session.status === "Current" ? "bg-green-50 text-green-600 border-green-100" : "bg-slate-100 text-slate-400 border-slate-200"}`}
                      >
                        {session.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Permissions" && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h5 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">
                  Active Permission Sets
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {permissions.map((perm) => (
                    <div
                      key={perm.id}
                      className="p-4 rounded-lg bg-slate-50/50 border border-slate-100 flex flex-col gap-3 group hover:bg-white hover:border-[#129FED]/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-700 tracking-tight uppercase">
                          {perm.name}
                        </span>
                        <div
                          className={`w-8 h-4 rounded-full relative transition-all cursor-pointer ${perm.status ? "bg-blue-500" : "bg-slate-300"}`}
                        >
                          <div
                            className={`w-2.5 h-2.5 rounded-full bg-white absolute top-0.5 transition-all ${perm.status ? "right-0.5" : "left-0.5"}`}
                          />
                        </div>
                      </div>
                      <p className="text-[10px] font-medium text-slate-400 leading-tight uppercase tracking-tight">
                        {perm.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-4 border border-dashed border-slate-200 rounded-lg flex items-center justify-center gap-2 text-slate-300 hover:text-[#129FED] hover:border-[#129FED]/40 transition-all cursor-pointer">
                  <Lock size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Request elevated access
                  </span>
                </div>
              </div>
            )}

            {activeTab === "Settings" && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h5 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest">
                  Departmental Access
                </h5>
                <div className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">
                      Assigned Department
                    </label>
                    <select className="h-9 w-full rounded-lg border border-slate-100 bg-slate-50/50 px-3 text-[12px] font-bold text-slate-700 outline-none focus:bg-white focus:border-[#129FED]/30 transition-all">
                      <option>Clinical Services</option>
                      <option>Billing & Finance</option>
                      <option>Resident Care</option>
                    </select>
                  </div>
                  <div className="p-4 bg-red-50/50 border border-red-100 rounded-lg flex items-center justify-between group cursor-pointer hover:bg-red-50 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-red-400 shadow-sm border border-red-50">
                        <Lock size={18} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[11px] font-bold text-red-800 uppercase tracking-widest leading-none">
                          Freeze System Account
                        </p>
                        <p className="text-[10px] font-medium text-red-600/80 uppercase tracking-tighter">
                          Immediately restrict all sessions.
                        </p>
                      </div>
                    </div>
                    <MoreHorizontal size={14} className="text-red-300" />
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
