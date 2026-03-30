import React from 'react';
import { Card, Avatar, Button } from './ui';
import { Calendar as CalendarIcon, MapPin, MoreHorizontal } from 'lucide-react';
import { appointments } from '../data/mockData';

const Appointments = () => {
  return (
    <Card className="flex flex-col p-0 overflow-hidden">
      <div className="flex items-center justify-between p-2 px-3 border-b border-gray-100">
        <h3 className="text-[16px] font-bold text-slate-800 flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-blue-500" />
          Appointments
        </h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="divide-y divide-gray-100">
        {appointments.map((apt, index) => (
          <div key={index} className="flex flex-col">
            {/* Top Info Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-5 gap-4">
              <Avatar size="md" initial="JS" className="bg-slate-200 text-slate-500 shrink-0" />
              
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:h-12 w-full">
                {/* Date/Left Column */}
                <div className="flex-1">
                  <h4 className="font-bold text-slate-700 text-[14px] leading-tight">{apt.date}</h4>
                  <p className="text-[12px] text-slate-500 mt-1">{apt.doctor}</p>
                </div>
                
                {/* Divider (visible only on sm screens and up) */}
                <div className="hidden sm:block w-[1px] h-full bg-gray-100 mx-4" />
                
                {/* Doctor/Middle Column */}
                <div className="flex-1">
                  <h4 className="font-bold text-slate-700 text-[14px] leading-tight">{apt.doctor}</h4>
                  <p className="text-[12px] text-slate-500 mt-1">{apt.location}</p>
                </div>
                
                {/* Divider (visible only on sm screens and up) */}
                <div className="hidden sm:block w-[1px] h-full bg-gray-100 mx-4" />
                
                {/* Time/Right Column */}
                <div className="w-full sm:w-24 text-left sm:text-right">
                  <span className="font-bold text-slate-700 text-[14px]">{apt.time}</span>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-5 py-3 border-t border-slate-50 gap-3 sm:gap-0">
              <div className="flex items-center gap-2 text-[12px] text-slate-500">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{apt.location}</span>
              </div>
              <button className="text-action-blue font-bold text-[14px] flex items-center gap-1.5 hover:underline">
                Join Now <span className="text-[16px] leading-none mb-0.5">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Appointments;
