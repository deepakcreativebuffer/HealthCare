import React from "react";
import { MoreHorizontal } from "lucide-react";

const BillingCard = ({
  title,
  icon: Icon,
  action,
  children,
  className = "",
  headerClassName = "",
  bodyClassName = "p-6",
  showMore = false,
}) => {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all h-full ${className}`}
    >
      {/* Header */}
      <div
        className={`px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0 ${headerClassName}`}
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="w-8 h-8 rounded-lg bg-[#E3F2FD] flex items-center justify-center text-[#129FED]">
              <Icon size={16} />
            </div>
          )}
          <h3 className="text-[15px] font-bold text-slate-800 tracking-tight">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {action && <div className="flex items-center">{action}</div>}
          {showMore && (
            <button className="text-slate-400 hover:text-slate-600 transition-colors ml-1">
              <MoreHorizontal size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className={`flex-1 ${bodyClassName}`}>{children}</div>
    </div>
  );
};

export default BillingCard;
