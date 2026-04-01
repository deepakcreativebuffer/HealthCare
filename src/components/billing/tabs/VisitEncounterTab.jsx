import React from "react";
import { Calendar, Building2, ClipboardList } from "lucide-react";
import { billingData } from "../../../data/billingData";

const FieldBox = ({ label, value, icon: Icon }) => (
  <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm flex flex-col gap-1 relative group hover:border-slate-200 transition-all flex-1">
    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
      {label}
    </span>
    <div className="flex items-center justify-between">
      <span className="text-[13px] font-extrabold text-slate-800 tracking-tight">
        {value}
      </span>
      {Icon && <Icon size={14} className="text-slate-400" />}
    </div>
  </div>
);

const VisitEncounterTab = () => {
  const { visitEncounter } = billingData.patientSnapshot;

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-500">
      {/* Tab Level Header */}
      <div className="flex items-center gap-2 text-[#009bf2] mb-1">
        <Building2 size={16} className="stroke-[2.5]" />
        <h2 className="text-[12px] font-extrabold uppercase tracking-tight">
          Visit / Encounter
        </h2>
      </div>

      <div className="space-y-6">
        {/* Linked Visit Card (Prominent Card) */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-3 space-y-1 hover:border-slate-200 transition-all group">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold text-slate-400">
              Linked Visit:
            </span>
            <span className="text-[13px] font-black text-slate-800 tracking-tight">
              {visitEncounter.encounterId}
            </span>
          </div>
          <p className="text-[10px] font-bold text-slate-300 italic">
            (Selecting visit auto-loads diagnosis & procedures)
          </p>
        </div>

        {/* Status/Date Boxes Row */}
        <div className="flex gap-4">
          <FieldBox
            label="Date of Service (From)"
            value={visitEncounter.dosFrom}
            icon={Calendar}
          />
          <FieldBox
            label="Date of Service (To)"
            value={visitEncounter.dosTo}
            icon={Calendar}
          />
          <FieldBox label="Patient" value={visitEncounter.patientName} />
        </div>
      </div>
    </div>
  );
};

export default VisitEncounterTab;
