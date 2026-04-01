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
  getResidentData: (id) => {
    const residents = getStoredData(KEYS.RESIDENTS, mockData.residents);
    const resident = residents.find(r => r.id === id) || residents[0];
    
    // Add medical records if not present in mockData.js structure for residents
    const enrichedResident = {
      ...resident,
      diagnosisProblems: [
        { id: 1, name: "Depression", onset: "2023", status: "Active" },
        { id: 2, name: "Degenerative Arthritis", type: "Chronic", status: "Chronic" },
        { id: 3, name: "Skin Reactions", type: "Recurrent", status: "Recurrent" }
      ],
      medicationsList: [
        { id: 1, name: "Lisinopril", dose: "20 mg", details: "20 MG • Oral • Daily", status: "Active" },
        { id: 2, name: "Metformin", dose: "500 mg", details: "500 MG • Oral • Daily", status: "Active" }
      ],
      vitalsHistory: {
        bloodPressure: "120/80 mmHg",
        heartRate: "74 bpm",
        bmi: "17.1 lbs",
        respirationRate: "60 bpm"
      }
    };
    return simulateAPI(enrichedResident);
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
        name: 'Oasis Behavioral Health LLC',
        npi: '(555) 555-0199',
        address: '123 Wellness Dr, Suite 200, Austin',
        phone: '(512) 555-0199'
      },
      locations: [
        { name: 'Oasis Recovery Center', address: '456 Serenity Ln, Austin, TX 78702', npi: '9876543210', pos: '55' },
        { name: 'Oasis Outpatient Clinic', address: '789 Hope Ave, Austin, TX 78703', npi: '5678901234', pos: '11' }
      ],
      encounter: {
        patient: 'David Smith',
        provider: 'Dr. Emily Roberts',
        facility: 'Oasis Recovery Center',
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
