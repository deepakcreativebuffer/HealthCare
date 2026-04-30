import React from "react";
import { Plus, Trash2, Info, Receipt, Hash, DollarSign, Search } from "lucide-react";
import { billingData } from "../../../data/billingData";

const TableCell = ({ value, classes = "" }) => (
  <div
    className={`px-2 py-1 rounded border border-slate-100 bg-white min-h-[28px] flex items-center justify-center text-[12px] font-bold text-slate-600 transition-all group-hover:border-[#129FED]/30 shadow-[0_1px_4px_rgba(0,0,0,0.01)] ${classes}`}
  >
    {value || ""}
  </div>
);

const ProceduresTab = () => {
  const { proceduresSection, feeScheduleTable, cptCodes } = billingData;
  const [procedures, setProcedures] = React.useState(billingData.patientSnapshot.proceduresSection);
  const [showCPTSearch, setShowCPTSearch] = React.useState(null); // idx of row showing search
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleCPTChange = (idx, code) => {
    const updatedProcedures = [...procedures];
    updatedProcedures[idx].cpt = code;
    
    // Auto-lookup price from fee schedule
    const feeEntry = feeScheduleTable.find(f => f.cpt === code);
    if (feeEntry) {
      updatedProcedures[idx].charge = feeEntry.price;
    }
    
    setProcedures(updatedProcedures);
    setShowCPTSearch(null);
  };

  const addNewCharge = () => {
    setProcedures([
      ...procedures,
      { dosFrom: '03/01', dosTo: '03/01', cpt: '', mod1: '', mod2: '', units: 1, charge: 0, dxPtr: 1, pos: 11 }
    ]);
  };

  const removeCharge = (idx) => {
    setProcedures(procedures.filter((_, i) => i !== idx));
  };

  const totalCharges = procedures.reduce(
    (acc, curr) => acc + curr.charge,
    0,
  );

  const filteredCPTCodes = cptCodes.filter(c => 
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500 antialiased overflow-y-auto max-h-[calc(100vh-250px)]">
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
            {procedures.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[1fr_1fr_1.5fr_1fr_1fr_1fr_1fr_1fr_1fr_32px] gap-2 group items-center relative"
              >
                <TableCell value={item.dosFrom} />
                <TableCell value={item.dosTo} />
                <div className="relative">
                  <div 
                    onClick={() => {
                      setShowCPTSearch(idx);
                      setSearchQuery(item.cpt);
                    }}
                    className={`px-2 py-1 rounded border border-slate-100 bg-white min-h-[28px] flex items-center justify-center text-[12px] font-bold text-[#129FED] cursor-pointer hover:border-[#129FED]/30 transition-all ${!item.cpt ? 'border-amber-200 bg-amber-50/30' : ''}`}
                  >
                    {item.cpt || "Select CPT"}
                  </div>
                  
                  {showCPTSearch === idx && (
                    <div className="absolute top-full left-0 w-64 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 mt-1 p-2 animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex items-center gap-2 px-2 py-1.5 border-b border-slate-50 mb-1">
                        <Search size={12} className="text-slate-400" />
                        <input 
                          autoFocus
                          type="text" 
                          placeholder="Search CPT..."
                          className="text-[12px] outline-none w-full font-medium"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="max-h-48 overflow-y-auto custom-scrollbar">
                        {filteredCPTCodes.length > 0 ? (
                          filteredCPTCodes.map(c => (
                            <button
                              key={c.code}
                              onClick={() => handleCPTChange(idx, c.code)}
                              className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors group/item"
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-[12px] font-bold text-[#129FED]">{c.code}</span>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50">
                                  ${feeScheduleTable.find(f => f.cpt === c.code)?.price.toFixed(2)}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-500 font-medium truncate">{c.description}</p>
                            </button>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-[11px] text-slate-400 italic">No matches found</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <TableCell value={item.mod1} />
                <TableCell value={item.mod2} />
                <TableCell value={item.units} />
                <TableCell value={`$${item.charge.toFixed(2)}`} classes={item.charge > 0 ? "text-slate-900" : "text-amber-500"} />
                <TableCell value={item.dxPtr} />
                <TableCell value={item.pos} />
                <button 
                  onClick={() => removeCharge(idx)}
                  className="text-slate-400 hover:text-red-400 transition-colors flex items-center justify-center"
                >
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
              <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${totalCharges > 0 ? 'bg-blue-50 text-[#129FED] border-blue-50/50' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                {totalCharges > 0 ? 'Validated' : 'Pending'}
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between px-1">
          <button 
            onClick={addNewCharge}
            className="flex items-center gap-1.5 text-[#129FED] font-bold text-[12px] uppercase hover:underline transition-all px-3 py-1.5 rounded-lg hover:bg-blue-50"
          >
            <Plus size={14} className="stroke-[2.5]" />
            New Charge
          </button>

          <div className="flex items-center gap-2 text-slate-400 text-[12px] font-regular">
            <Info size={12} />
            HCPCS / CPT Level II Support Active (Fee Schedule Linked)
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProceduresTab;
