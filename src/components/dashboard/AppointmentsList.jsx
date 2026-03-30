import React from 'react';
import { CalendarClock, Clock, User, ChevronDown } from 'lucide-react';
import PanelCard from './PanelCard';
import { mockData } from '../../data/mockData';

const AppointmentsList = () => {
  return (
    <PanelCard 
      title="Today's Appointments" 
      icon={CalendarClock} 
      badge={
        <div className="flex items-center gap-1.5 bg-[#e9f7ef] text-[#27ae60] text-[10px] font-bold px-2 py-1 rounded-full ml-1">
          <div className="w-1.5 h-1.5 bg-[#27ae60] rounded-full animate-pulse" />
          4 Today
        </div>
      } 
      actionText="View Appointments"
      showMore={false}
    >
      <div className="space-y-3">
        {mockData.appointments.map((apt, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-4 flex gap-4 hover:shadow-sm transition-all group/apt cursor-pointer relative overflow-hidden">
             {/* Left Icon with color indicator */}
             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                idx === 0 ? 'bg-green-50 text-green-500' :
                idx === 1 ? 'bg-blue-50 text-blue-500' :
                idx === 2 ? 'bg-red-50 text-red-500' : 
                'bg-orange-50 text-orange-500'
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 ${
                  idx === 0 ? 'border-green-100' :
                  idx === 1 ? 'border-blue-100' :
                  idx === 2 ? 'border-red-100' : 
                  'border-orange-100'
                }`}>
                   <CalendarClock size={20} />
                </div>
             </div>

             <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800 tracking-tight">{apt.name}</h4>
                </div>
                <div className="flex items-center gap-2 mt-1 px-0.5">
                  <span className="text-[11px] text-slate-400 font-bold">{apt.doctor}</span>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold before:content-['•'] before:mr-2 before:text-slate-300">
                    <Clock size={12} className="text-slate-300" />
                    {apt.time} – {apt.duration}
                  </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </PanelCard>
  );
};

export default AppointmentsList;
