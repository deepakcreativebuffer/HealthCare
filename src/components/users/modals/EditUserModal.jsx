import React, { useState } from "react";
import {
  X,
  Save,
  User,
  Mail,
  Shield,
  UserCheck,
  Trash2,
  AlertCircle,
} from "lucide-react";

const EditUserModal = ({ isOpen, onClose, userData, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    role: userData?.role || "Staff",
    status: userData?.status || "Active",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E3F2FD] flex items-center justify-center text-[#129FED]">
              <UserCheck size={18} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              Edit System User
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200/50 rounded-lg transition-all text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Full Name
              </label>
              <div className="relative group">
                <User
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                />
                <input
                  type="text"
                  required
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none focus:border-[#129FED] transition-all"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Role / Permissions
              </label>
              <div className="relative group">
                <Shield
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                />
                <select
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none focus:border-[#129FED] transition-all appearance-none"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value="Staff">Staff</option>
                  <option value="Admin">Administrator</option>
                  <option value="Billing">Billing</option>
                  <option value="Provider">Provider</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                />
                <input
                  type="email"
                  required
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none focus:border-[#129FED] transition-all"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                Account Status
              </label>
              <div className="flex items-center gap-2 pt-1 font-mono tracking-widest text-[11px] uppercase">
                {["Active", "Suspended", "Pending"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFormData({ ...formData, status })}
                    className={`flex-1 py-2 rounded-lg font-bold border transition-all ${
                      formData.status === status
                        ? "bg-[#129FED] text-white border-[#129FED] shadow-lg shadow-blue-100 scale-105"
                        : "bg-white text-slate-400 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-red-100 transition-all"
            onClick={() => onDelete()}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-red-500 shadow-sm shrink-0">
                <Trash2 size={18} />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-red-800 uppercase tracking-widest leading-none">
                  Restrict User Access
                </p>
                <p className="text-[11px] font-medium text-red-600/80">
                  Terminating or Deleting accounts cannot be undone.
                </p>
              </div>
            </div>
            <AlertCircle
              size={18}
              className="text-red-400 group-hover:scale-110 transition-transform"
            />
          </div>

          <div className="pt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3.5 border border-slate-200 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all font-mono uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3.5 bg-[#129FED] text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-100 hover:bg-[#129FED]/90 transition-all flex items-center justify-center gap-2 font-mono uppercase tracking-widest"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
