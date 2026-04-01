import React, { useState } from "react";
import {
  X,
  Check,
  Save,
  User,
  DollarSign,
  FileText,
  Plus,
  ShieldCheck,
  Mail,
  Calendar,
  HelpCircle,
} from "lucide-react";

const NewClaimModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: `CLM-${Math.floor(Math.random() * 90000 + 10000)}`,
    patient: "",
    payer: "Aetna (Commercial)",
    amount: "$0.00",
    status: "Draft",
    dos: new Date().toISOString().split("T")[0],
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E3F2FD] flex items-center justify-center text-[#129FED]">
              <FileText size={22} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none uppercase tracking-tighter italic">
                Create Original Claim
              </h3>
              <p className="text-[11px] font-black text-slate-400 mt-1.5 uppercase tracking-[0.2em]">
                Form 1500 (HCFA) Electronic Submission
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
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-none custom-scrollbar"
        >
          <div className="grid grid-cols-2 gap-10">
            {/* Left Col */}
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Patient Search
                </label>
                <div className="relative group">
                  <User
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors"
                  />
                  <input
                    placeholder="Search patient database..."
                    className="w-full pl-11 pr-4 py-4 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-[#129FED]/30 transition-all font-mono"
                    value={formData.patient}
                    onChange={(e) =>
                      setFormData({ ...formData, patient: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Claim Type / Status
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, status: "Draft" })
                    }
                    className={`py-3.5 rounded-lg text-[11px] font-black uppercase tracking-widest border transition-all ${formData.status === "Draft" ? "bg-slate-800 text-white border-slate-800 shadow-lg" : "bg-white text-slate-400 border-slate-200"}`}
                  >
                    Draft
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, status: "Submitted" })
                    }
                    className={`py-3.5 rounded-lg text-[11px] font-black uppercase tracking-widest border transition-all ${formData.status === "Submitted" ? "bg-[#129FED] text-white border-[#129FED] shadow-lg shadow-blue-100" : "bg-white text-slate-400 border-slate-200"}`}
                  >
                    Ready
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Payer (Primary)
                </label>
                <div className="relative group">
                  <ShieldCheck
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors"
                  />
                  <select
                    className="w-full pl-11 pr-4 py-4 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none appearance-none focus:border-[#129FED]/30 transition-all"
                    value={formData.payer}
                    onChange={(e) =>
                      setFormData({ ...formData, payer: e.target.value })
                    }
                  >
                    <option>Aetna (Commercial)</option>
                    <option>Blue Cross Blue Shield</option>
                    <option>Medicare Part B</option>
                    <option>UnitedHealthcare</option>
                    <option>Cigna</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right Col */}
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Billing Amount ($)
                </label>
                <div className="relative group">
                  <DollarSign
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#27AE60] transition-colors"
                  />
                  <input
                    placeholder="0.00"
                    className="w-full pl-11 pr-4 py-4 bg-[#E9F7EF] border-2 border-transparent rounded-xl text-xl font-black text-[#27AE60] outline-none focus:border-[#27AE60]/20 transition-all font-mono"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Date of Service (DOS)
                </label>
                <div className="relative group">
                  <Calendar
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors"
                  />
                  <input
                    type="date"
                    className="w-full pl-11 pr-4 py-4 bg-white border-2 border-slate-100 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-[#129FED]/30 transition-all"
                    value={formData.dos}
                    onChange={(e) =>
                      setFormData({ ...formData, dos: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="p-5 bg-amber-50 rounded-xl border border-amber-100/50 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-amber-500 shadow-sm shrink-0 mt-1">
                  <HelpCircle size={20} />
                </div>
                <p className="text-[11px] font-bold text-amber-700 leading-relaxed uppercase tracking-tighter">
                  Ensure patients insurance <br /> coverage is verified prior to{" "}
                  <br /> submitting original claims.
                </p>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-4">
          <button
            onClick={onClose}
            className="px-8 py-3.5 text-slate-400 font-black hover:bg-white hover:text-slate-600 rounded-xl transition-all font-mono tracking-widest text-[11px] uppercase border-2 border-transparent hover:border-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-10 py-5 bg-[#129FED] text-white font-black rounded-xl shadow-xl shadow-blue-100 hover:bg-[#129FED]/90 transition-all flex items-center justify-center gap-3 font-mono tracking-[0.2em] text-[12px] uppercase group"
          >
            <Plus
              size={18}
              className="group-hover:rotate-90 transition-transform"
            />
            Initialize Claim
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewClaimModal;
