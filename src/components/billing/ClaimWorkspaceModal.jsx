import React, { useState } from "react";
import {
  X,
  ArrowLeft,
  CheckCircle2,
  Save,
  ChevronRight,
  UserCircle,
  ShieldCheck,
  MapPin,
  Calendar,
  Activity,
  FileText,
  Search,
  ClipboardList,
  Sparkles,
} from "lucide-react";
import ClaimWorkspaceSidebar from "./ClaimWorkspaceSidebar";
import PatientSnapshot from "./tabs/PatientSnapshot";
import InsuranceSubscriberTab from "./tabs/InsuranceSubscriberTab";
import ProvidersLocationTab from "./tabs/ProvidersLocationTab";
import VisitEncounterTab from "./tabs/VisitEncounterTab";
import DiagnosisTab from "./tabs/DiagnosisTab";
import ProceduresTab from "./tabs/ProceduresTab";
import ClaimDetailsTab from "./tabs/ClaimDetailsTab";
import AuditComplianceTab from "./tabs/AuditComplianceTab";

const tabs = [
  { id: "Patient Snapshot", label: "Patient", icon: UserCircle },
  { id: "Insurance & Subscriber", label: "Insurance", icon: ShieldCheck },
  { id: "Providers & Location", label: "Providers", icon: MapPin },
  { id: "Visit / Encounter", label: "Visit", icon: Calendar },
  { id: "Diagnosis (ICD-10)", label: "Diagnosis", icon: Activity },
  { id: "Procedures / Charges", label: "Procedures", icon: FileText },
  { id: "Claim Details", label: "Details", icon: ClipboardList },
  { id: "Audit & Compliance", label: "Audit", icon: Search },
];

const ClaimWorkspaceModal = ({ isOpen, onClose, claimId }) => {
  const [activeTab, setActiveTab] = useState("Patient Snapshot");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center sm:p-4 antialiased selection:bg-blue-100 p-0">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/10 backdrop-blur-[2px] animate-in fade-in duration-500"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-[1440px] h-full sm:h-[95vh] sm:rounded-lg shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-300 border border-slate-100">
        {/* Top Title Bar */}
        <header className="h-12 bg-white flex items-center justify-between px-4 sm:px-6 shrink-0 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-50">
              <Sparkles size={14} className="text-[#129FED]" />
            </div>
            <div className="flex items-baseline gap-2">
              <h1 className="text-[13px] font-bold text-slate-800">Workspace</h1>
              <span className="text-[10px] font-medium text-slate-300 uppercase tracking-widest hidden sm:inline">Electronic Filing</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all border border-transparent"
          >
            <X size={18} />
          </button>
        </header>

        {/* Workspace Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Sub-Header */}
          <div className="px-4 sm:px-6 py-2 shrink-0 bg-white border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-4 sm:gap-6">
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 pr-4 sm:pr-6 border-r border-slate-100 group"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 text-slate-400 group-hover:text-[#129FED] transition-all border border-slate-50">
                    <ArrowLeft size={16} />
                  </div>
                  <span className="text-[12px] font-bold text-slate-600 hidden sm:inline">Back</span>
                </button>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h2 className="text-[16px] sm:text-[18px] font-black text-slate-900 tracking-tight">
                      {claimId}
                    </h2>
                    <div className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-50">
                      <span className="text-[9px] font-bold uppercase tracking-wider">Draft</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="h-9 px-4 rounded-lg border border-slate-100 text-slate-500 font-bold text-[11px] hover:bg-slate-50 transition-all">
                  Snapshot
                </button>
                <button className="h-9 px-5 rounded-lg bg-[#129FED] text-white font-bold text-[11px] shadow-sm hover:bg-[#0089d8] transition-all flex items-center gap-2">
                  <CheckCircle2 size={14} />
                  Finish
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar (Hidden on mobile maybe? or collapsed) */}
            <div className="hidden md:block shrink-0">
              <ClaimWorkspaceSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#FAFBFC]">
              {/* Tabs Bar - More compact and scrollable */}
              <div className="px-4 sm:px-6 border-b border-slate-100 bg-white sticky top-0 z-20">
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1.5">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`group flex items-center gap-2 px-4 h-9 rounded-lg transition-all duration-200 shrink-0 ${
                          activeTab === tab.id
                            ? "bg-[#129FED]/5 text-[#129FED]"
                            : "text-slate-400 hover:text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <Icon size={14} className={activeTab === tab.id ? "stroke-[2.5]" : "stroke-[2]"} />
                        <span className={`text-[11px] font-bold whitespace-nowrap ${activeTab === tab.id ? "text-[#129FED]" : "text-slate-500 group-hover:text-slate-700"}`}>
                          {tab.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content Container */}
              <div className="flex-1 overflow-hidden p-3 sm:p-5 relative">
                <div className="h-full bg-white rounded-lg border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-y-auto no-scrollbar relative z-1 p-0 animate-in slide-in-from-bottom-1 duration-300">
                  <div className="min-h-full">
                    {activeTab === "Patient Snapshot" && <PatientSnapshot />}
                    {activeTab === "Insurance & Subscriber" && <InsuranceSubscriberTab />}
                    {activeTab === "Providers & Location" && <ProvidersLocationTab />}
                    {activeTab === "Visit / Encounter" && <VisitEncounterTab />}
                    {activeTab === "Diagnosis (ICD-10)" && <DiagnosisTab />}
                    {activeTab === "Procedures / Charges" && <ProceduresTab />}
                    {activeTab === "Claim Details" && <ClaimDetailsTab />}
                    {activeTab === "Audit & Compliance" && <AuditComplianceTab />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimWorkspaceModal;
