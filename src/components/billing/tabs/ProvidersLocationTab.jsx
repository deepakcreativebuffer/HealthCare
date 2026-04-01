import React from "react";
import {
  Building2,
  User,
  MapPin,
  ChevronDown,
  FileText,
  Stethoscope,
  Activity,
} from "lucide-react";
import { billingData } from "../../../data/billingData";

const FieldBox = ({ label, value, isSelect = false }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-1.5 relative overflow-hidden group hover:border-slate-200 transition-all">
    <div className="flex justify-between items-start">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {label}
      </span>
      {isSelect && <ChevronDown size={14} className="text-slate-400 mt-0.5" />}
    </div>
    <span className="text-[14px] font-extrabold text-slate-800 tracking-tight">
      {value}
    </span>
  </div>
);

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="px-6 py-4 border-b border-slate-50 bg-[#f8fafc]/50 flex items-center gap-3 text-[#009bf2]">
    <Icon size={16} className="stroke-[2.5]" />
    <span className="text-[11px] font-extrabold uppercase tracking-widest">
      {title}
    </span>
  </div>
);

const ProvidersLocationTab = () => {
  const { providers } = billingData.patientSnapshot;

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Tab Level Header */}
      <div className="flex items-center gap-3 text-[#009bf2] mb-2">
        <Building2 size={20} className="stroke-[2.5]" />
        <h2 className="text-[13px] font-extrabold uppercase tracking-tight">
          Providers & Service Location
        </h2>
      </div>

      <div className="space-y-6">
        {/* Section 1: Billing Detail (Mockup label: Subscriber Details) */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <SectionHeader icon={FileText} title="Subscriber Details" />
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FieldBox label="Name" value={providers.billing.name} />
              <FieldBox label="NPI" value={providers.billing.npi} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FieldBox label="Tax ID" value={providers.billing.taxId} />
              <FieldBox label="Phone" value={providers.billing.phone} />
            </div>
          </div>
        </div>

        {/* Section 2: Rendering Provider */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <SectionHeader icon={Stethoscope} title="Rendering Provider" />
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FieldBox
                label="Provider"
                value={providers.rendering.name}
                isSelect={true}
              />
              <FieldBox label="NPI" value={providers.rendering.npi} />
              <FieldBox
                label="Specialty"
                value={providers.rendering.specialty}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Service Location */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <SectionHeader icon={MapPin} title="Service Location" />
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FieldBox
                label="Facility"
                value={providers.facility.name}
                isSelect={true}
              />
              <FieldBox label="Address" value={providers.facility.address} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FieldBox label="Facility NPI" value={providers.facility.npi} />
              <FieldBox label="POS" value={providers.facility.pos} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProvidersLocationTab;
