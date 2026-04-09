import React from "react";
import {
  X,
  User,
  Mail,
  Shield,
  Phone,
  MapPin,
  Calendar,
  Fingerprint,
  Clock,
  Info,
  BadgeCheck,
} from "lucide-react";

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-300 antialiased">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="px-6 py-6 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 shadow-sm overflow-hidden">
              {user.photo ? (
                <img src={typeof user.photo === 'string' ? user.photo : URL.createObjectURL(user.photo)} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl font-black">{user.name.charAt(0)}</span>
              )}
            </div>
            <div>
              <h3 className="text-[20px] font-black text-slate-800 uppercase tracking-tight leading-none">{user.name}</h3>
              <div className="flex items-center gap-2 mt-2.5">
                <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg border uppercase tracking-widest shadow-xs ${user.status === "Active" ? "bg-green-500 text-white border-green-500" : "bg-slate-300 text-white border-slate-300"}`}>
                  {user.status}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 ml-1">
                  <Fingerprint size={12} className="text-[#129FED]" />
                  <span className="font-mono">{user.staffId || "EMP-001"}</span>
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-slate-50 rounded-xl transition-all text-slate-300 hover:text-slate-500">
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-8 no-scrollbar space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Identity & Personal */}
            <div className="space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-4 bg-[#129FED] rounded-full" />
                <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Personnel Identity</h4>
              </div>
              <div className="space-y-5 pl-1">
                <DetailItem icon={User} label="Name" value={user.name} />
                <DetailItem icon={Calendar} label="Date of Birth" value={user.dob || "May 12, 1988"} />
                <DetailItem icon={BadgeCheck} label="Gender" value={user.gender || "Male"} />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-2.5">
              </div>
              <div className="space-y-5 pl-1">
                <DetailItem icon={Phone} label="Phone Number" value={user.phone} />
                <DetailItem icon={Mail} label="Email" value={user.email} />
                <DetailItem icon={MapPin} label="Address" value={user.address} />
              </div>
            </div>
          </div>

          {/* Credentials Section */}
          <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-6">
            <div className="flex items-center gap-2.5 mb-6">
              <Shield size={14} className="text-[#129FED]" />
              <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest tracking-tighter">Verified System Credentials</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <DetailItem icon={Shield} label="Role" value={user.role} />
              <DetailItem icon={Fingerprint} label="Verification Doc" value={user.documentType || "ID Proof"} />
              <DetailItem icon={Clock} label="Last Login" value={user.lastLogin || "N/A"} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-50 bg-white grow-0">
          <button onClick={onClose} className="w-full h-12 bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2">
            Finish Viewing
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-4 group">
    <div className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 shrink-0 shadow-sm group-hover:text-[#129FED] group-hover:border-[#129FED]/20 transition-all">
      <Icon size={18} />
    </div>
    <div className="flex flex-col">
      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{label}</span>
      <span className="text-[13px] font-black text-slate-700 tracking-tight leading-none uppercase">{value || "N/A"}</span>
    </div>
  </div>
);

export default UserDetailsModal;
