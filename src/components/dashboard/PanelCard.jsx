import React from "react";
import { MoreHorizontal, ChevronRight, ChevronDown } from "lucide-react";

const PanelCard = ({
  title,
  children,
  icon: Icon,
  actionText = "View All",
  badge,
  headerAction,
  showFooter = true,
  showMore = true,
  onAction,
}) => {
  return (
    <div className="dashboard-card h-full group/panel flex flex-col">
      <div className="p-4 px-5 border-b border-slate-50 flex items-center justify-between shrink-0 h-[64px]">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={18} className="text-blue-600" />}
          <h3 className="text-sm font-bold text-slate-800 leading-tight">
            {title}
          </h3>
          {badge}
        </div>
        <div className="flex items-center gap-2">
          {headerAction}
          {showMore && (
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <MoreHorizontal size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 p-5 pt-4 overflow-y-auto no-scrollbar scroll-smooth">
        {children}
      </div>

      {showFooter && (
        <div className="mt-auto px-5 py-3 border-t border-slate-50 flex items-center justify-center shrink-0 h-[48px]">
          <button
            onClick={onAction}
            className="text-blue-600 hover:text-blue-700 font-bold text-[11px] flex items-center gap-1.5 active:translate-y-px transition-all group/btn"
          >
            {actionText}
            <ChevronRight
              size={14}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default PanelCard;
