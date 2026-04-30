import React, { useState } from "react";
import {
  BarChart3,
  FileWarning,
  Trash2,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
  TrendingDown,
  History,
  ShieldAlert,
  ArrowRight,
  Plus
} from "lucide-react";
import DenialAppealWizard from "./DenialAppealWizard";
import RecordAdjustmentModal from "./RecordAdjustmentModal";
import AppealPackagePreview from "./AppealPackagePreview";

const FollowUpResolutionView = ({
  arAging = { buckets: [], totalOutstanding: 0 },
  writeOffsHistory = []
}) => {
  const [activeTab, setActiveTab] = useState("AR Aging");
  const [localWriteOffs, setLocalWriteOffs] = useState(writeOffsHistory);
  const [isAppealWizardOpen, setIsAppealWizardOpen] = useState(false);
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);
  const [isAppealPreviewOpen, setIsAppealPreviewOpen] = useState(false);
  const [selectedClaimForAppeal, setSelectedClaimForAppeal] = useState(null);

  const handleSaveAdjustment = (newWO) => {
    setLocalWriteOffs([newWO, ...localWriteOffs]);
    setIsAdjustmentModalOpen(false);
    alert("Adjustment Successfully Recorded and Posted to Ledger.");
  };

  const handleGenerateAppeal = () => {
    setIsAppealPreviewOpen(true);
  };

  const openAppealWizard = (claimId) => {
    setSelectedClaimForAppeal(claimId);
    setIsAppealWizardOpen(true);
  };

  return (
    <div className="space-y-3 animate-in fade-in duration-500">
      {/* Sub-Navigation */}
      <div className="flex items-center gap-3">
        {["AR Aging", "Denial Appeals", "Write-offs", "Auto-Closure Log"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-[12px] font-bold transition-all ${activeTab === tab
              ? "bg-[#129FED] text-white border-[#129FED] shadow-lg shadow-slate-200"
              : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "AR Aging" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Aging Buckets */}
          {arAging.buckets.map((bucket, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{bucket.range}</span>
                  <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <BarChart3 size={14} style={{ color: bucket.color }} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-800">${bucket.amount.toLocaleString()}</div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      backgroundColor: bucket.color,
                      width: `${(bucket.amount / arAging.totalOutstanding) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Aging Detail Chart (Visual placeholder) */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-[#129FED]">
                  <TrendingDown size={18} />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-slate-700">Days Sales Outstanding (DSO)</h3>
                  <p className="text-[11px] text-slate-400 font-medium">Average time to collect payments</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-xl font-bold text-slate-800">22 Days</span>
                  <span className="text-[10px] font-bold text-emerald-500">-2 days from prev. month</span>
                </div>
              </div>
            </div>

            <div className="w-full flex items-end gap-1.5 px-4">
              {[45, 30, 22, 18, 25, 20, 22].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                  <div
                    className="w-full bg-slate-100 rounded-t-lg group-hover:bg-blue-100 transition-all relative"
                    style={{ height: `${val * 4}px` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {val}d
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400">Week {i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-900 rounded-xl p-4 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Action Needed</span>
                <h4 className="text-[14px] font-bold">Unpaid Over 90 Days</h4>
              </div>
              <div className="text-3xl font-bold text-rose-400">${arAging.buckets.find(b => b.range === '90+ Days').amount.toLocaleString()}</div>
              <button
                onClick={() => alert("Loading Detailed 90+ Day Aging Report...")}
                className="mt-4 flex items-center justify-between w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10 group"
              >
                <span className="text-[12px] font-bold">Review List</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Denial Appeals" && (
        <div className="space-y-3">
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldAlert className="text-amber-600" size={20} />
              <div>
                <h4 className="text-[13px] font-bold text-amber-900">Appeals Queue (4 Pending)</h4>
                <p className="text-[11px] text-amber-700">Denials requiring additional documentation or level 1 appeal submission.</p>
              </div>
            </div>
            <button
              onClick={handleGenerateAppeal}
              className="bg-amber-600 text-white px-4 py-2 rounded-lg text-[12px] font-bold hover:bg-amber-700 transition-all"
            >
              Generate Appeal Package
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">Claim ID</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">Reason</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">Due Date</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">Level</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-[#129FED]">CLM-00121</span>
                        <span className="text-[10px] text-slate-400 font-medium">UnitedHealth</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <FileWarning size={14} className="text-rose-500" />
                        <span className="text-[12px] font-medium text-slate-700">Medical Necessity Denied</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[12px] font-bold text-rose-600">In 5 Days</td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">Level 1</span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => openAppealWizard('CLM-00121')}
                        className="text-[12px] font-bold text-[#129FED] hover:underline"
                      >
                        Start Appeal
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Write-offs" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-rose-100 p-2 rounded-lg text-rose-600">
                <Trash2 size={18} />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-slate-700">Write-offs & Adjustments Log</h3>
                <p className="text-[11px] text-slate-400 font-medium">Auditable history of balances removed from ledger</p>
              </div>
            </div>
            <button
              onClick={() => setIsAdjustmentModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#129FED] text-white border-[#129FED] rounded-lg text-[12px] font-bold hover:bg-blue-600 transition-all"
            >
              <Plus size={14} />
              Record Adjustment
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">Adjustment ID</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">Claim</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase text-right">Amount</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">Reason Code</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">Approved By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {localWriteOffs.map((wo) => (
                  <tr key={wo.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-[12px] font-bold text-slate-700">{wo.id}</td>
                    <td className="px-4 py-3 text-[12px] font-medium text-slate-500">{wo.claimId}</td>
                    <td className="px-4 py-3 text-[12px] font-bold text-rose-600 text-right">${wo.amount.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className="text-[11px] font-medium text-slate-600">{wo.reason}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                          {wo.user.charAt(0)}
                        </div>
                        <span className="text-[12px] font-medium text-slate-600">{wo.user}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "Auto-Closure Log" && (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-2">
            <CheckCircle2 size={32} />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-[16px] font-bold text-slate-800">Auto-Closure Engine Active</h3>
            <p className="text-[12px] text-slate-500 leading-relaxed">
              The system automatically closes claims when the total carrier payment + patient payment + write-offs equal the total billed amount.
              <br /><strong>14 claims auto-closed this month.</strong>
            </p>
          </div>
          <button
            onClick={() => alert("Opening Auto-Closure Audit History...")}
            className="flex items-center gap-2 px-6 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 mx-auto hover:bg-slate-100 transition-all"
          >
            <History size={14} />
            View History
          </button>
        </div>
      )}

      <DenialAppealWizard
        isOpen={isAppealWizardOpen}
        onClose={() => setIsAppealWizardOpen(false)}
        claimId={selectedClaimForAppeal}
      />

      <RecordAdjustmentModal
        isOpen={isAdjustmentModalOpen}
        onClose={() => setIsAdjustmentModalOpen(false)}
        onSave={handleSaveAdjustment}
      />

      <AppealPackagePreview
        isOpen={isAppealPreviewOpen}
        onClose={() => setIsAppealPreviewOpen(false)}
      />
    </div>
  );
};

export default FollowUpResolutionView;
