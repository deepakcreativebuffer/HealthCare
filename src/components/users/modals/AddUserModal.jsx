import React, { useState } from "react";
import {
  X,
  User,
  Mail,
  Shield,
  Phone,
  MapPin,
  Calendar,
  Fingerprint,
  Image as ImageIcon,
  FileText,
  ChevronDown,
  UserPlus,
  Upload,
  FilePlus,
  CircleCheck,
} from "lucide-react";

const AddUserModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    staffId: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "Male",
    phone: "",
    email: "",
    address: "",
    role: "Staff",
    licenseNumber: "",
    documentType: "ID Proof",
    photo: null,
    document: null,
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd handle file uploads here
    const submissionData = {
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`,
      status: "Active", // Default for new users
      lastLogin: "Never",
    };
    onAdd(submissionData);
    setFormData({
      staffId: "",
      firstName: "",
      lastName: "",
      dob: "",
      gender: "Male",
      phone: "",
      email: "",
      address: "",
      role: "Staff",
      licenseNumber: "",
      documentType: "ID Proof",
      photo: null,
      document: null,
    });
    onClose();
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [field]: file });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-300 antialiased">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200 flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-[#129FED] shadow-sm border border-blue-100/50">
              <UserPlus size={18} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-[16px] font-black text-slate-800 uppercase tracking-tight leading-none">Add User</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-50 rounded-lg transition-all text-slate-300 hover:text-slate-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">

          {/* Section: Basic Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Fingerprint size={12} className="text-[#129FED]" />
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Basic Identity</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-0.5">Staff ID</label>
                <div className="relative group">
                  <Fingerprint size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors" />
                  <input
                    type="text"
                    required
                    placeholder="EMP-123"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-[12px] font-bold text-slate-700 outline-none focus:bg-white focus:border-[#129FED]/30 transition-all font-mono"
                    value={formData.staffId}
                    onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-0.5">First Name</label>
                <div className="relative group">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors" />
                  <input
                    type="text"
                    required
                    placeholder="John"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-[12px] font-bold text-slate-700 outline-none focus:bg-white focus:border-[#129FED]/30 transition-all"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-0.5">Last Name</label>
                <div className="relative group">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors" />
                  <input
                    type="text"
                    required
                    placeholder="Doe"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-[12px] font-bold text-slate-700 outline-none focus:bg-white focus:border-[#129FED]/30 transition-all"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Personal & Contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={12} className="text-[#129FED]" />
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Personal & Contact</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-0.5">Date of Birth</label>
                <div className="relative group">
                  <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors" />
                  <input
                    type="date"
                    required
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-[12px] font-bold text-slate-700 outline-none focus:bg-white focus:border-[#129FED]/30 transition-all"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-0.5">Gender</label>
                <div className="relative group">
                  <select
                    className="w-full px-3 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-[12px] font-bold text-slate-700 outline-none focus:bg-white focus:border-[#129FED]/30 transition-all appearance-none cursor-pointer"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other / Non-Binary</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-0.5">Phone Number</label>
                <div className="relative group">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors" />
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-[12px] font-bold text-slate-700 outline-none focus:bg-white focus:border-[#129FED]/30 transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-0.5">Email Address</label>
                <div className="relative group">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors" />
                  <input
                    type="email"
                    required
                    placeholder="name@healthcare.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-[12px] font-bold text-slate-700 outline-none focus:bg-white focus:border-[#129FED]/30 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-0.5">Address</label>
                <div className="relative group">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors" />
                  <input
                    type="text"
                    required
                    placeholder="Street, City, Zip"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-[12px] font-bold text-slate-700 outline-none focus:bg-white focus:border-[#129FED]/30 transition-all font-medium"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Professional Credentials */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Shield size={12} className="text-[#129FED]" />
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Professional Credentials</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-0.5">License Number</label>
                <div className="relative group">
                  <FileText size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors" />
                  <input
                    type="text"
                    placeholder="LIC-987654321"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-[12px] font-bold text-slate-700 outline-none focus:bg-white focus:border-[#129FED]/30 transition-all"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-0.5">Role</label>
                <div className="relative group">
                  <Shield size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#129FED] transition-colors" />
                  <select
                    className="w-full pl-9 pr-8 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-[12px] font-bold text-slate-700 outline-none focus:bg-white focus:border-[#129FED]/30 transition-all appearance-none cursor-pointer"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="Staff">Staff / Employee</option>
                    <option value="Admin">Administrator</option>
                    <option value="Billing">Billing Specialist</option>
                    <option value="Provider">Medical Provider</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Verification Assets */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <ImageIcon size={12} className="text-[#129FED]" />
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verification Assets</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Profile Photo Upload */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-0.5">Profile Photo</label>
                <label className="relative flex flex-col items-center justify-center h-32 w-full border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/30 hover:bg-slate-50 hover:border-blue-100 transition-all cursor-pointer group">
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, "photo")} />
                  {formData.photo ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-[#E3F2FD] rounded-full flex items-center justify-center text-[#129FED]">
                        <CircleCheck size={24} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 truncate max-w-[150px]">{formData.photo.name}</span>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-300 shadow-sm border border-slate-50 group-hover:scale-110 transition-transform">
                        <ImageIcon size={18} />
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 mt-2 uppercase">Upload Headshot</span>
                    </>
                  )}
                </label>
              </div>

              {/* Document Upload */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-slate-500 uppercase ml-0.5">Verification Doc</label>
                  <select
                    className="text-[9px] font-black text-[#129FED] uppercase bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 outline-none"
                    value={formData.documentType}
                    onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                  >
                    <option value="ID Proof">ID Proof</option>
                    <option value="Certificate">Certificate</option>
                    <option value="Passport">Passport</option>
                  </select>
                </div>
                <label className="relative flex flex-col items-center justify-center h-32 w-full border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/30 hover:bg-slate-50 hover:border-blue-100 transition-all cursor-pointer group">
                  <input type="file" className="hidden" onChange={(e) => handleFileChange(e, "document")} />
                  {formData.document ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                        <FileText size={24} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 truncate max-w-[150px]">{formData.document.name}</span>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-300 shadow-sm border border-slate-50 group-hover:scale-110 transition-transform">
                        <FilePlus size={18} />
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 mt-2 uppercase">Upload Document</span>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-50 bg-slate-50/30 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-11 px-6 border border-slate-200 rounded-xl text-[11px] font-black text-slate-400 hover:bg-white hover:text-slate-500 transition-all uppercase tracking-widest"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-[1.5] h-11 px-6 bg-[#129FED] text-white rounded-xl text-[11px] font-black shadow-[0_4px_12px_rgba(18,159,237,0.2)] hover:bg-[#0089d8] hover:shadow-[0_6px_20px_rgba(18,159,237,0.3)] transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
          >
            <Upload size={16} strokeWidth={3} /> Submit Records
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
