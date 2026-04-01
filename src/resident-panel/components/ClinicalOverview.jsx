import React from 'react';
import { Card, Badge, Button } from './ui';
import { Activity, Pill, MoreHorizontal, Link, Clock } from 'lucide-react';

const ClinicalOverview = ({ diagnosisProblems, medications }) => {
  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" />
          Clinical Overview
        </h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Diagnosis & Problems */}
        <div className="border border-[#E2E8F0] rounded-[10px] overflow-hidden">
          <div className="bg-gray-50/50 px-3 py-2 flex items-center justify-between border-b border-gray-100">
            <h4 className="font-bold flex items-center gap-2 text-gray-900">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </span>
              Diagnosis & Problems
            </h4>
            <Button variant="ghost" className="text-action-blue px-0 hover:bg-transparent font-semibold">
              View Full History
            </Button>
          </div>

          <div className="p-2 space-y-2">
            {diagnosisProblems.map((prob) => (
              <div key={prob.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 py-3 px-3 rounded-[10px] border border-[#E2E8F0] gap-3 sm:gap-0">
                <div className="flex gap-3 items-center text-gray-700">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Link className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-gray-900 leading-tight">{prob.name}</p>
                    <p className="text-[12px] text-gray-500 flex items-center gap-1 mt-0.5">
                      {prob.onset ? <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> Onset: {prob.onset}</span> : <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> Type: {prob.type}</span>}
                    </p>
                  </div>
                </div>
                <Badge
                  className="text-[10px] px-2 py-0"
                  variant={prob.status.toLowerCase() === 'active' ? 'success' : prob.status.toLowerCase() === 'chronic' ? 'success' : 'danger'}
                >
                  {prob.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Medications */}
        <div className="border border-[#E2E8F0] rounded-[10px] overflow-hidden">
          <div className="bg-gray-50/50 px-3 py-2 flex items-center justify-between border-b border-gray-100">
            <h4 className="font-bold flex items-center gap-2 text-gray-900">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <Pill className="w-4 h-4" />
              </span>
              Medications
            </h4>
            <Button variant="ghost" className="text-action-blue px-0 hover:bg-transparent font-semibold">
              View Full History
            </Button>
          </div>

          <div className="p-2 space-y-2">
            {medications.map((med) => (
              <div key={med.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 py-3 px-3 rounded-[10px] border border-[#E2E8F0] gap-3 sm:gap-0">
                <div className="text-gray-700">
                  <p className="text-[14px] font-bold text-gray-900 leading-tight">
                    {med.name} {med.dose && <span className="font-normal text-gray-500 text-[12px]">{med.dose}</span>}
                  </p>
                  <p className="text-[12px] text-gray-500 flex items-center gap-2 mt-0.5">
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {med.details}</span>
                  </p>
                </div>
                <Badge variant="neutral" className="bg-gray-200 text-gray-700 text-[10px] px-2 py-0">
                  {med.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ClinicalOverview;
