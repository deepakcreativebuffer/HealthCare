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
      <div className="space-y-1">
        {mockData.specialNotes.map((note, idx) => (
          <div key={idx} className="flex gap-3 p-2 rounded-[10px] hover:bg-gray-50 transition-colors cursor-pointer group relative border-b border-gray-100 last:border-0">
            <div className={`w-2.5 h-2.5 rounded-full mt-2.5 shrink-0 ${
              note.color === 'red' ? 'bg-[#D32F2F]' :
              note.color === 'orange' ? 'bg-[#FF9800]' :
              note.color === 'teal' ? 'bg-[#00ACC1]' :
              'bg-[#129FED]'
            }`} />
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-[12px] font-bold text-slate-500 uppercase tracking-wide">
                  {note.category} <span className="text-slate-400 font-normal ml-1">—</span> <span className="text-slate-800 normal-case font-bold ml-1">{note.patient}</span>
                </h4>
                <span className="text-[11px] text-slate-400 font-bold whitespace-nowrap ml-2">
                  {note.time}
                </span>
              </div>
              <p className="text-[12px] font-medium text-slate-500 line-clamp-1 mt-0.5 leading-relaxed opacity-80">
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
