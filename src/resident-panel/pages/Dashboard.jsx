import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
   Activity, Clock, Pill, FlaskConical,
   User, Shield, Download, FileText, UserCheck, Phone, MapPin,
   ExternalLink, ChevronRight, Stethoscope, ChevronDown, Monitor,
   TrendingUp, Thermometer, Droplets, CreditCard, Edit2, Plus, DownloadCloud,
   Printer, Scissors, Fingerprint, Calendar, Heart, AlertCircle, AlertTriangle,
   ShieldCheck, MapPinIcon, Info, Edit, ArrowLeft, Clipboard, Search
} from 'lucide-react';
import { Card, Avatar, Badge, Button, Modal, Input } from '../components/ui';
import { mockUser, vitalsHistory } from '../data/mockData';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// SUB-COMPONENT: Quick Stat Card
const StatCard = ({ label, value, subValue, icon: Icon, colorClass, borderClass, onClick }) => (
   <div onClick={onClick} className="flex-1 min-w-[140px] cursor-pointer hover:-translate-y-0.5 transition-transform">
      <Card className={`border-l-4 ${borderClass} py-2 px-3 h-full`}>
         <div className="flex items-center gap-2 mb-0.5">
            <div className={`p-1 rounded-lg ${colorClass}`}>
               <Icon className="w-3 h-3 text-white" />
            </div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{label}</span>
         </div>
         <div className="flex items-baseline gap-1.5">
            <span className="text-[16px] font-extrabold text-gray-900">{value}</span>
            {subValue && <span className="text-[10px] text-gray-500 font-medium">{subValue}</span>}
         </div>
      </Card>
   </div>
);

