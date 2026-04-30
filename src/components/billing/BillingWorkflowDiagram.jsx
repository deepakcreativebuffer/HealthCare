import React, { useState } from 'react';
import {
  User,
  Hospital,
  ClipboardList,
  Stethoscope,
  TestTube,
  Monitor,
  ArrowRight,
  Building2,
  ShieldCheck,
  FileText,
  DollarSign,
  AlertCircle,
  RefreshCw,
  Search,
  CheckCircle2,
  XCircle,
  ChevronRight,
  FileSearch,
  Printer,
  ChevronDown,
  Edit3,
  TrendingUp
} from 'lucide-react';

const WorkflowNode = ({ icon: Icon, title, description, status, active, onClick, className = "" }) => (
  <div
    onClick={onClick}
    className={`relative flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer group ${active
        ? 'bg-blue-50 border-blue-500 shadow-lg shadow-blue-100 scale-105 z-10'
        : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-md'
      } ${className}`}
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${active ? 'bg-blue-500 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-500'
      }`}>
      <Icon size={24} />
    </div>
    <h4 className={`text-[13px] font-bold text-center leading-tight ${active ? 'text-blue-700' : 'text-slate-700'}`}>
      {title}
    </h4>
    {description && (
      <p className="text-[10px] text-slate-400 text-center mt-1 font-medium leading-tight">
        {description}
      </p>
    )}
    {status && (
      <div className="absolute -top-2 -right-2">
        {status === 'complete' && <CheckCircle2 size={18} className="text-emerald-500 fill-white" />}
        {status === 'pending' && <RefreshCw size={18} className="text-amber-500 animate-spin" />}
        {status === 'error' && <XCircle size={18} className="text-red-500 fill-white" />}
      </div>
    )}
  </div>
);

const Connector = ({ label, direction = 'right', className = "" }) => (
  <div className={`flex flex-col items-center justify-center min-w-[40px] px-2 ${className}`}>
    {label && (
      <span className="text-[9px] font-bold text-blue-500 uppercase tracking-wider mb-1 whitespace-nowrap">
        {label}
      </span>
    )}
    <div className={`flex items-center text-blue-300 ${direction === 'down' ? 'flex-col' : ''}`}>
      <ArrowRight size={16} className={direction === 'down' ? 'rotate-90' : ''} />
    </div>
  </div>
);

const BillingWorkflowDiagram = () => {
  const [activeTab, setActiveTab] = useState('external'); // 'external' or 'internal'
  const [selectedNode, setSelectedNode] = useState(null);

  const renderExternalWorkflow = () => (
    <div className="space-y-12 py-8 px-4 overflow-x-auto no-scrollbar">
      {/* Top Row: Patient Journey */}
      <div className="flex items-center justify-between min-w-[900px]">
        <WorkflowNode
          icon={User}
          title="Member"
          description="Patient Profile"
          status="complete"
          active={selectedNode === 'member'}
          onClick={() => setSelectedNode('member')}
        />
        <Connector label="Appointment" />
        <WorkflowNode
          icon={Hospital}
          title="Provider"
          description="Healthcare Facility"
          status="complete"
          active={selectedNode === 'provider'}
          onClick={() => setSelectedNode('provider')}
        />
        <Connector label="Visit" />
        <WorkflowNode
          icon={ClipboardList}
          title="Front Desk"
          description="Registration/Check-in"
          status="complete"
          active={selectedNode === 'frontdesk'}
          onClick={() => setSelectedNode('frontdesk')}
        />
        <Connector label="Check-in" />
        <WorkflowNode
          icon={Stethoscope}
          title="Patient Encounter"
          description="Clinical Visit"
          status="complete"
          active={selectedNode === 'encounter'}
          onClick={() => setSelectedNode('encounter')}
        />
        <Connector label="Diagnosis" />
        <WorkflowNode
          icon={TestTube}
          title="Tests"
          description="Lab & Radiology"
          status="complete"
          active={selectedNode === 'tests'}
          onClick={() => setSelectedNode('tests')}
        />
      </div>

      <div className="flex justify-end pr-20">
        <div className="h-20 w-px border-r-2 border-dashed border-blue-200 relative">
          <span className="absolute -right-16 top-1/2 -translate-y-1/2 text-[10px] font-bold text-blue-500 uppercase">Charges</span>
          <ArrowRight size={16} className="absolute -bottom-1 -left-2 rotate-90 text-blue-300" />
        </div>
      </div>

      {/* Bottom Area: Billing & Payor */}
      <div className="grid grid-cols-12 gap-4 items-center min-w-[900px]">
        {/* Patient EOBs */}
        <div className="col-span-2">
          <WorkflowNode
            icon={FileText}
            title="Patient EOBs"
            description="Statements & Reports"
            className="border-dashed"
            active={selectedNode === 'eob'}
            onClick={() => setSelectedNode('eob')}
          />
        </div>

        <div className="col-span-1 flex justify-center">
          <ArrowRight size={20} className="text-slate-300 rotate-180" />
        </div>

        {/* Central Hub: Billing System */}
        <div className="col-span-6 bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
          <div className="flex items-center justify-between gap-6">
            <WorkflowNode
              icon={Monitor}
              title="Hospital Billing"
              description="Billing System"
              active={selectedNode === 'billingsys'}
              onClick={() => setSelectedNode('billingsys')}
              className="flex-1"
            />
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                <div className="w-6 h-6 rounded bg-blue-50 flex items-center justify-center text-blue-500">
                  <FileText size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-700">Claim (837)</span>
                  <span className="text-[8px] text-slate-400">Submission</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                <div className="w-6 h-6 rounded bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <DollarSign size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-700">Payment (835)</span>
                  <span className="text-[8px] text-slate-400">Remittance</span>
                </div>
              </div>
            </div>
            <WorkflowNode
              icon={Building2}
              title="Clearing House"
              description="Claims Processor"
              active={selectedNode === 'clearing'}
              onClick={() => setSelectedNode('clearing')}
              className="flex-1"
            />
          </div>
        </div>

        <div className="col-span-1 flex justify-center">
          <ArrowRight size={20} className="text-slate-300" />
        </div>

        {/* Payor Node */}
        <div className="col-span-2">
          <div className="p-4 rounded-2xl border-2 border-slate-100 bg-white shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <span className="text-xs font-bold text-slate-700">Payor</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                <CheckCircle2 size={12} className="text-emerald-500" />
                <span>Adjudication</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                <RefreshCw size={12} className="text-blue-500" />
                <span>Remittances</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Claims Reviewer */}
      <div className="flex justify-center">
        <div className="bg-white p-4 rounded-2xl border-2 border-red-50 shadow-sm flex items-center gap-4 group hover:border-red-100 transition-all">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
            <FileSearch size={24} />
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-slate-800">Claims Reviewer</h4>
            <p className="text-[10px] text-slate-400 font-medium">Denials & Appeals Review</p>
          </div>
          <div className="flex items-center gap-2 ml-4 px-3 py-1 bg-red-50 rounded-full">
            <AlertCircle size={14} className="text-red-500" />
            <span className="text-[10px] font-bold text-red-600">3 Denials pending</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInternalProcedure = () => (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Input Grid */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { icon: User, title: "Demographics", desc: "Patient Data" },
          { icon: ShieldCheck, title: "Insurance", desc: "Coverage Details" },
          { icon: FileText, title: "CPT Codes", desc: "Procedures" },
          { icon: Edit3, title: "Modifiers", desc: "Service Adjustments" },
          { icon: Hospital, title: "Provider", desc: "Facility Data" },
        ].map((item, idx) => (
          <div key={idx} className="bg-amber-50/50 border border-amber-100 p-3 rounded-xl flex flex-col items-center gap-2">
            <item.icon size={18} className="text-amber-600" />
            <div className="text-center">
              <p className="text-[11px] font-bold text-amber-900">{item.title}</p>
              <p className="text-[9px] text-amber-700 font-medium">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-12">
        <div className="flex flex-col items-center gap-2">
          <div className="p-5 bg-amber-100 rounded-2xl border-2 border-amber-200 shadow-sm w-40 text-center">
            <h4 className="text-[14px] font-bold text-amber-900">Super Bill</h4>
            <p className="text-[10px] text-amber-700 mt-1">Ready for Billing</p>
          </div>
          <ArrowRight className="rotate-90 text-amber-300" />
        </div>

        <div className="flex items-center gap-4 bg-blue-50/50 border border-blue-100 px-6 py-3 rounded-2xl italic text-blue-600 font-medium text-xs">
          <Monitor size={16} />
          "Expert to Super Bill Integration"
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="p-5 bg-amber-100 rounded-2xl border-2 border-amber-200 shadow-sm w-40 text-center">
            <h4 className="text-[14px] font-bold text-amber-900">Charting</h4>
            <p className="text-[10px] text-amber-700 mt-1">Treatment Plan</p>
          </div>
          <ArrowRight className="rotate-90 text-amber-300" />
        </div>
      </div>

      {/* Main Billing Procedure Container */}
      <div className="bg-indigo-50/30 border border-indigo-100 rounded-3xl p-8 relative">
        <div className="absolute -top-3 left-8 bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
          Billing Procedure
        </div>

        <div className="grid grid-cols-2 gap-12">
          {/* Insurance Path */}
          <div className="space-y-6">
            <div className="bg-indigo-600 text-white p-4 rounded-xl shadow-lg text-center font-bold text-sm">
              Charge Creation
            </div>
            <div className="flex justify-center"><Connector direction="down" /></div>
            <div className="bg-white border-2 border-indigo-200 p-4 rounded-xl shadow-sm text-center">
              <h5 className="text-xs font-bold text-slate-800">Insurance Claim</h5>
            </div>
            <div className="flex justify-center"><Connector direction="down" /></div>

            {/* Decision Diamond */}
            <div className="flex justify-center py-4">
              <div className="w-32 h-32 bg-indigo-500 rotate-45 flex items-center justify-center shadow-xl border-4 border-white">
                <div className="-rotate-45 text-center text-white p-2">
                  <p className="text-[10px] font-bold leading-tight">SUBMIT CLAIM TO INSURANCE</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-red-500 uppercase text-center italic">If Rejected</p>
                <div className="bg-red-50 border border-red-100 p-3 rounded-xl flex items-center gap-2">
                  <RefreshCw size={14} className="text-red-500" />
                  <span className="text-[10px] font-bold text-red-700 uppercase">Rebilling</span>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-emerald-500 uppercase text-center italic">If Accepted</p>
                <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">Payments</span>
                </div>
              </div>
            </div>
          </div>

          {/* Self Pay Path */}
          <div className="space-y-6">
            <div className="bg-white border-2 border-indigo-200 p-5 rounded-2xl shadow-sm h-full flex flex-col justify-center items-center gap-6">
              <div className="w-full space-y-4">
                <div className="bg-indigo-50 p-4 rounded-xl text-center">
                  <h5 className="text-xs font-bold text-indigo-900">Patient Responsibility Claim</h5>
                  <p className="text-[10px] text-indigo-700">(Self Pay)</p>
                </div>
                <div className="flex justify-center"><ArrowRight className="rotate-90 text-indigo-200" /></div>
                <div className="bg-slate-50 p-4 rounded-xl text-center border border-dashed border-slate-300">
                  <h5 className="text-xs font-bold text-slate-800">Patient Statement Report</h5>
                </div>
              </div>

              <div className="w-full pt-8 border-t border-slate-100 grid grid-cols-3 gap-2">
                {[
                  { icon: FileText, label: "Patient Statements" },
                  { icon: TrendingUp, label: "Patient Reports" },
                  { icon: Printer, label: "Printed Superbills" },
                ].map((btn, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 group-hover:text-indigo-500">
                      <btn.icon size={18} />
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 text-center uppercase tracking-tighter leading-none">{btn.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full min-h-[600px]">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Medical Billing Workflow</h2>
          <p className="text-xs text-slate-400 font-medium">Visualizing the end-to-end billing lifecycle</p>
        </div>
        <div className="flex p-1 bg-slate-200/50 rounded-xl">
          <button
            onClick={() => setActiveTab('external')}
            className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all ${activeTab === 'external' ? 'bg-white text-[#129FED] shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            External Workflow
          </button>
          <button
            onClick={() => setActiveTab('internal')}
            className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all ${activeTab === 'internal' ? 'bg-white text-[#129FED] shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            Billing Procedure
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === 'external' ? renderExternalWorkflow() : renderInternalProcedure()}
      </div>

      {/* Footer Info / Selected Node Details */}
      <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-slate-500 uppercase">Electronic (EDI)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-[10px] font-bold text-slate-500 uppercase">Manual/Paper</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-blue-600">
          <Search size={14} />
          <span className="text-[10px] font-bold uppercase">Click nodes for detailed documentation</span>
        </div>
      </div>
    </div>
  );
};

export default BillingWorkflowDiagram;
