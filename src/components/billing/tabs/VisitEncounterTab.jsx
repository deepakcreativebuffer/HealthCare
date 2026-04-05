import React from "react";
import { Calendar, Building2, ClipboardList, CheckCircle2, Link2, Info } from "lucide-react";
import { billingData } from "../../../data/billingData";

const FieldBox = ({ label, value, icon: Icon }) => (
  <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col gap-2 relative group hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all flex-1">
    <div className="flex items-center gap-2">
      {Icon && <Icon size={14} className="text-slate-400 group-hover:text-[#129FED]" />}
      <span className="text-[12px] font-medium text-slate-400 leading-none">
        {label}
      </span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-[14px] font-bold text-slate-800 leading-none">
        {value}
      </span>
      <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
    </div>
  </div>
);

const VisitEncounterTab = () => {
  const { visitEncounter } = billingData.patientSnapshot;

  return (
    <div className="px-4 py-3 space-y-6 animate-in slide-in-from-right-4 duration-500 antialiased">
      {/* Tab Level Header */}
      <div className="flex items-center gap-2 text-slate-400">
        <Building2 size={16} className="stroke-[2.5]" />
        <h2 className="text-[14px] font-bold text-slate-600">
          Clinical Linkage
        </h2>
      </div>

      <div className="space-y-6">
        {/* Linked Visit Card (Prominent Card) */}
        <div className="bg-white rounded-lg border border-slate-100 py-3 px-4 shadow-[0_2px_15px_rgba(0,0,0,0.03)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-100">
              <Link2 size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-medium text-slate-400 mb-1">Active Encounter</span>
              <span className="text-[16px] font-bold text-slate-800 tracking-tight">
                {visitEncounter.encounterId}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200">
            <CheckCircle2 size={14} className="text-slate-400" />
            <span className="text-[12px] font-bold text-slate-600">Source Verified</span>
          </div>
        </div>

        {/* Status/Date Boxes Row */}
        <div className="grid grid-cols-3 gap-4">
          <FieldBox
            label="Service Start"
            value={visitEncounter.dosFrom}
            icon={Calendar}
          />
          <FieldBox
            label="Service End"
            value={visitEncounter.dosTo}
            icon={Calendar}
          />
          <FieldBox
            label="Linked Patient"
            value={visitEncounter.patientName}
            icon={ClipboardList}
          />
        </div>

        <div className="px-4 py-2 rounded-lg bg-blue-50 border border-blue-100 flex items-start gap-3">
          <Info size={16} className="text-blue-400 mt-0.5 shrink-0" />
          <p className="text-[12px] font-medium text-blue-700 leading-relaxed">
            Data Integrity: This claim is permanently linked to the clinical encounter. Updates to procedures or codes will reflect in the patient's longitudinal record.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisitEncounterTab;
