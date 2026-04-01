import React, { useState, useEffect } from 'react';
import { Users, MoreHorizontal, Loader2 } from 'lucide-react';
import PanelCard from './PanelCard';
import { api } from '../../data/api';

const ResidentRecords = ({ onViewAll }) => {
  const [residents, setResidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getResidents().then(data => {
      // Map data to include UI-specific fields if not present
      const formatted = data.slice(0, 5).map(res => ({
        ...res,
        initial: res.name.split(' ').map(n => n[0]).join(''),
        dob: res.admissionDate, // Using admission date as DOB placeholder for now
        color: res.gender === 'Female' ? 'orange' : 'blue'
      }));
      setResidents(formatted);
      setIsLoading(false);
    });
  }, []);

  const handleDischarge = async (e, residentId, residentName) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to discharge ${residentName}?`)) return;
    
    try {
      await api.updateResident(residentId, { status: 'Discharged' });
      await api.addActivity(`Resident discharged: ${residentName}`, 'Resident', 'Admin');
      setResidents(prev => prev.filter(r => r.id !== residentId));
      alert(`${residentName} has been discharged.`);
    } catch (error) {
      alert('Failed to discharge resident');
    }
  };

  return (
    <PanelCard title="Active Resident Records" icon={Users} actionText="View All 32" onActionClick={() => onViewAll?.("Active Resident Records")}>
      <div className="space-y-1">
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          </div>
        ) : (
          residents.map((res, idx) => (
            <div key={idx} className="flex items-center gap-3 p-2 rounded-[10px] hover:bg-gray-50 transition-colors cursor-pointer group border-b border-gray-100 last:border-0">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[12px] font-bold ${
                res.color === 'orange' ? 'bg-[#FFF4E5] text-[#FF9800]' :
                res.color === 'blue' ? 'bg-[#DEF3FF] text-[#129FED]' :
                res.color === 'green' ? 'bg-[#E9F7EF] text-[#27AE60]' :
                res.color === 'red' ? 'bg-[#FFEBEE] text-[#D32F2F]' :
                'bg-[#E0F7FA] text-[#00ACC1]'
              }`}>
                {res.initial}
              </div>
              
              <div className="flex-1">
                <h4 className="text-[14px] font-bold text-slate-800 leading-tight">{res.name}</h4>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">
                  DOB • {res.dob}
                </p>
              </div>

              <button 
                onClick={(e) => handleDischarge(e, res.id, res.name)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-red-500 hover:underline px-2 py-1"
              >
                Discharge
              </button>
            </div>
          ))
        )}
      </div>
    </PanelCard>
  );
};

export default ResidentRecords;
