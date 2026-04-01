import React, { useState } from 'react';
import { Card, Modal, Input, Button, Select, Badge } from './ui';
import { CalendarCheck, CalendarPlus, History, Clock, MapPin, XCircle } from 'lucide-react';
import { api } from '../../data/api';

const QuickActions = ({ resident, refreshResident }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({ doctor: '', date: '', time: '', location: '' });

  const appointmentsData = resident?.appointments || [];
  
  // Generating some mock history data for the demo
  const historyData = [
    { id: 'h1', date: 'Monday, Feb 12', doctor: 'Dr. Sarah Jenkins', time: '09:00 AM', location: 'Heart Center', status: 'Completed' },
    { id: 'h2', date: 'Thursday, Jan 05', doctor: 'Dr. John Smith', time: '11:15 AM', location: 'Monterey Clinic', status: 'Cancelled' },
  ];

  const handleBook = async () => {
    if (!formData.doctor || !formData.date || !formData.time) return;
    await api.addResidentSubData(resident?.id, 'appointments', formData);
    if (refreshResident) refreshResident();
    setActiveModal(null);
    setFormData({ doctor: '', date: '', time: '', location: '' });
  };

  const handleCancelAppointment = async (id) => {
    await api.deleteResidentSubData(resident?.id, 'appointments', id);
    if (refreshResident) refreshResident();
  };

  return (
    <Card className="p-1.5 bg-white">
      <div className="flex flex-col sm:flex-row items-center justify-around divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        {/* Book Appointment */}
        <div 
          className="flex items-center gap-3 flex-1 justify-center cursor-pointer group px-2 py-2 sm:py-1.5 w-full sm:w-auto hover:bg-slate-50 transition-colors rounded-l-lg"
          onClick={() => setActiveModal('book')}
        >
          <CalendarCheck className="w-5 h-5 text-gray-400 group-hover:text-action-blue transition-colors" />
          <div className="text-action-blue font-bold text-[12px] leading-tight">
            Book<br />Appointment
          </div>
        </div>

        {/* Manage Appointments */}
        <div 
          className="flex items-center gap-3 flex-1 justify-center cursor-pointer group px-2 py-2 sm:py-1.5 w-full sm:w-auto hover:bg-slate-50 transition-colors"
          onClick={() => setActiveModal('manage')}
        >
          <CalendarPlus className="w-5 h-5 text-gray-400 group-hover:text-action-blue transition-colors" />
          <div className="text-action-blue font-bold text-[12px] leading-tight">
            Manage<br />Appointments
          </div>
        </div>

        {/* Appointment History */}
        <div 
          className="flex items-center gap-3 flex-1 justify-center cursor-pointer group px-2 py-2 sm:py-1.5 w-full sm:w-auto hover:bg-slate-50 transition-colors rounded-r-lg"
          onClick={() => setActiveModal('history')}
        >
          <History className="w-5 h-5 text-gray-400 group-hover:text-action-blue transition-colors" />
          <div className="text-action-blue font-bold text-[12px] leading-tight">
            Appointment<br />History
          </div>
        </div>
      </div>

      {/* Book Appointment Modal */}
      <Modal isOpen={activeModal === 'book'} onClose={() => setActiveModal(null)} title="Book New Appointment">
        <div className="space-y-4">
          <Select 
            label="Doctor / Specialist" 
            value={formData.doctor} 
            onChange={(e) => setFormData({...formData, doctor: e.target.value})}
            options={[
              {value: '', label: 'Select a doctor'},
              {value: 'Dr. Amanda Roberts', label: 'Dr. Amanda Roberts - Cardiology'},
              {value: 'Dr. James Williams', label: 'Dr. James Williams - General'},
              {value: 'Dr. Sarah Jenkins', label: 'Dr. Sarah Jenkins - Neurology'}
            ]}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input type="date" label="Date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
            <Input type="time" label="Time" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} />
          </div>
          <Select 
            label="Location" 
            value={formData.location} 
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            options={[
              {value: '', label: 'Select location'},
              {value: 'Monterey Clinic', label: 'Monterey Clinic'},
              {value: 'Oasis Center', label: 'Oasis Center'},
              {value: 'Virtual Visit', label: 'Virtual Visit'}
            ]}
          />
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setActiveModal(null)}>Cancel</Button>
            <Button variant="primary" className="flex-1 shadow-lg shadow-blue-200" onClick={handleBook}>Confirm Booking</Button>
          </div>
        </div>
      </Modal>

      {/* Manage Appointments Modal */}
      <Modal isOpen={activeModal === 'manage'} onClose={() => setActiveModal(null)} title="Manage Appointments">
        <div className="max-h-[350px] overflow-y-auto space-y-3 pr-1">
          {appointmentsData.length === 0 ? (
            <div className="text-center py-6 text-gray-500 text-sm">You have no upcoming appointments.</div>
          ) : (
            appointmentsData.map((apt) => (
              <div key={apt.id} className="p-3 border border-gray-200 rounded-lg flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-900 text-[14px]">{apt.doctor}</h4>
                    <p className="text-[12px] text-gray-500 mt-0.5 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {apt.date} at {apt.time}</p>
                  </div>
                  <Badge variant="primary" className="bg-blue-50 text-blue-600 px-2 py-0 text-[10px]">Upcoming</Badge>
                </div>
                <div className="flex justify-between items-center mt-1 pt-2 border-t border-gray-100">
                  <p className="text-[12px] text-gray-500 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {apt.location}</p>
                  <Button variant="ghost" className="text-red-500 hover:bg-red-50 hover:text-red-600 h-7 text-[11px] px-2 flex items-center gap-1" onClick={() => handleCancelAppointment(apt.id)}>
                    <XCircle className="w-3 h-3" /> Cancel
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Modal>

      {/* Appointment History Modal */}
      <Modal isOpen={activeModal === 'history'} onClose={() => setActiveModal(null)} title="Appointment History">
        <div className="max-h-[350px] overflow-y-auto space-y-3 pr-1">
          {historyData.map((apt) => (
            <div key={apt.id} className="p-3 border border-gray-200 rounded-lg bg-gray-50/50 flex flex-col gap-2 opacity-80">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-900 text-[14px]">{apt.doctor}</h4>
                  <p className="text-[12px] text-gray-500 mt-0.5 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {apt.date} at {apt.time}</p>
                </div>
                <Badge variant={apt.status === 'Completed' ? 'success' : 'danger'} className="px-2 py-0 text-[10px]">{apt.status}</Badge>
              </div>
              <div className="flex justify-between items-center mt-1 pt-2 border-t border-gray-100">
                <p className="text-[12px] text-gray-500 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {apt.location}</p>
                <Button variant="ghost" className="text-action-blue hover:bg-blue-50 h-7 text-[11px] px-2" onClick={() => setActiveModal(null)}>
                  View Notes
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </Card>
  );
};

export default QuickActions;
