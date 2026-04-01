import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Plus, Target, Zap, FileText, ChevronRight } from "lucide-react";
import PanelCard from "./PanelCard";

const linkItems = [
  {
    icon: Plus,
    label: "Add New User",
    sub: "Register a new profile",
    color: "green",
    path: "/admin/users/new",
  },
  {
    icon: Target,
    label: "Resident Vitals",
    sub: "Log daily health stats",
    color: "blue",
    path: "/admin/vitals",
  },
  {
    icon: Zap,
    label: "Resident Tracking",
    sub: "View current location and status",
    color: "orange",
    path: "/admin/tracking",
  },
  {
    icon: FileText,
    label: "View Logs",
    sub: "Access historical records",
    color: "red",
    path: "/admin/logs",
  },
  {
    icon: Plus,
    label: "Skills and Knowledge Training",
    sub: "Educational modules",
    color: "green",
    path: "/admin/training",
  },
  {
    icon: Target,
    label: "On Site and Facility Orientation Verification",
    sub: "Confirm site-specific training",
    color: "blue",
    path: "/admin/orientation",
  },
  {
    icon: Zap,
    label: "Clinical Oversight",
    sub: "Supervisory reviews",
    color: "orange",
    path: "/admin/clinical-oversight",
  },
];

const QuickLinks = ({ onAdmitClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (e, link) => {
    if (link.label !== "Add New User") {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    onAdmitClick();
  };

  return (
    <PanelCard title="Quick Links" icon={Zap} customScroll={true}>
      <div className="space-y-1.5 max-h-[410px] overflow-y-auto no-scrollbar pr-1">
        {linkItems.map((link, idx) => (
          <Link
            key={idx}
            to={link.path}
            onClick={(e) => handleLinkClick(e, link)}
            className={`w-full flex items-center gap-2.5 p-1.5 rounded-[10px] border transition-all text-left group/link shrink-0 no-underline ${
              link.label === "Add New User" ? "cursor-pointer" : "cursor-default"
            } ${
              link.color === "green"
                ? "bg-[#E9F7EF] border-[#C2E9D1]"
                : link.color === "blue"
                  ? "bg-[#DEF3FF] border-[#B5E1FA]"
                  : link.color === "orange"
                    ? "bg-[#FFF4E5] border-[#FFE0B2]"
                    : "bg-[#FFEBEE] border-[#FFCDD2]"
            }`}
          >
            {/* White Circle for Icon */}
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-white/50">
              <link.icon
                size={16}
                className={`${
                  link.color === "green"
                    ? "text-[#27AE60]"
                    : link.color === "blue"
                      ? "text-[#129FED]"
                      : link.color === "orange"
                        ? "text-[#FF9800]"
                        : "text-[#D32F2F]"
                }`}
              />
            </div>

            <div className="flex-1">
              <h4 className="text-[12.5px] font-bold text-slate-800 leading-tight">
                {link.label}
              </h4>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5 opacity-80 leading-none">
                {link.sub}
              </p>
            </div>

            <ChevronRight
              size={16}
              className={`transition-all group-hover/link:translate-x-1 ${
                link.color === "green"
                  ? "text-[#27AE60]"
                  : link.color === "blue"
                    ? "text-[#129FED]"
                    : link.color === "orange"
                      ? "text-[#FF9800]"
                      : "text-[#D32F2F]"
              }`}
            />
          </Link>
        ))}
      </div>
    </PanelCard>
  );
};

export default QuickLinks;

