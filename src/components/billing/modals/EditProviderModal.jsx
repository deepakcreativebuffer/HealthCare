import React, { useState } from "react";
import { X, Save, User, Hash, MapPin, Phone } from "lucide-react";

const EditProviderModal = ({ isOpen, onClose, provider, onSave }) => {
  const [formData, setFormData] = useState({
    name: provider?.name || "",
    npi: provider?.npi || "",
    address: provider?.address || "",
    phone: provider?.phone || "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E3F2FD] flex items-center justify-center text-[#129FED]">
              <User size={18} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Edit Provider</h3>
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
              Provider Name
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#129FED]/20 focus:border-[#129FED] transition-all"
                placeholder="Enter provider name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              NPI Number
            </label>
            <div className="relative">
              <Hash
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="text"
                value={formData.npi}
                onChange={(e) =>
                  setFormData({ ...formData, npi: e.target.value })
                }
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#129FED]/20 focus:border-[#129FED] transition-all"
                placeholder="Enter NPI number"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              Address
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-4 top-3 text-slate-400"
                size={16}
              />
              <textarea
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#129FED]/20 focus:border-[#129FED] transition-all min-h-[80px]"
                placeholder="Enter business address"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#129FED]/20 focus:border-[#129FED] transition-all"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-slate-200 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all font-mono uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-[#129FED] text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-100 hover:bg-[#129FED]/90 transition-all flex items-center justify-center gap-2 font-mono uppercase tracking-widest"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProviderModal;
