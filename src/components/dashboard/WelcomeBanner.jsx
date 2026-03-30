import React from 'react';

const WelcomeBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-teal-400 p-8 text-white min-h-[220px]">
      <div className="flex flex-col gap-2 max-w-lg relative z-10">
        <h1 className="text-4xl font-bold tracking-tight">Good Morning, Sarah! 👋</h1>
        <p className="text-blue-50 font-medium text-lg">How can we assist you today?</p>
        <p className="text-blue-100 text-sm mt-4 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-lg inline-block w-fit">
          Welcome back to the Oasis Notes!
        </p>
      </div>

      <img 
        src="/medical_admin_banner_illustration.png" 
        alt="Oasis Medical Illustration"
        className="absolute right-0 bottom-0 h-full w-auto object-contain opacity-90 scale-x-[-1] translate-x-12 mix-blend-overlay lg:translate-x-0 lg:opacity-100 lg:mix-blend-normal transform"
      />
      
      {/* Decorative blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-blue-400/20 rounded-full blur-2xl" />
    </div>
  );
};

export default WelcomeBanner;
