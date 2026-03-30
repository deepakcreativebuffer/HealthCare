import React from 'react';
import { Card, Badge, Button } from './ui';
import { FileSignature, MoreHorizontal, Clock } from 'lucide-react';
import { assignedForms } from '../data/mockData';

const AssignedForms = () => {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <FileSignature className="w-5 h-5 text-blue-500" />
          Assigned Forms
        </h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {assignedForms.map((form) => (
          <div key={form.id} className={`flex justify-between items-center p-4 rounded-xl border ${form.status === 'Pending' ? 'bg-emerald-50/50 border-emerald-100' : 'bg-gray-50/50 border-gray-100'}`}>
            <div>
              <p className="font-bold text-gray-900">{form.name}</p>
              <div className="flex flex-col gap-1 mt-1">
                <span className={`text-sm flex items-center gap-1 ${form.status === 'Pending' ? 'text-gray-500' : 'text-gray-500'}`}>
                  {form.status === 'Pending' ? <><Clock className="w-4 h-4"/> Pending</> : <><FileSignature className="w-4 h-4"/> Signed</>}
                </span>
                <span className="text-xs text-gray-400">last updated 04/2024</span>
              </div>
            </div>
            {form.status === 'Pending' ? (
              <Button variant="ghost" className="text-emerald-600 px-0 hover:bg-transparent font-semibold">
                Sign Now
              </Button>
            ) : (
              <Button variant="ghost" className="text-action-blue px-0 hover:bg-transparent font-semibold">
                View All
              </Button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AssignedForms;
