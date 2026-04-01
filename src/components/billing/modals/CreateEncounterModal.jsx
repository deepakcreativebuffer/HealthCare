import React, { useState } from "react";
import {
  X,
  Check,
  Save,
  User,
  MapPin,
  ClipboardList,
  Plus,
  Trash2,
  Hash,
  Calendar,
  Layers,
  Activity,
} from "lucide-react";

const CreateEncounterModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    patient: "John Smith",
    provider: "Dr. Robert Wilson",
    facility: "Central Medical Center",
    dos: "2025-03-25",
    diagnoses: [
      { code: "I10", description: "Essential hypertension" },
      { code: "E11.9", description: "Type 2 diabetes mellitus" },
    ],
    procedures: [
      { code: "99213", qty: 1, amount: "$150.00" },
      { code: "36415", qty: 1, amount: "$25.00" },
    ],
  });

  const [newDiag, setNewDiag] = useState({ code: "", description: "" });
  const [newProc, setNewProc] = useState({ code: "", qty: 1, amount: "$0.00" });

  if (!isOpen) return null;

  const handleAddDiag = () => {
    if (!newDiag.code || !newDiag.description) return;
    setFormData({
      ...formData,
      diagnoses: [...formData.diagnoses, newDiag],
    });
    setNewDiag({ code: "", description: "" });
  };

  const handleDeleteDiag = (idx) => {
    setFormData({
      ...formData,
      diagnoses: formData.diagnoses.filter((_, i) => i !== idx),
    });
  };

  const handleAddProc = () => {
    if (!newProc.code || !newProc.amount) return;
    setFormData({
      ...formData,
      procedures: [...formData.procedures, newProc],
    });
    setNewProc({ code: "", qty: 1, amount: "$0.00" });
  };

  const handleDeleteProc = (idx) => {
    setFormData({
      ...formData,
      procedures: formData.procedures.filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300 overflow-hidden">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E3F2FD] flex items-center justify-center text-[#129FED]">
              <ClipboardList size={22} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none">
                Create Encounter
              </h3>
              <p className="text-[11px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest">
                General Visit / Encounter Form
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-slate-200/50 rounded-xl transition-all text-slate-400 hover:text-slate-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-slate-200 custom-scrollbar">
          <form className="space-y-10">
            {/* Basic Info Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
                <User size={16} className="text-[#129FED]" />
                <h4 className="text-[12px] font-black text-slate-800 uppercase tracking-widest">
                  Encounter Details
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                    Patient Full Name
                  </label>
                  <input
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-[#129FED] transition-all"
                    value={formData.patient}
                    onChange={(e) =>
                      setFormData({ ...formData, patient: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                    Date of Service (DOS)
                  </label>
                  <input
                    type="date"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-[#129FED] transition-all"
                    value={formData.dos}
                    onChange={(e) =>
                      setFormData({ ...formData, dos: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                    Assigned Provider
                  </label>
                  <input
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-[#129FED] transition-all"
                    value={formData.provider}
                    onChange={(e) =>
                      setFormData({ ...formData, provider: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                    Service Facility
                  </label>
                  <input
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-[#129FED] transition-all"
                    value={formData.facility}
                    onChange={(e) =>
                      setFormData({ ...formData, facility: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Diagnoses Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
                <Activity size={16} className="text-[#129FED]" />
                <h4 className="text-[12px] font-black text-slate-800 uppercase tracking-widest">
                  Diagnoses (ICD-10-CM)
                </h4>
              </div>
              <div className="space-y-3">
                {formData.diagnoses.map((diag, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-[#129FED] bg-[#E3F2FD] px-3 py-1.5 rounded-lg border border-[#129FED]/10 uppercase tracking-widest">
                        {diag.code}
                      </span>
                      <span className="text-[13px] font-bold text-slate-700">
                        {diag.description}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteDiag(idx)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}

                <div className="grid grid-cols-5 gap-3 pt-2">
                  <div className="col-span-1">
                    <input
                      placeholder="ICD Code"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none uppercase"
                      value={newDiag.code}
                      onChange={(e) =>
                        setNewDiag({ ...newDiag, code: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      placeholder="Diagnosis Description"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none"
                      value={newDiag.description}
                      onChange={(e) =>
                        setNewDiag({ ...newDiag, description: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-1">
                    <button
                      type="button"
                      onClick={handleAddDiag}
                      className="w-full h-full bg-[#E3F2FD]/50 border border-[#129FED]/20 text-[#129FED] rounded-lg flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-[#129FED] hover:text-white transition-all shadow-sm"
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Procedures Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
                <Layers size={16} className="text-[#129FED]" />
                <h4 className="text-[12px] font-black text-slate-800 uppercase tracking-widest">
                  Procedures (CPT/HCPCS)
                </h4>
              </div>
              <div className="space-y-3">
                {formData.procedures.map((proc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all group"
                  >
                    <div className="flex items-center gap-8">
                      <span className="text-xs font-black text-slate-800 uppercase tracking-widest underline decoration-[#129FED] decoration-2 underline-offset-4">
                        {proc.code}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        Qty:{" "}
                        <span className="text-slate-800 font-black">
                          {proc.qty}
                        </span>
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        Charge:{" "}
                        <span className="text-slate-800 font-black">
                          {proc.amount}
                        </span>
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteProc(idx)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}

                <div className="grid grid-cols-12 gap-3 pt-2">
                  <div className="col-span-3">
                    <input
                      placeholder="CPT Code"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none uppercase"
                      value={newProc.code}
                      onChange={(e) =>
                        setNewProc({ ...newProc, code: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      placeholder="Qty"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none"
                      value={newProc.qty}
                      onChange={(e) =>
                        setNewProc({
                          ...newProc,
                          qty: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="col-span-4">
                    <input
                      placeholder="Charge Amount"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 outline-none"
                      value={newProc.amount}
                      onChange={(e) =>
                        setNewProc({ ...newProc, amount: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-3">
                    <button
                      type="button"
                      onClick={handleAddProc}
                      className="w-full h-full bg-[#E3F2FD]/50 border border-[#129FED]/20 text-[#129FED] rounded-lg flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-[#129FED] hover:text-white transition-all shadow-sm"
                    >
                      <Plus size={14} /> Add Procedure
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-loose">
            Ensure all diagnosis and procedure codes <br /> are verified for
            billing compliance.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="px-8 py-3.5 text-slate-500 font-bold hover:bg-slate-100 rounded-xl transition-all font-mono tracking-[0.2em] text-[11px] uppercase border border-slate-200"
            >
              Discard
            </button>
            <button
              onClick={handleSubmit}
              className="px-10 py-4 bg-[#129FED] text-white font-black rounded-xl shadow-xl shadow-blue-100 hover:bg-[#129FED]/90 transition-all flex items-center justify-center gap-3 font-mono tracking-[0.2em] text-[11px] uppercase"
            >
              <Save size={18} />
              Confirm Encounter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEncounterModal;
