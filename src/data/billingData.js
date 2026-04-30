// Mock data for the Billing Dashboard
export const billingData = {
  metrics: [
    { label: 'Total Claims This Month', value: '105', icon: 'FileText', color: 'green' },
    { label: 'Submitted Today', value: '14', icon: 'FileUp', color: 'blue' },
    { label: 'Pending Review', value: '12', icon: 'Clock', color: 'orange' },
    { label: 'Rejected', value: '3', icon: 'AlertCircle', color: 'red' },
    { label: 'Revenue MTD', value: '$64k', icon: 'DollarSign', color: 'blue' },
    { label: 'Avg Days to Payment', value: '18', icon: 'Clock3', color: 'green' },
  ],

  provider: {
    name: 'Behavioral Health LLC',
    npi: '(555) 555-0199',
    address: '123 Wellness Dr, Suite 200, Austin',
    phone: '(512) 555-0199'
  },

  locations: [
    {
      name: 'Recovery Center',
      address: '456 Serenity Ln, Austin, TX 78702',
      npi: '9876543210',
      pos: '55'
    },
    {
      name: 'Outpatient Clinic',
      address: '789 Hope Ave, Austin, TX 78703',
      npi: '5678901234',
      pos: '11'
    }
  ],

  encounter: {
    patient: 'David Smith',
    provider: 'Dr. Emily Roberts',
    facility: 'Recovery Center',
    dos: '02/12/2025',
    diagnoses: [
      { code: 'F10.20', description: 'Alcohol dependence, uncomplicated' },
      { code: 'F32.1', description: 'Major depressive disorder, single episode, moderate' }
    ],
    procedures: [
      { code: '90837', qty: 1, amount: '$150' }
    ]
  },

  recentClaims: [
    { id: 'CLM-00123', patient: 'David Smith', payer: 'BlueCross BlueShield', amount: '$350.00', status: 'Submitted' },
    { id: 'CLM-00122', patient: 'Maria Santos', payer: 'Aetna PPO', amount: '$350.00', status: 'Paid' },
    { id: 'CLM-00121', patient: 'John Doe', payer: 'UnitedHealth', amount: '$350.00', status: 'Denied' },
    { id: 'CLM-00120', patient: 'Sarah Johnson', payer: 'Cigna', amount: '$350.00', status: 'Pending' },
    { id: 'CLM-00119', patient: 'Alex Kim', payer: 'Medicare', amount: '$350.00', status: 'Paid' }
  ],

  revenueTrend: {
    totalRevenue: '$152K',
    outstanding: '$24.3K',
    totalTrend: '+12.5%',
    outstandingTrend: '-8.2%',
    points: [
      { month: 'Sep', value: 25000 },
      { month: 'Oct', value: 38000 },
      { month: 'Nov', value: 45000 },
      { month: 'Dec', value: 42000 },
      { month: 'Jan', value: 48000 },
      { month: 'Feb', value: 55000 }
    ]
  },

  statusBreakdown: [
    { label: 'Paid', percentage: 65, color: '#10b981' },
    { label: 'Pending', percentage: 15, color: '#f59e0b' },
    { label: 'Denied', percentage: 18, color: '#ef4444' },
    { label: 'Draft', percentage: 5, color: '#94a3b8' }
  ],
  
  submissionHistory: [
    { id: 'CLM-00123', patient: 'David Smith', payer: 'BlueCross BlueShield', submitted: '02/12/2025 09:30 AM', status: 'Accepted' },
    { id: 'CLM-00122', patient: 'Maria Santos', payer: 'Aetna PPO', submitted: '02/11/2025 02:15 PM', status: 'Accepted' },
    { id: 'CLM-00121', patient: 'John Doe', payer: 'UnitedHealth', submitted: '02/10/2025 11:45 AM', status: 'Rejected' },
    { id: 'CLM-00120', patient: 'Sarah Johnson', payer: 'Cigna', submitted: '02/10/2025 10:00 AM', status: 'Pending' },
    { id: 'CLM-00119', patient: 'Alex Kim', payer: 'Medicare', submitted: '02/09/2025 03:20 PM', status: 'Accepted' }
  ],

  patientSnapshot: {
    id: 'PT-001',
    name: 'David Smith',
    dob: '02/15/1992',
    gender: 'Male',
    address: 'Miami, FL 33101',
    subscriber: 'Yes',
    payer: 'BlueCross BlueShield',
    memberId: 'MEM-987654',
    summary: {
      claimAmount: '$61,000',
      status: 'Draft',
      totalCharge: '$350.00',
      paid: '$0.00',
      patientResp: '$0.00'
    },
    audit: {
      created: 'Just now',
      modified: 'Just now'
    },
    insurance: {
      insuranceType: 'Primary',
      primaryPayer: 'BlueCross BlueShield',
      payerId: 'BCBS-12345',
      policyId: 'ABC123456789',
      groupNumber: 'GRP-5678',
      planType: 'BlueCross PPO',
      effectiveDate: '01/01/2024',
      subscriber: {
        firstName: 'David',
        lastName: 'Smith',
        relationship: 'Self',
        dob: '02/15/1992',
        address: 'Miami, FL 33101'
      }
    },
    secondaryInsurance: {
      insuranceType: 'Secondary',
      primaryPayer: 'Aetna Better Health',
      payerId: 'AET-9900',
      policyId: 'XYZ987654321',
      groupNumber: 'SEC-1122',
      planType: 'Managed Care',
      effectiveDate: '01/01/2024',
      subscriber: {
        firstName: 'David',
        lastName: 'Smith',
        relationship: 'Self',
        dob: '02/15/1992',
        address: 'Miami, FL 33101'
      }
    },
    providers: {
      billing: {
        name: 'Health',
        npi: '1234567890',
        taxId: 'XX-XXXXXXX',
        phone: '(555) 123-4567'
      },
      rendering: {
        name: 'Dr. Emily Roberts',
        npi: '1234567890',
        specialty: 'Psychiatry'
      },
      facility: {
        name: 'Main Clinic',
        npi: '(Optional)',
        address: '123 Main St, Miami, FL 33101',
        pos: '11 – Office'
      }
    },
    visitEncounter: {
      encounterId: 'VIS-00887',
      dosFrom: '01/03/2026',
      dosTo: '01/03/2026',
      patientName: 'David Smith'
    },
    diagnosisSection: [
      { id: 1, code: 'F32.9', description: 'Major depressive disorder', ptr: 1 },
      { id: 2, code: 'E11.9', description: 'Type 2 diabetes mellitus', ptr: 2 }
    ],
    proceduresSection: [
      { dosFrom: '03/01', dosTo: '03/01', cpt: '90837', mod1: '25', mod2: '', units: 1, charge: 200, dxPtr: 1, pos: 11 },
      { dosFrom: '03/01', dosTo: '03/01', cpt: '99213', mod1: '', mod2: '', units: 1, charge: 150, dxPtr: 1, pos: 11 }
    ],
    claimDetails: {
      type: 'Professional',
      frequency: 'Original',
      frequencyCode: '1',
      signatureOnFile: 'Yes',
      assignmentOfBenefits: 'Yes',
      totalChargeAmount: 350.00
    },
    auditSection: {
      submissionTimestamp: '-------------',
      lastModifiedBy: 'System (Auto)'
    }
  },

  // Lookup Tables for auto-complete and validation
  feeScheduleTable: [
    { cpt: '90837', description: 'Psychotherapy, 60 minutes', price: 200.00 },
    { cpt: '99213', description: 'Office visit, established patient, level 3', price: 150.00 },
    { cpt: '99214', description: 'Office visit, established patient, level 4', price: 185.00 },
    { cpt: '90791', description: 'Psychiatric diagnostic evaluation', price: 250.00 },
    { cpt: '90834', description: 'Psychotherapy, 45 minutes', price: 165.00 },
  ],

  icd10Codes: [
    { code: 'F32.9', description: 'Major depressive disorder, unspecified' },
    { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications' },
    { code: 'F41.1', description: 'Generalized anxiety disorder' },
    { code: 'F10.20', description: 'Alcohol dependence, uncomplicated' },
    { code: 'I10', description: 'Essential (primary) hypertension' },
  ],

  cptCodes: [
    { code: '90837', description: 'Psychotherapy, 60 min' },
    { code: '99213', description: 'Office visit, 15 min' },
    { code: '99214', description: 'Office visit, 25 min' },
    { code: '90791', description: 'Psych assessment' },
    { code: '90834', description: 'Psychotherapy, 45 min' },
  ],

  // Phase 3: Payment & Accounting
  eraData: [
    { 
      id: 'ERA-1001', 
      claimId: 'CLM-00122', 
      payer: 'Aetna PPO', 
      billed: 350.00, 
      allowed: 280.00, 
      paid: 240.00, 
      contractualAdjustment: 70.00, 
      patientResp: 40.00,
      remark: 'Claim processed according to contract' 
    },
    { 
      id: 'ERA-1002', 
      claimId: 'CLM-00119', 
      payer: 'Medicare', 
      billed: 350.00, 
      allowed: 180.00, 
      paid: 144.00, 
      contractualAdjustment: 170.00, 
      patientResp: 36.00,
      remark: 'Co-insurance applied' 
    }
  ],

  patientAccounting: [
    { 
      patientId: 'PT-001', 
      name: 'David Smith', 
      billed: 350.00, 
      insurancePaid: 240.00, 
      writeOffs: 70.00, 
      balance: 40.00, 
      status: 'Statement Sent',
      lastPayment: '02/01/2025'
    },
    { 
      patientId: 'PT-002', 
      name: 'Maria Santos', 
      billed: 500.00, 
      insurancePaid: 350.00, 
      writeOffs: 100.00, 
      balance: 50.00, 
      status: 'Paid',
      lastPayment: '02/10/2025'
    }
  ],

  // Phase 4: Follow-up & Resolution
  arAging: {
    buckets: [
      { range: '0-30 Days', amount: 45000, color: '#10b981' },
      { range: '31-60 Days', amount: 15200, color: '#3b82f6' },
      { range: '61-90 Days', amount: 8400, color: '#f59e0b' },
      { range: '90+ Days', amount: 12500, color: '#ef4444' }
    ],
    totalOutstanding: 81100
  },

  writeOffsHistory: [
    { id: 'WO-001', claimId: 'CLM-00121', amount: 350.00, reason: 'Untimely Filing', date: '02/15/2025', user: 'Admin' },
    { id: 'WO-002', claimId: 'CLM-00110', amount: 120.00, reason: 'Contractual Adjustment Adjustment', date: '02/14/2025', user: 'Billing Specialist' }
  ]
};
