import React, { useEffect, useState, Suspense, lazy } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  useSearchParams,
  Link,
  Outlet
} from "react-router-dom";
import ResidentLayout from "./resident-panel/layouts/ResidentLayout";
import Dashboard from "./resident-panel/pages/Dashboard";
import Profile from "./resident-panel/pages/Profile";
import Intake from "./resident-panel/pages/Intake";
import ProgressChart from "./resident-panel/pages/ProgressChart";
import Navbar from "./components/layout/Navbar";
import SubNav from "./components/layout/SubNav";
import MedicalDashboard from "./components/dashboard/MedicalDashboard";
import BillingDashboard from "./components/billing/BillingDashboard";
import DetailedStatsView from "./components/dashboard/DetailedStatsView";
import { api } from "./data/api";
import UserManagement from "./components/users/UserManagement";

const ResidentDetailPage = lazy(() => import("./components/dashboard/ResidentDetailPage"));

// Mock Login Page Component
const MockLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.login(email, password);
      const { user } = response;

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/resident-dashboard");
      }
    } catch (error) {
      alert(error.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background blobs for premium feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100/50 rounded-full blur-[120px]" />

      <div className="bg-white p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,114,206,0.1)] max-w-md w-full border border-blue-50 relative z-10">
        <div className="text-center mb-10">
          <Link
            to="/"
            className="flex items-center space-x-2 justify-center mb-6"
          >
            {/* <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              HealthCare
            </span> */}
            <img src="/logo.svg" className="h-20" alt="Logo" />
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2 font-medium text-sm">
            Please enter your details to sign in
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Email or Username
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <User size={18} />
              </div>
              <input
                type="text"
                required
                className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 block pl-11 p-3.5 outline-none transition-all duration-300"
                placeholder="email@healthcare.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-gray-700">
                Password
              </label>
              <a
                href="#"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 block pl-11 p-3.5 pr-11 outline-none transition-all duration-300"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center px-1">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-500 cursor-pointer select-none"
            >
              Remember for 30 days
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-4 rounded-[18px] hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-xl shadow-blue-200 flex items-center justify-center gap-2 group disabled:opacity-70"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <div className="w-5 h-5 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm font-medium">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-bold text-blue-600 hover:text-blue-700 transition-all"
            >
              Request access
            </a>
          </p>
        </div>

        {/* Simulator Note */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-[10px] text-gray-400 text-center uppercase  font-bold">
          Login with "admin" to see admin panel
        </div>
      </div>
    </div>
  );
};

// Admin Layout Wrapper
const AdminLayout = () => {
  const navigate = useNavigate();
  const { pathname } = window.location;

  // Map paths to tab names for the Navbar highlight
  let activeTab = "Dashboard";
  if (pathname.includes("/admin/billing")) activeTab = "Billing & Claims";
  else if (pathname.includes("/admin/users")) activeTab = "Users";
  else if (pathname.includes("/admin/tracking")) activeTab = "Tracking";
  else if (pathname.includes("/admin/log")) activeTab = "Log";
  else if (pathname.includes("/admin/activity-log")) activeTab = "Activity Log";

  const handleTabChange = (tabName) => {
    const pathMap = {
      "Dashboard": "/admin",
      "Billing & Claims": "/admin/billing",
      "Users": "/admin/users",
      "Tracking": "/admin/tracking",
      "Log": "/admin/log",
      "Activity Log": "/admin/activity-log"
    };
    navigate(pathMap[tabName] || "/admin");
  };

  return (
    <div className="h-screen bg-[#f8fafc] flex flex-col overflow-hidden">
      <header className="shrink-0 z-50 bg-white shadow-sm">
        <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
        <SubNav />
      </header>
      <div className="flex-1 overflow-hidden flex flex-col">
        <Suspense fallback={
          <div className="flex-1 flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading section...</p>
            </div>
          </div>
        }>
          <main className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar">
            <Outlet />
          </main>
        </Suspense>
      </div>
    </div>
  );
};

// Admin Dashboard Component (Home view for /admin)
const AdminHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const viewParam = searchParams.get('view');
  
  // Initialize state based on URL parameter
  const [activeDetailView, setActiveDetailView] = useState(
    viewParam === 'residents' ? 'Active Resident Records' : null
  );

  // Sync state if URL param changes
  useEffect(() => {
    if (viewParam === 'residents' && activeDetailView !== 'Active Resident Records') {
      setActiveDetailView('Active Resident Records');
    } else if (!viewParam && activeDetailView) {
      setActiveDetailView(null);
    }
  }, [viewParam]);

  const handleBack = () => {
    setActiveDetailView(null);
    setSearchParams({}); // Clear URL search params
  };

  const handleViewAll = (title) => {
    setActiveDetailView(title);
    if (title === 'Active Resident Records') {
      setSearchParams({ view: 'residents' });
    }
  };

  if (activeDetailView) {
    return (
      <DetailedStatsView
        title={activeDetailView}
        onBack={handleBack}
      />
    );
  }

  return (
    <MedicalDashboard
      onStatClick={handleViewAll}
      onViewAll={handleViewAll}
    />
  );
};

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const userStr = localStorage.getItem("user");

  if (!userStr) {
    return <Navigate to="/" replace />;
  }

  const user = JSON.parse(userStr);

  if (user.role !== allowedRole) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin" : "/resident-dashboard"}
        replace
      />
    );
  }

  return children;
};

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MockLogin />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="billing" element={<BillingDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="residents/:id" element={<ResidentDetailPage />} />
          {/* Section Under Construction */}
          <Route path="*" element={
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800">
                  Section Under Construction
                </h2>
                <p className="text-slate-500 mt-2">The requested module will be available soon.</p>
                <Link to="/admin" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">
                  Back to Dashboard
                </Link>
              </div>
            </div>
          } />
        </Route>

        {/* Top-level Aliases for Admin Sections (Supports flat URLs) */}
        <Route path="/residents" element={<ProtectedRoute allowedRole="admin"><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminHome />} />
          <Route path=":id" element={<ResidentDetailPage />} />
        </Route>
        <Route path="/billing" element={<ProtectedRoute allowedRole="admin"><AdminLayout /></ProtectedRoute>}>
          <Route index element={<BillingDashboard />} />
        </Route>
        <Route path="/users" element={<ProtectedRoute allowedRole="admin"><AdminLayout /></ProtectedRoute>}>
          <Route index element={<UserManagement />} />
        </Route>

        {/* Resident Panel Routes (Separate Module) */}
        <Route
          path="/resident-dashboard"
          element={
            <ProtectedRoute allowedRole="resident">
              <ResidentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="intake" element={<Intake />} />
          <Route path="progress-chart" element={<ProgressChart />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
