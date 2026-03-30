import React from 'react';
import { Users, MoreHorizontal } from 'lucide-react';
import PanelCard from './PanelCard';
import { mockData } from '../../data/mockData';

const ResidentRecords = () => {
  return (
    <PanelCard title="Active Resident Records" icon={Users} actionText="View All 32">
      <div className="space-y-1">
        {mockData.residentRecords.map((res, idx) => (
          <div key={idx} className="flex items-center gap-3 p-2 rounded-[10px] hover:bg-gray-50 transition-colors cursor-pointer group border-b border-gray-100 last:border-0">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[12px] font-bold ${
              res.color === 'orange' ? 'bg-[#FFF4E5] text-[#FF9800]' :
              res.color === 'blue' ? 'bg-[#DEF3FF] text-[#129FED]' :
              res.color === 'green' ? 'bg-[#E9F7EF] text-[#27AE60]' :
              res.color === 'red' ? 'bg-[#FFEBEE] text-[#D32F2F]' :
              'bg-[#E0F7FA] text-[#00ACC1]'
            }`}>
              {res.initial}
            </div>
            
            <div className="flex-1">
              <h4 className="text-[14px] font-bold text-slate-800 leading-tight">{res.name}</h4>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">
                DOB • {res.dob}
              </p>
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  );
};

export default ResidentRecords;
