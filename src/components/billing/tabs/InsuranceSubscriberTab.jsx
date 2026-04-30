import React from "react";
import { ShieldCheck, UserCheck, CreditCard, ChevronDown, CheckCircle2 } from "lucide-react";
import { billingData } from "../../../data/billingData";

const FieldBox = ({ label, value, highlight = false }) => (
  <div
    className={`bg-white px-3 py-2 rounded-lg border ${highlight ? "border-[#129FED] shadow-[0_4px_12px_rgba(18,159,237,0.1)]" : "border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"} flex flex-col gap-2  group transition-all hover:shadow-[0_4px_15px_rgba(0,0,0,0.04)]`}
  >
    <span className="text-[12px] font-regular text-slate-400 leading-none">
      {label}
    </span>
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

const InsuranceSubscriberTab = () => {
  const { insurance, secondaryInsurance } = billingData.patientSnapshot;
  const [checkingEligibility, setCheckingEligibility] = React.useState(false);
  const [eligibilityResult, setEligibilityResult] = React.useState(null);

  const handleCheckEligibility = () => {
    setCheckingEligibility(true);
    // Simulate EDI 270/271 flow
    setTimeout(() => {
      setCheckingEligibility(false);
      setEligibilityResult({
        status: "Active",
        payer: insurance.primaryPayer,
        date: new Date().toLocaleDateString(),
        message: "Coverage is active. Copay: $20.00, Deductible: $500.00 Met."
      });
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500 antialiased overflow-y-auto max-h-[calc(100vh-250px)]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-800">Insurance Information</h2>
        <button 
          onClick={handleCheckEligibility}
          disabled={checkingEligibility}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-sm ${checkingEligibility ? 'bg-slate-100 text-slate-400' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100'}`}
        >
          {checkingEligibility ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <ShieldCheck size={16} />
              Check Eligibility (EDI 270/271)
            </>
          )}
        </button>
      </div>

      {eligibilityResult && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3 animate-in slide-in-from-top-2 duration-300 mb-6">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <CheckCircle2 size={16} className="text-emerald-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Eligibility Response Received</span>
              <span className="text-[10px] text-emerald-600 font-bold px-2 py-0.5 bg-white rounded border border-emerald-100">EDI 271</span>
            </div>
            <p className="text-sm font-bold text-emerald-900 mt-1">{eligibilityResult.message}</p>
            <p className="text-[10px] text-emerald-600 mt-0.5 font-medium italic">Verified on {eligibilityResult.date} for {eligibilityResult.payer}</p>
          </div>
        </div>
      )}

      <div className="space-y-10">
        {/* Primary Insurance Section */}
        <section className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 relative">
          <div className="absolute -top-3 left-6 px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase rounded-lg shadow-lg shadow-blue-100">
            Primary Insurance
          </div>
          <div className="space-y-6 mt-2">
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
        </section>

        {/* Secondary Insurance Section */}
        <section className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 relative">
          <div className="absolute -top-3 left-6 px-3 py-1 bg-slate-600 text-white text-[10px] font-black uppercase rounded-lg shadow-lg shadow-slate-100">
            Secondary Insurance
          </div>
          <div className="space-y-6 mt-2">
            {/* Section 1: Policy Info */}
            <section>
              <SectionTitle icon={ShieldCheck} title="Coverage Policy" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <FieldBox label="Policy Type" value={secondaryInsurance.insuranceType} />
                <FieldBox label="Plan Tier" value={secondaryInsurance.planType} />
                <FieldBox label="Secondary Payer" value={secondaryInsurance.primaryPayer} highlight />
                <FieldBox label="Payer ID" value={secondaryInsurance.payerId} />
              </div>
            </section>

            {/* Section 2: Subscriber Details */}
            <section>
              <SectionTitle icon={UserCheck} title="Subscriber Profile" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <FieldBox
                  label="Legal First Name"
                  value={secondaryInsurance.subscriber.firstName}
                />
                <FieldBox
                  label="Legal Last Name"
                  value={secondaryInsurance.subscriber.lastName}
                />
                <FieldBox
                  label="Date of Birth"
                  value={secondaryInsurance.subscriber.dob}
                />
                <FieldBox
                  label="Relationship"
                  value={secondaryInsurance.subscriber.relationship}
                />
              </div>
            </section>

            {/* Section 3: Member Details */}
            <section>
              <SectionTitle icon={CreditCard} title="Member Identification" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldBox label="Member / Policy ID" value={secondaryInsurance.policyId} highlight />
                <FieldBox label="Group / Account No." value={secondaryInsurance.groupNumber} />
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InsuranceSubscriberTab;
