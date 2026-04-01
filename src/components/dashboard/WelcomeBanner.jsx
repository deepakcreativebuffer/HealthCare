import React from "react";

const WelcomeBanner = () => {
  return (
    <div className="bg-gradient-to-r from-[#0088FF] to-[#20D5FE] rounded-[10px] p-5 sm:p-6 text-white relative overflow-hidden shadow-md min-h-[160px] sm:min-h-[180px]">
      <div className="relative z-10 max-w-full sm:max-w-2xl text-center sm:text-left flex flex-col justify-center h-full">
        <h1 className="text-[22px] sm:text-[28px] font-bold mb-1 flex items-center justify-center sm:justify-start gap-2">
          Good Morning, Sarah! 👋
        </h1>
        <p className="text-white/90 text-[13px] sm:text-[14px] mb-3">
          How can we assist you today?
        </p>

        <div className="backdrop-blur-md bg-white/10 px-4 py-2 rounded-lg border border-white/20 inline-block w-fit mx-auto sm:mx-0">
          <p className="text-[14px] font-medium">
            Welcome back to the Healthcare!
          </p>
        </div>
      </div>

      {/* Doctor illustration - hidden on smallest, visible from sm up */}
      <div className="hidden sm:flex absolute right-0 bottom-0 top-0 w-1/3 min-w-[220px] pointer-events-none items-center justify-end pr-4">
        <img
          src="./doctor.svg"
          alt="Doctors"
          className="h-[90%] w-auto object-contain opacity-40 sm:opacity-100"
        />
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-[-20%] right-[10%] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute bottom-[-10%] left-[5%] w-24 h-24 bg-white/10 rounded-full blur-xl" />
    </div>
  );
};

export default WelcomeBanner;
