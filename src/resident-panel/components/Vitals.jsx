import React from 'react';
import { Card } from './ui';
import { FileText, MoreHorizontal, Clock } from 'lucide-react';

const Vitals = ({ vitals }) => {
  return (
    <Card className="flex flex-col p-0 overflow-hidden">
      <div className="flex items-center justify-between p-2 px-3 border-b border-gray-100">
        <h3 className="text-[16px] font-bold text-slate-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" />
          Vitals
        </h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
        {/* Left Column: Allergies */}
        <div className="flex-1 flex flex-col">
          <div className="p-3 sm:p-5 flex-1 min-h-[140px]">
            <h4 className="font-bold text-slate-500 mb-4 text-[15px]">Allergies</h4>
            <ul className="space-y-3 text-[13px] text-gray-500">
              <li className="flex items-start before:content-['•'] before:mr-2 before:text-gray-300">
                Penicillin - Drug Allergy • Severe Reaction
              </li>
              <li className="flex items-start before:content-['•'] before:mr-2 before:text-gray-300">
                Dust, Peanuts - Environmental & Food
              </li>
            </ul>
          </div>
          
          <div className="px-5 py-3 border-t border-gray-100 flex justify-center">
            <button className="text-action-blue font-bold text-[14px] flex items-center gap-2 hover:underline">
              <Clock className="w-5 h-5" /> View Full History
            </button>
          </div>
        </div>

        {/* Right Column: Latest Vitals */}
        <div className="flex-1 p-3 sm:p-5 min-h-[140px]">
          <h4 className="font-bold text-slate-500 mb-4 text-[15px]">Latest Vitals</h4>
          <ul className="space-y-3 text-[13px] text-gray-500 pl-1">
            <li className="flex items-start before:content-['•'] before:mr-2 before:text-gray-300">
              Blood Pressure: <span className="ml-1">{vitals.bloodPressure}</span>
            </li>
            <li className="flex items-start before:content-['•'] before:mr-2 before:text-gray-300">
              Heart Rate: <span className="ml-1">{vitals.heartRate}</span>
            </li>
            <li className="flex items-start before:content-['•'] before:mr-2 before:text-gray-300">
              Body Mass Index: <span className="ml-1">{vitals.bmi}</span>
            </li>
            <li className="flex items-start before:content-['•'] before:mr-2 before:text-gray-300">
              Respiration Rate: <span className="ml-1">{vitals.respirationRate}</span>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default Vitals;
