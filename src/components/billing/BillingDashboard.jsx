import React, { useState, useEffect } from "react";
import BillingNavbar from "./BillingNavbar";
import BillingSubnav from "./BillingSubnav";
import BillingCard from "./BillingCard";
import { api } from "../../data/api";
import {
  FileText,
  FileUp,
  Clock,
  AlertCircle,
  DollarSign,
  Clock3,
  Edit3,
  Settings,
  Plus,
  ArrowRight,
  Activity,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  MapPin,
  Calendar,
  LayoutGrid,
  Loader2,
} from "lucide-react";
import ClaimWorkspaceModal from "./ClaimWorkspaceModal";
import EditProviderModal from "./modals/EditProviderModal";
import ManageLocationsModal from "./modals/ManageLocationsModal";
import CreateEncounterModal from "./modals/CreateEncounterModal";
import NewClaimModal from "./modals/NewClaimModal";

const MetricCard = ({ label, value, icon: Icon, color, onClick }) => {
  const colorMap = {
    green: "bg-[#e9f7ef] text-[#27ae60] border-[#d5f1e0]",
    blue: "bg-[#ebf5ff] text-[#3182ce] border-[#bee3f8]",
    orange: "bg-[#fffaf0] text-[#dd6b20] border-[#feebc8]",
    red: "bg-[#fff5f5] text-[#e53e3e] border-[#fed7d7]",
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all shadow-sm group ${onClick ? "cursor-pointer" : ""} h-[88px]`}
    >
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 border ${colorMap[color]}`}
      >
        <Icon size={20} strokeWidth={2.5} />
      </div>
      <div className="flex flex-col">
        <h4 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">
          {value}
        </h4>
        <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-tight line-clamp-1">
          {label}
        </p>
      </div>
    </div>
  );
};

