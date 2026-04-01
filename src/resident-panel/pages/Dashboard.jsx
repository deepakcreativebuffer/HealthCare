import React from 'react';
import { useOutletContext } from 'react-router-dom';
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
  const { resident } = useOutletContext();

  return (
    <div className="space-y-6">
      <WelcomeBanner resident={resident} />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-4 space-y-6">
          <ProfileCard resident={resident} />
          <QuickActions />
          <Appointments />
          <Vitals vitals={resident.vitalsHistory} />
        </div>
        
        {/* CENTER COLUMN */}
        <div className="lg:col-span-5 space-y-6">
          <ClinicalOverview 
            diagnosisProblems={resident.diagnosisProblems} 
            medications={resident.medicationsList} 
          />
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
