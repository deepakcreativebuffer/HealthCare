import React, { useState } from "react";
import {
  X,
  Save,
  User,
  Mail,
  Shield,
  ShieldCheck,
  Lock,
  UserPlus,
  ChevronDown,
} from "lucide-react";

const AddUserModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Staff",
    status: "Active",
    lastLogin: "Never",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      name: "",
      email: "",
      role: "Staff",
      status: "Active",
      lastLogin: "Never",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-300 antialiased">
      <div className="bg-white w-full max-w-sm rounded-lg shadow-xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        <div className="px-5 py-3.5 border-b border-slate-50 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#129FED]">
              <UserPlus size={14} strokeWidth={2.5} />
            </div>
            <h3 className="text-[14px] font-bold text-slate-800 uppercase tracking-tight">Provision New Identity</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-50 rounded-md transition-all text-slate-300 hover:text-slate-500"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">
              Legal Identity
            </label>
            <div className="relative group">
              <User
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors"
              />
              <input
                type="text"
                required
                className="w-full pl-9 pr-3 py-2 bg-slate-50/50 border border-slate-100 rounded-lg text-[12px] font-bold text-slate-700 outline-none focus:bg-white focus:border-[#129FED]/30 transition-all placeholder:text-slate-300"
                placeholder="Ex. Sarah Mitchell"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">
              Corporate Email
            </label>
            <div className="relative group">
              <Mail
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors"
              />
              <input
                type="email"
                required
                className="w-full pl-9 pr-3 py-2 bg-slate-50/50 border border-slate-100 rounded-lg text-[12px] font-bold text-slate-700 outline-none focus:bg-white focus:border-[#129FED]/30 transition-all placeholder:text-slate-300"
                placeholder="s.mitchell@healthcare.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">
              Authorization Tier
            </label>
            <div className="relative group">
              <Shield
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors"
              />
              <select
                className="w-full pl-9 pr-8 py-2 bg-slate-50/50 border border-slate-100 rounded-lg text-[12px] font-bold text-slate-700 outline-none focus:bg-white focus:border-[#129FED]/30 transition-all appearance-none cursor-pointer"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="Staff">Staff / Employee</option>
                <option value="Admin">Administrator</option>
                <option value="Billing">Billing Specialist</option>
                <option value="Provider">Medical Provider</option>
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
            </div>
          </div>

          <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-50 flex gap-3">
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#129FED] shadow-sm shrink-0 border border-blue-50">
              <Lock size={12} />
            </div>
            <p className="text-[10px] font-medium text-blue-600 leading-tight">
              A temporary password will be generated. User must rotate credentials upon initial authentication.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-9 px-4 border border-slate-100 rounded-lg text-[11px] font-bold text-slate-400 hover:bg-slate-50 transition-all uppercase tracking-wider"
            >
              Discard
            </button>
            <button
              type="submit"
              className="flex-1 h-9 px-4 bg-[#129FED] text-white rounded-lg text-[11px] font-bold shadow-sm hover:bg-[#0089d8] transition-all flex items-center justify-center gap-2 uppercase tracking-tight"
            >
              <UserPlus size={14} /> Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
