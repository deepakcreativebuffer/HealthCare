import React from 'react';
import { Card } from './ui';
import { Calendar, CalendarCheck, Clock } from 'lucide-react';

const QuickActions = () => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Card className="flex flex-col items-center justify-center p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors group">
        <Calendar className="w-6 h-6 text-gray-400 group-hover:text-blue-600 mb-2" />
        <span className="text-xs font-semibold text-center group-hover:text-blue-600">Book<br/>Appointment</span>
      </Card>
      <Card className="flex flex-col items-center justify-center p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors group">
        <CalendarCheck className="w-6 h-6 text-gray-400 group-hover:text-blue-600 mb-2" />
        <span className="text-xs font-semibold text-center group-hover:text-blue-600">Manage<br/>Appointments</span>
      </Card>
      <Card className="flex flex-col items-center justify-center p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors group">
        <Clock className="w-6 h-6 text-gray-400 group-hover:text-blue-600 mb-2" />
        <span className="text-xs font-semibold text-center group-hover:text-blue-600">Appointment<br/>History</span>
      </Card>
    </div>
  );
};

export default QuickActions;
