import React, { useState, useEffect, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  Shield,
  Stethoscope,
  MapPin,
  Heart,
  Fingerprint,
  AlertCircle,
  Clipboard,
  ChevronRight,
  ChevronDown,
  Pill,
  Clock,
  Activity,
  DollarSign,
  AlertTriangle,
  FileText,
  Search,
  FlaskConical,
  Printer,
  Edit,
  MoreVertical,
} from "lucide-react";
import { api } from "../../data/api";
import Navbar from "../layout/Navbar";
import SubNav from "../layout/SubNav";

const ResidentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resident, setResident] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResident = async () => {
      setIsLoading(true);
      try {
        const data = await api.getResidentData(id);
        setResident(data);
      } catch (error) {
        console.error("Error fetching resident data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResident();
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-2.5">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            Loading patient profile...
          </p>
        </div>
      </div>
    );
  }

  if (!resident) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">Resident Not Found</h2>
          <button
            onClick={() => navigate("/admin")}
            className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-sans">
      <header className="shrink-0 z-50 bg-white shadow-sm">
        <Navbar activeTab="Dashboard" onTabChange={() => navigate("/admin")} />
        <SubNav />
      </header>

      <main className="flex-1 overflow-y-auto p-2 lg:p-2 space-y-1.5">
        {/* Back Button */}
        <div className="flex items-center gap-2 mb-1">
          <button
            onClick={() => navigate("/admin")}
            className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-blue-600 transition-all shadow-sm group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Back to Resident List
          </span>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-2 md:p-3 flex flex-col md:flex-row gap-2 md:gap-3">
            {/* Profile Sidebar */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-xl bg-slate-100 flex items-center justify-center border-4 border-white shadow-md overflow-hidden ring-1 ring-slate-100">
                {resident.image ? (
                  <img src={resident.image} alt={resident.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={64} className="text-slate-300" />
                )}
              </div>
              <div className="mt-2 flex flex-col items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold hover:bg-blue-100 transition-colors">
                  <Edit size={14} />
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-2.5">
                <div>
                  <h1 className="text-2xl font-black text-slate-800 tracking-tight  uppercase">
                    {resident.name}
                  </h1>
                  <div className="flex items-center gap-2.5 mt-1">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Fingerprint size={14} />
                      <span className="text-xs font-bold uppercase tracking-wider">Patient ID: <span className="text-slate-800">{resident.id || '123456'}</span></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Calendar size={14} />
                      <span className="text-xs font-bold uppercase tracking-wider">DOB: <span className="text-slate-800">03/15/1970 (Age: 51)</span></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <User size={14} />
                      <span className="text-xs font-bold uppercase tracking-wider">Gender: <span className="text-slate-800">Male</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-1.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-[11px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm">
                    <Heart size={14} className="fill-blue-600" />
                    Active
                  </span>
                  <span className="px-4 py-1.5 bg-amber-50 text-amber-600 border border-amber-100 rounded-full text-[11px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm">
                    <AlertCircle size={14} className="fill-amber-600" />
                    Plan G
                  </span>
                  <span className="px-4 py-1.5 bg-teal-50 text-teal-600 border border-teal-100 rounded-full text-[11px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm">
                    <Heart size={14} className="fill-teal-600" />
                    Decased
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-4 pt-4 border-t border-slate-100">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shadow-sm border border-blue-100">
                      <Shield size={14} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Insurance</p>
                      <p className="text-[12px] font-bold text-blue-600 underline underline-offset-4 decoration-2">BlueCross BlueShield</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-red-600">
                    <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center shadow-sm border border-red-100">
                      <AlertCircle size={14} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest leading-none mb-1 opacity-70">Allergy</p>
                      <p className="text-[13px] font-black ">Penicilin <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded ml-1">Red</span></p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shadow-sm border border-teal-100">
                      <User size={14} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Provider</p>
                      <p className="text-[12px] font-bold text-slate-700 underline underline-offset-4 decoration-slate-200 decoration-2 cursor-pointer hover:text-blue-600 transition-colors">Emily Roberts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shadow-sm border border-slate-200">
                      <Clipboard size={14} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Condition</p>
                      <p className="text-[12px] font-bold text-blue-600">Diabetes, Hypertension</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shadow-sm border border-slate-200">
                      <User size={14} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Gender</p>
                      <p className="text-[12px] font-bold text-slate-700">Male</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shadow-sm border border-slate-200">
                      <MapPin size={14} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Address</p>
                      <p className="text-[11px] font-bold text-slate-700">123 Main St. Springfield, IL</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shadow-sm border border-blue-100">
                      <Phone size={14} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Phone</p>
                      <p className="text-[12px] font-bold text-slate-700">(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shadow-sm border border-slate-200">
                      <Heart size={14} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Emergency Contact</p>
                      <p className="text-[11px] font-bold text-slate-700">Mary Smith <span className="text-blue-600 underline font-mono">(555-987-6543)</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-rose-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-rose-100 group-hover:scale-110 transition-transform">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-xl font-black leading-none text-slate-800">4</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Active Problems</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-blue-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-100 group-hover:scale-110 transition-transform">
              <Pill size={20} />
            </div>
            <div>
              <p className="text-xl font-black leading-none text-slate-800">3</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Medications</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-emerald-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-100 group-hover:scale-110 transition-transform">
              <Calendar size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] font-black leading-tight uppercase tracking-widest text-slate-400">Next Appt</p>
              <p className="text-[11px] font-bold text-slate-700 truncate">12/10/2022</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-amber-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-amber-100 group-hover:scale-110 transition-transform">
              <AlertTriangle size={18} />
            </div>
            <div>
              <p className="text-[11px] font-black leading-tight uppercase tracking-widest text-slate-400">Fall Risk</p>
              <p className="text-[12px] font-black text-amber-600">High Risk</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-indigo-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-indigo-100 group-hover:scale-110 transition-transform">
              <Clock size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] font-black leading-tight uppercase tracking-widest text-slate-400">Last Visit:</p>
              <p className="text-[11px] font-bold text-slate-700 truncate">11/20/2022</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-teal-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-teal-100 group-hover:scale-110 transition-transform">
              <Activity size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] font-black leading-tight uppercase tracking-widest text-slate-400">Latest Vitals:</p>
              <p className="text-[11px] font-bold text-slate-700 truncate">BP: 120/80</p>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5">

          {/* Left Sidebar */}
          <div className="lg:col-span-2 space-y-2">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden pb-2">
              <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest ">Recent Visits</h3>
                <MoreVertical size={14} className="text-slate-400" />
              </div>
              <div className="px-2 py-1 space-y-0.5">
                {[
                  { label: 'Recent Visits', count: 35, icon: Clock, color: 'text-teal-500 bg-teal-50' },
                  { label: 'Diagnosis', count: 20, icon: AlertCircle, color: 'text-red-500 bg-red-50' },
                  { label: 'Medications', count: 18, icon: Pill, color: 'text-emerald-500 bg-emerald-50' },
                  { label: 'Medications', count: 45, icon: Pill, color: 'text-red-500 bg-red-50' },
                  { label: 'Lab Results', count: 10, icon: FlaskConical, color: 'text-amber-500 bg-amber-50' },
                ].map((item, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${item.color}`}>
                        <item.icon size={14} />
                      </div>
                      <span className="text-[11px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors">{item.label}</span>
                    </div>
                    <span className="text-[11px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">{item.count} Day</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest ">Diagnosis</h3>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
              <div className="p-2.5 space-y-2">
                <div className="flex items-center gap-3">
                  <Heart size={14} className="text-red-500" />
                  <div>
                    <p className="text-[11px] font-bold text-slate-700">Penicilin</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">12/10/2022</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Activity size={14} className="text-emerald-500" />
                  <div>
                    <p className="text-[11px] font-bold text-slate-700">Diabetes</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">10/15/2018</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest  text-blue-600">Lab Results</h3>
                <ChevronDown size={14} className="text-blue-500" />
              </div>
              <div className="p-2.5 space-y-1.5">
                <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <p className="text-[11px] font-bold text-slate-700 transition-colors group-hover:text-blue-600">Cholesterol</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-black text-slate-400 ">210 mg/dl</span>
                    <ChevronRight size={14} className="text-slate-300" />
                  </div>
                </div>
                <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <p className="text-[11px] font-bold text-slate-700 transition-colors group-hover:text-blue-600">Blood Glucose</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-black text-slate-400 ">110 mg/dl</span>
                    <ChevronRight size={14} className="text-slate-300" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-tight ">Documents</h3>
                <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                </div>
              </div>
              <div className="p-2 space-y-0.5">
                <div className="flex items-center justify-between p-2 bg-blue-50/30 rounded-xl border border-transparent hover:border-blue-100 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <FileText size={14} className="text-blue-500" />
                    <span className="text-[11px] font-bold text-slate-700 group-hover:text-blue-600">ID Proof</span>
                  </div>
                  <span className="text-[11px] font-black text-slate-400 ">No Files</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl border border-transparent hover:border-blue-100 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <Shield size={14} className="text-emerald-500" />
                    <span className="text-[11px] font-bold text-slate-700 group-hover:text-blue-600">Insurance Card</span>
                  </div>
                  <span className="text-[11px] font-black text-emerald-500 bg-emerald-50 px-2 rounded font-bold ">Defined</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl border border-transparent hover:border-blue-100 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <FlaskConical size={14} className="text-blue-500" />
                    <span className="text-[11px] font-bold text-slate-700 group-hover:text-blue-600">Lab Reports</span>
                  </div>
                  <div className="flex gap-1">
                    <span className="text-[9px] font-bold text-slate-400 border border-slate-200 px-1 rounded">Switch</span>
                    <span className="text-[9px] font-bold text-slate-400 border border-slate-200 px-1 rounded">Update</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl border border-transparent hover:border-blue-100 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <Mail size={14} className="text-blue-500" />
                    <span className="text-[11px] font-bold text-slate-700 group-hover:text-blue-600">RP Scrip</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-slate-400 uppercase ">Renewal</span>
                    <span className="text-[11px] font-black text-slate-800 bg-slate-100 px-2 rounded">45.03</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Discharge Summary */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest ">Discharge Summary</h3>
                <Clipboard size={14} className="text-slate-400" />
              </div>
              <div className="p-2.5 space-y-2">
                <div className="flex items-center gap-2 mb-1.5 pb-1.5 border-b border-slate-50">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status:</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Stable / Discharged</span>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Primary instruction</p>
                  <p className="text-[11px] font-bold text-slate-700 leading-tight">Patient advised to maintain light activity. Specialist follow-up required within 2 weeks.</p>
                </div>
                <div className="pt-1">
                  <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2 py-1.5 rounded border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors w-fit">
                    <FileText size={12} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Download PDF</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-7 space-y-2">

            {/* Visit Details Section */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-2">
              <div className="p-2 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-tight">Visit Details</h3>
              </div>
              <div className="p-2 md:p-3">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400 shrink-0" />
                      <div className="flex w-full border-b border-slate-100 pb-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-24">Date:</span>
                        <span className="text-[12px] font-bold text-slate-700">11/20/2022</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-slate-400 shrink-0" />
                      <div className="flex w-full border-b border-slate-100 pb-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-24">Provider:</span>
                        <span className="text-[12px] font-bold text-blue-600 underline underline-offset-2 decoration-blue-100 decoration-2">Dr. Emily Roberts</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity size={14} className="text-slate-400 shrink-0" />
                      <div className="flex w-full border-b border-slate-100 pb-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-24 whitespace-nowrap">Chief Complaint:</span>
                        <span className="text-[12px] font-bold text-slate-700 ">Chest Pain</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart size={14} className="text-red-500 shrink-0" />
                      <div className="flex w-full border-b border-slate-100 pb-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-24">Diagnosis:</span>
                        <span className="text-[12px] font-bold text-slate-700 ">I20.9 - Angina Pectoris</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clipboard size={14} className="text-slate-400 shrink-0" />
                      <div className="flex w-full border-b border-slate-100 pb-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-24">Procedure:</span>
                        <span className="text-[12px] font-bold text-slate-700 ">93000 - ECG</span>
                      </div>
                    </div>
                  </div>

                  {/* Inserted Vitals Column */}
                  <div className="flex flex-col space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Vitals</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex flex-col items-center">
                        <span className="text-[9px] font-bold text-slate-400 uppercase">BP</span>
                        <span className="text-[12px] font-black text-slate-700">120/80</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex flex-col items-center">
                        <span className="text-[9px] font-bold text-slate-400 uppercase">HR</span>
                        <span className="text-[12px] font-black text-slate-700">72</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex flex-col items-center">
                        <span className="text-[9px] font-bold text-slate-400 uppercase">Temp</span>
                        <span className="text-[12px] font-black text-slate-700">98.6°F</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex flex-col items-center">
                        <span className="text-[9px] font-bold text-slate-400 uppercase">O2</span>
                        <span className="text-[12px] font-black text-slate-700">98%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg relative overflow-hidden">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Type: <span className="text-slate-700 font-bold uppercase">OFFICE VISIT</span></p>
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        </div>
                      </div>

                      {/* Simulated ECG SVG */}
                      <div className="h-16 w-full mt-1 border-l border-b border-slate-200 relative bg-white/50 rounded p-1">
                        <svg viewBox="0 0 400 100" className="w-full h-full text-slate-800" preserveAspectRatio="none">
                          <path d="M0 50 L10 50 L15 40 L20 60 L25 50 L80 50 L85 10 L95 90 L105 50 L160 50 L165 40 L170 60 L175 50 L230 50 L235 15 L245 85 L255 50 L310 50 L315 42 L320 58 L325 50 L400 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          {/* Grid lines */}
                          <g className="text-slate-200">
                            <line x1="0" y1="20" x2="400" y2="20" stroke="currentColor" strokeWidth="0.5" />
                            <line x1="0" y1="40" x2="400" y2="40" stroke="currentColor" strokeWidth="0.5" />
                            <line x1="0" y1="60" x2="400" y2="60" stroke="currentColor" strokeWidth="0.5" />
                            <line x1="0" y1="80" x2="400" y2="80" stroke="currentColor" strokeWidth="0.5" />
                            {[...Array(20)].map((_, i) => (
                              <line key={i} x1={i * 20} y1="0" x2={i * 20} y2="100" stroke="currentColor" strokeWidth="0.5" />
                            ))}
                          </g>
                        </svg>
                        <div className="absolute top-1 right-1 flex gap-0.5">
                          <div className="w-2 h-2 border border-slate-300 rounded-[2px]" />
                          <div className="w-2 h-2 border border-slate-300 rounded-[2px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-tight mb-1">HISTORY OF PRESENT ILLNESS</h4>
                      <p className="text-[11px] font-bold text-slate-600 leading-tight max-w-none">
                        55-year-old male with independent chest, fast pain for the past 3 days, described as pressure-like, radiating to left arm, associated with mild shortness of breath, ECG shows changes.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-tight mb-1">REVIEW OF SYSTEMS</h4>
                      <p className="text-[11px] font-bold text-slate-600 leading-tight max-w-none">
                        Cardiovascular positive for chest pain and mild shortness of breath.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-tight mb-1">PATIENT GOAL</h4>
                      <p className="text-[11px] font-bold text-slate-600 leading-tight">Feel as good as I can as long as I can</p>
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors w-fit">
                        <Activity size={12} />
                        <span className="text-[9px] font-black uppercase tracking-widest">ECG Report</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-50 text-slate-600 px-2 py-1 rounded border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors mt-2 w-fit">
                        <FileText size={12} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Documents</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-tight mb-1">SURGICAL HISTORY</h4>
                      <p className="text-[11px] font-bold text-slate-400 italic leading-tight">No surgical procedures recorded.</p>
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center gap-1.5 bg-slate-50 text-slate-600 px-2 py-1 rounded border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors w-fit">
                        <span className="text-[9px] font-black uppercase tracking-widest">More Details</span>
                        <ChevronRight size={12} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Split Row for Medical History & Billing Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {/* Medical History */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3">
                <h3 className="text-[12px] font-bold text-[#0f5b78] mb-2">Medical History (MD Note)</h3>
                <ul className="text-[12px] text-slate-600 space-y-1">
                  <li className="flex gap-1.5"><span className="text-slate-400">&bull;</span><span>Unspecified atrial fibrillation</span></li>
                  <li className="flex gap-1.5 items-start"><span className="text-slate-400">&bull;</span><span>Atherosclerotic heart disease of native coronary artery without angina pectoris <span className="italic text-slate-400">(abnormal SE 6/2021, possibly due to underlying cardiomyopathy)</span></span></li>
                  <li className="flex gap-1.5"><span className="text-slate-400">&bull;</span><span>Occlusion and stenosis of unspecified carotid artery</span></li>
                  <li className="flex gap-1.5 items-start"><span className="text-slate-400">&bull;</span><span>Left ventricular failure, unspecified <span className="italic text-slate-400">(Fluctuating EF - possibly due to asymptomatic AF)</span></span></li>
                  <li className="flex gap-1.5"><span className="text-slate-400">&bull;</span><span>Hyperlipidemia, unspecified</span></li>
                  <li className="flex gap-1.5"><span className="text-slate-400">&bull;</span><span>Essential (primary) hypertension</span></li>
                  <li className="flex gap-1.5"><span className="text-slate-400">&bull;</span><span>Prediabetes</span></li>
                </ul>
              </div>

              {/* Billing Summary Section */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-2.5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-tight ">Billing Summary</h3>
                  <button className="text-blue-600 text-[11px] font-black uppercase tracking-widest hover:underline">View All Records</button>
                </div>
                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="pb-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest ">Date</th>
                        <th className="pb-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest ">Invoice #</th>
                        <th className="pb-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest ">Amount</th>
                        <th className="pb-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest  text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {[
                        { date: '11/20/2022', invoice: 'INV-98765', amount: '$300.00', status: 'Pending', color: 'text-amber-500 bg-amber-50 border-amber-100' },
                        { date: '11/15/2022', invoice: 'INV-98764', amount: '$150.00', status: 'Paid', color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
                        { date: '11/10/2022', invoice: 'INV-98763', amount: '$200.00', status: 'Paid', color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
                      ].map((bill, i) => (
                        <tr key={i} className="group hover:bg-slate-50/50 transition-all">
                          <td className="py-1.5 text-[10px] font-bold text-slate-600">{bill.date}</td>
                          <td className="py-1.5 text-[10px] font-black text-blue-600  cursor-pointer hover:underline">{bill.invoice}</td>
                          <td className="py-1.5 text-[10px] font-black text-slate-800 ">{bill.amount}</td>
                          <td className="py-1.5 text-right">
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${bill.color}`}>
                              {bill.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-2 p-2 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Outstanding Balance:</p>
                    <p className="text-[13px] font-black text-red-600 ">$350.00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Split Row for Care Plan & Social History */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2.5">
              {/* Care Plan & Goals */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3">
                <h3 className="text-[12px] font-bold text-[#0f5b78] mb-2">Care Plan & Interventions</h3>
                <div className="space-y-2">
                  <div className="p-2 border border-blue-100 bg-blue-50/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity size={14} className="text-blue-500" />
                      <span className="text-[11px] font-bold text-slate-700">Cardiac Output Management</span>
                    </div>
                    <p className="text-[10px] text-slate-600 pl-6">Monitor weight daily. Report weight gain &gt; 2 lbs/day or 5 lbs/wk. Restrict sodium to 2g/day.</p>
                  </div>
                  <div className="p-2 border border-emerald-100 bg-emerald-50/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Heart size={14} className="text-emerald-500" />
                      <span className="text-[11px] font-bold text-slate-700">Activity Tolerance</span>
                    </div>
                    <p className="text-[10px] text-slate-600 pl-6">Encourage progressive ambulation. Refer to cardiac rehab phase II program.</p>
                  </div>
                </div>
              </div>

              {/* Social History */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 flex flex-col">
                <h3 className="text-[12px] font-bold text-[#0f5b78] mb-2 shrink-0">Social History & Lifestyle</h3>
                <div className="grid grid-cols-3 gap-2 flex-1">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-center flex flex-col justify-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Tobacco</p>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">Former Smoker</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">Quit 2010</p>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-center flex flex-col justify-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Alcohol</p>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">Occasional</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">1-2 drinks/mo</p>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-center flex flex-col justify-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Diet</p>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">Low Sodium</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">Cardiac Diet</p>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-center flex flex-col justify-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Exercise</p>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">Light</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">2 days/wk</p>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-center flex flex-col justify-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Sleep</p>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">Good</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">7-8 hours</p>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-center flex flex-col justify-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Living</p>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">With Spouse</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">Independent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-2">

            {/* Split Row for Insurance & Audit Trail */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2.5">
              {/* Insurance Information */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-tight ">Insurance Information</h3>
                  <MoreVertical size={14} className="text-slate-400" />
                </div>
                <div className="p-2.5 space-y-2.5 flex-1">
                  <div className="flex items-center gap-3">
                    <Shield size={14} className="text-blue-500 shrink-0" />
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Plan</p>
                      <p className="text-[11px] font-bold text-slate-700 uppercase">PPO</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Fingerprint size={14} className="text-slate-400 shrink-0" />
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Subscriber</p>
                      <p className="text-[11px] font-bold text-slate-700 leading-tight">John A. Smith</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={14} className="text-slate-400 shrink-0" />
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Group ID</p>
                      <p className="text-[11px] font-bold text-slate-700">ABC122456</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={14} className="text-slate-400 shrink-0" />
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">DOB</p>
                      <p className="text-[11px] font-bold text-slate-700">03/15/1970</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audit Trail Section */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden pb-2 flex flex-col">
                <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest ">Audit Trail</h3>
                  <ChevronDown size={14} className="text-slate-400" />
                </div>
                <div className="p-2.5 space-y-3 flex-1">
                  {[
                    { date: '11/20/2022', text: 'EHR: Updated Diagnosis', user: 'Dr. Roberts', color: 'bg-blue-500' },
                    { date: '11/15/2022', text: 'Insurance: Verified Plan', user: 'Admin', color: 'bg-emerald-500' },
                    { date: '11/10/2022', text: 'Prescription: New Script', user: 'Dr. Miller', color: 'bg-amber-500' },
                  ].map((audit, i, arr) => (
                    <div key={i} className="relative flex gap-2.5">
                      {i !== arr.length - 1 && (
                        <div className="absolute left-[7px] top-4 -bottom-4 w-[2px] bg-slate-100 z-0" />
                      )}
                      <div className={`w-4 h-4 rounded-full ${audit.color} ring-4 ring-white z-10 shrink-0 mt-1`} />
                      <div className="space-y-1 w-full pb-0.5">
                        <p className="text-[11px] font-bold text-slate-700 leading-tight">{audit.text}</p>
                        <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{audit.date}</span>
                          <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded leading-none">{audit.user}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Split Row for Allergies & Medications */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2.5">
              {/* Allergies Section */}
              <div className="bg-red-50 rounded-xl border border-red-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-2.5 border-b border-red-100 flex items-center justify-between">
                  <h3 className="text-[12px] font-black text-red-800 uppercase tracking-tight ">Allergies</h3>
                  <div className="bg-red-100/50 px-2 py-0.5 rounded text-[9px] font-bold text-red-600 uppercase tracking-widest shrink-0">2 Active</div>
                </div>
                <div className="p-2.5 space-y-2 flex-1">
                  <div className="flex flex-col gap-0.5 pb-2 border-b border-red-100/50">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[11px] font-bold text-red-700 leading-tight">Penicillin</span>
                      <span className="text-[9px] font-bold text-red-400 shrink-0 mt-0.5">Severe</span>
                    </div>
                    <p className="text-[9px] font-black text-red-500/70 uppercase tracking-widest">Anaphylaxis</p>
                  </div>
                  <div className="flex flex-col gap-0.5 pb-0">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[11px] font-bold text-red-700 leading-tight">Peanuts</span>
                      <span className="text-[9px] font-bold text-red-400 shrink-0 mt-0.5">Moderate</span>
                    </div>
                    <p className="text-[9px] font-black text-red-500/70 uppercase tracking-widest">Hives</p>
                  </div>
                </div>
              </div>

              {/* Active Medications Section */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-tight ">Medications</h3>
                  <div className="bg-blue-50 px-2 py-0.5 rounded text-[9px] font-bold text-blue-600 uppercase tracking-widest shrink-0">3 Scripts</div>
                </div>
                <div className="p-2.5 space-y-2.5 flex-1">
                  <div className="flex flex-col gap-0.5 pb-2 border-b border-slate-50">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-slate-700 leading-tight">Lisinopril</span>
                      <span className="text-[10px] font-black text-slate-400 shrink-0">10mg</span>
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">1 PO Daily</p>
                  </div>
                  <div className="flex flex-col gap-0.5 pb-2 border-b border-slate-50">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-slate-700 leading-tight">Atorvastatin</span>
                      <span className="text-[10px] font-black text-slate-400 shrink-0">40mg</span>
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">1 PO QHS</p>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-slate-700 leading-tight">Metformin</span>
                      <span className="text-[10px] font-black text-slate-400 shrink-0">500mg</span>
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">1 PO BID w/ meals</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Section */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest ">Appointments</h3>
                <span className="bg-blue-600 text-[9px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-widest">Upcoming</span>
              </div>
              <div className="p-2.5 space-y-2">
                <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                  <Calendar size={18} className="text-blue-500 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-[11px] font-black text-slate-800 ">12/10/2022</p>
                    <p className="text-[12px] font-bold text-slate-500">Regular Checkup - Room 402</p>
                    <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Follow-up: 3 Months</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Care Team */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3">
              <h3 className="text-[12px] font-bold text-[#0f5b78] mb-2">Care Team</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">ER</div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">Dr. Emily Roberts</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase">Primary Care</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">JC</div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">Dr. John Chen</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase">Cardiology</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferred Pharmacy */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-2.5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-tight ">Pharmacy</h3>
                <MapPin size={14} className="text-slate-400" />
              </div>
              <div className="p-2.5">
                <p className="text-[11px] font-bold text-slate-800">CVS Pharmacy #1234</p>
                <p className="text-[10px] text-slate-500 mt-0.5">123 Main St, Springfield IL</p>
                <p className="text-[10px] font-bold text-blue-600 mt-1 cursor-pointer hover:underline">📞 (555) 987-6543</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer / Bottom Actions */}
      <footer className="p-2.5 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest ">System Online</span>
          </div>
          <span className="text-slate-300">|</span>
          <span className="text-[11px] font-bold text-slate-400  font-mono uppercase">Last Sync: 2 mins ago</span>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all ">Print Profile</button>
          <button className="px-6 py-2 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg ">Generate Report</button>
        </div>
      </footer>
    </div>
  );
};

export default ResidentDetailPage;
