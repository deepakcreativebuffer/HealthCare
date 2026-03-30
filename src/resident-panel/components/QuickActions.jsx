import React from 'react';
import { Card } from './ui';
import { CalendarCheck, CalendarPlus, History } from 'lucide-react';

const QuickActions = () => {
  return (
    <Card className="p-2 bg-white">
      <div className="flex flex-col sm:flex-row items-center justify-around divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        {/* Book Appointment */}
        <div className="flex items-center gap-4 flex-1 justify-center cursor-pointer group px-3 py-4 sm:py-2 w-full sm:w-auto">
          <CalendarCheck className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-action-blue transition-colors" />
          <div className="text-action-blue font-bold text-[13px] sm:text-[14px] leading-tight">
            Book<br />Appointment
          </div>
        </div>

        {/* Manage Appointments */}
        <div className="flex items-center gap-4 flex-1 justify-center cursor-pointer group px-3 py-4 sm:py-2 w-full sm:w-auto">
          <CalendarPlus className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-action-blue transition-colors" />
          <div className="text-action-blue font-bold text-[13px] sm:text-[14px] leading-tight">
            Manage<br />Appointments
          </div>
        </div>

        {/* Appointment History */}
        <div className="flex items-center gap-4 flex-1 justify-center cursor-pointer group px-3 py-4 sm:py-2 w-full sm:w-auto">
          <History className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-action-blue transition-colors" />
          <div className="text-action-blue font-bold text-[13px] sm:text-[14px] leading-tight">
            Appointment<br />History
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuickActions;
