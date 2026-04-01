import React, { useState, useEffect } from "react";
import { Activity, Clock, MoreHorizontal, Loader2 } from "lucide-react";
import PanelCard from "./PanelCard";
import { api } from "../../data/api";

const ActivityLog = ({ onViewAll }) => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getActivity().then((data) => {
      setLogs(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <PanelCard
      title="Activity Log"
      icon={Activity}
      actionText="View All Activity"
      onActionClick={() => onViewAll?.("Activity Log")}
      customScroll={true}
    >
      <div className="space-y-1">
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          </div>
        ) : (
          logs.map((log, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-2 rounded-[10px] hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 group cursor-pointer"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[13px] font-bold text-slate-700 tracking-tight">
                    {log.action}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      log.status === "Approved"
                        ? "bg-[#E9F7EF] text-[#27AE60]"
                        : log.status === "Created" || log.status === "Updated"
                          ? "bg-[#DEF3FF] text-[#129FED]"
                          : log.status === "Missing Notes (3)"
                            ? "bg-[#FFEBEE] text-[#D32F2F]"
                            : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
                <p className="text-[11px] font-bold text-slate-400">
                  Action by{" "}
                  <span className="text-slate-500 font-bold ml-1">
                    • {log.user}
                  </span>
                </p>
              </div>

              <div className="text-[11px] text-slate-400 font-bold whitespace-nowrap">
                {log.time}
              </div>
            </div>
          ))
        )}
      </div>
    </PanelCard>
  );
};

export default ActivityLog;
