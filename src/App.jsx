import React, { useState } from "react";
import Navbar from "./components/layout/Navbar";
import SubNav from "./components/layout/SubNav";
import MedicalDashboard from "./components/dashboard/MedicalDashboard";
import BillingDashboard from "./components/billing/BillingDashboard";

function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col overflow-hidden">
      {/* Persistant Top Navbar */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Persistant App Module Tabs */}
      <SubNav />

      {/* Conditional Dashboard Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === "Dashboard" ? (
          <main className="flex-1 overflow-y-auto p-8 scroll-smooth no-scrollbar">
            <MedicalDashboard />
          </main>
        ) : activeTab === "Billing & Claims" ? (
          <BillingDashboard />
        ) : (
          <main className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800">Section Under Construction</h2>
              <p className="text-slate-500 mt-2">The {activeTab} module will be available soon.</p>
              <button 
                onClick={() => setActiveTab("Dashboard")}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
