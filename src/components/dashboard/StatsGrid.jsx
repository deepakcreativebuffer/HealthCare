import React, { useState, useEffect } from 'react';
import {
  Users,
  UserCheck,
  CalendarClock,
  Stethoscope,
  CalendarDays,
  FileText,
  TrendingDown,
  TrendingUp,
  Loader2
} from 'lucide-react';
import { api } from '../../data/api';

const iconMap = {
  Users: { icon: Users, bg: 'bg-teal-50', color: 'text-teal-600' },
  UserCheck: { icon: UserCheck, bg: 'bg-blue-50', color: 'text-blue-600' },
  CalendarClock: { icon: CalendarClock, bg: 'bg-orange-50', color: 'text-orange-600' },
  Stethoscope: { icon: Stethoscope, bg: 'bg-red-50', color: 'text-red-600' },
  CalendarDays: { icon: CalendarDays, bg: 'bg-indigo-50', color: 'text-indigo-600' },
  FileText: { icon: FileText, bg: 'bg-green-50', color: 'text-green-600' },
};

const StatsGrid = ({ onStatClick }) => {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getDashboardStats().then(data => {
      setStats(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-6">
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className="bg-white rounded-[10px] border border-[#E2E8F0] shadow-sm p-4 h-[110px] flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-6">
      {stats.map((stat, idx) => {
        const IconConfig = iconMap[stat.icon || 'Users'];
        return (
          <div 
            key={idx} 
            onClick={() => onStatClick?.(stat.title)}
            className="bg-white rounded-[10px] border border-[#E2E8F0] shadow-sm p-4 hover:shadow-md hover:border-blue-200 transition-all group cursor-pointer flex flex-col h-full active:scale-95 duration-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`${IconConfig.bg} ${IconConfig.color} w-10 h-10 rounded-[10px] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0`}>
                <IconConfig.icon size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[20px] font-bold text-slate-800 leading-tight">{stat.value}</span>
                <p className="text-[12px] font-medium text-slate-500">{stat.title}</p>
              </div>
            </div>

            <div className="mt-auto flex items-center gap-1.5 pt-2 border-t border-gray-100">
              <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full ${stat.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.trendUp ? (
                  <TrendingUp size={10} />
                ) : (
                  <TrendingDown size={10} />
                )}
                <span className="text-[10px] font-bold">
                  {stat.trend}
                </span>
              </div>
              <span className="text-[10px] text-slate-400">vs last month</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
