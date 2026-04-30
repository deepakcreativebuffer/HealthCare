import React, { useState } from "react";
import {
  X,
  FileText,
  Upload,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Paperclip,
  Send
} from "lucide-react";

const DenialAppealWizard = ({ isOpen, onClose, claimId }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const steps = [
    { id: 1, label: "Review Denial" },
    { id: 2, label: "Add Documentation" },
    { id: 3, label: "Final Submission" }
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onClose();
        alert(`Appeal for ${claimId} successfully submitted to Payer! Tracking ID: APP-${Math.floor(Math.random() * 10000)}`);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 antialiased">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />

      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <header className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
              <ShieldAlert size={18} />
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-slate-800">Denial Appeal Wizard</h2>
              <p className="text-[11px] text-slate-500 font-medium">Claim: <span className="text-amber-600">{claimId}</span></p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200">
            <X size={18} className="text-slate-400" />
          </button>
        </header>

        {/* Stepper */}
        <div className="px-8 py-4 bg-white border-b border-slate-50 flex items-center justify-between">
          {steps.map((s, idx) => (
            <React.Fragment key={s.id}>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${step >= s.id ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "bg-slate-100 text-slate-400"
                  }`}>
                  {step > s.id ? <CheckCircle2 size={12} /> : s.id}
                </div>
                <span className={`text-[12px] font-bold ${step >= s.id ? "text-slate-800" : "text-slate-400"}`}>{s.label}</span>
              </div>
              {idx < steps.length - 1 && <ChevronRight size={14} className="text-slate-200" />}
            </React.Fragment>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl">
                <h4 className="text-[12px] font-bold text-rose-900 mb-1">Payer Denial Reason: PR-50</h4>
                <p className="text-[11px] text-rose-700 leading-relaxed font-medium">
                  These services are non-covered services because this is not deemed a 'medical necessity' by the payer.
                  Reference Policy: MED-REC-0012.
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Appeal Argument</label>
                <textarea
                  className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl text-[12px] outline-none focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                  placeholder="Describe why this service should be covered..."
                  defaultValue="Documentation attached proves medical necessity for the 90837 service performed on 02/12/25. Patient presents with severe symptoms of GAD (F41.1) requiring intensive therapeutic intervention..."
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Clinical Notes 02/12", size: "2.4 MB", type: "PDF" },
                  { name: "Initial Assessment", size: "1.1 MB", type: "PDF" },
                ].map((file, i) => (
                  <div key={i} className="p-3 border border-blue-100 bg-blue-50/50 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-blue-500" />
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-slate-700">{file.name}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{file.size}</span>
                      </div>
                    </div>
                    <CheckCircle2 size={14} className="text-emerald-500" />
                  </div>
                ))}
              </div>

              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group">
                <div className="mx-auto w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors mb-3">
                  <Upload size={24} />
                </div>
                <h4 className="text-[13px] font-bold text-slate-700">Upload Additional Evidence</h4>
                <p className="text-[11px] text-slate-400 font-medium">Drag and drop or click to browse files</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                <h4 className="text-[13px] font-bold text-slate-700 border-b border-slate-200 pb-2">Appeal Package Summary</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-slate-500 font-medium">Form Type</span>
                    <span className="font-bold text-slate-700 font-mono">CMS-1500 + Attachment</span>
                  </div>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-slate-500 font-medium">Attachments</span>
                    <span className="font-bold text-slate-700">2 Files</span>
                  </div>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-slate-500 font-medium">Level</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold">LEVEL 1 APPEAL</span>
                  </div>
                </div>
              </div>
              <label className="flex items-center gap-3 p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl cursor-pointer group">
                <input type="checkbox" className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" defaultChecked />
                <span className="text-[11px] font-medium text-emerald-800 leading-tight">
                  I certify that the documentation provided is accurate and substantiates the medical necessity of the claimed services.
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1 || isSubmitting}
            className={`px-4 py-2 text-[12px] font-bold rounded-lg transition-all ${step === 1 ? "opacity-0 pointer-events-none" : "text-slate-500 hover:bg-white border border-transparent hover:border-slate-200"
              }`}
          >
            Previous Step
          </button>

          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#129FED] text-white border-[#129FED] rounded-lg text-[12px] font-bold shadow-lg shadow-slate-200 hover:bg-[#129FED]/80 active:scale-95 transition-all flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting Appeal...
              </>
            ) : (
              <>
                {step === 3 ? <Send size={14} /> : null}
                {step === 3 ? "Submit Final Appeal" : "Continue to Next Step"}
                <ChevronRight size={14} />
              </>
            )}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default DenialAppealWizard;
