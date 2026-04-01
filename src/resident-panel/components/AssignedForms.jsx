import React, { useState } from 'react';
import { Card, Button, Modal, Input, Select } from './ui';
import { FileSignature, Plus, Clock, Edit, Trash2 } from 'lucide-react';
import { api } from '../../data/api';

const AssignedForms = ({ resident, refreshResident }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({ id: null, name: '', status: 'Pending', lastUpdated: '' });

  const assignedFormsData = resident?.assignedForms || [];

  const handleOpenModal = (mode, item = null) => {
    setModalMode(mode);
    setFormData(item || { id: null, name: '', status: 'Pending', lastUpdated: new Date().toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }) });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (modalMode === 'add') {
      await api.addResidentSubData(resident?.id, 'assignedForms', formData);
    } else {
      await api.updateResidentSubData(resident?.id, 'assignedForms', formData.id, formData);
    }
    if (refreshResident) refreshResident();
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    await api.deleteResidentSubData(resident?.id, 'assignedForms', id);
    if (refreshResident) refreshResident();
  };

  return (
    <Card className="flex flex-col gap-2 relative group">
      <div className="flex items-center justify-between pb-1 border-b border-gray-100">
        <h3 className="text-[15px] font-bold flex items-center gap-2">
          <FileSignature className="w-4 h-4 text-blue-500" />
          Assigned Forms
        </h3>
        <button className="text-gray-400 hover:text-blue-600 transition-colors" onClick={() => handleOpenModal('add')}>
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
        {assignedFormsData.map((form) => (
          <div key={form.id} className={`group/item flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 px-3 rounded-[8px] border gap-2 ${form.status === 'Pending' ? 'bg-emerald-50/50 border-emerald-100' : 'bg-gray-50/50 border-[#E2E8F0]'}`}>
            <div>
              <p className="font-bold text-gray-900 text-[14px] leading-tight flex items-center gap-2">
                {form.name}
                <div className="opacity-0 group-hover/item:opacity-100 transition-opacity flex gap-1 bg-white/50 rounded ml-2">
                  <button onClick={() => handleOpenModal('edit', form)} className="p-0.5 text-gray-500 hover:text-blue-600 rounded">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(form.id)} className="p-0.5 text-gray-500 hover:text-red-600 rounded">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </p>
              <div className="flex flex-col gap-0.5 mt-0.5">
                <span className={`text-[12px] flex items-center gap-1 text-gray-500`}>
                  {form.status === 'Pending' ? <><Clock className="w-3 h-3" /> Pending</> : <><FileSignature className="w-3 h-3" /> Signed</>}
                </span>
                <span className="text-[12px] text-gray-400">last updated {form.lastUpdated || '04/2024'}</span>
              </div>
            </div>
            {form.status === 'Pending' ? (
              <Button variant="ghost" className="text-[#10B981] px-0 hover:bg-transparent font-semibold w-fit text-[12px] h-auto min-h-0 shrink-0">
                Sign Now
              </Button>
            ) : (
              <Button variant="ghost" className="text-[#129FED] px-0 hover:bg-transparent font-semibold w-fit text-[12px] h-auto min-h-0 shrink-0">
                View All
              </Button>
            )}
          </div>
        ))}
        {assignedFormsData.length === 0 && (
          <div className="p-4 text-center text-sm text-gray-500">No forms assigned.</div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalMode === 'add' ? 'Assign Form' : 'Edit Form'}>
        <div className="space-y-4">
          <Input label="Form Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Health Assessment" />
          <Select 
            label="Status" 
            value={formData.status} 
            onChange={(e) => setFormData({...formData, status: e.target.value})}
            options={[{value: 'Pending', label: 'Pending'}, {value: 'Signed', label: 'Signed'}]}
          />
          <Input label="Last Updated" value={formData.lastUpdated} onChange={(e) => setFormData({...formData, lastUpdated: e.target.value})} placeholder="04/2024" />
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" className="flex-1" onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default AssignedForms;
