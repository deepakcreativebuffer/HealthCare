import React from "react";
import { Calendar, Building2, ClipboardList } from "lucide-react";
import { billingData } from "../../../data/billingData";

const FieldBox = ({ label, value, icon: Icon }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-1.5 relative group hover:border-slate-200 transition-all flex-1">
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
      {label}
    </span>
    <div className="flex items-center justify-between">
      <span className="text-[14px] font-extrabold text-slate-800 tracking-tight">
        {value}
      </span>
      {Icon && <Icon size={16} className="text-slate-400" />}
    </div>
  </div>
);

const VisitEncounterTab = () => {
  const { visitEncounter } = billingData.patientSnapshot;

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Tab Level Header */}
      <div className="flex items-center gap-3 text-[#009bf2] mb-2">
        <Building2 size={20} className="stroke-[2.5]" />
        <h2 className="text-[13px] font-extrabold uppercase tracking-tight">
          Visit / Encounter
        </h2>
      </div>

      <div className="space-y-6">
        {/* Linked Visit Card (Prominent Card) */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-1.5 hover:border-slate-200 transition-all group">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-bold text-slate-400">
              Linked Visit:
            </span>
            <span className="text-[14px] font-black text-slate-800 tracking-tight">
              {visitEncounter.encounterId}
            </span>
          </div>
          <p className="text-[11px] font-bold text-slate-300 italic">
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
