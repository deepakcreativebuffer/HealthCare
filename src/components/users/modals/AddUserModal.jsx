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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E3F2FD] flex items-center justify-center text-[#129FED]">
              <UserPlus size={18} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Add New User</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200/50 rounded-lg transition-all text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              Full Name
            </label>
            <div className="relative group">
              <User
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors"
              />
              <input
                type="text"
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none focus:border-[#129FED] transition-all"
                placeholder="Ex : Sarah Mitchell"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors"
              />
              <input
                type="email"
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none focus:border-[#129FED] transition-all"
                placeholder="s.mitchell@care.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              System Role
            </label>
            <div className="relative group">
              <Shield
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors"
              />
              <select
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none focus:border-[#129FED] transition-all appearance-none"
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
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#129FED] shadow-sm shrink-0">
              <Lock size={16} />
            </div>
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-blue-800 uppercase">
                Initial Password
              </p>
              <p className="text-[12px] font-medium text-blue-600">
                User will be prompted to set a permanent password upon first
                login.
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3.5 border border-slate-200 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3.5 bg-[#129FED] text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-100 hover:bg-[#129FED]/90 transition-all flex items-center justify-center gap-2 uppercase tracking-widest font-mono"
            >
              <UserPlus size={18} />
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
