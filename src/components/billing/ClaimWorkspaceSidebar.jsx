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
    <div className="w-[260px] border-r border-slate-100 flex flex-col bg-white h-full overflow-y-auto no-scrollbar">
      <div className="p-4 space-y-4">
        {/* Claim Summary */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-blue-600">
            <div className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center">
              <FileText size={12} className="stroke-[2.5]" />
            </div>
            <h3 className="text-[12px] font-bold text-slate-800 tracking-tight uppercase">
              Claim Summary
            </h3>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Claim ID
              </span>
              <span className="text-[13px] font-extrabold text-slate-800">
                $61,000
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Status
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-[9px] font-bold text-slate-500 uppercase tracking-tighter border border-slate-200">
                {patientSnapshot.summary.status}
              </span>
            </div>
            <div className="h-px bg-slate-50 my-0.5" />
            <div className="flex justify-between items-baseline pt-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Total Charge
              </span>
              <span className="text-[13px] font-extrabold text-slate-800">
                $350.00
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Paid</span>
              <span className="text-[13px] font-extrabold text-slate-800">
                $0.00
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Patient Resp
              </span>
              <span className="text-[13px] font-extrabold text-slate-800">
                $0.00
              </span>
            </div>
          </div>
        </section>

        {/* Patient Info */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-blue-600">
            <div className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center">
              <User size={12} className="stroke-[2.5]" />
            </div>
            <h3 className="text-[12px] font-bold text-slate-800 tracking-tight uppercase">
              Patient Info
            </h3>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-50">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                <User size={16} className="text-slate-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-extrabold text-slate-800 leading-tight">
                  {patientSnapshot.name}
                </span>
                <span className="text-[9px] font-bold text-slate-400 mt-0.5 tracking-tight uppercase">
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