const BillingDashboard = () => {
  const [activeTableTab, setActiveTableTab] = useState("Claims");
  const [activeBillingTab, setActiveBillingTab] = useState("Billing Dashboard");
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [selectedClaimId, setSelectedClaimId] = useState("CLM-00123");
  const [billingData, setBillingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [claimsFilter, setClaimsFilter] = useState(null);

  // New States for Timeframe and Date Range Filters
  const [timeframe, setTimeframe] = useState("Last 6 months");
  const [dateRange, setDateRange] = useState("Sep 1, 2025 - Feb 28, 2025");
  const [showTimeframeDropdown, setShowTimeframeDropdown] = useState(false);
  const [showDateRangeDropdown, setShowDateRangeDropdown] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // New States for Task 2 Modals
  const [isEditProviderModalOpen, setIsEditProviderModalOpen] = useState(false);
  const [isManageLocationsModalOpen, setIsManageLocationsModalOpen] =
    useState(false);
  const [isCreateEncounterModalOpen, setIsCreateEncounterModalOpen] =
    useState(false);
  const [isNewClaimModalOpen, setIsNewClaimModalOpen] = useState(false);

  // State for Status Breakdown Filter
  const [breakdownTimeframe, setBreakdownTimeframe] = useState("6-month");
  const [showBreakdownDropdown, setShowBreakdownDropdown] = useState(false);

  useEffect(() => {
    // Initial fetch
    api.getBillingData().then((data) => {
      setBillingData(data);
      setLoading(false);
    });
  }, []);

  // Simulate data re-fetch based on filter changes
  useEffect(() => {
    if (billingData && !loading) {
      setRefreshing(true);
      // Simulate API call with a short delay
      setTimeout(() => {
        setRefreshing(false);

        // Simulating data variation based on timeframe
        const multiplier =
          timeframe === "Last 30 days"
            ? 0.2
            : timeframe === "Last 3 months"
              ? 0.5
              : timeframe === "Last 12 months"
                ? 1.8
                : 1.0;

        setBillingData((prev) => {
          if (!prev) return prev;

          // Generate simulated chart points for the SVG (though the SVG is mostly static paths for now)
          // We can at least update the numerical values in the revenueTrend object

          return {
            ...prev,
            metrics: [
              {
                label: "Total Claims",
                value: Math.round(105 * multiplier).toString(),
                icon: "FileText",
                color: "green",
              },
              {
                label: "Submitted Today",
                value: Math.round(14 * multiplier).toString(),
                icon: "FileUp",
                color: "blue",
              },
              {
                label: "Pending Review",
                value: Math.round(12 * multiplier).toString(),
                icon: "Clock",
                color: "orange",
              },
              {
                label: "Rejected",
                value: Math.round(3 * multiplier).toString(),
                icon: "AlertCircle",
                color: "red",
              },
              {
                label: "Revenue MTD",
                value: `$${Math.round(64 * multiplier)}k`,
                icon: "DollarSign",
                color: "blue",
              },
              {
                label: "Avg Days",
                value: Math.round(18 + (multiplier > 1 ? 2 : -2)).toString(),
                icon: "Clock3",
                color: "green",
              },
            ],
            revenueTrend: {
              ...prev.revenueTrend,
              totalRevenue: `$${Math.round(152 * multiplier)}K`,
              outstanding: `$${Math.round(24.3 * multiplier)}K`,
            },
          };
        });
      }, 600);
    }
  }, [timeframe, dateRange]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#129FED] animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            Loading Billing Data...
          </p>
        </div>
      </div>
    );
  }

  const handleMarkAsPaid = async (e, claimId) => {
    e.stopPropagation();
    try {
      await api.updateClaimStatus(claimId, "Paid");
      setBillingData((prev) => ({
        ...prev,
        recentClaims: prev.recentClaims.map((c) =>
          c.id === claimId ? { ...c, status: "Paid" } : c,
        ),
      }));
      alert(`Claim ${claimId} marked as paid successfully!`);
    } catch (error) {
      alert("Failed to update claim status");
    }
  };

  const openClaimModal = (claimId) => {
    setSelectedClaimId(claimId);
    setIsClaimModalOpen(true);
  };

  const handleStatClick = (label) => {
    const filterMap = {
      "Submitted Today": "Submitted",
      "Pending Review": "Pending",
      Rejected: "Rejected",
    };

    const filterValue = filterMap[label];
    if (filterValue) {
      setClaimsFilter(filterValue);
      // Switch to appropriate tab
      if (label === "Submitted Today" || label === "Rejected") {
        setActiveTableTab("Submissions");
      } else {
        setActiveTableTab("Claims");
      }

      // Smooth scroll to table
      const tableElement = document.getElementById("claims-table-section");
      if (tableElement) {
        tableElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Use the local billingData throughout the component
  const data = billingData;
  const metrics = data.metrics;

  // Filter recentClaims
  const recentClaims = claimsFilter
    ? data.recentClaims.filter((c) => {
        if (claimsFilter === "Submitted" && c.status === "Submitted")
          return true;
        if (claimsFilter === "Pending" && c.status === "Pending") return true;
        if (claimsFilter === "Rejected" && c.status === "Denied") return true;
        return false;
      })
    : data.recentClaims;

  // Filter submissionHistory
  const filteredSubmissions = claimsFilter
    ? data.submissionHistory.filter((s) => {
        if (claimsFilter === "Submitted" && s.status === "Accepted")
          return true;
        if (claimsFilter === "Rejected" && s.status === "Rejected") return true;
        if (claimsFilter === "Pending" && s.status === "Pending") return true;
        return false;
      })
    : data.submissionHistory;

  const submissionHistory = filteredSubmissions;
  const revenueTrend = data.revenueTrend;
  const statusBreakdown = data.statusBreakdown;
  const provider = data.provider;
  const locations = data.locations;
  const encounter = data.encounter;

  const billingTabs = [
    { label: "Billing Dashboard", icon: LayoutGrid },
    { label: "Payments / ERA", icon: DollarSign },
    { label: "Reports", icon: TrendingUp },
  ];

  const iconMap = {
    FileText,
    FileUp,
    Clock,
    AlertCircle,
    DollarSign,
    Clock3,
  };

  return (
    <main className="flex-1 overflow-y-auto p-5 scroll-smooth custom-scrollbar bg-[#F8FAFC] relative">
      {refreshing && (
        <div className="absolute inset-0 bg-[#F8FAFC]/40 backdrop-blur-[1px] z-50 flex items-center justify-center p-8 pointer-events-none">
          <div className="bg-white px-6 py-3 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 animate-pulse pointer-events-auto">
            <Loader2 className="w-5 h-5 text-[#129FED] animate-spin" />
            <span className="text-[12px] font-bold text-slate-600 uppercase tracking-widest">
              Updating Dashboard...
            </span>
          </div>
        </div>
      )}
      <div
        className={`max-w-full mx-auto space-y-4 transition-opacity duration-300 ${refreshing ? "opacity-40" : "opacity-100"}`}
      >
        {/* Row 1: Billing-Specific Navigation & Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {billingTabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveBillingTab(tab.label)}
                className={`px-5 py-2.5 rounded-lg text-[13px] font-bold transition-all flex items-center gap-2 border ${
                  activeBillingTab === tab.label
                    ? "bg-[#129FED] text-white border-[#129FED] shadow-lg shadow-blue-100"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <tab.icon size={16} strokeWidth={2.5} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                onClick={() => {
                  setShowDateRangeDropdown(!showDateRangeDropdown);
                  setShowTimeframeDropdown(false);
                }}
                className={`flex items-center gap-3 bg-white px-5 py-2.5 rounded-lg border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-all ${showDateRangeDropdown ? "border-[#129FED]" : ""}`}
              >
                <Calendar
                  size={16}
                  className={
                    showDateRangeDropdown ? "text-[#129FED]" : "text-slate-400"
                  }
                />
                <span className="text-[13px] font-bold text-slate-700">
                  {dateRange}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform ${showDateRangeDropdown ? "rotate-180" : ""}`}
                />
              </div>

              {showDateRangeDropdown && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden z-20">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">
                      Select Custom Range
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      "Jan 1, 2025 - Jun 30, 2025",
                      "Sep 1, 2025 - Feb 28, 2025",
                      "Mar 1, 2024 - Aug 31, 2024",
                    ].map((range) => (
                      <button
                        key={range}
                        onClick={() => {
                          setDateRange(range);
                          setShowDateRangeDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-[12px] font-bold transition-all ${dateRange === range ? "bg-[#129FED]/10 text-[#129FED]" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <div
                onClick={() => {
                  setShowTimeframeDropdown(!showTimeframeDropdown);
                  setShowDateRangeDropdown(false);
                }}
                className={`flex items-center gap-2 bg-white px-5 py-2.5 rounded-lg border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-all ${showTimeframeDropdown ? "border-[#129FED]" : ""}`}
              >
                <span className="text-[13px] font-bold text-slate-700">
                  {timeframe}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform ${showTimeframeDropdown ? "rotate-180" : ""}`}
                />
              </div>

              {showTimeframeDropdown && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden z-20">
                  <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">
                      Preset Ranges
                    </span>
                  </div>
                  <div className="p-3 space-y-1">
                    {[
                      "Last 30 days",
                      "Last 3 months",
                      "Last 6 months",
                      "Last 12 months",
                      "All Time",
                    ].map((period) => (
                      <button
                        key={period}
                        onClick={() => {
                          setTimeframe(period);
                          setShowTimeframeDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-[12px] font-bold transition-all ${timeframe === period ? "bg-[#129FED]/10 text-[#129FED]" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Row 2: Top Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((stat, idx) => (
            <MetricCard
              key={idx}
              {...stat}
              icon={iconMap[stat.icon]}
              onClick={() => handleStatClick(stat.label)}
            />
          ))}
        </div>

        {/* Row 3: Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
          {/* Left Column (3/5) */}
          <div className="lg:col-span-3 space-y-8">
            <div className="grid grid-cols-2 gap-8">
              {/* Billing Provider */}
              <BillingCard
                title="Billing Provider"
                icon={FileText}
                className="rounded-xl"
                action={
                  <button
                    onClick={() => setIsEditProviderModalOpen(true)}
                    className="flex items-center gap-1.5 text-[11px] font-bold text-[#129FED] hover:underline"
                  >
                    <Edit3 size={14} />
                    Edit Provider
                  </button>
                }
              >
                <div className="grid grid-cols-1 gap-y-5">
                  {[
                    { label: "Name", value: provider.name },
                    { label: "NPI", value: provider.npi },
                    { label: "Address", value: provider.address },
                    { label: "Phone", value: provider.phone },
                  ].map((field) => (
                    <div
                      key={field.label}
                      className="flex justify-between items-start"
                    >
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                        {field.label}
                      </p>
                      <p className="text-[12px] font-bold text-slate-900 text-right max-w-[180px]">
                        {field.value}
                      </p>
                    </div>
                  ))}
                </div>
              </BillingCard>

              {/* Service Locations */}
              <BillingCard
                title="Service Locations"
                icon={MapPin}
                className="rounded-xl"
                action={
                  <button
                    onClick={() => setIsManageLocationsModalOpen(true)}
                    className="flex items-center gap-1.5 text-[11px] font-bold text-[#129FED] hover:underline"
                  >
                    <Settings size={14} />
                    Manage Locations
                  </button>
                }
              >
                <div className="space-y-4">
                  {locations.map((loc, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg bg-[#F8FAFC] border border-slate-100 hover:border-[#129FED]/30 transition-all cursor-pointer group"
                    >
                      <h4 className="text-[13px] font-bold text-slate-800">
                        {loc.name}
                      </h4>
                      <p className="text-[11px] font-medium text-slate-500 mt-1">
                        {loc.address}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          NPI: <span className="text-[#64748B]">{loc.npi}</span>
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase border-l pl-3">
                          POS: <span className="text-[#64748B]">{loc.pos}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </BillingCard>
            </div>

            {/* Visit / Encounter */}
            <BillingCard
              title="Visit / Encounter"
              icon={FileUp}
              className="rounded-xl"
              action={
                <button
                  onClick={() => setIsCreateEncounterModalOpen(true)}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-[#129FED] hover:underline"
                >
                  <Plus size={14} />
                  Create Encounter
                </button>
              }
            >
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-4">
                  {[
                    { label: "Patient", value: encounter.patient },
                    { label: "Provider", value: encounter.provider },
                    { label: "Facility", value: encounter.facility },
                    { label: "DOS", value: encounter.dos },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between"
                    >
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                        {row.label}
                      </span>
                      <span className="text-[13px] font-bold text-slate-800">
                        {row.value}
                      </span>
                    </div>
                  ))}
                  <button className="flex items-center gap-1.5 text-[11px] font-bold text-[#129FED] mt-6 group">
                    View Details
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight mb-3">
                      Diagnoses
                    </p>
                    <div className="space-y-2">
                      {encounter.diagnoses.map((diag, idx) => (
                        <div key={idx} className="flex gap-3">
                          <span className="text-[11px] font-bold text-[#129FED] shrink-0">
                            {diag.code}
                          </span>
                          <span className="text-[11px] font-bold text-slate-500 leading-tight">
                            {diag.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight mb-3">
                      Procedures
                    </p>
                    <div className="space-y-3">
                      {encounter.procedures.map((proc, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-[#129FED]">
                              {proc.code}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400">
                              × {proc.qty}
                            </span>
                          </div>
                          <span className="text-[13px] font-bold text-slate-800">
                            {proc.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </BillingCard>

            {/* Claims Table Area */}
            <div
              id="claims-table-section"
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 border-b border-slate-100">
                <div className="flex items-center gap-8">
                  {["Claims", "Submissions"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTableTab(tab)}
                      className={`py-4 text-[13px] font-bold transition-all relative ${
                        activeTableTab === tab
                          ? "text-[#129FED] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#129FED]"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {claimsFilter && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Filtered by:{" "}
                      <span className="text-[#129FED]">{claimsFilter}</span>
                    </span>
                    <button
                      onClick={() => setClaimsFilter(null)}
                      className="text-[10px] font-bold text-red-500 hover:underline"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              {activeTableTab === "Claims" ? (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#E3F2FD] flex items-center justify-center text-[#129FED]">
                        <FileText size={16} />
                      </div>
                      <h3 className="text-[15px] font-bold text-slate-800">
                        Recent Claims
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <select className="appearance-none bg-white px-4 py-2 pr-10 rounded-lg text-[11px] font-bold text-slate-500 border border-slate-200 outline-none cursor-pointer">
                          <option>Filter by Status</option>
                        </select>
                        <ChevronDown
                          size={14}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                      </div>
                      <button
                        onClick={() => setIsNewClaimModalOpen(true)}
                        className="bg-[#129FED] text-white px-4 py-2 rounded-lg text-[11px] font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-sm shadow-blue-100"
                      >
                        <Plus size={14} /> New Claim
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto no-scrollbar rounded-lg border border-slate-100">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[#F8FAFC]">
                          <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Claim ID
                          </th>
                          <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Patient
                          </th>
                          <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Payer
                          </th>
                          <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Amount
                          </th>
                          <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {recentClaims.map((claim, idx) => (
                          <tr
                            key={idx}
                            onClick={() => openClaimModal(claim.id)}
                            className="hover:bg-[#E3F2FD]/20 transition-all cursor-pointer group"
                          >
                            <td className="px-6 py-4 text-[11px] font-bold text-[#129FED]">
                              {claim.id}
                            </td>
                            <td className="px-6 py-4 text-[11px] font-bold text-slate-800">
                              {claim.patient}
                            </td>
                            <td className="px-6 py-4 text-[11px] font-bold text-slate-500">
                              {claim.payer}
                            </td>
                            <td className="px-6 py-4 text-[11px] font-bold text-slate-800">
                              {claim.amount}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                                  claim.status === "Submitted"
                                    ? "bg-[#E3F2FD] text-[#129FED] border-[#129FED]/30"
                                    : claim.status === "Paid"
                                      ? "bg-[#E9F7EF] text-[#27AE60] border-[#27AE60]/30"
                                      : claim.status === "Denied"
                                        ? "bg-[#FEF2F2] text-[#EF4444] border-[#EF4444]/30"
                                        : "bg-[#FFF7ED] text-[#F97316] border-[#F97316]/30"
                                }`}
                              >
                                {claim.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              {claim.status !== "Paid" && (
                                <button
                                  onClick={(e) => handleMarkAsPaid(e, claim.id)}
                                  className="text-[10px] font-bold text-[#27AE60] hover:underline"
                                >
                                  Mark Paid
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  {/* Submissions Section */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#E3F2FD] flex items-center justify-center text-[#129FED]">
                        <Clock size={16} />
                      </div>
                      <h3 className="text-[15px] font-bold text-slate-800">
                        Submission History
                      </h3>
                    </div>
                    <button className="text-slate-500 hover:text-slate-800 text-[11px] font-bold flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200">
                      <Activity size={14} className="rotate-90" /> Refresh
                    </button>
                  </div>
                  <div className="overflow-x-auto no-scrollbar rounded-lg border border-slate-100">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[#F8FAFC]">
                          <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Claim ID
                          </th>
                          <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Patient
                          </th>
                          <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Payer
                          </th>
                          <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Submitted
                          </th>
                          <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {submissionHistory.map((sub, idx) => (
                          <tr
                            key={idx}
                            onClick={() => openClaimModal(sub.id)}
                            className="hover:bg-[#E3F2FD]/20 transition-all cursor-pointer"
                          >
                            <td className="px-6 py-4 text-[11px] font-bold text-[#129FED]">
                              {sub.id}
                            </td>
                            <td className="px-6 py-4 text-[11px] font-bold text-slate-800">
                              {sub.patient}
                            </td>
                            <td className="px-6 py-4 text-[11px] font-bold text-slate-500">
                              {sub.payer}
                            </td>
                            <td className="px-6 py-4 text-[11px] font-bold text-slate-500">
                              {sub.submitted}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                                  sub.status === "Accepted"
                                    ? "bg-[#E9F7EF] text-[#27AE60] border-[#27AE60]/30"
                                    : "bg-[#FEF2F2] text-[#EF4444] border-[#EF4444]/30"
                                }`}
                              >
                                {sub.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN (2/5) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Revenue Trend Area */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all">
              <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#E3F2FD] flex items-center justify-center text-[#129FED]">
                    <TrendingUp size={16} />
                  </div>
                  <h3 className="text-[15px] font-bold text-slate-800">
                    Revenue Trend
                  </h3>
                </div>
                <div className="px-2 py-1 rounded-lg bg-[#E9F7EF] text-[#27AE60] text-[10px] font-bold flex items-center gap-1 border border-[#27AE60]/20">
                  <TrendingUp size={12} /> {revenueTrend.totalTrend}
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-lg border border-slate-100 bg-white relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#E9F7EF] flex items-center justify-center text-[#27AE60]">
                        <DollarSign size={20} />
                      </div>
                      <span className="text-[10px] font-bold text-[#27AE60] bg-[#E9F7EF] px-2 py-0.5 rounded-lg border border-[#27AE60]/20">
                        {revenueTrend.totalTrend}
                      </span>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800 leading-none">
                      {revenueTrend.totalRevenue}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase">
                      Total Revenue
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-slate-100 bg-white relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#FFF7ED] flex items-center justify-center text-[#F97316]">
                        <Clock3 size={20} />
                      </div>
                      <span className="text-[10px] font-bold text-[#F97316] bg-[#FFF7ED] px-2 py-0.5 rounded-lg border border-[#F97316]/20">
                        {revenueTrend.outstandingTrend}
                      </span>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800 leading-none">
                      {revenueTrend.outstanding}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase">
                      Outstanding
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <h5 className="text-[13px] font-bold text-slate-700">
                        Revenue Trend
                      </h5>
                      <span className="text-[10px] text-slate-400">
                        vs Target (dashed)
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#129FED]" />
                        <span className="text-[10px] font-bold text-slate-500">
                          Actual
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                        <span className="text-[10px] font-bold text-slate-400">
                          No Show
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="h-44 w-full relative group/chart mt-4">
                    <svg
                      viewBox="0 0 100 40"
                      className="w-full h-full overflow-visible"
                    >
                      <defs>
                        <linearGradient
                          id="areaGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#129FED"
                            stopOpacity="0.2"
                          />
                          <stop
                            offset="100%"
                            stopColor="#129FED"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0,35 L 20,30 L 40,25 L 60,20 L 80,15 L 100,10 L 100,40 L 0,40 Z"
                        fill="url(#areaGrad)"
                      />
                      <line
                        x1="0"
                        y1="25"
                        x2="100"
                        y2="25"
                        stroke="#E2E8F0"
                        strokeWidth="0.5"
                        strokeDasharray="1,1"
                      />
                      <path
                        d="M 0,35 L 20,30 L 40,25 L 60,20 L 80,15 L 100,10"
                        fill="none"
                        stroke="#129FED"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="60"
                        cy="20"
                        r="1.5"
                        fill="white"
                        stroke="#129FED"
                        strokeWidth="0.5"
                      />
                      <g className="opacity-0 group-hover/chart:opacity-100 transition-opacity">
                        <rect
                          x="62"
                          y="10"
                          width="30"
                          height="12"
                          rx="2"
                          fill="white"
                          stroke="#E2E8F0"
                          strokeWidth="0.2"
                        />
                        <text
                          x="65"
                          y="15"
                          fontSize="3"
                          fontWeight="bold"
                          fill="#64748B"
                        >
                          Nov
                        </text>
                        <text
                          x="65"
                          y="19"
                          fontSize="3"
                          fontWeight="bold"
                          fill="#1E293B"
                        >
                          Revenue : $45,000
                        </text>
                      </g>
                    </svg>
                    <div className="flex justify-between mt-2 px-1">
                      {["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"].map((m) => (
                        <span
                          key={m}
                          className="text-[9px] font-bold text-slate-400 uppercase"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 px-6 pb-6 mt-10">
                {[
                  { label: "Submitted Today", value: "14", color: "green" },
                  { label: "Pending Review", value: "12", color: "orange" },
                  { label: "Rejected", value: "3", color: "red" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleStatClick(item.label)}
                    className={`p-4 rounded-lg flex flex-col items-center justify-center border cursor-pointer hover:shadow-sm transition-all ${item.color === "green" ? "bg-[#E9F7EF] border-[#27AE60]/10 hover:border-[#27AE60]/30" : item.color === "orange" ? "bg-[#FFF7ED] border-[#F97316]/10 hover:border-[#F97316]/30" : "bg-[#FEF2F2] border-[#EF4444]/10 hover:border-[#EF4444]/30"}`}
                  >
                    <span
                      className={`text-xl font-bold ${item.color === "green" ? "text-[#27AE60]" : item.color === "orange" ? "text-[#F97316]" : "text-[#EF4444]"}`}
                    >
                      {item.value}
                    </span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase mt-1 text-center leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Claims Status Breakdown */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#E3F2FD] flex items-center justify-center text-[#129FED]">
                    <Activity size={16} />
                  </div>
                  <h3 className="text-[15px] font-bold text-slate-800">
                    Claims Status Breakdown
                  </h3>
                </div>
                <div className="relative">
                  <div
                    onClick={() =>
                      setShowBreakdownDropdown(!showBreakdownDropdown)
                    }
                    className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 group cursor-pointer hover:text-slate-600 transition-all"
                  >
                    {breakdownTimeframe}{" "}
                    <ChevronDown
                      size={14}
                      className={`group-hover:translate-y-0.5 transition-transform ${showBreakdownDropdown ? "rotate-180" : ""}`}
                    />
                  </div>

                  {showBreakdownDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-36 bg-white rounded-lg border border-slate-200 shadow-xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                      {["3-month", "6-month", "12-month", "All Time"].map(
                        (range) => (
                          <button
                            key={range}
                            onClick={() => {
                              setBreakdownTimeframe(range);
                              setShowBreakdownDropdown(false);
                              // Simulate data update
                              setRefreshing(true);
                              setTimeout(() => setRefreshing(false), 400);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-[11px] font-bold transition-all ${breakdownTimeframe === range ? "bg-[#129FED]/10 text-[#129FED]" : "text-slate-500 hover:bg-slate-50"}`}
                          >
                            {range}
                          </button>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-around">
                <div className="relative w-44 h-44">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full -rotate-90"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#F1F5F9"
                      strokeWidth="12"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="12"
                      strokeDasharray="163 251"
                      strokeDashoffset="0"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="12"
                      strokeDasharray="38 251"
                      strokeDashoffset="-163"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="12"
                      strokeDasharray="45 251"
                      strokeDashoffset="-201"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#94A3B8"
                      strokeWidth="12"
                      strokeDasharray="13 251"
                      strokeDashoffset="-246"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[11px] font-bold text-slate-700">
                      Pending : 18
                    </span>
                    <Activity size={14} className="text-[#129FED] mt-1" />
                  </div>
                </div>

                <div className="space-y-4">
                  {statusBreakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between w-32"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-[11px] font-bold text-slate-400 uppercase">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-[12px] font-bold text-slate-800">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer App Version */}
        <div className="text-center pb-8 pt-4 opacity-40">
          <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">
            HEALTHCARE Inc. • v1.0.8
          </p>
        </div>

        {isClaimModalOpen && (
          <ClaimWorkspaceModal
            isOpen={isClaimModalOpen}
            onClose={() => setIsClaimModalOpen(false)}
            claimId={selectedClaimId}
          />
        )}

        {/* New Functional Modals */}
        <EditProviderModal
          isOpen={isEditProviderModalOpen}
          onClose={() => setIsEditProviderModalOpen(false)}
          provider={provider}
          onSave={(updated) => {
            setBillingData((prev) => ({ ...prev, provider: updated }));
          }}
        />

        <ManageLocationsModal
          isOpen={isManageLocationsModalOpen}
          onClose={() => setIsManageLocationsModalOpen(false)}
          locations={locations}
          onUpdate={(updated) => {
            setBillingData((prev) => ({ ...prev, locations: updated }));
          }}
        />

        <CreateEncounterModal
          isOpen={isCreateEncounterModalOpen}
          onClose={() => setIsCreateEncounterModalOpen(false)}
          onSave={(newEncounter) => {
            setBillingData((prev) => ({ ...prev, encounter: newEncounter }));
          }}
        />

        <NewClaimModal
          isOpen={isNewClaimModalOpen}
          onClose={() => setIsNewClaimModalOpen(false)}
          onSave={(newClaim) => {
            setBillingData((prev) => ({
              ...prev,
              recentClaims: [newClaim, ...prev.recentClaims],
            }));
          }}
        />
      </div>
    </main>
  );
};

export default BillingDashboard;
