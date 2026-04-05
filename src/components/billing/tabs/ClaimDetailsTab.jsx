import React from "react";
import { FileCheck, ChevronDown, Lock, DollarSign, Fingerprint, ShieldCheck } from "lucide-react";
import { billingData } from "../../../data/billingData";

const FieldBox = ({
  label,
  value,
  isSelect = false,
  isLocked = false,
}) => (
  <div
    className="bg-white px-3 py-2 rounded-lg border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col gap-2 transition-all hover:shadow-[0_4px_15px_rgba(0,0,0,0.04)] group"
  >
    <div className="flex justify-between items-start">
      <span className="text-[12px] font-regular text-slate-400 leading-none">
        {label}
      </span>
      <div className="flex items-center gap-1">
        {isSelect && <ChevronDown size={12} className="text-slate-300 group-hover:text-[#129FED]" />}
        {isLocked && <Lock size={10} className="text-slate-200" />}
      </div>
    </div>
    <span className="text-[14px] font-bold text-slate-600 tracking-tight leading-none group-hover:text-slate-900">
      {value}
    </span>
  </div>
);

const SectionTitle = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 mb-3 px-1">
    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-200">
      <Icon size={12} className="text-slate-400" />
    </div>
    <span className="text-[14px] font-bold text-slate-600">
      {title}
    </span>
  </div>
);

const ClaimDetailsTab = () => {
  const { claimDetails } = billingData.patientSnapshot;

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500 antialiased">
      <div className="space-y-6">
        {/* Section 1: Claim Identity */}
        <section>
          <SectionTitle icon={Fingerprint} title="Claim Identity" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FieldBox
              label="Claim Type"
              value={claimDetails.type}
              isLocked={true}
            />
            <FieldBox
              label="Billing Frequency"
              value={claimDetails.frequency}
              isSelect={true}
            />
            <FieldBox label="Frequency Code" value={claimDetails.frequencyCode} />
          </div>
        </section>

        {/* Section 2: Authorization */}
        <section>
          <SectionTitle icon={ShieldCheck} title="Authorizations" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldBox
              label="Provider Signature"
              value={claimDetails.signatureOnFile}
              isSelect={true}
            />
            <FieldBox
              label="Benefit Assignment"
              value={claimDetails.assignmentOfBenefits}
              isSelect={true}
            />
          </div>
        </section>

        {/* Section 3: Totals Bar */}
        <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 flex items-center justify-between shadow-[0_1px_4px_rgba(0,0,0,0.01)] transition-all hover:bg-slate-100/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400 border border-slate-100">
              <DollarSign size={14} />
            </div>
            <span className="text-[12px] font-medium text-slate-500">
              Aggregated Charge Value
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[10px] font-bold text-slate-400">$</span>
            <span className="text-[18px] font-black text-slate-900 tracking-tighter">
              {claimDetails.totalChargeAmount.toFixed(2)}
            </span>
            <span className="text-[12px] font-black text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-50">Auto</span>
          </div>
        </div>

        {/* Section 4: Remittance Module */}
        <section>
          <SectionTitle icon={DollarSign} title="Payment Remittance (ERA)" />
          <div className="bg-white rounded-lg border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 border border-slate-50">
              <Lock size={20} />
            </div>
            <div className="space-y-1.5">
              <p className="text-[14px] font-bold text-slate-500">
                Historical remittance data will appear after the first submission cycle.
              </p>
              <p className="text-[12px] font-regular text-slate-300">
                Protected by HealthCloud HIPAA Compliance Engine
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ClaimDetailsTab;
