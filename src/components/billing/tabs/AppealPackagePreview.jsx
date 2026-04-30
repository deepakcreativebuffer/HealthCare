import React, { useState, useEffect } from "react";
import { X, FileText, Download, Printer, CheckCircle2, ChevronLeft, ChevronRight, FileSearch } from "lucide-react";

const AppealPackagePreview = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsGenerating(true);
      const timer = setTimeout(() => setIsGenerating(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalPages = 3;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-500" onClick={onClose} />

      <div className="relative bg-slate-100 w-full max-w-5xl h-[90vh] rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
        {/* Toolbar */}
        <header className="bg-white p-4 border-b border-slate-200 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 p-2 rounded-xl text-amber-600">
              <FileSearch size={20} />
            </div>
            <div>
              <h2 className="text-[15px] font-extrabold text-slate-800">Generated Appeal Package</h2>
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Case: CLM-00121 • UnitedHealth</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-100 rounded-lg p-1 mr-4">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="p-1.5 hover:bg-white rounded-md transition-all text-slate-500 disabled:opacity-30"
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>
              <span className="px-3 text-[12px] font-bold text-slate-600">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                className="p-1.5 hover:bg-white rounded-md transition-all text-slate-500 disabled:opacity-30"
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
              <Printer size={16} /> Print
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-[#129FED] text-white border-[#129FED] rounded-xl text-[12px] font-bold hover:bg-blue-600 shadow-xl shadow-slate-200 active:scale-95 transition-all">
              <Download size={16} /> Download PDF
            </button>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 ml-2">
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-slate-200 custom-scrollbar">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center text-slate-500 mt-20">
              <div className="w-12 h-12 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin mb-4" />
              <p className="text-[13px] font-bold uppercase tracking-widest animate-pulse">Compiling Appeal Documents...</p>
            </div>
          ) : (
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-sm p-12 min-h-[1100px] font-serif text-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {currentPage === 1 && (
                <div className="space-y-10">
                  <div className="flex justify-between border-b-4 border-slate-900 pb-6">
                    <div className="font-sans">
                      <h1 className="text-2xl font-black italic tracking-tighter text-blue-900">HEALTHCARE NOTES</h1>
                      <p className="text-[10px] font-bold text-slate-400">123 WELLNESS DR, SUITE 200, AUSTIN, TX</p>
                    </div>
                    <div className="text-right">
                      <h2 className="text-xl font-bold uppercase tracking-tighter">Formal Appeal Request</h2>
                      <p className="text-[12px] font-bold text-slate-500">DATE: {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-12 text-[14px]">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">To: Claims Department</p>
                      <p className="font-bold">UnitedHealth Group</p>
                      <p>P.O. Box 30755</p>
                      <p>Salt Lake City, UT 84130</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Re: Claim Determination Appeal</p>
                      <p className="font-bold">PATIENT: Johnathan Doe</p>
                      <p className="font-bold">CLAIM ID: CLM-00121</p>
                      <p className="font-bold">DOS: 02/12/2025</p>
                    </div>
                  </div>

                  <div className="space-y-6 text-[15px] leading-relaxed">
                    <p>Dear Appeals Reviewer,</p>
                    <p>
                      This letter serves as a formal Level 1 appeal for the denial of the above-referenced claim. The claim was denied for
                      <strong> Medical Necessity (Reason Code PR-50)</strong>.
                    </p>
                    <p>
                      We believe this determination was made in error. Documentation provided in this package, specifically the clinical notes
                      from the date of service, clearly substantiates that the patient met all criteria for service <strong>CPT 90837</strong>.
                      The patient presented with acute symptom exacerbation requiring the intensive intervention provided.
                    </p>
                    <p>
                      Included in this package:
                    </p>
                    <ul className="list-disc pl-8 space-y-2 font-bold">
                      <li>Original CMS-1500 Claim Form</li>
                      <li>Clinical Progress Notes for DOS 02/12/2025</li>
                      <li>Initial Behavioral Health Assessment & Treatment Plan</li>
                    </ul>
                    <p>
                      We request a prompt re-evaluation of this claim and immediate payment for the services rendered.
                    </p>
                    <div className="pt-12">
                      <p>Sincerely,</p>
                      <p className="mt-8 font-bold border-t-2 border-slate-100 pt-2 w-64 italic">Dr. Emily Roberts, MD</p>
                      <p className="text-[12px] text-slate-500">Medical Director, Behavioral Health LLC</p>
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 2 && (
                <div className="space-y-6">
                  <div className="p-4 bg-rose-50 border-2 border-rose-600 text-rose-600 font-sans font-bold text-center uppercase tracking-widest mb-10">
                    Attachment 1: Original CMS-1500 Submission
                  </div>
                  <div className="opacity-40 select-none grayscale border border-slate-200 p-8">
                    {/* Simplified CMS-1500 layout representation */}
                    <div className="h-4 w-48 bg-slate-300 mb-4" />
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(12)].map((_, i) => <div key={i} className="h-8 bg-slate-100" />)}
                    </div>
                    <div className="mt-10 h-32 bg-slate-50" />
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="h-10 bg-slate-200" />
                      <div className="h-10 bg-slate-200" />
                    </div>
                  </div>
                  <div className="text-center text-[12px] font-bold text-slate-400 italic">
                    Refer to system record for full claim high-fidelity version
                  </div>
                </div>
              )}

              {currentPage === 3 && (
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 border-2 border-blue-600 text-blue-600 font-sans font-bold text-center uppercase tracking-widest mb-10">
                    Attachment 2: Clinical Progress Notes
                  </div>
                  <div className="font-serif text-[14px] space-y-8">
                    <div className="flex justify-between border-b pb-4">
                      <span className="font-bold uppercase tracking-widest">Confidential Clinical Record</span>
                      <span className="font-bold">DOS: 02/12/2025</span>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-bold text-[16px]">Subjective:</h3>
                      <p className="leading-relaxed">
                        Patient reports increased anxiety and sleep disturbance over the past 7 days. Mood is labile with reports of panic symptoms
                        in social environments. No SI/HI reported.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-bold text-[16px]">Objective:</h3>
                      <p className="leading-relaxed">
                        MSE: Alert, oriented x3. Affect is constricted. Eye contact is intermittent. Speech is pressured but coherent.
                        Judgment and insight are fair.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-bold text-[16px]">Assessment:</h3>
                      <p className="leading-relaxed font-bold">
                        F41.1 Generalized Anxiety Disorder - Exacerbation.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-bold text-[16px]">Plan:</h3>
                      <p className="leading-relaxed">
                        Utilized CBT techniques to address cognitive distortions. Developed grounding strategies for panic management.
                        Recommend continued weekly therapy.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <footer className="bg-white p-3 border-t border-slate-200 text-center">
          <div className="flex items-center justify-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-500" /> PDF/A-1b Compliant</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-500" /> Digital Signature Applied</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={12} className="text-emerald-500" /> 256-bit Encrypted</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AppealPackagePreview;
