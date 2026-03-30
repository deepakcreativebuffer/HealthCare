import React from 'react';
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

const MedicalDashboard = () => {
  return (
    <div className="max-w-full mx-auto w-full space-y-6">
      {/* Header Section */}
      <WelcomeBanner />

      {/* Stats Section */}
      <div className="space-y-2">
        <h2 className="text-[18px] font-bold text-slate-800 ml-1">Overall Statistics</h2>
        <StatsGrid />
      </div>

      {/* Main Grid - Forced Equal Height */}
      <div className="space-y-4">
        <h2 className="text-[18px] font-bold text-slate-800 ml-1">Administrative Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          <div className="h-[500px]"><AppointmentsList /></div>
          <div className="h-[500px]"><StaffSchedule /></div>
          <div className="h-[500px]"><StatsList /></div>
          <div className="h-[500px]"><QuickLinks /></div>

          <div className="h-[500px]"><ResidentRecords /></div>
          <div className="h-[500px]"><EmployeeRecords /></div>
          <div className="h-[500px]"><SpecialNotes /></div>
          <div className="h-[500px]"><ActivityLog /></div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDashboard;
