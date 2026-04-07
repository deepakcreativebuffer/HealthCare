import React from 'react';

const ActionButton = ({ icon: Icon, onClick, color = 'blue' }) => {
  const colorClasses = {
    blue: 'text-blue-600 hover:bg-blue-50 border-transparent hover:border-blue-100',
    red: 'text-red-600 hover:bg-red-50 border-transparent hover:border-red-100',
    green: 'text-emerald-600 hover:bg-emerald-50 border-transparent hover:border-emerald-100',
    amber: 'text-amber-600 hover:bg-amber-50 border-transparent hover:border-amber-100',
  };

  return (
    <div className="relative group">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className={`p-2 rounded-lg transition-all border ${colorClasses[color] || colorClasses.blue}`}
      >
        <Icon size={18} />
      </button>
   
    </div>
  );
};

export default ActionButton;
