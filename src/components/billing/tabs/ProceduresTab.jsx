import React from "react";
import { Plus, Trash2, Info, Receipt, Hash, DollarSign } from "lucide-react";
import { billingData } from "../../../data/billingData";

const TableCell = ({ value, classes = "" }) => (
  <div
    className={`px-2 py-1 rounded border border-slate-100 bg-white min-h-[28px] flex items-center justify-center text-[12px] font-bold text-slate-600 transition-all group-hover:border-[#129FED]/30 shadow-[0_1px_4px_rgba(0,0,0,0.01)] ${classes}`}
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
    <div className="p-6 space-y-6 animate-in fade-in duration-500 antialiased">
      <div className="space-y-4">
        {/* Table Structure */}
        <div className="bg-white rounded-lg border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden p-4 space-y-3">
          {/* Headers */}
          <div className="grid grid-cols-[1fr_1fr_1.5fr_1fr_1fr_1fr_1fr_1fr_1fr_32px] gap-2 px-1">
            {[
              "From",
              "To",
              "CPT / Code",
              "M1",
              "M2",
              "Qty",
              "Charge",
              "Ptr",
              "POS",
            ].map((h) => (
              <span
                key={h}
                className="text-[10px] font-bold text-slate-400 uppercase text-center"
              >
                {h}
              </span>
            ))}
            <span className="w-8" />
          </div>

          {/* Rows */}
          <div className="space-y-1.5">
            {proceduresSection.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[1fr_1fr_1.5fr_1fr_1fr_1fr_1fr_1fr_1fr_32px] gap-2 group items-center"
              >
                <TableCell value={item.dosFrom} />
                <TableCell value={item.dosTo} />
                <TableCell value={item.cpt} classes="text-[#129FED]" />
                <TableCell value={item.mod1} />
                <TableCell value={item.mod2} />
                <TableCell value={item.units} />
                <TableCell value={`$${item.charge.toFixed(2)}`} classes="text-slate-900" />
                <TableCell value={item.dxPtr} />
                <TableCell value={item.pos} />
                <button className="text-slate-400 hover:text-red-400 transition-colors flex items-center justify-center">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Footer: Totals */}
          <div className="pt-3 mt-1 border-t border-slate-100 flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                <Receipt size={12} className="text-slate-600" />
              </div>
              <span className="text-[12px] font-bold text-slate-600 uppercase tracking-tight">
                Claim Total
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-baseline gap-1">
                <span className="text-[12px] font-bold text-slate-400">$</span>
                <span className="text-[16px] font-black text-slate-900 italic">
                  {totalCharges.toFixed(2)}
                </span>
              </div>
              <div className="px-2 py-0.5 rounded bg-blue-50 text-[#129FED] text-[10px] font-bold uppercase border border-blue-50/50">
                Validated
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between px-1">
          <button className="flex items-center gap-1.5 text-[#129FED] font-bold text-[12px] uppercase hover:underline transition-all px-3 py-1.5 rounded-lg hover:bg-blue-50">
            <Plus size={14} className="stroke-[2.5]" />
            New Charge
          </button>

          <div className="flex items-center gap-2 text-slate-400 text-[12px] font-regular">
            <Info size={12} />
            HCPCS / CPT Level II Support Active
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProceduresTab;
