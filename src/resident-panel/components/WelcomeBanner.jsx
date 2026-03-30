import React from 'react';
import { mockUser } from '../data/mockData';

const WelcomeBanner = () => {
  return (
    <div className="bg-gradient-to-r from-[#00AEEF] to-[#0072CE] rounded-2xl p-8 text-white relative overflow-hidden shadow-lg shadow-blue-500/20">
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">Good Morning, {mockUser.name.split(' ')[0]}! 👋</h1>
        <p className="text-blue-100 text-lg mb-6 leading-relaxed opacity-90">How can we assist you today?</p>
        <p className="font-medium">Welcome to the Oasis Notes!</p>
      </div>
      
      {/* Decorative abstract elements/illustration */}
      <div className="absolute right-0 bottom-0 top-0 w-1/3 min-w-[300px] pointer-events-none flex items-end justify-end">
        <div className="w-full h-full bg-[url('https://illustrations.popsy.co/blue/startup-team.svg')] bg-contain bg-right-bottom bg-no-repeat opacity-90 translate-x-12 translate-y-4" />
      </div>
    </div>
  );
};

export default WelcomeBanner;
