import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { billingData } from '../../../data/billingData';

const FieldBox = ({ label, value, highlight = false }) => (
  <div className={`bg-white p-5 rounded-2xl border ${highlight ? 'border-[#009bf2] border-2 shadow-sm' : 'border-slate-100 shadow-sm'} flex flex-col gap-1.5`}>
     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
     <span className="text-[14px] font-extrabold text-slate-800 tracking-tight">{value}</span>
  </div>
);

const InsuranceSubscriberTab = () => {
  const { insurance } = billingData.patientSnapshot;

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      
      {/* Header section with blue shield */}
      <div className="flex items-center gap-3 text-[#009bf2] mb-2">
        <ShieldCheck size={20} className="stroke-[2.5]" />
        <h2 className="text-[13px] font-extrabold uppercase tracking-tight">Insurance & Subscriber Information</h2>
      </div>

      <div className="space-y-4">
        {/* Row 1: Insurance Type & Plan */}
        <div className="grid grid-cols-2 gap-4">
          <FieldBox label="Insurance Type" value={insurance.insuranceType} />
          <FieldBox label="Insurance Plan" value={insurance.planType} />
        </div>

        {/* Row 2: Payer & Payer ID */}
        <div className="grid grid-cols-2 gap-4">
          <FieldBox label="Payer" value={insurance.primaryPayer} />
          <FieldBox label="Payer ID (Electronic)" value={insurance.payerId} />
        </div>

        {/* Section: Subscriber Details Header Box */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mt-6">
           <div className="px-6 py-4 border-b border-slate-50 bg-[#f8fafc]/50 flex items-center gap-3 text-[#009bf2]">
              <ShieldCheck size={16} className="stroke-[2.5]" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest">Subscriber Details</span>
           </div>
           <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <FieldBox label="Subscriber First Name" value={insurance.subscriber.firstName} />
                 <FieldBox label="Subscriber Last Name" value={insurance.subscriber.lastName} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <FieldBox label="Subscriber DOB" value={insurance.subscriber.dob} />
                 <FieldBox label="Relationship" value={insurance.subscriber.relationship} />
              </div>
           </div>
        </div>

        {/* Row 3: Member ID & Group Number */}
        <div className="grid grid-cols-2 gap-4 pt-2">
           <FieldBox label="Member ID" value={insurance.policyId} />
           <FieldBox label="Group Number" value={insurance.groupNumber} />
        </div>

      </div>
    </div>
  );
};

export default InsuranceSubscriberTab;
