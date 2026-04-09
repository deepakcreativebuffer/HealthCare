import React, { useState, useEffect, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  Shield,
  Stethoscope,
  MapPin,
  Heart,
  Fingerprint,
  AlertCircle,
  Clipboard,
  ChevronRight,
  ChevronDown,
  Pill,
  Clock,
  Activity,
  DollarSign,
  AlertTriangle,
  FileText,
  Search,
  FlaskConical,
  Printer,
  Edit,
  MoreVertical,
  X,
  Plus,
  Trash2,
  CheckCircle2,
  DownloadIcon,
  Upload,
  Scissors,
  Circle,
  Siren,
} from "lucide-react";
import { api } from "../../data/api";
import Navbar from "../layout/Navbar";
import SubNav from "../layout/SubNav";
import ECGReportModal from "./ECGReportModal";

import AdmitResidentModal from "./AdmitResidentModal";

const ResidentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resident, setResident] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null); // { type: 'LIST' | 'FORM', section: 'Visits' | ... }
  const [isECGModalOpen, setIsECGModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const latestVisit = resident?.visits?.[0] || {};

  const openModal = (section, type = 'LIST') => {
    setActiveModal({ section, type });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const fetchResident = async () => {
    setIsLoading(true);
    try {
      const data = await api.getResidentData(id);
      setResident(data);
    } catch (error) {
      console.error("Error fetching resident data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResident();
  }, [id]);

  const handleSave = async (formData) => {
    const sectionToKey = {
      'Visits': 'visits',
      'Diagnosis': 'diagnosisProblems',
      'Lab': 'labResults',
      'Billing': 'billingRecords',
      'Insurance': 'insuranceInfo',
      'Documents': 'recentDocuments',
      'Fax': 'faxLogs',
      'Medications': 'medicationsList',
      'Care Team': 'careTeam',
      'Appointments': 'appointments',
      'Allergies': 'allergies',
      'Audit Trail': 'auditTrail',
      'Care Plan': 'carePlan',
      'Care Plan & Interventions': 'carePlan',
      'Social History': 'socialHistory',
      'Social History & Lifestyle': 'socialHistory',
      'Medical History': 'medicalHistory',
      'Surgical History': 'surgicalHistory',
      'Discharge Summary': 'dischargeSummary',
      'Communication': 'communication',
      'Mobility': 'mobility',
      'Nutrition': 'nutrition',
      'Safety': 'safety',
      'Safety & Access': 'safety',
      'Advance Directives': 'advanceDirectives',
      'Immunizations': 'immunizations',
      'Pharmacy': 'pharmacy',
      'Insurance Information': 'insuranceInfo',
      'Activities': 'activities'
    };

    const key = sectionToKey[activeModal.section] || activeModal.section.toLowerCase();

    try {
      if (activeModal.section === 'Patient Info') {
        await api.updateResident(resident.id, formData);
      } else if (activeModal.editItem) {
        await api.updateResidentSubData(resident.id, key, activeModal.editItem.id, formData);
      } else {
        await api.addResidentSubData(resident.id, key, formData);
      }
      await fetchResident();
      closeModal();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleDelete = async (section, itemId) => {
    const sectionToKey = {
      'Visits': 'visits',
      'Diagnosis': 'diagnosisProblems',
      'Lab': 'labResults',
      'Billing': 'billingRecords',
      'Insurance': 'insuranceInfo',
      'Documents': 'recentDocuments',
      'Fax': 'faxLogs',
      'Medications': 'medicationsList',
      'Care Team': 'careTeam',
      'Appointments': 'appointments',
      'Allergies': 'allergies',
      'Audit Trail': 'auditTrail',
      'Care Plan': 'carePlan',
      'Social History': 'socialHistory',
      'Medical History': 'medicalHistory',
      'Discharge Summary': 'dischargeSummary',
      'Communication': 'communication',
      'Mobility': 'mobility',
      'Nutrition': 'nutrition',
      'Safety': 'safety',
      'Safety & Access': 'safety',
      'Advance Directives': 'advanceDirectives',
      'Immunizations': 'immunizations',
      'Pharmacy': 'pharmacy',
      'Insurance Information': 'insuranceInfo',
      'Activities': 'activities'
    };
    const key = sectionToKey[section] || section.toLowerCase();
    try {
      await api.deleteResidentSubData(resident.id, key, itemId);
      await fetchResident();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleDownloadReport = () => {
    if (!resident) return;

    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    // BRANDING & HEADER
    doc.setFillColor(15, 91, 120); // Medical blue
    doc.rect(0, 0, pageWidth, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text("PATIENT CLINICAL SUMMARY", margin, 25);

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`HealthCare EHR System - Confidential Medical Record`, margin, 33);
    doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth - margin - 50, 33);

    y = 50;

    // SECTION 1: PERSONAL & DEMOGRAPHICS
    doc.setTextColor(15, 91, 120);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text("1. PERSONAL INFORMATION", margin, y);
    y += 4;
    doc.setDrawColor(15, 91, 120);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    doc.setTextColor(0);
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text("Name:", margin, y);
    doc.setFont(undefined, 'normal');
    doc.text(resident.name, margin + 20, y);

    doc.setFont(undefined, 'bold');
    doc.text("Patient ID:", margin + 80, y);
    doc.setFont(undefined, 'normal');
    doc.text(resident.id, margin + 110, y);
    y += 7;

    doc.setFont(undefined, 'bold');
    doc.text("DOB/Age:", margin, y);
    doc.setFont(undefined, 'normal');
    doc.text(`${resident.age} years, ${resident.gender || 'N/A'}`, margin + 20, y);

    doc.setFont(undefined, 'bold');
    doc.text("Room:", margin + 80, y);
    doc.setFont(undefined, 'normal');
    doc.text(resident.roomNumber || 'N/A', margin + 110, y);
    y += 7;

    doc.setFont(undefined, 'bold');
    doc.text("Admission:", margin, y);
    doc.setFont(undefined, 'normal');
    doc.text(resident.admissionDate || 'N/A', margin + 20, y);

    doc.setFont(undefined, 'bold');
    doc.text("Status:", margin + 80, y);
    doc.setFont(undefined, 'normal');
    doc.text(resident.status || 'Active', margin + 110, y);
    y += 15;

    // SECTION 2: VITALS SUMMARY
    doc.setTextColor(15, 91, 120);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text("2. VITALS SUMMARY", margin, y);
    y += 4;
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    const vitals = resident.vitals || {};
    const vitalsData = [
      ["Blood Pressure", vitals.bp || "N/A", "Heart Rate", `${vitals.heartRate || "N/A"} bpm`],
      ["Blood Sugar", vitals.bloodSugar || "N/A", "Weight", `${vitals.weight || "N/A"} kg`]
    ];

    autoTable(doc, {
      startY: y,
      body: vitalsData,
      theme: 'plain',
      styles: { fontSize: 10, cellPadding: 2 },
      columnStyles: { 0: { fontStyle: 'bold', width: 40 }, 2: { fontStyle: 'bold', width: 40 } },
      margin: { left: margin }
    });

    y = doc.lastAutoTable.finalY + 15;

    // SECTION 3: ALLERGIES (CRITICAL)
    doc.setTextColor(200, 0, 0); // Warning Red
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text("3. KNOWN ALLERGIES", margin, y);
    y += 4;
    doc.setDrawColor(200, 0, 0);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    doc.setTextColor(0);
    const allergies = resident.allergies || [];
    if (allergies.length > 0) {
      const allergyTable = allergies.map(a => [a.name, a.severity, a.reaction]);
      autoTable(doc, {
        startY: y,
        head: [['Allergen', 'Severity', 'Reaction']],
        body: allergyTable,
        theme: 'striped',
        headStyles: { fillColor: [200, 50, 50] },
        styles: { fontSize: 9 },
        margin: { left: margin }
      });
      y = doc.lastAutoTable.finalY + 15;
    } else {
      doc.setFont(undefined, 'italic');
      doc.text("NKDA (No Known Drug Allergies) recorded.", margin + 5, y);
      y += 15;
    }

    // SECTION 4: MEDICATIONS
    doc.setTextColor(15, 91, 120);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text("4. CURRENT MEDICATIONS", margin, y);
    y += 4;
    doc.setDrawColor(15, 91, 120);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    const meds = resident.medicationsList || [];
    if (meds.length > 0) {
      const medTable = meds.map(m => [m.name, m.dose, m.details, m.status]);
      autoTable(doc, {
        startY: y,
        head: [['Medication', 'Dose', 'Instructions', 'Status']],
        body: medTable,
        theme: 'grid',
        headStyles: { fillColor: [15, 91, 120] },
        styles: { fontSize: 9 },
        margin: { left: margin }
      });
      y = doc.lastAutoTable.finalY + 15;
    } else {
      doc.setFont(undefined, 'italic');
      doc.text("No active medications records found.", margin + 5, y);
      y += 15;
    }

    // PAGE BREAK CHECK
    if (y > 220) { doc.addPage(); y = 20; }

    // SECTION 5: DIAGNOSIS & PROBLEMS
    doc.setTextColor(15, 91, 120);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text("5. DIAGNOSIS & ACTIVE PROBLEMS", margin, y);
    y += 4;
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    const problems = resident.diagnosisProblems || [];
    if (problems.length > 0) {
      const probTable = problems.map(p => [p.name, p.onset, p.type, p.status]);
      autoTable(doc, {
        startY: y,
        head: [['Condition', 'Onset', 'Type', 'Status']],
        body: probTable,
        theme: 'striped',
        headStyles: { fillColor: [15, 91, 120] },
        styles: { fontSize: 9 },
        margin: { left: margin }
      });
      y = doc.lastAutoTable.finalY + 15;
    } else {
      doc.text("No active diagnosis records found.", margin + 5, y);
      y += 15;
    }

    // SECTION 6: INSURANCE & CONTACTS
    doc.setTextColor(15, 91, 120);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text("6. INSURANCE & EMERGENCY CONTACT", margin, y);
    y += 4;
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    doc.setTextColor(0);
    doc.setFontSize(10);
    const ins = resident.insurance || {};
    const emergency = resident.emergencyContact || {};

    doc.setFont(undefined, 'bold');
    doc.text("Insurance Provider:", margin, y);
    doc.setFont(undefined, 'normal');
    doc.text(ins.provider || "N/A", margin + 40, y);

    doc.setFont(undefined, 'bold');
    doc.text("Policy ID:", margin + 100, y);
    doc.setFont(undefined, 'normal');
    doc.text(ins.id || "N/A", margin + 125, y);
    y += 10;

    doc.setFont(undefined, 'bold');
    doc.text("Emergency Contact:", margin, y);
    doc.setFont(undefined, 'normal');
    const contactInfo = emergency.name ? `${emergency.name} (${emergency.relation}) - ${emergency.phone}` : "N/A";
    doc.text(contactInfo, margin + 40, y);
    y += 15;

    // FOOTER
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(`HealthCare EHR Automated Report - Electronic Signature Not Required`, margin, 285);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 20, 285);
    }

    // Save
    doc.save(`${resident.name.replace(/\s+/g, "_")}_Clinical_Report.pdf`);
  };

  const renderModalContent = () => {
    if (!activeModal) return null;

    const { section, type, editItem } = activeModal;

    const sectionToKey = {
      'Visits': 'visits',
      'Diagnosis': 'diagnosisProblems',
      'Lab': 'labResults',
      'Billing': 'billingRecords',
      'Insurance': 'insuranceInfo',
      'Documents': 'recentDocuments',
      'Fax': 'faxLogs',
      'Medications': 'medicationsList',
      'Care Team': 'careTeam',
      'Appointments': 'appointments',
      'Allergies': 'allergies',
      'Audit Trail': 'auditTrail',
      'Care Plan': 'carePlan',
      'Care Plan & Interventions': 'carePlan',
      'Social History': 'socialHistory',
      'Medical History': 'medicalHistory',
      'Discharge Summary': 'dischargeSummary',
      'Communication': 'communication',
      'Mobility': 'mobility',
      'Nutrition': 'nutrition',
      'Safety': 'safety',
      'Safety & Access': 'safety',
      'Advance Directives': 'advanceDirectives',
      'Immunizations': 'immunizations',
      'Pharmacy': 'pharmacy',
      'Insurance Information': 'insuranceInfo',
      'Activities': 'activities',
      'Lab Highlights': 'labResults',
      'Goals': 'goals',
      'Report': 'report'
    };

    if (type === 'FORM') {
      const formFields = {
        'Visits': [
          'visitDate', 'visitType', 'providerName', 'chiefComplaint',
          'hpi', 'ros', 'physicalExam',
          'bp', 'pulse', 'temp', 'weight', 'height', 'bmi',
          'diagnosis', 'procedure', 'notes'
        ],
        'Diagnosis': [
          'name', 'onset', 'type', 'status', 'notes'
        ],
        'Lab': [
          'name', 'orderedDate', 'resultDate', 'value',
          'range', 'flag', 'orderedBy', 'status', 'report'
        ],
        'Billing': [
          'invoiceNumber', 'serviceDate', 'charges', 'balance', 'status'
        ],
        'Insurance': [
          'company', 'plan', 'policyNumber', 'groupNumber',
          'subscriber', 'eligibility', 'status'
        ],
        'Documents': [
          'name', 'date', 'type', 'uploadedBy', 'file'
        ],
        'Fax': [
          'faxDate', 'from', 'to', 'subject', 'status'
        ],
        'Medications': ['name', 'dose', 'instructions', 'type'],
        'Care Team': ['name', 'role', 'specialty', 'phone'],
        'Appointments': ['date', 'time', 'doctor', 'location'],
        'Allergies': ['name', 'reaction', 'severity', 'status'],
        'Audit Trail': ['date', 'text', 'user'],
        'Care Plan': ['title', 'instruction', 'priority'],
        'Care Plan & Interventions': ['title', 'instruction', 'priority'],
        'Social History': ['category', 'details', 'notes'],
        'Social History & Lifestyle': ['category', 'details', 'notes'],
        'Activities': ['date', 'type', 'name', 'status'],
        'Patient Info': [
          'name', 'mrn', 'dob', 'gender', 'status', 'phone', 'email', 'photo', 'address',
          'allergy', 'condition', 'emergencyContactName', 'emergencyContactPhone',
          'insurance', 'provider', 'admissionDate', 'room'
        ]
      };

      const fields = formFields[section] || ['name', 'details', 'status'];

      const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {};
        const form = e.target;
        fields.forEach(field => {
          formData[field] = form[field].value;
        });
        handleSave(formData);
      };

      return (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">{editItem ? 'Edit' : 'Add'} {section}</h2>
            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {fields.map((field, i) => (
                <div key={i} className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">{field.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                  {(field === 'report' || field === 'file') ? (
                    <div className="flex items-center gap-2">
                      <input
                        name={field}
                        type="file"
                        className="hidden"
                        id={`file-${field}`}
                        onChange={(e) => {
                          const fileName = e.target.files[0]?.name;
                          if (fileName) {
                            const label = e.target.parentElement.querySelector('.file-label');
                            if (label) label.textContent = fileName;
                          }
                        }}
                      />
                      <label
                        htmlFor={`file-${field}`}
                        className="flex-1 px-4 py-2.5 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 hover:border-blue-400 transition-all flex items-center gap-3 text-slate-500"
                      >
                        <Upload size={16} />
                        <span className="file-label text-xs font-bold">{editItem && editItem[field] ? editItem[field] : 'Choose PDF Report...'}</span>
                      </label>
                    </div>
                  ) : (
                    <input
                      name={field}
                      type="text"
                      defaultValue={(() => {
                        const val = editItem ? editItem[field] : '';
                        if (field === 'insurance' && typeof val === 'object') return val.provider || '';
                        if (Array.isArray(val)) return val.map(v => typeof v === 'object' ? (v.name || JSON.stringify(v)) : v).join(', ');
                        if (typeof val === 'object' && val !== null) return val.name || JSON.stringify(val);
                        return val;
                      })()}
                      placeholder={`Enter ${field}`}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm font-bold text-slate-700"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <button type="button" onClick={closeModal} className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-all">Cancel</button>
              <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">Save {section}</button>
            </div>
          </form>
        </div>
      );
    }

    if (section === 'Report') {
      return (
        <div className="flex flex-col h-full bg-white overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-sm">
                <FileText size={18} />
              </div>
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">
                Comprehensive Patient Report Preview
              </h2>
            </div>
            <button onClick={closeModal} className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-8 space-y-8 print:p-0">
            {/* Report Header */}
            <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6">
              <div>
                <h1 className="text-3xl font-black text-slate-900 uppercase">{resident.name}</h1>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">Patient Clinical Summary Report</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-slate-900 uppercase">Generated On</p>
                <p className="text-xs font-bold text-slate-500">{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
              </div>
            </div>

            {/* Demographics */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Patient ID</p>
                <p className="text-sm font-bold text-slate-800">{resident.id}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Date of Birth</p>
                <p className="text-sm font-bold text-slate-800">03/15/1970 (Age: 51)</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Gender</p>
                <p className="text-sm font-bold text-slate-800">Male</p>
              </div>
            </div>

            {/* Clinical Overview */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-4 border-blue-600 pl-3">Active Conditions & Diagnosis</h3>
              <div className="grid grid-cols-2 gap-4">
                {resident.diagnosisProblems?.map((diag, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-sm font-bold text-slate-800">{diag.name}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase mt-1">{diag.status} • Onset: {diag.onset}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Medications & Allergies */}
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-4 border-emerald-600 pl-3">Medications List</h3>
                <div className="space-y-2">
                  {resident.medicationsList?.map((med, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100">
                      <div>
                        <p className="text-sm font-bold text-slate-800">{med.name}</p>
                        <p className="text-[10px] font-bold text-slate-500">{med.details}</p>
                      </div>
                      <p className="text-xs font-black text-slate-400">{med.dose}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-4 border-red-600 pl-3">Known Allergies</h3>
                <div className="space-y-2">
                  {resident.allergies?.map((all, i) => (
                    <div key={i} className="p-3 bg-red-50 rounded-xl border border-red-100">
                      <div className="flex justify-between">
                        <p className="text-sm font-bold text-red-800">{all.name}</p>
                        <span className="text-[9px] font-black text-red-500 uppercase tracking-tighter bg-white px-1.5 py-0.5 rounded border border-red-100">{all.severity}</span>
                      </div>
                      <p className="text-[10px] font-bold text-red-600/70 mt-1 uppercase tracking-widest">Reaction: {all.reaction}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Vital Signs */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-l-4 border-blue-600 pl-3">Latest Clinical Vitals</h3>
              {resident.visits && resident.visits.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-900 text-white rounded-2xl text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Blood Pressure</p>
                    <p className="text-xl font-black">{resident.visits[0].bp || '-'}</p>
                  </div>
                  <div className="p-4 bg-slate-900 text-white rounded-2xl text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Pulse Rate</p>
                    <p className="text-xl font-black">{resident.visits[0].pulse || '-'}</p>
                  </div>
                  <div className="p-4 bg-slate-900 text-white rounded-2xl text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Body Temp</p>
                    <p className="text-xl font-black">{resident.visits[0].temp || '-'}</p>
                  </div>
                  <div className="p-4 bg-slate-900 text-white rounded-2xl text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Body Weight</p>
                    <p className="text-xl font-black">{resident.visits[0].weight || '-'}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs font-bold text-slate-400 italic">No vital signs recorded recently.</p>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
            <button onClick={closeModal} className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">Close</button>
            <button onClick={() => window.print()} className="px-8 py-2.5 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-lg shadow-slate-200 flex items-center gap-2">
              <Printer size={16} /> Print Official Report
            </button>
          </div>
        </div>
      );
    }

    // LIST VIEW
    const key = sectionToKey[section] || section.toLowerCase();
    let data = resident[key] || [];

    // Ensure objects are handleable as arrays for the table
    if (!Array.isArray(data) && typeof data === 'object' && data !== null) {
      if (section === 'Social History' || section === 'Social History & Lifestyle') {
        data = Object.entries(data).map(([cat, det], i) => ({
          id: i + 1,
          category: cat.charAt(0).toUpperCase() + cat.slice(1),
          details: typeof det === 'object' ? JSON.stringify(det) : det,
          notes: 'Current Status'
        }));
      } else {
        // For other objects (Communication, Safety, Insurance, etc.), wrap in array for single-row display
        data = [{ ...data, id: 1 }];
      }
    }

    // Fallback for demo data if keys are empty in resident object
    if (data.length === 0) {
      if (section === 'Discharge Summary') {
        data = [{ id: 1, status: 'Stable', instruction: 'Maintain light activity', followUp: '2 Weeks Out', date: '02/25/2024' }];
      } else if (section === 'Audit Trail') {
        data = [
          { id: 1, date: '11/20/2022', event: 'Record Access', text: 'EHR: Updated Diagnosis', user: 'Dr. Roberts' },
          { id: 2, date: '11/15/2022', event: 'Insurance Check', text: 'Insurance: Verified Plan', user: 'Admin' }
        ];
      } else if (section === 'Advance Directives') {
        data = [{ id: 1, dnrStatus: 'Active (DNR)', dniStatus: 'Active (DNI)', documentationDate: '02/20/2024', status: 'Verified' }];
      } else if (section === 'Safety') {
        data = [{ id: 1, security: 'Wander Guard Active', accessLevel: 'Family Only', protocol: 'Standard', notes: 'Check bracelet daily' }];
      } else if (section === 'Nutrition') {
        data = [{ id: 1, diet: 'Mechanical Soft', fluids: 'Thin', intakeGoal: '1500ml/day', notes: 'Low sodium requirement' }];
      } else if (section === 'Mobility') {
        data = [{ id: 1, assist: 'One-Person', devices: 'Walker', fallRisk: 'High', status: 'Supervised' }];
      } else if (section === 'Communication') {
        data = [{ id: 1, language: 'English', interpreter: 'Not Required', hearing: 'Impaired (Left)', vision: 'Normal', notes: 'Prefers written instructions' }];
      } else if (section === 'Care Plan') {
        data = [
          { id: 1, name: 'Cardiac Output Management', details: 'Monitor weight daily. Report weight gain > 2 lbs/day or 5 lbs/wk. Restrict sodium to 2g/day.', frequency: 'Daily', status: 'Active' },
          { id: 2, name: 'Activity Tolerance', details: 'Encourage progressive ambulation. Refer to cardiac rehab phase II program.', frequency: 'Daily', status: 'Active' }
        ];
      } else if (section === 'Social History') {
        data = [
          { id: 1, category: 'Tobacco', details: 'Former Smoker', notes: 'Quit 2010' },
          { id: 2, category: 'Alcohol', details: 'Occasional', notes: '1-2 drinks/mo' },
          { id: 3, category: 'Diet', details: 'Low Sodium', notes: 'Cardiac Diet' }
        ];
      } else if (section === 'Immunizations') {
        data = [
          { id: 1, name: 'Influenza (Flu)', date: '10/12/2023', status: 'Up-to-date', provider: 'Monterey Clinic' },
          { id: 2, name: 'Pneumococcal', date: '05/20/2022', status: 'Up-to-date', provider: 'General Hospital' },
          { id: 3, name: 'COVID-19 Bivalent', date: '01/15/2024', status: 'Required', provider: 'N/A' }
        ];
      } else if (section === 'Activities' || section === 'Activity Timeline') {
        data = [
          { id: 1, date: '08:00 AM Today', type: 'Medication', name: 'Lisinopril 20mg Admin.', status: 'Completed' },
          { id: 2, date: '07:30 AM Today', type: 'Vitals', name: 'Morning Vitals Check', status: 'Completed' }
        ];
      } else if (section === 'Lab Highlights') {
        data = (resident.labResults && resident.labResults.length > 0) ? resident.labResults : [
          { id: 1, name: 'Glucose', value: '102 mg/dL', status: 'Normal' },
          { id: 2, name: 'HbA1c', value: '6.4%', status: 'Stable' },
          { id: 3, name: 'Potassium', value: '4.2 mEq/L', status: 'Normal' }
        ];
      } else if (section === 'Goals') {
        data = [
          { id: 1, name: 'Remain fall-free during shift', progress: 'On Track', status: 'Active' },
          { id: 2, name: 'Increase fluid intake to 1.5L', progress: 'Pending', status: 'In-Progress' },
          { id: 3, name: 'Ambulate to dining room with assist', progress: 'On Track', status: 'Active' }
        ];
      }
    }

    const listHeaders = {
      'Visits': ['visitDate', 'visitType', 'providerName', 'chiefComplaint', 'diagnosis'],
      'Diagnosis': ['name', 'onset', 'type', 'status'],
      'Lab': ['name', 'date', 'value', 'flag', 'status'],
      'Billing': ['invoiceNumber', 'serviceDate', 'charges', 'balance', 'status'],
      'Insurance': ['company', 'plan', 'policyNumber', 'status'],
      'Documents': ['name', 'date', 'type', 'uploadedBy'],
      'Fax': ['faxDate', 'from', 'to', 'subject', 'status'],
      'Medications': ['name', 'dose', 'instructions', 'type'],
      'Care Team': ['name', 'role', 'specialty', 'phone'],
      'Appointments': ['date', 'time', 'doctor', 'location'],
      'Allergies': ['name', 'reaction', 'severity', 'status'],
      'Care Plan': ['title', 'instruction', 'priority'],
      'Care Plan & Interventions': ['title', 'instruction', 'priority'],
      'Social History': ['category', 'details', 'notes'],
      'Social History & Lifestyle': ['category', 'details', 'notes'],
      'Medical History': ['Condition', 'Diagnosis Date', 'Doctor Notes', 'Status'],
      'Communication': ['language', 'interpreter', 'hearing', 'vision', 'notes'],
      'Mobility': ['assist', 'devices', 'fallRisk', 'status'],
      'Nutrition': ['diet', 'fluids', 'intakeGoal', 'notes'],
      'Safety': ['security', 'accessLevel', 'protocol', 'notes'],
      'Safety & Access': ['security', 'accessLevel', 'protocol', 'notes'],
      'Advance Directives': ['dnrStatus', 'dniStatus', 'date', 'status'],
      'Audit Trail': ['date', 'event', 'text', 'user'],
      'Discharge Summary': ['status', 'instruction', 'followUp', 'date'],
      'Immunizations': ['name', 'date', 'status', 'provider'],
      'Insurance Information': ['provider', 'plan', 'groupId', 'subscriber'],
      'Pharmacy': ['name', 'address', 'phone', 'hours'],
      'Lab': ['name', 'value', 'date', 'flag', 'status'],
      'Lab Highlights': ['name', 'value', 'status'],
      'Goals': ['name', 'progress', 'status']
    };

    const headers = listHeaders[section] || (data.length > 0 ? Object.keys(data[0]).filter(k => k !== 'id') : ['date', 'name', 'status']);

    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm ring-4 ring-emerald-50">
              <Stethoscope size={18} />
            </div>
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">
              {resident.name} | {resident.id || '123456'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 hover:bg-slate-200 rounded-lg cursor-pointer text-slate-400 transition-colors">
              <Search size={16} />
            </div>
            <button onClick={closeModal} className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col overflow-hidden">
          {section !== 'Patient Info' && section !== 'Report' && (
            <div className="flex justify-end mb-4">
              <button
                onClick={() => openModal(section, 'FORM')}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95"
              >
                Add {section.includes(' ') ? section.split(' ')[0] : section} <Plus size={16} />
              </button>
            </div>
          )}

          <div className="overflow-auto border border-slate-100 rounded-xl flex-1 bg-white">
            <table className="w-full text-left border-collapse table-fixed">
              <thead className="sticky top-0 z-10 bg-slate-50 shadow-sm">
                <tr>
                  {headers.map((h, i) => (
                    <th key={i} className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {h.replace(/([A-Z])/g, ' $1')}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data.length > 0 ? (
                  data.map((item, idx) => (
                    <tr key={idx} className="group hover:bg-blue-50/30 transition-colors">
                      {headers.map((h, i) => (
                        <td key={i} className="px-4 py-3 text-[11px] font-bold text-slate-700 truncate">
                          {item[h] || '-'}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1.5  transition-opacity">
                          {(section === 'Lab' || section === 'Documents' || section === 'Visits') && (
                            <button
                              onClick={(e) => { e.stopPropagation(); alert('Downloading report...'); }}
                              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all"
                              title="Download PDF"
                            >
                              <DownloadIcon size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => setActiveModal({ section, type: 'FORM', editItem: item })}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(section, item.id)}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-200 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={headers.length + 1} className="px-4 py-16 text-center text-slate-300">
                      <div className="flex flex-col items-center gap-2">
                        <Clipboard size={48} className="opacity-20" />
                        <p className="font-black uppercase tracking-widest text-xs">No records found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-2.5">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            Loading patient profile...
          </p>
        </div>
      </div>
    );
  }

  if (!resident) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">Resident Not Found</h2>
          <button
            onClick={() => navigate("/admin")}
            className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <main className="flex-1 overflow-y-auto p-2 lg:p-2 space-y-1.5">
        {/* Back Button */}
        <div className="flex items-center gap-2 mb-1">
          <button
            onClick={() => navigate("/admin?view=residents")}
            className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-blue-600 transition-all shadow-sm group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Back to Resident List
          </span>
        </div>

        {/* Profile Card */}
        <div onClick={() => setIsEditModalOpen(true)} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all group/profile relative">
          <div className="p-2 md:p-2.5 flex flex-col md:flex-row gap-2.5 md:gap-4 pl-3">
            {/* Profile Sidebar */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden ring-1 ring-slate-100">
                {(resident.photo || resident.image) ? (
                  <img src={resident.photo || resident.image} alt={resident.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-slate-300" />
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditModalOpen(true);
                }}
                className="mt-1.5 flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-tight hover:bg-blue-100 transition-colors"
              >
                <Edit size={12} />
                Edit
              </button>
            </div>

            <div className="flex-1 space-y-1.5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                <div>
                  <h1 className="text-xl font-black text-slate-800 tracking-tight uppercase leading-none mb-1">
                    {resident.name}
                  </h1>
                  <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Fingerprint size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-tight">ID: <span className="text-slate-800">{resident.mrn || resident.id || '123456'}</span></span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <Calendar size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-tight">DOB: <span className="text-slate-800">{resident.dob || '03/15/1970'}</span></span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <User size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-tight">Gender: <span className="text-slate-800">{resident.gender || 'Male'}</span></span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 pl-3 border-l border-slate-200">
                      <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-widest text-[9px]">Level: {resident.levelOfCare || 'Skilled Care'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-widest text-[9px]">Adm: {resident.admissionDate || '10/12/2023'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <span className={`px-2.5 py-1 ${resident.status === 'Deceased' ? 'bg-red-50 text-red-600 border-red-100' : resident.status === 'Inactive' ? 'bg-slate-50 text-slate-500 border-slate-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'} border rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm`}>
                    <AlertCircle size={12} className={resident.status === 'Deceased' ? 'fill-red-600' : resident.status === 'Inactive' ? 'fill-slate-500' : 'fill-emerald-600'} />
                    {resident.status || 'Active'}
                  </span>
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                    <AlertCircle size={12} className="fill-amber-600" />
                    Resident
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-2 gap-x-4 pt-3 border-t border-slate-100 pb-1">
                {/* Insurance & Allergy */}
                <div className="space-y-2 lg:col-span-1">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100 shadow-sm">
                      <Shield size={12} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">Insurance</p>
                      <p className="text-[11px] font-bold text-blue-600 underline underline-offset-2">
                        {typeof resident.insurance === 'object' ? resident.insurance.provider : (resident.insurance || 'BCBS PPO')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-red-50 flex items-center justify-center text-red-500 border border-red-100 shadow-sm">
                      <AlertCircle size={12} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">Allergy</p>
                      <p className="text-[11px] font-black text-red-600 truncate w-32">
                        {resident.allergy || (Array.isArray(resident.allergies) ? resident.allergies.map(a => typeof a === 'object' ? a.name : a).join(', ') : resident.allergies) || 'None'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Provider & Condition */}
                <div className="space-y-2 lg:col-span-1">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-sm">
                      <User size={12} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">Provider</p>
                      <p className="text-[11px] font-bold text-slate-700">{resident.provider || 'Emily Roberts'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 shadow-sm">
                      <Clipboard size={12} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">Condition</p>
                      <p className="text-[11px] font-bold text-blue-600 truncate w-32">
                        {resident.condition || (Array.isArray(resident.medicalConditions) ? resident.medicalConditions.join(', ') : resident.medicalConditions) || 'None'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location & Nutrition */}
                <div className="space-y-2 lg:col-span-1 border-l border-slate-50 pl-4 hidden lg:block">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100 shadow-sm">
                      <MapPin size={12} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">Location</p>
                      <p className="text-[11px] font-bold text-slate-700">{resident.room || 'Room 102-B'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100 shadow-sm">
                      <FileText size={12} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">Nutrition</p>
                      <p className="text-[11px] font-bold text-slate-700">
                        {resident.nutrition?.diet || (typeof resident.nutrition === 'string' ? resident.nutrition : 'Low Sodium Diet')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 lg:col-span-1">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100 shadow-sm">
                      <Phone size={12} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">Phone</p>
                      <p className="text-[11px] font-bold text-slate-700">{resident.phone || '(555) 123-4567'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 shadow-sm">
                      <Search size={12} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">Address</p>
                      <p className="text-[11px] font-bold text-slate-700 truncate w-32">{resident.address || '123 Main St.'}</p>
                    </div>
                  </div>
                </div>

                {/* Emergency & Access */}
                <div className="space-y-2 lg:col-span-2 border-l border-slate-100 pl-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-rose-50 flex items-center justify-center text-rose-500 border border-rose-100 shadow-sm">
                      <Siren size={12} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">Emergency Contact</p>
                      <p className="text-[11px] font-bold text-slate-700 leading-none mb-0.5">{resident.emergencyContactName || 'Mary Smith'}</p>
                      <p className="text-[10px] font-bold text-blue-600">{resident.emergencyContactPhone || '(555) 987-6543'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100 shadow-sm">
                      <Shield size={12} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">Clinical Access</p>
                      <div className="flex flex-wrap gap-1">
                        {(resident.clinicalAccess || 'Full Assist, Interpreter Req').split(',').map((access, i) => (
                          <span key={i} className={`text-[9px] font-black ${i % 2 === 0 ? 'text-purple-700 bg-purple-100/50' : 'text-blue-700 bg-blue-100/50'} px-1.5 py-0.5 rounded uppercase`}>
                            {access.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-rose-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-rose-100 group-hover:scale-110 transition-transform">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-xl font-black leading-none text-slate-800">{resident.diagnosisProblems?.length || 0}</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Active Problems</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-blue-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-100 group-hover:scale-110 transition-transform">
              <Pill size={20} />
            </div>
            <div>
              <p className="text-xl font-black leading-none text-slate-800">{resident.medicationsList?.length || 0}</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Medications</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-emerald-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-100 group-hover:scale-110 transition-transform">
              <Calendar size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] font-black leading-tight uppercase tracking-widest text-slate-400">Next Appt</p>
              <p className="text-[11px] font-bold text-slate-700 truncate">{resident.appointments?.[0]?.date || 'None'}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-amber-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-amber-100 group-hover:scale-110 transition-transform">
              <AlertTriangle size={18} />
            </div>
            <div>
              <p className="text-[11px] font-black leading-tight uppercase tracking-widest text-slate-400">Fall Risk</p>
              <p className="text-[12px] font-black text-amber-600">{resident.mobility?.[0]?.fallRisk || 'Moderate'}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-indigo-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-indigo-100 group-hover:scale-110 transition-transform">
              <Clock size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] font-black leading-tight uppercase tracking-widest text-slate-400">Last Visit:</p>
              <p className="text-[11px] font-bold text-slate-700 truncate">{resident.visits?.[0]?.visitDate || 'Never'}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-teal-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-teal-100 group-hover:scale-110 transition-transform">
              <Activity size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] font-black leading-tight uppercase tracking-widest text-slate-400">Latest Vitals:</p>
              <p className="text-[11px] font-bold text-slate-700 truncate">BP: {resident.vitalsHistory?.bp || '120/80'}</p>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">

          {/* Left Sidebar */}
          <div className="lg:col-span-2 space-y-2">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden pb-2">
              <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest ">Recent Visits</h3>
                <MoreVertical size={14} className="text-slate-400" />
              </div>
              <div className="px-2 py-1 space-y-0.5">
                {[
                  { label: 'Recent Visits', count: resident.visits?.length || 0, icon: Clock, color: 'text-teal-500 bg-teal-50', section: 'Visits' },
                  { label: 'Diagnosis', count: resident.diagnosisProblems?.length || 0, icon: AlertCircle, color: 'text-red-500 bg-red-50', section: 'Diagnosis' },
                  { label: 'Medications', count: resident.medicationsList?.length || 0, icon: Pill, color: 'text-emerald-500 bg-emerald-50', section: 'Medications' },
                  { label: 'Surgical Hist', count: resident.surgicalHistory?.length || 0, icon: Scissors, color: 'text-rose-500 bg-rose-50', section: 'Surgical History' },
                  { label: 'Lab Results', count: resident.labResults?.length || 0, icon: FlaskConical, color: 'text-amber-500 bg-amber-50', section: 'Lab' },
                  { label: 'Fax Section', count: resident.faxLogs?.length || 0, icon: Printer, color: 'text-indigo-500 bg-indigo-50', section: 'Fax' },
                ].map((item, i) => (
                  <button key={i} onClick={() => openModal(item.section)} className="w-full flex items-center justify-between py-1 px-2 rounded-xl hover:bg-slate-50 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${item.color}`}>
                        <item.icon size={14} />
                      </div>
                      <span className="text-[11px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{item.label}</span>
                    </div>
                    <span className="text-[11px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">{item.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div onClick={() => openModal('Diagnosis')} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all">
              <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest ">Diagnosis</h3>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
              <div className="p-2.5 space-y-2">
                {resident.diagnosisProblems?.slice(0, 2).map((d, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {i === 0 ? <Heart size={14} className="text-red-500" /> : <Activity size={14} className="text-emerald-500" />}
                    <div>
                      <p className="text-[11px] font-bold text-slate-700">{d.name}</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{d.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div onClick={() => openModal('Lab')} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all">
              <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest  text-blue-600">Lab Results</h3>
                <ChevronDown size={14} className="text-blue-500" />
              </div>
              <div className="p-2.5 space-y-1.5">
                {resident.labResults?.slice(0, 3).map((lab, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <p className="text-[11px] font-bold text-slate-700 transition-colors group-hover:text-blue-600">{lab.name}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-black text-slate-400 ">{lab.value}</span>
                      <ChevronRight size={14} className="text-slate-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div onClick={() => openModal('Documents')} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all">
              <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-tight ">Documents</h3>
                <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                </div>
              </div>
              <div className="p-2 space-y-0.5">
                {resident.recentDocuments?.slice(0, 4).map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-xl border border-transparent hover:border-blue-100 transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      {doc.type === 'PDF' ? <FileText size={14} className="text-blue-500" /> : <Shield size={14} className="text-emerald-500" />}
                      <span className="text-[11px] font-bold text-slate-700 group-hover:text-blue-600">{doc.name}</span>
                    </div>
                    <span className={`text-[11px] font-black ${doc.status === 'Signed' ? 'text-emerald-500 bg-emerald-50' : 'text-slate-400'} px-2 rounded font-bold `}>{doc.status}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Communication & Language */}
            <div onClick={() => openModal('Communication')} className="bg-white rounded-xl border border-slate-200 shadow-sm p-2.5 cursor-pointer hover:shadow-md transition-all">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ">Communication</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-[11px] font-bold text-slate-700">
                    Language: {resident.communication?.language || (typeof resident.communication === 'string' ? resident.communication : 'English')}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-600 pl-3">
                  <span>Interpreter: {resident.communication?.interpreter || 'Not Required'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="text-[11px] font-bold text-slate-700">
                    Hearing: {resident.communication?.hearing || 'Normal'}
                  </span>
                </div>
              </div>
            </div>

            {/* Mobility & Physical Safety */}
            <div onClick={() => openModal('Mobility')} className="bg-white rounded-xl border border-slate-200 shadow-sm p-2.5 cursor-pointer hover:shadow-md transition-all">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ">Mobility & Safety</h3>
              <div className="space-y-2">
                <div className="p-1.5 bg-slate-50 border border-slate-100 rounded flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Assist:</span>
                  <span className="text-[11px] font-black text-slate-700">
                    {resident.mobility?.assist || (typeof resident.mobility === 'string' ? resident.mobility : 'Independent')}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="p-1 bg-blue-50 text-blue-700 rounded text-[9px] font-black text-center uppercase">Walker</div>
                  <div className="p-1 bg-slate-100 text-slate-400 rounded text-[9px] font-black text-center uppercase">Wheelchair</div>
                </div>
                <p className="text-[9px] text-red-500 font-bold text-center mt-1 uppercase tracking-tighter">
                  Fall Risk: {resident.mobility?.fallRisk || 'LOW'}
                </p>
              </div>
            </div>

            {/* Nutrition & Hydration */}
            <div onClick={() => openModal('Nutrition')} className="bg-emerald-50/50 rounded-xl border border-emerald-100 shadow-sm p-2.5 cursor-pointer hover:shadow-md transition-all">
              <h3 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-2 ">Nutrition & Hydration</h3>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-slate-500 uppercase tracking-tight">Diet:</span>
                  <span className="font-black text-slate-800 uppercase">
                    {resident.nutrition?.diet || (typeof resident.nutrition === 'string' ? resident.nutrition : 'Regular')}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-slate-500 uppercase tracking-tight">Fluids:</span>
                  <span className="font-black text-blue-600 uppercase">
                    {resident.nutrition?.fluids || 'Regular'}
                  </span>
                </div>
                <div className="p-1 px-2 bg-white/60 rounded border border-emerald-50 text-[9px] font-bold text-emerald-700">
                  Intake Goal: {resident.nutrition?.intakeGoal || 'N/A'}
                </div>
              </div>
            </div>

            {/* Safety & Access Control */}
            <div onClick={() => openModal('Safety')} className="bg-slate-50 rounded-xl border border-slate-200 shadow-sm p-2.5 cursor-pointer hover:shadow-md transition-all">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ">Safety & Access</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-100 flex items-center justify-center text-red-600">
                    <AlertCircle size={10} />
                  </div>
                  <span className="text-[10px] font-black text-slate-700 uppercase">
                    {resident.safety?.security || 'General Safety'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                    <User size={10} />
                  </div>
                  <span className="text-[10px] font-black text-slate-700 uppercase">
                    {resident.safety?.accessLevel || 'Standard Access'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-2">

            {/* Visit Details Section */}
            <div onClick={() => openModal('Visits')} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-2 cursor-pointer hover:shadow-md transition-all">
              <div className="p-2 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-tight">Visit Details</h3>
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">{resident.visits?.length || 0} Total Visits</span>
              </div>
              <div className="p-2 md:p-3">
                {resident.visits && resident.visits.length > 0 ? (() => {
                  return (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-slate-400 shrink-0" />
                          <div className="flex w-full border-b border-slate-100 pb-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-32">Date:</span>
                            <span className="text-[12px] font-bold text-slate-700">{latestVisit.visitDate}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-slate-400 shrink-0" />
                          <div className="flex w-full border-b border-slate-100 pb-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-32">Provider:</span>
                            <span className="text-[12px] font-bold text-blue-600 underline underline-offset-2 decoration-blue-100 decoration-2">{latestVisit.providerName}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity size={14} className="text-slate-400 shrink-0" />
                          <div className="flex w-full border-b border-slate-100 pb-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-32 whitespace-nowrap">Chief Complaint:</span>
                            <span className="text-[12px] font-bold text-slate-700 ">{latestVisit.chiefComplaint}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart size={14} className="text-red-500 shrink-0" />
                          <div className="flex w-full border-b border-slate-100 pb-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-32">Diagnosis:</span>
                            <span className="text-[12px] font-bold text-slate-700 ">{latestVisit.diagnosis}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clipboard size={14} className="text-slate-400 shrink-0" />
                          <div className="flex w-full border-b border-slate-100 pb-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-32">Procedure:</span>
                            <span className="text-[12px] font-bold text-slate-700 ">{latestVisit.procedure || '-'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Vitals</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex flex-col items-center">
                            <span className="text-[9px] font-bold text-slate-400 uppercase">BP</span>
                            <span className="text-[12px] font-black text-slate-700">{latestVisit.bp || '-'}</span>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex flex-col items-center">
                            <span className="text-[9px] font-bold text-slate-400 uppercase">Pulse</span>
                            <span className="text-[12px] font-black text-slate-700">{latestVisit.pulse || '-'}</span>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex flex-col items-center">
                            <span className="text-[9px] font-bold text-slate-400 uppercase">Temp</span>
                            <span className="text-[12px] font-black text-slate-700">{latestVisit.temp || '-'}</span>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex flex-col items-center">
                            <span className="text-[9px] font-bold text-slate-400 uppercase">Weight</span>
                            <span className="text-[12px] font-black text-slate-700">{latestVisit.weight || '-'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg relative overflow-hidden h-full">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Type: <span className="text-slate-700 font-bold uppercase">{latestVisit.visitType}</span></p>
                          </div>
                          <p className="text-[11px] font-bold text-slate-600 line-clamp-3 mt-2">{latestVisit.notes || 'No clinical notes provided for this visit.'}</p>
                        </div>
                      </div>
                    </div>
                  );
                })() : (
                  <div className="py-8 text-center bg-slate-50 rounded-xl border border-slate-100 w-full">
                    <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No visit records found</p>
                  </div>
                )}

                <div className="mt-2 pt-2 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-tight mb-1">HISTORY OF PRESENT ILLNESS</h4>
                      <p className="text-[11px] font-bold text-slate-600 leading-tight max-w-none">
                        {latestVisit.historyOfPresentIllness || resident.condition || 'No description available.'}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-tight mb-1">REVIEW OF SYSTEMS</h4>
                      <p className="text-[11px] font-bold text-slate-600 leading-tight max-w-none">
                        {latestVisit.reviewOfSystems || 'Standard assessment performed.'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-tight mb-1">PATIENT GOAL</h4>
                      <p className="text-[11px] font-bold text-slate-600 leading-tight">{resident.patientGoal || 'Maintain quality of life and independence.'}</p>
                    </div>
                    <div className="pt-2">
                      <div
                        onClick={(e) => { e.stopPropagation(); setIsECGModalOpen(true); }}
                        className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors w-fit"
                      >
                        <Activity size={12} />
                        <span className="text-[9px] font-black uppercase tracking-widest">ECG Report</span>
                      </div>
                      <div
                        onClick={(e) => { e.stopPropagation(); openModal('Documents'); }}
                        className="flex items-center gap-1.5 bg-slate-50 text-slate-600 px-2 py-1 rounded border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors mt-2 w-fit"
                      >
                        <FileText size={12} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Documents</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-tight mb-1">SURGICAL HISTORY</h4>
                      {resident.surgicalHistory && resident.surgicalHistory.length > 0 ? (
                        resident.surgicalHistory.map((s, i) => (
                          <div key={i} className="mb-2">
                            <p className="text-[11px] font-bold text-slate-700">{s.name} <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">({s.date})</span></p>
                            <p className="text-[9px] text-slate-500">{s.location}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-[11px] font-bold text-slate-400 italic leading-tight">No surgical procedures recorded.</p>
                      )}
                    </div>
                    <div className="pt-2">
                      <div
                        onClick={(e) => { e.stopPropagation(); openModal('Visits'); }}
                        className="flex items-center gap-1.5 bg-slate-50 text-slate-600 px-2 py-1 rounded border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors w-fit"
                      >
                        <span className="text-[9px] font-black uppercase tracking-widest">More Details</span>
                        <ChevronRight size={12} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Split Row for Medical History & Billing Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              <div onClick={() => openModal('Medical History')} className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 cursor-pointer hover:shadow-md transition-all">
                <h3 className="text-[12px] font-bold text-[#0f5b78] mb-2 uppercase tracking-tight">Medical History (MD Note)</h3>
                <ul className="text-[12px] text-slate-600 space-y-1">
                  {resident.medicalHistory && resident.medicalHistory.length > 0 ? (
                    resident.medicalHistory.slice(0, 7).map((hist, i) => (
                      <li key={i} className="flex gap-1.5 items-start">
                        <span className="text-slate-400 mt-1">&bull;</span>
                        <span className="font-bold text-slate-700">{hist.Condition || hist.name} {hist['Diagnosis Date'] && <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">({hist['Diagnosis Date']})</span>}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-slate-400 italic">No historical records available.</li>
                  )}
                </ul>
              </div>

              <div onClick={() => openModal('Billing')} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-all">
                <div className="p-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-tight ">Billing Summary</h3>
                  <button className="text-blue-600 text-[11px] font-black uppercase tracking-widest hover:underline">View All</button>
                </div>
                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  {resident.billingRecords && resident.billingRecords.length > 0 ? (
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="pb-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest ">Date</th>
                          <th className="pb-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest ">Invoice #</th>
                          <th className="pb-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest  text-right">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {resident.billingRecords.slice(0, 3).map((bill, i) => (
                          <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                            <td className="py-1.5 text-[10px] font-bold text-slate-600">{bill.serviceDate}</td>
                            <td className="py-1.5 text-[10px] font-black text-blue-600 truncate max-w-[80px]">{bill.invoiceNumber}</td>
                            <td className="py-1.5 text-[10px] font-black text-red-600 text-right">{bill.balance}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="py-6 text-center">
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">No billing history</p>
                    </div>
                  )}
                  <div className="mt-2 p-2 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Calculated Balance:</p>
                    <p className="text-[13px] font-black text-red-600 ">
                      ${resident.billingRecords?.reduce((sum, b) => sum + parseFloat(b.balance?.replace('$', '') || 0), 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Split Row for Care Plan & Social History */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2.5">
              {/* Care Plan & Goals */}
              <div onClick={() => openModal('Care Plan')} className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 cursor-pointer hover:shadow-md transition-all">
                <h3 className="text-[12px] font-bold text-[#0f5b78] mb-2 uppercase tracking-tight">Care Plan & Interventions</h3>
                <div className="space-y-2">
                  {resident.carePlan?.slice(0, 2).map((plan, i) => (
                    <div key={i} className={`p-2 border ${i === 0 ? 'border-blue-100 bg-blue-50/30' : 'border-emerald-100 bg-emerald-50/30'} rounded-lg`}>
                      <div className="flex items-center gap-2 mb-1">
                        {i === 0 ? <Activity size={14} className="text-blue-500" /> : <Heart size={14} className="text-emerald-500" />}
                        <span className="text-[11px] font-bold text-slate-700">{plan.title}</span>
                      </div>
                      <p className="text-[10px] text-slate-600 pl-6">{plan.instruction}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social History */}
              <div onClick={() => openModal('Social History')} className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 flex flex-col cursor-pointer hover:shadow-md transition-all">
                <h3 className="text-[12px] font-bold text-[#0f5b78] mb-2 shrink-0">Social History & Lifestyle</h3>
                <div className="grid grid-cols-3 gap-2 flex-1">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-center flex flex-col justify-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Tobacco</p>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">{resident.socialHistory?.tobacco || 'N/A'}</p>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-center flex flex-col justify-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Alcohol</p>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">{resident.socialHistory?.alcohol || 'N/A'}</p>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-center flex flex-col justify-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Diet</p>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">{resident.socialHistory?.diet || 'N/A'}</p>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-center flex flex-col justify-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Exercise</p>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">{resident.socialHistory?.exercise || 'N/A'}</p>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-center flex flex-col justify-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Sleep</p>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">{resident.socialHistory?.sleep || 'N/A'}</p>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-center flex flex-col justify-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Living</p>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">{resident.socialHistory?.living || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Row for Immunizations & Activity Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2.5">
              {/* Immunization History */}
              <div onClick={() => openModal('Immunizations')} className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 cursor-pointer hover:shadow-md transition-all">
                <h3 className="text-[12px] font-bold text-[#0f5b78] mb-3 uppercase tracking-tight">Immunization Record</h3>
                <div className="space-y-2">
                  {(resident.immunizations || []).map((imm, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                      <div>
                        <p className="text-[11px] font-bold text-slate-700">{imm.name}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase">{imm.provider}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-600">{imm.date}</p>
                        <span className={`text-[8px] font-black uppercase tracking-widest ${imm.status === 'Required' ? 'text-red-500' : 'text-emerald-500'}`}>{imm.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resident Activity Timeline */}
              <div onClick={() => openModal('Activities')} className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 cursor-pointer hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                  <h3 className="text-[12px] font-bold text-[#0f5b78] uppercase tracking-tight">Activity Timeline</h3>
                  <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Full Log</button>
                </div>
                <div className="space-y-3">
                  {(() => {
                    const activitiesToDisplay = (resident.activities && resident.activities.length > 0)
                      ? resident.activities
                      : [
                        { id: 1, type: 'Medication', name: 'Lisinopril 20mg Admin.', date: '08:00 AM Today', status: 'Completed' },
                        { id: 2, type: 'Vitals', name: 'Morning Vitals Check', date: '07:30 AM Today', status: 'Completed' }
                      ];

                    return activitiesToDisplay.slice(0, 3).map((act, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5 shadow-sm shadow-blue-200" />
                        <div>
                          <p className="text-[11px] font-bold text-slate-700 leading-tight">{act.name}</p>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{act.date}</p>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
            {/* Row for Labs & Care Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2.5 pb-2">
              {/* Lab Highlights */}
              <div onClick={() => openModal('Lab Highlights')} className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 cursor-pointer hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[12px] font-bold text-[#0f5b78] uppercase tracking-tight">Recent Lab Highlights</h3>
                  <FlaskConical size={14} className="text-slate-400" />
                </div>
                <div className="space-y-1.5">
                  {(resident.labResults || []).slice(0, 3).map((lab, i) => (
                    <div key={i} className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
                      <span className="text-[11px] font-bold text-slate-700">{lab.name}</span>
                      <div className="text-right">
                        <span className="text-[11px] font-black text-slate-800 mr-2">{lab.value}</span>
                        <span className={`text-[8px] font-black uppercase ${lab.status === 'High' ? 'text-red-500' : 'text-emerald-500'}`}>{lab.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Care Goals */}
              <div onClick={() => openModal('Goals')} className="bg-indigo-50/50 rounded-xl border border-indigo-100 shadow-sm p-3 cursor-pointer hover:shadow-md transition-all flex flex-col">
                <h3 className="text-[12px] font-bold text-indigo-900 mb-2 uppercase tracking-tight">Key Patient Goals</h3>
                <div className="space-y-2.5 flex-1">
                  <div className="flex gap-2">
                    <CheckCircle2 size={14} className="text-indigo-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">Remain fall-free during shift</p>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle2 size={14} className="text-slate-300 shrink-0 mt-0.5" />
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">Increase fluid intake to 1.5L</p>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle2 size={14} className="text-slate-300 shrink-0 mt-0.5" />
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">Ambulate to dining room with assist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-2">

            {/* Split Row for Insurance & Audit Trail */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2.5">
              {/* Insurance Information */}
              <div onClick={() => openModal('Insurance')} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-all">
                <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-tight ">Insurance Information</h3>
                  <MoreVertical size={14} className="text-slate-400" />
                </div>
                <div className="p-2.5 space-y-2.5 flex-1">
                  <div className="flex items-center gap-3">
                    <Shield size={14} className="text-blue-500 shrink-0" />
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Plan</p>
                      <p className="text-[11px] font-bold text-slate-700 uppercase">{resident.insurance?.plan || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Fingerprint size={14} className="text-slate-400 shrink-0" />
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Subscriber</p>
                      <p className="text-[11px] font-bold text-slate-700 leading-tight">{resident.insurance?.subscriber || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={14} className="text-slate-400 shrink-0" />
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Group ID</p>
                      <p className="text-[11px] font-bold text-slate-700">{resident.insurance?.groupId || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={14} className="text-slate-400 shrink-0" />
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">DOB</p>
                      <p className="text-[11px] font-bold text-slate-700">{resident.dob || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audit Trail Section */}
              <div onClick={() => openModal('Audit Trail')} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden pb-2 flex flex-col cursor-pointer hover:shadow-md transition-all">
                <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest ">Audit Trail</h3>
                  <ChevronDown size={14} className="text-slate-400" />
                </div>
                <div className="p-2.5 space-y-3 flex-1">
                  {(resident.auditTrail || []).map((audit, i, arr) => (
                    <div key={i} className="relative flex gap-2.5">
                      {i !== arr.length - 1 && (
                        <div className="absolute left-[7px] top-4 -bottom-4 w-[2px] bg-slate-100 z-0" />
                      )}
                      <div className={`w-4 h-4 rounded-full ${audit.color || 'bg-blue-600'} ring-4 ring-white z-10 shrink-0 mt-1`} />
                      <div className="space-y-1 w-full pb-0.5">
                        <p className="text-[11px] font-bold text-slate-700 leading-tight">{audit.text}</p>
                        <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{audit.date}</span>
                          <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded leading-none">{audit.user}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Discharge Summary */}
            <div onClick={() => openModal('Discharge Summary')} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-2.5 cursor-pointer hover:shadow-md transition-all">
              <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest ">Discharge Summary</h3>
                <Clipboard size={14} className="text-slate-400" />
              </div>
              <div className="p-2.5 space-y-2">
                <div className="flex items-center gap-2 mb-1.5 pb-1.5 border-b border-slate-50">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status:</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{resident.dischargeSummary?.status || 'Stable'}</span>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Primary instruction</p>
                  <p className="text-[11px] font-bold text-slate-700 leading-tight">{resident.dischargeSummary?.instruction || 'N/A'}</p>
                </div>
                <div className="pt-1">
                  <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2 py-1.5 rounded border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors w-fit">
                    <FileText size={12} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Download PDF</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Advance Directives */}
            <div onClick={() => openModal('Advance Directives')} className="bg-amber-50 rounded-xl border border-amber-100 shadow-sm p-2.5 mb-2.5 cursor-pointer hover:shadow-md transition-all">
              <h3 className="text-[10px] font-black text-amber-800 uppercase tracking-widest mb-1.5 ">Advance Directives</h3>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold text-slate-600">DNR Status:</span>
                  <span className="font-black text-red-600 uppercase">{resident.advanceDirectives?.dnrStatus || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold text-slate-600">DNI Status:</span>
                  <span className="font-black text-red-600 uppercase">{resident.advanceDirectives?.dniStatus || 'N/A'}</span>
                </div>
                <p className="text-[9px] text-amber-700 font-bold bg-amber-100/50 p-1 rounded mt-1">Full code documentation on file ({resident.advanceDirectives?.date || 'N/A'})</p>
              </div>
            </div>

            {/* Split Row for Allergies & Medications */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2.5">
              <div onClick={() => openModal('Allergies')} className="bg-red-50 rounded-xl border border-red-100 shadow-sm overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-all">
                <div className="p-2.5 border-b border-red-100 flex items-center justify-between">
                  <h3 className="text-[12px] font-black text-red-800 uppercase tracking-tight ">Allergies</h3>
                  <div className="bg-red-100/50 px-2 py-0.5 rounded text-[9px] font-bold text-red-600 uppercase tracking-widest shrink-0">{resident.allergies?.length || 0} Active</div>
                </div>
                <div className="p-2.5 space-y-2 flex-1">
                  {resident.allergies && resident.allergies.length > 0 ? (
                    resident.allergies.map((allergy, i) => (
                      <div key={i} className={`flex flex-col gap-0.5 ${i !== resident.allergies.length - 1 ? 'pb-2 border-b border-red-100/50' : ''}`}>
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[11px] font-bold text-red-700 leading-tight">{allergy.name}</span>
                          <span className="text-[9px] font-bold text-red-400 shrink-0 mt-0.5">{allergy.severity}</span>
                        </div>
                        <p className="text-[9px] font-black text-red-500/70 uppercase tracking-widest">{allergy.reaction}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] text-red-400 italic">No active allergies recorded.</p>
                  )}
                </div>
              </div>

              {/* Active Medications Section */}
              <div onClick={() => openModal('Medications')} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-all">
                <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-tight ">Medications</h3>
                  <div className="bg-blue-50 px-2 py-0.5 rounded text-[9px] font-bold text-blue-600 uppercase tracking-widest shrink-0">{resident.medicationsList?.length || 0} Scripts</div>
                </div>
                <div className="p-2.5 space-y-2.5 flex-1">
                  {resident.medicationsList && resident.medicationsList.length > 0 ? (
                    resident.medicationsList.slice(0, 3).map((med, i) => (
                      <div key={i} className={`flex flex-col gap-0.5 ${i !== resident.medicationsList.length - 1 ? 'pb-2 border-b border-slate-50' : ''}`}>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-bold text-slate-700 leading-tight">{med.name}</span>
                          <span className="text-[10px] font-black text-slate-400 shrink-0">{med.dose}</span>
                        </div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{med.details}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] text-slate-400 italic py-4 text-center">No active medications.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Appointment Section */}
            <div onClick={() => openModal('Appointments')} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all">
              <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest ">Appointments</h3>
                <span className="bg-blue-600 text-[9px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-widest">Upcoming</span>
              </div>
              <div className="p-2.5 space-y-2">
                {resident.appointments && resident.appointments.length > 0 ? (
                  resident.appointments.slice(0, 1).map((appt, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100 w-full">
                      <Calendar size={18} className="text-blue-500 shrink-0" />
                      <div className="space-y-1">
                        <p className="text-[11px] font-black text-slate-800 ">{appt.date}</p>
                        <p className="text-[12px] font-bold text-slate-500">{appt.reason || appt.doctor} - {appt.location}</p>
                        <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Status: {appt.status || 'Scheduled'}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] text-slate-400 italic py-2 text-center">No upcoming appointments.</p>
                )}
              </div>
            </div>

            {/* Care Team */}
            <div onClick={() => openModal('Care Team')} className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 cursor-pointer hover:shadow-md transition-all">
              <h3 className="text-[12px] font-bold text-[#0f5b78] mb-2">Care Team</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">ER</div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">Dr. Emily Roberts</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase">Primary Care</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">JC</div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">Dr. John Chen</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase">Cardiology</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferred Pharmacy */}
            <div onClick={() => openModal('Pharmacy')} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all">
              <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-tight ">Pharmacy</h3>
                <MapPin size={14} className="text-slate-400" />
              </div>
              <div className="p-2.5">
                <p className="text-[11px] font-bold text-slate-800">CVS Pharmacy #1234</p>
                <p className="text-[10px] text-slate-500 mt-0.5">123 Main St, Springfield IL</p>
                <p className="text-[10px] font-bold text-blue-600 mt-1 cursor-pointer hover:underline">📞 (555) 987-6543</p>
              </div>
            </div>


          </div>
        </div>
      </main>

      {/* Footer / Bottom Actions */}
      <footer className="p-2.5 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest ">System Online</span>
          </div>
          <span className="text-slate-300">|</span>
          <span className="text-[11px] font-bold text-slate-400  font-mono uppercase">Last Sync: 2 mins ago</span>
        </div>
        <div className="flex gap-3">
          <button onClick={handleDownloadReport} className="px-8 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 ">Generate Patient Report</button>
        </div>
      </footer>

      {/* Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
            {renderModalContent()}
          </div>
        </div>
      )}
      {/* ECG Modal */}
      <ECGReportModal
        isOpen={isECGModalOpen}
        onClose={() => setIsECGModalOpen(false)}
        residentId={id}
      />

      {/* Resident Edit Modal */}
      <AdmitResidentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onResidentAdmitted={() => {
          fetchResident();
          setIsEditModalOpen(false);
        }}
        editData={resident}
      />
    </div>
  );
};

export default ResidentDetailPage;
