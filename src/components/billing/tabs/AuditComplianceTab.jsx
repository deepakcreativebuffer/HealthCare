import React from "react";
import { FileText, Eye, History } from "lucide-react";
import { billingData } from "../../../data/billingData";

const AuditComplianceTab = () => {
  const { auditSection } = billingData.patientSnapshot;

  return (
    <div className="p-8 space-y-12 animate-in fade-in duration-500 min-h-[400px]">
      {/* Tab Level Header */}
      <div className="flex items-center gap-3 text-blue-600 mb-6">
        <FileText size={20} className="stroke-[2.5]" />
        <h2 className="text-[14px] font-extrabold uppercase tracking-tight">
          Audit & Compliance
        </h2>
      </div>

      <div className="space-y-10">
        {/* Row 1: Information Boxes */}
        <div className="flex gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2 flex-1 hover:border-gray-200 transition-all">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Submission Timestamp
            </span>
            <span className="text-[15px] font-extrabold text-gray-500 tracking-widest">
              {auditSection.submissionTimestamp}
            </span>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2 flex-1 hover:border-gray-200 transition-all">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Last Modified By
            </span>
            <span className="text-[15px] font-extrabold text-gray-800 tracking-tight">
              {auditSection.lastModifiedBy}
            </span>
          </div>
        </div>

        {/* Row 2: Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          {/* Left button: HIPAA Logs */}
          <button className="flex items-center gap-2.5 px-6 py-2.5 rounded-lg border-2 border-blue-600 text-blue-600 font-black text-[13px] hover:bg-blue-50 transition-all shadow-sm">
            <Eye size={18} />
            View HIPAA Logs
          </button>

          {/* Right button: Audit Trail */}
          <button className="flex items-center gap-2.5 px-6 py-2.5 rounded-lg bg-blue-600 text-white font-black text-[13px] hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            <History size={18} />
            View Audit Trail
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditComplianceTab;
