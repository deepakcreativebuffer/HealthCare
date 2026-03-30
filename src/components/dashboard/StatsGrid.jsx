import React from 'react';
import { 
  Users, 
  UserCheck, 
  CalendarClock, 
  Stethoscope, 
  CalendarDays, 
  FileText,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { mockData } from '../../data/mockData';

const iconMap = {
  Users: { icon: Users, bg: 'bg-teal-50', color: 'text-teal-600' },
  UserCheck: { icon: UserCheck, bg: 'bg-blue-50', color: 'text-blue-600' },
  CalendarClock: { icon: CalendarClock, bg: 'bg-orange-50', color: 'text-orange-600' },
  Stethoscope: { icon: Stethoscope, bg: 'bg-red-50', color: 'text-red-600' },
  CalendarDays: { icon: CalendarDays, bg: 'bg-indigo-50', color: 'text-indigo-600' },
  FileText: { icon: FileText, bg: 'bg-green-50', color: 'text-green-600' },
};

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-6">
      {mockData.stats.map((stat, idx) => {
        const IconConfig = iconMap[stat.icon];
        return (
          <div key={idx} className="dashboard-card p-4 hover:shadow-md transition-shadow group cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className={`${IconConfig.bg} ${IconConfig.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                <IconConfig.icon size={20} />
              </div>
              <span className="text-2xl font-bold text-slate-800 tracking-tight">{stat.value}</span>
            </div>
            <div className="flex flex-col">
              <p className="text-xs font-medium text-slate-500 mb-1">{stat.title}</p>
              <div className="flex items-center gap-1">
                {stat.trendUp ? (
                  <TrendingUp size={12} className="text-green-500" />
                ) : (
                  <TrendingDown size={12} className="text-red-500" />
                )}
                <span className={`text-[10px] font-bold ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend}
                </span>
                <span className="text-[10px] text-slate-400">vs last month</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
