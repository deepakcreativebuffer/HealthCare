import React, { useState } from "react";
import { 
  FileText, 
  Mail, 
  MessageSquare, 
  Send, 
  Eye, 
  Printer, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Search,
  Users
} from "lucide-react";

const StatementsMessagingView = ({ patientAccounting = [] }) => {
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState("Email");
  const [showStatus, setShowStatus] = useState(null); // 'sending' | 'success'

  const togglePatient = (id) => {
    if (selectedPatients.includes(id)) {
      setSelectedPatients(selectedPatients.filter(p => p !== id));
    } else {
      setSelectedPatients([...selectedPatients, id]);
    }
  };

  const handleSend = () => {
    setShowStatus('sending');
    setTimeout(() => {
      setShowStatus('success');
      setTimeout(() => setShowStatus(null), 3000);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
      {/* Left 2 Cols: Patient Selection */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-[#129FED]" />
              <h3 className="text-[13px] font-bold text-slate-700">Select Patients for Billing</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Filter patients..."
                  className="pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[12px] outline-none w-48"
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-4 py-3 text-center w-12">
                    <input 
                      type="checkbox" 
                      onChange={(e) => {
                        if (e.target.checked) setSelectedPatients(patientAccounting.map(p => p.patientId));
                        else setSelectedPatients([]);
                      }}
                      className="rounded border-slate-300 text-[#129FED] focus:ring-[#129FED]"
                    />
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">Patient</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase text-right">Outstanding</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">Last Statement</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase">Delivery Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {patientAccounting.map((patient) => (
                  <tr key={patient.patientId} className={`hover:bg-slate-50 transition-colors ${selectedPatients.includes(patient.patientId) ? 'bg-blue-50/30' : ''}`}>
                    <td className="px-4 py-3 text-center">
                      <input 
                        type="checkbox" 
                        checked={selectedPatients.includes(patient.patientId)}
                        onChange={() => togglePatient(patient.patientId)}
                        className="rounded border-slate-300 text-[#129FED] focus:ring-[#129FED]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-slate-700">{patient.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{patient.patientId}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-[12px] font-bold text-rose-600">${patient.balance.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-3 text-[11px] font-medium text-slate-500">{patient.lastPayment}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-emerald-500" />
                        <span className="text-[11px] font-medium text-slate-600">Delivered</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bulk Action Footer */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-bold text-slate-600">{selectedPatients.length} Patients Selected</span>
            {selectedPatients.length > 0 && (
              <button 
                onClick={() => setSelectedPatients([])}
                className="text-[11px] font-bold text-rose-500 hover:underline"
              >
                Clear Selection
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => alert(`Printing batch of ${selectedPatients.length} statements...`)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 hover:bg-slate-50"
            >
              <Printer size={14} />
              Print Batch
            </button>
            <button 
              onClick={() => alert("Generating PDF Batch Preview...")}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 hover:bg-slate-50"
            >
              <FileText size={14} />
              Preview PDF
            </button>
          </div>
        </div>
      </div>

      {/* Right 1 Col: Delivery Configuration */}
      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="bg-blue-100 p-2 rounded-lg text-[#129FED]">
              <Send size={18} />
            </div>
            <h3 className="text-[14px] font-bold text-slate-700">Statement Delivery</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Primary Method</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'Email', icon: Mail },
                  { id: 'SMS', icon: MessageSquare }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setDeliveryMethod(method.id)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                      deliveryMethod === method.id 
                        ? "border-[#129FED] bg-blue-50 text-[#129FED]" 
                        : "border-slate-100 hover:border-slate-200 text-slate-400"
                    }`}
                  >
                    <method.icon size={16} />
                    <span className="text-[12px] font-bold">{method.id}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-slate-400" />
                <span className="text-[11px] font-bold text-slate-600">Scheduling</span>
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="rounded border-slate-300 text-[#129FED] focus:ring-[#129FED]" />
                <span className="text-[12px] text-slate-600 group-hover:text-slate-900 transition-colors">Auto-send recurring statements</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="rounded border-slate-300 text-[#129FED] focus:ring-[#129FED]" />
                <span className="text-[12px] text-slate-600 group-hover:text-slate-900 transition-colors">Include receipt for last payment</span>
              </label>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Selected Summary</span>
                <span className="text-[11px] font-bold text-[#129FED]">Total: ${
                  patientAccounting
                    .filter(p => selectedPatients.includes(p.patientId))
                    .reduce((sum, p) => sum + p.balance, 0)
                    .toFixed(2)
                }</span>
              </div>
              <button 
                disabled={selectedPatients.length === 0 || showStatus === 'sending'}
                onClick={handleSend}
                className={`w-full py-3 rounded-xl text-[13px] font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                  selectedPatients.length === 0 
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none" 
                    : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200 active:scale-95"
                }`}
              >
                {showStatus === 'sending' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing Delivery...
                  </>
                ) : showStatus === 'success' ? (
                  <>
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    Sent Successfully
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send {selectedPatients.length} Statements
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase">Live Preview</h4>
            <div className="bg-slate-100 px-2 py-0.5 rounded text-[9px] font-bold text-slate-500">PDF GENERATED</div>
          </div>
          <div className="aspect-[3/4] bg-slate-50 rounded-lg border border-slate-100 p-4 flex flex-col gap-3">
            <div className="h-4 w-1/2 bg-slate-200 rounded" />
            <div className="h-3 w-1/3 bg-slate-100 rounded" />
            <div className="mt-4 space-y-2">
              <div className="h-2 w-full bg-slate-100 rounded" />
              <div className="h-2 w-full bg-slate-100 rounded" />
              <div className="h-2 w-2/3 bg-slate-100 rounded" />
            </div>
            <div className="mt-auto h-8 w-full bg-slate-200 rounded-lg" />
          </div>
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => alert("Opening High-Fidelity Statement PDF Preview...")}
              className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-xl flex items-center gap-2 text-[12px] font-bold text-slate-700 hover:bg-slate-50"
            >
              <Eye size={14} />
              Open Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatementsMessagingView;