// SUB-COMPONENT: Navigation List Item
const NavItem = ({ icon: Icon, label, value, isActive, onClick }) => (
   <div onClick={onClick} className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${isActive ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'text-gray-600 hover:bg-gray-50'}`}>
      <div className="flex items-center gap-2.5">
         <Icon className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
         <span className="text-[12px] font-semibold">{label}</span>
      </div>
      <span className="text-[10px] font-bold text-gray-400">{value}</span>
   </div>
);

const Dashboard = () => {
   const { resident } = useOutletContext();

   // Map resident data to the format expected by the dashboard UI
   const m = {
      ...resident,
      activeProblems: resident.diagnosisProblems?.length || 0,
      medicationsCount: resident.medicationsList?.length || 0,
      fallRisk: resident.mobility?.[0]?.fallRisk || "Moderate",
      lastVisit: resident.visits?.[0]?.visitDate || "Never",
      latestVitals: resident.vitalsHistory || {},
      upcomingAppointments: resident.appointments || [],
      diagnoses: resident.diagnosisProblems || [],
      documents: resident.recentDocuments || [],
      faxes: resident.faxLogs || []
   };

   const [modalState, setModalState] = useState({ isOpen: false, type: null, data: null });
   const [activeTab, setActiveTab] = useState('recent_visits');

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
      doc.text(`${resident.age || resident.dob} years, ${resident.gender || 'N/A'}`, margin + 20, y);

      doc.setFont(undefined, 'bold');
      doc.text("Room:", margin + 80, y);
      doc.setFont(undefined, 'normal');
      doc.text(resident.roomNumber || resident.room || 'N/A', margin + 110, y);
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

      const vitals = resident.vitalsHistory || resident.vitals || {};
      const vitalsData = [
         ["Blood Pressure", vitals.bp || "N/A", "Heart Rate", `${vitals.hr || vitals.heartRate || "N/A"} bpm`],
         ["Weight", vitals.weight || "N/A", "Temp", `${vitals.temp || "N/A"}`]
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
         const allergyTable = allergies.map(a => [a.name, a.severity || 'N/A', a.reaction]);
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
         const medTable = meds.map(m => [m.name, m.dose, m.instructions || m.details, m.status || 'Active']);
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
         const probTable = problems.map(p => [p.name, p.onset || p.date, p.type || 'Chronic', p.status]);
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
      const ins = resident.insuranceInfo || resident.insurance || {};
      const emergency = { name: resident.emergencyContactName, phone: resident.emergencyContactPhone };

      doc.setFont(undefined, 'bold');
      doc.text("Insurance Provider:", margin, y);
      doc.setFont(undefined, 'normal');
      doc.text(ins.provider || "N/A", margin + 40, y);

      doc.setFont(undefined, 'bold');
      doc.text("Policy ID:", margin + 100, y);
      doc.setFont(undefined, 'normal');
      doc.text(ins.policyNumber || ins.id || "N/A", margin + 125, y);
      y += 10;

      doc.setFont(undefined, 'bold');
      doc.text("Emergency Contact:", margin, y);
      doc.setFont(undefined, 'normal');
      const contactInfo = emergency.name ? `${emergency.name} - ${emergency.phone}` : "N/A";
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
      doc.save(`${resident.name.replace(/\s+/g, "_")}_Health_Record.pdf`);
   };

   const openModal = (type, data = null) => {
      setModalState({ isOpen: true, type, data });
   };

   const closeModal = () => {
      setModalState({ isOpen: false, type: null, data: null });
   };

   const renderModalContent = () => {
      const { type, data } = modalState;
      if (!type) return null;

      switch (type) {
         case 'EDIT_PROFILE':
            return (
               <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <Input label="Full Name" defaultValue={m.name} />
                     <Input label="Date of Birth" defaultValue={m.dob} />
                     <Input label="Gender" defaultValue={m.gender} />
                     <Input label="Emergency Contact" defaultValue={m.emergencyContact?.name} />
                     <Input label="Emergency Phone" defaultValue={m.emergencyContact?.phone} />
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                     <Button variant="outline" onClick={closeModal}>Cancel</Button>
                     <Button onClick={() => { alert('Profile updated'); closeModal(); }}>Save Changes</Button>
                  </div>
               </div>
            );
         case 'VIEW_METRIC':
            return (
               <div className="space-y-4">
                  <h4 className="font-bold text-gray-700">{data?.title}</h4>
                  <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center py-8 border border-gray-100">
                     {data?.icon && <data.icon className="w-12 h-12 text-gray-400 mb-2" />}
                     <span className="text-2xl font-black text-gray-900">{data?.value} {data?.subValue}</span>
                     <p className="text-sm text-gray-500 mt-2">Historical data trend unavailable in mock mode.</p>
                  </div>
                  <Button className="w-full" onClick={closeModal}>Close</Button>
               </div>
            );
         case 'VIEW_LIST':
            return (
               <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  <h4 className="font-bold text-gray-700">{data?.title}</h4>
                  {data?.items?.length > 0 ? (
                     <div className="space-y-2">
                        {data.items.map((item, i) => (
                           <div key={i} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                              <div className="font-bold text-sm text-gray-800">{item?.name || item?.type || item?.title || item?.id || 'Details'}</div>
                              <div className="text-xs text-gray-500 mt-1">{item?.date || item?.instruction || (item?.amount ? `$${item.amount}` : '')}</div>
                           </div>
                        ))}
                     </div>
                  ) : (
                     <p className="text-gray-500 text-sm">No records found.</p>
                  )}
                  <Button className="w-full mt-4" onClick={closeModal}>Close</Button>
               </div>
            );
         case 'VIEW_DOCUMENT':
            return (
               <div className="space-y-4">
                  <div className="bg-gray-50 h-56 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
                     <FileText className="w-12 h-12 text-gray-300 mb-2" />
                     <p className="text-sm font-bold text-gray-600">{data?.name}</p>
                     <p className="text-xs text-gray-400 mt-1">Preview not available in demo</p>
                  </div>
                  <div className="flex gap-2">
                     <Button variant="outline" className="flex-1" onClick={closeModal}>Cancel</Button>
                     <Button className="flex-1 bg-gray-900 text-white" onClick={() => { alert('Downloading...'); closeModal(); }}><Download className="w-4 h-4 mr-2" /> Download File</Button>
                  </div>
               </div>
            );
         case 'VIEW_ECG':
            return (
               <div className="space-y-4">
                  <div className="h-40 bg-gray-900 rounded-xl overflow-hidden relative flex flex-col items-center justify-center p-4">
                     <svg className="w-full h-20 text-emerald-400 opacity-80" viewBox="0 0 200 60" fill="none">
                        <path d="M0 30 L20 30 L25 10 L30 50 L35 30 L60 30 L65 10 L70 50 L75 30 L100 30 L105 10 L110 50 L115 30 L140 30 L145 10 L150 50 L155 30 L180 30 L185 10 L190 50 L200 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                     <p className="text-emerald-400 text-xs font-mono mt-4 font-bold tracking-widest">RECORDING ACTIVE... NORMAL SINUS RHYTHM</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center text-sm">
                     <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg shadow-sm"><span className="font-bold text-gray-500 block text-[10px] uppercase">HR</span> <span className="font-black text-gray-900">72 bpm</span></div>
                     <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg shadow-sm"><span className="font-bold text-gray-500 block text-[10px] uppercase">PR INT</span> <span className="font-black text-gray-900">0.16s</span></div>
                     <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg shadow-sm"><span className="font-bold text-gray-500 block text-[10px] uppercase">QRS</span> <span className="font-black text-gray-900">0.08s</span></div>
                     <div className="bg-gray-50 border border-gray-100 p-2 rounded-lg shadow-sm"><span className="font-bold text-gray-500 block text-[10px] uppercase">QTc</span> <span className="font-black text-gray-900">0.41s</span></div>
                  </div>
                  <Button className="w-full" onClick={closeModal}>Close Analysis</Button>
               </div>
            );
         case 'MAP_VIEW':
            return (
               <div className="space-y-4">
                  <div className="h-48 bg-blue-50 rounded-lg flex flex-col items-center justify-center border border-blue-100 relative overflow-hidden">
                     <MapPin className="w-8 h-8 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                     <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                  </div>
                  <div className="text-center">
                     <p className="font-bold text-gray-900 text-lg">{data?.name}</p>
                     <p className="text-sm text-gray-500">{data?.address || '123 Pharmacy Lane, Healthville'}</p>
                  </div>
                  <div className="flex gap-2">
                     <Button variant="outline" className="flex-1" onClick={closeModal}>Close</Button>
                     <Button className="flex-1" onClick={() => { alert('Getting directions...'); closeModal(); }}><ExternalLink className="w-4 h-4 mr-2" /> Directions</Button>
                  </div>
               </div>
            );
         case 'GENERIC_MESSAGE':
            return (
               <div className="space-y-4 text-center py-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                     <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">{data?.title}</h3>
                  <p className="text-sm text-gray-500 px-4 leading-relaxed">{data?.message}</p>
                  <Button className="w-full mt-6" onClick={closeModal}>Acknowledge</Button>
               </div>
            );
         case 'VIEW_STATEMENT':
            return (
               <div className="space-y-4">
                  <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-inner max-h-[70vh] overflow-y-auto custom-scrollbar font-sans">
                     <div className="flex justify-between items-start border-b-2 border-gray-900 pb-4 mb-4">
                        <div>
                           <h2 className="text-xl font-black text-gray-900 uppercase">OFFICIAL STATEMENT</h2>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">HealthCare Systems Inc.</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-black text-gray-400 uppercase">Invoice #</p>
                           <p className="text-sm font-black text-blue-600">{data?.id}</p>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-8 mb-6">
                        <div>
                           <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Bill To</p>
                           <p className="text-[11px] font-bold text-gray-800">{m.name}</p>
                           <p className="text-[10px] text-gray-500">{m.address}</p>
                           <p className="text-[10px] text-gray-500">Patient ID: {m.id}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Statement Date</p>
                           <p className="text-[11px] font-bold text-gray-800">{data?.date}</p>
                           <p className="text-[9px] font-black text-rose-500 uppercase mt-2">Due Date</p>
                           <p className="text-[11px] font-bold text-rose-600">Within 15 Days</p>
                        </div>
                     </div>

                     <table className="w-full text-left text-[11px] mb-8">
                        <thead className="bg-gray-900 text-white font-bold uppercase text-[9px]">
                           <tr>
                              <th className="py-2 px-3">Service Code</th>
                              <th className="py-2 px-3">Description</th>
                              <th className="py-2 px-3 text-right">Charge</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                           <tr>
                              <td className="py-3 px-3 font-bold text-gray-600">99214</td>
                              <td className="py-3 px-3">
                                 <p className="font-bold text-gray-800">Office Visit, Established Patient</p>
                                 <p className="text-[9px] text-gray-400">Moderate complexity, 30-39 minutes</p>
                              </td>
                              <td className="py-3 px-3 text-right font-black">${(data?.amount || 0).toFixed(2)}</td>
                           </tr>
                           <tr className="bg-gray-50/50">
                              <td className="py-3 px-3 font-bold text-gray-600">80053</td>
                              <td className="py-3 px-3">
                                 <p className="font-bold text-gray-800">Comprehensive Metabolic Panel</p>
                                 <p className="text-[9px] text-gray-400">Blood chemistry screening</p>
                              </td>
                              <td className="py-3 px-3 text-right font-black">$0.00 <span className="text-[8px] text-emerald-500">(INSURED)</span></td>
                           </tr>
                        </tbody>
                        <tfoot>
                           <tr className="border-t-2 border-gray-900">
                              <td colSpan="2" className="py-4 text-right font-black text-gray-400 uppercase tracking-widest">Total Patient Responsibility</td>
                              <td className="py-4 text-right font-black text-[14px] text-gray-900">${(data?.amount || 0).toFixed(2)}</td>
                           </tr>
                        </tfoot>
                     </table>

                     <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-lg">
                        <p className="text-[10px] font-black text-[#129FED] uppercase mb-1">Insurance Notes</p>
                        <p className="text-[10px] text-gray-600 leading-relaxed italic">
                           "Your insurance provider ({m.insurance?.plan}) has been billed for this visit. The amount above represents your co-pay or deductible responsibility as of this statement date."
                        </p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <Button variant="outline" className="flex-1" onClick={closeModal}>Close</Button>
                     <Button className="flex-1 bg-gray-900 text-white" onClick={() => { alert('Downloading Statement PDF...'); closeModal(); }}><Printer className="w-4 h-4 mr-2" /> Download Copy</Button>
                  </div>
               </div>
            );
         default:
            return null;
      }
   };

   return (
      <div className="max-w-full mx-auto space-y-4 pb-10">

         <Card className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-14 z-40">
            <div className="p-3 md:p-4 flex flex-col md:flex-row gap-4 md:gap-6 pl-4">
               {/* Profile Sidebar */}
               <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden ring-1 ring-slate-100">
                     {resident.photo ? (
                        <img src={resident.photo} alt={resident.name} className="w-full h-full object-cover" />
                     ) : (
                        <User size={48} className="text-slate-300" />
                     )}
                  </div>
                  <button
                     onClick={() => openModal('EDIT_PROFILE')}
                     className="mt-2 flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-tight hover:bg-blue-100 transition-colors"
                  >
                     <Edit size={12} />
                     Edit
                  </button>
               </div>

               <div className="flex-1 space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                     <div>
                        <h1 className="text-xl font-black text-slate-800 tracking-tight uppercase leading-none mb-1">
                           {resident.name}
                        </h1>
                        <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
                           <div className="flex items-center gap-1 text-slate-400">
                              <Fingerprint size={12} />
                              <span className="text-[10px] font-bold uppercase tracking-tight">ID: <span className="text-slate-800">{resident.id}</span></span>
                           </div>
                           <div className="flex items-center gap-1 text-slate-400">
                              <Calendar size={12} />
                              <span className="text-[10px] font-bold uppercase tracking-tight">DOB: <span className="text-slate-800">{resident.dob}</span></span>
                           </div>
                           <div className="flex items-center gap-1 text-slate-400">
                              <User size={12} />
                              <span className="text-[10px] font-bold uppercase tracking-tight">Gender: <span className="text-slate-800">{resident.gender}</span></span>
                           </div>
                           <div className="flex items-center gap-1 text-slate-400 pl-3 border-l border-slate-200">
                              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-widest text-[9px]">Level: {resident.levelOfCare || 'Skilled Care'}</span>
                           </div>
                           <div className="flex items-center gap-1 text-slate-400">
                              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-widest text-[9px]">Adm: {resident.admissionDate}</span>
                           </div>
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-1.5">
                        <span className={`px-2.5 py-1 ${resident.status === 'Deceased' ? 'bg-red-50 text-red-600 border-red-100' : resident.status === 'Inactive' ? 'bg-slate-50 text-slate-500 border-slate-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'} border rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm`}>
                           <Heart size={12} className={resident.status === 'Deceased' ? 'fill-red-600' : resident.status === 'Inactive' ? 'fill-slate-500' : 'fill-emerald-600'} />
                           {resident.status}
                        </span>
                        <span className="px-2.5 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                           <AlertCircle size={12} className="fill-amber-600" />
                           Resident
                        </span>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-3 gap-x-6 pt-3 border-t border-slate-100">
                     {/* Insurance & Allergy */}
                     <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                           <div className="w-6 h-6 rounded bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100">
                              <Shield size={14} />
                           </div>
                           <div>
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Insurance</p>
                              <p className="text-[11px] font-bold text-blue-600 underline underline-offset-2">{resident.insurance?.provider || resident.insurance}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                           <div className="w-6 h-6 rounded bg-red-50 flex items-center justify-center text-red-500 border border-red-100">
                              <AlertCircle size={14} />
                           </div>
                           <div>
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Allergy</p>
                              <p className="text-[11px] font-black text-red-600 truncate max-w-[120px]">{resident.allergy || 'None'}</p>
                           </div>
                        </div>
                     </div>

                     {/* Provider & Condition */}
                     <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                           <div className="w-6 h-6 rounded bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                              <User size={14} />
                           </div>
                           <div>
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Provider</p>
                              <p className="text-[11px] font-bold text-slate-700">{resident.provider}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                           <div className="w-6 h-6 rounded bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                              <Clipboard size={14} />
                           </div>
                           <div>
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Condition</p>
                              <p className="text-[11px] font-bold text-blue-600 truncate max-w-[120px]">{resident.condition || 'None'}</p>
                           </div>
                        </div>
                     </div>

                     {/* Location & Nutrition */}
                     <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                           <div className="w-6 h-6 rounded bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100">
                              <MapPin size={14} />
                           </div>
                           <div>
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Location</p>
                              <p className="text-[11px] font-bold text-slate-700">{resident.room}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                           <div className="w-6 h-6 rounded bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
                              <FileText size={14} />
                           </div>
                           <div>
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Nutrition</p>
                              <p className="text-[11px] font-bold text-slate-700">
                                 {typeof resident.nutrition === 'object' ? resident.nutrition?.diet || 'Standard Diet' : resident.nutrition}
                              </p>
                           </div>
                        </div>
                     </div>

                     {/* Contact & Address */}
                     <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                           <div className="w-6 h-6 rounded bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100">
                              <Phone size={14} />
                           </div>
                           <div>
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Phone</p>
                              <p className="text-[11px] font-bold text-slate-700">{resident.phone}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                           <div className="w-6 h-6 rounded bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                              <Search size={14} />
                           </div>
                           <div>
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Address</p>
                              <p className="text-[11px] font-bold text-slate-700 truncate max-w-[120px]">{resident.address}</p>
                           </div>
                        </div>
                     </div>

                     {/* Emergency & Access */}
                     <div className="space-y-3 border-l border-slate-100 pl-4">
                        <div className="flex items-center gap-2.5">
                           <div className="w-6 h-6 rounded bg-rose-50 flex items-center justify-center text-rose-500 border border-rose-100">
                              <Heart size={14} />
                           </div>
                           <div>
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Emergency Contact</p>
                              <p className="text-[11px] font-bold text-slate-700 leading-none mb-0.5">{resident.emergencyContactName}</p>
                              <p className="text-[10px] font-bold text-blue-600 leading-none">{resident.emergencyContactPhone}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                           <div className="w-6 h-6 rounded bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100">
                              <Shield size={14} />
                           </div>
                           <div>
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Clinical Access</p>
                              <div className="flex flex-wrap gap-1">
                                 {(resident.clinicalAccess || 'Full Assist, Interpreter Req').split(',').map((access, i) => (
                                    <span key={i} className={`text-[8px] font-black ${i % 2 === 0 ? 'text-purple-700 bg-purple-100/50' : 'text-blue-700 bg-blue-100/50'} px-1 py-0.5 rounded uppercase`}>
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
         </Card>

         {/* 2. STATS ROW */}
         <div className="flex flex-wrap gap-4">
            <StatCard label="Active Problems" value={m.activeProblems} icon={Activity} colorClass="bg-red-500" borderClass="border-l-red-500" onClick={() => openModal('VIEW_LIST', { title: 'Active Problems', items: m.diagnoses })} />
            <StatCard label="Medications" value={m.medicationsCount} subValue="Prescribed" icon={Pill} colorClass="bg-blue-500" borderClass="border-l-blue-500" onClick={() => openModal('VIEW_LIST', { title: 'Medications', items: m.medicationsList })} />
            <StatCard label="Next Appt" value={`${m.upcomingAppointments?.length || 0} Scheduled`} icon={Calendar} colorClass="bg-emerald-500" borderClass="border-l-emerald-500" onClick={() => openModal('VIEW_LIST', { title: 'Upcoming Appointments', items: m.upcomingAppointments })} />
            <StatCard label="Fall Risk" value={m.fallRisk} icon={AlertCircle} colorClass="bg-orange-500" borderClass="border-l-orange-500" onClick={() => openModal('GENERIC_MESSAGE', { title: 'Fall Risk Assessment', message: `Your current risk level is: ${m.fallRisk}. Please use assistance devices as prescribed.` })} />
            <StatCard label="Last Visit" value={m.lastVisit} icon={Clock} colorClass="bg-indigo-500" borderClass="border-l-indigo-500" onClick={() => openModal('GENERIC_MESSAGE', { title: 'Last Encounter', message: `Your last clinical visit was recorded on ${m.lastVisit}.` })} />
            <StatCard label="Latest Vitals" value={m.latestVitals?.bp} subValue="mmHg" icon={Heart} colorClass="bg-rose-500" borderClass="border-l-rose-500" onClick={() => openModal('VIEW_METRIC', { title: 'Blood Pressure', value: m.latestVitals?.bp, subValue: 'mmHg', icon: Heart })} />
         </div>

         {/* 3. MAIN DASHBOARD CONTENT */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">

            {/* LEFT NAVIGATION COLUMN */}
            <div className="lg:col-span-2 space-y-4">
               <Card className="p-2 space-y-1 bg-white/60">
                  <h3 className="text-[10px] font-extrabold text-gray-400 uppercase px-2 py-1 tracking-widest">My Health Record</h3>
                  <NavItem label="Recent Visits" value="25 Day" icon={Clock} isActive={activeTab === 'recent_visits'} onClick={() => setActiveTab('recent_visits')} />
                  <NavItem label="Diagnosis" value="20 Day" icon={Activity} isActive={activeTab === 'diagnosis'} onClick={() => setActiveTab('diagnosis')} />
                  <NavItem label="Medications" value="18 Day" icon={Pill} isActive={activeTab === 'medications'} onClick={() => setActiveTab('medications')} />
                  <NavItem label="Lab Results" value="10 Day" icon={FlaskConical} isActive={activeTab === 'lab_results'} onClick={() => setActiveTab('lab_results')} />
                  <NavItem label="Vitals" value="Today" icon={Thermometer} isActive={activeTab === 'vitals'} onClick={() => setActiveTab('vitals')} />
                  <NavItem label="Financials" value={`${m.billing?.totalBalance > 0 ? '$' + m.billing?.totalBalance.toFixed(2) : 'Paid'}`} icon={CreditCard} isActive={activeTab === 'billing'} onClick={() => setActiveTab('billing')} />
                  <NavItem label="Fax" value="3 Rec" icon={Printer} isActive={activeTab === 'faxes'} onClick={() => setActiveTab('faxes')} />
               </Card>

               {/* SURGICAL HISTORY CARD - ONLY VISIBLE IF DATA EXISTS */}
               {m.surgicalHistory?.length > 0 && (
                  <Card className="p-3 space-y-3">
                     <div className="flex items-center justify-between border-b pb-2 cursor-pointer group" onClick={() => openModal('VIEW_LIST', { title: 'Surgical History', items: m.surgicalHistory })}>
                        <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">Surgical History</h3>
                        <Scissors className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                     </div>
                     <div className="space-y-2 max-h-[120px] overflow-x-hidden overflow-y-auto custom-scrollbar pr-1">
                        {m.surgicalHistory.map((s, i) => (
                           <div key={i} className="flex flex-col cursor-pointer hover:bg-gray-50 p-1 -mx-1 px-1 rounded transition-colors" onClick={() => openModal('GENERIC_MESSAGE', { title: s.name, message: `${s.date} @ ${s.location}. ${s.notes}` })}>
                              <span className="text-[11px] font-bold text-gray-700">{s.name}</span>
                              <span className="text-[9px] text-gray-400 uppercase font-medium">{s.date}</span>
                           </div>
                        ))}
                     </div>
                  </Card>
               )}

               {m.diagnoses?.length > 0 && (
                  <Card className="p-3 space-y-3">
                     <div className="flex items-center justify-between border-b pb-2 cursor-pointer group" onClick={() => openModal('VIEW_LIST', { title: 'All Diagnoses', items: m.diagnoses })}>
                        <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">Diagnosis</h3>
                        <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                     </div>
                     <div className="space-y-2 max-h-[260px] overflow-x-hidden overflow-y-auto custom-scrollbar pr-1">
                        {m.diagnoses.map((d, i) => (
                           <div key={i} className="flex flex-col cursor-pointer hover:bg-gray-50 p-1 -mx-1 px-1 rounded transition-colors" onClick={() => openModal('GENERIC_MESSAGE', { title: d.name, message: `Diagnosed on: ${d.date}` })}>
                              <span className="text-[12px] font-bold text-gray-700">{d.name}</span>
                              <span className="text-[10px] text-gray-400">{d.date}</span>
                           </div>
                        ))}
                     </div>
                  </Card>
               )}

               {m.labResults?.length > 0 && (
                  <Card className="p-3 space-y-3">
                     <div className="flex items-center justify-between border-b pb-2 cursor-pointer group" onClick={() => openModal('VIEW_LIST', { title: 'All Lab Results', items: m.labResults })}>
                        <h3 className="text-[11px] font-bold text-gray-900 uppercase group-hover:text-blue-600 transition-colors">Lab Results</h3>
                        <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                     </div>
                     <div className="space-y-2.5 max-h-[240px] overflow-x-hidden overflow-y-auto custom-scrollbar pr-1">
                        {m.labResults.map((l, i) => (
                           <div key={i} className="flex justify-between items-center group cursor-pointer hover:bg-gray-50 p-1 -mx-1 px-1 rounded transition-colors" onClick={() => openModal('VIEW_METRIC', { title: l.name, value: l.value, icon: FlaskConical })}>
                              <span className="text-[11px] text-gray-600 font-medium group-hover:text-gray-900 transition-colors">{l.name}</span>
                              <div className="flex items-center gap-2">
                                 <span className="text-[11px] font-bold text-gray-900">{l.value}</span>
                                 <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-blue-500" />
                              </div>
                           </div>
                        ))}
                     </div>
                  </Card>
               )}

               <Card className="p-3 space-y-3 mt-auto">
                  <div className="flex items-center justify-between border-b pb-2 cursor-pointer group" onClick={() => openModal('VIEW_LIST', { title: 'Available Documents', items: m.documents })}>
                     <h3 className="text-[11px] font-bold text-gray-900 uppercase group-hover:text-blue-600 transition-colors">Documents</h3>
                     <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div className="space-y-2.5 mt-1 max-h-[240px] overflow-x-hidden overflow-y-auto custom-scrollbar pr-1">
                     {m.documents?.length > 0 ? m.documents.map((d, i) => (
                        <div key={i} className="flex justify-between items-center group cursor-pointer hover:bg-gray-50 p-1 -mx-1 px-1 rounded transition-colors" onClick={() => openModal('VIEW_DOCUMENT', { name: d.name })}>
                           <div className="flex items-center gap-2">
                              <FileText className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                              <span className="text-[11px] text-gray-600 font-medium group-hover:text-gray-900 transition-colors">{d.name}</span>
                           </div>
                           <span className={`text-[10px] font-bold ${d.status === 'No Files' ? 'text-gray-300' : d.status === 'Defined' ? 'text-emerald-500' : 'text-blue-500'}`}>{d.status}</span>
                        </div>
                     )) : (
                        <p className="text-[10px] text-gray-400 italic text-center py-4">No documents available.</p>
                     )}
                  </div>
               </Card>
            </div>

            {/* CENTER PRIMARY COLUMN */}
            <div className="lg:col-span-7 space-y-4">

               {/* TAB: RECENT VISITS (DEFAULT) */}
               {activeTab === 'recent_visits' && (
                  <Card className="p-0 overflow-hidden shadow-md border-t-4 border-t-blue-500 min-h-[400px] flex flex-col">
                     <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-[14px] font-extrabold text-gray-900 uppercase tracking-tight">Visit Details</h2>
                        <Badge variant="primary" className="bg-blue-100 text-blue-600 font-bold cursor-pointer hover:bg-blue-200 transition-colors" onClick={() => openModal('GENERIC_MESSAGE', { title: 'Visit Details', message: 'This was an in-person standard Office Visit.' })}>TYPE: OFFICE VISIT</Badge>
                     </div>

                     <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-3">
                           <div className="grid grid-cols-1 gap-2 text-[12px]">
                              <div className="space-y-1.5">
                                 <p className="flex justify-between cursor-pointer hover:text-blue-600" onClick={() => openModal('GENERIC_MESSAGE', { title: 'Visit Date', message: `Visit took place on context: ${m.lastVisit}` })}><span className="text-gray-400 flex items-center gap-1.5 font-bold uppercase text-[10px]"><Calendar className="w-3 h-3" /> Date:</span> <span className="font-bold text-gray-900">{m.lastVisit}</span></p>
                                 <p className="flex justify-between cursor-pointer hover:text-blue-600" onClick={() => openModal('VIEW_DETAILS', m.careTeam?.[0])}><span className="text-gray-400 flex items-center gap-1.5 font-bold uppercase text-[10px]"><Stethoscope className="w-3 h-3" /> Provider:</span> <span className="font-bold text-[#129FED] underline">Dr. Emily Roberts</span></p>
                                 <p className="flex justify-between cursor-pointer group" onClick={() => openModal('GENERIC_MESSAGE', { title: 'Chief Complaint', message: 'Patient reported ongoing chest pain, initiating further screening.' })}><span className="text-gray-400 flex items-center gap-1.5 font-bold uppercase text-[10px]"><Activity className="w-3 h-3" /> Chief Complain:</span> <span className="font-bold text-gray-900 group-hover:text-[#129FED]">Chest Pain</span></p>
                                 <p className="flex justify-between cursor-pointer group" onClick={() => openModal('GENERIC_MESSAGE', { title: 'Diagnosis Info', message: 'ICD-10 Code I20.9 - Angina Pectoris, unspecified' })}><span className="text-gray-400 flex items-center gap-1.5 font-bold uppercase text-[10px]"><Activity className="w-3 h-3" /> Diagnosis:</span> <span className="font-bold text-gray-900 underline group-hover:text-[#129FED]">I20.9 - Angina Pectoris</span></p>
                              </div>
                           </div>
                           <div className="bg-blue-50/40 p-3 rounded-lg border border-blue-100/50 cursor-pointer hover:bg-blue-100/50 transition-colors" onClick={() => openModal('GENERIC_MESSAGE', { title: 'History of Present Illness', message: "51-year-old male with independent chest, fast pain for the past 3 days, described as pressure-like, radiating to left arm, associated with mild shortness of breath, ECG shows changes." })}>
                              <h4 className="text-[10px] font-extrabold text-[#129FED] uppercase mb-1.5 flex justify-between items-center">History of Present Illness <ExternalLink className="w-2.5 h-2.5" /></h4>
                              <p className="text-[11px] text-gray-600 leading-relaxed italic line-clamp-2">
                                 "51-year-old male with independent chest, fast pain for the past 3 days, described as pressure-like, radiating to left arm, associated with mild shortness of breath, ECG shows changes."
                              </p>
                           </div>
                        </div>

                        <div className="space-y-3">
                           <div className="grid grid-cols-2 gap-2">
                              <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm text-center cursor-pointer hover:border-blue-300 transition-colors" onClick={() => openModal('VIEW_METRIC', { title: 'Blood Pressure', value: '120/80', subValue: 'mmHg', icon: Heart })}>
                                 <p className="text-[9px] text-gray-400 font-bold uppercase mb-0.5">BP</p>
                                 <p className="text-[13px] font-black text-gray-900">120/80</p>
                              </div>
                              <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm text-center cursor-pointer hover:border-blue-300 transition-colors" onClick={() => openModal('VIEW_METRIC', { title: 'Heart Rate', value: '72', subValue: 'bpm', icon: Activity })}>
                                 <p className="text-[9px] text-gray-400 font-bold uppercase mb-0.5">HR</p>
                                 <p className="text-[13px] font-black text-gray-900">72</p>
                              </div>
                              <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm text-center cursor-pointer hover:border-blue-300 transition-colors" onClick={() => openModal('VIEW_METRIC', { title: 'Temperature', value: '98.6', subValue: '°F', icon: Thermometer })}>
                                 <p className="text-[9px] text-gray-400 font-bold uppercase mb-0.5">Temp</p>
                                 <p className="text-[13px] font-black text-gray-900">98.6°F</p>
                              </div>
                              <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm text-center cursor-pointer hover:border-blue-300 transition-colors" onClick={() => openModal('VIEW_METRIC', { title: 'SpO2', value: '98', subValue: '%', icon: Droplets })}>
                                 <p className="text-[9px] text-gray-400 font-bold uppercase mb-0.5">O2</p>
                                 <p className="text-[13px] font-black text-gray-900">98%</p>
                              </div>
                           </div>

                           {/* ECG WAVEFORM VISUALIZATION */}
                           <div className="h-16 bg-gray-900 rounded-lg overflow-hidden relative flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-emerald-400 transition-all" onClick={() => openModal('VIEW_ECG')}>
                              <svg className="w-full h-full text-emerald-400 opacity-60" viewBox="0 0 200 60" fill="none">
                                 <path d="M0 30 L20 30 L25 10 L30 50 L35 30 L60 30 L65 10 L70 50 L75 30 L100 30 L105 10 L110 50 L115 30 L140 30 L145 10 L150 50 L155 30 L180 30 L185 10 L190 50 L200 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <Badge className="absolute top-2 right-2 bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black pointer-events-none">LIVE ECG DATA</Badge>
                           </div>

                           <div className="flex gap-2">
                              <Button variant="outline" className="flex-1 h-7 text-[10px] font-bold" onClick={() => openModal('VIEW_ECG')}><Download className="w-3 h-3 mr-1" /> ECG REPORT</Button>
                              <Button variant="outline" className="flex-1 h-7 text-[10px] font-bold" onClick={() => openModal('VIEW_LIST', { title: 'Lab Reports & Documents', items: m.documents })}><FileText className="w-3 h-3 mr-1" /> DOCUMENTS</Button>
                           </div>
                        </div>
                     </div>

                     <div className="px-4 py-2.5 bg-gray-50/30 border-t border-gray-100 flex items-center justify-between">
                        <div className="text-[10px] flex gap-2 items-center">
                           <span className="text-gray-400 font-bold uppercase">Patient Goal:</span>
                           <span className="text-gray-700 italic font-medium">"Feel as good as I can as long as I can."</span>
                        </div>
                        <Button variant="ghost" className="h-6 text-[9px] font-black text-[#129FED] uppercase tracking-wider hover:bg-blue-50" onClick={() => openModal('GENERIC_MESSAGE', { title: 'Healthcare Goals', message: 'Active goals: Reduce blood pressure by 10 points over 6 months.' })}>More Details <ChevronRight className="w-3 h-3 ml-0.5" /></Button>
                     </div>
                  </Card>
               )}

               {/* TAB: DIAGNOSES */}
               {activeTab === 'diagnosis' && (
                  <Card className="p-0 overflow-hidden shadow-md border-t-4 border-t-blue-500 min-h-[400px] flex flex-col">
                     <div className="p-3 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-[14px] font-extrabold text-gray-900 uppercase tracking-tight">Active Diagnoses</h2>
                        <Badge variant="primary" className="bg-blue-100 text-blue-600 font-bold">{m.diagnoses?.length || 0} RECORDS</Badge>
                     </div>
                     <div className="p-3 max-h-[300px] overflow-x-hidden overflow-y-auto custom-scrollbar">
                        <div className="space-y-3">
                           {m.diagnoses?.map((d, i) => (
                              <div key={i} className="flex gap-3.5 p-3 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow cursor-pointer bg-white" onClick={() => openModal('GENERIC_MESSAGE', { title: d.name, message: d.notes })}>
                                 <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                    <Activity className="w-4.5 h-4.5 text-blue-500" />
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-0.5 gap-2">
                                       <h3 className="text-[12px] font-extrabold text-gray-900 truncate">{d.name}</h3>
                                       <Badge className="bg-rose-50 text-rose-600 border-none text-[8px] uppercase shrink-0 px-1.5 py-0">{d.level}</Badge>
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-bold mb-1.5 uppercase">Diagnosed on <span className="text-gray-700">{d.date}</span></p>
                                    <p className="text-[11px] text-gray-600 italic bg-gray-50 p-1 rounded-lg border border-gray-100 line-clamp-2">{d.notes}</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div className="px-4 py-2 bg-gray-50/30 border-t border-gray-100 mt-auto flex items-center justify-between">
                        <div className="text-[10px] flex gap-2 items-center">
                           <span className="text-gray-400 font-bold uppercase">Condition Count:</span>
                           <span className="text-gray-700 font-bold">{m.diagnoses?.length} Active Problems</span>
                        </div>
                        <Button variant="ghost" className="h-6 text-[9px] font-black text-[#129FED] uppercase hover:bg-blue-50" onClick={() => openModal('VIEW_LIST', { title: 'All Diagnoses', items: m.diagnoses })}>Full History <ChevronRight className="w-3 h-3 ml-0.5" /></Button>
                     </div>
                  </Card>
               )}

               {/* TAB: MEDICATIONS */}
               {activeTab === 'medications' && (
                  <Card className="p-0 overflow-hidden shadow-md border-t-4 border-t-blue-500 min-h-[400px] flex flex-col">
                     <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-[14px] font-extrabold text-gray-900 uppercase tracking-tight">Current Medications</h2>
                        <Badge variant="primary" className="bg-blue-100 text-blue-600 font-bold">{m.medicationsList?.length || 0} ACTIVE</Badge>
                     </div>
                     <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-x-hidden overflow-y-auto custom-scrollbar">
                        {m.medicationsList?.map((med, i) => (
                           <div key={i} className="flex gap-3 p-3 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow bg-white">
                              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                 <Pill className="w-4.5 h-4.5 text-blue-500" />
                              </div>
                              <div className="min-w-0 flex-1">
                                 <h3 className="text-[12px] font-extrabold text-gray-900 uppercase truncate">{med.name}</h3>
                                 <p className="text-[10px] font-black text-[#129FED] mb-0.5 truncate">{med.dose} • {med.type}</p>
                                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight leading-tight">{med.instructions}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="px-4 py-2 bg-gray-50/30 border-t border-gray-100 mt-auto flex items-center justify-between">
                        <div className="text-[10px] flex gap-2 items-center">
                           <span className="text-gray-400 font-bold uppercase">Pharmacy:</span>
                           <span className="text-gray-700 font-bold">CVS #1234 • ACTIVE</span>
                        </div>
                        <Button variant="ghost" className="h-6 text-[9px] font-black text-[#129FED] uppercase hover:bg-blue-50" onClick={() => openModal('VIEW_LIST', { title: 'Scripts History', items: m.medicationsList })}>Refill Status <ChevronRight className="w-3 h-3 ml-0.5" /></Button>
                     </div>
                  </Card>
               )}

               {/* TAB: VITALS */}
               {activeTab === 'vitals' && (
                  <Card className="p-0 overflow-hidden shadow-md border-t-4 border-t-rose-500 min-h-[400px] flex flex-col">
                     <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-[14px] font-extrabold text-gray-900 uppercase tracking-tight">Vitals History</h2>
                        <Badge variant="primary" className="bg-rose-100 text-rose-600 font-bold">LATEST: {m.latestVitals?.bp}</Badge>
                     </div>
                     <div className="p-0 max-h-[420px] overflow-x-hidden overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left text-[11px]">
                           <thead className="bg-gray-50/50 border-b border-gray-100 text-[9px] font-extrabold text-gray-400 uppercase tracking-widest sticky top-0 z-10 backdrop-blur-sm">
                              <tr>
                                 <th className="py-2.5 px-4">Date</th>
                                 <th className="py-2.5 px-3">BP (mmHg)</th>
                                 <th className="py-2.5 px-3">HR (bpm)</th>
                                 <th className="py-2.5 px-3">Temp</th>
                                 <th className="py-2.5 px-3">SpO2</th>
                                 <th className="py-2.5 px-3">Weight</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-50">
                              {vitalsHistory.map((v, i) => (
                                 <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-3 px-4 font-bold text-gray-900">{v.date}</td>
                                    <td className="py-3 px-3 font-black text-gray-700">{v.bp}</td>
                                    <td className="py-3 px-3 font-bold text-gray-600">{v.hr}</td>
                                    <td className="py-3 px-3 font-medium text-gray-500">{v.temp}</td>
                                    <td className="py-3 px-3 font-bold text-blue-600">{v.o2}</td>
                                    <td className="py-3 px-3 font-medium text-gray-500">{v.wt}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </Card>
               )}

               {/* TAB: FAX */}
               {activeTab === 'faxes' && (
                  <Card className="p-0 overflow-hidden shadow-md border-t-4 border-t-indigo-500 min-h-[400px] flex flex-col">
                     <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-[14px] font-extrabold text-gray-900 uppercase tracking-tight">Fax Communications</h2>
                        <Badge variant="primary" className="bg-indigo-100 text-indigo-600 font-bold">{m.faxes?.length || 0} RECORDS</Badge>
                     </div>
                     <div className="p-4 space-y-3 max-h-[420px] overflow-x-hidden overflow-y-auto custom-scrollbar">
                        {m.faxes?.map((f, i) => (
                           <div key={i} className="flex items-center gap-4 p-3 border border-gray-100 rounded-lg bg-white hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => openModal('GENERIC_MESSAGE', { title: f.name, message: `Status: ${f.status} on ${f.date}. ${f.from ? 'From: ' + f.from : 'To: ' + f.to}` })}>
                              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
                                 <Printer className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                 <h3 className="text-[12px] font-extrabold text-gray-900 truncate uppercase tracking-tight">{f.name}</h3>
                                 <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{f.from ? `FROM: ${f.from}` : `TO: ${f.to}`} • {f.date}</p>
                              </div>
                              <Badge className={`${f.status === 'Success' || f.status === 'Sent' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'} border-none text-[8px] font-black uppercase`}>{f.status}</Badge>
                           </div>
                        ))}
                     </div>
                  </Card>
               )}

                {/* TAB: BILLING / FINANCIALS */}
               {activeTab === 'billing' && (
                  <Card className="p-0 overflow-hidden shadow-md border-t-4 border-t-blue-500 min-h-[400px] flex flex-col">
                     <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-[14px] font-extrabold text-gray-900 uppercase tracking-tight">Financial Statement & Billing</h2>
                        <div className="flex gap-2">
                           <Badge variant="primary" className="bg-emerald-100 text-emerald-600 font-bold uppercase tracking-widest">{m.insurance?.plan || 'Medicare'}</Badge>
                           <Badge variant="primary" className="bg-blue-100 text-blue-600 font-bold">ACC # {m.id}</Badge>
                           <Badge variant="primary" className="bg-rose-100 text-rose-600 font-bold">BALANCE: ${m.billing?.totalBalance.toFixed(2)}</Badge>
                        </div>
                     </div>
                     <div className="p-0 max-h-[420px] overflow-x-hidden overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left text-[11px]">
                           <thead className="bg-gray-50/50 border-b border-gray-100 text-[9px] font-extrabold text-gray-400 uppercase tracking-widest sticky top-0 z-10 backdrop-blur-sm">
                              <tr>
                                 <th className="py-2.5 px-4">Date</th>
                                 <th className="py-2.5 px-3">Description</th>
                                 <th className="py-2.5 px-3">Invoice #</th>
                                 <th className="py-2.5 px-3 text-right">Amount</th>
                                 <th className="py-2.5 px-3 text-right">Status</th>
                                 <th className="py-2.5 px-4 text-center">Actions</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-50">
                              {m.billing?.records?.map((record, i) => (
                                 <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="py-3 px-4 font-bold text-gray-900">{record.date}</td>
                                    <td className="py-3 px-3">
                                       <span className="font-bold text-gray-700">{record.type || 'Services Rendered'}</span>
                                       <p className="text-[9px] text-gray-400 font-medium uppercase mt-0.5">Primary Care Visit</p>
                                    </td>
                                    <td className="py-3 px-3 font-extrabold text-[#129FED]">{record.id}</td>
                                    <td className="py-3 px-3 text-right font-black text-gray-900">${record.amount.toFixed(2)}</td>
                                    <td className="py-3 px-3 text-right">
                                       <Badge className={`${record.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'} border-none text-[8px] font-black uppercase px-1.5 py-0`}>{record.status}</Badge>
                                    </td>
                                    <td className="py-3 px-4">
                                       <div className="flex justify-center gap-2">
                                          <button 
                                             onClick={() => openModal('VIEW_STATEMENT', record)}
                                             className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                             title="View Statement"
                                          >
                                             <FileText size={14} />
                                          </button>
                                          {record.status !== 'PAID' && (
                                             <button 
                                                onClick={() => alert(`Initiating payment for invoice ${record.id}...`)}
                                                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                                                title="Pay Now"
                                             >
                                                <CreditCard size={14} />
                                             </button>
                                           )}
                                        </div>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                     <div className="px-4 py-3 bg-gray-50/30 border-t border-gray-100 mt-auto flex items-center justify-between">
                        <div className="flex gap-4">
                           <div className="text-[10px] flex gap-2 items-center">
                              <span className="text-gray-400 font-bold uppercase tracking-widest">Next Due:</span>
                              <span className="text-gray-700 font-black">Mar 15, 2025</span>
                           </div>
                           <div className="text-[10px] flex gap-2 items-center">
                              <span className="text-gray-400 font-bold uppercase tracking-widest">Auto-Pay:</span>
                              <span className="text-emerald-600 font-black">ENABLED (Visa ending 4242)</span>
                           </div>
                        </div>
                        <Button variant="ghost" className="h-7 text-[10px] font-black text-[#129FED] uppercase tracking-widest hover:bg-blue-50" onClick={() => openModal('GENERIC_MESSAGE', { title: 'Financial Assistance', message: 'You are currently eligible for our Sliding Scale Fee program. Contact billing at (555) 012-3456 for details.' })}>Billing Support <ChevronRight className="w-3.5 h-3.5 ml-1" /></Button>
                     </div>
                  </Card>
               )}

               {/* CARE PLAN & SURGICAL HISTORY GRID */}
               {(m.carePlan?.length > 0 || m.surgicalHistory?.length > 0) && (
                  <div className={`grid grid-cols-1 ${m.carePlan?.length > 0 && m.surgicalHistory?.length > 0 ? 'md:grid-cols-2' : ''} gap-5`}>
                     {m.carePlan?.length > 0 && (
                        <Card className="p-0 overflow-hidden shadow-sm h-full flex flex-col">
                           <div className="p-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                 <Activity className="w-4 h-4 text-[#129FED]" />
                                 <h3 className="text-[12px] font-extrabold text-gray-900 uppercase">Care Plan & Interventions</h3>
                              </div>
                              <Button variant="ghost" className="p-0 h-5 w-5" onClick={() => openModal('GENERIC_MESSAGE', { title: 'Add Intervention', message: 'Functionality to request new care plan tasks will be available shortly.' })}><Plus className="w-4 h-4 text-blue-500" /></Button>
                           </div>
                           <div className="p-3 space-y-3 max-h-[140px] overflow-x-hidden overflow-y-auto custom-scrollbar pr-2">
                              {m.carePlan.map((plan, i) => (
                                 <div key={i} className="flex gap-3 items-center group cursor-pointer hover:bg-gray-50 p-1 -mx-1 px-1 rounded transition-colors" onClick={() => openModal('GENERIC_MESSAGE', { title: plan.title, message: plan.instruction })}>
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                       {plan.icon === 'Activity' ? <TrendingUp className="w-4 h-4 text-[#129FED]" /> : <UserCheck className="w-4 h-4 text-[#129FED]" />}
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-[12px] font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">{plan.title}</p>
                                       <p className="text-[11px] text-gray-500 leading-snug">{plan.instruction}</p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </Card>
                     )}

                     {m.surgicalHistory?.length > 0 && (
                        <Card className="p-0 overflow-hidden shadow-sm h-full flex flex-col">
                           <div className="p-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                 <Scissors className="w-4 h-4 text-[#129FED]" />
                                 <h3 className="text-[12px] font-extrabold text-gray-900 uppercase">Surgical History</h3>
                              </div>
                              <Button variant="ghost" className="p-0 h-5 w-5" onClick={() => openModal('VIEW_LIST', { title: 'Surgical History', items: m.surgicalHistory })}><ChevronRight className="w-4 h-4 text-gray-400" /></Button>
                           </div>
                           <div className="p-4 space-y-4 max-h-[140px] overflow-x-hidden overflow-y-auto custom-scrollbar">
                              {m.surgicalHistory.map((s, i) => (
                                 <div key={i} className="flex gap-3 items-center group cursor-pointer hover:bg-gray-50 p-1 -mx-1 rounded transition-colors" onClick={() => openModal('GENERIC_MESSAGE', { title: s.name, message: `${s.date} @ ${s.location}. ${s.notes}` })}>
                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                                       <Monitor className="w-4 h-4 text-indigo-500" />
                                    </div>
                                    <div>
                                       <p className="text-[12px] font-extrabold text-gray-900 uppercase group-hover:text-blue-600 tracking-tight">{s.name}</p>
                                       <p className="text-[10px] text-gray-500 font-bold uppercase">{s.date} • {s.location}</p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </Card>
                     )}
                  </div>
               )}

               {/* VITALS & SOCIAL HISTORY GRID */}
               {(m.latestVitals || m.socialHistory) && (
                  <div className={`grid grid-cols-1 ${m.latestVitals && m.socialHistory ? 'md:grid-cols-2' : ''} gap-5`}>
                     {m.latestVitals && (
                        <Card className="p-0 overflow-hidden shadow-sm h-full flex flex-col">
                           <div className="p-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                 <Thermometer className="w-4 h-4 text-[#129FED]" />
                                 <h3 className="text-[12px] font-extrabold text-gray-900 uppercase">Vitals Overview</h3>
                              </div>
                              <Button variant="ghost" className="p-0 h-5 w-5" onClick={() => setActiveTab('vitals')}><ExternalLink className="w-3.5 h-3.5 text-blue-500" /></Button>
                           </div>
                           <div className="p-3 grid grid-cols-3 gap-2">
                              <div className="bg-gray-50 p-2 rounded text-center border border-gray-100 cursor-pointer hover:border-blue-200 transition-colors" onClick={() => openModal('VIEW_METRIC', { title: 'Weight', value: m.latestVitals?.weight, icon: Scale })}>
                                 <p className="text-[8px] font-bold text-gray-400 uppercase">Weight</p>
                                 <p className="text-[13px] font-black text-gray-900">{m.latestVitals?.weight}</p>
                              </div>
                              <div className="bg-gray-50 p-2 rounded text-center border border-gray-100 cursor-pointer hover:border-blue-200 transition-colors" onClick={() => openModal('VIEW_METRIC', { title: 'Height', value: m.latestVitals?.height, icon: Ruler })}>
                                 <p className="text-[8px] font-bold text-gray-400 uppercase">Height</p>
                                 <p className="text-[13px] font-black text-gray-900">{m.latestVitals?.height}</p>
                              </div>
                              <div className="bg-gray-50 p-2 rounded text-center border border-gray-100 cursor-pointer hover:border-blue-200 transition-colors" onClick={() => openModal('VIEW_METRIC', { title: 'BMI', value: m.latestVitals?.bmi, icon: Activity })}>
                                 <p className="text-[8px] font-bold text-gray-400 uppercase">BMI</p>
                                 <p className="text-[13px] font-black text-blue-600">{m.latestVitals?.bmi}</p>
                              </div>
                              <div className="bg-gray-50 p-2 rounded text-center border border-gray-100 cursor-pointer hover:border-blue-200 transition-colors" onClick={() => openModal('VIEW_METRIC', { title: 'Glucose', value: '105', subValue: 'mg/dL', icon: Droplets })}>
                                 <p className="text-[8px] font-bold text-gray-400 uppercase">Glucose</p>
                                 <p className="text-[13px] font-black text-orange-600">105</p>
                              </div>
                              <div className="bg-gray-50 p-2 rounded text-center border border-gray-100 cursor-pointer hover:border-blue-200 transition-colors" onClick={() => openModal('VIEW_METRIC', { title: 'RR', value: '16', subValue: 'bpm', icon: Activity })}>
                                 <p className="text-[8px] font-bold text-gray-400 uppercase">Respiration</p>
                                 <p className="text-[13px] font-black text-gray-900">16</p>
                              </div>
                              <div className="bg-gray-50 p-2 rounded text-center border border-gray-100 cursor-pointer hover:border-blue-200 transition-colors" onClick={() => openModal('VIEW_METRIC', { title: 'Pain', value: '0/10', icon: AlertCircle })}>
                                 <p className="text-[8px] font-bold text-gray-400 uppercase">Pain</p>
                                 <p className="text-[13px] font-black text-emerald-600">0/10</p>
                              </div>
                           </div>
                        </Card>
                     )}

                     {m.socialHistory && (
                        <Card className="p-0 overflow-hidden shadow-sm h-full flex flex-col">
                           <div className="p-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                 <User className="w-4 h-4 text-[#129FED]" />
                                 <h3 className="text-[12px] font-extrabold text-gray-900 uppercase">Social History & Lifestyle</h3>
                              </div>
                              <Button variant="ghost" className="p-0 h-5 w-5" onClick={() => openModal('EDIT_PROFILE')}><Edit2 className="w-3.5 h-3.5 text-gray-400" /></Button>
                           </div>
                           <div className="p-3 grid grid-cols-2 gap-3">
                              <div className="space-y-1 cursor-pointer group" onClick={() => openModal('GENERIC_MESSAGE', { title: 'Tobacco Use', message: `Current Status: ${m.socialHistory?.tobacco}` })}>
                                 <p className="text-[9px] font-extrabold text-gray-400 uppercase">Tobacco</p>
                                 <p className="text-[11px] font-bold text-gray-700 group-hover:text-blue-600 transition-colors">{m.socialHistory?.tobacco}</p>
                              </div>
                              <div className="space-y-1 cursor-pointer group" onClick={() => openModal('GENERIC_MESSAGE', { title: 'Alcohol Use', message: `Current Status: ${m.socialHistory?.alcohol}` })}>
                                 <p className="text-[9px] font-extrabold text-gray-400 uppercase">Alcohol</p>
                                 <p className="text-[11px] font-bold text-gray-700 group-hover:text-blue-600 transition-colors">{m.socialHistory?.alcohol}</p>
                              </div>
                              <div className="space-y-1 cursor-pointer group" onClick={() => openModal('GENERIC_MESSAGE', { title: 'Dietary Intake', message: `Current Status: ${m.socialHistory?.diet}` })}>
                                 <p className="text-[9px] font-extrabold text-gray-400 uppercase">Diet</p>
                                 <p className="text-[11px] font-bold text-gray-700 group-hover:text-blue-600 transition-colors">{m.socialHistory?.diet}</p>
                              </div>
                              <div className="space-y-1 cursor-pointer group" onClick={() => openModal('GENERIC_MESSAGE', { title: 'Exercise Routine', message: `Current Status: ${m.socialHistory?.exercise}` })}>
                                 <p className="text-[9px] font-extrabold text-gray-400 uppercase">Exercise</p>
                                 <p className="text-[11px] font-bold text-gray-700 group-hover:text-blue-600 transition-colors">{m.socialHistory?.exercise}</p>
                              </div>
                           </div>
                        </Card>
                     )}
                  </div>
               )}

               {/* BILLING SUMMARY */}
               <Card className="p-0 overflow-hidden shadow-sm">
                  <div className="p-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#129FED]" />
                        <h3 className="text-[12px] font-extrabold text-gray-900 uppercase">Billing Summary</h3>
                     </div>
                     <button className="text-[10px] font-black text-[#129FED] uppercase hover:underline" onClick={() => openModal('VIEW_LIST', { title: 'Full Billing History', items: m.billing?.records })}>View All Records</button>
                  </div>
                  <div className="p-3">
                     <div className="overflow-x-auto max-h-[225px] overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left text-[11px]">
                           <thead>
                              <tr className="text-gray-400 font-extrabold uppercase border-b border-gray-100">
                                 <th className="pb-2">Date</th>
                                 <th className="pb-2">Invoice #</th>
                                 <th className="pb-2 text-right">Amount</th>
                                 <th className="pb-2 text-right">Status</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-50">
                              {m.billing?.records?.map((record, i) => (
                                 <tr key={i} className="hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => openModal('GENERIC_MESSAGE', { title: `Invoice ${record.id}`, message: `Invoice for $${record.amount.toFixed(2)} on ${record.date}. Status: ${record.status}` })}>
                                    <td className="py-2.5 font-bold text-gray-700">{record.date}</td>
                                    <td className="py-2.5 font-extrabold text-[#129FED]">{record.id}</td>
                                    <td className="py-2.5 text-right font-black text-gray-900">${record.amount.toFixed(2)}</td>
                                    <td className="py-2.5 text-right font-black">
                                       <Badge className={`${record.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'} border-none text-[8px] px-1.5 py-0`}>{record.status}</Badge>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                     <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-[12px]">
                        <span className="font-extrabold text-gray-400 uppercase">Total Outstanding Balance:</span>
                        <span className="font-black text-rose-600 text-[14px]">${m.billing?.totalBalance.toFixed(2)}</span>
                     </div>
                  </div>
               </Card>

               {m.dischargeSummary && (
                  <Card className="p-0 overflow-hidden shadow-sm border-l-4 border-l-emerald-500 cursor-pointer hover:shadow-md transition-shadow" onClick={() => openModal('GENERIC_MESSAGE', { title: 'Discharge Active Status', message: `Discharge Status: ${m.dischargeSummary?.status}. The discharge instructions were released to patient.` })}>
                     <div className="p-3 bg-emerald-50 content-center flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <FileText className="w-4 h-4 text-emerald-600" />
                           <h3 className="text-[12px] font-extrabold text-emerald-900 uppercase">Discharge Summary</h3>
                        </div>
                        <Badge className="bg-emerald-200 text-emerald-800 border-none font-black text-[9px] uppercase">{m.dischargeSummary?.status}</Badge>
                     </div>
                     <div className="p-3 flex flex-col md:flex-row items-center justify-between gap-3">
                           <p className="text-[11px] text-gray-600 font-medium italic truncate max-w-md"><span className="text-[10px] font-extrabold text-gray-400 not-italic uppercase mr-2">Primary Instruction:</span> "{m.dischargeSummary?.instruction}"</p>
                           <Button className="bg-[#129FED] hover:bg-blue-600 text-white font-black text-[9px] h-7 shrink-0 py-0 uppercase tracking-widest px-3" onClick={(e) => { e.stopPropagation(); handleDownloadReport(); }}><Download className="w-3.5 h-3.5 mr-2" /> Download PDF</Button>
                     </div>
                  </Card>
               )}
            </div>

            {/* RIGHT SIDEBAR COLUMN */}
            <div className="lg:col-span-3 space-y-3">

               <Card className="p-3 space-y-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => openModal('VIEW_LIST', { title: 'Insurance Details', items: [m.insurance] })}>
                  <div className="flex items-center justify-between border-b pb-2">
                     <h3 className="text-[12px] font-extrabold text-gray-900 uppercase">Insurance Information</h3>
                     <ChevronRight className="w-3 h-3 text-gray-400" />
                  </div>
                  <div className="space-y-2 text-[11px]">
                     <div className="flex justify-between"><span className="text-gray-400 font-bold uppercase tracking-tighter">Plan</span> <span className="font-extrabold text-gray-700">{m.insurance?.plan}</span></div>
                     <div className="flex justify-between"><span className="text-gray-400 font-bold uppercase tracking-tighter">Subscriber</span> <span className="font-extrabold text-gray-700">{m.insurance?.subscriber}</span></div>
                     <div className="flex justify-between"><span className="text-gray-400 font-bold uppercase tracking-tighter">Group ID</span> <span className="font-extrabold text-gray-700">{m.insurance?.groupId}</span></div>
                     <div className="flex justify-between"><span className="text-gray-400 font-bold uppercase tracking-tighter">DOB</span> <span className="font-extrabold text-gray-700">{m.dob}</span></div>
                  </div>
               </Card>

               {m.allergies?.length > 0 && (
                  <Card className="p-3 space-y-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => openModal('VIEW_LIST', { title: 'Active Allergies', items: m.allergies })}>
                     <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-[12px] font-extrabold text-gray-900 uppercase">Allergies</h3>
                        <span className="text-[10px] font-black text-rose-500">{m.allergies.length} ACTIVE</span>
                     </div>
                     <div className="space-y-3 mt-1 max-h-[140px] overflow-x-hidden overflow-y-auto custom-scrollbar pr-1">
                        {m.allergies.map((a, i) => (
                           <div key={i} className="flex justify-between items-center group">
                              <span className={`text-[12px] font-black uppercase ${a.color === 'red' ? 'text-rose-600' : 'text-orange-500'} group-hover:text-blue-600 transition-colors`}>{a.name}</span>
                              <Badge className={`${a.color === 'red' ? 'bg-rose-50 text-rose-600' : 'bg-orange-50 text-orange-600'} border-none text-[8px] font-black px-1.5 py-0`}>{a.reaction}</Badge>
                           </div>
                        ))}
                     </div>
                  </Card>
               )}

               <Card className="p-3 space-y-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => openModal('VIEW_LIST', { title: 'Active Scripts', items: m.medicationsList })}>
                  <div className="flex justify-between items-center border-b pb-2">
                     <h3 className="text-[12px] font-extrabold text-gray-900 uppercase">Medications</h3>
                     <span className="text-[10px] font-black text-[#129FED]">{m.medicationsList?.length} SCRIPTS</span>
                  </div>
                  <div className="space-y-2.5 mt-1 max-h-[320px] overflow-x-hidden overflow-y-auto custom-scrollbar pr-1">
                     {m.medicationsList?.map((med, i) => (
                        <div key={i} className="flex justify-between items-start group hover:bg-blue-50/50 p-1.5 -mx-1.5 rounded-lg transition-colors border border-transparent hover:border-blue-100">
                           <div>
                              <p className="text-[12px] font-extrabold text-gray-900 uppercase tracking-tight group-hover:text-blue-600">{med.name}</p>
                              <p className="text-[9px] text-gray-400 font-bold uppercase leading-none mt-0.5">{med.instructions}</p>
                           </div>
                           <span className="text-[11px] font-black text-gray-400 group-hover:text-[#129FED]">{med.dose}</span>
                        </div>
                     ))}
                  </div>
               </Card>

               <Card className="p-0 overflow-hidden shadow-sm flex flex-col">
                  <div className="p-2.5 bg-gray-50 flex items-center justify-between border-b border-gray-100 shrink-0">
                     <h3 className="text-[12px] font-extrabold text-gray-900 uppercase">Appointments</h3>
                     <Badge className="bg-[#129FED] text-white border-none text-[8px] font-black px-2 py-0 cursor-pointer hover:bg-blue-600 transition-colors" onClick={() => openModal('VIEW_LIST', { title: 'Upcoming Visits', items: m.upcomingAppointments })}>UPCOMING</Badge>
                  </div>
                  <div className="divide-y divide-gray-50 max-h-[274px] overflow-y-auto custom-scrollbar pr-1">
                     {m.upcomingAppointments?.map((appt, i) => (
                        <div key={i} className="p-3 cursor-pointer hover:bg-gray-50 transition-colors group" onClick={() => openModal('GENERIC_MESSAGE', { title: appt.type, message: `Your appointment is scheduled for ${appt.date} at ${appt.time} with ${appt.provider}.` })}>
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-blue-50 flex flex-col items-center justify-center border border-blue-100 text-[#129FED] shrink-0 group-hover:bg-blue-100 transition-colors">
                                 <span className="text-[9px] font-black uppercase leading-none">{appt.month}</span>
                                 <span className="text-[14px] font-black leading-none">{appt.day}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                 <p className="text-[13px] font-extrabold text-gray-900 truncate tracking-tight group-hover:text-blue-600 transition-colors">{appt.type}</p>
                                 <p className="text-[10px] text-gray-400 font-bold truncate uppercase">{appt.location}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="p-2 bg-gray-50 border-t border-gray-100 mt-auto shrink-0">
                     <Button className="w-full h-8 bg-blue-50 text-[#129FED] hover:bg-blue-100 font-black text-[10px] border-none uppercase tracking-widest shadow-none" onClick={() => openModal('VIEW_LIST', { title: 'Upcoming Visits', items: m.upcomingAppointments })}>View Full Schedule</Button>
                  </div>
               </Card>

               <div className="grid grid-cols-2 gap-3">
                  <Card className="p-3 text-center space-y-2 cursor-pointer hover:border-blue-300 transition-colors group h-full flex flex-col justify-between" onClick={() => openModal('MAP_VIEW', { name: "CVS Pharmacy #1234", address: '492 Pharmacy Ave, Suite B' })}>
                     <div className="w-10 h-10 rounded-full bg-blue-100 mx-auto flex items-center justify-center text-[#129FED] group-hover:scale-110 transition-transform">
                        <Shield className="w-5 h-5" />
                     </div>
                     <p className="text-[10px] font-extrabold text-gray-400 uppercase leading-none">Pharmacy</p>
                     <p className="text-[11px] font-bold text-gray-700 leading-tight">CVS #1234</p>
                     <Button variant="ghost" className="h-6 p-0 text-[9px] text-blue-500 font-black uppercase hover:underline hover:bg-transparent">View Map</Button>
                  </Card>
                  <Card className="p-3 text-center space-y-2 cursor-pointer hover:border-emerald-300 transition-colors group h-full flex flex-col justify-between" onClick={() => openModal('VIEW_LIST', { title: 'Care Team Directory', items: m.careTeam })}>
                     <div className="w-10 h-10 rounded-full bg-emerald-100 mx-auto flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                        <User className="w-5 h-5" />
                     </div>
                     <p className="text-[10px] font-extrabold text-gray-400 uppercase leading-none">Care Team</p>
                     <p className="text-[11px] font-bold text-gray-700 leading-tight">2 Specialists</p>
                     <Button variant="ghost" className="h-6 p-0 text-[9px] text-emerald-600 font-black uppercase hover:underline hover:bg-transparent">Contact</Button>
                  </Card>
               </div>
            </div>

         </div>

         {/* FOOTER ACTIONS */}
         <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 p-2 px-10 flex justify-between items-center z-50">
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-75" onClick={() => openModal('GENERIC_MESSAGE', { title: 'System Status', message: 'All EHR services are currently operational.' })}>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">System Online</span>
               </div>
               <span className="text-[11px] font-bold text-gray-300">LAST SYNC: 2 MINS AGO</span>
            </div>
            <div className="flex gap-4">
               <Button className="h-9 px-8 text-[11px] font-black uppercase tracking-widest bg-gray-900 text-white hover:bg-black" onClick={handleDownloadReport}>Health Record PDF</Button>
            </div>
         </div>

         {/* RENDER MODAL */}
         <Modal isOpen={modalState.isOpen} onClose={closeModal} title={modalState.type?.replace(/_/g, ' ') || 'Details'}>
            {renderModalContent()}
         </Modal>
      </div>
   );
};

export default Dashboard;
