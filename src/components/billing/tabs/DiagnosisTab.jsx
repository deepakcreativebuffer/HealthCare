import React from "react";
import { Stethoscope, Plus, Activity, Search, Hash, Info } from "lucide-react";
import { billingData } from "../../../data/billingData";

const DiagnosisTab = () => {
  const { icd10Codes } = billingData;
  const [diagnoses, setDiagnoses] = React.useState(billingData.patientSnapshot.diagnosisSection);
  const [showSearch, setShowSearch] = React.useState(null); // idx of row showing search
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleCodeChange = (idx, code, description) => {
    const updated = [...diagnoses];
    updated[idx] = { ...updated[idx], code, description };
    setDiagnoses(updated);
    setShowSearch(null);
  };

  const addNewDiagnosis = () => {
    setDiagnoses([
      ...diagnoses,
      { id: diagnoses.length + 1, code: '', description: '', ptr: diagnoses.length + 1 }
    ]);
  };

  const filteredCodes = icd10Codes.filter(c => 
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500 antialiased overflow-y-auto max-h-[calc(100vh-250px)]">
      <div className="space-y-4">
        {/* Table Container */}
        <div className="bg-white rounded-lg border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-400 border-b border-slate-100 w-12 text-center">
                  <Hash size={10} className="mx-auto" />
                </th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-400 border-b border-slate-100 w-40">
                  ICD-10 Code
                </th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-400 border-b border-slate-100">
                  Clinical Description
                </th>
                <th className="px-4 py-2.5 text-[12px] font-medium text-slate-400 border-b border-slate-100 text-center w-20">
                  Pointer
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {diagnoses.map((item, idx) => (
                <tr
                  key={idx}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-4 py-2 text-center">
                    <span className="text-[12px] font-medium text-slate-600 group-hover:text-slate-500 transition-colors">
                      {item.id}
                    </span>
                  </td>
                  <td className="px-4 py-2 relative">
                    <div 
                      onClick={() => {
                        setShowSearch(idx);
                        setSearchQuery(item.code);
                      }}
                      className={`inline-flex px-2.5 py-1 rounded-md border border-slate-100 bg-white group-hover:border-[#129FED]/30 group-hover:shadow-sm transition-all font-bold text-[#129FED] text-[12px] min-w-[100px] justify-center cursor-pointer ${!item.code ? 'border-amber-200 bg-amber-50/30' : ''}`}
                    >
                      {item.code || "Select Code"}
                    </div>
                    
                    {showSearch === idx && (
                      <div className="absolute top-full left-4 w-80 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 mt-1 p-2 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-2 px-2 py-1.5 border-b border-slate-50 mb-1">
                          <Search size={12} className="text-slate-400" />
                          <input 
                            autoFocus
                            type="text" 
                            placeholder="Search ICD-10..."
                            className="text-[12px] outline-none w-full font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <div className="max-h-48 overflow-y-auto custom-scrollbar">
                          {filteredCodes.length > 0 ? (
                            filteredCodes.map(c => (
                              <button
                                key={c.code}
                                onClick={() => handleCodeChange(idx, c.code, c.description)}
                                className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                              >
                                <span className="text-[12px] font-bold text-[#129FED]">{c.code}</span>
                                <p className="text-[10px] text-slate-500 font-medium truncate">{c.description}</p>
                              </button>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-[11px] text-slate-400 italic">No matches found</div>
                          )}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <span className={`text-[12px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors ${!item.description ? 'text-slate-300' : ''}`}>
                      {item.description || "Description will auto-populate"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span className="text-[12px] font-medium text-slate-600">
                      {item.ptr}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-1">
          <button 
            onClick={addNewDiagnosis}
            className="flex items-center gap-2 text-[#129FED] font-bold text-[12px] hover:underline transition-all px-3 py-1.5 rounded-lg hover:bg-blue-50"
          >
            <Plus size={14} className="stroke-[2.5]" />
            Add Diagnosis
          </button>
          <div className="flex items-center gap-2 text-slate-400 text-[12px] font-Medium">
            <Info size={12} />
            ICD-10-CM Validation Active
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisTab;
