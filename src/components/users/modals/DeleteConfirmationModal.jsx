import React from "react";
import {
  X,
  Trash2,
  AlertTriangle,
  ShieldAlert,
  AlertCircle,
} from "lucide-react";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  count = 1,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-500">
      <div className="bg-white w-full max-w-sm rounded-[40px] shadow-[0_32px_64px_-12px_rgba(239,68,68,0.25)] overflow-hidden border border-red-100 animate-in zoom-in-95 duration-300">
        {/* Warning Banner */}
        <div className="h-2 bg-gradient-to-r from-red-400 via-red-500 to-red-400" />

        <div className="p-10 text-center">
          <div className="relative inline-block mb-8">
            <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center text-red-500 shadow-inner border-2 border-red-100 animate-pulse transition-all">
              <Trash2 size={40} strokeWidth={2.5} />
            </div>
            <div className="absolute -top-1 -right-1 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border border-red-100 text-red-600">
              <AlertCircle size={20} fill="white" />
            </div>
          </div>

          <h3 className="text-2xl font-black text-gray-800 tracking-tighter mb-3 uppercase italic">
            {title || "Confirm Deletion"}
          </h3>

          <p className="text-[14px] font-bold text-gray-400 leading-relaxed uppercase tracking-widest px-4">
            {message ||
              `Are you sure you want to permanently delete this user? This action cannot be reversed.`}
          </p>

          {count > 1 && (
            <div className="mt-6 flex items-center justify-center">
              <div className="px-6 py-2.5 bg-red-600 text-white rounded-[20px] inline-flex items-center gap-3 shadow-xl shadow-red-200 border-2 border-white">
                <ShieldAlert size={18} />
                <span className="text-[12px] font-black uppercase tracking-[0.2em]">
                  {count} Accounts Selected
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="px-10 py-8 bg-gray-50/50 flex flex-col gap-3">
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full py-5 bg-red-600 text-white font-black rounded-3xl shadow-2xl shadow-red-200 hover:bg-red-700 hover:-translate-y-0.5 transition-all uppercase tracking-[0.3em] text-[12px] font-mono flex items-center justify-center gap-3 active:scale-95"
          >
            Confirm Termination
          </button>

          <button
            onClick={onClose}
            className="w-full py-4 text-gray-400 font-bold hover:text-gray-800 rounded-xl transition-all uppercase tracking-widest text-[11px] font-mono"
          >
            Cancel and Go Back
          </button>
        </div>

        <div className="p-4 text-center bg-red-50 border-t border-red-100 italic">
          <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">
            Warning: Data associated with these users will be archived.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
