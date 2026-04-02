import React from "react";
import {
  FileText,
  User,
  History,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  DollarSign,
  TrendingUp,
  Clock,
} from "lucide-react";
import { billingData } from "../../data/billingData";

const SidebarSectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 mb-2.5 px-1">
    <Icon size={14} className="text-slate-400 stroke-[2.5]" />
    <h3 className="text-[14px] font-bold text-slate-600">
      {title}
    </h3>
  </div>
);

const ValueRow = ({ label, value, isLast }) => (
  <div className={`flex justify-between items-center py-1 ${!isLast ? "border-b border-slate-50" : ""}`}>
    <span className="text-[12px] font-regular text-slate-400">
      {label}
    </span>
    <span className="text-[13px] font-bold text-slate-700 tracking-tight">
      {value}
    </span>
  </div>
);

const ClaimWorkspaceSidebar = () => {
  const { patientSnapshot } = billingData;

  return (
    <div className="w-[260px] border-r border-slate-100 flex flex-col bg-white h-full overflow-y-auto no-scrollbar antialiased">
      <div className="p-5 space-y-7">
        {/* Claim Summary */}
        <section>
          <SidebarSectionHeader icon={TrendingUp} title="Financials" />
          <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="mb-3 flex align-center justify-between">
              <span className="text-[12px] font-bold text-blue-500 uppercase ">Status</span>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[12px] font-heavy text-slate-800">
                  {patientSnapshot.summary.status}
                </span>
              </div>
            </div>

            <div className="space-y-0.5">
              <ValueRow label="Total Charge" value="$350.00" />
              <ValueRow label="Patient Resp" value="$0.00" />
              <ValueRow label="Balance" value="$350.00" isLast />
            </div>
          </div>
        </section>

        {/* Patient Overview */}
        <section>
          <SidebarSectionHeader icon={User} title="Patient" />
          <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                <User size={16} className="text-slate-300" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-bold text-slate-800 leading-none truncate">
                  {patientSnapshot.name}
                </span>
                <span className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-wider">
                  {patientSnapshot.id}
                </span>
              </div>
            </div>

            <div className="space-y-0.5">
              <ValueRow label="DOB" value={patientSnapshot.dob} />
              <ValueRow label="Member ID" value={patientSnapshot.memberId} isLast />
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section>
          <SidebarSectionHeader icon={Clock} title="Timeline" />
          <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="relative pl-4 space-y-4 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
              <div className="relative">
                <div className="absolute -left-[18.5px] top-1.5 w-2 h-2 rounded-full bg-blue-500 border-2 border-white shadow-sm" />
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-slate-700 leading-none">Created</span>
                  <span className="text-[10px] font-medium text-slate-400 mt-1">Today, 10:45 AM</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[18.5px] top-1.5 w-2 h-2 rounded-full bg-slate-200 border-2 border-white shadow-sm" />
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-slate-700 leading-none">Last Edit</span>
                  <span className="text-[10px] font-medium text-slate-400 mt-1">2 minutes ago</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ClaimWorkspaceSidebar;
