import React, { useState } from "react";
import {
  DollarSign, CreditCard, Plus, Search, Filter, Download,
  MoreHorizontal, Calculator, ArrowRight, Info, X,
  FileText, User, Building2, ChevronRight, Hash
} from "lucide-react";

const ERADetailPanel = ({ era, onClose }) => {
  if (!era) return null;
  const lines = era.serviceLines || [];
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="px-5 py-3 bg-gradient-to-r from-[#129FED] to-blue-600 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText size={18} className="text-white/80" />
          <div>
            <h3 className="text-sm font-bold text-white">{era.id} — Remittance Detail</h3>
            <p className="text-[10px] text-white/70 font-medium">Claim {era.claimId} • {era.payer}</p>
          </div>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"><X size={16} /></button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 border-b border-slate-100 bg-slate-50/50">
        {[
          { label: "Patient", value: era.patient || "N/A", icon: User },
          { label: "Check / EFT #", value: era.checkNumber || "N/A", icon: Hash },
          { label: "Check Date", value: era.checkDate || "N/A", icon: CreditCard },
          { label: "Rendering Provider", value: era.renderingProvider || "N/A", icon: Building2 },
        ].map((f, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0 mt-0.5"><f.icon size={14} /></div>
            <div><p className="text-[9px] font-bold text-slate-400 uppercase">{f.label}</p><p className="text-[12px] font-bold text-slate-800">{f.value}</p></div>
          </div>
        ))}
      </div>

      <div className="p-5 space-y-4">
        <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Service Line Details</h4>
        <div className="overflow-x-auto rounded-lg border border-slate-100">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50">
                {["#","CPT","Description","DOS","Units","Billed","Allowed","Paid","CoIns","Copay","Adj Code","Adj Amt"].map(h=>(
                  <th key={h} className="px-3 py-2 text-[9px] font-bold text-slate-400 uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {lines.map((ln) => (
                <tr key={ln.lineNo} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-3 py-2 text-[11px] font-bold text-slate-500">{ln.lineNo}</td>
                  <td className="px-3 py-2 text-[11px] font-bold text-[#129FED]">{ln.cpt}</td>
                  <td className="px-3 py-2 text-[11px] font-medium text-slate-700 max-w-[180px] truncate">{ln.description}</td>
                  <td className="px-3 py-2 text-[11px] font-medium text-slate-500">{ln.dos}</td>
                  <td className="px-3 py-2 text-[11px] font-medium text-slate-500 text-center">{ln.units}</td>
                  <td className="px-3 py-2 text-[11px] font-medium text-slate-600">${ln.billed.toFixed(2)}</td>
                  <td className="px-3 py-2 text-[11px] font-bold text-slate-800">${ln.allowed.toFixed(2)}</td>
                  <td className="px-3 py-2 text-[11px] font-bold text-emerald-600">${ln.paid.toFixed(2)}</td>
                  <td className="px-3 py-2 text-[11px] font-medium text-amber-600">${ln.coInsurance.toFixed(2)}</td>
                  <td className="px-3 py-2 text-[11px] font-medium text-slate-500">${ln.copay.toFixed(2)}</td>
                  <td className="px-3 py-2"><span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-100">{ln.adjustmentCode}</span></td>
                  <td className="px-3 py-2 text-[11px] font-bold text-red-500">${ln.adjustmentAmount.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="bg-slate-50 font-bold">
                <td colSpan={5} className="px-3 py-2 text-[11px] text-slate-600 text-right">TOTALS:</td>
                <td className="px-3 py-2 text-[11px] text-slate-700">${era.billed.toFixed(2)}</td>
                <td className="px-3 py-2 text-[11px] text-slate-800">${era.allowed.toFixed(2)}</td>
                <td className="px-3 py-2 text-[11px] text-emerald-600">${era.paid.toFixed(2)}</td>
                <td colSpan={2} className="px-3 py-2 text-[11px] text-slate-600">Pat. Resp: ${era.patientResp.toFixed(2)}</td>
                <td colSpan={2} className="px-3 py-2 text-[11px] text-red-500">Adj: ${era.contractualAdjustment.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {era.adjustmentReasons?.length > 0 && (
            <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4">
              <h5 className="text-[10px] font-bold text-amber-700 uppercase mb-2">Adjustment Reason Codes</h5>
              {era.adjustmentReasons.map((ar, i) => (
                <div key={i} className="flex items-start gap-2 mb-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 shrink-0">{ar.code}</span>
                  <p className="text-[10px] text-amber-900 font-medium leading-snug">{ar.description}</p>
                </div>
              ))}
            </div>
          )}
          {era.remarkCodes?.length > 0 && (
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
              <h5 className="text-[10px] font-bold text-blue-700 uppercase mb-2">Remark Codes</h5>
              {era.remarkCodes.map((rc, i) => (
                <div key={i} className="flex items-start gap-2 mb-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-800 shrink-0">{rc.code}</span>
                  <p className="text-[10px] text-blue-900 font-medium leading-snug">{rc.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ERAAccountingView = ({ eraData = [], patientAccounting = [], onPostPayment }) => {
  const [activeSubTab, setActiveSubTab] = useState("ERA Management");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedERA, setSelectedERA] = useState(null);

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {/* Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-px mb-4">
        {["ERA Management", "Patient Accounting", "Payment Posting"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-4 py-2 text-[12px] font-bold transition-all border-b-2 ${activeSubTab === tab
                ? "border-[#129FED] text-[#129FED]"
                : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeSubTab === "ERA Management" && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-[13px] font-bold text-slate-700">Electronic Remittance Advice (ERA)</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Search ERAs..." className="pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[12px] outline-none w-64 focus:ring-2 focus:ring-blue-100 transition-all" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <button onClick={() => alert("ERA Filter Options: Filter by Date, Payer, or Claim Status.")} className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50"><Filter size={14} /></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">ERA ID</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Claim ID</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Payer</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Billed</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Allowed</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Paid</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Adj.</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Pat. Resp</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {eraData.map((era) => (
                    <tr key={era.id} onClick={() => setSelectedERA(selectedERA?.id === era.id ? null : era)} className={`hover:bg-blue-50/40 transition-colors cursor-pointer group ${selectedERA?.id === era.id ? "bg-blue-50/60 border-l-2 border-l-[#129FED]" : ""}`}>
                      <td className="px-4 py-3 text-[12px] font-bold text-[#129FED]">
                        <div className="flex items-center gap-1.5">
                          <ChevronRight size={12} className={`text-slate-300 transition-transform ${selectedERA?.id === era.id ? "rotate-90 text-[#129FED]" : ""}`} />
                          {era.id}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[12px] font-medium text-slate-600">{era.claimId}</td>
                      <td className="px-4 py-3 text-[12px] font-bold text-slate-700">{era.payer}</td>
                      <td className="px-4 py-3 text-[12px] font-medium text-slate-600 text-right">${era.billed.toFixed(2)}</td>
                      <td className="px-4 py-3 text-[12px] font-bold text-slate-900 text-right">${era.allowed.toFixed(2)}</td>
                      <td className="px-4 py-3 text-[12px] font-bold text-emerald-600 text-right">${era.paid.toFixed(2)}</td>
                      <td className="px-4 py-3 text-[12px] font-medium text-amber-600 text-right">${era.contractualAdjustment.toFixed(2)}</td>
                      <td className="px-4 py-3 text-[12px] font-bold text-slate-700 text-right">${era.patientResp.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <button onClick={(e) => { e.stopPropagation(); alert(`Downloading ERA Document ${era.id} (ANSI 835 Mapping)...`); }} className="p-1 hover:bg-slate-200 rounded transition-colors text-slate-400"><Download size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedERA && (
            <ERADetailPanel era={selectedERA} onClose={() => setSelectedERA(null)} />
          )}
        </div>
      )}

      {activeSubTab === "Patient Accounting" && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex items-center gap-4">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Calculator size={18} /></div>
            <div className="flex items-center gap-4 text-[13px]">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Formula</span>
                <div className="flex items-center gap-2 font-bold text-blue-700">
                  <span>Billed</span><span className="text-blue-300">-</span><span>Ins. Paid</span><span className="text-blue-300">-</span><span>Write-offs</span><span className="text-blue-300">=</span>
                  <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[11px]">Patient Balance</span>
                </div>
              </div>
              <Info size={14} className="text-blue-300 cursor-help" title="Patient responsibility calculation based on EOB/ERA adjustments" />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50/50 border-b border-slate-100"><h3 className="text-[13px] font-bold text-slate-700">Patient Balances & Ledger</h3></div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Patient Name</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Billed</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Ins. Paid</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Write-offs</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Balance</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Last Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {patientAccounting.map((item) => (
                    <tr key={item.patientId} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3"><div className="flex flex-col"><span className="text-[12px] font-bold text-slate-700">{item.name}</span><span className="text-[10px] text-slate-400 font-medium">{item.patientId}</span></div></td>
                      <td className="px-4 py-3 text-[12px] font-medium text-slate-600 text-right">${item.billed.toFixed(2)}</td>
                      <td className="px-4 py-3 text-[12px] font-medium text-slate-600 text-right">${item.insurancePaid.toFixed(2)}</td>
                      <td className="px-4 py-3 text-[12px] font-medium text-amber-600 text-right">${item.writeOffs.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right"><span className={`text-[13px] font-bold ${item.balance > 0 ? "text-rose-600" : "text-emerald-600"}`}>${item.balance.toFixed(2)}</span></td>
                      <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.status === 'Paid' ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>{item.status}</span></td>
                      <td className="px-4 py-3 text-[11px] font-medium text-slate-400">{item.lastPayment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === "Payment Posting" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600"><Plus size={18} /></div>
              <h3 className="text-[14px] font-bold text-slate-700">Post Patient Payment</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Select Patient</label>
                <div className="relative"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" placeholder="Search..." className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[12px] outline-none" /></div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Payment Method</label>
                <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[12px] font-medium outline-none"><option>Credit Card</option><option>Cash</option><option>Check</option><option>Insurance Check</option></select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Amount</label>
                <div className="relative"><DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="number" placeholder="0.00" className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[12px] outline-none" /></div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Date</label>
                <input type="date" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[12px] outline-none" defaultValue="2025-02-16" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Transaction ID / Reference</label>
              <input type="text" placeholder="Auth Code or Check #" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[12px] outline-none" />
            </div>
            <button onClick={() => alert("Payment Successfully Posted! Updating Patient Ledger...")} className="w-full bg-[#129FED] text-white py-2.5 rounded-lg text-[12px] font-bold shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all flex items-center justify-center gap-2"><CreditCard size={16} />Submit Payment</button>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-900 rounded-xl p-6 text-white shadow-xl shadow-slate-200 relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Total Patient Revenue MTD</span>
                  <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400"><ArrowRight size={16} /></div>
                </div>
                <div className="text-3xl font-bold font-mono">$12,450.00</div>
                <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-bold"><span>+18.5%</span><span className="text-slate-500">from last month</span></div>
              </div>
              <DollarSign className="absolute bottom-[-20px] right-[-20px] w-48 h-48 text-white/5 rotate-12" />
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="text-[13px] font-bold text-slate-700 mb-4">Unallocated Payments</h3>
              <div className="space-y-3">
                {[
                  { id: 'TXN-998', patient: 'Unknown', amount: 50.00, date: '1 hour ago' },
                  { id: 'TXN-995', patient: 'Alex Kim', amount: 25.00, date: '3 hours ago' },
                ].map((txn) => (
                  <div key={txn.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-md shadow-sm"><MoreHorizontal size={14} className="text-slate-400" /></div>
                      <div className="flex flex-col"><span className="text-[11px] font-bold text-slate-700">{txn.patient}</span><span className="text-[9px] font-bold text-slate-400 uppercase">{txn.id}</span></div>
                    </div>
                    <div className="flex flex-col items-end"><span className="text-[12px] font-bold text-emerald-600">${txn.amount.toFixed(2)}</span><span className="text-[10px] text-slate-400">{txn.date}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ERAAccountingView;
