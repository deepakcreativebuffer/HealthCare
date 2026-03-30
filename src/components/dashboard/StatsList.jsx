import React from 'react';
import { AreaChart, Brain, Target, BookOpen } from 'lucide-react';
import PanelCard from './PanelCard';
import { mockData } from '../../data/mockData';

const iconMap = {
  blue: { bg: 'bg-blue-100/50 text-blue-500', icon: AreaChart },
  orange: { bg: 'bg-orange-100/50 text-orange-500', icon: Brain },
  green: { bg: 'bg-green-100/50 text-green-500', icon: Target },
  sky: { bg: 'bg-sky-100/50 text-sky-500', icon: BookOpen },
};

const StatsList = () => {
  return (
    <PanelCard title="Stats" icon={AreaChart} actionText="View All Stats">
      <div className="space-y-3">
        {mockData.mainStats.map((stat, idx) => {
          const Config = iconMap[stat.color];
          return (
            <div 
              key={idx} 
              className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 hover:shadow-sm transition-all group cursor-pointer relative"
            >
              {/* Icon Container */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${Config.bg} group-hover:scale-105 transition-transform shadow-sm`}>
                <Config.icon size={24} />
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-slate-800 tracking-tight leading-none block">
                      {stat.value}
                    </span>
                    <p className="text-[11px] font-bold text-slate-400 mt-1.5 leading-tight uppercase tracking-tight">
                      {stat.label}
                    </p>
                  </div>
                  
                  {/* View All Individual Link */}
                  <button className="text-[10px] font-extrabold text-[#1e88e5] hover:underline whitespace-nowrap">
                    View All
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PanelCard>
  );
};

export default StatsList;
