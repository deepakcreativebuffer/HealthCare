import React from 'react';
import { 
  Users, 
  BookOpen, 
  Target, 
  Zap, 
  Activity, 
  FileText, 
  UserCheck, 
  ClipboardList 
} from 'lucide-react';

const subNavItems = [
  { icon: Users, label: 'Staff Schedule' },
  { icon: BookOpen, label: 'Notes Library' },
  { icon: Target, label: 'Measurable Goal' },
  { icon: Zap, label: 'Objective' },
  { icon: Activity, label: 'Interventions' },
  { icon: CalendarClock, label: 'Activity Schedule' },
  { icon: FileText, label: 'Special Notes' },
  { icon: UserCheck, label: 'Employee' },
  { icon: ClipboardList, label: 'Residents' },
];

// Helper to fix the missing icon import in the subNavItems
import { CalendarClock } from 'lucide-react';

const SubNav = () => {
  return (
    <div className="bg-[#f8fafc] px-4 sm:px-6 py-3 border-b border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
      {subNavItems.map((item, idx) => (
        <button
          key={item.label}
          className="flex items-center gap-2 px-3 py-2 rounded-[10px] bg-white text-slate-500 hover:text-[#129FED] hover:border-[#90CEF0] transition-all border border-[#E2E8F0] shadow-sm whitespace-nowrap active:scale-95 duration-75 group"
        >
          <item.icon size={16} className="text-slate-400 group-hover:text-[#129FED]" />
          <span className="text-[13px] font-bold">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SubNav;
