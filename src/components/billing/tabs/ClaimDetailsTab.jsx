import React from "react";
import { FileCheck, ChevronDown, Lock, DollarSign, Fingerprint, ShieldCheck, CheckCircle2, Send, Info } from "lucide-react";
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
  const [generatingEDI, setGeneratingEDI] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleGenerateEDI = () => {
    setGeneratingEDI(true);
    setTimeout(() => {
      setGeneratingEDI(false);
      alert("EDI 837 (ANSI X12) File Generated Successfully: 837P_CLM00123.txt");
    }, 1200);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500 antialiased overflow-y-auto max-h-[calc(100vh-250px)]">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-slate-800">Claim Details & Submission</h2>
        <div className="flex gap-2">
          <button 
            onClick={handleGenerateEDI}
            disabled={generatingEDI || submitted}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm border transition-all ${generatingEDI ? 'bg-slate-50 text-slate-400' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
          >
            {generatingEDI ? (
              <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
            ) : (
              <FileCheck size={16} />
            )}
            Generate EDI 837
          </button>
          <button 
            onClick={handleSubmit}
            disabled={submitting || submitted}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-sm ${submitted ? 'bg-emerald-100 text-emerald-600 border border-emerald-200 cursor-default' : submitting ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'}`}
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
                Submitting...
              </>
            ) : submitted ? (
              <>
                <CheckCircle2 size={16} />
                Submitted to Clearinghouse
              </>
            ) : (
              <>
                <Send size={16} />
                Submit (SFTP/API)
              </>
            )}
          </button>
        </div>
      </div>

      {submitted && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3 animate-in slide-in-from-top-2 duration-300">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <CheckCircle2 size={16} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-emerald-900">Claim successfully transmitted to Availity Clearinghouse.</p>
            <p className="text-[10px] text-emerald-600 mt-0.5 font-medium">Tracking ID: TRK-9908827-X12 | Batch: BATCH-001</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Section 1: Claim Identity */}
        <section>
          <SectionTitle icon={Fingerprint} title="Claim Identity & Resubmission" />
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
            <div className="bg-white px-3 py-2 rounded-lg border border-blue-200 shadow-[0_4px_12px_rgba(18,159,237,0.05)] flex flex-col gap-2 transition-all hover:shadow-[0_4px_15px_rgba(0,0,0,0.04)] group">
              <div className="flex justify-between items-start">
                <span className="text-[12px] font-bold text-blue-500 leading-none">
                  Frequency Code (CL1)
                </span>
                <Info size={12} className="text-blue-400" />
              </div>
              <select className="text-[14px] font-bold text-slate-900 bg-transparent outline-none cursor-pointer">
                <option value="1">1 - Original</option>
                <option value="7">7 - Replacement/Resubmission</option>
                <option value="8">8 - Void/Cancel</option>
              </select>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 px-1">Use Code 7 for resubmitting denied or rejected claims with corrections.</p>
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
