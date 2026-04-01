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
  const { resident, refreshResident } = useOutletContext();

  return (
    <div className="space-y-4">
      <WelcomeBanner resident={resident} />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-4 space-y-4">
          <ProfileCard resident={resident} />
          <QuickActions resident={resident} refreshResident={refreshResident} />
          <Appointments resident={resident} refreshResident={refreshResident} />
          <Vitals vitals={resident.vitalsHistory} resident={resident} refreshResident={refreshResident} />
        </div>
        
        {/* CENTER COLUMN */}
        <div className="lg:col-span-5 space-y-4">
          <ClinicalOverview 
            diagnosisProblems={resident.diagnosisProblems || []} 
            medications={resident.medicationsList || []} 
            resident={resident}
            refreshResident={refreshResident}
          />
        </div>
        
        {/* RIGHT COLUMN */}
        <div className="lg:col-span-3 space-y-4">
          <AssignedForms resident={resident} refreshResident={refreshResident} />
          <RecentDocuments resident={resident} refreshResident={refreshResident} />
          <BillingSummary resident={resident} refreshResident={refreshResident} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
