import React, { useState } from 'react';
import { Card, Modal, Input, Button } from './ui';
import { FileText, Edit, Clock } from 'lucide-react';
import { api } from '../../data/api';

const Vitals = ({ vitals, resident, refreshResident }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    bloodPressure: '', 
    heartRate: '', 
    bmi: '', 
    respirationRate: '' 
  });

  const mockHistoryData = [
    { date: '12 Jan 2024', bp: '120/80', hr: '74', bmi: '17.1', resp: '60' },
    { date: '05 Dec 2023', bp: '118/78', hr: '72', bmi: '17.0', resp: '58' },
    { date: '10 Nov 2023', bp: '122/82', hr: '76', bmi: '17.2', resp: '62' },
  ];

  const handleOpenModal = () => {
    setFormData({
      bloodPressure: vitals?.bloodPressure || '',
      heartRate: vitals?.heartRate || '',
      bmi: vitals?.bmi || '',
      respirationRate: vitals?.respirationRate || ''
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const newVitals = { ...vitals, ...formData };
    await api.updateResident(resident?.id, { vitalsHistory: newVitals });
    if (refreshResident) refreshResident();
    setIsModalOpen(false);
  };

  return (
    <Card className="flex flex-col p-0 overflow-hidden relative group">
      <div className="flex items-center justify-between p-2 px-3 border-b border-gray-100">
        <h3 className="text-[16px] font-bold text-slate-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" />
          Vitals
        </h3>
        <button className="text-gray-400 hover:text-blue-600 transition-colors" onClick={handleOpenModal}>
          <Edit className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
        {/* Left Column: Allergies */}
        <div className="flex-1 flex flex-col">
          <div className="p-3 flex-1 min-h-[110px]">
            <h4 className="font-bold text-slate-500 mb-2 text-[13px]">Allergies</h4>
            <ul className="space-y-1.5 text-[12px] text-gray-500">
              <li className="flex items-start before:content-['•'] before:mr-2 before:text-gray-300">
                Penicillin - Drug Allergy • Severe Reaction
              </li>
              <li className="flex items-start before:content-['•'] before:mr-2 before:text-gray-300">
                Dust, Peanuts - Environmental & Food
              </li>
            </ul>
          </div>
          
          <div className="px-3 py-1.5 border-t border-gray-100 flex justify-center">
            <button className="text-action-blue font-bold text-[12px] flex items-center gap-1.5 hover:underline" onClick={() => setHistoryModalOpen(true)}>
              <Clock className="w-4 h-4" /> View Full History
            </button>
          </div>
        </div>

        {/* Right Column: Latest Vitals */}
        <div className="flex-1 p-3 min-h-[110px]">
          <h4 className="font-bold text-slate-500 mb-2 text-[13px]">Latest Vitals</h4>
          <ul className="space-y-1.5 text-[12px] text-gray-500 pl-1">
            <li className="flex items-start before:content-['•'] before:mr-1.5 before:text-gray-300">
              Blood Pressure: <span className="ml-1 text-slate-800 font-medium">{vitals?.bloodPressure}</span>
            </li>
            <li className="flex items-start before:content-['•'] before:mr-1.5 before:text-gray-300">
              Heart Rate: <span className="ml-1 text-slate-800 font-medium">{vitals?.heartRate}</span>
            </li>
            <li className="flex items-start before:content-['•'] before:mr-1.5 before:text-gray-300">
              Body Mass Index: <span className="ml-1 text-slate-800 font-medium">{vitals?.bmi}</span>
            </li>
            <li className="flex items-start before:content-['•'] before:mr-1.5 before:text-gray-300">
              Respiration Rate: <span className="ml-1 text-slate-800 font-medium">{vitals?.respirationRate}</span>
            </li>
          </ul>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Vitals">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Blood Pressure" value={formData.bloodPressure} onChange={(e) => setFormData({...formData, bloodPressure: e.target.value})} placeholder="e.g. 120/80 mmHg" />
            <Input label="Heart Rate" value={formData.heartRate} onChange={(e) => setFormData({...formData, heartRate: e.target.value})} placeholder="e.g. 74 bpm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="BMI" value={formData.bmi} onChange={(e) => setFormData({...formData, bmi: e.target.value})} placeholder="e.g. 17.1 lbs" />
            <Input label="Respiration Rate" value={formData.respirationRate} onChange={(e) => setFormData({...formData, respirationRate: e.target.value})} placeholder="e.g. 60 bpm" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" className="flex-1" onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={historyModalOpen} onClose={() => setHistoryModalOpen(false)} title="Vitals History">
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 flex items-center px-4 py-2 border-b border-gray-200 text-xs font-bold text-gray-700">
              <div className="w-24">Date</div>
              <div className="flex-1 text-center">BP</div>
              <div className="flex-1 text-center">HR</div>
              <div className="flex-1 text-center">BMI</div>
              <div className="flex-1 text-center">Resp</div>
            </div>
            <div className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto">
              {mockHistoryData.map((item, idx) => (
                <div key={idx} className="flex items-center px-4 py-2.5 text-[13px] text-gray-600 hover:bg-slate-50">
                  <div className="w-24 font-bold text-gray-800">{item.date}</div>
                  <div className="flex-1 text-center">{item.bp}</div>
                  <div className="flex-1 text-center">{item.hr}</div>
                  <div className="flex-1 text-center">{item.bmi}</div>
                  <div className="flex-1 text-center">{item.resp}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button variant="outline" onClick={() => setHistoryModalOpen(false)}>Close</Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default Vitals;
