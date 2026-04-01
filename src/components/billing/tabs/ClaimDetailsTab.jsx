import React from "react";
import { FileCheck, ChevronDown, Lock, DollarSign } from "lucide-react";
import { billingData } from "../../../data/billingData";

const FieldBox = ({
  label,
  value,
  isSelect = false,
  isLocked = false,
  isShort = false,
}) => (
  <div
    className={`bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-1.5 hover:border-slate-200 transition-all ${isShort ? "flex-1" : "flex-1"}`}
  >
    <div className="flex justify-between items-start">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {label}
      </span>
      {isSelect && <ChevronDown size={14} className="text-slate-400" />}
      {isLocked && <Lock size={12} className="text-slate-300" />}
    </div>
    <span className="text-[14px] font-extrabold text-slate-800 tracking-tight">
      {value}
    </span>
  </div>
);

const ClaimDetailsTab = () => {
  const { claimDetails } = billingData.patientSnapshot;

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      {/* Tab Level Header */}
      <div className="flex items-center gap-3 text-[#009bf2] mb-2">
        <FileCheck size={20} className="stroke-[2.5]" />
        <h2 className="text-[13px] font-extrabold uppercase tracking-tight">
          Claim Details & Compliance
        </h2>
      </div>

      <div className="space-y-6">
        {/* Row 1: Type, Frequency, Code */}
        <div className="flex gap-4">
          <FieldBox
            label="Claim Type"
            value={claimDetails.type}
            isLocked={true}
          />
          <FieldBox
            label="Claim Frequency"
            value={claimDetails.frequency}
            isSelect={true}
          />
          <FieldBox label="Frequency Code" value={claimDetails.frequencyCode} />
        </div>

        {/* Row 2: Signature & Assignment */}
        <div className="flex gap-4">
          <FieldBox
            label="Signature on File"
            value={claimDetails.signatureOnFile}
            isSelect={true}
          />
          <FieldBox
            label="Assignment of Benefits"
            value={claimDetails.assignmentOfBenefits}
            isSelect={true}
          />
        </div>

        {/* Total Charge Summary Bar (Indigo Tint) */}
        <div className="bg-[#f5f7ff] p-6 rounded-xl border border-blue-50/50 flex items-center justify-between shadow-sm">
          <span className="text-[13px] font-black text-slate-500 tracking-tight">
            Total Charge Amount
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[20px] font-black text-slate-800">
              ${claimDetails.totalChargeAmount.toFixed(2)}
            </span>
            <span className="text-[11px] font-bold text-slate-300">Auto</span>
          </div>
        </div>

        {/* Payments / ERA Section */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 bg-[#f8fafc]/50 flex items-center gap-3 text-[#009bf2]">
            <DollarSign size={16} className="stroke-[2.5]" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest">
              Payments / ERA
            </span>
          </div>

          <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300">
              <Lock size={24} />
            </div>
            <div className="space-y-1">
              <p className="text-[15px] font-extrabold text-slate-500 tracking-tight">
                ERA Claim ID | Paid Amount | Adjustments | Patient Resp | Denial
                Codes
              </p>
              <p className="text-[12px] font-bold text-slate-300">
                Coming Soon — Enabled after first claim submission
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimDetailsTab;
