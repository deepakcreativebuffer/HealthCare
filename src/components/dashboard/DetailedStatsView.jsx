import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../common/ActionButton";
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  ChevronRight,
  Users,
  UserCheck,
  CalendarClock,
  Stethoscope,
  CalendarDays,
  FileText,
  Loader2,
  Target,
  ActivityIcon,
  Bell,
  Eye,
  Pencil,
  Trash2,
  Plus
} from "lucide-react";
import { api } from "../../data/api";
import AdmitResidentModal from "./AdmitResidentModal";

const iconMap = {
  "Total Residents": Users,
  "Total Employees": UserCheck,
  "Pending PTO": CalendarClock,
  "Sick Time": Stethoscope,
  "Total Appointments ": CalendarDays,
  "Total Appointments": CalendarDays,
  "Claims Pending": FileText,
  "Active Resident Records": Users,
  "Active Employee Records": UserCheck,
  "Staff Schedule": CalendarClock,
  "Main Stats List": Target,
  "Activity Log": ActivityIcon,
  "Special Notes": Bell,
};

const DetailedStatsView = ({ title, onBack }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdmitModalOpen, setIsAdmitModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isRangeOpen, setIsRangeOpen] = useState(false);
  const Icon = iconMap[title] || Users;
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    let result = [];
    const { mockData } = await import("../../data/mockData");

    switch (title) {
      case "Total Residents":
      case "Active Resident Records":
        result = await api.getResidents();
        if (title === "Active Resident Records") {
          result = result.filter((r) => r.status === "Active");
        }
        break;
      case "Total Employees":
      case "Active Employee Records":
        result = await api.getStaff();
        if (title === "Active Employee Records") {
          result = result.filter((r) => r.status === "Active");
        }
        break;
      case "Pending PTO":
        result = await api.getPTO();
        break;
      case "Sick Time":
        result = await api.getSickLeave();
        break;
      case "Appointments Today":
      case "Total Appointments":
        result = await api.getAppointments();
        break;
      case "Staff Schedule":
        result = mockData.staffShifts.map((s) => ({
          ...s,
          name: s.staffName,
          status: s.shiftType,
        }));
        break;
      case "Main Stats List":
        result = mockData.mainStats.map((s) => ({
          id: `STAT-${Math.floor(Math.random() * 1000)}`,
          name: s.label,
          value: s.value,
          status: "Active",
          color: s.color,
        }));
        break;
      case "Claims Pending":
        const billing = await api.getBillingData();
        result = billing.recentClaims.filter(
          (c) => c.status === "Pending" || c.status === "Submitted",
        );
        break;
      case "Activity Log":
        result = await api.getActivity();
        console.log("result", result);
        result = result.map((l, i) => ({
          id: `ACT-${i + 1}`,
          name: l.action || l.message || "Manual Update",
          status: l.status || "Completed",
          userName: l.userName || l.user || "Admin",
          time: l.time || "Recently",
          statusColor: l.statusColor || "blue",
        }));
        break;
      case "Special Notes":
        result = mockData.specialNotes.map((n, i) => ({
          id: `NOTE-${i + 1}`,
          name: n.note,
          status: n.category,
          category: n.category,
          time: n.time,
          date: n.date,
          color: n.color,
        }));
        break;
      default:
        result = [];
    }
    setData(result);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [title]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this resident?")) {
      const response = await api.deleteResident(id);
      if (response.success) {
        fetchData();
      }
    }
  };

  const filteredData = data.filter((item) => {
    const searchStr = searchTerm.toLowerCase();
    const matchesSearch =
      (item.name && item.name.toLowerCase().includes(searchStr)) ||
      (item.residentName &&
        item.residentName.toLowerCase().includes(searchStr)) ||
      (item.staffName && item.staffName.toLowerCase().includes(searchStr)) ||
      (item.id && item.id.toLowerCase().includes(searchStr));

    if (activeFilter === "Inactive")
      return (
        matchesSearch &&
        (item.status === "Inactive" || item.status === "Discharged")
      );

    const matchesFilter =
      activeFilter === "All" ||
      item.role === activeFilter ||
      item.department === activeFilter ||
      item.date === activeFilter;

    if (!matchesFilter) return false;

    if (title.includes("Appointment") && (startDate || endDate)) {
      const itemDate = new Date(item.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && itemDate < start) return false;
      if (end && itemDate > end) return false;
    }

    return matchesSearch;
  });

  const handleExport = () => {
    if (filteredData.length === 0) return;

    const headers = Object.keys(filteredData[0]).join(",");
    const rows = filteredData
      .map((item) =>
        Object.values(item)
          .map((val) => `"${val}"`)
          .join(","),
      )
      .join("\n");

    const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${title.replace(/\s+/g, "_")}_Export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFilterOptions = () => {
    const options = ["All", "Active", "Inactive"];
    if (title.includes("Employee")) {
      const roles = [...new Set(data.map((item) => item.role).filter(Boolean))];
      options.push(...roles);
    }
    if (title.includes("Appointment")) {
      const dates = [...new Set(data.map((item) => item.date).filter(Boolean))];
      options.push(...dates);
    }
    return options;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all shadow-sm group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Icon size={16} className="text-blue-600" />
              <h1 className="text-xl font-bold text-slate-900">{title}</h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {title !== "Pending PTO" && (
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full md:w-64 transition-all"
              />
            </div>
          )}
          {title !== "Total Residents" &&
            title !== "Active Resident Records" &&
            title !== "Pending PTO" &&
            title !== "Claims Pending" &&
            title !== "Staff Schedule" &&
            title !== "Special Notes" && (
              <div className="flex items-center gap-2">
                {(title.includes("Appointment") ||
                  title.includes("Activity")) && (
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm">
                      <span className="text-[10px] font-black text-slate-400 uppercase  whitespace-nowrap">
                        Range:
                      </span>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="text-xs font-bold text-slate-600 focus:outline-none focus:text-blue-600 bg-transparent"
                      />
                      <span className="text-slate-300">-</span>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="text-xs font-bold text-slate-600 focus:outline-none focus:text-blue-600 bg-transparent"
                      />
                      {(startDate || endDate) && (
                        <button
                          onClick={() => {
                            setStartDate("");
                            setEndDate("");
                          }}
                          className="text-[10px] font-bold text-blue-600 hover:text-blue-700 ml-1"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  )}

                <div className="relative">
                  <button
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    className={`p-2.5 rounded-lg border transition-all shadow-sm ${showFilterMenu ? "bg-blue-50 border-blue-200 text-blue-600" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"}`}
                  >
                    <Filter size={20} />
                  </button>

                  {showFilterMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      <p className="px-4 py-1.5 text-[10px] font-black text-slate-400 uppercase ">
                        Filter By
                      </p>
                      {getFilterOptions().map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setActiveFilter(option);
                            setShowFilterMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm font-bold transition-colors ${activeFilter === option ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:bg-slate-50"}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

          {title === "Total Residents" && (
            <button
              onClick={() => setIsAdmitModalOpen(true)}
              className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add Resident</span>
            </button>
          )}

          {title !== "Total Residents" &&
            title !== "Active Resident Records" &&
            title !== "Pending PTO" &&
            title !== "Total Appointments" &&
            title !== "Claims Pending" &&
            title !== "Staff Schedule" &&
            title !== "Special Notes" &&
            title !== "Activity Log" && (
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Export</span>
              </button>
            )}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-[12px] border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
            <p className="text-slate-500 font-bold uppercase  text-[10px]">
              Loading records...
            </p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center px-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
              <Icon size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              No records found
            </h3>
            <p className="text-slate-500 mt-1 max-w-xs">
              We couldn't find any data matching your criteria.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  {title === "Special Notes" && (
                    <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase ">
                      Status
                    </th>
                  )}
                  {title === "Activity Log" && (
                    <>
                      <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase ">
                        Activity
                      </th>
                      <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase  text-center">
                        Status
                      </th>
                      <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase ">
                        Action By
                      </th>
                      <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase  text-right">
                        Time
                      </th>
                    </>
                  )}
                  {title !== "Activity Log" && (
                    <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase ">
                      Name
                    </th>
                  )}
                  {title === "Special Notes" && (
                    <>
                      <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase ">
                        Note Content
                      </th>
                      <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase ">
                        Update Date
                      </th>
                    </>
                  )}
                  {title === "Staff Schedule" && (
                    <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase ">
                      Shift Details
                    </th>
                  )}
                  {title === "Total Appointments" && (
                    <>
                      <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase ">
                        Contact Number
                      </th>
                      <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase ">
                        Reason for Visit
                      </th>
                      <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase ">
                        Date
                      </th>
                    </>
                  )}
                  {(title.includes("Resident") ||
                    title.includes("Employee")) && (
                      <>
                        <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase ">
                          Email
                        </th>
                        <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase ">
                          Phone Number
                        </th>
                      </>
                    )}
                  {title === "Total Employees" && (
                    <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase ">
                      Role
                    </th>
                  )}
                  {(title === "Pending PTO" || title === "Sick Time") && (
                    <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase ">
                      Dates
                    </th>
                  )}
                  {title === "Appointments Today" && (
                    <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase ">
                      Time
                    </th>
                  )}
                  {title === "Claims Pending" && (
                    <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase ">
                      Amount
                    </th>
                  )}
                  {title !== "Total Appointments" &&
                    title !== "Staff Schedule" &&
                    title !== "Activity Log" && (
                      <>
                        {title !== "Special Notes" && (
                          <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase  text-center">
                            Status
                          </th>
                        )}
                        <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase  text-right">
                          Actions
                        </th>
                      </>
                    )}
                  {title === "Staff Schedule" && (
                    <th className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase  text-center">
                      Shift Type
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((item, idx) => (
                  <tr
                    key={item.id || idx}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    {title === "Special Notes" && (
                      <td className="px-3 py-2">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase  italic border ${item.color === "red"
                            ? "bg-red-50 text-red-600 border-red-100"
                            : item.color === "orange"
                              ? "bg-amber-50 text-amber-600 border-amber-100"
                              : "bg-teal-50 text-teal-600 border-teal-100"
                            }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    )}
                    {title !== "Activity Log" && (
                      <td className="px-2 py-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-[11px] select-none shrink-0">
                            {(item.name || item.patient || "U")[0]}
                          </div>
                          <div>
                            <p className="text-[12px] font-bold text-slate-800">
                              {title === "Special Notes"
                                ? item.patient
                                : item.name ||
                                item.residentName ||
                                item.staffName ||
                                item.userName}
                            </p>
                          </div>
                        </div>
                      </td>
                    )}

                    {title === "Activity Log" && (
                      <>
                        <td className="px-3 py-2">
                          <p className="text-[12px] font-bold text-slate-800">
                            {item.name}
                          </p>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase  border transition-all ${item.statusColor === "emerald"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                              : item.statusColor === "blue"
                                ? "bg-blue-50 text-blue-600 border-blue-100"
                                : item.statusColor === "sky"
                                  ? "bg-sky-50 text-sky-600 border-sky-100"
                                  : item.statusColor === "red"
                                    ? "bg-red-50 text-red-600 border-red-100"
                                    : "bg-amber-50 text-amber-600 border-amber-100"
                              }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                              {item.userName?.[0]}
                            </div>
                            <p className="text-[12px] font-bold text-slate-600">
                              {item.userName}
                            </p>
                          </div>
                        </td>
                        <td className="px-3 py-2 text-right">
                          <p className="text-[12px] font-black text-slate-400 uppercase ">
                            {item.time}
                          </p>
                        </td>
                      </>
                    )}

                    {title === "Special Notes" && (
                      <>
                        <td className="px-3 py-2">
                          <p className="text-[12px] font-bold text-slate-600 line-clamp-1">
                            {item.name}
                          </p>
                        </td>
                        <td className="px-3 py-2">
                          <div className="space-y-0.5">
                            <p className="text-[12px] font-black text-slate-600 uppercase  leading-none italic">
                              {item.date}
                            </p>
                            <p className="text-[10px] font-bold text-blue-600 tracking-wider bg-blue-50/50 px-2 py-0.5 rounded w-fit">
                              {item.time}
                            </p>
                          </div>
                        </td>
                      </>
                    )}

                    {title === "Staff Schedule" && (
                      <td className="px-3 py-2">
                        <div className="space-y-0.5">
                          <p className="text-[12px] font-black text-slate-700 uppercase italic leading-none">
                            {item.day}, {item.date}
                          </p>
                          <p className="text-[10px] font-bold text-blue-600 tracking-wider bg-blue-50/50 px-2.5 py-1 rounded w-fit">
                            {item.time}
                          </p>
                        </div>
                      </td>
                    )}

                    {title === "Total Appointments" && (
                      <>
                        <td className="px-3 py-2 text-[12px] font-medium text-slate-500">
                          {item.phone || "N/A"}
                        </td>
                        <td className="px-3 py-2 text-[12px] font-bold text-slate-600">
                          {item.reason || item.type}
                        </td>
                        <td className="px-3 py-2 text-[12px] font-medium text-blue-600 font-bold">
                          {item.date}
                        </td>
                      </>
                    )}

                    {(title.includes("Resident") ||
                      title.includes("Employee")) && (
                        <>
                          <td className="px-3 py-2 text-[12px] font-medium text-slate-500">
                            {item.email || item.contact || "N/A"}
                          </td>
                          <td className="px-3 py-2 text-[12px] font-medium text-slate-500">
                            {item.phone || "N/A"}
                          </td>
                        </>
                      )}

                    {title === "Total Employees" && (
                      <td className="px-3 py-2">
                        <span className="text-[12px] font-bold text-slate-600">
                          {item.role || "Employee"}
                        </span>
                      </td>
                    )}
                    {(title === "Pending PTO" || title === "Sick Time") && (
                      <td className="px-3 py-2 text-[12px] font-bold text-slate-600">
                        {item.startDate
                          ? `${item.startDate} to ${item.endDate}`
                          : item.date}
                      </td>
                    )}
                    {title === "Appointments Today" && (
                      <td className="px-3 py-2 text-[12px] font-bold text-slate-600">
                        {item.time}
                      </td>
                    )}
                    {title === "Claims Pending" && (
                      <td className="px-3 py-2 text-[12px] font-bold text-slate-800">
                        {item.amount}
                      </td>
                    )}

                    {title !== "Total Appointments" &&
                      title !== "Staff Schedule" &&
                      title !== "Special Notes" &&
                      title !== "Activity Log" && (
                        <td className="px-3 py-2 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${item.status === "Active" ||
                              item.status === "Approved" ||
                              item.status === "Scheduled"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                              : item.status === "Pending" ||
                                item.status === "In-Progress"
                                ? "bg-amber-50 text-amber-600 border-amber-100"
                                : "bg-slate-50 text-slate-600 border-slate-100"
                              }`}
                          >
                            {item.status &&
                              (item.status === "Active" ||
                                item.status === "Approved" ||
                                item.status === "Scheduled")
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </td>
                      )}
                    {title === "Staff Schedule" && (
                      <td className="px-3 py-2 text-center">
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-full text-[10px] font-black uppercase  italic">
                          {item.status}
                        </span>
                      </td>
                    )}
                    {title !== "Total Appointments" &&
                      title !== "Staff Schedule" &&
                      title !== "Activity Log" && (
                        title.includes("Resident") ? (
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <ActionButton
                                icon={Eye}
                                onClick={() => navigate(`/residents/${item.id}`)}
                              />
                              <ActionButton
                                icon={Pencil}
                                onClick={() => setSelectedDetail(item)}
                                color="amber"
                              />
                              <ActionButton
                                icon={Trash2}
                                onClick={() => handleDelete(item.id)}
                                color="red"
                              />
                            </div>
                          </td>
                        ) : (
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => setSelectedDetail(item)}
                              className="p-2 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100"
                            >
                              <ChevronRight size={18} />
                            </button>
                          </td>
                        )
                      )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail View Panel */}
      {selectedDetail && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            className="w-full max-w-md h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 p-8 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight italic">
                Record Details
              </h2>
              <button
                onClick={() => setSelectedDetail(null)}
                className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
              >
                <ChevronRight size={24} className="rotate-180" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              <div className="flex flex-col items-center text-center pb-4 border-b border-slate-100">
                <div className="w-16 h-16 rounded-[20px] bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-black mb-3 shadow-inner">
                  {(selectedDetail.name || "U")[0]}
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tighter uppercase italic">
                  {selectedDetail.name ||
                    selectedDetail.residentName ||
                    selectedDetail.staffName}
                </h3>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                  {selectedDetail.role ||
                    (title.includes("Resident") ? "Resident" : "Staff Member")}
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  {title !== "Special Notes" && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase  mb-1">
                        Status
                      </p>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${selectedDetail.status === "Active" ||
                          selectedDetail.status === "Approved"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-amber-50 text-amber-600 border-amber-100"
                          }`}
                      >
                        {selectedDetail.status === "Active"
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-2xl bg-slate-50 border border-slate-100 ${title === "Special Notes" ? "col-span-2" : ""}`}
                  >
                    <p className="text-[10px] font-black text-slate-400 uppercase  mb-1">
                      Record ID
                    </p>
                    <p className="text-sm font-bold text-slate-800 font-mono tracking-tighter">
                      {selectedDetail.id}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-blue-100 transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-all">
                        <Users size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase  leading-none">
                          Email Address
                        </p>
                        <p className="text-sm font-bold text-slate-800 mt-1">
                          {selectedDetail.email ||
                            selectedDetail.contact ||
                            "info@care.com"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-blue-100 transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-all">
                        <Target size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase  leading-none">
                          Phone Number
                        </p>
                        <p className="text-sm font-bold text-slate-800 mt-1">
                          {selectedDetail.phone || "555-0012-334"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedDetail.department && (
                  <div className="p-4 rounded-2xl bg-[#E3F2FD] border border-[#129FED]/10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-[#129FED]/60 uppercase  leading-none mb-1">
                        Department
                      </p>
                      <p className="text-sm font-black text-[#129FED] uppercase italic">
                        {selectedDetail.department}
                      </p>
                    </div>
                    <UserCheck size={24} className="text-[#129FED]/40" />
                  </div>
                )}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 pb-2 space-y-3">
              {title === "Pending PTO" && (
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <button
                    onClick={() => {
                      const updatedData = data.map((item) =>
                        item.id === selectedDetail.id
                          ? { ...item, status: "Approved" }
                          : item,
                      );
                      setData(updatedData);
                      setSelectedDetail(null);
                    }}
                    className="py-3 bg-emerald-600 text-white font-black rounded-xl  uppercase text-[10px] hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      const updatedData = data.map((item) =>
                        item.id === selectedDetail.id
                          ? { ...item, status: "Rejected" }
                          : item,
                      );
                      setData(updatedData);
                      setSelectedDetail(null);
                    }}
                    className="py-3 bg-red-600 text-white font-black rounded-xl  uppercase text-[10px] hover:bg-red-700 transition-all shadow-lg shadow-red-100"
                  >
                    Reject
                  </button>
                </div>
              )}
              <button
                onClick={() => setSelectedDetail(null)}
                className="w-full py-2 bg-slate-800 text-white font-black rounded-2xl tracking-[0.2em] uppercase text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-slate-100 active:scale-95"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Registration Modal */}
      <AdmitResidentModal
        isOpen={isAdmitModalOpen}
        onClose={() => setIsAdmitModalOpen(false)}
        onResidentAdmitted={() => {
          setIsAdmitModalOpen(false);
          fetchData();
        }}
      />
    </div>
  );
};

export default DetailedStatsView;
