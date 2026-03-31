import React from "react";
import {
  FileText,
  User,
  History,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { billingData } from "../../data/billingData";

const ClaimWorkspaceSidebar = () => {
  const { patientSnapshot } = billingData;

  return (
    <div className="w-[280px] border-r border-slate-100 flex flex-col bg-white h-full overflow-y-auto no-scrollbar">
      <div className="p-6 space-y-8">
        {/* Claim Summary */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 text-blue-600">
            <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
              <FileText size={14} className="stroke-[2.5]" />
            </div>
            <h3 className="text-[13px] font-bold text-slate-800 tracking-tight">
              Claim Summary
            </h3>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-[11px] font-bold text-slate-400">
                Claim ID
              </span>
              <span className="text-[14px] font-extrabold text-slate-800">
                $61,000
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-slate-400">
                Status
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-tighter border border-slate-200 shadow-sm">
                {patientSnapshot.summary.status}
              </span>
            </div>
            <div className="h-px bg-slate-50 my-1" />
            <div className="flex justify-between items-baseline pt-1">
              <span className="text-[11px] font-bold text-slate-400">
                Total Charge
              </span>
              <span className="text-[14px] font-extrabold text-slate-800">
                $350.00
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-[11px] font-bold text-slate-400">Paid</span>
              <span className="text-[14px] font-extrabold text-slate-800">
                $0.00
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-[11px] font-bold text-slate-400">
                Patient Resp
              </span>
              <span className="text-[14px] font-extrabold text-slate-800">
                $0.00
              </span>
            </div>
          </div>
        </section>

        {/* Patient Info */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 text-blue-600">
            <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
              <User size={14} className="stroke-[2.5]" />
            </div>
            <h3 className="text-[13px] font-bold text-slate-800 tracking-tight">
              Patient Info
            </h3>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-slate-50">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                <User size={20} className="text-slate-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-extrabold text-slate-800 leading-tight">
                  {patientSnapshot.name}
                </span>
                <span className="text-[10px] font-bold text-slate-400 mt-0.5 tracking-tight">
                  {patientSnapshot.id}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-slate-400">
                  DOB
                </span>
                <span className="text-[11px] font-extrabold text-slate-800">
                  {patientSnapshot.dob}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-slate-400">
                  Payer
                </span>
                <span className="text-[11px] font-extrabold text-slate-800">
                  $0.00
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-slate-400">
                  Member ID
                </span>
                <span className="text-[11px] font-extrabold text-slate-800 uppercase tracking-tighter">
                  {patientSnapshot.memberId}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* History & Audit */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 text-blue-600">
            <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
              <History size={14} className="stroke-[2.5]" />
            </div>
            <h3 className="text-[13px] font-bold text-slate-800 tracking-tight">
              History & Audit
            </h3>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-800">
                Created —
              </span>
              <span className="text-[11px] font-bold text-slate-400">
                Just now
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-800">
                Last Modified —
              </span>
              <span className="text-[11px] font-bold text-slate-400">
                Just now
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ClaimWorkspaceSidebar;
