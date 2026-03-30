import React from 'react';
import WelcomeBanner from '../components/WelcomeBanner';
import ProfileCard from '../components/ProfileCard';
import QuickActions from '../components/QuickActions';
import Appointments from '../components/Appointments';
import Vitals from '../components/Vitals';
import ClinicalOverview from '../components/ClinicalOverview';
import AssignedForms from '../components/AssignedForms';
import RecentDocuments from '../components/RecentDocuments';
import BillingSummary from '../components/BillingSummary';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <WelcomeBanner />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-4 space-y-6">
          <ProfileCard />
          <QuickActions />
          <Appointments />
          <Vitals />
        </div>
        
        {/* CENTER COLUMN */}
        <div className="lg:col-span-5 space-y-6">
          <ClinicalOverview />
        </div>
        
        {/* RIGHT COLUMN */}
        <div className="lg:col-span-3 space-y-6">
          <AssignedForms />
          <RecentDocuments />
          <BillingSummary />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
