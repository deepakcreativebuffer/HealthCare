import React from 'react';
import { UserPlus, Activity, MapPin, FileSearch, ArrowRight, Zap, ChevronRight } from 'lucide-react';
import PanelCard from './PanelCard';

const linkItems = [
  { icon: UserPlus, label: 'Add New User', sub: 'Register a new profile', color: 'green' },
  { icon: Activity, label: 'Resident Vitals', sub: 'Log daily health stats', color: 'blue' },
  { icon: MapPin, label: 'Resident Tracking', sub: 'View current location and status', color: 'orange' },
  { icon: FileSearch, label: 'View Logs', sub: 'Access historical records', color: 'red' },
];

const QuickLinks = () => {
  return (
    <PanelCard title="Quick Links" icon={Zap}>
      <div className="space-y-3">
        {linkItems.map((link, idx) => (
          <button 
            key={idx} 
            className="w-full flex items-center gap-4 p-3 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition-all text-left group/link shadow-sm"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
              link.color === 'green' ? 'bg-green-50 text-green-600' :
              link.color === 'blue' ? 'bg-blue-50 text-blue-600' :
              link.color === 'orange' ? 'bg-orange-50 text-orange-600' :
              'bg-red-50 text-red-600'
            }`}>
              <link.icon size={20} />
            </div>
            
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-800 leading-tight">{link.label}</h4>
              <p className="text-[10px] text-slate-400 font-bold mt-0.5">{link.sub}</p>
            </div>
            
            <ChevronRight size={18} className="text-slate-300 group-hover/link:text-blue-500 group-hover/link:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
    </PanelCard>
  );
};

export default QuickLinks;
