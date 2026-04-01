import React, { useState } from 'react';
import { Card, Badge, Button, Modal, Input } from './ui';
import { Activity, Pill, Clock, Plus, Edit, Trash2, Link as LinkIcon } from 'lucide-react';
import { api } from '../../data/api';

const ClinicalOverview = ({ resident, refreshResident }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [modalTarget, setModalTarget] = useState('diagnosis'); // 'diagnosis' or 'medication'
  const [formData, setFormData] = useState({});

  const diagnosisProblems = resident?.diagnosisProblems || [];
  const medications = resident?.medicationsList || [];

  const handleOpenModal = (target, mode, item = null) => {
    setModalTarget(target);
    setModalMode(mode);
    if (target === 'diagnosis') {
      setFormData(item || { id: null, name: '', onset: '', type: '', status: 'Active' });
    } else {
      setFormData(item || { id: null, name: '', dose: '', details: '', status: 'Active' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const key = modalTarget === 'diagnosis' ? 'diagnosisProblems' : 'medicationsList';
    if (modalMode === 'add') {
      await api.addResidentSubData(resident?.id, key, formData);
    } else {
      await api.updateResidentSubData(resident?.id, key, formData.id, formData);
    }
    if (refreshResident) refreshResident();
    setIsModalOpen(false);
  };

  const handleDelete = async (target, id) => {
    const key = target === 'diagnosis' ? 'diagnosisProblems' : 'medicationsList';
    await api.deleteResidentSubData(resident?.id, key, id);
    if (refreshResident) refreshResident();
  };

  return (
    <Card className="h-full flex flex-col relative group">
      <div className="flex items-center justify-between pb-1.5 border-b border-gray-100 mb-3">
        <h3 className="text-[16px] font-bold flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-500" />
          Clinical Overview
        </h3>
      </div>

      <div className="space-y-3">
        {/* Diagnosis & Problems */}
        <div className="border border-[#E2E8F0] rounded-[10px] overflow-hidden">
          <div className="bg-gray-50/50 px-3 py-1.5 flex items-center justify-between border-b border-gray-100">
            <h4 className="font-bold flex items-center gap-2 text-gray-900 text-[13px]">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <Activity className="w-3 h-3" />
              </span>
              Diagnosis & Problems
            </h4>
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-blue-600 transition-colors" onClick={() => handleOpenModal('diagnosis', 'add')}>
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-1.5 space-y-1.5 max-h-[220px] overflow-y-auto">
            {diagnosisProblems.map((prob) => (
              <div key={prob.id} className="group/item flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 py-1.5 px-3 rounded-[8px] border border-[#E2E8F0] gap-1 sm:gap-0 hover:border-blue-200 transition-colors">
                <div className="flex gap-2 items-center text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <LinkIcon className="w-3 h-3" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-gray-900 leading-tight flex items-center gap-2">
                        {prob.name}
                        <div className="opacity-0 group-hover/item:opacity-100 transition-opacity flex gap-0.5 bg-white/50 rounded ml-1">
                          <button onClick={() => handleOpenModal('diagnosis', 'edit', prob)} className="p-0.5 text-gray-500 hover:text-blue-600 rounded">
                            <Edit className="w-3 h-3" />
                          </button>
                          <button onClick={() => handleDelete('diagnosis', prob.id)} className="p-0.5 text-gray-500 hover:text-red-600 rounded">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                    </p>
                    <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
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
            {diagnosisProblems.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-500">No diagnoses found.</div>
            )}
          </div>
        </div>

        {/* Medications */}
        <div className="border border-[#E2E8F0] rounded-[10px] overflow-hidden">
          <div className="bg-gray-50/50 px-3 py-1.5 flex items-center justify-between border-b border-gray-100">
            <h4 className="font-bold flex items-center gap-2 text-gray-900 text-[13px]">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <Pill className="w-3 h-3" />
              </span>
              Medications
            </h4>
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-blue-600 transition-colors" onClick={() => handleOpenModal('medication', 'add')}>
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-1.5 space-y-1.5 max-h-[220px] overflow-y-auto">
            {medications.map((med) => (
              <div key={med.id} className="group/item flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 py-1.5 px-3 rounded-[8px] border border-[#E2E8F0] gap-1 sm:gap-0 hover:border-blue-200 transition-colors">
                <div className="text-gray-700">
                  <p className="text-[13px] font-bold text-gray-900 leading-tight flex items-center gap-2">
                    {med.name} {med.dose && <span className="font-normal text-gray-500 text-[11px]">{med.dose}</span>}
                    <div className="opacity-0 group-hover/item:opacity-100 transition-opacity flex gap-0.5 bg-white/50 rounded ml-1">
                      <button onClick={() => handleOpenModal('medication', 'edit', med)} className="p-0.5 text-gray-500 hover:text-blue-600 rounded">
                        <Edit className="w-3 h-3" />
                      </button>
                      <button onClick={() => handleDelete('medication', med.id)} className="p-0.5 text-gray-500 hover:text-red-600 rounded">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </p>
                  <p className="text-[11px] text-gray-500 flex items-center gap-2 mt-0.5">
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {med.details}</span>
                  </p>
                </div>
                <Badge variant="neutral" className="bg-gray-200 text-gray-700 text-[10px] px-2 py-0">
                  {med.status}
                </Badge>
              </div>
            ))}
            {medications.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-500">No medications found.</div>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${modalMode === 'add' ? 'Add' : 'Edit'} ${modalTarget === 'diagnosis' ? 'Diagnosis' : 'Medication'}`}>
        <div className="space-y-4">
          {modalTarget === 'diagnosis' ? (
            <>
              <Input label="Condition Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Asthma" />
              <Input label="Onset / Type" value={formData.onset || formData.type} onChange={(e) => setFormData({...formData, onset: e.target.value, type: e.target.value})} placeholder="e.g. 2023 or Chronic" />
              <Input label="Status" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} placeholder="Active" />
            </>
          ) : (
            <>
              <Input label="Medication Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Lisinopril" />
              <Input label="Dose" value={formData.dose} onChange={(e) => setFormData({...formData, dose: e.target.value})} placeholder="e.g. 20mg" />
              <Input label="Details" value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} placeholder="e.g. Oral - Daily" />
            </>
          )}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" className="flex-1" onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default ClinicalOverview;
