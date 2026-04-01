import React from 'react';
import { Card, Avatar, Badge } from './ui';
import { Heart, Activity, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileCard = ({ resident }) => {
  const initial = resident.name.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <Card className="flex flex-col">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <Avatar size="md" initial={initial} className="bg-blue-100 text-blue-600" />
          <div>
            <h2 className="text-md font-bold flex items-center gap-2">
              {resident.name}
            </h2>
            <p className="text-gray-500 text-xs mt-1">Age 32 • MRN MRN-882736</p>
          </div>
        </div>
        <Badge variant="success" className="bg-emerald-100 text-emerald-800">
          Allergy: Penicillin
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Heart className="w-4 h-4 text-gray-400" /> Penicillin
        </div>
        <span className="text-gray-300">•</span>
        <div className="flex items-center gap-1">
          <Activity className="w-4 h-4 text-gray-400" /> Asthma
        </div>
        <span className="text-gray-300">•</span>
        <div className="flex items-center gap-1">
          <AlertCircle className="w-4 h-4 text-gray-400" /> Peanuts
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-gray-100">
        <Link
          to="/resident-dashboard/profile"
          className="w-full inline-flex items-center justify-center text-action-blue font-bold hover:bg-action-blue/5 py-2 rounded-[10px] transition-all duration-200"
        >
          View Full Profile →
        </Link>
      </div>
    </Card>
  );
};

export default ProfileCard;
