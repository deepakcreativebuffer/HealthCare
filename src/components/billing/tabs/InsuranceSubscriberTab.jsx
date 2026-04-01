import React from "react";
import { ShieldCheck, UserCheck, CreditCard, ChevronDown } from "lucide-react";
import { billingData } from "../../../data/billingData";

const FieldBox = ({ label, value, highlight = false }) => (
  <div
    className={`bg-white p-3.5 rounded-lg border ${highlight ? "border-[#129FED] shadow-[0_4px_12px_rgba(18,159,237,0.1)]" : "border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"} flex flex-col gap-1 group transition-all hover:shadow-[0_4px_15px_rgba(0,0,0,0.04)]`}
  >
    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
      {label}
    </span>
    <span className="text-[13px] font-bold text-slate-700 tracking-tight leading-none group-hover:text-slate-900">
      {value}
    </span>
  </div>
);

const SectionTitle = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 mb-3 px-1">
    <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
      <Icon size={12} className="text-slate-400" />
    </div>
    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
      {title}
    </span>
  </div>
);

const InsuranceSubscriberTab = () => {
  const { insurance } = billingData.patientSnapshot;

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500 antialiased">
      <div className="space-y-6">
        {/* Section 1: Policy Info */}
        <section>
          <SectionTitle icon={ShieldCheck} title="Coverage Policy" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FieldBox label="Policy Type" value={insurance.insuranceType} />
            <FieldBox label="Plan Tier" value={insurance.planType} />
            <FieldBox label="Primary Payer" value={insurance.primaryPayer} highlight />
            <FieldBox label="Payer ID" value={insurance.payerId} />
          </div>
        </section>

        {/* Section 2: Subscriber Details */}
        <section>
          <SectionTitle icon={UserCheck} title="Subscriber Profile" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FieldBox
              label="Legal First Name"
              value={insurance.subscriber.firstName}
            />
            <FieldBox
              label="Legal Last Name"
              value={insurance.subscriber.lastName}
            />
            <FieldBox
              label="Date of Birth"
              value={insurance.subscriber.dob}
            />
            <FieldBox
              label="Relationship"
              value={insurance.subscriber.relationship}
            />
          </div>
        </section>

        {/* Section 3: Member Details */}
        <section>
          <SectionTitle icon={CreditCard} title="Member Identification" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldBox label="Member / Policy ID" value={insurance.policyId} highlight />
            <FieldBox label="Group / Account No." value={insurance.groupNumber} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default InsuranceSubscriberTab;
