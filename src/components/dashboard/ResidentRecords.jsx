import React from 'react';
import { Users, MoreHorizontal } from 'lucide-react';
import PanelCard from './PanelCard';
import { mockData } from '../../data/mockData';

const ResidentRecords = () => {
  return (
    <PanelCard title="Active Resident Records" icon={Users} actionText="View All 32">
      <div className="space-y-4">
        {mockData.residentRecords.map((res, idx) => (
          <div key={idx} className="flex items-center gap-4 group cursor-pointer border-b border-slate-50 pb-4 last:border-0 last:pb-0">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
              res.color === 'orange' ? 'bg-orange-100 text-orange-600' :
              res.color === 'blue' ? 'bg-blue-100 text-blue-600' :
              res.color === 'green' ? 'bg-green-100 text-green-600' :
              res.color === 'red' ? 'bg-red-100 text-red-600' :
              'bg-cyan-100 text-cyan-600'
            }`}>
              {res.initial}
            </div>
            
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-800 leading-tight">{res.name}</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">
                DOB • {res.dob}
              </p>
            </div>
            
            <button className="text-slate-300 hover:text-slate-500">
              <MoreHorizontal size={18} />
            </button>
          </div>
        ))}
      </div>
    </PanelCard>
  );
};

export default ResidentRecords;
