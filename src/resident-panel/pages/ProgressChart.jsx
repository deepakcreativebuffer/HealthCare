import React from 'react';
import { Card, Badge, Button } from '../components/ui';
import { LineChart, Activity, HeartPulse, Weight, Calendar, TrendingUp, TrendingDown, Thermometer } from 'lucide-react';

const mockVitalsHistory = [
  { date: 'Mar 15, 2026', bp: '120/80', hr: 72, weight: 165, temp: 98.6 },
  { date: 'Feb 10, 2026', bp: '122/82', hr: 75, weight: 166, temp: 98.4 },
  { date: 'Jan 05, 2026', bp: '125/85', hr: 78, weight: 168, temp: 98.7 },
  { date: 'Dec 01, 2025', bp: '130/88', hr: 80, weight: 170, temp: 98.5 },
];

const ProgressBar = ({ label, value, max, color, trend }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between items-center text-[12px]">
        <span className="font-semibold text-gray-700">{label}</span>
        <div className="flex items-center gap-1.5 font-bold text-gray-900">
          {value}
          {trend === 'up' ? <TrendingUp className="w-3.5 h-3.5 text-blue-500" /> : <TrendingDown className="w-3.5 h-3.5 text-emerald-500" />}
        </div>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-in-out relative`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20" />
        </div>
      </div>
    </div>
  );
};

const ProgressChart = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Progress Chart</h1>
          <p className="text-gray-500 text-[12px]">
            Track your medical vitals and health progress over time
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Activity className="w-4 h-4 text-blue-500" />
            <h3 className="font-bold text-gray-900 text-[14px]">Weight Tracking (lbs)</h3>
          </div>
          <div className="space-y-4">
            <ProgressBar label="Current Weight" value={165} max={200} color="bg-blue-500" trend="down" />
            <ProgressBar label="1 Month Ago" value={166} max={200} color="bg-blue-300" />
            <ProgressBar label="3 Months Ago" value={168} max={200} color="bg-blue-200" />
            <ProgressBar label="6 Months Ago" value={170} max={200} color="bg-blue-100" />
          </div>
        </Card>

        <Card className="p-4 space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <HeartPulse className="w-4 h-4 text-rose-500" />
            <h3 className="font-bold text-gray-900 text-[14px]">Heart Rate (BPM)</h3>
          </div>
          <div className="space-y-4">
            <ProgressBar label="Current Average" value={72} max={120} color="bg-rose-500" trend="down" />
            <ProgressBar label="1 Month Ago" value={75} max={120} color="bg-rose-300" />
            <ProgressBar label="3 Months Ago" value={78} max={120} color="bg-rose-200" />
            <ProgressBar label="6 Months Ago" value={80} max={120} color="bg-rose-100" />
          </div>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="font-bold text-gray-900 flex items-center gap-2 text-[14px]">
            <LineChart className="w-4 h-4 text-blue-500" />
            Historical Vitals Logs
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-[12px] text-gray-500">
                <th className="px-4 py-3 font-semibold pb-2">Date</th>
                <th className="px-4 py-3 font-semibold pb-2">Blood Pressure</th>
                <th className="px-4 py-3 font-semibold pb-2">Heart Rate</th>
                <th className="px-4 py-3 font-semibold pb-2">Weight</th>
                <th className="px-4 py-3 font-semibold pb-2">Temperature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockVitalsHistory.map((vital, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors text-[13px]">
                  <td className="px-4 py-3 font-semibold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" /> {vital.date}
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[12px] font-bold">
                      {vital.bp}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {vital.hr} bpm
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {vital.weight} lbs
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700 flex items-center gap-1.5">
                    <Thermometer className="w-3 h-3 text-orange-500" /> {vital.temp}°F
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ProgressChart;
