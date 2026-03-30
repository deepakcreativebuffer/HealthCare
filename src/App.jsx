import React from "react";
import Navbar from "./components/layout/Navbar";
import SubNav from "./components/layout/SubNav";
import WelcomeBanner from "./components/dashboard/WelcomeBanner";
import StatsGrid from "./components/dashboard/StatsGrid";
import AppointmentsList from "./components/dashboard/AppointmentsList";
import StaffSchedule from "./components/dashboard/StaffSchedule";
import StatsList from "./components/dashboard/StatsList";
import QuickLinks from "./components/dashboard/QuickLinks";
import ResidentRecords from "./components/dashboard/ResidentRecords";
import EmployeeRecords from "./components/dashboard/EmployeeRecords";
import SpecialNotes from "./components/dashboard/SpecialNotes";
import ActivityLog from "./components/dashboard/ActivityLog";

function App() {
  return (
    <div className="min-h-screen bg-bg-dashboard flex flex-col">
      <Navbar />
      <SubNav />

      <main className="flex-1 py-8 max-w-[1600px] mx-auto w-full">
        {/* Header Section */}
        <WelcomeBanner />
        <StatsGrid />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* Column 1 */}
          <div className="flex flex-col gap-6 h-full">
            <AppointmentsList />
            <ResidentRecords />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6 h-full">
            <StaffSchedule />
            <EmployeeRecords />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6 h-full">
            <StatsList />
            <SpecialNotes />
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-6 h-full">
            <QuickLinks />
            <ActivityLog />
          </div>
        </div>
      </main>

      {/* Footer / Version */}
      <footer className="px-6 py-4 text-center border-t border-gray-100 bg-white sm:bg-transparent">
        <p className="text-xs font-medium text-slate-400">
          App v1.0 • OASIS NOTES Inc.
        </p>
      </footer>
    </div>
  );
}

export default App;
