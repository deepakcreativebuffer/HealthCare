import React, { useState } from 'react';
import { Card, Button, Modal, Input } from './ui';
import { Download, File, Calendar as CalendarIcon, Plus, Edit, Trash2 } from 'lucide-react';
import { api } from '../../data/api';

const RecentDocuments = ({ resident, refreshResident }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({ id: null, name: '', date: '' });

  const recentDocumentsData = resident?.recentDocuments || [];

  const handleOpenModal = (mode, item = null) => {
    setModalMode(mode);
    setFormData(item || { id: null, name: '', date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (modalMode === 'add') {
      await api.addResidentSubData(resident?.id, 'recentDocuments', formData);
    } else {
      await api.updateResidentSubData(resident?.id, 'recentDocuments', formData.id, formData);
    }
    if (refreshResident) refreshResident();
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    await api.deleteResidentSubData(resident?.id, 'recentDocuments', id);
    if (refreshResident) refreshResident();
  };

  return (
    <Card className="flex flex-col gap-2 relative group">
      <div className="flex items-center justify-between pb-1 border-b border-gray-100">
        <h3 className="text-[15px] font-bold flex items-center gap-2">
          <File className="w-4 h-4 text-blue-500" />
          Recent Documents
        </h3>
        <button className="text-gray-400 hover:text-blue-600 transition-colors" onClick={() => handleOpenModal('add')}>
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
        {recentDocumentsData.map((doc) => (
          <div key={doc.id} className="group/item flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0 hover:bg-slate-50 transition-colors rounded px-1">
            <div>
              <p className="font-semibold text-gray-900 text-[13px] leading-tight flex items-center gap-2">
                {doc.name}
                <div className="opacity-0 group-hover/item:opacity-100 transition-opacity flex gap-1 bg-white/50 rounded ml-2">
                  <button onClick={() => handleOpenModal('edit', doc)} className="p-0.5 text-gray-500 hover:text-blue-600 rounded">
                    <Edit className="w-3 h-3" />
                  </button>
                  <button onClick={() => handleDelete(doc.id)} className="p-0.5 text-gray-500 hover:text-red-600 rounded">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </p>
              <div className="flex items-center gap-1 mt-0.5 text-[11px] text-gray-500">
                <CalendarIcon className="w-3 h-3" />
                <span>{doc.date}</span>
              </div>
            </div>
            <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
        {recentDocumentsData.length === 0 && (
          <div className="p-4 text-center text-sm text-gray-500">No recent documents.</div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalMode === 'add' ? 'Add Document' : 'Edit Document'}>
        <div className="space-y-4">
          <Input label="Document Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Lab Report" />
          <Input label="Date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} placeholder="22 Feb 2024" />
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" className="flex-1" onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default RecentDocuments;
