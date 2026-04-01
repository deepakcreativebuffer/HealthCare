import React from "react";
import { Plus, Trash2, Info, Receipt } from "lucide-react";
import { billingData } from "../../../data/billingData";

const TableCell = ({ value, classes = "" }) => (
  <div
    className={`px-4 py-2.5 rounded-lg border border-slate-100 bg-white min-h-[42px] flex items-center justify-center text-[13px] font-bold text-slate-700 transition-all hover:border-slate-200 shadow-sm ${classes}`}
  >
    {value || ""}
  </div>
);

const ProceduresTab = () => {
  const { proceduresSection } = billingData.patientSnapshot;

  const totalCharges = proceduresSection.reduce(
    (acc, curr) => acc + curr.charge,
    0,
  );

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Tab Level Header */}
      <div className="flex items-center gap-3 text-[#009bf2] mb-2">
        <Receipt size={20} className="stroke-[2.5]" />
        <h2 className="text-[13px] font-extrabold uppercase tracking-tight">
          Procedures / Charges (CPT / HCPCS)
        </h2>
      </div>

      <div className="space-y-6">
        {/* Table Structure */}
        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden p-6 space-y-4">
          {/* Headers */}
          <div className="grid grid-cols-[1fr_1fr_1.5fr_1fr_1fr_1fr_1fr_1fr_1fr_40px] gap-3 px-2">
            {[
              "DOS From",
              "DOS To",
              "CPT",
              "Mod1",
              "Mod2",
              "Units",
              "Charge",
              "Dx Ptr",
              "POS",
            ].map((h) => (
              <span
                key={h}
                className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center"
              >
                {h}
              </span>
            ))}
            <span className="w-10" />
          </div>

          {/* Rows */}
          <div className="space-y-3">
            {proceduresSection.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[1fr_1fr_1.5fr_1fr_1fr_1fr_1fr_1fr_1fr_40px] gap-3 group items-center"
              >
                <TableCell value={item.dosFrom} />
                <TableCell value={item.dosTo} />
                <TableCell value={item.cpt} />
                <TableCell value={item.mod1} />
                <TableCell value={item.mod2} />
                <TableCell value={item.units} />
                <TableCell value={item.charge} />
                <TableCell value={item.dxPtr} />
                <TableCell value={item.pos} />
                <button className="text-slate-300 hover:text-red-400 transition-colors flex items-center justify-center">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Footer: Totals */}
          <div className="pt-4 border-t border-slate-50 flex items-center justify-between px-2">
            <span className="text-[13px] font-black text-slate-700">
              Total Charge Amount
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[16px] font-black text-slate-800">
                ${totalCharges.toFixed(2)}
              </span>
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
                (Auto)
              </span>
            </div>
          </div>
        </div>

        {/* Add Procedure Button */}
        <button className="flex items-center gap-2 text-[#009bf2] font-black text-[13px] tracking-tight hover:underline transition-all px-2 py-2 rounded-lg hover:bg-blue-50">
          <Plus size={18} className="stroke-[3]" />
          Add Procedure
        </button>
      </div>
    </div>
  );
};

export default ProceduresTab;
