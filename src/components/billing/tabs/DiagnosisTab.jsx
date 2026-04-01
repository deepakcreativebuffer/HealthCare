import React from "react";
import { Stethoscope, Plus, Activity, Search } from "lucide-react";
import { billingData } from "../../../data/billingData";

const DiagnosisTab = () => {
  const { diagnosisSection } = billingData.patientSnapshot;

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-500">
      {/* Tab Level Header */}
      <div className="flex items-center gap-2 text-[#009bf2] mb-1">
        <Stethoscope size={16} className="stroke-[2.5]" />
        <h2 className="text-[12px] font-extrabold uppercase tracking-tight">
          Diagnosis (ICD-10)
        </h2>
      </div>

      <div className="space-y-4">
        {/* Table Container */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/20">
                <th className="px-4 py-2 text-[10px] font-bold text-slate-400 border-b border-slate-100 w-12">
                  #
                </th>
                <th className="px-4 py-2 text-[10px] font-bold text-slate-400 border-b border-slate-100">
                  ICD-10 Code
                </th>
                <th className="px-4 py-2 text-[10px] font-bold text-slate-400 border-b border-slate-100">
                  Description
                </th>
                <th className="px-4 py-2 text-[10px] font-bold text-slate-400 border-b border-slate-100">
                  Order / Ptr
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {diagnosisSection.map((item, idx) => (
                <tr
                  key={idx}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-4 py-1.5">
                    <span className="text-[12px] font-bold text-slate-400">
                      {item.id}
                    </span>
                  </td>
                  <td className="px-4 py-1.5">
                    <div className="inline-flex px-3 py-1 rounded border border-slate-100 bg-white group-hover:border-slate-200 transition-all font-black text-slate-800 text-[12px] min-w-[120px]">
                      {item.code}
                    </div>
                  </td>
                  <td className="px-4 py-1.5">
                    <span className="text-[12px] font-bold text-slate-500">
                      {item.description}
                    </span>
                  </td>
                  <td className="px-4 py-1.5">
                    <span className="text-[14px] font-black text-slate-800">
                      {item.ptr}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Diagnosis Button */}
        <button className="flex items-center gap-2 text-[#009bf2] font-black text-[13px] tracking-tight hover:underline transition-all px-2 py-2 rounded-lg hover:bg-blue-50">
          <Plus size={18} className="stroke-[3]" />
          Add Diagnosis
        </button>
      </div>
    </div>
  );
};

export default DiagnosisTab;
