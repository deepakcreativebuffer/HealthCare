import React from 'react';
import { Card, Avatar, Button } from './ui';
import { Calendar as CalendarIcon, MapPin, MoreHorizontal } from 'lucide-react';
import { appointments } from '../data/mockData';

const Appointments = () => {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-blue-500" />
          Appointments
        </h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {appointments.map((apt, index) => (
          <div key={index} className="flex flex-col gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <Avatar initial="D" className="bg-gray-200 text-gray-500" />
                <div>
                  <h4 className="font-semibold text-gray-900">{apt.date}</h4>
                  <p className="text-sm text-gray-500">{apt.doctor}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-gray-900">{apt.time}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <MapPin className="w-4 h-4" />
              <span>{apt.location}</span>
            </div>
            
            <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-1">
              <div className="text-sm text-gray-500">
                {apt.doctor} • {apt.location}
              </div>
              <Button variant="ghost" className="text-action-blue px-0 hover:bg-transparent font-semibold">
                Join Now →
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Appointments;
