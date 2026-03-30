import React from 'react';
import { Bell } from 'lucide-react';
import PanelCard from './PanelCard';
import { mockData } from '../../data/mockData';

const SpecialNotes = () => {
  return (
    <PanelCard 
      title="Special Notes" 
      icon={Bell} 
      badge={
        <div className="flex items-center justify-center bg-[#fdeef1] text-[#f21c5b] text-[10px] font-bold w-5 h-5 rounded-full ml-1">
          3
        </div>
      }
      headerAction={<button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">View All</button>}
      showFooter={false}
      showMore={false}
    >
      <div className="space-y-4">
        {mockData.specialNotes.map((note, idx) => (
          <div key={idx} className="flex gap-4 group cursor-pointer border-b border-slate-50 pb-4 last:border-0 last:pb-0">
            <div className={`w-2 h-2 rounded-full mt-2.5 shrink-0 ${
              note.color === 'red' ? 'bg-red-500' :
              note.color === 'orange' ? 'bg-orange-500' :
              note.color === 'teal' ? 'bg-teal-500' :
              'bg-blue-500'
            }`} />
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  {note.category}: <span className="text-slate-700 normal-case font-bold">{note.patient}</span>
                </h4>
                <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap ml-2">
                  {note.time}
                </span>
              </div>
              <p className="text-[11px] font-semibold text-slate-400 line-clamp-1 mt-1 leading-relaxed">
                {note.note}
              </p>
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  );
};

export default SpecialNotes;
