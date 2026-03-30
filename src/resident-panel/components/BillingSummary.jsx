import React from 'react';
import { Card, Badge, Button } from './ui';
import { CreditCard, Calendar as CalendarIcon, FileText } from 'lucide-react';
import { billingDetails } from '../data/mockData';

const BillingSummary = () => {
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-500" />
          Billing Summary
        </h3>
        <Button variant="ghost" className="text-action-blue px-0 hover:bg-transparent font-semibold">
          View All Bills
        </Button>
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className="font-semibold text-gray-900">Balance Due:</p>
        <p className="text-2xl font-bold text-action-blue">${billingDetails.balanceDue.toFixed(2)}</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mt-2">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <CreditCard className="w-4 h-4" />
          <span>Last Payment: ${billingDetails.lastPayment.amount.toFixed(2)}; {billingDetails.lastPayment.date}</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full mt-4 mb-2 overflow-hidden">
          <div 
            className="h-full bg-action-blue rounded-full" 
            style={{ width: `${billingDetails.progress}%` }} 
          />
        </div>
        
        <div className="flex items-center justify-between mt-3 text-sm">
          <span className="text-gray-500">Insurance Coverage: <span className="font-bold text-gray-900">60%</span></span>
          <Badge variant="neutral" className="bg-gray-200 text-gray-700">
            coinsurance
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default BillingSummary;
