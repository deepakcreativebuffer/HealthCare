import React from "react";

const WelcomeBanner = ({ resident }) => {
  return (
    <div className="bg-gradient-to-r from-[#0088FF] to-[#20D5FE] rounded-[10px] p-4 sm:p-5 text-white relative overflow-hidden shadow-sm">
      <div className="relative z-10 max-w-full sm:max-w-xl text-center sm:text-left">
        <h1 className="text-[18px] sm:text-[22px] font-bold mb-0.5 flex items-center justify-center sm:justify-start gap-2">
          Good Morning, {resident.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-white/90 text-[13px] mb-2">How can we assist you today?</p>
        <p className="text-[12px] font-medium mt-4">Welcome to the Oasis Notes!</p>
      </div>

      {/* Doctor illustration - hidden on mobile, visible on sm and up */}
      <div className="hidden sm:flex absolute right-0 bottom-0 top-0 w-1/3 min-w-[160px] pointer-events-none items-center justify-end pr-4">
        <img src="/doctor.svg" alt="Doctors" className="h-[80%] w-auto object-contain opacity-40 sm:opacity-100" />
      </div>
    </div>
  );
};

export default WelcomeBanner;
