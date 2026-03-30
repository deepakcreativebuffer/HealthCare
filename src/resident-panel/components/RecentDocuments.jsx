import React from 'react';
import { Card, Button } from './ui';
import { Download, File, Calendar as CalendarIcon } from 'lucide-react';
import { recentDocuments } from '../data/mockData';

const RecentDocuments = () => {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <File className="w-5 h-5 text-blue-500" />
          Recent Documents
        </h3>
        <Button variant="ghost" className="text-action-blue px-0 hover:bg-transparent font-semibold">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {recentDocuments.map((doc) => (
          <div key={doc.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
            <div>
              <p className="font-semibold text-gray-900 text-[14px]">{doc.name}</p>
              <div className="flex items-center gap-1 mt-1 text-[12px] text-gray-500">
                <CalendarIcon className="w-3 h-3" />
                <span>{doc.date}</span>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentDocuments;
