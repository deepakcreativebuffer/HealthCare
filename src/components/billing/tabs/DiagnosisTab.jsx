import React from "react";
import { Stethoscope, Plus, Activity, Search, Hash, Info } from "lucide-react";
import { billingData } from "../../../data/billingData";

const DiagnosisTab = () => {
  const { diagnosisSection } = billingData.patientSnapshot;

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500 antialiased">
      <div className="space-y-4">
        {/* Table Container */}
        <div className="bg-white rounded-lg border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/30">
                <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 w-12 text-center">
                  <Hash size={10} className="mx-auto" />
                </th>
                <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  ICD-10 Code
                </th>
                <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  Clinical Description
                </th>
                <th className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-center">
                  Pointer
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {diagnosisSection.map((item, idx) => (
                <tr
                  key={idx}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-4 py-2 text-center">
                    <span className="text-[11px] font-bold text-slate-300 group-hover:text-slate-500 transition-colors">
                      {item.id}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="inline-flex px-2.5 py-0.5 rounded-md border border-slate-100 bg-white group-hover:border-[#129FED]/30 group-hover:shadow-sm transition-all font-bold text-[#129FED] text-[12px] min-w-[100px] justify-center">
                      {item.code}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <span className="text-[12px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                      {item.description}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span className="text-[12px] font-bold text-slate-400">
                      {item.ptr}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-1">
          <button className="flex items-center gap-2 text-[#129FED] font-bold text-[11px] uppercase tracking-wider hover:underline transition-all px-3 py-1.5 rounded-lg hover:bg-blue-50">
            <Plus size={14} className="stroke-[2.5]" />
            Add Diagnosis
          </button>
          
          <div className="flex items-center gap-2 text-slate-300 text-[10px] uppercase font-bold tracking-widest">
            <Info size={12} />
            Auto-order by Clinical Priority
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisTab;
