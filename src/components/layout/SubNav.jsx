import React from 'react';
import {
  Users,
  SquarePen,
  Target,
  LayoutList,
  Send,
  CalendarClock,
  FileText,
  UserRoundCheck,
  Building2
} from 'lucide-react';

const subNavItems = [
  { icon: Users, label: 'Staff Schedule' },
  { icon: SquarePen, label: 'Notes Library' },
  { icon: Target, label: 'Measurable Goal' },
  { icon: LayoutList, label: 'Objective' },
  { icon: Send, label: 'Interventions' },
  { icon: CalendarClock, label: 'Activity Schedule' },
  { icon: FileText, label: 'Special Notes' },
  { icon: UserRoundCheck, label: 'Employee' },
  { icon: Building2, label: 'Residents' },
];

const SubNav = () => {
  return (
    <div className="bg-white px-4 sm:px-6 py-3 border-b border-gray-100 flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth">
      {subNavItems.map((item, idx) => (
        <button
          key={item.label}
          className="flex items-center gap-2.5 px-3 py-1 rounded-[10px] bg-[#F8FAFC] text-[#64748B] hover:text-[#129FED] hover:bg-slate-100 transition-all border border-[#E2E8F0] whitespace-nowrap active:scale-95 duration-75 group"
        >
          <item.icon size={14} className="text-[#64748B] group-hover:text-[#129FED]" />
          <span className="text-[13px] font-bold">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SubNav;
