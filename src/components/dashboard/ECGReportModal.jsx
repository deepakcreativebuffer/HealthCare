import React, { useState } from 'react';
import { X, Activity, Upload, Loader2, CheckCircle2, DownloadIcon } from 'lucide-react';

const ECGReportModal = ({ isOpen, onClose, residentId }) => {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2 text-slate-800">
            <Activity className="w-5 h-5 text-emerald-500" />
            <h2 className="text-sm font-black uppercase tracking-tight">View ECG Analysis</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* ECG Monitor View */}
          <div className="bg-[#1e222d] rounded-2xl p-6 relative overflow-hidden group border border-slate-800 shadow-inner">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#4ADE80 1px, transparent 1px), linear-gradient(90deg, #4ADE80 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="relative h-32 flex items-center justify-center">
              <svg className="w-full h-full text-emerald-400 stroke-[1.5] drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" viewBox="0 0 400 100" fill="none" stroke="currentColor">
                <path d="M0 50 L40 50 L50 20 L60 80 L70 50 L140 50 L150 10 L160 90 L170 50 L240 50 L250 20 L260 80 L270 50 L340 50 L350 10 L360 90 L370 50 L400 50" strokeLinecap="round" strokeLinejoin="round">
                  <animate
                    attributeName="stroke-dasharray"
                    from="0, 1000"
                    to="1000, 0"
                    dur="3s"
                    repeatCount="1"
                  />
                </path>
              </svg>
            </div>

            <div className="mt-4 flex flex-col items-center gap-1">
              <p className="text-[10px] font-black tracking-[0.3em] text-emerald-400 uppercase drop-shadow-[0_0_5px_rgba(74,222,128,0.4)]">Recording Active... Normal Sinus Rhythm</p>
              <div className="flex gap-2 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-none">Live Telemetry Data Feed</span>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'HR', value: '72 bpm', color: 'slate' },
              { label: 'PR INT', value: '0.16s', color: 'slate' },
              { label: 'QRS', value: '0.08s', color: 'slate' },
              { label: 'QTC', value: '0.41s', color: 'slate' }
            ].map((metric, i) => (
              <div key={i} className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl text-center group hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-default">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.1em] mb-1 group-hover:text-blue-500">{metric.label}</p>
                <p className="text-sm font-black text-slate-800">{metric.value}</p>
              </div>
            ))}
          </div>

          {/* Upload Section */}
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50/30 flex flex-col items-center justify-center gap-3 group hover:border-blue-300 hover:bg-blue-50/50 transition-all">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <Upload size={24} />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-700 leading-tight">Add New ECG Report</p>
              <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-tight">Drop DICOM or PDF files here to analyze</p>
            </div>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="mt-2 px-6 py-2 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-slate-800 transition-all shadow-lg flex items-center gap-2 disabled:opacity-70"
            >
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              {uploading ? 'Processing...' : 'Upload File'}
            </button>
            {success && (
              <div className="flex items-center gap-2 text-emerald-600 animate-in slide-in-from-top-2">
                <CheckCircle2 size={16} />
                <span className="text-xs font-bold uppercase tracking-tight">Report Added Successfully</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-blue-600 text-white font-black uppercase tracking-widest py-3 rounded-xl hover:bg-blue-700 transition-all text-[11px] shadow-lg shadow-blue-100"
          >
            Close Analysis
          </button>
          <button className="flex-none aspect-square bg-slate-100 text-slate-600 p-3 rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center">
            <DownloadIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ECGReportModal;
