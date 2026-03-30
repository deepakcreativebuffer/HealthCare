import React, { useState } from "react";
import BillingNavbar from "./BillingNavbar";
import BillingSubnav from "./BillingSubnav";
import BillingCard from "./BillingCard";
import { billingData } from "../../data/billingData";
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
} from "lucide-react";
import ClaimWorkspaceModal from "./ClaimWorkspaceModal";

const MetricCard = ({ label, value, icon: Icon, color }) => {
  const colorMap = {
    green: "bg-[#e9f7ef] text-[#27ae60]",
    blue: "bg-[#ebf5ff] text-[#3182ce]",
    orange: "bg-[#fffaf0] text-[#dd6b20]",
    red: "bg-[#fff5f5] text-[#e53e3e]",
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4 hover:shadow-sm transition-all shadow-sm group cursor-pointer">
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${colorMap[color]}`}
      >
        <Icon size={22} />
      </div>
      <div>
        <h4 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">
          {value}
        </h4>
        <p className="text-[11px] font-bold text-slate-400 mt-1.5 uppercase tracking-tight">
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

  const openClaimModal = (claimId) => {
    setSelectedClaimId(claimId);
    setIsClaimModalOpen(true);
  };

  const billingTabs = [
    { label: "Billing Dashboard", active: true },
    { label: "Payments / ERA", active: false },
    { label: "Reports", active: false },
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
    <main className="flex-1 overflow-y-auto p-6 scroll-smooth no-scrollbar">
      <div className="max-w-full mx-auto space-y-6 pb-20">
        {/* Row 3: Billing-Specific Navigation & Filters */}
        <div className="flex items-center justify-between pb-4 bg-transparent">
          {/* Billing Tabs */}
          <div className="flex items-center gap-2 bg-slate-100/50 p-1 rounded-2xl border border-slate-100 backdrop-blur-sm">
            {billingTabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveBillingTab(tab.label)}
                className={`px-5 py-2 rounded-xl text-[13px] font-bold transition-all ${activeBillingTab === tab.label
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                    : "text-slate-400 hover:text-slate-600"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border border-slate-100 shadow-sm">
              <Calendar size={16} className="text-slate-400" />
              <span className="text-[13px] font-bold text-slate-700">
                Sep 1, 2025 - Feb 28, 2025
              </span>
            </div>

            <div className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-2xl border border-slate-100 shadow-sm cursor-pointer hover:bg-slate-50 transition-all">
              <span className="text-[13px] font-bold text-slate-700">
                Last 6 months
              </span>
              <ChevronDown size={16} className="text-slate-400" />
            </div>
          </div>
        </div>

        {/* Top Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {billingData.metrics.map((stat, idx) => (
            <MetricCard key={idx} {...stat} icon={iconMap[stat.icon]} />
          ))}
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Left Column (3/5) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Billing Provider */}
              <BillingCard
                title="Billing Provider"
                icon={FileText}
                action={
                  <button className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-all px-2 py-1 rounded-lg hover:bg-blue-50">
                    <Edit3 size={14} />
                    Edit Provider
                  </button>
                }
              >
                <div className="grid grid-cols-1 gap-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none">
                      Name
                    </p>
                    <p className="text-[12px] font-extrabold text-slate-800 mt-2">
                      {billingData.provider.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none">
                      NPI
                    </p>
                    <p className="text-[12px] font-extrabold text-slate-800 mt-2">
                      {billingData.provider.npi}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none">
                      Address
                    </p>
                    <p className="text-[12px] font-extrabold text-slate-800 mt-2 leading-relaxed">
                      {billingData.provider.address}
                    </p>
                  </div>
                </div>
              </BillingCard>

              {/* Service Locations */}
              <BillingCard
                title="Service Locations"
                icon={MapPin}
                action={
                  <button className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-all px-2 py-1 rounded-lg hover:bg-blue-50">
                    <Settings size={14} />
                    Manage
                  </button>
                }
              >
                <div className="space-y-3">
                  {billingData.locations.map((loc, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50/30 border border-slate-100 hover:border-blue-200 transition-all border-dashed"
                    >
                      <h4 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-tight">
                        {loc.name}
                      </h4>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase">
                          NPI: <span className="text-slate-600">{loc.npi}</span>
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase">
                          POS: <span className="text-slate-600">{loc.pos}</span>
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
              action={
                <button className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-all px-2 py-1 rounded-lg hover:bg-blue-50">
                  <Plus size={14} />
                  Create Encounter
                </button>
              }
            >
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                  {[
                    { label: "Patient", value: billingData.encounter.patient },
                    {
                      label: "Provider",
                      value: billingData.encounter.provider,
                    },
                    {
                      label: "Facility",
                      value: billingData.encounter.facility,
                    },
                    { label: "DOS", value: billingData.encounter.dos },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between"
                    >
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {row.label}
                      </span>
                      <span className="text-[13px] font-extrabold text-slate-800">
                        {row.value}
                      </span>
                    </div>
                  ))}
                  <button className="flex items-center gap-1.5 text-[10px] font-extrabold text-blue-600 hover:text-blue-700 mt-4 uppercase tracking-wider group/link">
                    View Details
                    <ArrowRight
                      size={12}
                      className="transition-transform group-hover/link:translate-x-1"
                    />
                  </button>
                </div>
                <div className="space-y-6 font-bold">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-3">
                      Diagnoses
                    </p>
                    <div className="space-y-2">
                      {billingData.encounter.diagnoses.map((diag, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span className="text-[11px] text-blue-500 whitespace-nowrap">
                            {diag.code}
                          </span>
                          <span className="text-[11px] text-slate-500 leading-[1.3]">
                            {diag.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-3">
                      Procedures
                    </p>
                    <div className="space-y-3">
                      {billingData.encounter.procedures.map((proc, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-baseline gap-1">
                            <span className="text-[11px] text-blue-500">
                              {proc.code}
                            </span>
                            <span className="text-[10px] text-slate-400 tracking-tighter">
                              × {proc.qty}
                            </span>
                          </div>
                          <span className="text-[13px] text-slate-800">
                            {proc.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </BillingCard>

            {/* Recent Claims / Submission History Card */}
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all">
              {/* Custom Internal Tabs */}
              <div className="flex items-center gap-6 px-8 border-b border-slate-50">
                {["Claims", "Submissions"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTableTab(tab)}
                    className={`py-4 text-[13px] font-bold transition-all relative ${activeTableTab === tab
                        ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
                        : "text-slate-400 hover:text-slate-600 font-extrabold"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTableTab === "Claims" ? (
                <>
                  {/* Claims Sub Header */}
                  <div className="px-6 py-4 flex items-center justify-between border-b border-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-blue-50/50 flex items-center justify-center text-blue-600">
                        <FileText size={18} />
                      </div>
                      <h3 className="text-sm font-bold text-slate-800 tracking-tight">
                        Recent Claims
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative group/select">
                        <select className="appearance-none bg-slate-50 px-4 py-2 pr-10 rounded-xl text-[11px] font-bold text-slate-500 border border-slate-100 outline-none cursor-pointer hover:bg-slate-100">
                          <option>Filter by Status</option>
                        </select>
                        <ChevronDown
                          size={14}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                      </div>
                      <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-[11px] font-extrabold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-100">
                        <Plus size={16} />
                        New Claim
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50/20">
                          <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest first:pl-8">
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
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {billingData.recentClaims.map((claim, idx) => (
                          <tr
                            key={idx}
                            onClick={() => openClaimModal(claim.id)}
                            className="hover:bg-blue-50/10 transition-all cursor-pointer group"
                          >
                            <td className="px-6 py-4 text-[11px] font-extrabold text-blue-500 first:pl-8 tracking-tight">
                              {claim.id}
                            </td>
                            <td className="px-6 py-4 text-[11px] font-extrabold text-slate-800 tracking-tight">
                              {claim.patient}
                            </td>
                            <td className="px-6 py-4 text-[11px] font-bold text-slate-400">
                              {claim.payer}
                            </td>
                            <td className="px-6 py-4 text-[11px] font-extrabold text-slate-800">
                              {claim.amount}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`text-[10px] font-extrabold px-3 py-1 rounded-full whitespace-nowrap shadow-sm border border-transparent ${claim.status === "Submitted"
                                    ? "bg-blue-50 text-blue-500 border-blue-100"
                                    : claim.status === "Paid"
                                      ? "bg-green-50 text-green-500 border-green-100"
                                      : claim.status === "Denied"
                                        ? "bg-red-50 text-red-500 border-red-100"
                                        : "bg-orange-50 text-orange-500 border-orange-100"
                                  }`}
                              >
                                {claim.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  {/* Submissions Sub Header */}
                  <div className="px-6 py-4 flex items-center justify-between border-b border-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-50/50 flex items-center justify-center text-blue-600">
                        <Clock size={18} />
                      </div>
                      <h3 className="text-sm font-bold text-slate-800 tracking-tight uppercase">
                        Submission History
                      </h3>
                    </div>
                    <button className="flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-xl text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                      <Activity size={14} className="rotate-90" />
                      Refresh
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-slate-50/30">
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
                        <tbody className="divide-y divide-slate-50">
                          {billingData.submissionHistory.map((sub, idx) => (
                            <tr
                              key={idx}
                              onClick={() => openClaimModal(sub.id)}
                              className="hover:bg-blue-50/10 transition-all cursor-pointer"
                            >
                              <td className="px-6 py-4 text-[11px] font-extrabold text-blue-500 tracking-tight">
                                {sub.id}
                              </td>
                              <td className="px-6 py-4 text-[11px] font-extrabold text-slate-800 tracking-tight">
                                {sub.patient}
                              </td>
                              <td className="px-6 py-4 text-[11px] font-bold text-slate-400">
                                {sub.payer}
                              </td>
                              <td className="px-6 py-4 text-[11px] font-bold text-slate-500">
                                {sub.submitted}
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`text-[10px] font-extrabold px-3 py-1 rounded-full whitespace-nowrap shadow-sm border border-transparent ${sub.status === "Accepted"
                                      ? "bg-green-50 text-green-500 border-green-100"
                                      : sub.status === "Rejected"
                                        ? "bg-red-50 text-red-500 border-red-100"
                                        : "bg-orange-50 text-orange-500 border-orange-100"
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
                </>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN (2/5) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Revenue Trend Chart Area */}
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all">
              <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50/50 flex items-center justify-center text-blue-600">
                    <TrendingUp size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 tracking-tight">
                    Revenue Trend
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-green-50 text-green-500 text-[10px] font-extrabold border border-green-100">
                  <TrendingUp size={12} />
                  +12.5%
                </div>
              </div>

              <div className="p-6">
                {/* Revenue / Outstanding Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group/metric cursor-pointer relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-[10px] font-bold px-1.5 py-0.5 bg-green-50 text-green-500 rounded-lg group-hover/metric:scale-110 transition-transform">
                      +12.5%
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500 mb-3 group-hover/metric:rotate-6 transition-transform">
                      <DollarSign size={18} />
                    </div>
                    <h4 className="text-2xl font-extrabold text-slate-800 leading-none">
                      $152K
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wide">
                      Total Revenue
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all group/metric relative cursor-pointer overflow-hidden">
                    <div className="absolute top-4 right-4 text-[10px] font-bold px-1.5 py-0.5 bg-orange-50 text-orange-600 rounded-lg group-hover/metric:scale-110 transition-transform">
                      -8.2%
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 mb-3 group-hover/metric:rotate-6 transition-transform">
                      <Clock3 size={18} />
                    </div>
                    <h4 className="text-2xl font-extrabold text-slate-800 leading-none">
                      $24.3K
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wide">
                      Outstanding
                    </p>
                  </div>
                </div>

                {/* Revenue Trend Line Chart Area */}
                <div className="relative h-48 w-full mt-4 group/chart px-2">
                  {/* Legend */}
                  <div className="flex items-center gap-4 mb-6 justify-end mr-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
                      <span className="text-[10px] font-bold text-slate-500">
                        Actual
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-sm border-2 border-slate-300 border-dashed bg-transparent" />
                      <span className="text-[10px] font-bold text-slate-400">
                        No Show
                      </span>
                    </div>
                  </div>

                  <div className="relative h-40">
                    <svg
                      className="w-full h-full overflow-visible"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient
                          id="revenueGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#3b82f6"
                            stopOpacity="0.25"
                          />
                          <stop
                            offset="100%"
                            stopColor="#3b82f6"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                      {/* Grid Lines */}
                      {[0, 25, 50, 75, 100].map((p) => (
                        <line
                          key={p}
                          x1="0"
                          y1={p + "%"}
                          x2="100%"
                          y2={p + "%"}
                          stroke="#f8fafc"
                          strokeWidth="1"
                        />
                      ))}
                      {/* Area Path */}
                      <path
                        d="M0,100 L50,85 L100,70 L150,65 L200,50 L250,35 L300,20 L300,100 Z"
                        fill="url(#revenueGradient)"
                        className="translate-y-[-10px]"
                      />
                      {/* Lines */}
                      <path
                        d="M0,85 L100,85 L200,85 L300,85"
                        stroke="#e2e8f0"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="translate-y-[-10px]"
                      />
                      <path
                        d="M0,95 L50,85 L100,70 L150,65 L200,50 L250,35 L300,20"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="translate-y-[-10px]"
                      />
                      {/* Point Tooltip Mock */}
                      <g className="opacity-0 group-hover/chart:opacity-100 transition-opacity">
                        <line
                          x1="200"
                          y1="0"
                          x2="200"
                          y2="100%"
                          stroke="#2563eb"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                        />
                        <circle
                          cx="200"
                          cy="40"
                          r="5"
                          fill="white"
                          stroke="#2563eb"
                          strokeWidth="2.5"
                        />
                        <foreignObject
                          x="210"
                          y="20"
                          width="100"
                          height="40"
                          className="overflow-visible"
                        >
                          <div className="bg-white p-2 rounded-lg shadow-xl border border-slate-100">
                            <p className="text-[9px] font-bold text-slate-400">
                              Nov
                            </p>
                            <p className="text-[10px] font-extrabold text-slate-800 mt-0.5">
                              Revenue : $45,000
                            </p>
                          </div>
                        </foreignObject>
                      </g>
                    </svg>
                    {/* Labels */}
                    <div className="absolute -bottom-6 inset-x-0 flex justify-between px-2">
                      {["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"].map((m) => (
                        <span
                          key={m}
                          className="text-[9px] font-extrabold text-slate-400 tracking-tighter uppercase"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Mini Summary Grid */}
              <div className="grid grid-cols-3 gap-4 px-6 pb-6 pt-8 border-t border-slate-50 bg-white">
                {[
                  { label: "Submitted Today", value: "14", color: "green" },
                  { label: "Pending Review", value: "12", color: "orange" },
                  { label: "Rejected", value: "3", color: "red" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl flex flex-col items-center justify-center border shadow-sm ${item.color === "green"
                        ? "bg-[#e9f7ef] border-[#d5f1e0]"
                        : item.color === "orange"
                          ? "bg-[#fff7ed] border-[#ffedd5]"
                          : "bg-[#fef2f2] border-[#fee2e2]"
                      }`}
                  >
                    <span
                      className={`text-[17px] font-extrabold ${item.color === "green"
                          ? "text-[#27ae60]"
                          : item.color === "orange"
                            ? "text-[#f97316]"
                            : "text-[#ef4444]"
                        }`}
                    >
                      {item.value}
                    </span>
                    <span
                      className={`text-[9px] font-extrabold mt-1 text-center leading-[1.1] uppercase tracking-tighter ${item.color === "green"
                          ? "text-[#27ae60]/80"
                          : item.color === "orange"
                            ? "text-[#f97316]/80"
                            : "text-[#ef4444]/80"
                        }`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Claims Status Breakdown */}
            <BillingCard
              title="Claims Status Breakdown"
              icon={Activity}
              action={
                <div className="flex items-center gap-1 text-[11px] font-extrabold text-slate-400 cursor-pointer hover:text-slate-600 transition-colors">
                  6-month <ChevronDown size={14} className="text-slate-300" />
                </div>
              }
            >
              <div className="flex items-center justify-between p-2">
                <div className="relative w-44 h-44 group/donut cursor-default">
                  <svg
                    viewBox="0 0 100 100"
                    className="rotate-[-90deg] w-full h-full drop-shadow-md drop-shadow-blue-50/50"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#f8fafc"
                      strokeWidth="12"
                    />
                    {/* Paid 65% - green */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="12"
                      strokeDasharray="155 239"
                      strokeDashoffset="0"
                      className="transition-all duration-1000 ease-out"
                    />
                    {/* Pending 15% - orange */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="12"
                      strokeDasharray="36 239"
                      strokeDashoffset="-155"
                    />
                    {/* Denied 18% - red */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="12"
                      strokeDasharray="43 239"
                      strokeDashoffset="-191"
                    />
                    {/* Draft 5% - slate */}
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="12"
                      strokeDasharray="12 239"
                      strokeDashoffset="-234"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white px-3 py-2 rounded-xl shadow-xl border border-blue-50 flex flex-col items-center scale-95 group-hover/donut:scale-100 transition-transform duration-300">
                      <span className="text-[11px] font-extrabold text-slate-700">
                        Pending : 18
                      </span>
                      <Activity size={12} className="text-blue-500 mt-1" />
                    </div>
                  </div>
                </div>
                {/* Legend Table Style */}
                <div className="flex flex-col gap-4 w-32 border-l border-slate-50 pl-6 pr-2">
                  {billingData.statusBreakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between group/legend cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-sm"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-[11px] font-extrabold text-slate-400 group-hover/legend:text-slate-800 transition-colors uppercase tracking-tight">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-[11px] font-extrabold text-slate-800 tabular-nums">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </BillingCard>
          </div>
        </div>

        {/* Footer App Version */}
        <div className="text-center pb-8 pt-4 opacity-40">
          <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">
            OASIS NOTES Inc. • v1.0.8
          </p>
        </div>
        {/* Claim Workspace Modal */}
        <ClaimWorkspaceModal
          isOpen={isClaimModalOpen}
          onClose={() => setIsClaimModalOpen(false)}
          claimId={selectedClaimId}
        />
      </div>
    </main>
  );
};

export default BillingDashboard;
