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
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E3F2FD] flex items-center justify-center text-[#129FED]">
              <FileText size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-700 tracking-tight leading-none  tracking-tighter">
                Create Original Claim
              </h3>
              <p className="text-[12px] font-noraml text-slate-400 mt-1 leading-none">
                Form 1500 (HCFA) Electronic Submission
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200/50 rounded-lg transition-all text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-none custom-scrollbar"
        >
          <div className="grid grid-cols-2 gap-6">
            {/* Left Col */}
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-[12px] font-medium text-slate-400 ml-1">
                  Patient Search
                </label>
                <div className="relative group">
                  <User
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors"
                  />
                  <input
                    placeholder="Search patient database..."
                    className="w-full pl-11 pr-4 py-2 bg-white border-2 border-slate-100 rounded-lg text-sm font-regular text-slate-400 outline-none focus:border-[#129FED]/30 transition-all"
                    value={formData.patient}
                    onChange={(e) =>
                      setFormData({ ...formData, patient: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-medium text-slate-400 ml-1">
                  Claim Type / Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, status: "Draft" })
                    }
                    className={`py-2 rounded-lg text-[12px] font-medium border transition-all ${formData.status === "Draft" ? "bg-slate-800 text-white border-slate-800 shadow-lg" : "bg-white text-slate-400 border-slate-200"}`}
                  >
                    Draft
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, status: "Submitted" })
                    }
                    className={`py-2 rounded-lg text-[12px] font-medium border transition-all ${formData.status === "Submitted" ? "bg-[#129FED] text-white border-[#129FED] shadow-lg shadow-blue-100" : "bg-white text-slate-400 border-slate-200"}`}
                  >
                    Ready
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[12px] font-medium text-slate-400 ml-1">
                  Payer (Primary)
                </label>
                <div className="relative group">
                  <ShieldCheck
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors"
                  />
                  <select
                    className="w-full pl-11 pr-4 py-2 bg-white border-2 border-slate-100 rounded-lg text-sm font-medium text-slate-800 outline-none appearance-none focus:border-[#129FED]/30 transition-all"
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
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-[12px] font-medium text-slate-400 ml-1">
                  Billing Amount ($)
                </label>
                <div className="relative group">
                  <DollarSign
                    size={14}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#27AE60] transition-colors"
                  />
                  <input
                    placeholder="0.00"
                    className="w-full pl-11 pr-4 py-2 bg-[#E9F7EF] border-2 border-transparent rounded-lg text-lg font-medium text-[#27AE60] outline-none focus:border-[#27AE60]/20 transition-all"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-medium text-slate-400 ml-1">
                  Date of Service (DOS)
                </label>
                <div className="relative group">
                  <Calendar
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors"
                  />
                  <input
                    type="date"
                    className="w-full pl-11 pr-4 py-2 bg-white border-2 border-slate-100 rounded-lg text-sm font-bold text-slate-800 outline-none focus:border-[#129FED]/30 transition-all"
                    value={formData.dos}
                    onChange={(e) =>
                      setFormData({ ...formData, dos: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100/50 flex gap-2">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-amber-500 shadow-sm shrink-0 mt-1">
                  <HelpCircle size={16} />
                </div>
                <p className="text-[12px] font-regular text-amber-400 leading-relaxed tracking-tighter">
                  Ensure patients insurance <br /> coverage is verified prior to{" "}
                  <br /> submitting original claims.
                </p>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 text-slate-400 font-medium hover:bg-white hover:text-slate-600 rounded-lg transition-all text-[12px] border-2 border-transparent hover:border-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-8 py-3 bg-[#129FED] text-white font-medium rounded-lg shadow-xl shadow-blue-100 hover:bg-[#129FED]/90 transition-all flex items-center justify-center gap-2 text-[12px] group"
          >
            <Plus
              size={16}
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
