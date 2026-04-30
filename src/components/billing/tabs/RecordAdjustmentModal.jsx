import React, { useState } from "react";
import { X, DollarSign, Tag, User, Save } from "lucide-react";

const RecordAdjustmentModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    claimId: "CLM-00125",
    amount: "",
    reason: "Small Balance Write-off",
    user: "Admin Sarah"
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount) {
      alert("Please enter an amount.");
      return;
    }
    onSave({
      ...formData,
      id: `WO-${Math.floor(Math.random() * 9000) + 1000}`,
      amount: parseFloat(formData.amount),
      date: new Date().toLocaleDateString()
    });
    setFormData({ ...formData, amount: "" });
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <header className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
              <Tag size={18} />
            </div>
            <h2 className="text-[15px] font-bold text-slate-800">Record Adjustment</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200">
            <X size={18} className="text-slate-400" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Claim Reference</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              value={formData.claimId}
              onChange={(e) => setFormData({...formData, claimId: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Write-off Amount</label>
              <div className="relative">
                <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="0.00"
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-bold text-rose-600 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Authorized By</label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 outline-none"
                  value={formData.user}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Adjustment Reason</label>
            <select 
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
            >
              <option>Small Balance Write-off</option>
              <option>Timely Filing Limit</option>
              <option>Payer Disallowed</option>
              <option>Professional Courtesy</option>
              <option>Hardship Adjustment</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full mt-2 bg-slate-900 text-white py-3 rounded-xl text-[13px] font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Save size={16} />
            Post Adjustment
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecordAdjustmentModal;
