import React from 'react';
import { Card, Avatar, Badge } from './ui';
import { Heart, Activity, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileCard = ({ resident }) => {
  const initial = resident.name.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <Card className="flex flex-col py-3 px-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <Avatar size="sm" initial={initial} className="bg-blue-100 text-blue-600" />
          <div>
            <h2 className="text-[14px] font-bold flex items-center gap-2 leading-none">
              {resident.name}
            </h2>
            <p className="text-gray-500 text-[11px] mt-0.5">Age 32 • MRN MRN-882736</p>
          </div>
        </div>
        <Badge variant="success" className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0">
          Allergy: Penicillin
        </Badge>
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 text-[12px] text-gray-600">
        <div className="flex items-center gap-1">
          <Heart className="w-3 h-3 text-gray-400" /> Penicillin
        </div>
        <div className="flex items-center gap-1">
          <Activity className="w-3 h-3 text-gray-400" /> Asthma
        </div>
        <div className="flex items-center gap-1">
          <AlertCircle className="w-3 h-3 text-gray-400" /> Peanuts
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <Link
          to="/resident-dashboard/profile"
          className="w-full inline-flex items-center justify-center text-action-blue font-bold hover:bg-action-blue/5 py-1 text-[12px] rounded-[8px] transition-all duration-200"
        >
          View Full Profile →
        </Link>
      </div>
    </Card>
  );
};

export default ProfileCard;
