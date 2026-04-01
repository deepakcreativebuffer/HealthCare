import React from "react";
import { UserCircle, Calendar, MapPin, Search, User, CreditCard, ShieldCheck } from "lucide-react";
import { billingData } from "../../../data/billingData";

const SnapshotCard = ({ label, value, icon: Icon, fullWidth }) => (
  <div
    className={`bg-white p-4 rounded-lg border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-4 group transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] ${
      fullWidth ? "md:col-span-2" : ""
    }`}
  >
    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-[#129FED] transition-all border border-slate-50">
      <Icon size={18} className="stroke-[2.5]" />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
        {label}
      </span>
      <span className="text-[14px] font-bold text-slate-800 leading-none">
        {value}
      </span>
    </div>
  </div>
);

const PatientSnapshot = () => {
  const { patientSnapshot } = billingData;

  return (
    <div className="p-6 space-y-6 animate-in slide-in-from-right-4 duration-500 antialiased">
      <div className="flex items-center gap-2 text-slate-400">
        <UserCircle size={16} className="stroke-[2.5]" />
        <h2 className="text-[12px] font-bold uppercase tracking-widest text-slate-400">
          Core Profile
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SnapshotCard label="Full Name" value={patientSnapshot.name} icon={User} />
        <SnapshotCard label="Date of Birth" value={patientSnapshot.dob} icon={Calendar} />
        <SnapshotCard label="Gender" value={patientSnapshot.gender} icon={UserCircle} />
        <SnapshotCard label="Current Address" value={patientSnapshot.address} icon={MapPin} />
        <SnapshotCard 
          label="Coverage Status" 
          value="Primary Active Subscriber" 
          icon={ShieldCheck} 
          fullWidth 
        />
      </div>

      <div className="bg-slate-50 rounded-lg border border-slate-100 p-4 flex gap-4 items-start">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm shrink-0 border border-slate-50">
          <Info size={16} />
        </div>
        <p className="text-[11px] font-medium text-slate-500 leading-relaxed uppercase tracking-tight">
          System Verification: Demographic data has been cross-referenced with the primary payer portal. 
          <span className="block text-slate-400 mt-1">Verified: Just now by HealthCloud Sync</span>
        </p>
      </div>
    </div>
  );
};

const Info = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export default PatientSnapshot;
