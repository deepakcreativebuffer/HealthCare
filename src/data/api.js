import { mockData } from './mockData';

// Helper to simulate API delay
const simulateAPI = (data, delay = 800) => 
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

// Storage Keys
const KEYS = {
  RESIDENTS: 'hc_residents',
  STAFF: 'hc_staff',
  BILLING: 'hc_billing',
  ACTIVITY: 'hc_activity',
  PTO: 'hc_pto',
  SICK_LEAVE: 'hc_sick',
  APPOINTMENTS: 'hc_appointments',
  USER: 'user'
};

// Generic getter with localStorage fallback
const getStoredData = (key, defaultValue) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

// Generic setter
const setStoredData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const api = {
  // Residents
  getResidents: () => simulateAPI(getStoredData(KEYS.RESIDENTS, mockData.residents)),
  addResident: (newResident) => {
    const residents = getStoredData(KEYS.RESIDENTS, mockData.residents);
    const updated = [...residents, { ...newResident, id: `RES${(residents.length + 1).toString().padStart(3, '0')}` }];
    setStoredData(KEYS.RESIDENTS, updated);
    return simulateAPI({ success: true, data: updated });
  },
  updateResident: (id, updates) => {
    const residents = getStoredData(KEYS.RESIDENTS, mockData.residents);
    const updated = residents.map(r => r.id === id ? { ...r, ...updates } : r);
    setStoredData(KEYS.RESIDENTS, updated);
    return simulateAPI({ success: true, data: updated });
  },
  deleteResident: (id) => {
    const residents = getStoredData(KEYS.RESIDENTS, mockData.residents);
    const updated = residents.filter(r => r.id !== id);
    setStoredData(KEYS.RESIDENTS, updated);
    return simulateAPI({ success: true, data: updated });
  },
  getResidentData: (id) => {
    const residents = getStoredData(KEYS.RESIDENTS, mockData.residents);
    const resident = residents.find(r => r.id === id) || residents[0];
    
    // Ensure nested data structures exist
    if (!resident.diagnosisProblems) {
      resident.diagnosisProblems = [
        { id: 1, name: "Depression", onset: "2023", status: "Active" },
        { id: 2, name: "Degenerative Arthritis", type: "Chronic", status: "Chronic" },
        { id: 3, name: "Skin Reactions", type: "Recurrent", status: "Recurrent" }
      ];
    }
    if (!resident.medicationsList) {
      resident.medicationsList = [
        { id: 1, name: "Lisinopril", dose: "20 mg", details: "20 MG • Oral • Daily", status: "Active" },
        { id: 2, name: "Metformin", dose: "500 mg", details: "500 MG • Oral • Daily", status: "Active" },
        { id: 3, name: "Sertraline", dose: "50 mg", details: "50 MG • Oral • Daily", status: "Active" }
      ];
    }
    if (!resident.vitalsHistory) {
      resident.vitalsHistory = {
        bloodPressure: "120/80 mmHg",
        heartRate: "74 bpm",
        bmi: "17.1 lbs",
        respirationRate: "60 bpm"
      };
    }
    if (!resident.appointments) {
      resident.appointments = [
        { id: 1, doctor: "Dr. Amanda Roberts", date: "Thursday, Apr 25", time: "10:30 AM", location: "Monterey Clinic" },
        { id: 2, doctor: "Dr. James Williams", date: "Friday, Apr 26", time: "02:00 PM", location: "Health Center" }
      ];
    }
    if (!resident.assignedForms) {
      resident.assignedForms = [
        { id: 1, name: "Annual Health Assessment", status: "Pending", lastUpdated: "04/2024" },
        { id: 2, name: "Medication Consent Form", status: "Signed", lastUpdated: "03/2024" }
      ];
    }
    if (!resident.recentDocuments) {
      resident.recentDocuments = [
        { id: 1, name: "Lab Report - December 10", date: "22 Feb 2024" },
        { id: 2, name: "Insurance Documentation", date: "02 Jan 2024" }
      ];
    }
    if (!resident.billingSummary) {
      resident.billingSummary = {
        balanceDue: 250.00,
        lastPayment: { amount: 30.00, date: "20 Mar 2024" },
        progress: 60
      };
    }
    let needsUpdate = false;
    if (!resident.visits || resident.visits.length === 0) {
      resident.visits = [
        { id: 1, visitDate: '11/20/2022', visitType: 'Office Visit', providerName: 'Dr. Emily Roberts', chiefComplaint: 'Chest Pain', diagnosis: 'I20.9 - Angina Pectoris', procedure: '93000 - ECG', bp: '120/80', pulse: '72', temp: '98.6°F', weight: '185 lbs', notes: 'Patient presented with independent chest pain. ECG shows minor changes. RADIATING TO LEFT ARM.' }
      ];
      needsUpdate = true;
    }
    if (!resident.allergies || (Array.isArray(resident.allergies) && (resident.allergies.length === 0 || typeof resident.allergies[0] === 'string'))) {
      resident.allergies = [
        { id: 1, name: 'Penicillin', reaction: 'Anaphylaxis', severity: 'Severe', status: 'Active' },
        { id: 2, name: 'Peanuts', reaction: 'Hives', severity: 'Moderate', status: 'Active' }
      ];
      needsUpdate = true;
    }
    if (!resident.billingRecords || resident.billingRecords.length === 0) {
      resident.billingRecords = [
        { id: 1, invoiceNumber: 'INV-98765', serviceDate: '11/20/2022', charges: '$300.00', balance: '$300.00', status: 'Pending' },
        { id: 2, invoiceNumber: 'INV-98764', serviceDate: '11/15/2022', charges: '$150.00', balance: '$50.00', status: 'Partial' }
      ];
      needsUpdate = true;
    }
    if (!resident.medicalHistory || resident.medicalHistory.length === 0) {
      resident.medicalHistory = [
        { id: 1, Condition: 'Unspecified atrial fibrillation', 'Diagnosis Date': '2018', 'Doctor Notes': 'Controlled with medication', Status: 'Chronic' },
        { id: 2, Condition: 'Essential (primary) hypertension', 'Diagnosis Date': '2015', 'Doctor Notes': 'Stable', Status: 'Controlled' }
      ];
      needsUpdate = true;
    }
    if (!resident.insuranceInfo || resident.insuranceInfo.length === 0) {
      resident.insuranceInfo = [
        { id: 1, company: 'Medicare', plan: 'Plan G', policyNumber: 'MC123456789', status: 'Active' }
      ];
      needsUpdate = true;
    }
    if (!resident.labResults || resident.labResults.length === 0) {
      resident.labResults = [
        { id: 1, name: 'Comprehensive Metabolic Panel', orderedDate: '12/10/2022', value: 'Normal', status: 'Final' },
        { id: 2, name: 'Lipid Panel', orderedDate: '12/10/2022', value: 'High Cholesterol', status: 'Final' }
      ];
      needsUpdate = true;
    }
    if (!resident.careTeam || resident.careTeam.length === 0) {
      resident.careTeam = [
        { id: 1, name: 'Dr. Emily Roberts', specialty: 'Primary Care', phone: '(555) 123-4567', email: 'emily.r@care.com', status: 'Active' },
        { id: 2, name: 'Dr. John Chen', specialty: 'Cardiology', phone: '(555) 987-6543', email: 'john.c@care.com', status: 'Active' }
      ];
      needsUpdate = true;
    }
    if (!resident.pharmacy || resident.pharmacy.length === 0) {
      resident.pharmacy = [
        { id: 1, name: 'CVS Pharmacy #1234', address: '123 Main St, Springfield IL', phone: '(555) 987-6543', status: 'Active' }
      ];
      needsUpdate = true;
    }
    if (!resident.communication || resident.communication.length === 0) {
      resident.communication = [
        { id: 1, language: 'English', interpreter: 'Not Required', hearing: 'Impaired (Left)', vision: 'Normal', notes: 'Prefers written instructions' }
      ];
      needsUpdate = true;
    }
    if (!resident.mobility || resident.mobility.length === 0) {
      resident.mobility = [
        { id: 1, assist: 'One-Person', devices: 'Walker', fallRisk: 'High', status: 'Supervised' }
      ];
      needsUpdate = true;
    }
    if (!resident.nutrition || resident.nutrition.length === 0) {
      resident.nutrition = [
        { id: 1, diet: 'Mechanical Soft', fluids: 'Thin', intakeGoal: '1500ml/day', notes: 'Low sodium requirement' }
      ];
      needsUpdate = true;
    }
    if (!resident.safety || resident.safety.length === 0) {
      resident.safety = [
        { id: 1, security: 'Wander Guard Active', accessLevel: 'Family Only', protocol: 'Standard', notes: 'Check bracelet daily' }
      ];
      needsUpdate = true;
    }
    if (!resident.advanceDirectives || resident.advanceDirectives.length === 0) {
      resident.advanceDirectives = [
        { id: 1, dnrStatus: 'Active (DNR)', dniStatus: 'Active (DNI)', documentationDate: '02/20/2024', status: 'Verified' }
      ];
      needsUpdate = true;
    }
    if (!resident.auditTrail || resident.auditTrail.length === 0) {
      resident.auditTrail = [
        { id: 1, date: '11/20/2022', event: 'Record Access', text: 'EHR: Updated Diagnosis', user: 'Dr. Roberts' },
        { id: 2, date: '11/15/2022', event: 'Insurance Check', text: 'Insurance: Verified Plan', user: 'Admin' }
      ];
      needsUpdate = true;
    }
    if (!resident.dischargeSummary || resident.dischargeSummary.length === 0) {
      resident.dischargeSummary = [
        { id: 1, status: 'Stable', instruction: 'Maintain light activity', followUp: '2 Weeks Out', date: '02/25/2024' }
      ];
      needsUpdate = true;
    }
    if (!resident.immunizations || resident.immunizations.length === 0) {
      resident.immunizations = [
        { id: 1, name: 'Influenza (Flu)', date: '10/12/2023', status: 'Up-to-date', provider: 'Monterey Clinic' },
        { id: 2, name: 'Pneumococcal', date: '05/20/2022', status: 'Up-to-date', provider: 'General Hospital' }
      ];
      needsUpdate = true;
    }
    if (!resident.activities || resident.activities.length === 0) {
      resident.activities = [
        { id: 1, type: 'Medication', name: 'Lisinopril 20mg Admin.', date: '08:00 AM Today', status: 'Completed' },
        { id: 2, type: 'Vitals', name: 'Morning Vitals Check', date: '07:30 AM Today', status: 'Completed' },
        { id: 3, type: 'Social', name: 'Art Therapy Session', date: '02:00 PM Today', status: 'Pending' }
      ];
      needsUpdate = true;
    }

    if (needsUpdate) {
      const updatedResidents = residents.map(r => r.id === resident.id ? resident : r);
      setStoredData(KEYS.RESIDENTS, updatedResidents);
    }
    
    return simulateAPI(resident);
  },

  updateResident: (residentId, updates) => {
    const residents = getStoredData(KEYS.RESIDENTS, mockData.residents);
    const updated = residents.map(r => 
      r.id === residentId ? { ...r, ...updates } : r
    );
    setStoredData(KEYS.RESIDENTS, updated);
    return simulateAPI({ success: true });
  },

  updateResidentSubData: (residentId, key, itemId, updates) => {
    const residents = getStoredData(KEYS.RESIDENTS, mockData.residents);
    const updated = residents.map(r => {
      if (r.id === residentId || (residentId === undefined && r.name === 'Maria Johnson')) {
        const subData = Array.isArray(r[key]) ? r[key].map(item => item.id === itemId ? { ...item, ...updates } : item) : { ...r[key], ...updates };
        return { ...r, [key]: subData };
      }
      return r;
    });
    setStoredData(KEYS.RESIDENTS, updated);
    return simulateAPI({ success: true });
  },

  addResidentSubData: (residentId, key, newItem) => {
    const residents = getStoredData(KEYS.RESIDENTS, mockData.residents);
    const updated = residents.map(r => {
      if (r.id === residentId || (residentId === undefined && r.name === 'Maria Johnson')) {
        const id = (r[key]?.length || 0) + 1;
        const subData = [...(r[key] || []), { ...newItem, id }];
        return { ...r, [key]: subData };
      }
      return r;
    });
    setStoredData(KEYS.RESIDENTS, updated);
    return simulateAPI({ success: true });
  },

  deleteResidentSubData: (residentId, key, itemId) => {
    const residents = getStoredData(KEYS.RESIDENTS, mockData.residents);
    const updated = residents.map(r => {
      if (r.id === residentId || (residentId === undefined && r.name === 'Maria Johnson')) {
        const subData = r[key].filter(item => item.id !== itemId);
        return { ...r, [key]: subData };
      }
      return r;
    });
    setStoredData(KEYS.RESIDENTS, updated);
    return simulateAPI({ success: true });
  },

  // Staff
  getStaff: () => simulateAPI(getStoredData(KEYS.STAFF, mockData.staff)),
  
  // Billing
  getBilling: () => simulateAPI(getStoredData(KEYS.BILLING, mockData.billing)),
  getBillingData: () => {
    const data = getStoredData(KEYS.BILLING, mockData.billing);
    // Enriched structure for the dashboard
    const dashboardData = {
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
        { name: 'Recovery Center', address: '456 Serenity Ln, Austin, TX 78702', npi: '9876543210', pos: '55' },
        { name: 'Outpatient Clinic', address: '789 Hope Ave, Austin, TX 78703', npi: '5678901234', pos: '11' }
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
    };
    return simulateAPI(dashboardData);
  },
  // Users / Staff
  getUsersData: () => {
    const staff = getStoredData(KEYS.STAFF, mockData.staff);
    const metrics = [
      { label: 'Total Users', value: staff.length.toString(), icon: 'Users', color: 'blue' },
      { label: 'Active Staff', value: staff.filter(s => s.status === 'Active').length.toString(), icon: 'UserCheck', color: 'green' },
      { label: 'Pending Access', value: Math.round(staff.length * 0.1).toString(), icon: 'Clock', color: 'orange' },
      { label: 'System Admins', value: staff.filter(s => s.role === 'Admin').length.toString(), icon: 'Shield', color: 'red' },
    ];
    
    return simulateAPI({ metrics, users: staff });
  },
  addUser: (newUser) => {
    const staff = getStoredData(KEYS.STAFF, mockData.staff);
    const updated = [...staff, { ...newUser, id: `EMP${(staff.length + 1).toString().padStart(3, '0')}` }];
    setStoredData(KEYS.STAFF, updated);
    return simulateAPI({ success: true, data: updated });
  },
  updateUser: (id, updates) => {
    const staff = getStoredData(KEYS.STAFF, mockData.staff);
    const updated = staff.map(s => s.id === id ? { ...s, ...updates } : s);
    setStoredData(KEYS.STAFF, updated);
    return simulateAPI({ success: true, data: updated });
  },
  deleteUser: (id) => {
    const staff = getStoredData(KEYS.STAFF, mockData.staff);
    const updated = staff.filter(s => s.id !== id);
    setStoredData(KEYS.STAFF, updated);
    return simulateAPI({ success: true, data: updated });
  },
  deleteUsersBulk: (ids) => {
    const staff = getStoredData(KEYS.STAFF, mockData.staff);
    const updated = staff.filter(s => !ids.includes(s.id));
    setStoredData(KEYS.STAFF, updated);
    return simulateAPI({ success: true, data: updated });
  },

  updateClaimStatus: (id, status) => {
    // In a real app, we'd update the list in localStorage here
    return simulateAPI({ success: true });
  },
  updateInvoiceStatus: (invoiceId, status) => {
    const billing = getStoredData(KEYS.BILLING, mockData.billing);
    const updated = billing.map(b => b.invoiceId === invoiceId ? { ...b, status } : b);
    setStoredData(KEYS.BILLING, updated);
    return simulateAPI({ success: true, data: updated });
  },

  // Activity Log
  getActivity: () => simulateAPI(getStoredData(KEYS.ACTIVITY, mockData.activityLogs)),
  getPTO: () => simulateAPI(getStoredData(KEYS.PTO, mockData.ptoRequests)),
  getSickLeave: () => simulateAPI(getStoredData(KEYS.SICK_LEAVE, mockData.sickLeave)),
  getAppointments: () => simulateAPI(getStoredData(KEYS.APPOINTMENTS, mockData.appointments)),
  addActivity: (message, type = 'System', user = 'System') => {
    const log = getStoredData(KEYS.ACTIVITY, mockData.activityLog);
    const newEntry = {
      id: log.length + 1,
      type,
      message,
      user,
      timestamp: new Date().toISOString()
    };
    const updated = [newEntry, ...log];
    setStoredData(KEYS.ACTIVITY, updated);
    return simulateAPI(updated);
  },

  // Dashboard
  getDashboardStats: () => {
    const stats = [
      { title: "Total Residents", value: "128", trend: "+12%", trendUp: true, icon: "Users" },
      { title: "Total Employees", value: "10", trend: "+5%", trendUp: true, icon: "UserCheck" },
      { title: "Pending PTO", value: "6", trend: "+5%", trendUp: true, icon: "CalendarClock" },
      { title: "Sick Time", value: "5", trend: "+5%", trendUp: true, icon: "Stethoscope" },
      { title: "Total Appointments", value: "18", trend: "+5%", trendUp: true, icon: "CalendarDays" },
      { title: "Claims Pending", value: "12", trend: "-8%", trendUp: false, icon: "FileText" },
    ];
    return simulateAPI(stats);
  },

  // Auth
  login: (email, password) => {
    return simulateAPI(new Promise((resolve, reject) => {
      if (email === 'admin@care.com' && password === 'Admin@123') {
        const user = { name: 'Admin User', role: 'admin', email };
        localStorage.setItem(KEYS.USER, JSON.stringify(user));
        resolve({ success: true, user });
      } else if (email.startsWith('res')) {
        const user = { name: 'Jimmy Chu', role: 'resident', email };
        localStorage.setItem(KEYS.USER, JSON.stringify(user));
        resolve({ success: true, user });
      } else {
        reject({ success: false, message: 'Invalid credentials' });
      }
    }));
  },
  logout: () => {
    localStorage.removeItem(KEYS.USER);
    return simulateAPI({ success: true });
  }
};
