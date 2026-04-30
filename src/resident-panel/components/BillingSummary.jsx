import React, { useState } from 'react';
import { Card, Badge, Button, Modal, Input } from './ui';
import { CreditCard, Calendar as CalendarIcon, FileText, Edit, Activity } from 'lucide-react';
import { api } from '../../data/api';
import BillingWorkflowDiagram from '../../components/billing/BillingWorkflowDiagram';

const BillingSummary = ({ resident, refreshResident }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDiagramOpen, setIsDiagramOpen] = useState(false);
  const billingDetails = resident?.billingSummary || { balanceDue: 0, lastPayment: { amount: 0, date: '' }, progress: 0 };
  const [formData, setFormData] = useState({
    balanceDue: billingDetails.balanceDue,
    lastPaymentAmount: billingDetails.lastPayment?.amount || 0,
    lastPaymentDate: billingDetails.lastPayment?.date || ''
  });

  const handleOpenModal = () => {
    setFormData({
      balanceDue: billingDetails.balanceDue,
      lastPaymentAmount: billingDetails.lastPayment?.amount || 0,
      lastPaymentDate: billingDetails.lastPayment?.date || ''
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const newBilling = {
      ...billingDetails,
      balanceDue: parseFloat(formData.balanceDue),
      lastPayment: {
        amount: parseFloat(formData.lastPaymentAmount),
        date: formData.lastPaymentDate
      }
    };
    await api.updateResident(resident?.id, { billingSummary: newBilling });
    if (refreshResident) refreshResident();
    setIsModalOpen(false);
  };

  return (
    <>
      <Card className="flex flex-col gap-2 relative group">
        <div className="flex items-center justify-between pb-1 border-b border-gray-100">
          <h3 className="text-[15px] font-bold flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-500" />
            Billing Summary
          </h3>
          <div className="flex items-center gap-2">
            <button
              className="text-gray-400 hover:text-indigo-600 transition-colors p-1"
              onClick={() => setIsDiagramOpen(true)}
              title="View Billing Workflow"
            >
              <Activity className="w-3.5 h-3.5" />
            </button>
            <button
              className="text-gray-400 hover:text-blue-600 transition-colors p-1"
              onClick={handleOpenModal}
              title="Edit Billing Info"
            >
              <Edit className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-1">
          <p className="font-semibold text-gray-900 text-[13px]">Balance Due:</p>
          <p className="text-[20px] font-bold text-action-blue">${Number(billingDetails.balanceDue).toFixed(2)}</p>
        </div>

        <div className="bg-gray-50 p-2.5 rounded-[8px] border border-[#E2E8F0] mt-1 relative group/item">
          <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-2">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Last Pymt: ${Number(billingDetails.lastPayment?.amount || 0).toFixed(2)}; {billingDetails.lastPayment?.date}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 mb-1 overflow-hidden">
            <div
              className="h-full bg-action-blue rounded-full"
              style={{ width: `${billingDetails.progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-2 text-[11px]">
            <span className="text-gray-500">Insurance coverage: <span className="font-bold text-gray-900">{billingDetails.progress || 60}%</span></span>
            <Badge variant="neutral" className="bg-gray-200 text-gray-700 text-[10px] px-1.5 py-0">
              coinsurance
            </Badge>
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Billing Info">
          <div className="space-y-4">
            <Input type="number" label="Balance Due ($)" value={formData.balanceDue} onChange={(e) => setFormData({ ...formData, balanceDue: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <Input type="number" label="Last Payment ($)" value={formData.lastPaymentAmount} onChange={(e) => setFormData({ ...formData, lastPaymentAmount: e.target.value })} />
              <Input label="Date" value={formData.lastPaymentDate} onChange={(e) => setFormData({ ...formData, lastPaymentDate: e.target.value })} placeholder="20 Mar 2024" />
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary" className="flex-1" onClick={handleSave}>Save</Button>
            </div>
          </div>
        </Modal>
      </Card>

      <Modal
        isOpen={isDiagramOpen}
        onClose={() => setIsDiagramOpen(false)}
        title="Medical Billing Workflow"
        className="max-w-6xl w-[95vw]"
      >
        <div className="h-[75vh]">
          <BillingWorkflowDiagram />
        </div>
      </Modal>
    </>
  );
};

export default BillingSummary;
