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
  AlertCircle,
  Code,
  FileSearch,
} from "lucide-react";
import CMS1500Preview from "./CMS1500Preview";
import { ediEngine } from "../../utils/ediEngine";
import ClaimWorkspaceSidebar from "./ClaimWorkspaceSidebar";
import PatientSnapshot from "./tabs/PatientSnapshot";
import InsuranceSubscriberTab from "./tabs/InsuranceSubscriberTab";
import ProvidersLocationTab from "./tabs/ProvidersLocationTab";
import VisitEncounterTab from "./tabs/VisitEncounterTab";
import DiagnosisTab from "./tabs/DiagnosisTab";
import ProceduresTab from "./tabs/ProceduresTab";
import ClaimDetailsTab from "./tabs/ClaimDetailsTab";
import AuditComplianceTab from "./tabs/AuditComplianceTab";
import { billingData } from "../../data/billingData";

const tabs = [
  { id: "Patient Snapshot", label: "Patient", icon: UserCircle },
  { id: "Insurance & Subscriber", label: "Insurance", icon: ShieldCheck },
  { id: "Providers & Location", label: "Providers", icon: MapPin },
  { id: "Visit / Encounter", label: "Visit", icon: Calendar },
  { id: "Diagnosis (ICD-10)", label: "Diagnosis", icon: Activity },
  { id: "Procedures / Charges", label: "Procedures", icon: FileText },
  { id: "Claim Details", label: "Details", icon: ClipboardList },
  { id: "Audit & Compliance", label: "Audit", icon: Search },
  { id: "CMS-1500 Preview", label: "Form View", icon: FileSearch },
  { id: "EDI View", label: "837P EDI", icon: Code },
];

const ClaimWorkspaceModal = ({ isOpen, onClose, claimId }) => {
  const [activeTab, setActiveTab] = useState("Patient Snapshot");
  const [validating, setValidating] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [isValidated, setIsValidated] = useState(false);
  const [ediRaw, setEdiRaw] = useState("");

  const handleValidate = () => {
    setValidating(true);
    setValidationErrors([]);
    
    // Simulate complex validation logic
    // Phase 1 Integration: Real-time EDI Serialization
    setTimeout(() => {
      const { patientSnapshot } = billingData;
      
      // 1. Assemble Claim Model (Layer 2)
      const provider = { name: patientSnapshot.providers.billing.name, npi: patientSnapshot.providers.billing.npi, address: patientSnapshot.providers.facility.address };
      const patient = { name: patientSnapshot.name, payer: patientSnapshot.payer };
      const encounter = { 
        dos: patientSnapshot.visitEncounter.dosFrom, 
        diagnoses: patientSnapshot.diagnosisSection, 
        procedures: patientSnapshot.proceduresSection.map(p => ({ code: p.cpt, qty: p.units, amount: `$${p.charge}` })) 
      };
      
      const claimModel = ediEngine.assembleClaim(encounter, provider, patient);

      // 2. Run Validation Engine (Layer 3)
      const validation = ediEngine.validateClaim(claimModel);
      
      // 3. Generate EDI 837P (Layer 4)
      if (validation.isValid) {
        const rawEdi = ediEngine.serialize837P(claimModel);
        setEdiRaw(rawEdi);
      }

      setValidationErrors(validation.errors.map(e => e.message));
      setValidating(false);
      setIsValidated(true);
      
      if (validation.isValid) {
        alert("Claim Validation Passed! ANSI X12 837P Segments Generated.");
      }
    }, 1200);
  };

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
              <h1 className="text-[16px] font-bold text-slate-800">Workspace</h1>
              <span className="text-[12px] font-medium text-slate-600 hidden sm:inline">Electronic Filing</span>
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
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 text-slate-400 group-hover:text-[#129FED] transition-all border border-slate-50">
                    <ArrowLeft size={16} />
                  </div>
                  <span className="text-[12px] font-bold text-slate-600 hidden sm:inline">Back</span>
                </button>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h2 className="text-[16px] sm:text-[18px] font-black text-slate-900 tracking-tight">
                      {claimId}
                    </h2>
                    <div className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-600 border border-amber-50">
                      <span className="text-[12px] font-medium">Draft</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {validationErrors.length > 0 && (
                   <div className="flex items-center gap-2 mr-4 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 animate-in slide-in-from-right-2">
                     <AlertCircle size={14} className="text-red-500" />
                     <span className="text-[11px] font-bold text-red-600 uppercase">{validationErrors.length} Errors Found</span>
                   </div>
                )}
                <button 
                  onClick={handleValidate}
                  disabled={validating}
                  className={`h-9 px-4 rounded-lg border font-bold text-[12px] transition-all flex items-center gap-2 ${validating ? 'bg-slate-50 text-slate-400' : 'border-slate-300 text-slate-600 hover:bg-slate-50'}`}
                >
                  {validating ? (
                    <div className="w-3 h-3 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
                  ) : (
                    <Activity size={14} />
                  )}
                  Run Validation
                </button>
                <button className={`h-9 px-5 rounded-lg font-bold text-[12px] shadow-sm transition-all flex items-center gap-2 ${isValidated && validationErrors.length === 0 ? 'bg-blue-600 text-white hover:bg-[#0089d8]' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
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
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1.5">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`group flex items-center gap-2 px-3 h-8 bg-white rounded-lg border border-slate-100 transition-all duration-200 shrink-0 ${activeTab === tab.id
                          ? "bg-[#129FED]/9 text-[#129FED]"
                          : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                          }`}
                      >
                        <Icon size={14} className={activeTab === tab.id ? "stroke-[2.5]" : "stroke-[2]"} />
                        <span className={`text-[12px] font-bold whitespace-nowrap ${activeTab === tab.id ? "text-[#129FED]" : "text-slate-500 group-hover:text-slate-700"}`}>
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
                    {activeTab === "CMS-1500 Preview" && (
                      <CMS1500Preview claimData={{ patient: billingData.patientSnapshot.name }} />
                    )}
                    {activeTab === "EDI View" && (
                      <div className="p-8 bg-slate-900 h-full overflow-auto">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-emerald-400 font-mono text-[14px]">837P Professional Claim - ANSI X12 5010</h3>
                          <button className="text-[10px] bg-white/10 text-white px-3 py-1 rounded border border-white/10 hover:bg-white/20">
                            Copy to Clipboard
                          </button>
                        </div>
                        <pre className="text-emerald-300 font-mono text-[12px] leading-relaxed selection:bg-emerald-500/30">
                          {ediRaw || "// Run validation to generate EDI segments..."}
                        </pre>
                      </div>
                    )}
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
