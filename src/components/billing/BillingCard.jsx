import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const BillingCard = ({ 
  title, 
  icon: Icon, 
  action, 
  children, 
  className = "",
  headerClassName = "",
  bodyClassName = "p-6",
  showMore = true
}) => {
  return (
    <div className={`bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all h-full ${className}`}>
      {/* Header */}
      <div className={`px-6 py-4 border-b border-slate-50 flex items-center justify-between shrink-0 ${headerClassName}`}>
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="w-8 h-8 rounded-xl bg-blue-50/50 flex items-center justify-center text-blue-600">
              <Icon size={18} />
            </div>
          )}
          <h3 className="text-sm font-bold text-slate-800 tracking-tight">{title}</h3>
        </div>
        
        <div className="flex items-center gap-3">
          {action && (
             <div className="flex items-center">
               {action}
             </div>
          )}
          {showMore && (
            <button className="text-slate-400 hover:text-slate-600 transition-colors ml-1">
              <MoreHorizontal size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className={`flex-1 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default BillingCard;
