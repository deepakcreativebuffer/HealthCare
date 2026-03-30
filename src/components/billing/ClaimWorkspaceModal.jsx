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
  { id: "Patient Snapshot", label: "Patient Snapshot", icon: UserCircle },
  {
    id: "Insurance & Subscriber",
    label: "Insurance & Subscriber",
    icon: ShieldCheck,
  },
  { id: "Providers & Location", label: "Providers & Location", icon: MapPin },
  { id: "Visit / Encounter", label: "Visit / Encounter", icon: Calendar },
  { id: "Diagnosis (ICD-10)", label: "Diagnosis (ICD-10)", icon: Activity },
  { id: "Procedures / Charges", label: "Procedures / Charges", icon: FileText },
  { id: "Claim Details", label: "Claim Details", icon: ClipboardList },
  { id: "Audit & Compliance", label: "Audit & Compliance", icon: Search },
];

const ClaimWorkspaceModal = ({ isOpen, onClose, claimId }) => {
  const [activeTab, setActiveTab] = useState("Patient Snapshot");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-[1280px] h-[92vh] rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        {/* Top Title Bar */}
        <header className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-6 shrink-0">
          <h1 className="text-[15px] font-bold text-slate-800 tracking-tight">
            Billing — Claim Workspace
          </h1>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
          >
            <X size={20} />
          </button>
        </header>

        {/* Workspace Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col bg-[#f8fafc]">
          {/* 1. Full-Width Sub-Header Section */}
          <div className="px-6 py-4 shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all font-bold group shadow-sm"
                >
                  <ArrowLeft
                    size={16}
                    className="text-slate-400 transition-transform group-hover:-translate-x-1"
                  />
                  <span className="text-[12px]">Back</span>
                </button>

                <div className="flex flex-col">
                  <h2 className="text-[17px] font-extrabold text-slate-800 tracking-tight">
                    Billing — Claim Workspace
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-bold text-slate-400">
                      Claim ID:{" "}
                      <span className="text-slate-500">{claimId}</span>
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] font-bold text-slate-400">
                      Status: <span className="text-slate-500">Draft</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-all shadow-sm">
                  Save Draft
                </button>
                <button className="px-6 py-2.5 rounded-lg bg-[#009bf2] text-white font-bold text-[13px] shadow-lg shadow-blue-100 hover:bg-[#0089d8] transition-all">
                  Validate & Submit
                </button>
              </div>
            </div>
          </div>

          {/* 2. Split Body Section (Sidebar + Multi-tab Content) */}
          <div className="flex-1 flex overflow-hidden px-6 pb-6 gap-6">
            {/* Sidebar (Claim Summary, Patient Info, etc) */}
            <div className="w-[280px] shrink-0 overflow-y-auto no-scrollbar">
              <ClaimWorkspaceSidebar />
            </div>

            {/* Main Workspace (Tabs + Tab Content) */}
            <div className="flex-1 flex flex-col gap-6 overflow-hidden">
              {/* Tab Navigation (Horizontal Row) */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`min-w-[120px] px-4 py-3.5 rounded-lg text-[11px] font-bold transition-all border flex flex-col items-start gap-1 justify-center leading-tight shadow-sm ${
                      activeTab === tab.id
                        ? "bg-[#e5f6ff] text-[#009bf2] border-[#009bf2]"
                        : "bg-white text-slate-500 border-slate-100 hover:border-slate-300"
                    }`}
                  >
                    {tab.label.split(" & ").map((line, i) => (
                      <span
                        key={i}
                        className="block last:text-[10px] last:opacity-80"
                      >
                        {line}
                        {i === 0 && tab.label.includes(" & ") ? " &" : ""}
                      </span>
                    ))}
                  </button>
                ))}
              </div>

              {/* Dynamic Tab Content Area (White Container) */}
              <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-y-auto no-scrollbar relative min-h-0">
                {activeTab === "Patient Snapshot" && <PatientSnapshot />}
                {activeTab === "Insurance & Subscriber" && (
                  <InsuranceSubscriberTab />
                )}
                {activeTab === "Providers & Location" && (
                  <ProvidersLocationTab />
                )}
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
  );
};

export default ClaimWorkspaceModal;
