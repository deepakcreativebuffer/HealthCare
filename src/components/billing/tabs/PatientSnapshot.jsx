import React from "react";
import { UserCircle, Calendar, MapPin, Search } from "lucide-react";
import { billingData } from "../../../data/billingData";

const PatientSnapshot = () => {
  const { patientSnapshot } = billingData;

  const dataFields = [
    { label: "Name", value: patientSnapshot.name },
    { label: "Date of Birth", value: patientSnapshot.dob },
    { label: "Gender", value: patientSnapshot.gender },
    { label: "City, State, ZIP", value: patientSnapshot.address },
    { label: "Subscriber", value: patientSnapshot.subscriber },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 text-[#009bf2]">
        <UserCircle size={20} className="stroke-[2.5]" />
        <h2 className="text-[13px] font-extrabold uppercase tracking-tight">
          Patient Snapshot
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dataFields.map((field, idx) => (
          <div
            key={idx}
            className={`bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-2 ${
              field.label === "Subscriber" ? "md:col-span-2" : ""
            }`}
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {field.label}
            </span>
            <span className="text-[14px] font-extrabold text-slate-800">
              {field.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientSnapshot;
