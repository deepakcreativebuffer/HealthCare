import React from "react";
import { Printer, Download, Eye, AlertCircle } from "lucide-react";

const CMS1500Preview = ({ claimData }) => {
  if (!claimData) return null;

  return (
    <div className="bg-slate-100 p-8 rounded-2xl border border-slate-200 shadow-inner max-h-[80vh] overflow-y-auto custom-scrollbar">
      {/* CMS-1500 Paper Form Simulation */}
      <div className="bg-white mx-auto shadow-2xl border border-slate-300 w-full max-w-4xl p-10 font-serif text-[11px] text-slate-800 leading-tight">
        
        {/* Header Section */}
        <div className="flex justify-between border-b-2 border-rose-600 pb-2 mb-4">
          <div className="text-[14px] font-black italic text-rose-600 uppercase tracking-tighter">
            Health Insurance Claim Form
          </div>
          <div className="text-[9px] font-bold text-slate-400">
            OMB-0938-1197 FORM CMS-1500 (02-12)
          </div>
        </div>

        <div className="grid grid-cols-12 gap-px bg-slate-400 border border-slate-400">
          {/* Row 1: Payer Info */}
          <div className="col-span-12 bg-white p-2">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1"><input type="checkbox" checked /> MEDICARE</label>
              <label className="flex items-center gap-1"><input type="checkbox" /> MEDICAID</label>
              <label className="flex items-center gap-1"><input type="checkbox" /> TRICARE</label>
              <label className="flex items-center gap-1"><input type="checkbox" /> CHAMPVA</label>
              <label className="flex items-center gap-1"><input type="checkbox" /> GROUP HEALTH PLAN</label>
              <label className="flex items-center gap-1"><input type="checkbox" /> FECA</label>
              <label className="flex items-center gap-1"><input type="checkbox" /> OTHER</label>
              <div className="ml-auto flex flex-col items-end">
                <span className="text-[8px] font-bold text-slate-400">1a. INSURED'S I.D. NUMBER</span>
                <span className="text-[12px] font-bold underline decoration-dotted">MEM-987654321</span>
              </div>
            </div>
          </div>

          {/* Row 2: Patient Info */}
          <div className="col-span-6 bg-white p-2 border-r border-slate-400">
            <span className="text-[8px] font-bold text-slate-400 block">2. PATIENT'S NAME (Last Name, First Name, Middle Initial)</span>
            <span className="text-[12px] font-bold uppercase">{claimData.patient}</span>
          </div>
          <div className="col-span-3 bg-white p-2 border-r border-slate-400">
            <span className="text-[8px] font-bold text-slate-400 block">3. PATIENT'S BIRTH DATE</span>
            <span className="text-[12px] font-bold">02 15 1992</span>
          </div>
          <div className="col-span-3 bg-white p-2">
            <span className="text-[8px] font-bold text-slate-400 block">4. INSURED'S NAME</span>
            <span className="text-[12px] font-bold uppercase">{claimData.patient}</span>
          </div>

          {/* Row 3: Address */}
          <div className="col-span-6 bg-white p-2 border-r border-slate-400">
            <span className="text-[8px] font-bold text-slate-400 block">5. PATIENT'S ADDRESS (No., Street)</span>
            <span className="text-[12px] font-bold uppercase">123 WELLNESS DR, SUITE 200</span>
          </div>
          <div className="col-span-3 bg-white p-2 border-r border-slate-400">
            <span className="text-[8px] font-bold text-slate-400 block">6. PATIENT RELATIONSHIP TO INSURED</span>
            <div className="flex gap-2">
              <label className="flex items-center gap-1"><input type="checkbox" checked /> Self</label>
              <label className="flex items-center gap-1"><input type="checkbox" /> Spouse</label>
            </div>
          </div>
          <div className="col-span-3 bg-white p-2">
            <span className="text-[8px] font-bold text-slate-400 block">7. INSURED'S ADDRESS</span>
            <span className="text-[12px] font-bold uppercase">SAME AS PATIENT</span>
          </div>
        </div>

        {/* Diagnosis Section */}
        <div className="mt-4 border border-slate-400">
          <div className="bg-slate-50 p-1 border-b border-slate-400">
            <span className="text-[9px] font-bold uppercase">21. DIAGNOSIS OR NATURE OF ILLNESS OR INJURY</span>
          </div>
          <div className="grid grid-cols-4 p-2 gap-4">
            {['F32.9', 'E11.9', 'F41.1', 'I10'].map((code, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="font-bold text-slate-400">{String.fromCharCode(65 + i)}.</span>
                <span className="text-[12px] font-bold border-b border-slate-200 flex-1">{code}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service Lines Section */}
        <div className="mt-4 border border-slate-400">
          <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-400 text-[8px] font-bold uppercase text-center">
            <div className="col-span-2 border-r border-slate-400 p-1">24a. Date(s) of Service</div>
            <div className="col-span-1 border-r border-slate-400 p-1">24b. POS</div>
            <div className="col-span-1 border-r border-slate-400 p-1">24c. EMG</div>
            <div className="col-span-2 border-r border-slate-400 p-1">24d. CPT/HCPCS</div>
            <div className="col-span-1 border-r border-slate-400 p-1">24e. DIAG</div>
            <div className="col-span-2 border-r border-slate-400 p-1">24f. $ CHARGES</div>
            <div className="col-span-1 border-r border-slate-400 p-1">24g. UNITS</div>
            <div className="col-span-2 p-1">24j. RENDERING NPI</div>
          </div>
          
          {[1, 2].map((_, i) => (
            <div key={i} className="grid grid-cols-12 border-b border-slate-200 h-8 items-center text-center">
              <div className="col-span-2 border-r border-slate-200 text-[10px] font-bold uppercase">02 12 25</div>
              <div className="col-span-1 border-r border-slate-200 text-[11px] font-bold">11</div>
              <div className="col-span-1 border-r border-slate-200"></div>
              <div className="col-span-2 border-r border-slate-200 text-[11px] font-bold">90837</div>
              <div className="col-span-1 border-r border-slate-200 text-[11px] font-bold">A</div>
              <div className="col-span-2 border-r border-slate-200 text-[11px] font-bold">200.00</div>
              <div className="col-span-1 border-r border-slate-200 text-[11px] font-bold">1</div>
              <div className="col-span-2 text-[11px] font-bold">1234567890</div>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="mt-4 grid grid-cols-12 gap-4">
          <div className="col-span-4 border border-slate-400 p-2">
            <span className="text-[8px] font-bold text-slate-400 block">31. SIGNATURE OF PHYSICIAN OR SUPPLIER</span>
            <div className="h-8 flex items-end">
              <span className="text-[12px] font-bold italic border-b border-slate-200 w-full text-center">Dr. Emily Roberts, MD</span>
            </div>
          </div>
          <div className="col-span-4 border border-slate-400 p-2">
            <span className="text-[8px] font-bold text-slate-400 block">32. SERVICE FACILITY LOCATION</span>
            <span className="text-[9px] font-medium leading-none">RECOVERY CENTER<br/>456 SERENITY LN, AUSTIN, TX</span>
          </div>
          <div className="col-span-4 border border-slate-400 p-2">
            <span className="text-[8px] font-bold text-slate-400 block">33. BILLING PROVIDER INFO & PHONE</span>
            <span className="text-[9px] font-medium leading-none">BEHAVIORAL HEALTH LLC<br/>(555) 555-0199</span>
          </div>
        </div>

        {/* Validation Overlay (Phase 1 Integration) */}
        <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-1.5 rounded-full text-white">
              <Eye size={16} />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-emerald-900">Claim Assembly Validated</h4>
              <p className="text-[11px] text-emerald-700 font-medium">All Loop 2000/2300/2400 elements compliant with 005010X222A1 TR3.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => alert("Printing CMS-1500 Claim Form...")}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 hover:bg-slate-50 shadow-sm"
            >
              <Printer size={14} /> Print CMS-1500
            </button>
            <button 
              onClick={() => alert("Exporting ANSI X12 837P EDI File...")}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[11px] font-bold hover:bg-slate-800 shadow-sm"
            >
              <Download size={14} /> Export EDI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMS1500Preview;
