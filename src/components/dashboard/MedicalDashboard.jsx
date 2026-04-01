import React, { useState } from 'react';
import WelcomeBanner from './WelcomeBanner';
import StatsGrid from './StatsGrid';
import AppointmentsList from './AppointmentsList';
import StaffSchedule from './StaffSchedule';
import StatsList from './StatsList';
import QuickLinks from './QuickLinks';
import ResidentRecords from './ResidentRecords';
import EmployeeRecords from './EmployeeRecords';
import SpecialNotes from './SpecialNotes';
import ActivityLog from './ActivityLog';
import AdmitResidentModal from './AdmitResidentModal';

const MedicalDashboard = ({ onStatClick, onViewAll }) => {
  const [isAdmitModalOpen, setIsAdmitModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleResidentAdmitted = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="max-w-full mx-auto w-full space-y-1.5">
      <AdmitResidentModal
        isOpen={isAdmitModalOpen}
        onClose={() => setIsAdmitModalOpen(false)}
        onResidentAdmitted={handleResidentAdmitted}
      />
      {/* Header Section */}
      <WelcomeBanner />

      {/* Stats Section */}
      <div className="space-y-0.5 mb-3">
        <h2 className="text-[16px] font-bold text-slate-800 ml-1 leading-none mb-1">Overall Statistics</h2>
        <StatsGrid key={`stats-${refreshKey}`} onStatClick={onStatClick} />
      </div>

      {/* Main Grid - Forced Equal Height */}
      <div className="space-y-2 mt-2">
        <h2 className="text-[16px] font-bold text-slate-800 ml-1 leading-none mb-1">Administrative Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          <div className="h-[310px]"><AppointmentsList onViewAll={onViewAll} /></div>
          <div className="h-[310px]"><StaffSchedule onViewAll={onViewAll} /></div>
          <div className="h-[310px]"><StatsList onViewAll={onViewAll} /></div>
          <div className="h-[310px]"><QuickLinks onAdmitClick={() => setIsAdmitModalOpen(true)} /></div>

          <div className="h-[310px]"><ResidentRecords key={`residents-${refreshKey}`} onViewAll={onViewAll} /></div>
          <div className="h-[310px]"><EmployeeRecords onViewAll={onViewAll} /></div>
          <div className="h-[310px]"><SpecialNotes onViewAll={onViewAll} /></div>
          <div className="h-[310px]"><ActivityLog key={`activity-${refreshKey}`} onViewAll={onViewAll} /></div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDashboard;
