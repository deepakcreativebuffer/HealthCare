import React from "react";
import { X, FileCode, Copy, Download, ShieldCheck, AlertTriangle } from "lucide-react";

const EDIResponseModal = ({ isOpen, onClose, batchId, type, status }) => {
  if (!isOpen) return null;

  const mock999 = `ISA*00*          *00*          *ZZ*RECEIVERID     *ZZ*SENDERID       *250216*1430*^*00501*000000123*0*P*:~
GS*FA*RECEIVERID*SENDERID*20250216*1430*123*X*005010X231A1~
ST*999*0001*005010X231A1~
AK1*HC*123*005010X222A1~
AK2*837*0001~
IK5*A~
AK9*A*1*1*1~
SE*6*0001~
GE*1*123~
IEA*1*000000123~`;

  const mock277CA = `ISA*00*          *00*          *ZZ*RECEIVERID     *ZZ*SENDERID       *250216*1500*^*00501*000000124*0*P*:~
GS*HN*RECEIVERID*SENDERID*20250216*1500*124*X*005010X214~
ST*277*0001*005010X214~
BHT*0010*08*124*20250216*1500*DG~
HL*1**20*1~
NM1*PR*2*UNITEDHEALTH*****PI*87726~
TRN*1*9901*1453982710~
STC*A1:20:PR*20250216*WQ*1450.00~
SE*8*0001~
GE*1*124~
IEA*1*000000124~`;

  const content = type.includes("999") ? mock999 : mock277CA;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    alert("EDI Content copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[85vh]">
        {/* Header */}
        <header className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${status === 'Accepted' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
              <FileCode size={18} />
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-slate-800">EDI Raw Response Details</h2>
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Batch: {batchId} • {type}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200">
            <X size={18} className="text-slate-400" />
          </button>
        </header>

        {/* Status Banner */}
        <div className={`px-6 py-3 border-b flex items-center gap-3 ${status === 'Accepted' ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
          {status === 'Accepted' ? (
            <ShieldCheck size={18} className="text-emerald-600" />
          ) : (
            <AlertTriangle size={18} className="text-rose-600" />
          )}
          <span className={`text-[12px] font-bold ${status === 'Accepted' ? 'text-emerald-700' : 'text-rose-700'}`}>
            Transaction {status} by Clearinghouse
          </span>
        </div>

        {/* EDI Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">ANSI X12 Segment Data</span>
            <div className="flex gap-2">
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[11px] font-bold text-slate-600 transition-all"
              >
                <Copy size={12} /> Copy
              </button>
              <button className="flex items-center gap-2 px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-[11px] font-bold text-slate-600 transition-all">
                <Download size={12} /> Download .txt
              </button>
            </div>
          </div>
          
          <div className="flex-1 bg-slate-900 rounded-xl p-6 overflow-auto font-mono text-[13px] text-blue-300 leading-relaxed shadow-inner">
            {content.split('~').map((segment, i) => (
              <div key={i} className="group flex gap-4">
                <span className="w-8 text-slate-600 text-right select-none">{i + 1}</span>
                <span className="flex-1">
                  {segment.split('*').map((part, j) => (
                    <span key={j} className={j === 0 ? "text-amber-400 font-bold" : "text-blue-100"}>
                      {part}{j < segment.split('*').length - 1 ? <span className="text-slate-600 font-normal">*</span> : null}
                    </span>
                  ))}
                  {segment && <span className="text-rose-400">~</span>}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="p-4 bg-slate-50 border-t border-slate-100 text-right">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 hover:bg-slate-50 transition-all"
          >
            Close Viewer
          </button>
        </footer>
      </div>
    </div>
  );
};

export default EDIResponseModal;
