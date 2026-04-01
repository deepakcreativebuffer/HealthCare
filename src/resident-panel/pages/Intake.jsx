import React from 'react';
import { Card, Badge, Button } from '../components/ui';
import { ClipboardList, FileText, CheckCircle, Clock, Download, FileSignature, AlertCircle } from 'lucide-react';

const mockIntakeForms = [
  { id: 1, name: "Initial Patient Assessment", date: "Jan 15, 2025", status: "Completed", type: "Assessment" },
  { id: 2, name: "Medical History Profile", date: "Jan 15, 2025", status: "Completed", type: "History" },
  { id: 3, name: "Consent for Treatment", date: "Jan 15, 2025", status: "Completed", type: "Consent" },
  { id: 4, name: "Annual Wellness Questionaire", date: "Jan 2, 2026", status: "Completed", type: "Survey" },
  { id: 5, name: "Specialist Referral Intake", date: "Mar 10, 2026", status: "Pending Action", type: "Referral" },
];

const Intake = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Intake & Forms</h1>
          <p className="text-gray-500 text-[12px]">
            Manage your admission documents, consents, and medical history profiles
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-100 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-200">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[12px] font-semibold text-blue-800">Total Forms</p>
            <h3 className="text-2xl font-bold text-blue-900">{mockIntakeForms.length}</h3>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-100 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[12px] font-semibold text-emerald-800">Completed</p>
            <h3 className="text-2xl font-bold text-emerald-900">
              {mockIntakeForms.filter(f => f.status === 'Completed').length}
            </h3>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-100 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-200">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[12px] font-semibold text-amber-800">Action Needed</p>
            <h3 className="text-2xl font-bold text-amber-900">
              {mockIntakeForms.filter(f => f.status !== 'Completed').length}
            </h3>
          </div>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="font-bold text-gray-900 flex items-center gap-2 text-[14px]">
            <FileText className="w-4 h-4 text-blue-500" />
            Document History
          </h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          {mockIntakeForms.map((form) => (
            <div key={form.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${form.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                  {form.status === 'Completed' ? <FileSignature className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-[14px]">{form.name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[12px] text-gray-500">{form.type}</span>
                    <span className="text-[10px] text-gray-300">•</span>
                    <span className="text-[12px] text-gray-500">Submitted: {form.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 md:w-auto w-full justify-between md:justify-end">
                <Badge variant={form.status === 'Completed' ? 'success' : 'warning'} className="font-semibold px-2.5 py-1">
                  {form.status}
                </Badge>
                {form.status === 'Completed' ? (
                  <Button variant="ghost" className="text-[#129FED] px-0 hover:bg-transparent font-semibold w-fit text-[12px] h-auto min-h-0 shrink-0">
                    Download
                  </Button>
                ) : (
                  <Button variant="ghost" className="text-[#10B981] px-0 hover:bg-transparent font-semibold w-fit text-[12px] h-auto min-h-0 shrink-0">
                    Complete Now
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Intake;
