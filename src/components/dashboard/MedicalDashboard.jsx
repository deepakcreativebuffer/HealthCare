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
    <div className="max-w-[1600px] mx-auto w-full space-y-6">
      {/* Header Section */}
      <WelcomeBanner />

      {/* Main Grid - 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        <AppointmentsList />
        <StaffSchedule />
        <StatsList />
        <QuickLinks />
        
        <ResidentRecords />
        <EmployeeRecords />
        <SpecialNotes />
        <ActivityLog />
      </div>
    </div>
  );
};

export default MedicalDashboard;
