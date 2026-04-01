import React, { useState } from 'react';
import { Card, Avatar, Button, Modal, Input } from './ui';
import { Calendar as CalendarIcon, MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import { api } from '../../data/api';

const Appointments = ({ resident, refreshResident }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [formData, setFormData] = useState({ id: null, doctor: '', date: '', time: '', location: '' });
  const [joinApt, setJoinApt] = useState(null);

  const appointmentsData = resident?.appointments || [];

  const handleOpenModal = (mode, item = null) => {
    setModalMode(mode);
    setFormData(item || { id: null, doctor: '', date: '', time: '', location: '' });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (modalMode === 'add') {
      await api.addResidentSubData(resident?.id, 'appointments', formData);
    } else {
      await api.updateResidentSubData(resident?.id, 'appointments', formData.id, formData);
    }
    if (refreshResident) refreshResident();
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    await api.deleteResidentSubData(resident?.id, 'appointments', id);
    if (refreshResident) refreshResident();
  };

  return (
    <Card className="flex flex-col p-0 overflow-hidden">
      <div className="flex items-center justify-between p-2 px-3 border-b border-gray-100">
        <h3 className="text-[16px] font-bold text-slate-800 flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-blue-500" />
          Appointments
        </h3>
        <button className="text-gray-400 hover:text-blue-600 transition-colors" onClick={() => handleOpenModal('add')}>
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="divide-y divide-gray-100 max-h-[320px] overflow-y-auto">
        {appointmentsData.map((apt, index) => (
          <div key={apt.id || index} className="flex flex-col hover:bg-slate-50 transition-colors group">
            {/* Top Info Row */}
            <div className="flex items-center p-2.5 px-3 gap-3">
              <Avatar size="sm" initial="JS" className="bg-slate-200 text-slate-500 shrink-0" />
              
              <div className="flex-1 flex items-center justify-between min-w-0">
                <div className="flex-1 min-w-0 pr-2">
                  <h4 className="font-bold text-slate-700 text-[13px] truncate leading-tight">{apt.date}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">{apt.doctor}</p>
                </div>
                
                <div className="hidden sm:block w-[1px] h-6 bg-gray-100 mx-2" />
                
                <div className="flex-1 hidden sm:block min-w-0 pr-2">
                  <h4 className="font-bold text-slate-700 text-[13px] truncate leading-tight">{apt.doctor}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">{apt.location}</p>
                </div>

                <div className="text-right flex items-center gap-2">
                  <span className="font-bold text-slate-700 text-[13px]">{apt.time}</span>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between px-3 py-1.5 border-t border-slate-50 bg-slate-50/30">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate max-w-[60%]">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">{apt.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button onClick={() => handleOpenModal('edit', apt)} className="p-1 text-gray-400 hover:text-blue-600 rounded">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(apt.id)} className="p-1 text-gray-400 hover:text-red-600 rounded">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button className="text-action-blue font-bold text-[12px] flex items-center gap-1 hover:underline shrink-0" onClick={() => setJoinApt(apt)}>
                  Join <span className="mb-0.5 text-[14px]">→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        {appointmentsData.length === 0 && (
          <div className="p-4 text-center text-sm text-gray-500">No appointments found.</div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalMode === 'add' ? 'Add Appointment' : 'Edit Appointment'}>
        <div className="space-y-4">
          <Input label="Doctor Name" value={formData.doctor} onChange={(e) => setFormData({...formData, doctor: e.target.value})} placeholder="Dr. John Smith" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} placeholder="Thursday, Apr 25" />
            <Input label="Time" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} placeholder="10:30 AM" />
          </div>
          <Input label="Location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="Monterey Clinic" />
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" className="flex-1" onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>

      {/* Join Action Modal */}
      <Modal isOpen={!!joinApt} onClose={() => setJoinApt(null)} title="Join Appointment">
        {joinApt && (
          <div className="space-y-4">
            <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 flex flex-col items-center justify-center text-center space-y-2">
              <Avatar size="lg" initial="DR" className="bg-blue-600 text-white mb-2 shadow-sm" />
              <h4 className="font-bold text-gray-900 text-lg">{joinApt.doctor}</h4>
              <p className="text-sm text-gray-500">{joinApt.date} at {joinApt.time}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 space-y-2 text-sm">
              <p className="font-bold text-gray-700">Pre-appointment Details:</p>
              <ul className="text-gray-500 space-y-1 list-disc pl-4">
                <li>Please have your vitals history ready.</li>
                <li>Ensure you are in a quiet and well-lit environment.</li>
                <li>Your camera and microphone will be tested upon entry.</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setJoinApt(null)}>Close</Button>
              <Button variant="primary" className="flex-1 shadow-lg shadow-blue-200 text-[13px] font-bold" onClick={() => setJoinApt(null)}>
                Connect to Call
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default Appointments;
