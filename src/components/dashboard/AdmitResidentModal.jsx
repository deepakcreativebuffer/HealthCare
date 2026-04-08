import React, { useEffect, useState } from "react";
import { X, User, Calendar, MapPin, Loader2, Edit } from "lucide-react";
import { api } from "../../data/api";

const AdmitResidentModal = ({ isOpen, onClose, onResidentAdmitted, editData = null }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mrn: "",
    gender: "Male",
    dob: "",
    status: "Active",
    email: "",
    phone: "",
    address: "",
    admissionDate: new Date().toISOString().split("T")[0],
    room: "",
    insurance: "",
    allergy: "",
    provider: "",
    condition: "",
    nutrition: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    photo: "",
    levelOfCare: "Skilled Care",
    clinicalAccess: ""
  });

  useEffect(() => {
    if (editData && isOpen) {
      setFormData({
        name: editData.name || "",
        mrn: editData.mrn || editData.id || "",
        gender: editData.gender || "Male",
        dob: editData.dob || "",
        status: editData.status || "Active",
        email: editData.email || editData.contact || "",
        phone: editData.phone || "",
        address: editData.address || "",
        admissionDate: editData.admissionDate || new Date().toISOString().split("T")[0],
        room: editData.room || editData.roomNumber || "",
        insurance: editData.insurance?.provider || editData.insurance || "",
        allergy: Array.isArray(editData.allergies) ? editData.allergies.map(a => typeof a === 'object' ? a.name : a).join(', ') : (editData.allergy || editData.allergies || ""),
        provider: editData.provider || "",
        condition: Array.isArray(editData.medicalConditions) ? editData.medicalConditions.map(c => typeof c === 'object' ? c.name : c).join(', ') : (editData.condition || editData.medicalConditions || ""),
        nutrition: editData.nutrition || "",
        emergencyContactName: editData.emergencyContact?.name || editData.emergencyContactName || "",
        emergencyContactPhone: editData.emergencyContact?.phone || editData.emergencyContactPhone || "",
        photo: editData.photo || editData.image || "",
        levelOfCare: editData.levelOfCare || "Skilled Care",
        clinicalAccess: editData.clinicalAccess || ""
      });
    } else if (!editData && isOpen) {
      setFormData({
        name: "",
        mrn: `MRN-${Math.floor(Math.random() * 90000) + 10000}`,
        gender: "Male",
        dob: "",
        status: "Active",
        email: "",
        phone: "",
        address: "",
        admissionDate: new Date().toISOString().split("T")[0],
        room: "",
        insurance: "",
        allergy: "",
        provider: "",
        condition: "",
        nutrition: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        photo: "",
        levelOfCare: "Skilled Care",
        clinicalAccess: ""
      });
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (editData) {
        response = await api.updateResident(editData.id, formData);
        if (response.success) {
          await api.addActivity(`Resident profile updated: ${formData.name}`, 'Resident', 'Admin');
        }
      } else {
        response = await api.addResident(formData);
        if (response.success) {
          await api.addActivity(`New resident admitted: ${formData.name}`, 'Resident', 'Admin');
        }
      }

      if (response.success) {
        onResidentAdmitted(response.data);
        onClose();
        alert(editData ? "Profile updated successfully!" : "Resident admitted successfully!");
      }
    } catch (error) {
      alert(editData ? "Failed to update profile" : "Failed to admit resident");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="bg-white rounded-[12px] shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg ${editData ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'} flex items-center justify-center`}>
              {editData ? <Edit size={16} /> : <User size={16} />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                {editData ? 'Update Resident Profile' : 'Admit New Resident'}
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase  mt-0.5">
                {editData ? `Editing Profile: ${editData.id}` : 'General Information & Clinical Intake'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8 overflow-y-auto max-h-[85vh]">
          {/* Section: Patient Basic Information */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] border-l-4 border-blue-600 pl-3">Patient Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5 col-span-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight ml-1">Patient Name</label>
                <input required type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight ml-1">Patient ID / MRN</label>
                <input required type="text" placeholder="MRN-12345" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" value={formData.mrn} onChange={(e) => setFormData({ ...formData, mrn: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight ml-1">DOB / Age</label>
                <input required type="date" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight ml-1">Gender</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight ml-1">Patient Status</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-emerald-600 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-600 outline-none transition-all" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Deceased">Deceased</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight ml-1">Phone Number</label>
                <input type="text" placeholder="(555) 000-0000" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight ml-1">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight ml-1">Patient Photo URL</label>
                <input type="text" placeholder="https://image-url.com/photo.jpg" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" value={formData.photo} onChange={(e) => setFormData({ ...formData, photo: e.target.value })} />
              </div>
              <div className="space-y-1.5 col-span-full">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight ml-1">Home Address</label>
                <input type="text" placeholder="123 Care St, Suite 400, Los Angeles, CA 90001" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Section: Clinical & Contact Details */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] border-l-4 border-emerald-600 pl-3">Clinical & Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight ml-1 text-red-600">Allergies (Severe Warning)</label>
                <input type="text" placeholder="Penicillin, Peanuts..." className="w-full bg-red-50/30 border border-red-200 rounded-lg px-3 py-2 text-sm font-bold text-red-600 focus:ring-4 focus:ring-red-100 focus:border-red-600 outline-none transition-all" value={formData.allergy} onChange={(e) => setFormData({ ...formData, allergy: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight ml-1">Chronic Conditions</label>
                <input type="text" placeholder="Diabetes Type II, Hypertension" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" value={formData.condition} onChange={(e) => setFormData({ ...formData, condition: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight ml-1">Emergency Contact Name</label>
                <input type="text" placeholder="Mary Smith (Daughter)" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" value={formData.emergencyContactName} onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight ml-1">Emergency Contact Phone</label>
                <input type="text" placeholder="(555) 001-2233" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" value={formData.emergencyContactPhone} onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight ml-1">Insurance Provider</label>
                <input type="text" placeholder="Medicare / Blue Cross" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" value={formData.insurance} onChange={(e) => setFormData({ ...formData, insurance: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight ml-1">Primary Physician</label>
                <input type="text" placeholder="Dr. Sarah Mitchell" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" value={formData.provider} onChange={(e) => setFormData({ ...formData, provider: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight ml-1">Admission Date</label>
                <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" value={formData.admissionDate} onChange={(e) => setFormData({ ...formData, admissionDate: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight ml-1">Room Assignment</label>
                <input type="text" placeholder="Unit 204-B" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all" value={formData.room} onChange={(e) => setFormData({ ...formData, room: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 flex gap-3 sticky bottom-0 bg-white border-t border-slate-100 z-20">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 text-slate-600 font-black uppercase tracking-widest py-3 rounded-xl hover:bg-slate-200 transition-all text-[11px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 ${editData ? 'bg-amber-600 shadow-amber-100' : 'bg-blue-600 shadow-blue-100'} text-white font-black uppercase tracking-widest py-3 rounded-xl hover:opacity-90 transition-all text-[11px] shadow-lg disabled:opacity-70 flex items-center justify-center gap-2`}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                editData ? "Update Profile" : "Admit Resident"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmitResidentModal;
