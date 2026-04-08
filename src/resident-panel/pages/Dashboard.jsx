import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
   Activity, Clock, Pill, FlaskConical, Calendar, Heart, AlertCircle,
   User, Shield, Download, FileText, UserCheck, Phone, MapPin,
   ExternalLink, ChevronRight, Stethoscope, ChevronDown, Monitor,
   TrendingUp, Thermometer, Droplets, CreditCard, Edit2, Plus, DownloadCloud,
   Printer, Scissors
} from 'lucide-react';
import { Card, Avatar, Badge, Button, Modal, Input } from '../components/ui';
import { mockUser, vitalsHistory } from '../data/mockData';

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
   const m = mockUser; // Use rich mock data to populate all dashboard cards

   const [modalState, setModalState] = useState({ isOpen: false, type: null, data: null });
   const [activeTab, setActiveTab] = useState('recent_visits');

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
         default:
            return null;
      }
   };

   return (
      <div className="max-w-full mx-auto space-y-4 pb-10">

         {/* 1. TOP PROFILE HEADER */}
         <Card className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 p-4 bg-white/80 backdrop-blur-sm sticky top-14 z-40">
            <div className="flex items-center gap-4">
               <Avatar size="lg" initial="MJ" className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg ring-4 ring-blue-50 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => openModal('EDIT_PROFILE')} />
               <div>
                  <div className="flex items-center gap-3">
                     <h1 className="text-[18px] font-extrabold text-gray-900 tracking-tight cursor-pointer hover:text-blue-600 transition-colors" onClick={() => openModal('EDIT_PROFILE')}>{m.name}</h1>
                     <div className="flex gap-1.5 cursor-pointer" onClick={() => openModal('GENERIC_MESSAGE', { title: 'Coverage Status', message: 'Your insurance coverage is currently ACTIVE and in good standing under PLAN G.' })}>
                        <Badge variant="primary" className="bg-[#E0F2FE] text-[#0369A1] border-none font-bold text-[9px] hover:bg-blue-200 transition-colors">ACTIVE</Badge>
                        <Badge variant="warning" className="bg-[#FEF3C7] text-[#92400E] border-none font-bold text-[9px] hover:bg-amber-200 transition-colors">PLAN G</Badge>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-1 mt-1.5 text-[11px] font-medium text-gray-500">
                     <span className="flex gap-1.5 uppercase font-medium text-gray-400 cursor-pointer hover:text-gray-700 transition-colors" onClick={() => openModal('GENERIC_MESSAGE', { title: 'Patient ID', message: `Your Patient ID is ${m.id}. Have this ready when calling support.` })}><User className="w-3 h-3" /> PID: {m.id}</span>
                     <span className="flex gap-1.5 uppercase font-medium text-gray-400 cursor-pointer hover:text-gray-700 transition-colors" onClick={() => openModal('EDIT_PROFILE')}><Calendar className="w-3 h-3" /> DOB: {m.dob}</span>
                     <span className="flex gap-1.5 uppercase font-medium text-gray-400 cursor-pointer hover:text-gray-700 transition-colors" onClick={() => openModal('EDIT_PROFILE')}><Monitor className="w-3 h-3" /> GENDER: {m.gender}</span>
                     <span className="flex gap-1.5 font-medium text-[#129FED] cursor-pointer hover:underline" onClick={() => openModal('VIEW_LIST', { title: 'Insurance Info', items: [m.insurance] })}><Shield className="w-3 h-3" /> {m.insurance?.provider}</span>
                  </div>
               </div>
            </div>
            <div className="hidden xl:flex items-center gap-8 pl-8 border-l border-gray-100">
               <div className="text-center cursor-pointer hover:opacity-75 transition-opacity" onClick={() => openModal('GENERIC_MESSAGE', { title: 'Primary Provider', message: `You can message ${m.careTeam?.[0]?.name} (Cardiology) through the secure portal.` })}>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">Primary Provider</p>
                  <p className="text-[13px] font-bold text-[#129FED]">{m.careTeam?.[0]?.name}</p>
               </div>
               <div className="text-center cursor-pointer hover:opacity-75 transition-opacity" onClick={() => openModal('EDIT_PROFILE')}>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">Emergency Contact</p>
                  <p className="text-[13px] font-bold text-gray-700">{m.emergencyContact?.name}</p>
                  <p className="text-[10px] text-gray-400">{m.emergencyContact?.phone}</p>
               </div>
               <Button variant="outline" className="h-8 text-[11px] font-bold border-gray-200" onClick={() => openModal('EDIT_PROFILE')}>Edit Profile</Button>
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
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch pb-12">

            {/* LEFT NAVIGATION COLUMN */}
            <div className="lg:col-span-2 space-y-3 flex flex-col">
               <Card className="p-2 space-y-1 bg-white/60">
                  <h3 className="text-[10px] font-extrabold text-gray-400 uppercase px-2 py-1 tracking-widest">My Health Record</h3>
                  <NavItem label="Recent Visits" value="25 Day" icon={Clock} isActive={activeTab === 'recent_visits'} onClick={() => setActiveTab('recent_visits')} />
                  <NavItem label="Diagnosis" value="20 Day" icon={Activity} isActive={activeTab === 'diagnosis'} onClick={() => setActiveTab('diagnosis')} />
                  <NavItem label="Medications" value="18 Day" icon={Pill} isActive={activeTab === 'medications'} onClick={() => setActiveTab('medications')} />
                  <NavItem label="Lab Results" value="10 Day" icon={FlaskConical} isActive={activeTab === 'lab_results'} onClick={() => setActiveTab('lab_results')} />
                  <NavItem label="Vitals" value="Today" icon={Thermometer} isActive={activeTab === 'vitals'} onClick={() => setActiveTab('vitals')} />
                  <NavItem label="Fax" value="3 Rec" icon={Printer} isActive={activeTab === 'faxes'} onClick={() => setActiveTab('faxes')} />
               </Card>

               {/* SURGICAL HISTORY CARD */}
               <Card className="p-3 space-y-3">
                  <div className="flex items-center justify-between border-b pb-2 cursor-pointer group" onClick={() => openModal('VIEW_LIST', { title: 'Surgical History', items: m.surgicalHistory })}>
                     <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">Surgical History</h3>
                     <Scissors className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div className="space-y-2 max-h-[120px] overflow-x-hidden overflow-y-auto custom-scrollbar pr-1">
                     {m.surgicalHistory?.map((s, i) => (
                        <div key={i} className="flex flex-col cursor-pointer hover:bg-gray-50 p-1 -mx-1 px-1 rounded transition-colors" onClick={() => openModal('GENERIC_MESSAGE', { title: s.name, message: `${s.date} @ ${s.location}. ${s.notes}` })}>
                           <span className="text-[11px] font-bold text-gray-700">{s.name}</span>
                           <span className="text-[9px] text-gray-400 uppercase font-medium">{s.date}</span>
                        </div>
                     ))}
                  </div>
               </Card>

               <Card className="p-3 space-y-3">
                  <div className="flex items-center justify-between border-b pb-2 cursor-pointer group" onClick={() => openModal('VIEW_LIST', { title: 'All Diagnoses', items: m.diagnoses })}>
                     <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">Diagnosis</h3>
                     <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div className="space-y-2 max-h-[260px] overflow-x-hidden overflow-y-auto custom-scrollbar pr-1">
                     {m.diagnoses?.map((d, i) => (
                        <div key={i} className="flex flex-col cursor-pointer hover:bg-gray-50 p-1 -mx-1 px-1 rounded transition-colors" onClick={() => openModal('GENERIC_MESSAGE', { title: d.name, message: `Diagnosed on: ${d.date}` })}>
                           <span className="text-[12px] font-bold text-gray-700">{d.name}</span>
                           <span className="text-[10px] text-gray-400">{d.date}</span>
                        </div>
                     ))}
                  </div>
               </Card>

               <Card className="p-3 space-y-3">
                  <div className="flex items-center justify-between border-b pb-2 cursor-pointer group" onClick={() => openModal('VIEW_LIST', { title: 'All Lab Results', items: m.labResults })}>
                     <h3 className="text-[11px] font-bold text-gray-900 uppercase group-hover:text-blue-600 transition-colors">Lab Results</h3>
                     <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div className="space-y-2.5 max-h-[240px] overflow-x-hidden overflow-y-auto custom-scrollbar pr-1">
                     {m.labResults?.map((l, i) => (
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

               <Card className="p-3 space-y-3 mt-auto">
                  <div className="flex items-center justify-between border-b pb-2 cursor-pointer group" onClick={() => openModal('VIEW_LIST', { title: 'Available Documents', items: m.documents })}>
                     <h3 className="text-[11px] font-bold text-gray-900 uppercase group-hover:text-blue-600 transition-colors">Documents</h3>
                     <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div className="space-y-2.5 mt-1 max-h-[240px] overflow-x-hidden overflow-y-auto custom-scrollbar pr-1">
                     {m.documents?.map((d, i) => (
                        <div key={i} className="flex justify-between items-center group cursor-pointer hover:bg-gray-50 p-1 -mx-1 px-1 rounded transition-colors" onClick={() => openModal('VIEW_DOCUMENT', { name: d.name })}>
                           <div className="flex items-center gap-2">
                              <FileText className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                              <span className="text-[11px] text-gray-600 font-medium group-hover:text-gray-900 transition-colors">{d.name}</span>
                           </div>
                           <span className={`text-[10px] font-bold ${d.status === 'No Files' ? 'text-gray-300' : d.status === 'Defined' ? 'text-emerald-500' : 'text-blue-500'}`}>{d.status}</span>
                        </div>
                     ))}
                  </div>
               </Card>
            </div>

            {/* CENTER PRIMARY COLUMN */}
            <div className="lg:col-span-7 space-y-3 flex flex-col">

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

               {/* TAB: LAB RESULTS */}
               {activeTab === 'lab_results' && (
                  <Card className="p-0 overflow-hidden shadow-md border-t-4 border-t-blue-500 min-h-[400px] flex flex-col">
                     <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-[14px] font-extrabold text-gray-900 uppercase tracking-tight">Latest Lab Results</h2>
                        <Badge variant="primary" className="bg-blue-100 text-blue-600 font-bold">{m.labResults?.length || 0} RECORDS</Badge>
                     </div>
                     <div className="p-0 max-h-[420px] overflow-x-hidden overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left text-[11px]">
                           <thead className="bg-gray-50/50 border-b border-gray-100 text-[9px] font-extrabold text-gray-400 uppercase tracking-widest sticky top-0 z-10 backdrop-blur-sm">
                              <tr>
                                 <th className="py-2.5 px-4">Test Name</th>
                                 <th className="py-2.5 px-3">Result</th>
                                 <th className="py-2.5 px-3 hidden sm:table-cell">Ref Range</th>
                                 <th className="py-2.5 px-3 hidden md:table-cell">Date</th>
                                 <th className="py-2.5 px-4 text-right">Status</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-50">
                              {m.labResults?.map((l, i) => (
                                 <tr key={i} className="hover:bg-gray-50/50 transition-colors cursor-pointer group" onClick={() => openModal('VIEW_METRIC', { title: l.name, value: l.value, subValue: '', icon: FlaskConical })}>
                                    <td className="py-3 px-4 font-bold text-gray-900 group-hover:text-blue-600">{l.name}</td>
                                    <td className="py-3 px-3 font-black text-gray-800">{l.value}</td>
                                    <td className="py-3 px-3 font-medium text-gray-500 hidden sm:table-cell">{l.range}</td>
                                    <td className="py-3 px-3 font-bold text-gray-400 hidden md:table-cell text-[9px] tracking-tight">{l.date}</td>
                                    <td className="py-3 px-4 text-right">
                                       <Badge className={`${l.status === 'Normal' ? 'bg-emerald-50 text-emerald-600' : l.status === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-orange-50 text-orange-600'} border-none text-[8px] font-black uppercase px-1.5 py-0`}>{l.status}</Badge>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                     <div className="px-4 py-2 bg-gray-50/30 border-t border-gray-100 mt-auto flex items-center justify-between">
                        <div className="text-[10px] flex gap-2 items-center">
                           <span className="text-gray-400 font-bold uppercase">Last Test:</span>
                           <span className="text-gray-700 font-bold">{m.labResults?.[0]?.date} • Springfield Lab</span>
                        </div>
                        <Button variant="ghost" className="h-6 text-[9px] font-black text-[#129FED] uppercase hover:bg-blue-50" onClick={() => openModal('VIEW_LIST', { title: 'All Lab Results', items: m.labResults })}>Print All <ChevronRight className="w-3 h-3 ml-0.5" /></Button>
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

               {/* CARE PLAN & SURGICAL HISTORY GRID */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Card className="p-0 overflow-hidden shadow-sm h-full flex flex-col">
                     <div className="p-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <Activity className="w-4 h-4 text-[#129FED]" />
                           <h3 className="text-[12px] font-extrabold text-gray-900 uppercase">Care Plan & Interventions</h3>
                        </div>
                        <Button variant="ghost" className="p-0 h-5 w-5" onClick={() => openModal('GENERIC_MESSAGE', { title: 'Add Intervention', message: 'Functionality to request new care plan tasks will be available shortly.' })}><Plus className="w-4 h-4 text-blue-500" /></Button>
                     </div>
                     <div className="p-3 space-y-3 max-h-[140px] overflow-x-hidden overflow-y-auto custom-scrollbar pr-2">
                        {m.carePlan?.map((plan, i) => (
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

                  <Card className="p-0 overflow-hidden shadow-sm h-full flex flex-col">
                     <div className="p-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <Scissors className="w-4 h-4 text-[#129FED]" />
                           <h3 className="text-[12px] font-extrabold text-gray-900 uppercase">Surgical History</h3>
                        </div>
                        <Button variant="ghost" className="p-0 h-5 w-5" onClick={() => openModal('VIEW_LIST', { title: 'Surgical History', items: m.surgicalHistory })}><ChevronRight className="w-4 h-4 text-gray-400" /></Button>
                     </div>
                     <div className="p-4 space-y-4 max-h-[140px] overflow-x-hidden overflow-y-auto custom-scrollbar">
                        {m.surgicalHistory?.map((s, i) => (
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
               </div>

               {/* VITALS & SOCIAL HISTORY GRID */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
               </div>

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
                     <div className="overflow-x-auto max-h-[210px] overflow-y-auto custom-scrollbar">
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

               <Card className="p-0 overflow-hidden shadow-sm border-l-4 border-l-emerald-500 cursor-pointer hover:shadow-md transition-shadow mt-auto" onClick={() => openModal('GENERIC_MESSAGE', { title: 'Discharge Active Status', message: `Discharge Status: ${m.dischargeSummary?.status}. The discharge instructions were released to patient.` })}>
                  <div className="p-3 bg-emerald-50 content-center flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <h3 className="text-[12px] font-extrabold text-emerald-900 uppercase">Discharge Summary</h3>
                     </div>
                     <Badge className="bg-emerald-200 text-emerald-800 border-none font-black text-[9px] uppercase">{m.dischargeSummary?.status}</Badge>
                  </div>
                  <div className="p-3 flex flex-col md:flex-row items-center justify-between gap-3">
                     <p className="text-[11px] text-gray-600 font-medium italic truncate max-w-md"><span className="text-[10px] font-extrabold text-gray-400 not-italic uppercase mr-2">Primary Instruction:</span> "{m.dischargeSummary?.instruction}"</p>
                     <Button className="bg-[#129FED] hover:bg-blue-600 text-white font-black text-[9px] h-7 shrink-0 py-0 uppercase tracking-widest px-3" onClick={(e) => { e.stopPropagation(); openModal('VIEW_DOCUMENT', { name: "Discharge_Summary.pdf" }); }}><Download className="w-3.5 h-3.5 mr-2" /> Download PDF</Button>
                  </div>
               </Card>
            </div>

            {/* RIGHT SIDEBAR COLUMN */}
            <div className="lg:col-span-3 space-y-3 flex flex-col">

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

               <Card className="p-3 space-y-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => openModal('VIEW_LIST', { title: 'Active Allergies', items: m.allergies })}>
                  <div className="flex justify-between items-center border-b pb-2">
                     <h3 className="text-[12px] font-extrabold text-gray-900 uppercase">Allergies</h3>
                     <span className="text-[10px] font-black text-rose-500">{m.allergies?.length} ACTIVE</span>
                  </div>
                  <div className="space-y-3 mt-1 max-h-[140px] overflow-x-hidden overflow-y-auto custom-scrollbar pr-1">
                     {m.allergies?.map((a, i) => (
                        <div key={i} className="flex justify-between items-center group">
                           <span className={`text-[12px] font-black uppercase ${a.color === 'red' ? 'text-rose-600' : 'text-orange-500'} group-hover:text-blue-600 transition-colors`}>{a.name}</span>
                           <Badge className={`${a.color === 'red' ? 'bg-rose-50 text-rose-600' : 'bg-orange-50 text-orange-600'} border-none text-[8px] font-black px-1.5 py-0`}>{a.reaction}</Badge>
                        </div>
                     ))}
                  </div>
               </Card>

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

               <Card className="p-0 overflow-hidden shadow-sm">
                  <div className="p-2.5 bg-gray-50 flex items-center justify-between border-b border-gray-100">
                     <h3 className="text-[12px] font-extrabold text-gray-900 uppercase">Appointments</h3>
                     <Badge className="bg-[#129FED] text-white border-none text-[8px] font-black px-2 py-0 cursor-pointer hover:bg-blue-600 transition-colors" onClick={() => openModal('VIEW_LIST', { title: 'Upcoming Visits', items: m.upcomingAppointments })}>UPCOMING</Badge>
                  </div>
                  <div className="divide-y divide-gray-50 max-h-[280px] overflow-y-auto custom-scrollbar">
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
                  <div className="p-2 bg-gray-50 border-t border-gray-100">
                     <Button className="w-full h-8 bg-blue-50 text-[#129FED] hover:bg-blue-100 font-black text-[10px] border-none uppercase tracking-widest shadow-none" onClick={() => openModal('VIEW_LIST', { title: 'Upcoming Visits', items: m.upcomingAppointments })}>View Full Schedule</Button>
                  </div>
               </Card>

               <div className="grid grid-cols-2 gap-3 mt-auto">
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
               <Button variant="outline" className="h-9 px-6 text-[11px] font-black uppercase tracking-widest border-gray-200 text-gray-600" onClick={() => window.print()}>Print Profile</Button>
               <Button className="h-9 px-8 text-[11px] font-black uppercase tracking-widest bg-gray-900 text-white hover:bg-black" onClick={() => openModal('VIEW_DOCUMENT', { name: "Mariaa_Johnson_health_record_export.pdf" })}>Health Record PDF</Button>
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
