import React from "react";
import { FileText, Eye, History, Clock, UserCheck, ShieldAlert } from "lucide-react";
import { billingData } from "../../../data/billingData";

const AuditBox = ({ label, value, icon: Icon }) => (
  <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center gap-4 flex-1 transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-50 text-slate-400">
      <Icon size={18} />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">
        {label}
      </span>
      <span className="text-[13px] font-bold text-slate-800 tracking-tight leading-none italic uppercase">
        {value}
      </span>
    </div>
  </div>
);

const AuditComplianceTab = () => {
  const { auditSection } = billingData.patientSnapshot;

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500 antialiased">
      <div className="space-y-6">
        {/* Row 1: Key Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AuditBox 
            label="System Timestamp" 
            value={auditSection.submissionTimestamp} 
            icon={Clock} 
          />
          <AuditBox 
            label="Authorized User" 
            value={auditSection.lastModifiedBy} 
            icon={UserCheck} 
          />
        </div>

        {/* Security / Compliance Notice Area */}
        <div className="p-5 rounded-lg bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-amber-500 shadow-sm border border-slate-50">
              <ShieldAlert size={20} />
            </div>
            <div className="space-y-1">
              <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-tight">Security Audit Logging Active</h3>
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest leading-relaxed">
                All modifications are recorded with IP tracking and user session validation.
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 shrink-0">
            <button className="h-9 px-4 rounded-lg border border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-wider hover:bg-white transition-all shadow-sm flex items-center gap-2">
              <Eye size={14} />
              HIPAA Logs
            </button>
            <button className="h-9 px-5 rounded-lg bg-[#129FED] text-white font-bold text-[11px] uppercase tracking-wider hover:bg-[#0089d8] transition-all shadow-sm flex items-center gap-2">
              <History size={14} />
              Audit Trail
            </button>
          </div>
        </div>

        {/* Informational Module */}
        <div className="bg-white rounded-lg border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-10 flex flex-col items-center justify-center text-center space-y-4 border-dashed">
          <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 border border-slate-50">
            <FileText size={20} />
          </div>
          <div className="space-y-1.5">
            <p className="text-[14px] font-bold text-slate-400 tracking-tight">
              Audit log detail is generated upon claim submission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditComplianceTab;
