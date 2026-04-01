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
  <div className="bg-white p-3.5 rounded-lg border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col gap-1 relative overflow-hidden group transition-all hover:shadow-[0_4px_15px_rgba(0,0,0,0.04)]">
    <div className="flex justify-between items-start">
      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
        {label}
      </span>
      {isSelect && <ChevronDown size={12} className="text-slate-300 mt-0.5" />}
    </div>
    <span className="text-[13px] font-bold text-slate-700 tracking-tight leading-none group-hover:text-slate-900">
      {value}
    </span>
  </div>
);

const SectionTitle = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 mb-4 px-1">
    <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
      <Icon size={12} className="text-slate-400" />
    </div>
    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
      {title}
    </span>
  </div>
);

const ProvidersLocationTab = () => {
  const { providers } = billingData.patientSnapshot;

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500 antialiased">
      <div className="space-y-8">
        {/* Section 1: Billing Detail */}
        <section>
          <SectionTitle icon={FileText} title="Subscriber Details" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FieldBox label="Entity Name" value={providers.billing.name} />
            <FieldBox label="NPI Identifier" value={providers.billing.npi} />
            <FieldBox label="Tax Registration" value={providers.billing.taxId} />
            <FieldBox label="Contact Phone" value={providers.billing.phone} />
          </div>
        </section>

        {/* Section 2: Rendering Provider */}
        <section>
          <SectionTitle icon={Stethoscope} title="Rendering Provider" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FieldBox
              label="Primary Provider"
              value={providers.rendering.name}
              isSelect={true}
            />
            <FieldBox label="NPI Number" value={providers.rendering.npi} />
            <FieldBox
              label="Clinical Specialty"
              value={providers.rendering.specialty}
            />
          </div>
        </section>

        {/* Section 3: Service Location */}
        <section>
          <SectionTitle icon={MapPin} title="Service Location" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FieldBox
              label="Medical Facility"
              value={providers.facility.name}
              isSelect={true}
            />
            <FieldBox label="Site Address" value={providers.facility.address} />
            <FieldBox label="Facility NPI" value={providers.facility.npi} />
            <FieldBox label="POS Code" value={providers.facility.pos} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProvidersLocationTab;
