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
    <div className="bg-white px-6 py-2 border-b border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
      {subNavItems.map((item, idx) => (
        <button
          key={item.label}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-500 hover:bg-gray-50 hover:text-slate-800 transition-all border border-transparent whitespace-nowrap active:scale-95 duration-75"
        >
          <item.icon size={18} className="text-slate-400 group-hover:text-blue-500" />
          <span className="text-sm font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SubNav;
