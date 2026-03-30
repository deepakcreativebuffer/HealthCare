import React from 'react';
import { Card, Button } from './ui';
import { FileText, MoreHorizontal, Clock } from 'lucide-react';
import { vitals } from '../data/mockData';

const Vitals = () => {
  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" />
          Vitals
        </h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Allergies</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="flex items-start before:content-['•'] before:mr-2 before:text-gray-300">
              Penicillin • Drug Allergy • Severe Reaction
            </li>
            <li className="flex items-start before:content-['•'] before:mr-2 before:text-gray-300">
              Dust, Peanuts • Environmental & Food
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Latest Vitals</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="flex items-start before:content-['•'] before:mr-2 before:text-gray-300">
              Blood Pressure: {vitals.bloodPressure}
            </li>
            <li className="flex items-start before:content-['•'] before:mr-2 before:text-gray-300">
              Heart Rate: {vitals.heartRate}
            </li>
            <li className="flex items-start before:content-['•'] before:mr-2 before:text-gray-300">
              Body Mass Index: {vitals.bmi}
            </li>
            <li className="flex items-start before:content-['•'] before:mr-2 before:text-gray-300">
              Respiration Rate: {vitals.respirationRate}
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center">
        <Button variant="ghost" className="text-action-blue font-semibold hover:bg-action-blue/10 flex items-center gap-2">
          <Clock className="w-4 h-4" /> View Full History
        </Button>
      </div>
    </Card>
  );
};

export default Vitals;
