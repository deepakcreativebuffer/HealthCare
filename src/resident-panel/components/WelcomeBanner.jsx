import React from 'react';
import { mockUser } from '../data/mockData';
import doctorImg from '../../assets/doctor.svg';

const WelcomeBanner = () => {
  return (
    <div className="bg-gradient-to-r from-[#0088FF] to-[#20D5FE] rounded-[10px] p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
      <div className="relative z-10 max-w-full sm:max-w-2xl text-center sm:text-left">
        <h1 className="text-[22px] sm:text-[28px] font-bold mb-1 flex items-center justify-center sm:justify-start gap-2">
          Good Morning, {mockUser.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-white/90 text-[14px] mb-4">How can we assist you today?</p>
        <p className="text-[14px] font-medium mt-8">Welcome to the Oasis Notes!</p>
      </div>

      {/* Doctor illustration - hidden on mobile, visible on sm and up */}
      <div className="hidden sm:flex absolute right-0 bottom-0 top-0 w-1/3 min-w-[200px] pointer-events-none items-center justify-end pr-4">
        <img src={doctorImg} alt="Doctors" className="h-[90%] w-auto object-contain opacity-40 sm:opacity-100" />
      </div>
    </div>
  );
};

export default WelcomeBanner;
